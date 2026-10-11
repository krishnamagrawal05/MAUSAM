const $ = (id) => document.getElementById(id);
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const t = (key, fallback = '') => window.MausamI18n?.t(key, fallback) || fallback;

const INDIA_CITIES = [
  {key:'new-delhi',name:'New Delhi',admin1:'Delhi',latitude:28.6139,longitude:77.2090},
  {key:'mumbai',name:'Mumbai',admin1:'Maharashtra',latitude:19.0760,longitude:72.8777},
  {key:'ahmedabad',name:'Ahmedabad',admin1:'Gujarat',latitude:23.0225,longitude:72.5714},
  {key:'surat',name:'Surat',admin1:'Gujarat',latitude:21.1702,longitude:72.8311},
  {key:'jaipur',name:'Jaipur',admin1:'Rajasthan',latitude:26.9124,longitude:75.7873},
  {key:'jodhpur',name:'Jodhpur',admin1:'Rajasthan',latitude:26.2389,longitude:73.0243},
  {key:'udaipur',name:'Udaipur',admin1:'Rajasthan',latitude:24.5854,longitude:73.7125},
  {key:'chandigarh',name:'Chandigarh',admin1:'Chandigarh',latitude:30.7333,longitude:76.7794},
  {key:'amritsar',name:'Amritsar',admin1:'Punjab',latitude:31.6340,longitude:74.8723},
  {key:'ludhiana',name:'Ludhiana',admin1:'Punjab',latitude:30.9000,longitude:75.8573},
  {key:'srinagar',name:'Srinagar',admin1:'Jammu and Kashmir',latitude:34.0837,longitude:74.7973},
  {key:'jammu',name:'Jammu',admin1:'Jammu and Kashmir',latitude:32.7266,longitude:74.8570},
  {key:'leh',name:'Leh',admin1:'Ladakh',latitude:34.1526,longitude:77.5771},
  {key:'dehradun',name:'Dehradun',admin1:'Uttarakhand',latitude:30.3165,longitude:78.0322},
  {key:'lucknow',name:'Lucknow',admin1:'Uttar Pradesh',latitude:26.8467,longitude:80.9462},
  {key:'kanpur',name:'Kanpur',admin1:'Uttar Pradesh',latitude:26.4499,longitude:80.3319},
  {key:'agra',name:'Agra',admin1:'Uttar Pradesh',latitude:27.1767,longitude:78.0081},
  {key:'varanasi',name:'Varanasi',admin1:'Uttar Pradesh',latitude:25.3176,longitude:82.9739},
  {key:'patna',name:'Patna',admin1:'Bihar',latitude:25.5941,longitude:85.1376},
  {key:'ranchi',name:'Ranchi',admin1:'Jharkhand',latitude:23.3441,longitude:85.3096},
  {key:'jamshedpur',name:'Jamshedpur',admin1:'Jharkhand',latitude:22.8046,longitude:86.2029},
  {key:'kolkata',name:'Kolkata',admin1:'West Bengal',latitude:22.5726,longitude:88.3639},
  {key:'siliguri',name:'Siliguri',admin1:'West Bengal',latitude:26.7271,longitude:88.3953},
  {key:'gangtok',name:'Gangtok',admin1:'Sikkim',latitude:27.3314,longitude:88.6138},
  {key:'guwahati',name:'Guwahati',admin1:'Assam',latitude:26.1445,longitude:91.7362},
  {key:'shillong',name:'Shillong',admin1:'Meghalaya',latitude:25.5788,longitude:91.8933},
  {key:'kohima',name:'Kohima',admin1:'Nagaland',latitude:25.6751,longitude:94.1086},
  {key:'imphal',name:'Imphal',admin1:'Manipur',latitude:24.8170,longitude:93.9368},
  {key:'aizawl',name:'Aizawl',admin1:'Mizoram',latitude:23.7271,longitude:92.7176},
  {key:'agartala',name:'Agartala',admin1:'Tripura',latitude:23.8315,longitude:91.2868},
  {key:'itanagar',name:'Itanagar',admin1:'Arunachal Pradesh',latitude:27.0844,longitude:93.6053},
  {key:'bhubaneswar',name:'Bhubaneswar',admin1:'Odisha',latitude:20.2961,longitude:85.8245},
  {key:'raipur',name:'Raipur',admin1:'Chhattisgarh',latitude:21.2514,longitude:81.6296},
  {key:'bhopal',name:'Bhopal',admin1:'Madhya Pradesh',latitude:23.2599,longitude:77.4126},
  {key:'indore',name:'Indore',admin1:'Madhya Pradesh',latitude:22.7196,longitude:75.8577},
  {key:'nagpur',name:'Nagpur',admin1:'Maharashtra',latitude:21.1458,longitude:79.0882},
  {key:'pune',name:'Pune',admin1:'Maharashtra',latitude:18.5204,longitude:73.8567},
  {key:'panaji',name:'Panaji',admin1:'Goa',latitude:15.4909,longitude:73.8278},
  {key:'hyderabad',name:'Hyderabad',admin1:'Telangana',latitude:17.3850,longitude:78.4867},
  {key:'bengaluru',name:'Bengaluru',admin1:'Karnataka',latitude:12.9716,longitude:77.5946},
  {key:'mysuru',name:'Mysuru',admin1:'Karnataka',latitude:12.2958,longitude:76.6394},
  {key:'chennai',name:'Chennai',admin1:'Tamil Nadu',latitude:13.0827,longitude:80.2707},
  {key:'coimbatore',name:'Coimbatore',admin1:'Tamil Nadu',latitude:11.0168,longitude:76.9558},
  {key:'madurai',name:'Madurai',admin1:'Tamil Nadu',latitude:9.9252,longitude:78.1198},
  {key:'puducherry',name:'Puducherry',admin1:'Puducherry',latitude:11.9416,longitude:79.8083},
  {key:'visakhapatnam',name:'Visakhapatnam',admin1:'Andhra Pradesh',latitude:17.6868,longitude:83.2185},
  {key:'vijayawada',name:'Vijayawada',admin1:'Andhra Pradesh',latitude:16.5062,longitude:80.6480},
  {key:'kochi',name:'Kochi',admin1:'Kerala',latitude:9.9312,longitude:76.2673},
  {key:'thiruvananthapuram',name:'Thiruvananthapuram',admin1:'Kerala',latitude:8.5241,longitude:76.9366},
  {key:'port-blair',name:'Port Blair',admin1:'Andaman and Nicobar Islands',latitude:11.6234,longitude:92.7265},
  {key:'srinagar-lakshadweep',name:'Kavaratti',admin1:'Lakshadweep',latitude:10.5667,longitude:72.6369},
  {key:'daman',name:'Daman',admin1:'Dadra and Nagar Haveli and Daman and Diu',latitude:20.3974,longitude:72.8328}
];
const POPULAR_CITIES = ['new-delhi','mumbai','kolkata','bengaluru','chennai','hyderabad','ahmedabad','jaipur','lucknow','guwahati'].map(key => INDIA_CITIES.find(city => city.key === key));
const DEFAULT_CITY = INDIA_CITIES[0];
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const CURRENT_FIELDS = 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,pressure_msl,wind_speed_10m,wind_direction_10m';
const HOURLY_FIELDS = 'temperature_2m,weather_code,precipitation_probability,visibility';
const DAILY_FIELDS = 'weather_code,temperature_2m_max,temperature_2m_min,uv_index_max';
const DATA_CACHE_MS = 5 * 60 * 1000;

