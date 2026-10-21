import {createStage} from './vehicle-stage.js';
export function startArrival(){
 const hero=document.querySelector('.hero');if(!hero)return;
 const skip=hero.querySelector('.skip-intro'),reduced=matchMedia('(prefers-reduced-motion: reduce)');let seen=false;
 try{seen=sessionStorage.getItem('martinez-entrance-3d')==='seen'}catch{}
 const host=document.createElement('div');host.className='arrival-stage';host.setAttribute('aria-hidden','true');hero.prepend(host);
 let stage=null,raf=0,finished=seen||reduced.matches;
 const fail=()=>{hero.classList.remove('has-arrival-model','cinematic-playing');host.remove();skip.hidden=true;cancelAnimationFrame(raf);stage?.dispose()};
 const finish=()=>{finished=true;cancelAnimationFrame(raf);stage?.setProgress(1);hero.classList.remove('cinematic-playing');hero.classList.add('cinematic-finished');skip.hidden=true;try{sessionStorage.setItem('martinez-entrance-3d','seen')}catch{}};
 try{stage=createStage(host,{category:'SUV',cinematic:true,onReady(){hero.classList.add('has-arrival-model')},onError:fail})}catch{fail();return}
 if(!stage){fail();return}
 const note=document.createElement('span');note.className='arrival-caption';note.textContent='REPRESENTATIVE SUV · 3D CONCEPT PREVIEW';hero.append(note);
 if(finished){finish();return}
 hero.classList.add('cinematic-playing');skip.hidden=false;skip.addEventListener('click',finish);
 const begin=performance.now();function tick(now){if(finished)return;const progress=Math.min((now-begin)/4800,1);stage.setProgress(progress);if(progress===1)finish();else raf=requestAnimationFrame(tick)}raf=requestAnimationFrame(tick);
 reduced.addEventListener('change',()=>{if(reduced.matches)finish()});
 addEventListener('pagehide',()=>{cancelAnimationFrame(raf);stage?.dispose()},{once:true});
 addEventListener('pageshow',event=>{if(event.persisted)location.reload()});
}
