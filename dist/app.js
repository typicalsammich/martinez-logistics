import {business,options,categoryDetails} from './business.js';
import {pageContent,rateTable,money,link} from './content.js';
import {startMotion} from './motion.js';
const path=location.pathname.replace(/\/$/,'')||'/', main=document.querySelector('main');
if(!main.children.length)main.innerHTML=pageContent(path);
document.querySelector('#year').textContent=new Date().getFullYear();
const menu=document.querySelector('.menu'),nav=document.querySelector('nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus()}});
nav.querySelectorAll('a').forEach(a=>{if(path!=='/'&&path.startsWith(a.pathname.replace(/\/$/,'')))a.setAttribute('aria-current','page')});
if(path.startsWith('/fleet')){
 const categories=Object.keys(categoryDetails);let current=Math.max(0,categories.findIndex(c=>path.endsWith('/'+c.toLowerCase())));const stage=document.querySelector('.showroom-stage');
 function select(index,updateUrl=false){
  current=(index+categories.length)%categories.length;
  const category=categories[current],details=categoryDetails[category],option=options[current];
  document.querySelectorAll('button[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===category)));
  stage.dataset.category=category;stage.querySelector('.stage-word').textContent=category.toUpperCase();
  const image=stage.querySelector('.stage-content');image.replaceChildren();
  if(details.image){const img=document.createElement('img');img.src=details.image;img.alt='Illustrative black luxury SUV outside a hotel';image.append(img)}
  stage.querySelector('.stage-caption').textContent=details.image?'Illustrative category imagery · Exact vehicle subject to confirmation':'Fleet photography to follow · Category preview';
  document.querySelector('#vehicle').innerHTML=`<h2>Luxury ${category}</h2><h3>${details.headline}</h3><p>${details.description}</p><p class="showroom-price">${money(option.price)} <small>/ one-hour listing</small></p>${link('Select This Category',`/reserve/?option=${current}`)}`;
  document.querySelector('#category-rates').innerHTML=rateTable(o=>o.category===category);document.querySelector('#category-count').textContent=`0${current+1} / 03`;
  if(updateUrl)history.replaceState({},'',`/fleet/${category.toLowerCase()}/`);
 }
 document.querySelectorAll('button[data-category]').forEach(b=>b.addEventListener('click',()=>select(categories.indexOf(b.dataset.category),true)));
 document.querySelector('#previous-category').addEventListener('click',()=>select(current-1,true));document.querySelector('#next-category').addEventListener('click',()=>select(current+1,true));
 let touchX=null;stage.addEventListener('touchstart',e=>{touchX=e.touches[0].clientX},{passive:true});stage.addEventListener('touchend',e=>{if(touchX!==null){const dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>70)select(current+(dx<0?1:-1),true);touchX=null}},{passive:true});select(current);
}
if(path==='/reserve'){
 const select=document.querySelector('#booking-service'),frame=document.querySelector('#live-scheduler'),status=document.querySelector('#scheduler-status');let timer;
 function changeService(updateUrl=true){const index=Number(select.value),option=options[index];document.querySelector('#booking-selection').innerHTML=`<h2>${option.name}</h2><p class="showroom-price">${money(option.price)} <small>/ one-hour listing</small></p><span class="eyebrow">${option.type==='Hourly'?'HOURLY CHAUFFEUR':'ATL '+option.type.toUpperCase()+' TRANSFER'}</span>`;document.querySelector('#external-booking').href=option.bookingUrl;
  const url=new URL(option.bookingUrl);for(const [key,value] of Object.entries({bodyBackground:'121416',headerText:'f2f0eb',schedulerBackground:'121416',schedulerText:'f2f0eb',buttonAccent:'c4a66b',buttonText:'08090a'}))url.searchParams.set(key,value);
  status.textContent='Loading the company’s live calendar…';frame.src=url.href;clearTimeout(timer);timer=setTimeout(()=>{status.textContent='If the calendar is unavailable, use “Open booking in a new tab” to continue directly with Acuity.'},12000);if(updateUrl)history.replaceState({},'',`/reserve/?option=${index}`);
 }
 frame.addEventListener('load',()=>{clearTimeout(timer);status.textContent='Live calendar provided by Acuity Scheduling. Complete your reservation below.'});const requested=Number(new URLSearchParams(location.search).get('option'));select.value=String(Number.isInteger(requested)&&requested>=0&&requested<options.length?requested:0);select.addEventListener('change',()=>changeService());changeService(false);
}
if(path==='/contact')document.querySelector('#contact-form').addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;const fields=new FormData(form),body=`Name: ${fields.get('name')}\nReply email: ${fields.get('email')}\n\n${fields.get('message')}`;location.href=`mailto:${business.email}?subject=${encodeURIComponent('Chauffeur journey inquiry')}&body=${encodeURIComponent(body)}`;document.querySelector('#contact-status').textContent='Your email app should open with a draft. If it does not, email '+business.email.toLowerCase()+' directly.'});
startMotion(path);