const FORECAST_STORAGE_KEY = 'mausam.weather-cache.v1';
const FORECAST_STORAGE_LIMIT = 6;

let currentLocation = DEFAULT_CITY;
let currentWeather = null;
let activeLayer = 'wind';
let globeRotation = -DEFAULT_CITY.longitude * Math.PI / 180;
let globeTilt = -.16;
let autoRotate = !prefersReducedMotion;
let pointerDown = null;
let toastTimer;
let searchTimer;
let searchController;
let weatherController;
let weatherRequestId = 0;
let latestSearchText = '';
let highlightedSuggestion = -1;
let lastGeocodeResults = [];
const geocodeCache = new Map();
const forecastCache = new Map();
const canvas = $('weather-globe');
const ctx = canvas.getContext('2d');
let globeSize = {w:0,h:0,dpr:1};
let screenMarkers = [];
let lastFrame = 0;

function icon(kind, size = 32, isDay = true) {
  const start = `<svg viewBox="0 0 48 48" width="${size}" height="${size}" fill="none" aria-hidden="true">`;
  const sun = `<circle cx="24" cy="24" r="8" fill="#F7BA58"/><g stroke="#FFE0A1" stroke-width="2" stroke-linecap="round"><path d="M24 5v5M24 38v5M5 24h5M38 24h5M10.6 10.6l3.6 3.6m19.6 19.6 3.6 3.6m0-27.2-3.6 3.6m-19.6 19.6-3.6 3.6"/></g>`;
  const moon = `<path d="M31.8 8.5a15.4 15.4 0 1 0 7.6 26.7A15.7 15.7 0 0 1 31.8 8.5Z" fill="#E5D1A9"/><circle cx="13" cy="12" r="1.3" fill="#FFE7B8"/><circle cx="39" cy="19" r="1" fill="#FFE7B8"/>`;
  const cloud = `<path d="M11 29.5a8 8 0 0 1 7.8-8 10.2 10.2 0 0 1 19 2.8 6.4 6.4 0 0 1-.4 12.8H18a8.3 8.3 0 0 1-7-7.6Z" fill="#D0E4D8" stroke="#ECF3DE" stroke-width="1.5"/>`;
  const part = `${isDay ? `<circle cx="17" cy="18" r="7" fill="#F7BA58"/><path d="M10 18h14M17 11v14m-5-12 10 10m0-10L12 23" stroke="#FFE0A1" stroke-width="1.3" stroke-linecap="round"/>` : moon}${cloud}`;
  const fog = `<path d="M12 20a8 8 0 0 1 7.7-8 9 9 0 0 1 8.1 5h4.3a6 6 0 0 1 0 12H19a8 8 0 0 1-7-9Z" fill="#CEDAD4" stroke="#ECF3DE" stroke-width="1.4"/><g stroke="#A8CDC4" stroke-width="2" stroke-linecap="round"><path d="M8 35h27M14 40h21"/></g>`;
  const drizzle = `${cloud}<g stroke="#77DCCF" stroke-width="2" stroke-linecap="round"><path d="m18 38-1 3m10-3-1 3m10-3-1 3"/></g>`;
  const rain = `${cloud}<g stroke="#71D9D8" stroke-width="2.2" stroke-linecap="round"><path d="m17 37-2 5m12-5-2 5m12-5-2 5"/></g>`;
  const snow = `${cloud}<g stroke="#E1F0EB" stroke-width="1.7" stroke-linecap="round"><path d="M18 38v6m-3-3h6m8-3v6m-3-3h6m5-3v6m-3-3h6"/></g>`;
  const storm = `${cloud}<path d="m27 34-5 8h5l-2 5 9-10h-6l3-3" fill="#F7BA58" stroke="#F7BA58" stroke-linejoin="round"/>`;
  let art = kind === 'sun' ? (isDay ? sun : moon) : kind === 'partly' ? part : kind === 'fog' ? fog : kind === 'drizzle' ? drizzle : kind === 'rain' ? rain : kind === 'snow' ? snow : kind === 'storm' ? storm : cloud;
  return `${start}${art}</svg>`;
}

function weatherKind(code) {
  const n = Number(code);
  if (n === 0) return {label:t('clear_sky','Clear sky'),kind:'sun'};
  if (n === 1) return {label:t('mainly_clear','Mainly clear'),kind:'partly'};
  if (n === 2) return {label:t('partly_cloudy','Partly cloudy'),kind:'partly'};
  if (n === 3) return {label:t('overcast','Overcast'),kind:'cloud'};
  if (n === 45 || n === 48) return {label:t('fog','Fog'),kind:'fog'};
  if ([51,53,55,56,57].includes(n)) return {label:t('drizzle','Drizzle'),kind:'drizzle'};
  if ([61,63,65,66,67].includes(n)) return {label:t('weather_rain','Rain'),kind:'rain'};
  if ([71,73,75,77,85,86].includes(n)) return {label:t('snow','Snow'),kind:'snow'};
  if ([80,81,82].includes(n)) return {label:t('rain_showers','Rain showers'),kind:'rain'};
  if ([95,96,99].includes(n)) return {label:t('thunderstorm','Thunderstorm'),kind:'storm'};
  return {label:t('cloudy','Cloudy'),kind:'cloud'};
}

