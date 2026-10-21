import {business} from './business.js';
export function startMotion(path){
 if(path==='/')import('./brand-intro.js').then(m=>m.startBrandIntro());
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),header=document.querySelector('header');
 const updateHeader=()=>header.classList.toggle('scrolled',scrollY>40);addEventListener('scroll',updateHeader,{passive:true});updateHeader();
 const progress=document.createElement('div');progress.className='scroll-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
 let ticking=false;addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{const total=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${total>0?scrollY/total:0})`;ticking=false});ticking=true}},{passive:true});
 if('IntersectionObserver' in window&&!reduced.matches){const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}},{threshold:.08});document.querySelectorAll('.intro,.section-head,.fleet-card,.service-row,.steps>div,.story-timeline article,.service-directory article,.area-grid article').forEach((e,i)=>{e.classList.add('reveal-ready');e.style.setProperty('--reveal-delay',`${i%3*65}ms`);observer.observe(e)});reduced.addEventListener('change',()=>{if(reduced.matches){observer.disconnect();document.querySelectorAll('.reveal-ready').forEach(e=>e.classList.add('revealed'))}})}
 
}

