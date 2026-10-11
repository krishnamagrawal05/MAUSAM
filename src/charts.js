(() => {
  const container=document.getElementById('weather-chart'),caption=document.getElementById('chart-caption');
  let data=null,location=null,mode='temperature',stale=false;
  const escapeText=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function render(){
    if(!data?.hourly||!data?.current){container.textContent='Chart data is unavailable.';return;}
    const hourly=data.hourly,now=String(data.current.time).slice(0,13),found=hourly.time.findIndex(value=>value.slice(0,13)>=now),start=Math.max(0,found),end=Math.min(hourly.time.length,start+24),times=hourly.time.slice(start,end);
    const values=times.map((_,i)=>Number(mode==='temperature'?hourly.temperature_2m[start+i]:hourly.precipitation_probability?.[start+i]??0));
    if(!values.length){container.textContent='Chart data is unavailable.';return;}
    const w=720,h=218,left=44,right=14,top=13,bottom=34,plotW=w-left-right,plotH=h-top-bottom,min=mode==='temperature'?Math.floor(Math.min(...values)-2):0,max=mode==='temperature'?Math.ceil(Math.max(...values)+2):100,span=Math.max(1,max-min),xs=i=>left+(times.length<2?0:i/(times.length-1))*plotW,ys=v=>top+(max-v)/span*plotH;
    let svg=`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#eab85e" stop-opacity=".31"/><stop offset="100%" stop-color="#5fb89c" stop-opacity=".015"/></linearGradient></defs>`;
    for(let i=0;i<=4;i++){const value=min+span*i/4,y=ys(value);svg+=`<line x1="${left}" y1="${y}" x2="${w-right}" y2="${y}" stroke="rgba(226,238,224,.12)" stroke-dasharray="3 6"/><text x="${left-8}" y="${y+3}" text-anchor="end">${Math.round(value)}${mode==='temperature'?'°':'%'}</text>`;}
    const points=values.map((value,i)=>`${xs(i)},${ys(value)}`).join(' '),area=`${left},${h-bottom} ${points} ${xs(values.length-1)},${h-bottom}`;
    svg+=`<polygon points="${area}" fill="url(#chart-fill)"/><polyline points="${points}" fill="none" stroke="#efc36e" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    values.forEach((value,i)=>{const time=times[i],label=i===0?'Now':time.slice(11,16),y=ys(value),x=xs(i),tip=`${label} IST · ${Math.round(value)}${mode==='temperature'?'°C':'% rain chance'}`;if(i%4===0||i===values.length-1)svg+=`<text x="${x}" y="${h-8}" text-anchor="middle">${escapeText(label)}</text>`;svg+=`<circle cx="${x}" cy="${y}" r="${i%4===0?3.5:1.8}" fill="#f1ca7b"><title>${escapeText(tip)}</title></circle>`;});
    svg+='</svg>';container.innerHTML=svg;container.setAttribute('aria-label',`${mode==='temperature'?'24-hour temperature':'24-hour rain probability'} for ${location?.name||'selected city'}`);caption.textContent=`${mode==='temperature'?'Temperature in °C':'Precipitation chance in %'} · ${location?.name||'selected location'} · India Standard Time${stale?' · saved forecast':''}`;
  }
  document.querySelectorAll('[data-chart-mode]').forEach(button=>button.addEventListener('click',()=>{mode=button.dataset.chartMode;document.querySelectorAll('[data-chart-mode]').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});render();}));
  window.addEventListener('mausam:weather',event=>{data=event.detail?.data;location=event.detail?.location;stale=Boolean(event.detail?.isStale);render();});
  window.addEventListener('mausam:weather-error',()=>{data=null;container.textContent='Chart data is unavailable until the forecast reconnects.';caption.textContent='24-hour trend · unavailable';});
})();
