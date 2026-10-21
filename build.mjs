import fs from 'node:fs';
const origin='https://martinez-private-chauffeur.typical-sammich.chatgpt.site';
const routes=['fleet','fleet/sedan','fleet/suv','fleet/sprinter','services','services/airport-transfers','services/hourly-chauffeur','about','service-areas','contact','faq','reserve','privacy','terms'];
const template=fs.readFileSync('dist/index.html','utf8');
for(const route of routes){fs.mkdirSync(`dist/${route}`,{recursive:true});let name=route.split('/').at(-1).replaceAll('-',' ');let html=template.replace('Martinez Logistics LLC | The Art of Arriving',`${name} | Martinez Logistics LLC`).replace(`href="${origin}/"`,`href="${origin}/${route}/"`);fs.writeFileSync(`dist/${route}/index.html`,html)}
fs.writeFileSync('dist/404.html',template);fs.writeFileSync('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);fs.writeFileSync('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['',...routes].map(r=>`<url><loc>${origin}/${r?r+'/':''}</loc></url>`).join('')}</urlset>`);
let links=[...template.matchAll(/(?:href|src)="(\/[^"?#]*)/g)].map(x=>x[1]);for(const link of links){if(!fs.existsSync('dist'+link)&&!fs.existsSync('dist'+link+'/index.html'))throw Error('Missing '+link)}console.log(`Built ${routes.length+1} pages; shared links verified.`);
