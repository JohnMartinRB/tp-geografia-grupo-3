window.FX=!matchMedia("(prefers-reduced-motion: reduce)").matches;document.body.classList.toggle("fx",FX);
const COL=["#c8962b","#6f8a2f","#8a5a2b","#4f86a8"];
const TYPES=[["bar","Barras"],["barH","Barras horizontales"],["line","Líneas"],["doughnut","Torta"]];
const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();

function el(t,p,h){const e=document.createElement(t);Object.assign(e,p||{});if(h!==undefined)e.innerHTML=h;return e}
CHARTS.forEach(c=>{c.o=JSON.stringify([c.labels,c.series]);c.type=c.type||"bar";mk(c)});
matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>CHARTS.forEach(draw));
function mk(c){
 const s=el("section");s.className="card";
 s.append(el("h2",{},c.title),el("p",{className:"mut"},c.sub+" · Unidad: "+c.unit));
 const bar=el("div");bar.className="bar";
 const sel=el("select");TYPES.forEach(([v,n])=>sel.add(new Option(n,v)));sel.value=c.type;sel.onchange=()=>{c.type=sel.value;draw(c)};
 const add=el("button",{},"+ Agregar fila");add.onclick=()=>{c.labels.push("Nuevo");c.series.forEach(x=>x.data.push(null));tbl(c);draw(c)};
 const rst=el("button",{},"Restablecer datos");rst.onclick=()=>{[c.labels,c.series]=JSON.parse(c.o);tbl(c);draw(c)};
 const png=el("button",{},"Descargar PNG");png.onclick=()=>{el("a",{href:c.cv.toDataURL("image/png"),download:c.id+".png"}).click()};
 bar.append(sel,add,rst,png);
 const w=el("div");w.className="cv";c.cv=el("canvas");w.append(c.cv);
 c.tb=el("div");c.tb.className="tw";
 const n=el("div",{contentEditable:"true"},c.txt);n.className="note";
 s.append(bar,w,c.tb,n,el("p",{className:"src"},"Fuente: "+c.src));
 document.getElementById('g'+c.g).append(s);tbl(c);draw(c);
}
function tbl(c){
 const t=el("table"),hd=el("tr");hd.append(el("th",{},"Categoría"));
 c.series.forEach(x=>{const th=el("th"),i=el("input",{value:x.name});i.oninput=()=>{x.name=i.value;draw(c)};th.append(i);hd.append(th)});
 hd.append(el("th"));t.append(hd);
 c.labels.forEach((l,r)=>{const tr=el("tr"),td=el("td"),a=el("input",{value:l});a.oninput=()=>{c.labels[r]=a.value;draw(c)};td.append(a);tr.append(td);
  c.series.forEach(x=>{const d=el("td"),i=el("input",{type:"number",step:"any",value:x.data[r]==null?"":x.data[r]});i.oninput=()=>{x.data[r]=i.value===""?null:+i.value;draw(c)};d.append(i);tr.append(d)});
  const dd=el("td"),b=el("button",{title:"Quitar fila"},"×");b.onclick=()=>{c.labels.splice(r,1);c.series.forEach(x=>x.data.splice(r,1));tbl(c);draw(c)};dd.append(b);tr.append(dd);t.append(tr)});
 c.tb.replaceChildren(t);
}
function draw(c){
 const t=c.type,pie=t==="doughnut";
 Chart.defaults.color=css("--fg");Chart.defaults.borderColor=css("--grid");Chart.defaults.font.family="system-ui,sans-serif";
 const ds=(pie?[c.series[0]]:c.series).map((s,i)=>({label:s.name,data:s.data,backgroundColor:pie?c.labels.map((_,j)=>COL[j%4]):COL[i%4],borderColor:pie?css("--card"):COL[i%4],borderWidth:2,borderRadius:t==='line'?0:6,spanGaps:true,tension:.25}));
 if(c.ch)c.ch.destroy();
 c.ch=new Chart(c.cv,{type:t==="barH"?"bar":t,data:{labels:c.labels,datasets:ds},options:{indexAxis:t==="barH"?"y":"x",responsive:true,animation:window.FX?{duration:900}:false,maintainAspectRatio:false,
  plugins:{legend:{display:pie||c.series.length>1},tooltip:{callbacks:{label:x=>x.dataset.label+": "+x.formattedValue+" "+c.unit}}},
  scales:pie?{}:{x:{beginAtZero:true},y:{beginAtZero:true}}}});
}
document.querySelectorAll(".nav button").forEach(b=>b.onclick=()=>{const g=b.dataset.g,open=!b.classList.contains("on");
 document.querySelectorAll(".nav button").forEach(x=>x.classList.toggle("on",open&&x===b));
 ["1B","2C"].forEach(k=>document.getElementById("g"+k).hidden=!(open&&k===g));
 if(open){CHARTS.filter(c=>c.g===g).forEach(c=>c.ch.resize());document.getElementById("g"+g).scrollIntoView({behavior:"smooth"})}});
