import * as T from './vendor/three.module.min.js';

// Original procedural concept models. These are category stand-ins, not fleet claims.
export const vehicleSpecs={Sedan:{length:5.35,width:1.95,height:1.54,wheelbase:3.25},SUV:{length:5.45,width:2.14,height:1.94,wheelbase:3.3},Sprinter:{length:6.55,width:2.13,height:2.72,wheelbase:4.05}};
export function createVehicle(category='Sedan'){
 const spec=vehicleSpecs[category],van=category==='Sprinter',suv=category==='SUV',L=spec.length,W=spec.width,H=spec.height;
 const group=new T.Group();group.name=`Representative ${category}`;const wheels=[];
 const paint=new T.MeshPhysicalMaterial({color:0x171b20,metalness:.68,roughness:.22,clearcoat:1,clearcoatRoughness:.15});
 const trim=new T.MeshStandardMaterial({color:0x060709,metalness:.15,roughness:.4});
 const chrome=new T.MeshStandardMaterial({color:0xaeb4b9,metalness:1,roughness:.19});
 const glass=new T.MeshPhysicalMaterial({color:0x14212c,metalness:.35,roughness:.12,clearcoat:1,side:T.DoubleSide});
 const rubber=new T.MeshStandardMaterial({color:0x101113,roughness:.83});
 const white=new T.MeshStandardMaterial({color:0xe4f2ff,emissive:0xc9e5ff,emissiveIntensity:2});
 const red=new T.MeshStandardMaterial({color:0xa3121b,emissive:0xa3121b,emissiveIntensity:1.2});
 function mesh(geo,mat,x=0,y=0,z=0,parent=group){const m=new T.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
 function box(x,y,z,dx,dy,dz,mat=paint){return mesh(new T.BoxGeometry(dx,dy,dz),mat,x,y,z)}
 function outline(points,material=chrome,radius=.012){const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)),false,'catmullrom',.1);return mesh(new T.TubeGeometry(curve,points.length*5,radius,5,false),material)}
 function sideShape(points,width,mat,bevel=.04){const shape=new T.Shape();points.forEach(([x,y],i)=>i?shape.lineTo(x,y):shape.moveTo(x,y));shape.closePath();const geo=new T.ExtrudeGeometry(shape,{depth:width,bevelEnabled:bevel>0,bevelThickness:bevel,bevelSize:bevel,bevelSegments:3,steps:1});geo.translate(0,0,-width/2);return mesh(geo,mat)}
 function panel(points,mat=glass){const geo=new T.BufferGeometry();const vertices=[];for(let i=1;i<points.length-1;i++)vertices.push(...points[0],...points[i],...points[i+1]);geo.setAttribute('position',new T.Float32BufferAttribute(vertices,3));geo.computeVertexNormals();return mesh(geo,mat)}
 const wheelR=van?.47:.44,axle=spec.wheelbase/2,base=.48,hood=van?1.16:suv?1.24:.98;
 const bodyPoints=[[-L/2+.08,base],[-L/2,base+.22],[-L/2+.08,hood-.08],[-L/2+.45,hood+.02],[L/2-.4,hood],[L/2,hood-.12],[L/2,base+.22],[L/2-.1,base]];
 sideShape(bodyPoints,W,paint,.07);box(0,.44,0,L-.25,.17,W-.06,trim);
 let roofRear,roofFront,windowBottom;
 if(van){roofRear=-L/2+.2;roofFront=L/2-1.02;windowBottom=1.3;sideShape([[-L/2+.08,1.08],[-L/2+.1,H-.12],[-L/2+.3,H],[roofFront-.05,H],[L/2-.25,1.33],[L/2-.13,1.06]],W-.04,paint,.055)}
 else{roofRear=-L/2+(suv?.24:.95);roofFront=suv?.95:.6;windowBottom=hood+.06;sideShape([[roofRear-.35,hood],[roofRear+.12,H-.13],[roofRear+.4,H],[roofFront-.15,H],[roofFront+.32,H-.12],[roofFront+.95,hood]],W-.22,paint,.045)}
 const zglass=W/2+(van?.018:-.085),top=H-.12;
 for(const sign of [-1,1]){
  const z=sign*zglass;
  if(van){
   panel([[roofFront+.03,top-.08,z],[L/2-.33,1.37,z],[roofFront-.62,1.37,z],[roofFront-.62,top-.08,z]]);
   panel([[roofFront-.76,top-.1,z],[-L/2+.4,top-.1,z],[-L/2+.4,1.45,z],[roofFront-.76,1.45,z]]);
   for(let x=-L/2+.6;x<roofFront-.7;x+=.95)box(x,(top+1.45)/2,z,.055,top-1.45,.022,trim);
  }else{
   const rear=roofRear+.28,front=roofFront+.13,lowerFront=roofFront+.76,bottom=windowBottom+.025;
   panel([[rear,top-.03,z],[front,top-.03,z],[lowerFront,bottom,z],[roofRear-.13,bottom,z]]);
   box(-.15,(top+bottom)/2,z,.085,top-bottom+.02,.035,trim);
   outline([[roofRear-.13,bottom,z*1.005],[rear,top,z*1.005],[front,top,z*1.005],[lowerFront,bottom,z*1.005],[roofRear-.13,bottom,z*1.005]]);
  }
  const seamTop=van?1.35:hood+.03;
  for(const x of van?[roofFront-.66,-.5]:[-.2,1.02]){outline([[x,.57,sign*(W/2+.075)],[x,seamTop,sign*(W/2+.075)]],trim,.009);box(x-.22,seamTop-.12,sign*(W/2+.086),.2,.04,.03,chrome)}
  outline([[-L/2+.25,.66,sign*(W/2+.074)],[L/2-.25,.66,sign*(W/2+.074)]],chrome,.013);
  box(van?roofFront+.15:.98,van?1.52:suv?1.43:1.2,sign*(W/2+.19),.28,.16,.21,paint);
 }
 const windshieldTop=van?roofFront-.02:roofFront+.24,windshieldBottom=van?L/2-.29:roofFront+.92;
 panel([[windshieldTop,top,-W*.42],[windshieldTop,top,W*.42],[windshieldBottom,hood+.08,W*.43],[windshieldBottom,hood+.08,-W*.43]]);
 if(!van){const backTop=roofRear+.2;panel([[backTop,top,-W*.41],[roofRear-.31,hood+.08,-W*.43],[roofRear-.31,hood+.08,W*.43],[backTop,top,W*.41]])}
 // Hood creases, front fascia, grille, bumpers, lamps and rear detailing.
 for(const z of [-W*.29,W*.29])outline([[L/2-.15,hood+.014,z],[Math.min(windshieldBottom,L/2-.35),hood+.08,z]],paint,.014);
 box(L/2+.045,.77,0,.035,.4,W*.55,trim);box(L/2+.067,.98,0,.035,.025,W*.59,chrome);box(L/2+.067,.56,0,.035,.025,W*.59,chrome);
 for(let y=.63;y<=.9;y+=.072)box(L/2+.07,y,0,.04,.018,W*.53,chrome);
 for(const sign of [-1,1]){
  box(L/2+.048,hood-.08,sign*W*.37,.045,.11,W*.23,white);
  if(suv)box(L/2+.05,hood-.22,sign*W*.46,.05,.35,.035,white);
  box(-L/2-.075,hood-.13,sign*W*.39,.035,van?.52:.17,van?.09:W*.18,red);
 }
 box(L/2+.05,.45,0,.08,.13,W*.85,trim);box(-L/2-.08,.48,0,.06,.12,W*.85,trim);
 box(-L/2-.115,.75,0,.03,.15,.43,chrome);
 if(van){outline([[-L/2-.09,.62,0],[-L/2-.09,H-.15,0]],trim,.012);panel([[-L/2-.1,1.5,-W*.39],[-L/2-.1,H-.22,-W*.39],[-L/2-.1,H-.22,-.07],[-L/2-.1,1.5,-.07]]);panel([[-L/2-.1,1.5,.07],[-L/2-.1,H-.22,.07],[-L/2-.1,H-.22,W*.39],[-L/2-.1,1.5,W*.39]])}
 // Four independent wheel assemblies. Their spin is used only for the arrival.
 for(const x of [-axle,axle])for(const sign of [-1,1]){
  const wheel=new T.Group();wheel.position.set(x,wheelR,sign*(W/2+.025));group.add(wheel);wheels.push(wheel);
  const tire=mesh(new T.CylinderGeometry(wheelR,wheelR,.26,36),rubber,0,0,0,wheel);tire.rotation.x=Math.PI/2;
  const rim=mesh(new T.CylinderGeometry(wheelR*.71,wheelR*.71,.275,36),trim,0,0,0,wheel);rim.rotation.x=Math.PI/2;
  const ring=mesh(new T.TorusGeometry(wheelR*.72,.022,8,40),chrome,0,0,sign*.145,wheel);
  for(let s=0;s<10;s++){const a=s*Math.PI/5;const spoke=mesh(new T.BoxGeometry(.045,wheelR*1.22,.027),chrome,0,0,sign*.15,wheel);spoke.rotation.z=a}
  const hub=mesh(new T.CylinderGeometry(.1,.1,.032,20),chrome,0,0,sign*.17,wheel);hub.rotation.x=Math.PI/2;
  // Wheel arch follows the upper tire contour, anchored to the body.
  const archPoints=[];for(let n=0;n<=20;n++){const a=n*Math.PI/20;archPoints.push([x+Math.cos(a)*(wheelR+.07),wheelR+Math.sin(a)*(wheelR+.07),sign*(W/2+.08)])}outline(archPoints,trim,.037);
 }
 if(suv){for(const z of [-W*.33,W*.33])outline([[-L/2+.55,H+.06,z],[roofFront-.1,H+.06,z]],chrome,.025)}
 group.userData={category,wheels,spec};return group;
}