function showToast(message) {
  const box = $('toast');
  box.textContent = message;
  box.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => box.classList.remove('show'), 3200);
}
function safeNumber(value, decimals = 0) {
  if (!Number.isFinite(Number(value))) return '—';
  return Number(value).toFixed(decimals);
}
function latOf(location) { return Number(location.latitude ?? location.lat); }
function lonOf(location) { return Number(location.longitude ?? location.lon); }
function normalized(text) {
  return String(text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}
function getLocationKey(location) {
  const lat = latOf(location), lon = lonOf(location);
  const pinned = INDIA_CITIES.find(city => normalized(city.name) === normalized(location.name) && Math.abs(city.latitude-lat) < .4 && Math.abs(city.longitude-lon) < .4);
  return pinned ? pinned.key : `geo-${location.id ?? `${normalized(location.name)}-${lat.toFixed(2)}-${lon.toFixed(2)}`}`;
}
function displayRegion(location) {
  const region = location.admin1 || location.admin2 || 'India';
  if (/national capital territory/i.test(region)) return 'Delhi';
  return region;
}
function displayLocation(location) { return `${location.name}, ${displayRegion(location)}`; }
function setText(id, value) { const node = $(id); if (node) node.textContent = value; }
function showStatus(message, error = false) {
  const line = $('weather-status');
  line.classList.toggle('is-error', error);
  setText('status-label', message);
  $('retry-button').hidden = !error;
}
function formatClock(localTime) {
  const match = String(localTime || '').match(/T(\d{2}):(\d{2})/);
  if (!match) return 'IST';
  const hour = Number(match[1]);
  return `${hour % 12 || 12}:${match[2]} ${hour < 12 ? 'am' : 'pm'} IST`;
}
function formatDate(dateText, weekday = true) {
  const date = new Date(`${dateText}T12:00:00Z`);
  return new Intl.DateTimeFormat(window.MausamI18n?.locale || 'en-IN', {weekday:weekday?'long':undefined,month:'long',day:'numeric',timeZone:'UTC'}).format(date);
}
function formatShortDay(dateText) {
  const date = new Date(`${dateText}T12:00:00Z`);
  return new Intl.DateTimeFormat(window.MausamI18n?.locale || 'en-IN', {weekday:'short',timeZone:'UTC'}).format(date);
}
function compassDirection(degrees) {
  if (!Number.isFinite(Number(degrees))) return '—';
  return ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'][Math.round(Number(degrees)/22.5)%16];
}
function hourlyIndex(hourly, currentTime) {
  const currentHour = String(currentTime || '').slice(0,13);
  const exact = hourly.time.findIndex(time => time.slice(0,13) >= currentHour);
  return exact < 0 ? 0 : exact;
}
function uvDescription(value) {
  if (!Number.isFinite(Number(value))) return 'Daily maximum';
  if (value >= 11) return 'Extreme · protect your skin';
  if (value >= 8) return 'Very high · seek shade';
  if (value >= 6) return 'High · sun protection advised';
  if (value >= 3) return 'Moderate · midday care';
  return 'Low · minimal risk';
}
function windDescription(value) {
  if (!Number.isFinite(Number(value))) return 'At 10 metres';
  if (value < 12) return 'Light breeze';
  if (value < 28) return 'Moderate breeze';
  if (value < 50) return 'Fresh wind';
  return 'Strong wind';
}
function humidityDescription(value) {
  if (!Number.isFinite(Number(value))) return 'Relative humidity';
  return value >= 75 ? 'Humid conditions' : value <= 35 ? 'Dry conditions' : 'Relative humidity';
}
function selectedHourIndex(data) { return hourlyIndex(data.hourly, data.current.time); }
function showLoading(location) {
  setText('hero-city', location.name);
  setText('hero-temperature', '—');
  setText('hero-condition', 'Loading forecast…');
  setText('current-city', displayLocation(location));
  setText('current-date', 'Loading local conditions…');
  setText('current-temp', '—');
  setText('current-condition', 'Loading…');
  setText('current-hi-lo', 'H — · L —');
  setText('feels-like', '—');
  setText('day-summary', 'Connecting to the India forecast…');
  setText('hourly-city', location.name);
  $('current-icon').innerHTML = '';
  $('hero-weather-icon').innerHTML = '';
  $('hourly-track').innerHTML = '<div class="forecast-message">Loading hourly forecast…</div>';
  $('daily-list').innerHTML = '<div class="forecast-message">Loading five-day forecast…</div>';
  showStatus('Updating weather…');
}
function showUnavailable() {
  setText('hero-temperature','—');setText('hero-condition','Weather unavailable');
  setText('current-temp','—');setText('current-condition','Weather unavailable');setText('current-hi-lo','H — · L —');
  setText('feels-like','—');setText('day-summary','Check your connection and try again.');
  ['humidity-value','wind-value','pressure-value','visibility-value','uv-value'].forEach(id=>setText(id,'—'));
  setText('hourly-track','');
  $('hourly-track').textContent='Hourly forecast is temporarily unavailable.';
  $('daily-list').textContent='Five-day forecast is temporarily unavailable.';
  $('current-icon').innerHTML='';$('hero-weather-icon').innerHTML='';
  showStatus('Weather data unavailable',true);
}

async function consumeResponse(url, signal, timeoutMs, headers, consume) {
  const controller=new AbortController();let timedOut=false;
  const abortFromCaller=()=>controller.abort();
  if(signal?.aborted)abortFromCaller();else signal?.addEventListener('abort',abortFromCaller,{once:true});
  const timer=setTimeout(()=>{timedOut=true;controller.abort();},timeoutMs);
  try {
    const response=await fetch(url,{signal:controller.signal,headers});
    if(!response.ok)throw new Error(`Weather service returned ${response.status}`);
    return await consume(response);
  } catch(error) {
    if(timedOut)throw new Error('The request timed out. Please retry when connected.');
    throw error;
  } finally {
    clearTimeout(timer);signal?.removeEventListener('abort',abortFromCaller);
  }
}
async function fetchJson(url, signal, timeoutMs=15000) {
  const data=await consumeResponse(url,signal,timeoutMs,{Accept:'application/json'},response=>response.json());
  if(data.error)throw new Error(data.reason||'Weather service error');
  return data;
}
async function fetchText(url, signal, timeoutMs=15000, accept='text/plain, text/xml, application/xml, */*') {
  return consumeResponse(url,signal,timeoutMs,{Accept:accept},response=>response.text());
}
async function geocodeIndianLocation(query, signal) {
  const key = normalized(query);
  const cached = geocodeCache.get(key);
  if (cached && Date.now()-cached.at < 24*60*60*1000) return cached.results;
  const params = new URLSearchParams({name:query,count:'10',language:window.MausamI18n?.geocoderLanguage || 'en',format:'json',countryCode:'IN'});
  const data = await fetchJson(`${GEOCODING_URL}?${params}`,signal);
  const results = (data.results || []).filter(item => item.country_code === 'IN').slice(0,10);
  geocodeCache.set(key,{at:Date.now(),results});
  return results;
}
async function getForecast(location, signal) {
  const lat = latOf(location), lon = lonOf(location);
  const key = `${lat.toFixed(3)},${lon.toFixed(3)}`;
  const cached = forecastCache.get(key);
  if (cached && Date.now()-cached.at < DATA_CACHE_MS) return cached.data;
  const params = new URLSearchParams({
    latitude:String(lat),longitude:String(lon),current:CURRENT_FIELDS,hourly:HOURLY_FIELDS,
    daily:DAILY_FIELDS,timezone:'Asia/Kolkata',forecast_days:'5',wind_speed_unit:'kmh',temperature_unit:'celsius'
  });
  const data = await fetchJson(`${FORECAST_URL}?${params}`,signal);
  forecastCache.set(key,{at:Date.now(),data});
  return data;
}
function forecastKey(location) { return `${latOf(location).toFixed(3)},${lonOf(location).toFixed(3)}`; }
function persistForecast(location,data) {
  if (location.isDeviceLocation || !data?.current || !Array.isArray(data.hourly?.temperature_2m) || !Array.isArray(data.hourly?.weather_code) || !Array.isArray(data.daily?.time)) return;
  try {
    const entries=JSON.parse(localStorage.getItem(FORECAST_STORAGE_KEY)||'{}');
    entries[forecastKey(location)]={at:Date.now(),data,location:{name:location.name,admin1:location.admin1||location.admin2||'India',latitude:latOf(location),longitude:lonOf(location)}};
    const keep=Object.entries(entries).sort((a,b)=>b[1].at-a[1].at).slice(0,FORECAST_STORAGE_LIMIT);
    localStorage.setItem(FORECAST_STORAGE_KEY,JSON.stringify(Object.fromEntries(keep)));
  } catch {}
}
function readPersistedForecast(location) {
  try { const entry=JSON.parse(localStorage.getItem(FORECAST_STORAGE_KEY)||'{}')[forecastKey(location)];const data=entry?.data;return data?.current&&Array.isArray(data.hourly?.temperature_2m)&&Array.isArray(data.hourly?.weather_code)&&Array.isArray(data.daily?.time)?entry:null; }
  catch { return null; }
}
async function compareForecasts(locations) {
  if(!Array.isArray(locations)||locations.length<1||locations.length>3)throw new Error('Choose between one and three cities.');
  const params=new URLSearchParams({latitude:locations.map(loc=>latOf(loc)).join(','),longitude:locations.map(loc=>lonOf(loc)).join(','),current:CURRENT_FIELDS,hourly:`${HOURLY_FIELDS},precipitation_probability`,daily:DAILY_FIELDS,timezone:'Asia/Kolkata',forecast_days:'5',wind_speed_unit:'kmh',temperature_unit:'celsius'});
  const response=await fetchJson(`${FORECAST_URL}?${params}`);
  const list=Array.isArray(response)?response:[response];
  if(list.length!==locations.length)throw new Error('Comparison data was incomplete.');
  list.forEach((data,index)=>{forecastCache.set(forecastKey(locations[index]),{at:Date.now(),data});persistForecast(locations[index],data);});
  return list;
}

function renderHourly(data) {
  const {hourly,current} = data;
  const start = selectedHourIndex(data);
  const entries = hourly.time.slice(start,start+8);
  if (!entries.length) { $('hourly-track').textContent='No hourly forecast is available.'; return; }
  $('hourly-track').innerHTML = entries.map((time,index) => {
    const i = start+index;
    const weather = weatherKind(hourly.weather_code[i]);
    const hour = time.slice(11,13);
    const hourText = index === 0 ? 'Now' : `${Number(hour)%12 || 12}${Number(hour)<12?' AM':' PM'}`;
    const chance = hourly.precipitation_probability?.[i];
    return `<div class="hourly-item" aria-label="${hourText}: ${Math.round(hourly.temperature_2m[i])} degrees, ${weather.label}${Number.isFinite(chance)?`, ${chance}% rain chance`:''}"><div class="hourly-time">${hourText}</div><div class="hourly-icon">${icon(weather.kind,27,Number(hour)>=6&&Number(hour)<18)}</div><div class="hourly-temp">${Math.round(hourly.temperature_2m[i])}°</div><div class="hourly-rain">${Number.isFinite(chance)?`${Math.round(chance)}%`:''}</div></div>`;
  }).join('');
}
function renderDaily(data) {
  const daily = data.daily;
  $('daily-list').innerHTML = daily.time.slice(0,5).map((date,index) => {
    const weather = weatherKind(daily.weather_code[index]);
    const day = index === 0 ? 'Today' : formatShortDay(date);
    return `<div class="daily-item"><span class="daily-day">${day}</span><span class="daily-icon">${icon(weather.kind,22,true)}</span><span class="daily-condition">${weather.label}</span><span class="daily-weather"><span class="daily-high">${Math.round(daily.temperature_2m_max[index])}°</span><span class="daily-low">${Math.round(daily.temperature_2m_min[index])}°</span></span></div>`;
  }).join('');
}
function renderWeather(data, location, isStale = false) {
  const c = data.current;
  const hourly = data.hourly;
  const daily = data.daily;
  const index = selectedHourIndex(data);
  const condition = weatherKind(c.weather_code);
  const isDay = Number(c.is_day) === 1;
  const todayIndex = Math.max(0,daily.time.indexOf(String(c.time).slice(0,10)));
  const uv = daily.uv_index_max?.[todayIndex];
  const visibilityKm = hourly.visibility?.[index] != null ? hourly.visibility[index]/1000 : NaN;
  const wind = Number(c.wind_speed_10m);
  setText('hero-city',location.name);setText('hero-temperature',`${Math.round(c.temperature_2m)}°`);setText('hero-condition',condition.label);
  $('hero-weather-icon').innerHTML=icon(condition.kind,39,isDay);
  setText('current-city',displayLocation(location));
  setText('current-date',`${isStale?'Saved forecast · ':''}${formatDate(String(c.time).slice(0,10))} · ${formatClock(c.time)}`);
  setText('current-temp',`${Math.round(c.temperature_2m)}°`);setText('current-condition',condition.label);
  setText('current-hi-lo',`H ${Math.round(daily.temperature_2m_max[todayIndex])}° · L ${Math.round(daily.temperature_2m_min[todayIndex])}°`);
  $('current-icon').innerHTML=icon(condition.kind,49,isDay);
  setText('feels-like',`${Math.round(c.apparent_temperature)}°`);
  setText('day-summary',`${condition.label} across ${location.name}`);
  setText('humidity-value',`${Math.round(c.relative_humidity_2m)}%`);
  setText('humidity-note',humidityDescription(Number(c.relative_humidity_2m)));
  $('humidity-meter').querySelector('i').style.width=`${Math.max(0,Math.min(100,Number(c.relative_humidity_2m)||0))}%`;
  setText('wind-value',`${Math.round(wind)} km/h`);setText('wind-note',windDescription(wind));setText('wind-direction',compassDirection(Number(c.wind_direction_10m)));
  setText('pressure-value',`${Math.round(c.pressure_msl)} hPa`);
  setText('visibility-value',Number.isFinite(visibilityKm)?`${visibilityKm<10?visibilityKm.toFixed(1):Math.round(visibilityKm)} km`:'—');
  setText('uv-value',Number.isFinite(Number(uv))?`${Number(uv).toFixed(1)} of 11`:'—');
  setText('uv-note',uvDescription(Number(uv)));
  $('uv-meter').querySelector('i').style.width=`${Math.max(0,Math.min(100,Number(uv)/11*100||0))}%`;
  setText('hourly-city',location.name);setText('local-date',`${formatClock(c.time)} · INDIA STANDARD TIME`);
  renderHourly(data);renderDaily(data);drawGlobe();renderPopularCities();
  showStatus(isStale?`Offline · saved ${formatDate(String(c.time).slice(0,10),false)} ${formatClock(c.time)}`:`Updated ${formatClock(c.time)}`);
  window.dispatchEvent(new CustomEvent('mausam:weather',{detail:{location:{...location},data,isStale}}));
}

function setSearchOpen(open) {
  const box = $('search-suggestions');
  box.hidden = !open;
  $('city-search').setAttribute('aria-expanded',String(open));
}
function showSearchMessage(message, className = '') {
  const box = $('search-suggestions');
  box.replaceChildren();
  const item = document.createElement('div');
  item.className = `suggestion-message ${className}`.trim();
  item.setAttribute('role','status');
  item.textContent = message;
  box.append(item);
  setSearchOpen(true);
}
function renderSuggestions(results) {
  const box = $('search-suggestions');
  box.replaceChildren();
  results.forEach((location,index) => {
    const option = document.createElement('button');
    option.className='suggestion-option';
    option.type='button';
    option.setAttribute('role','option');
    option.setAttribute('aria-selected',String(index===highlightedSuggestion));
    option.dataset.index=String(index);
    const name=document.createElement('span');name.className='suggestion-name';name.textContent=location.name;
    const region=document.createElement('span');region.className='suggestion-region';region.textContent=location.admin1 || location.admin2 || 'India';
    const pin=document.createElement('span');pin.className='suggestion-pin';pin.setAttribute('aria-hidden','true');pin.textContent='↗';
    option.append(name,region,pin);box.append(option);
  });
  setSearchOpen(true);
}
async function searchLocations(query,autoSelect=false) {
  const clean=query.trim();
  if (clean.length<2) { showSearchMessage('Type at least two characters to search India.'); return; }
  if (searchController) searchController.abort();
  searchController=new AbortController();
  latestSearchText=normalized(clean);
  highlightedSuggestion=-1;
  showSearchMessage('Searching Indian cities…','suggestion-loading');
  try {
    const results=await geocodeIndianLocation(clean,searchController.signal);
    if (normalized($('city-search').value)!==latestSearchText) return;
    lastGeocodeResults=results;
    if (!results.length) {
      $('city-search').setAttribute('aria-invalid','true');
      showSearchMessage(`No Indian city or PIN code matched “${clean}”. Try another spelling.`,'suggestion-empty');
      return;
    }
    $('city-search').removeAttribute('aria-invalid');
    renderSuggestions(results);
    if (autoSelect) selectLocation(results[0]);
  } catch (error) {
    if (error.name==='AbortError') return;
    if (normalized($('city-search').value)!==latestSearchText) return;
    lastGeocodeResults=[];
    showSearchMessage('City search is unavailable. Check your connection and try again.','suggestion-error');
  }
}
function selectSearchResult(index) {
  const location=lastGeocodeResults[index];
  if (location) selectLocation(location);
}
function handleCitySubmit(event) {
  event.preventDefault();
  const query=$('city-search').value.trim();
  if (!query) { showSearchMessage('Enter an Indian city or PIN code.');$('city-search').focus();return; }
  if (! $('search-suggestions').hidden && lastGeocodeResults.length) {
    selectSearchResult(highlightedSuggestion>=0?highlightedSuggestion:0);
    return;
  }
  searchLocations(query,true);
}
function wireSearch() {
  const input=$('city-search');
  input.addEventListener('input',()=>{
    input.removeAttribute('aria-invalid');
    if (searchController) searchController.abort();
    clearTimeout(searchTimer);
    lastGeocodeResults=[];
    if (input.value.trim().length<2) { setSearchOpen(false); return; }
    showSearchMessage('Searching Indian cities…','suggestion-loading');
    searchTimer=setTimeout(()=>searchLocations(input.value,false),320);
  });
  input.addEventListener('keydown',event=>{
    if (event.key==='Escape') { setSearchOpen(false);return; }
    if (event.key==='ArrowDown' && lastGeocodeResults.length) {
      event.preventDefault();highlightedSuggestion=Math.min(highlightedSuggestion+1,lastGeocodeResults.length-1);renderSuggestions(lastGeocodeResults);return;
    }
    if (event.key==='ArrowUp' && lastGeocodeResults.length) {
      event.preventDefault();highlightedSuggestion=Math.max(0,highlightedSuggestion-1);renderSuggestions(lastGeocodeResults);return;
    }
    if (event.key==='Enter' && ! $('search-suggestions').hidden && lastGeocodeResults.length) {
      event.preventDefault();selectSearchResult(highlightedSuggestion>=0?highlightedSuggestion:0);
    }
  });
  $('search-form').addEventListener('submit',handleCitySubmit);
  $('search-suggestions').addEventListener('click',event=>{
    const option=event.target.closest('[data-index]');
    if (option) selectSearchResult(Number(option.dataset.index));
  });
  document.addEventListener('click',event=>{
    if (!event.target.closest('.search-wrap')) setSearchOpen(false);
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape')setSearchOpen(false);});
}

async function selectLocation(location, announce=true) {
  if (weatherController) weatherController.abort();
  weatherController=new AbortController();
  const requestId=++weatherRequestId;
  currentLocation={...location};
  const markerKey=getLocationKey(location);
  currentLocation.key=markerKey;
  if (announce) $('city-search').value='';
  setSearchOpen(false);
  window.dispatchEvent(new CustomEvent('mausam:location',{detail:{location:{...currentLocation}}}));
  showLoading(currentLocation);
  const target=-lonOf(currentLocation)*Math.PI/180;
  globeRotation=target;
  drawGlobe();
  try {
    const data=await getForecast(currentLocation,weatherController.signal);
    if (requestId!==weatherRequestId) return;
    currentWeather=data;
    persistForecast(currentLocation,data);
    renderWeather(data,currentLocation);
    if (announce) {
      $('current').scrollIntoView({behavior:prefersReducedMotion?'auto':'smooth',block:'start'});
      showToast(`Forecast updated · ${currentLocation.name}, India`);
    }
  } catch (error) {
    if (error.name==='AbortError' || requestId!==weatherRequestId) return;
    const cached=readPersistedForecast(currentLocation);
    if(cached){currentWeather=cached.data;renderWeather(cached.data,currentLocation,true);return;}
    showUnavailable();
    window.dispatchEvent(new CustomEvent('mausam:weather-error',{detail:{location:{...currentLocation}}}));
    if (announce) showToast('Weather data could not be loaded. Please try again.');
  }
}
function renderPopularCities() {
  const container=$('place-pills');
  container.replaceChildren();
  POPULAR_CITIES.forEach(city=>{
    const button=document.createElement('button');
    button.type='button';button.className='place-pill';button.dataset.cityKey=city.key;
    button.setAttribute('aria-pressed',String(currentLocation.key===city.key));
    const dot=document.createElement('span');dot.className='pill-dot';dot.setAttribute('aria-hidden','true');
    const label=document.createElement('span');label.textContent=city.name;
    button.append(dot,label);container.append(button);
  });
}

const canvasContext=ctx;
const land=[[[72,-168],[66,-145],[59,-132],[51,-128],[48,-123],[42,-124],[33,-117],[28,-110],[21,-105],[15,-97],[18,-88],[23,-81],[30,-81],[34,-75],[42,-70],[47,-60],[53,-56],[60,-64],[67,-82],[70,-106],[72,-135],[72,-168]],[[12,-81],[6,-77],[-4,-80],[-12,-77],[-21,-72],[-32,-70],[-42,-73],[-55,-68],[-53,-60],[-41,-50],[-28,-48],[-14,-52],[-5,-60],[4,-65],[10,-71],[12,-81]],[[72,-10],[70,23],[63,41],[58,57],[54,68],[52,82],[47,88],[44,103],[40,115],[32,122],[22,119],[15,109],[10,104],[1,105],[-6,113],[-8,128],[-5,139],[1,130],[8,120],[17,109],[21,99],[25,91],[23,81],[27,74],[31,68],[35,57],[39,51],[41,41],[46,39],[48,31],[55,25],[61,32],[67,28],[71,14],[72,-10]],[[36,-8],[34,-1],[32,10],[28,25],[20,33],[12,43],[5,42],[-2,40],[-11,42],[-18,35],[-27,32],[-35,25],[-34,18],[-27,14],[-18,12],[-7,9],[4,4],[11,-1],[20,-7],[28,-11],[36,-8]],[[58,-7],[60,-2],[58,0],[55,-4],[58,-7]],[[70,170],[62,179],[58,165],[55,150],[52,138],[48,130],[43,134],[37,140],[35,145],[42,151],[50,157],[57,162],[64,166],[70,170]]];
function project(lat,lon,r,cx,cy) {
  const la=lat*Math.PI/180,lo=lon*Math.PI/180+globeRotation;
  const x=Math.cos(la)*Math.sin(lo);
  const y=Math.sin(la)*Math.cos(globeTilt)-Math.cos(la)*Math.cos(lo)*Math.sin(globeTilt);
  const z=Math.sin(la)*Math.sin(globeTilt)+Math.cos(la)*Math.cos(lo)*Math.cos(globeTilt);
  return {x:cx+x*r,y:cy-y*r,z};
}
function resizeGlobe() {
  const rect=canvas.getBoundingClientRect();
  if (!rect.width || !rect.height || !canvasContext) return;
  const dpr=Math.min(window.devicePixelRatio||1,2);
  globeSize={w:rect.width,h:rect.height,dpr};
  canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);
  canvasContext.setTransform(dpr,0,0,dpr,0,0);drawGlobe();
}
function strokeProjected(points,r,cx,cy,color,width=1,closed=false) {
  canvasContext.beginPath();let drawing=false;
  points.forEach(([lat,lon])=>{const p=project(lat,lon,r,cx,cy);if(p.z>-.015){if(!drawing){canvasContext.moveTo(p.x,p.y);drawing=true;}else canvasContext.lineTo(p.x,p.y);}else drawing=false;});
  if(closed&&points.length&&project(points[0][0],points[0][1],r,cx,cy).z>0)canvasContext.closePath();
  canvasContext.strokeStyle=color;canvasContext.lineWidth=width;canvasContext.stroke();
}
function mapLocations() {
  const pins=INDIA_CITIES.map(city=>({location:city,key:city.key}));
  const selected=currentLocation;
  const duplicate=pins.some(pin=>Math.abs(pin.location.latitude-latOf(selected))<.35&&Math.abs(pin.location.longitude-lonOf(selected))<.35);
  if (!duplicate) pins.push({location:selected,key:selected.key||getLocationKey(selected)});
  return pins;
}
function drawGlobe() {
  if (!canvasContext||!globeSize.w) return;
  const {w,h}=globeSize,cx=w/2,cy=h*.47,r=Math.min(w*.36,h*.405,147);
  canvasContext.clearRect(0,0,w,h);
  const glow=canvasContext.createRadialGradient(cx-r*.24,cy-r*.34,r*.02,cx,cy,r*1.3);
  glow.addColorStop(0,'rgba(206,145,67,.20)');glow.addColorStop(.68,'rgba(50,150,117,.12)');glow.addColorStop(1,'rgba(25,95,70,0)');
  canvasContext.beginPath();canvasContext.arc(cx,cy,r*1.28,0,Math.PI*2);canvasContext.fillStyle=glow;canvasContext.fill();
  const sphere=canvasContext.createRadialGradient(cx-r*.35,cy-r*.4,r*.04,cx+r*.15,cy+r*.1,r*1.16);
  sphere.addColorStop(0,'#245849');sphere.addColorStop(.62,'#163d33');sphere.addColorStop(1,'#0a211a');
  canvasContext.beginPath();canvasContext.arc(cx,cy,r,0,Math.PI*2);canvasContext.fillStyle=sphere;canvasContext.fill();
  canvasContext.save();canvasContext.beginPath();canvasContext.arc(cx,cy,r,0,Math.PI*2);canvasContext.clip();
  for(let lat=-60;lat<=60;lat+=30){const pts=[];for(let lon=-180;lon<=180;lon+=5)pts.push([lat,lon]);strokeProjected(pts,r,cx,cy,'rgba(226,231,191,.15)',.65);}
  for(let lon=-180;lon<180;lon+=30){const pts=[];for(let lat=-88;lat<=88;lat+=4)pts.push([lat,lon]);strokeProjected(pts,r,cx,cy,'rgba(226,231,191,.15)',.65);}
  land.forEach(poly=>strokeProjected(poly,r,cx,cy,'rgba(198,222,183,.39)',1.05,true));
  const palette=activeLayer==='rain'?['rgba(74,205,198,.82)','rgba(81,166,194,.58)','rgba(143,223,183,.5)']:activeLayer==='cloud'?['rgba(231,226,202,.56)','rgba(174,215,190,.48)','rgba(236,232,211,.36)']:['rgba(243,185,91,.73)','rgba(91,205,164,.65)','rgba(119,201,200,.48)'];
  for(let band=0;band<4;band++){
    const points=[];
    for(let lon=-175;lon<=175;lon+=4){const lat=activeLayer==='rain'?16*Math.sin((lon+globeRotation*38)/26+band*.75)+band*10-14:activeLayer==='cloud'?28*Math.sin((lon+globeRotation*25)/38+band*.55)+band*11-18:22*Math.sin((lon+globeRotation*32)/29+band*.8)+band*10-15;points.push([lat,lon]);}
    canvasContext.setLineDash(activeLayer==='wind'?[2,4]:[]);strokeProjected(points,r,cx,cy,palette[band%palette.length],activeLayer==='cloud'?5:2);canvasContext.setLineDash([]);
  }
  for(let i=0;i<280;i++){const lat=Math.asin(2*((i*.61803398875)%1)-1)*180/Math.PI,lon=((i*137.507764)%360)-180,p=project(lat,lon,r,cx,cy);if(p.z>.08){canvasContext.beginPath();canvasContext.arc(p.x,p.y,i%7===0?1.1:.65,0,Math.PI*2);canvasContext.fillStyle=`rgba(225,221,188,${.07+.14*(.5+.5*Math.sin(i*4.3))})`;canvasContext.fill();}}
  canvasContext.restore();
  const ring=canvasContext.createLinearGradient(cx-r,cy,cx+r,cy);ring.addColorStop(0,'rgba(224,180,97,.08)');ring.addColorStop(.46,'rgba(225,215,174,.47)');ring.addColorStop(1,'rgba(224,180,97,.08)');
  canvasContext.beginPath();canvasContext.arc(cx,cy,r,0,Math.PI*2);canvasContext.strokeStyle=ring;canvasContext.lineWidth=1.2;canvasContext.stroke();
  screenMarkers=[];
  mapLocations().forEach(({location,key})=>{
    const lat=latOf(location),lon=lonOf(location),p=project(lat,lon,r,cx,cy);if(p.z<=.035)return;
    const selected=key===currentLocation.key,dot=selected?3.5:2;
    screenMarkers.push({location,key,x:p.x,y:p.y,z:p.z});
    canvasContext.beginPath();canvasContext.arc(p.x,p.y,selected?9:5.5,0,Math.PI*2);canvasContext.fillStyle=selected?'rgba(246,185,91,.23)':'rgba(108,211,170,.15)';canvasContext.fill();
    canvasContext.beginPath();canvasContext.arc(p.x,p.y,dot,0,Math.PI*2);canvasContext.fillStyle=selected?'#FFD47C':'#A3E1B5';canvasContext.shadowColor=selected?'#F8BF66':'#82DAB0';canvasContext.shadowBlur=selected?15:8;canvasContext.fill();canvasContext.shadowBlur=0;
    if(selected){canvasContext.font='600 9px "DM Sans",sans-serif';canvasContext.textAlign=p.x<cx?'left':'right';canvasContext.fillStyle='#FFF6E2';canvasContext.fillText(location.name,p.x+(p.x<cx?9:-9),p.y-8);}
  });
}
function animateGlobe(time) {
  if(!prefersReducedMotion&&autoRotate&&!pointerDown&&time-lastFrame>40){globeRotation+=.00125;drawGlobe();lastFrame=time;}
  requestAnimationFrame(animateGlobe);
}
function setupGlobe() {
  const stage=$('globe-stage');
  canvas.addEventListener('pointerdown',event=>{
    pointerDown={x:event.clientX,y:event.clientY,lastX:event.clientX,lastY:event.clientY,moved:false,pointerId:event.pointerId};
    try{canvas.setPointerCapture(event.pointerId);}catch{}
  });
  canvas.addEventListener('pointermove',event=>{
    if(!pointerDown)return;
    const dx=event.clientX-pointerDown.lastX,dy=event.clientY-pointerDown.lastY;
    if(Math.hypot(event.clientX-pointerDown.x,event.clientY-pointerDown.y)>4)pointerDown.moved=true;
    if(pointerDown.moved){globeRotation+=dx*.008;globeTilt=Math.max(-.75,Math.min(.75,globeTilt+dy*.006));drawGlobe();}
    pointerDown.lastX=event.clientX;pointerDown.lastY=event.clientY;
  });
  const finishPointer=event=>{
    if(!pointerDown)return;
    const state=pointerDown;pointerDown=null;
    if(!state.moved){const rect=canvas.getBoundingClientRect(),x=event.clientX-rect.left,y=event.clientY-rect.top;let closest=null,distance=22;
      screenMarkers.forEach(marker=>{const d=Math.hypot(marker.x-x,marker.y-y);if(d<distance){distance=d;closest=marker;}});
      if(closest)selectLocation(closest.location);
    }
    drawGlobe();
  };
  canvas.addEventListener('pointerup',finishPointer);canvas.addEventListener('pointercancel',()=>{pointerDown=null;});
  canvas.addEventListener('keydown',event=>{
    const step=.14;
    if(event.key==='ArrowLeft')globeRotation-=step;
    else if(event.key==='ArrowRight')globeRotation+=step;
    else if(event.key==='ArrowUp')globeTilt=Math.max(-.75,globeTilt-step);
    else if(event.key==='ArrowDown')globeTilt=Math.min(.75,globeTilt+step);
    else return;
    event.preventDefault();drawGlobe();
  });
  window.addEventListener('resize',resizeGlobe,{passive:true});
  const observer=new ResizeObserver(resizeGlobe);observer.observe(stage);resizeGlobe();requestAnimationFrame(animateGlobe);
}
function requestDeviceLocation() {
  if(!navigator.geolocation){showToast('Location sharing is not available in this browser.');return;}
  const button=$('location-button');button.disabled=true;
  navigator.geolocation.getCurrentPosition(position=>{
    button.disabled=false;
    const {latitude,longitude}=position.coords;
    if(latitude<6.2||latitude>37.5||longitude<68||longitude>98){showToast('That location is outside this India-focused forecast. Search an Indian city instead.');return;}
    const location={id:'device-location',name:t('your_location','My location'),admin1:'India',latitude,longitude,country_code:'IN',isDeviceLocation:true};
    selectLocation(location,true);
  },error=>{
    button.disabled=false;
    const message=error.code===1?'Location permission was denied. Search for a city instead.':error.code===3?'Location request timed out. Please try again.':'Unable to read your location. Search for a city instead.';
    showToast(message);
  },{enableHighAccuracy:false,maximumAge:300000,timeout:12000});
}
function setupControls() {
  $('location-button').addEventListener('click',requestDeviceLocation);
  $('retry-button').addEventListener('click',()=>selectLocation(currentLocation,false));
  $('place-pills').addEventListener('click',event=>{const button=event.target.closest('[data-city-key]');if(button){const city=INDIA_CITIES.find(item=>item.key===button.dataset.cityKey);if(city)selectLocation(city);}});
  document.querySelectorAll('.layer-chip').forEach(button=>button.addEventListener('click',()=>{
    activeLayer=button.dataset.layer;
    document.querySelectorAll('.layer-chip').forEach(chip=>{const active=chip===button;chip.classList.toggle('active',active);chip.setAttribute('aria-pressed',String(active));});
    drawGlobe();
  }));
  const motionButton=$('motion-toggle'),video=$('hero-video');
  motionButton.addEventListener('click',()=>{
    autoRotate=!autoRotate;
    if(autoRotate){video.play().catch(()=>{});motionButton.querySelector('.motion-icon').textContent='Ⅱ';motionButton.querySelector('span:last-child').textContent=t('pause_motion','Pause motion');motionButton.setAttribute('aria-pressed','false');}
    else{video.pause();motionButton.querySelector('.motion-icon').textContent='▶';motionButton.querySelector('span:last-child').textContent=t('resume_motion','Resume motion');motionButton.setAttribute('aria-pressed','true');}
    drawGlobe();
  });
  if(prefersReducedMotion){autoRotate=false;video.pause();motionButton.setAttribute('aria-pressed','true');motionButton.querySelector('.motion-icon').textContent='▶';motionButton.querySelector('span:last-child').textContent=t('resume_motion','Resume motion');}
  document.querySelectorAll('.reveal:not(.is-visible)').forEach(element=>{
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12});observer.observe(element);
  });
  if(!prefersReducedMotion){document.querySelectorAll('.tilt-card').forEach(card=>{
    card.addEventListener('pointermove',event=>{if(event.pointerType==='touch')return;const rect=card.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width,y=(event.clientY-rect.top)/rect.height;card.style.transform=`perspective(900px) rotateX(${(0.5-y)*2.2}deg) rotateY(${(x-.5)*2.2}deg) translateY(-2px)`;});
    card.addEventListener('pointerleave',()=>{card.style.transform='';});
  });}
}

window.Mausam={
  get currentLocation(){return currentLocation;},
  get currentWeather(){return currentWeather;},
  get cityAnchors(){return INDIA_CITIES;},
  get popularCities(){return POPULAR_CITIES;},
  selectLocation:(location,announce=true)=>selectLocation(location,announce),
  getForecast,compareForecasts,fetchJson,fetchText,showToast,displayLocation,weatherKind,icon,
  todayInIndia:()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()),
  dateInIndia:(offset=0)=>{const base=new Date(`${new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}T12:00:00Z`);base.setUTCDate(base.getUTCDate()+offset);return base.toISOString().slice(0,10);}
};
window.addEventListener('mausam:select',event=>{if(event.detail?.location)selectLocation(event.detail.location,true);});
renderPopularCities();
wireSearch();
setupControls();
setupGlobe();
selectLocation(DEFAULT_CITY,false);
