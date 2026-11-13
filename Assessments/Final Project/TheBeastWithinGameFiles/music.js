// Music: every page has its own generated score (Web Audio, no files needed).
// To use ONE real song on every page instead, put it at music/theme.mp3 and it will play (and carry on between pages).
const Music=(()=>{
const P=location.pathname.split('/').pop().replace('.html','')||'index';
const min=[0,2,3,5,7,8,10],phr=[0,1,3,5,7,8,10],dor=[0,2,3,5,7,9,10],pent=[0,2,4,7,9],lyd=[0,2,4,6,7,9,11],mix=[0,2,4,5,7,9,10];
const TH={
 index:{root:52,scale:min,bpm:54,step:1,bar:8,prog:[0,5,3,4],inst:'bell',oct:1,dens:.6,padG:.05,padLP:700,drone:1},
 forest:{root:45,scale:phr,bpm:46,step:1,bar:8,prog:[0,1,0,4],inst:'bell',oct:1,dens:.25,padG:.06,padLP:420,drone:1,kick:4,kickF:50},
 hut:{root:55,scale:pent,bpm:84,step:.5,bar:16,prog:[0,2,3,1],inst:'pluck',oct:0,dens:.65,padG:.035,padLP:900,padType:'triangle'},
 diagon:{root:57,scale:dor,bpm:100,step:.5,bar:12,prog:[0,3,4,0],inst:'pluck',oct:1,dens:.8,padG:.03,padLP:1200,padType:'triangle',kick:6,kickF:90},
 quidditch:{root:50,scale:mix,bpm:150,step:.5,bar:16,prog:[0,3,4,5],inst:'pluck',oct:1,dens:.85,padG:.05,padLP:2000,kick:2,kickF:60,tick:1},
 hall:{root:48,scale:lyd,bpm:58,step:1,bar:8,prog:[0,3,4,2],inst:'bell',oct:1,dens:.5,padG:.07,padLP:1100,padType:'square',drone:1},
 potions:{root:43,scale:phr,bpm:70,step:1,bar:8,prog:[0,0,1,0],inst:'pluck',oct:0,dens:.3,padG:.05,padLP:380,drone:1,drip:1},
 room:{root:60,scale:lyd,bpm:50,step:1,bar:8,prog:[0,4,2,3],inst:'bell',oct:1,dens:.85,padG:.04,padLP:1400,padType:'sine'},
 sorting:{root:47,scale:min,bpm:48,step:1,bar:8,prog:[0,5,2,4],inst:'bell',oct:1,dens:.3,padG:.06,padLP:600,drone:1,timp:1},
 learned:{root:62,scale:[0,2,4,6,8,10],bpm:100,step:1,bar:8,prog:[0,2,4],inst:'blip',oct:1,dens:.35,padG:.025,padLP:500}};
let ac,out,timer,nextT=0,beat=0,started=false,on=localStorage.getItem('bwMute')!=='1',song=null;
const mtof=m=>440*Math.pow(2,(m-69)/12),deg=(th,i)=>{const s=th.scale,o=Math.floor(i/s.length);return th.root+s[((i%s.length)+s.length)%s.length]+12*o};
const sg=new Audio('music/theme.mp3');sg.loop=true;sg.preload='auto';sg.addEventListener('canplaythrough',()=>{song=sg},{once:true});sg.addEventListener('error',()=>{song=null});
function init(){if(ac)return;ac=new(window.AudioContext||window.webkitAudioContext)();out=ac.createGain();out.gain.value=0;const dry=ac.createGain(),conv=ac.createConvolver(),wet=ac.createGain();dry.gain.value=.8;wet.gain.value=.5;
  const L=ac.sampleRate*2.8,b=ac.createBuffer(2,L,ac.sampleRate);for(let c=0;c<2;c++){const d=b.getChannelData(c);for(let i=0;i<L;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/L,2.4)}conv.buffer=b;
  out.connect(dry);dry.connect(ac.destination);out.connect(conv);conv.connect(wet);wet.connect(ac.destination)}
function note(f,t,d,type,g,lp){const o=ac.createOscillator(),e=ac.createGain();o.type=type;o.frequency.value=f;if(lp){const b=ac.createBiquadFilter();b.type='lowpass';b.frequency.value=lp;o.connect(b);b.connect(e)}else o.connect(e);
  e.gain.setValueAtTime(0,t);e.gain.linearRampToValueAtTime(g,t+.01);e.gain.exponentialRampToValueAtTime(.0001,t+d);e.connect(out);o.start(t);o.stop(t+d+.05)}
const bell=(f,t,g=.1)=>{note(f,t,2.2,'sine',g);note(f*2.76,t,1.2,'sine',g*.25);note(f*5.4,t,.5,'sine',g*.1)},pluck=(f,t,g=.12)=>note(f,t,.5,'triangle',g,2200),blip=(f,t,g=.06)=>note(f,t,.18,'sine',g);
function pad(freqs,t,d,g,lp,type){freqs.forEach(f=>{for(const det of[-6,6]){const o=ac.createOscillator(),e=ac.createGain(),b=ac.createBiquadFilter();o.type=type||'sawtooth';o.frequency.value=f;o.detune.value=det;b.type='lowpass';b.frequency.value=lp||700;o.connect(b);b.connect(e);
  e.gain.setValueAtTime(0,t);e.gain.linearRampToValueAtTime(g,t+d*.4);e.gain.linearRampToValueAtTime(0,t+d);e.connect(out);o.start(t);o.stop(t+d+.1)}})}
const hit=(t,f=70,g=.5)=>{const o=ac.createOscillator(),e=ac.createGain();o.frequency.setValueAtTime(f*2,t);o.frequency.exponentialRampToValueAtTime(f,t+.25);e.gain.setValueAtTime(g,t);e.gain.exponentialRampToValueAtTime(.0001,t+1.2);o.connect(e);e.connect(out);o.start(t);o.stop(t+1.3)};
function step(th,b,t,spb){const bar=th.bar,ch=th.prog[Math.floor(b/bar)%th.prog.length],dur=bar*spb*th.step;
  if(b%bar===0){pad([0,2,4].map(i=>mtof(deg(th,ch+i))),t,dur*1.05,th.padG,th.padLP,th.padType);if(th.drone)pad([mtof(deg(th,ch)-12)],t,dur*1.05,.1,300,'sine');if(th.timp)hit(t,50,.6)}
  if(th.timp&&b%bar===bar/2)hit(t,45,.45);
  if(Math.random()<th.dens){const picks=[0,2,4,7,9,11],m=deg(th,ch+picks[Math.floor(Math.random()*picks.length)])+12*th.oct,f=mtof(m);th.inst==='bell'?bell(f,t):th.inst==='pluck'?pluck(f,t):blip(f,t)}
  if(th.kick&&b%th.kick===0)hit(t,th.kickF||60,.3);if(th.tick)note(3000,t,.03,'square',.02);
  if(th.drip&&Math.random()<.22)note(mtof(deg(th,Math.floor(Math.random()*7))+48),t+Math.random()*spb,.5,'sine',.07)}
function tick(){const th=TH[P]||TH.index,spb=60/th.bpm;while(nextT<ac.currentTime+.4){step(th,beat,nextT,spb);beat++;nextT+=spb*th.step}}
function start(){if(started||!on)return;
  if(song){started=true;song.currentTime=(+sessionStorage.bwT||0)%(song.duration||1e9);song.volume=0;song.play().then(()=>{let v=0;const iv=setInterval(()=>{v=Math.min(.6,v+.03);song.volume=v;if(v>=.6)clearInterval(iv)},100)}).catch(()=>{started=false});return}
  init();ac.resume().then(()=>{if(started||ac.state!=='running')return;started=true;nextT=ac.currentTime+.1;beat=0;out.gain.setValueAtTime(0,ac.currentTime);out.gain.linearRampToValueAtTime(.55,ac.currentTime+2.5);timer=setInterval(tick,120)}).catch(()=>{})}
function fade(){if(song){const iv=setInterval(()=>{song.volume=Math.max(0,song.volume-.08);if(!song.volume)clearInterval(iv)},60)}else if(out)out.gain.linearRampToValueAtTime(0,ac.currentTime+.7)}
function stinger(){if(!ac||!started||!on)return;const t=ac.currentTime;hit(t,55,.7);pad([55,62,67,71].map(mtof),t,4,.05,1800);[79,83,86,91].forEach((m,i)=>bell(mtof(m),t+i*.12,.12))}
function label(){const b=document.getElementById('snd');if(b)b.textContent=on?'♪ Music on':'♪ Music off'}
document.body.insertAdjacentHTML('beforeend','<button class="snd" id="snd"></button>');label();
document.getElementById('snd').onclick=e=>{e.stopPropagation();on=!on;localStorage.setItem('bwMute',on?'0':'1');label();if(song)song.muted=!on;else if(out)out.gain.setTargetAtTime(on?.55:0,ac.currentTime,.2);if(on)start()};
['pointerdown','keydown','touchstart'].forEach(ev=>addEventListener(ev,start,{passive:true}));addEventListener('pagehide',()=>{if(song)sessionStorage.bwT=song.currentTime});start();
return{start,fade,stinger}})();
