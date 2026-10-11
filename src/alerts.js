(() => {
  const FEED='https://cap-sources.s3.amazonaws.com/in-imd-en/rss.xml';
  const IMD_PAGE='https://mausam.imd.gov.in/responsive/subDivisionWiseWarningGIS.php';
  const $=id=>document.getElementById(id);
  let lastItems=new Set(),firstLoad=true,controller=null;
  const refreshButton=$('alerts-refresh'),notificationButton=$('alerts-notify'),list=$('alerts-list'),status=$('alerts-status');
  if('Notification'in window&&Notification.permission!=='denied')notificationButton.hidden=false;
  const localTime=value=>{if(!value)return 'Time not supplied';const date=new Date(value);return Number.isNaN(date.valueOf())?'Time not supplied':new Intl.DateTimeFormat(window.MausamI18n?.locale||'en-IN',{timeZone:'Asia/Kolkata',dateStyle:'medium',timeStyle:'short'}).format(date)+' IST';};
  const text=(parent,name)=>parent.getElementsByTagNameNS('*',name)[0]?.textContent?.trim()||'';
  function xmlDoc(source){const doc=new DOMParser().parseFromString(source,'application/xml');if(doc.querySelector('parsererror'))throw new Error('The IMD feed could not be read.');return doc;}
  async function readDetails(item,signal){
    const title=item.querySelector('title')?.textContent?.trim()||'IMD weather warning';
    const link=item.querySelector('link')?.textContent?.trim()||'';
    const date=item.querySelector('pubDate')?.textContent?.trim()||'';
    const out={title,link,date,headline:title,event:'Weather warning',severity:'Moderate',effective:'',expires:'',area:'',description:''};
    if(!/^https:\/\/cap-sources\.s3\.amazonaws\.com\/in-imd-en\//i.test(link))return out;
    try{
      const cap=xmlDoc(await window.Mausam.fetchText(link,signal,15000,'application/xml,text/xml'));
      out.headline=text(cap,'headline')||title;out.event=text(cap,'event')||'Weather warning';out.severity=text(cap,'severity')||'Moderate';out.effective=text(cap,'effective');out.expires=text(cap,'expires');out.area=[...cap.getElementsByTagNameNS('*','areaDesc')].map(node=>node.textContent.trim()).filter(Boolean).join(' · ');out.description=text(cap,'description')||text(cap,'instruction');
      if(text(cap,'msgType').toLowerCase()==='cancel')out.cancelled=true;
      const urgency=text(cap,'urgency');if(urgency)out.urgency=urgency;
    }catch(error){if(error.name==='AbortError')throw error;out.detailUnavailable=true;}
    return out;
  }
  function render(items){
    list.replaceChildren();
    if(!items.length){const empty=document.createElement('div');empty.className='alert-empty';empty.textContent='No active IMD weather warnings are listed in the latest feed. Check the official IMD page for district guidance.';const link=document.createElement('a');link.className='alert-source-link';link.href=IMD_PAGE;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Open IMD warning page ↗';empty.append(document.createElement('br'),link);list.append(empty);return;}
    for(const item of items){
      const card=document.createElement('article');card.className=`alert-card severity-${item.severity.toLowerCase().replace(/[^a-z]+/g,'-')}`;
      const top=document.createElement('div');top.className='alert-top';const badge=document.createElement('span');badge.className='alert-badge';badge.textContent=`${item.severity} · ${item.event}`;const when=document.createElement('span');when.className='alert-time';when.textContent=`Updated ${localTime(item.date)}`;top.append(badge,when);
      const heading=document.createElement('h3');heading.textContent=item.headline;
      const area=document.createElement('p');area.className='alert-area';area.textContent=item.area?`Affected areas: ${item.area}`:'Affected area not supplied in the feed item.';
      const description=document.createElement('p');description.className='alert-description';description.textContent=item.description||'Follow the official warning link for the latest detail.';
      const validity=document.createElement('p');validity.className='alert-time';validity.textContent=`Valid: ${localTime(item.effective)} – ${localTime(item.expires)}`;
      const link=document.createElement('a');link.className='alert-source-link';link.href=item.link;link.target='_blank';link.rel='noopener noreferrer';link.textContent='View official IMD CAP alert ↗';
      card.append(top,heading,area,description,validity,link);list.append(card);
    }
  }
  async function refresh(){
    if(controller)controller.abort();controller=new AbortController();refreshButton.disabled=true;status.textContent='Checking official IMD feed…';
    try{
      const feed=xmlDoc(await window.Mausam.fetchText(FEED,controller.signal,15000,'application/rss+xml,application/xml,text/xml'));const nodes=[...feed.querySelectorAll('item')].slice(0,20);
      const details=await Promise.all(nodes.map(item=>readDetails(item,controller.signal)));const now=Date.now();
      const active=details.filter(item=>{
        if(item.cancelled)return false;
        const expiry=Date.parse(item.expires);if(Number.isFinite(expiry)&&expiry<now)return false;
        const published=Date.parse(item.date);if(!Number.isFinite(expiry)&&Number.isFinite(published)&&now-published>48*60*60*1000)return false;
        return true;
      }).sort((a,b)=>(Date.parse(b.date)||0)-(Date.parse(a.date)||0));
      render(active);status.textContent=active.length?`${active.length} active IMD warning${active.length===1?'':'s'} · feed checked ${new Date().toLocaleTimeString('en-IN',{timeZone:'Asia/Kolkata',hour:'numeric',minute:'2-digit'})} IST`:'No active warnings reported by IMD';
      const current=new Set(active.map(item=>item.link||item.title));
      if(!firstLoad&&'Notification'in window&&Notification.permission==='granted')active.filter(item=>!lastItems.has(item.link||item.title)).forEach(item=>new Notification(`IMD · ${item.severity} weather warning`,{body:`${item.headline}${item.area?` — ${item.area}`:''}`,tag:item.link||item.title}));
      lastItems=current;firstLoad=false;
    }catch(error){if(error.name==='AbortError')return;status.textContent='IMD alert feed unavailable';list.replaceChildren();const box=document.createElement('div');box.className='alert-empty feature-error';box.textContent='The official warning feed could not be refreshed. Use the IMD portal for current district warnings.';const link=document.createElement('a');link.className='alert-source-link';link.href=IMD_PAGE;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Open IMD warning portal ↗';box.append(document.createElement('br'),link);list.append(box);}
    finally{refreshButton.disabled=false;}
  }
  refreshButton.addEventListener('click',refresh);
  notificationButton.addEventListener('click',async()=>{if(!('Notification'in window)){window.Mausam?.showToast('Notifications are not supported by this browser.');return;}try{const permission=await Notification.requestPermission();if(permission==='granted'){notificationButton.textContent='Notifications enabled';window.Mausam?.showToast('IMD alerts will notify you while Mausam is open.');refresh();}else{window.Mausam?.showToast('Notifications were not enabled.');}}catch{window.Mausam?.showToast('The browser could not enable notifications.');}});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
  refresh();setInterval(()=>{if(!document.hidden)refresh();},15*60*1000);
})();
