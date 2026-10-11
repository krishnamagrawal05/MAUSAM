(() => {
  const $=id=>document.getElementById(id),canvas=$('india-weather-map'),ctx=canvas.getContext('2d');
  const API='https://api.open-meteo.com/v1/forecast';
  const ids=['srinagar','leh','new-delhi','jaipur','ahmedabad','mumbai','lucknow','patna','kolkata','guwahati','gangtok','bhubaneswar','raipur','hyderabad','bengaluru','chennai','kochi','port-blair'];
  const names=new Map((window.Mausam?.cityAnchors||[]).map(city=>[city.key,city]));
  const points=ids.map(key=>names.get(key)).filter(Boolean);
  let data=[],layer='precipitation',offset=0,baseIndex=0,controller=null,loaded=false,loading=false,dpr=1,width=0,height=0,observer;
  const labels={precipitation:'Rainfall · mm/h',cloud:'Cloud cover · %',wind:'Wind · km/h'};
  const scaleColors=['#55bb9b','#92c67f','#d7b45c','#e27654'];
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  function localHour(time){const match=String(time||'').match(/T(\d{2}):/);return match?Number(match[1]):0;}
  function hourIndex(){if(!data.length)return 0;const current=window.Mausam?.currentWeather?.current?.time;let idx=current?data[0].hourly.time.findIndex(t=>t.slice(0,13)>=current.slice(0,13)):-1;return idx<0?Math.min(localHour(data[0].hourly.time[0]),data[0].hourly.time.length-1):idx;}
  function resize(){const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;width=rect.width;height=rect.height;dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw();}
  function xy(lon,lat){const padX=width*.09,padY=height*.09;return{x:padX+(lon-67)/(98-67)*(width-padX*2),y:padY+(37.5-lat)/(37.5-6)*(height-padY*2)};}
  const INDIA=[[37.1,74],[35.5,76],[35.0,78],[33.8,78.8],[33,80.5],[31.7,80.5],[30.8,81.2],[29,80.6],[28.5,82],[27.7,84],[28.1,86],[27.3,88],[28.1,89.8],[27.3,91],[27.6,94],[26.9,96],[25.7,95],[24.9,92.5],[23.8,91],[23.5,89.6],[22.1,88.1],[21.6,86.8],[20.5,87.5],[19.6,85.4],[18.2,84.8],[17,82.4],[15.3,80.5],[13.6,80.3],[11.3,79.8],[8.1,77.6],[8.1,76.3],[9.7,75.2],[12.1,74.5],[14,73.8],[16,73],[18.7,72.8],[20,72],[21.4,70],[23,69.5],[24.5,69.7],[26.2,70.5],[28.2,71.4],[30,71],[32,72.5],[34,73],[36.2,73.7],[37.1,74]];
  function colorFor(value){const v=Number(value)||0;if(layer==='cloud'){const k=clamp(v/100,0,1);return `rgba(189,220,207,${.06+k*.5})`;}if(layer==='wind'){const k=clamp(v/55,0,1);return `rgba(85,214,164,${.07+k*.55})`;}const k=clamp(v/12,0,1);return `rgba(${Math.round(69+166*k)},${Math.round(197-87*k)},${Math.round(171-96*k)},${.09+k*.58})`;}
  function valueAt(point,index){const series=point.hourly;if(layer==='cloud')return series.cloud_cover?.[index]??0;if(layer==='wind')return series.wind_speed_10m?.[index]??0;return series.precipitation?.[index]??0;}
  function draw(){if(!ctx||!width||!height)return;ctx.clearRect(0,0,width,height);
    // Latitude and longitude guides.
    ctx.save();ctx.strokeStyle='rgba(196,220,192,.09)';ctx.lineWidth=.7;
    [10,15,20,25,30,35].forEach(lat=>{const a=xy(68,lat),b=xy(98,lat);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();});
    [70,75,80,85,90,95].forEach(lon=>{const a=xy(lon,6),b=xy(lon,37.5);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();});ctx.restore();
    // Soft radial forecast cells make the model grid legible without pretending to be a radar image.
    if(data.length){ctx.save();ctx.globalCompositeOperation='screen';data.forEach(point=>{const pos=xy(point.longitude,point.latitude),value=valueAt(point,clamp(baseIndex+offset,0,point.hourly.time.length-1));const radius=Math.min(width,height)*.115;const gradient=ctx.createRadialGradient(pos.x,pos.y,2,pos.x,pos.y,radius);gradient.addColorStop(0,colorFor(value));gradient.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=gradient;ctx.beginPath();ctx.arc(pos.x,pos.y,radius,0,Math.PI*2);ctx.fill();});ctx.restore();}
    ctx.beginPath();INDIA.forEach(([lat,lon],i)=>{const p=xy(lon,lat);i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);});ctx.closePath();ctx.fillStyle='rgba(92,146,94,.13)';ctx.fill();ctx.strokeStyle='rgba(184,217,164,.75)';ctx.lineWidth=1.3;ctx.stroke();
    // Region labels are deliberately sparse to keep the small map readable.
    const labelsOnMap=[['Srinagar',34.1,74.8],['New Delhi',28.6,77.2],['Mumbai',19.1,72.9],['Kolkata',22.6,88.4],['Chennai',13.1,80.3],['Bengaluru',13.0,77.6],['Guwahati',26.1,91.7]];
    labelsOnMap.forEach(([name,lat,lon])=>{const p=xy(lon,lat);ctx.beginPath();ctx.arc(p.x,p.y,2.2,0,Math.PI*2);ctx.fillStyle='#f1c877';ctx.fill();ctx.font='600 8px "DM Sans",sans-serif';ctx.fillStyle='rgba(242,242,223,.92)';ctx.fillText(name,p.x+5,p.y-4);});
    ctx.font='600 13px "Manrope",sans-serif';ctx.fillStyle='rgba(232,238,215,.35)';ctx.fillText('INDIA',width*.45,height*.6);
    const idx=clamp(baseIndex+offset,0,(data[0]?.hourly.time.length||1)-1);const time=data[0]?.hourly.time[idx];$('map-time-label').textContent=offset===0?'Now':time?`${time.slice(11,16)} IST`:`+${offset}h`;
  }
  async function load(){if(loaded||loading)return;loading=true;$('map-loading').hidden=false;$('map-error').hidden=true;$('map-status').textContent='Loading model grid…';
    try{if(controller)controller.abort();controller=new AbortController();const params=new URLSearchParams({latitude:points.map(p=>p.latitude).join(','),longitude:points.map(p=>p.longitude).join(','),hourly:'precipitation,cloud_cover,wind_speed_10m',timezone:'Asia/Kolkata',forecast_days:'2',wind_speed_unit:'kmh'});const payload=await window.Mausam.fetchJson(`${API}?${params}`,controller.signal,20000);data=(Array.isArray(payload)?payload:[payload]).map((item,index)=>({...item,latitude:points[index]?.latitude,longitude:points[index]?.longitude,name:points[index]?.name})).filter(item=>item.hourly?.time?.length);if(data.length!==points.length)throw new Error('Incomplete forecast grid');baseIndex=hourIndex();loaded=true;$('map-loading').hidden=true;$('map-status').textContent='Model forecast · India Standard Time';draw();}
    catch(error){if(error.name==='AbortError')return;$('map-loading').hidden=true;$('map-error').hidden=false;$('map-error').textContent='The forecast grid is temporarily unavailable. Current city forecasts remain available above.';$('map-status').textContent='Map data unavailable';}
    finally{loading=false;}
  }
  document.querySelectorAll('[data-map-layer]').forEach(button=>button.addEventListener('click',()=>{layer=button.dataset.mapLayer;document.querySelectorAll('[data-map-layer]').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});$('map-legend-label').textContent=labels[layer];$('map-legend-min').textContent=layer==='precipitation'?'0 mm':layer==='cloud'?'Clear':'Calm';$('map-legend-max').textContent=layer==='precipitation'?'12+ mm':layer==='cloud'?'Overcast':'Strong';draw();}));
  $('map-time').addEventListener('input',event=>{offset=Number(event.target.value);draw();});
  window.addEventListener('mausam:weather',event=>{if(data.length){baseIndex=hourIndex();draw();}});
  window.addEventListener('resize',resize,{passive:true});observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){load();observer.disconnect();}},{rootMargin:'120px'});observer.observe($('india-map'));resize();
})();
