import {introHead,introMarkup} from './dist/brand-intro.js';
import fs from 'node:fs';
import {pageContent,routeMeta,escape} from './dist/content.js';
import {business} from './dist/business.js';
const origin=process.env.SITE_URL||(process.env.VERCEL_PROJECT_PRODUCTION_URL?'https://'+process.env.VERCEL_PROJECT_PRODUCTION_URL:business.origin);
const template=fs.readFileSync('template.html','utf8');
const routes=Object.keys(routeMeta);
function render(route){const [title,description]=routeMeta[route]||['Page Not Found | Martinez Logistics LLC','Find your next journey with Martinez Logistics.'];const canonical=origin+(route==='/'?'/':route+'/');const schema={'@context':'https://schema.org','@type':'Organization',name:business.name,url:origin,email:business.email,logo:origin+'/assets/logo.webp'};const hints=route==='/'?introHead+'<link rel="preload" href="/assets/logo.webp" as="image"><link rel="preload" href="/media/chauffeur-pickup.webp" as="image" media="(min-width: 701px)"><link rel="preload" href="/media/chauffeur-pickup-mobile.webp" as="image" media="(max-width: 700px)">':(route.startsWith('/fleet')||route==='/reserve')?'<link rel="preload" href="/models/studio.hdr" as="fetch" crossorigin>':'';return template.replace('{{intro}}',route==='/'?introMarkup():'').replace('{{pageHints}}',hints).replaceAll('{{origin}}',escape(origin)).replaceAll('{{title}}',escape(title)).replaceAll('{{description}}',escape(description)).replaceAll('{{canonical}}',escape(canonical)).replace('{{schema}}',JSON.stringify(schema).replaceAll('<','\\u003c')).replace('{{content}}',pageContent(route))}
for(const route of routes){const dir='dist'+(route==='/'?'':route);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(dir+'/index.html',render(route))}
fs.writeFileSync('dist/404.html',render('/404'));
fs.writeFileSync('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
fs.writeFileSync('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r=>`<url><loc>${origin}${r==='/'?'/':r+'/'}</loc></url>`).join('')}</urlset>`);
let checked=0;for(const route of routes){for(const [,url]of render(route).matchAll(/(?:href|src)="(\/[^"?#]*)/g)){if(!fs.existsSync('dist'+url)&&!fs.existsSync('dist'+url+'/index.html'))throw Error(`Missing ${url} on ${route}`);checked++}}
console.log(`Built ${routes.length} prerendered pages; ${checked} internal links and assets verified.`);