(()=>{const pb=document.getElementById("pb"),g=pb.parentElement,im=new Image();g.style.gridTemplateColumns="1fr";im.onload=()=>{document.getElementById("pv").src=im.src;pb.hidden=false;g.style.gridTemplateColumns=""};im.src=CONFIG.imagenPresentacion})();
(function(){
 const $=id=>document.getElementById(id),fb=$("fx");
 const lab=()=>fb.textContent=FX?"✨ Animaciones: sí":"✨ Animaciones: no";lab();
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.08});
 document.querySelectorAll(".card").forEach(c=>io.observe(c));
 document.querySelectorAll(".tilt").forEach(c=>{c.addEventListener("pointermove",e=>{if(!FX||e.pointerType!=="mouse")return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform="perspective(800px) rotateY("+x*6+"deg) rotateX("+(-y*6)+"deg)"});c.addEventListener("pointerleave",()=>c.style.transform="")});
 const orbs=[...document.querySelectorAll(".orb")],hero=$("hero"),cv=$("three"),ht=hero.querySelector(".t");
 addEventListener("scroll",()=>{const y=FX?scrollY:0;ht.style.transform="translateY("+y*.22+"px)";cv.style.transform="translateY("+y*.12+"px)";orbs.forEach(o=>o.style.transform="translateY("+(-y*o.dataset.s)+"px)")},{passive:true});
 let sync=()=>{};
 fb.onclick=()=>{window.FX=!FX;document.body.classList.toggle("fx",FX);lab();CHARTS.forEach(c=>{c.ch.options.animation=FX?{duration:900}:false});dispatchEvent(new Event("scroll"));sync()};
 const sv=$("sl"),fsb=$("sf"),LAB="⛶ Pantalla completa",OUT="✖ Salir";
 const fixed=on=>{sv.classList.toggle("fs",on);fsb.textContent=on?OUT:LAB};
 fsb.onclick=async()=>{if(document.fullscreenElement){document.exitFullscreen();return}if(sv.classList.contains("fs")){fixed(false);return}try{await sv.requestFullscreen()}catch(e){fixed(true)}};
 document.addEventListener("fullscreenchange",()=>{fsb.textContent=document.fullscreenElement?OUT:LAB});
 addEventListener("keydown",e=>{if(e.key==="Escape"&&sv.classList.contains("fs"))fixed(false)});
 let sl=[],si=0;const show=()=>{if(!sl.length)return;si=(si+sl.length)%sl.length;$("sim").src=sl[si];$("sn").textContent=(si+1)+" / "+sl.length;$("sl").hidden=false};
 const probe=u=>new Promise(r=>{const i=new Image();i.onload=()=>r(u);i.onerror=()=>r(null);i.src=u});
 (async()=>{let L=(CONFIG.diapositivas||[]).slice();if(!L.length){for(let n=1;n<=60;n++){const u=await probe("assets/diapositivas/"+n+".png");if(!u)break;L.push(u)}}sl=L;if(sl.length){$("canva").hidden=false;show()}})();
 $("sp").onclick=()=>{si--;show()};$("sx").onclick=()=>{si++;show()};
 addEventListener("keydown",e=>{if(sl.length&&!/INPUT|SELECT/.test(e.target.tagName)&&!e.target.isContentEditable){if(e.key==="ArrowRight"){si++;show()}if(e.key==="ArrowLeft"){si--;show()}}});
 
 if(!window.THREE)return;let R;try{R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true})}catch(e){return}
 R.setPixelRatio(Math.min(devicePixelRatio,2));R.setClearColor(0,0);
 const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(52,1,.1,90);
 const HZ="vec3(.98,.84,.6)",SW="float gust=sin(w.x*.22+w.z*.16-t*1.3)*.5+.5;float sw=(sin(t*1.7+w.x*.7+w.z*.5)*.07+sin(t*.8+w.z*.9)*.05+gust*.22-.08)*(.75+m.x*.5);";
 const U={t:{value:0},m:{value:new THREE.Vector2()}};
 const head="uniform float t;uniform vec2 m;varying float s;varying float d;varying float b;varying float h;";
 const stalkM=new THREE.ShaderMaterial({side:THREE.DoubleSide,uniforms:U,
  vertexShader:head+"void main(){vec4 p=instanceMatrix*vec4(position,1.);vec4 w=instanceMatrix*vec4(0.,0.,0.,1.);float k=position.y*position.y;"+SW+"p.x+=sw*k*1.4;p.z+=sin(t*1.1+w.x*.5)*.04*k;h=position.y;s=fract(sin(w.x*12.9+w.z*78.2)*43758.5);b=gust;vec4 v=viewMatrix*modelMatrix*p;d=clamp(-v.z/30.,0.,1.);gl_Position=projectionMatrix*v;}",
  fragmentShader:"varying float s;varying float d;varying float b;varying float h;void main(){vec3 c=mix(vec3(.3,.33,.12),vec3(.85,.69,.29),smoothstep(0.,1.,h*1.15));c=mix(c,vec3(.5,.58,.2),(1.-s)*.35*(1.-h));c*=(.45+.55*h)*(.85+.3*b);c+=vec3(.12,.09,.02)*b*h;c=mix(c,"+HZ+",pow(d,1.3)*.9);gl_FragColor=vec4(c,1.);}"});
 const earM=new THREE.ShaderMaterial({uniforms:U,
  vertexShader:head+"void main(){vec4 p=instanceMatrix*vec4(position,1.);vec4 w=instanceMatrix*vec4(0.,0.,0.,1.);"+SW+"p.x+=sw*1.4;p.z+=sin(t*1.1+w.x*.5)*.04;h=1.;s=fract(sin(w.x*12.9+w.z*78.2)*43758.5);b=gust;vec4 v=viewMatrix*modelMatrix*p;d=clamp(-v.z/30.,0.,1.);gl_Position=projectionMatrix*v;}",
  fragmentShader:"varying float s;varying float d;varying float b;void main(){vec3 c=vec3(.86,.67,.24)*(.8+.35*s)*(.85+.3*b);c=mix(c,"+HZ+",pow(d,1.3)*.9);gl_FragColor=vec4(c,1.);}"});
 const g=new THREE.PlaneGeometry(.045,1,1,5);g.translate(0,.5,0);const gp=g.attributes.position;for(let i=0;i<gp.count;i++){const y=gp.getY(i);gp.setX(i,gp.getX(i)*(1-.6*y));gp.setZ(i,y*y*.12)}
 const N=innerWidth<700?8000:16000,st=new THREE.InstancedMesh(g,stalkM,N),ea=new THREE.InstancedMesh(new THREE.SphereGeometry(1,6,5),earM,N),o=new THREE.Object3D();
 for(let i=0;i<N;i++){const x=(Math.random()-.5)*38,z=4-Math.pow(Math.random(),1.6)*31,H=.85+Math.random()*.55,ry=Math.random()*3.14;
  o.position.set(x,0,z);o.rotation.set(0,ry,0);o.scale.set(1,H,1);o.updateMatrix();st.setMatrixAt(i,o.matrix);
  o.position.set(x,H,z);o.rotation.set(0,ry,(Math.random()-.5)*.5);o.scale.set(.028,.11,.028);o.updateMatrix();ea.setMatrixAt(i,o.matrix)}
 S.add(st,ea);
 const gm=new THREE.ShaderMaterial({vertexShader:"varying float d;void main(){vec4 v=viewMatrix*modelMatrix*vec4(position,1.);d=clamp(-v.z/30.,0.,1.);gl_Position=projectionMatrix*v;}",fragmentShader:"varying float d;void main(){vec3 c=mix(vec3(.36,.29,.12),"+HZ+",pow(d,1.3));gl_FragColor=vec4(c,1.);}"});
 const gr=new THREE.Mesh(new THREE.PlaneGeometry(90,75),gm);gr.rotation.x=-Math.PI/2;gr.position.set(0,-.01,-30);S.add(gr);
 const tex=(stops)=>{const k=document.createElement("canvas");k.width=k.height=128;const x=k.getContext("2d"),r=x.createRadialGradient(64,64,0,64,64,64);stops.forEach(s=>r.addColorStop(s[0],s[1]));x.fillStyle=r;x.fillRect(0,0,128,128);return new THREE.CanvasTexture(k)};
 const sun=new THREE.Sprite(new THREE.SpriteMaterial({map:tex([[0,"rgba(255,244,200,1)"],[.12,"rgba(255,226,150,.95)"],[.4,"rgba(255,196,110,.35)"],[1,"rgba(255,190,100,0)"]]),depthWrite:false,fog:false,transparent:true}));
 sun.position.set(6,5,-31);sun.scale.set(20,20,1);S.add(sun);
 const PN=180,pg=new THREE.BufferGeometry(),pa=new Float32Array(PN*3);for(let i=0;i<PN;i++){pa[i*3]=(Math.random()-.5)*16;pa[i*3+1]=Math.random()*3.5;pa[i*3+2]=3-Math.random()*14}
 pg.setAttribute("position",new THREE.BufferAttribute(pa,3));S.add(new THREE.Points(pg,new THREE.PointsMaterial({map:tex([[0,"rgba(255,248,215,1)"],[1,"rgba(255,248,215,0)"]]),size:.2,transparent:true,opacity:.75,depthWrite:false})));
 const mouse={x:0,y:0};let raf=0,vis=true;
 const size=()=>{const w=hero.clientWidth,h=hero.clientHeight;R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix()};size();addEventListener("resize",()=>{size();frame(performance.now())});
 hero.addEventListener("pointermove",e=>{const r=hero.getBoundingClientRect();mouse.x=(e.clientX-r.left)/r.width*2-1;mouse.y=-((e.clientY-r.top)/r.height*2-1)});
 function frame(ms){const t=ms/1000;U.t.value=t;U.m.value.set(mouse.x,mouse.y);C.position.set(mouse.x*.6,1.05+mouse.y*.2,5);C.lookAt(mouse.x*.4,.55,-8);
  const a=pg.attributes.position;for(let i=0;i<PN;i++){a.array[i*3+1]+=.004;a.array[i*3]+=Math.sin(t+i)*.003;if(a.array[i*3+1]>3.5)a.array[i*3+1]=0}a.needsUpdate=true;R.render(S,C);
  if(FX&&vis)raf=requestAnimationFrame(frame)}
 sync=()=>{cancelAnimationFrame(raf);if(FX&&vis)raf=requestAnimationFrame(frame);else frame(1500)};
 new IntersectionObserver(es=>{vis=es[0].isIntersecting;sync()}).observe(hero);sync();
})();
