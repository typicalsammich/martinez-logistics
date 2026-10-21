import {film} from './photography.js';
export function startArrival(){
 const hero=document.querySelector('.hero');if(!hero)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),skip=hero.querySelector('.skip-intro');skip.hidden=true;
 let stage=hero.querySelector('.editorial-film');if(!stage){stage=document.createElement('div');stage.className='editorial-film';stage.setAttribute('aria-hidden','true');const poster=document.createElement('img');poster.src=film.poster;poster.alt='';poster.className='film-poster';stage.append(poster);hero.prepend(stage)}hero.classList.add('photographic-hero');
 const control=document.createElement('button');control.className='film-control';control.type='button';control.textContent='Play film';hero.append(control);
 let video=null;
 const finish=()=>{video?.pause();control.textContent='Replay film'};
 function play(){if(!video){video=document.createElement('video');video.src=film.src;video.poster=film.poster;video.muted=true;video.playsInline=true;video.preload='metadata';video.className='real-film';video.setAttribute('aria-hidden','true');stage.append(video);video.addEventListener('playing',()=>{stage.classList.add('film-ready');control.textContent='Pause film'});video.addEventListener('ended',finish);video.addEventListener('error',()=>{stage.classList.remove('film-ready');control.textContent='Film unavailable';control.disabled=true})}if(video.ended)video.currentTime=0;video.play().catch(()=>{control.textContent='Play film'})}
 control.addEventListener('click',()=>{if(video&&!video.paused){video.pause();control.textContent='Play film'}else play()});
 if(!reduced.matches&&!navigator.connection?.saveData)play();
 reduced.addEventListener('change',()=>{if(reduced.matches)finish()});
 const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting&&video&&!video.paused){video.pause();control.textContent='Play film'}},{threshold:.05});observer.observe(hero);
 addEventListener('pagehide',()=>{video?.pause();observer.disconnect()},{once:true});
}
