(() => {
  const KEY='mausam.saved-cities.v1', $=id=>document.getElementById(id);
  let saved=[],activeCompareRequest=0,activeTripRequest=0;
  const cityMap=new Map();
  const cacheId=loc=>loc.key||`geo-${Number(loc.latitude??loc.lat).toFixed(3)}-${Number(loc.longitude??loc.lon).toFixed(3)}`;
  const safeRead=()=>{try{const parsed=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(parsed)?parsed.filter(x=>Number.isFinite(Number(x.latitude))&&Number.isFinite(Number(x.longitude))).slice(0,30):[];}catch{return[];}};
  const safeWrite=()=>{try{localStorage.setItem(KEY,JSON.stringify(saved.slice(0,30)));}catch{window.Mausam?.showToast('This browser could not save more cities.');}};
  const label=loc=>`${loc.name}${loc.admin1&&loc.admin1!=='India'?`, ${loc.admin1}`:''}`;
  function remember(loc){const key=cacheId(loc);cityMap.set(key,{...loc,key});return key;}
  function addCandidates(){
    const current=window.Mausam?.currentLocation;if(current)remember(current);
    saved.forEach(remember);(window.Mausam?.popularCities||[]).forEach(remember);
  }
  function currentIsSaved(){const current=window.Mausam?.currentLocation;if(!current)return false;const key=cacheId(current);return saved.some(item=>cacheId(item)===key);}
  function renderSaveButton(){const button=$('save-city-button'),yes=currentIsSaved();button.setAttribute('aria-pressed',String(yes));button.textContent=window.MausamI18n?.t(yes?'saved_city':'save_city',yes?'★ Saved':'☆ Save city')||'☆ Save city';}
  function renderSaved(){
    const container=$('saved-city-list');container.replaceChildren();$('saved-count').textContent=String(saved.length);
    if(!saved.length){const p=document.createElement('p');p.className='empty-note';p.textContent=window.MausamI18n?.t('save_city_hint','Save a city from its current-conditions card to keep it here.')||'Save a city from its current-conditions card to keep it here.';container.append(p);return;}
    for(const loc of saved){const key=cacheId(loc),card=document.createElement('div');card.className='saved-city-card';
      const open=document.createElement('button');open.className='saved-city-open';open.type='button';open.dataset.cityKey=key;const name=document.createElement('strong');name.textContent=loc.name;const region=document.createElement('span');region.textContent=loc.admin1||'India';open.append(name,region);
      const remove=document.createElement('button');remove.className='saved-city-remove';remove.type='button';remove.dataset.removeKey=key;remove.setAttribute('aria-label',`Remove ${loc.name} from saved cities`);remove.textContent='×';card.append(open,remove);container.append(card);
    }
  }
  function optionLocations(){
    addCandidates();const unique=new Map();for(const loc of [...saved,...(window.Mausam?.popularCities||[]),window.Mausam?.currentLocation].filter(Boolean)){const key=remember(loc);if(!unique.has(key))unique.set(key,cityMap.get(key));}return [...unique.values()];
  }
  function renderCompareOptions(){
    const container=$('compare-options'),selected=new Set([...container.querySelectorAll('input:checked')].map(input=>input.value));container.replaceChildren();
    optionLocations().forEach(loc=>{const key=cacheId(loc),labelEl=document.createElement('label');labelEl.className='compare-option';const input=document.createElement('input');input.type='checkbox';input.value=key;input.checked=selected.has(key)||(!selected.size&&key===cacheId(window.Mausam.currentLocation));const text=document.createElement('span');text.textContent=loc.name;labelEl.append(input,text);container.append(labelEl);});
  }
  function makeResultCard(loc,data){
    const card=document.createElement('article');card.className='compare-card';const h=document.createElement('h3');h.textContent=label(loc);const current=data.current||{},condition=window.Mausam.weatherKind(current.weather_code);const temp=document.createElement('div');temp.className='compare-temp';temp.textContent=Number.isFinite(Number(current.temperature_2m))?`${Math.round(current.temperature_2m)}°`:'—';const weather=document.createElement('p');weather.className='compare-weather';weather.textContent=condition.label;const daily=data.daily||{},date=String(current.time||'').slice(0,10),day=Math.max(0,daily.time?.indexOf(date)??0);const range=document.createElement('p');range.className='compare-range';range.textContent=`H ${Math.round(daily.temperature_2m_max?.[day]??NaN)}° · L ${Math.round(daily.temperature_2m_min?.[day]??NaN)}° · Wind ${Math.round(current.wind_speed_10m??NaN)} km/h`;card.append(h,temp,weather,range);return card;
  }
  async function runCompare(){
    const checked=[...$('compare-options').querySelectorAll('input:checked')];if(checked.length<2){$('compare-status').textContent='Choose at least two locations to compare.';$('compare-status').classList.add('is-error');return;}
    if(checked.length>3){$('compare-status').textContent='Choose no more than three locations.';$('compare-status').classList.add('is-error');return;}
    const locations=checked.map(input=>cityMap.get(input.value)).filter(Boolean);if(locations.length!==checked.length){$('compare-status').textContent='One selected city is no longer available.';return;}
    const id=++activeCompareRequest,button=$('compare-run');button.disabled=true;$('compare-status').classList.remove('is-error');$('compare-status').textContent='Loading matching forecast data…';$('compare-results').replaceChildren();
    try{const results=await window.Mausam.compareForecasts(locations);if(id!==activeCompareRequest)return;$('compare-results').replaceChildren(...locations.map((loc,index)=>makeResultCard(loc,results[index])));$('compare-status').textContent='Current conditions and five-day highs/lows · IST';}
    catch(error){if(id!==activeCompareRequest)return;$('compare-status').textContent='Comparison data is unavailable. Try again when you are online.';$('compare-status').classList.add('is-error');}
    finally{if(id===activeCompareRequest)button.disabled=false;}
  }
  function fillTripSelects(){
    addCandidates();const locations=optionLocations(),origin=$('trip-origin'),destination=$('trip-destination'),oldOrigin=origin.value,oldDestination=destination.value;
    [origin,destination].forEach(select=>{select.replaceChildren();locations.forEach(loc=>{const key=remember(loc),option=document.createElement('option');option.value=key;option.textContent=label(loc);select.append(option);});});
    if([...origin.options].some(o=>o.value===oldOrigin))origin.value=oldOrigin;else if(window.Mausam.currentLocation)origin.value=cacheId(window.Mausam.currentLocation);
    if([...destination.options].some(o=>o.value===oldDestination))destination.value=oldDestination;
    else{const second=locations.find(loc=>cacheId(loc)!==origin.value);if(second)destination.value=cacheId(second);}
    const date=$('trip-date'),today=window.Mausam.todayInIndia();date.min=today;date.max=window.Mausam.dateInIndia(4);if(!date.value||date.value<today||date.value>date.max)date.value=window.Mausam.dateInIndia(1);
  }
  function distanceKm(a,b){const rad=d=>d*Math.PI/180,lat1=rad(Number(a.latitude??a.lat)),lat2=rad(Number(b.latitude??b.lat)),dLat=lat2-lat1,dLon=rad(Number(b.longitude??b.lon)-Number(a.longitude??a.lon));const h=Math.sin(dLat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;return 6371*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h));}
  function travelCard(loc,data,date){
    const card=document.createElement('article');card.className='trip-city-card';const h=document.createElement('h3');h.textContent=label(loc);const idx=data.daily?.time?.indexOf(date)??-1;
    if(idx<0){const msg=document.createElement('p');msg.className='empty-note';msg.textContent='No forecast is available for this date.';card.append(h,msg);return card;}
    const condition=window.Mausam.weatherKind(data.daily.weather_code[idx]),details=document.createElement('p');details.className='compare-weather';details.textContent=condition.label;
    const temps=document.createElement('p');temps.className='compare-range';temps.textContent=`High ${Math.round(data.daily.temperature_2m_max[idx])}° · Low ${Math.round(data.daily.temperature_2m_min[idx])}°`;
    let rain='—';const hours=data.hourly?.time||[],chances=data.hourly?.precipitation_probability||[],dayHours=hours.map((time,i)=>time.slice(0,10)===date?chances[i]:null).filter(Number.isFinite);if(dayHours.length)rain=`${Math.round(Math.max(...dayHours))}%`;
    const rainLine=document.createElement('p');rainLine.className='trip-rain';rainLine.textContent=`Peak rain chance · ${rain}`;card.append(h,details,temps,rainLine);return card;
  }
  async function planTrip(event){
    event.preventDefault();const origin=cityMap.get($('trip-origin').value),destination=cityMap.get($('trip-destination').value),date=$('trip-date').value;
    if(!origin||!destination){$('trip-status').textContent='Choose both trip cities.';$('trip-status').classList.add('is-error');return;}
    if(cacheId(origin)===cacheId(destination)){ $('trip-status').textContent='Choose two different cities.';$('trip-status').classList.add('is-error');return;}
    if(date<window.Mausam.todayInIndia()||date>window.Mausam.dateInIndia(4)){$('trip-status').textContent='Choose a date in the next five-day forecast window.';$('trip-status').classList.add('is-error');return;}
    const id=++activeTripRequest,button=$('trip-form').querySelector('button');button.disabled=true;$('trip-status').classList.remove('is-error');$('trip-status').textContent='Comparing the forecast…';$('trip-results').replaceChildren();
    try{const results=await window.Mausam.compareForecasts([origin,destination]);if(id!==activeTripRequest)return;$('trip-results').replaceChildren(travelCard(origin,results[0],date));const middle=document.createElement('div');middle.innerHTML=`<div class="trip-arrow" aria-hidden="true">→</div><div class="trip-distance">≈ ${Math.round(distanceKm(origin,destination)).toLocaleString()} km apart</div>`;$('trip-results').append(middle,travelCard(destination,results[1],date));$('trip-status').textContent=`${new Intl.DateTimeFormat(window.MausamI18n?.locale||'en-IN',{dateStyle:'full',timeZone:'UTC'}).format(new Date(`${date}T12:00:00Z`))} · India Standard Time`;$('trip-status').classList.remove('is-error');}
    catch(error){if(id!==activeTripRequest)return;$('trip-status').textContent='Trip forecasts are unavailable. Check your connection and try again.';$('trip-status').classList.add('is-error');}
    finally{if(id===activeTripRequest)button.disabled=false;}
  }
  function saveCurrent(){
    const loc=window.Mausam.currentLocation;if(!loc)return;const key=cacheId(loc),index=saved.findIndex(item=>cacheId(item)===key);
    if(index>=0){saved.splice(index,1);window.Mausam.showToast(`${loc.name} removed from saved cities.`);}else{saved.unshift({key,name:loc.name,admin1:loc.admin1||loc.admin2||'India',latitude:Number(loc.latitude??loc.lat),longitude:Number(loc.longitude??loc.lon),id:loc.id||undefined});saved=saved.slice(0,30);window.Mausam.showToast(`${loc.name} saved on this device.`);}
    safeWrite();addCandidates();renderSaved();renderSaveButton();renderCompareOptions();fillTripSelects();
  }
  saved=safeRead();
  document.addEventListener('DOMContentLoaded',()=>{
    const privacy=document.createElement('p');privacy.className='privacy-note';privacy.textContent=window.MausamI18n?.t('location_privacy','Location access starts only after your click. Coordinates are sent to Open-Meteo for a forecast and stay unsaved unless you save the city.')||'Location access starts only after your click. Coordinates are sent to Open-Meteo for a forecast and stay unsaved unless you save the city.';document.querySelector('#saved-cities').append(privacy);
    $('save-city-button').addEventListener('click',saveCurrent);
    $('saved-city-list').addEventListener('click',event=>{const remove=event.target.closest('[data-remove-key]');if(remove){saved=saved.filter(loc=>cacheId(loc)!==remove.dataset.removeKey);safeWrite();renderSaved();renderSaveButton();renderCompareOptions();fillTripSelects();return;}const open=event.target.closest('[data-city-key]');if(open){const loc=cityMap.get(open.dataset.cityKey)||saved.find(item=>cacheId(item)===open.dataset.cityKey);if(loc)window.Mausam.selectLocation(loc,true);}});
    $('compare-options').addEventListener('change',event=>{if(!event.target.matches('input[type=checkbox]'))return;const checked=[...$('compare-options').querySelectorAll('input:checked')];if(checked.length>3){event.target.checked=false;window.Mausam.showToast('Compare up to three cities at a time.');}});
    $('compare-run').addEventListener('click',runCompare);$('trip-form').addEventListener('submit',planTrip);
    window.addEventListener('mausam:location',()=>{addCandidates();renderSaveButton();renderCompareOptions();fillTripSelects();});
    window.addEventListener('mausam:language',()=>{renderSaveButton();renderSaved();renderCompareOptions();fillTripSelects();});
    addCandidates();renderSaved();renderSaveButton();renderCompareOptions();fillTripSelects();
  });
})();
