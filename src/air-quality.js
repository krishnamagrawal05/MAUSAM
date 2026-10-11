(() => {
  const endpoint='https://air-quality-api.open-meteo.com/v1/air-quality';
  const $=id=>document.getElementById(id);
  let controller=null,lastKey='',request=0;
  const bands={
    pm25:[[0,30,0,50],[31,60,51,100],[61,90,101,200],[91,120,201,300],[121,250,301,400],[251,500,401,500]],
    pm10:[[0,50,0,50],[51,100,51,100],[101,250,101,200],[251,350,201,300],[351,430,301,400],[431,600,401,500]]
  };
  function subIndex(value,table){
    if(!Number.isFinite(value)||value<0)return NaN;
    const row=table.find(([low,high])=>value<=high)||table[table.length-1];
    return Math.max(0,Math.min(500,Math.round((row[3]-row[2])/(row[1]-row[0])*(Math.min(value,row[1])-row[0])+row[2])));
  }
  function category(score){
    if(score<=50)return ['Good','cat-good','Air is satisfactory for most people.'];
    if(score<=100)return ['Satisfactory','cat-good','Most people can continue usual activities; unusually sensitive people may notice mild effects.'];
    if(score<=200)return ['Moderate','cat-moderate','Sensitive groups may reduce prolonged or strenuous outdoor activity.'];
    if(score<=300)return ['Poor','cat-poor','People with lung or heart conditions may limit prolonged outdoor exertion.'];
    if(score<=400)return ['Very poor','cat-very-poor','Avoid prolonged outdoor exertion; sensitive people should reduce outdoor exposure.'];
    return ['Severe','cat-severe','Reduce outdoor activity and seek official guidance if you feel unwell.'];
  }
  function unavailable(message='Air-quality model data is unavailable.'){
    $('aqi-value').textContent='—';$('pm25-value').textContent='—';$('pm10-value').textContent='—';
    $('aqi-category').textContent='Unavailable';$('aqi-category').className='aqi-category';$('aqi-advice-title').textContent='No estimate available';$('aqi-advice').textContent=message;$('aqi-status').textContent='Model data unavailable';$('aqi-status').classList.add('aqi-status-error');$('aqi-scale-marker').style.left='0%';
  }
  async function load(location){
    if(!location)return;
    const key=`${Number(location.latitude??location.lat).toFixed(3)},${Number(location.longitude??location.lon).toFixed(3)}`;
    if(key===lastKey)return;
    lastKey=key;const id=++request;if(controller)controller.abort();controller=new AbortController();
    $('aqi-status').textContent='Loading model estimate…';$('aqi-status').classList.remove('aqi-status-error');$('aqi-advice').textContent='Fetching fine-particle and coarse-particle estimates for this location.';
    const params=new URLSearchParams({latitude:String(location.latitude??location.lat),longitude:String(location.longitude??location.lon),current:'pm2_5,pm10,us_aqi',timezone:'Asia/Kolkata',domains:'cams_global'});
    try{
      const data=await window.Mausam.fetchJson(`${endpoint}?${params}`,controller.signal);
      if(id!==request)return;
      const raw25=data.current?.pm2_5,raw10=data.current?.pm10;
      const pm25=raw25==null?NaN:Number(raw25),pm10=raw10==null?NaN:Number(raw10);
      if(!Number.isFinite(pm25)&&!Number.isFinite(pm10))throw new Error('No particle values were returned.');
      const score=Math.max(Number.isFinite(pm25)?subIndex(pm25,bands.pm25):-1,Number.isFinite(pm10)?subIndex(pm10,bands.pm10):-1);
      const [label,css,advice]=category(score);
      $('aqi-value').textContent=String(score);$('aqi-category').textContent=label;$('aqi-category').className=`aqi-category ${css}`;
      $('pm25-value').textContent=Number.isFinite(pm25)?pm25.toFixed(1):'—';$('pm10-value').textContent=Number.isFinite(pm10)?pm10.toFixed(1):'—';
      $('aqi-advice-title').textContent=`${label} · PM-based India AQI estimate`;$('aqi-advice').textContent=advice;
      $('aqi-status').textContent=`CAMS model · ${data.current?.time?`${data.current.time.slice(11,16)} IST`:'latest available'}`;
      $('aqi-scale-marker').style.left=`${Math.max(0,Math.min(100,score/500*100))}%`;
    }catch(error){if(error.name==='AbortError'||id!==request)return;unavailable('Reconnect to refresh the CAMS model estimate. This proxy uses only PM2.5 and PM10.');}
  }
  function appendSources(){
    const caveat=document.querySelector('#air-quality .source-caveat');if(!caveat)return;
    caveat.querySelectorAll('.aqi-source-link').forEach(link=>link.remove());
    const defs=[['https://cpcb.nic.in/National-Air-Quality-Index/','CPCB AQI guide ↗'],['https://open-meteo.com/en/docs/air-quality-api','CAMS model source ↗']];
    defs.forEach(([href,label])=>{const link=document.createElement('a');link.className='aqi-source-link';link.href=href;link.target='_blank';link.rel='noopener noreferrer';link.textContent=label;caveat.append(document.createTextNode(' · '),link);});
  }
  document.addEventListener('DOMContentLoaded',appendSources,{once:true});
  window.addEventListener('mausam:language',appendSources);
  window.addEventListener('mausam:location',event=>load(event.detail?.location));
  window.addEventListener('mausam:weather-error',event=>load(event.detail?.location));
  if(window.Mausam?.currentLocation)load(window.Mausam.currentLocation);
})();
