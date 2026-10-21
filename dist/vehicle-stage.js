import * as T from './vendor/three.module.min.js';
import {createVehicle} from './vehicles.js';

export function createStage(host,{category='Sedan',cinematic=false,onReady=()=>{},onError=()=>{}}={}){
 let renderer;try{renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'})}catch(error){onError(error);return null}
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<760?1.35:1.75));renderer.setClearColor(0x0c0e10);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
 const canvas=renderer.domElement;canvas.setAttribute('aria-label',cinematic?'Representative luxury SUV arriving outside a modern entrance':`Interactive representative ${category} model. Drag to rotate; use the view buttons for keyboard control.`);canvas.setAttribute('role','img');canvas.className='vehicle-canvas';host.append(canvas);
 const scene=new T.Scene();scene.background=new T.Color(0x0c0e10);scene.fog=new T.Fog(0x0c0e10,18,45);
 const camera=new T.PerspectiveCamera(35,1,.1,80);
 const envScene=new T.Scene();envScene.background=new T.Color(0x42454a);
 const addPanel=(x,y,z,w,h,color,power=3)=>{const p=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:new T.Color(color).multiplyScalar(power),side:T.DoubleSide}));p.position.set(x,y,z);p.lookAt(0,1,0);envScene.add(p)};
 addPanel(0,7,0,8,3,0xffffff,5);addPanel(5,3,2,3,5,0xf6e4c2,3);addPanel(-5,2,-3,4,3,0xdce9ff,2);
 const pmrem=new T.PMREMGenerator(renderer);const env=pmrem.fromScene(envScene,.04);scene.environment=env.texture;pmrem.dispose();envScene.traverse(o=>{o.geometry?.dispose();o.material?.dispose()});
 const ambient=new T.HemisphereLight(0xe9edf0,0x16110b,1.2);scene.add(ambient);
 const key=new T.SpotLight(0xfff4dc,85,30,.7,.7,1);key.position.set(2,8,4);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.bias=-.0005;key.target.position.set(0,0,0);scene.add(key,key.target);
 const fill=new T.DirectionalLight(0xcbd7e5,1.6);fill.position.set(-5,3,-4);scene.add(fill);
 const floor=new T.Mesh(new T.PlaneGeometry(100,100),new T.MeshStandardMaterial({color:0x080a0c,metalness:.05,roughness:.9,envMapIntensity:.08}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;floor.position.y=-.15;scene.add(floor);
 const turntable=new T.Group();scene.add(turntable);
 if(!cinematic){const platform=new T.Mesh(new T.CylinderGeometry(4.15,4.2,.15,96),new T.MeshStandardMaterial({color:0x292c2f,metalness:.7,roughness:.37}));platform.position.y=-.075;platform.receiveShadow=true;turntable.add(platform);for(const radius of [3.98,4.12]){const rim=new T.Mesh(new T.TorusGeometry(radius,.009,4,96),new T.MeshStandardMaterial({color:0x77746b,metalness:.8,roughness:.4}));rim.rotation.x=Math.PI/2;rim.position.y=.003;turntable.add(rim)}}
 // Soft, baked contact shadow complements the real-time tire shadows.
 const textureCanvas=document.createElement('canvas');textureCanvas.width=128;textureCanvas.height=128;const ctx=textureCanvas.getContext('2d');const gradient=ctx.createRadialGradient(64,64,8,64,64,64);gradient.addColorStop(0,'rgba(0,0,0,.85)');gradient.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,128,128);const contactTexture=new T.CanvasTexture(textureCanvas);const contact=new T.Mesh(new T.PlaneGeometry(7,3.4),new T.MeshBasicMaterial({map:contactTexture,transparent:true,depthWrite:false}));contact.rotation.x=-Math.PI/2;contact.position.y=.012;turntable.add(contact);
 if(cinematic){
  const stone=new T.MeshStandardMaterial({color:0x242522,roughness:.7});
  const wall=new T.Mesh(new T.BoxGeometry(34,9,.6),stone);wall.position.set(0,4,-6);scene.add(wall);
  const doorway=new T.Mesh(new T.BoxGeometry(5.8,5.2,.65),new T.MeshStandardMaterial({color:0x33261a,metalness:.1,roughness:.75,emissive:0x6a401c,emissiveIntensity:.2}));doorway.position.set(0,2.45,-5.55);scene.add(doorway);
  for(const x of [-3,3]){const pillar=new T.Mesh(new T.BoxGeometry(.25,5.8,.5),stone);pillar.position.set(x,2.75,-5.1);scene.add(pillar);const light=new T.Mesh(new T.BoxGeometry(.065,4,.05),new T.MeshBasicMaterial({color:0xe5b977}));light.position.set(x,2.8,-4.81);scene.add(light)}
  const canopy=new T.Mesh(new T.BoxGeometry(11,.22,4),stone);canopy.position.set(0,5.4,-4.4);scene.add(canopy);const warm=new T.PointLight(0xffcc83,55,12,2);warm.position.set(0,4,-3);scene.add(warm);
 }
 let model=createVehicle(category);turntable.add(model);let yaw=-.35,targetYaw=-.35,paused=false,inspectUntil=0,view='front',distance=cinematic?16:category==='Sprinter'?12:10,height=3.5,progress=0,disposed=false,visible=true,frameId,lastTime=0,interactive=!cinematic;
 camera.position.set(7.5,height,distance);const cameraGoal=new T.Vector3();
 function disposeModel(m){m.traverse(o=>{o.geometry?.dispose();if(o.material){for(const material of Array.isArray(o.material)?o.material:[o.material])material.dispose()}})}
 function setCategory(next){if(!['Sedan','SUV','Sprinter'].includes(next))return;turntable.remove(model);disposeModel(model);model=createVehicle(next);turntable.add(model);canvas.setAttribute('aria-label',`Interactive representative ${next} model. Drag to rotate.`);category=next;targetYaw=-.35;view='front';distance=next==='Sprinter'?12:10;paused=false}
 const resize=new ResizeObserver(()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()});resize.observe(host);
 const visibility=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting},{threshold:0});visibility.observe(host);
 let pointer=null;
 const down=e=>{if(!interactive)return;pointer={x:e.clientX,y:e.clientY,id:e.pointerId};inspectUntil=Infinity;canvas.setPointerCapture(e.pointerId)};
 const move=e=>{if(!pointer||!interactive)return;const dx=e.clientX-pointer.x;targetYaw+=dx*.008;height=T.MathUtils.clamp(height+(e.clientY-pointer.y)*.012,2,7);pointer.x=e.clientX;pointer.y=e.clientY};
 const up=()=>{pointer=null;inspectUntil=performance.now()+4500};canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();onError(new Error('WebGL context lost'));dispose()});
 function setView(next){view=next;targetYaw=next==='side'?.6435:next==='rear'?Math.PI-.35:-.35;inspectUntil=performance.now()+6000;height=next==='side'?3:4.2}
 function frame(now){if(disposed)return;frameId=requestAnimationFrame(frame);const dt=Math.min((now-lastTime)/1000,.04);lastTime=now;if(!visible||document.hidden)return;
  if(cinematic){const t=T.MathUtils.smoothstep(progress,.1,.77);model.position.x=T.MathUtils.lerp(-12,1.2,t);model.position.z=.3;model.rotation.y=-.13;for(const wheel of model.userData.wheels)wheel.rotation.z=-(model.position.x+12)/.44;camera.position.set(9,3.6,13);camera.lookAt(-1.5,1.25,0);contact.position.x=model.position.x;contact.position.z=.3}
  else{if(!paused&&!reduced.matches&&now>inspectUntil&&!pointer)targetYaw+=dt*Math.PI*2/60;yaw=T.MathUtils.damp(yaw,targetYaw,8,dt);turntable.rotation.y=yaw;const mobile=host.clientWidth<600;cameraGoal.set(7.5,height,mobile?distance*1.12:distance);camera.position.lerp(cameraGoal,reduced.matches?1:1-Math.exp(-dt*4));camera.lookAt(0,category==='Sprinter'?1.15:.65,0)}
  renderer.render(scene,camera);
 }
 frameId=requestAnimationFrame(frame);onReady();
 function dispose(){if(disposed)return;disposed=true;cancelAnimationFrame(frameId);resize.disconnect();visibility.disconnect();scene.traverse(o=>{o.geometry?.dispose();if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose()});env.dispose();contactTexture.dispose();renderer.dispose();canvas.remove()}
 return {setCategory,setView,setProgress(value){progress=value},setPaused(value){paused=value},setBooking(value){paused=value;targetYaw=-.35;distance=value?(category==='Sprinter'?11:8.5):(category==='Sprinter'?12:10);height=value?3:3.5},get paused(){return paused},reset(){height=3.5;targetYaw=-.35;distance=category==='Sprinter'?12:10;inspectUntil=performance.now()+4000},zoom(delta){distance=T.MathUtils.clamp(distance+delta,7,19);inspectUntil=performance.now()+4000},dispose};
}
