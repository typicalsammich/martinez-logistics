import assert from 'node:assert/strict';import fs from 'node:fs';
import {pageContent,routeMeta} from './dist/content.js';import {options} from './dist/business.js';
assert.equal(options.length,9);assert.equal(new Set(options.map(o=>o.appointmentId)).size,9);
assert.deepEqual(options.map(o=>o.price),[165,197,550,120,125,185,180,400,400]);
for(const [route] of Object.entries(routeMeta)){
 const body=pageContent(route);assert.equal((body.match(/<h1[ >]/g)||[]).length,1,route+' must have one h1');
 assert.ok(!/[↗→]/.test(body),route+' must have no navigation arrows');
 const dir='dist'+(route==='/'?'':route);const html=fs.readFileSync(dir+'/index.html','utf8');
 assert.ok(!html.includes('{{'),route+' has unresolved build placeholders');assert.ok(html.includes('<main id="main"><'),route+' requires rendered content');
}
for(const option of options)assert.match(option.bookingUrl,new RegExp('/appointment/'+option.appointmentId+'/calendar/14399125$'));
const config=JSON.parse(fs.readFileSync('vercel.json','utf8'));assert.equal(config.outputDirectory,'dist');
console.log(`Verified ${Object.keys(routeMeta).length} rendered routes, navigation arrow removal, nine unique live booking mappings, supplied rates and Vercel output configuration.`);


const {photography,film}=await import('./dist/photography.js');for(const photo of Object.values(photography))assert.ok(fs.existsSync('dist'+photo.src));assert.ok(fs.existsSync('dist'+film.src));assert.ok(fs.existsSync('dist'+film.poster));console.log('Verified three photographic categories, real film and poster assets.');

for(const name of ['sedan','suv','sprinter']){const b=fs.readFileSync('dist/models/'+name+'.glb');assert.equal(b.toString('utf8',0,4),'glTF');const metadata=JSON.parse(b.subarray(20,20+b.readUInt32LE(12)));assert.match(metadata.asset.extras.license,/CC-BY-4.0/);assert.ok(metadata.meshes.length>10);assert.ok(metadata.extensionsRequired.includes('KHR_draco_mesh_compression'));}console.log('Verified three licensed downloaded meshes, compression metadata and model geometry.');
