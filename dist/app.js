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
if(path.startsWith('/fleet')||path==='/reserve')import('./showroom.js').then(m=>m.startShowroom(path));
if(path==='/contact')document.querySelector('#contact-form').addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;const fields=new FormData(form),body=`Name: ${fields.get('name')}\nReply email: ${fields.get('email')}\n\n${fields.get('message')}`;location.href=`mailto:${business.email}?subject=${encodeURIComponent('Chauffeur journey inquiry')}&body=${encodeURIComponent(body)}`;document.querySelector('#contact-status').textContent='Your email app should open with a draft. If it does not, email '+business.email.toLowerCase()+' directly.'});
startMotion(path);
