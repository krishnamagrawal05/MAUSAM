(() => {
  const button=document.getElementById('install-button'),pill=document.getElementById('network-status'),label=document.getElementById('network-label');
  let installPrompt=null;
  function network(){const online=navigator.onLine!==false;pill.classList.toggle('is-offline',!online);pill.setAttribute('aria-label',online?'Online':'Offline');label.textContent=window.MausamI18n?.t(online?'online':'offline',online?'Online':'Offline')||(online?'Online':'Offline');}
  function installed(){return window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;}
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;button.hidden=false;});
  window.addEventListener('appinstalled',()=>{installPrompt=null;button.textContent='Installed';button.disabled=true;window.Mausam?.showToast('Mausam is installed on this device.');});
  button.addEventListener('click',async()=>{
    if(installed()){window.Mausam?.showToast('Mausam is already running as an installed app.');return;}
    if(installPrompt){installPrompt.prompt();const result=await installPrompt.userChoice;installPrompt=null;if(result.outcome==='accepted')window.Mausam?.showToast('Mausam installation started.');return;}
    const isIOS=/iphone|ipad|ipod/i.test(navigator.userAgent);
    window.Mausam?.showToast(isIOS?'To install: use Share, then Add to Home Screen.':'If your browser supports installation, use its Install or Add to Home Screen menu.');
  });
  window.addEventListener('online',()=>{network();if(window.Mausam?.currentLocation)window.Mausam.selectLocation(window.Mausam.currentLocation,false);});
  window.addEventListener('offline',network);window.addEventListener('mausam:language',network);network();
  if('serviceWorker'in navigator&&location.protocol!=='file:'){
    const appRoot=new URL('./',location.href);
    navigator.serviceWorker.register(new URL('service-worker.js',appRoot).href,{scope:appRoot.pathname}).then(registration=>{
      registration.addEventListener('updatefound',()=>{const worker=registration.installing;if(!worker)return;worker.addEventListener('statechange',()=>{if(worker.state==='installed'&&navigator.serviceWorker.controller)window.Mausam?.showToast('A Mausam update is ready. Refresh when convenient.');});});
    }).catch(()=>{});
  }
})();
