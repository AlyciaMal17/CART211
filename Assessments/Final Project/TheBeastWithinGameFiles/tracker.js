// Silent tracker. Everything stays in this browser (localStorage). Press D on any page to see what the hat has collected.
const Beast=(()=>{
const K='beastWithin',C=['phoenix','hippogriff','niffler','thestral','bowtruckle','nargle'];
const blank=()=>({time:{},start:Date.now(),rejected:false,clicks:0,mouseDist:0,scrollDepth:0,scores:Object.fromEntries(C.map(c=>[c,0])),q:{}});
const rd=()=>{try{const s=localStorage.getItem(K);if(s)return JSON.parse(s)}catch(e){}try{if(window.name.startsWith('bw:'))return JSON.parse(window.name.slice(3))}catch(e){}return null};
let d=rd()||blank(),qid=null,t0=0,first=null,hov={},since={},sel=null,changes=0,lx=null,ly=null;
d.time=d.time||{};const PG=location.pathname.split('/').pop().replace('.html','')||'index',loadT=Date.now();let base=d.time[PG]||0,cleared=false;
const save=()=>{if(cleared)return;d.time[PG]=+(base+(Date.now()-loadT)/1000).toFixed(1);const s=JSON.stringify(d);try{localStorage.setItem(K,s)}catch(e){}window.name='bw:'+s};
const go=url=>{save();window.Music&&Music.fade();document.body.classList.add('out');setTimeout(()=>location.href=url,800)};
const begin=id=>{qid=id;t0=performance.now();first=null;hov={};since={};sel=null;changes=0};
const close=o=>{if(since[o]!=null){hov[o]=(hov[o]||0)+performance.now()-since[o];delete since[o]}};
function commit(o,pts,cb){Object.keys(since).forEach(close);const old=d.q[qid];if(old&&old.pts)Object.entries(old.pts).forEach(([c,n])=>d.scores[c]-=n);
  d.q[qid]={hesitationSec:+((performance.now()-t0)/1000).toFixed(2),firstHovered:first,chosen:o,pts:pts[o],changes,hoverSec:Object.fromEntries(Object.entries(hov).map(([k,v])=>[k,+(v/1000).toFixed(2)]))};
  Object.entries(pts[o]).forEach(([c,n])=>d.scores[c]+=n);save();cb(o)}
function options(selector,pts,cb,cfg={}){const cards=document.querySelectorAll(selector),conf=cfg.confirm&&document.querySelector(cfg.confirm);
  cards.forEach(el=>{const o=el.dataset.opt;
    el.addEventListener('pointerenter',()=>{first=first||o;since[o]=performance.now()});
    el.addEventListener('pointerleave',()=>close(o));
    el.addEventListener('click',()=>{if(!conf){commit(o,pts,cb);return}
      if(sel&&sel!==o)changes++;sel=o;cards.forEach(c=>c.classList.toggle('sel',c===el));conf.style.display='inline-block'})});
  if(conf)conf.addEventListener('click',()=>{if(sel){conf.style.display='none';commit(sel,pts,cb)}})}
function verdict(){const qs=Object.values(d.q),n=qs.length||1,avgH=qs.reduce((a,q)=>a+q.hesitationSec,0)/n,
  hovers=qs.reduce((a,q)=>a+Object.keys(q.hoverSec||{}).filter(k=>k!==q.chosen).length,0),changes=qs.reduce((a,q)=>a+(q.changes||0),0);
  const b=Object.fromEntries(C.map(c=>[c,0]));
  if(avgH<3){b.phoenix+=2;b.niffler+=1}else if(avgH<7){b.hippogriff+=2;b.nargle+=1}else{b.thestral+=2;b.bowtruckle+=1}
  if(hovers>=6)b.niffler+=2;if(changes>=1)b.nargle+=2;if(d.scrollDepth<.4)b.thestral+=1;else b.phoenix+=1;if(d.mouseDist>9000)b.niffler+=1;if(d.rejected)b.nargle+=1;
  const pick=o=>C.reduce((m,c)=>o[c]>o[m]?c:m,C[0]),tot=Object.fromEntries(C.map(c=>[c,d.scores[c]+b[c]*1.5]));
  return d.result={answers:pick(d.scores),behaviour:pick(b),final:pick(tot),avgH:+avgH.toFixed(1),hovers,changes}}
addEventListener('pointermove',e=>{if(lx!=null)d.mouseDist+=Math.hypot(e.clientX-lx,e.clientY-ly);lx=e.clientX;ly=e.clientY});
addEventListener('pointerdown',()=>d.clicks++);addEventListener('pagehide',save);
// back button: goes to the previous page without wiping your data (answers are replaced, not double-counted)
const PAGE=location.pathname.split('/').pop().replace('.html','')||'index',PREV={forest:'index.html?back=1',hut:'forest.html',diagon:'hut.html',quidditch:'diagon.html',hall:'quidditch.html',potions:'hall.html',room:'potions.html',sorting:'room.html',learned:'sorting.html'};
if(PREV[PAGE]){document.body.insertAdjacentHTML('beforeend','<button class="back" id="back">◂ Back</button>');document.getElementById('back').onclick=()=>go(PREV[PAGE])}
// auto UI: progress candles, "hat memory" strip, debug panel
const tr=document.querySelector('.trail');if(tr){const s=+tr.dataset.step;tr.textContent=Array.from({length:8},(_,i)=>i<s?'●':'○').join(' ')}
document.body.insertAdjacentHTML('beforeend','<div class="memory">The hat is paying attention... <span id="mt"></span></div><div class="debug" id="dbg"></div>');
setInterval(()=>document.getElementById('mt').textContent=Math.round((Date.now()-d.start)/1000)+'s on site',1000);
addEventListener('keydown',e=>{if(e.key.toLowerCase()==='d'){const b=document.getElementById('dbg');b.textContent=JSON.stringify(d,null,1);b.style.display=b.style.display==='block'?'none':'block'}});
return{data:()=>d,fresh(){d=blank();base=0;save()},clear(){d=blank();cleared=true;try{localStorage.removeItem(K)}catch(e){}window.name=''},set(k,v){d[k]=v;save()},begin,options,go,verdict,selected:()=>sel,depth(p){d.scrollDepth=Math.max(d.scrollDepth,+p.toFixed(2))}};
})();
