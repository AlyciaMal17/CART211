// Silent tracker: everything stays in this browser (localStorage). Press D to see what the hat has collected.
const Beast=(()=>{
const K='beastWithin',blank=()=>({start:Date.now(),rejected:false,clicks:0,scores:{phoenix:0,hippogriff:0,niffler:0,thestral:0,bowtruckle:0,nargle:0},q:{}});
let d=JSON.parse(localStorage.getItem(K)||'null')||blank(),qid=null,t0=0,first=null,hov={},since={};
const save=()=>localStorage.setItem(K,JSON.stringify(d));
const go=url=>{document.body.classList.add('out');setTimeout(()=>location.href=url,800)};
const begin=id=>{qid=id;t0=performance.now();first=null;hov={};since={}};
function options(sel,pts,next){
  document.querySelectorAll(sel).forEach(el=>{const o=el.dataset.opt;
    el.addEventListener('mouseenter',()=>{first=first||o;since[o]=performance.now()});
    el.addEventListener('mouseleave',()=>{hov[o]=(hov[o]||0)+performance.now()-since[o]});
    el.addEventListener('click',()=>{
      if(since[o])hov[o]=(hov[o]||0)+performance.now()-since[o];
      d.q[qid]={hesitationSec:+((performance.now()-t0)/1000).toFixed(2),firstHovered:first,chosen:o,
        hoverSec:Object.fromEntries(Object.entries(hov).map(([k,v])=>[k,+(v/1000).toFixed(2)]))};
      Object.entries(pts[o]).forEach(([c,n])=>d.scores[c]+=n);d.clicks++;save();go(next)});
  });
}
// auto UI: progress candles, "hat memory" strip, debug panel
const tr=document.querySelector('.trail');
if(tr){const s=+tr.dataset.step;tr.textContent=Array.from({length:8},(_,i)=>i<s?'●':'○').join(' ')}
document.body.insertAdjacentHTML('beforeend','<div class="memory">The hat is paying attention... <span id="mt"></span></div><div class="debug" id="dbg"></div>');
setInterval(()=>document.getElementById('mt').textContent=Math.round((Date.now()-d.start)/1000)+'s on site',1000);
addEventListener('keydown',e=>{if(e.key.toLowerCase()==='d'){const b=document.getElementById('dbg');b.textContent=JSON.stringify(d,null,1);b.style.display=b.style.display==='block'?'none':'block'}});
return{data:()=>d,fresh(){d=blank();save()},set(k,v){d[k]=v;save()},begin,options,go};
})();
