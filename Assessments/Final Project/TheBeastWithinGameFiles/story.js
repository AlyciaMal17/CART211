// Tiny dialogue player: click the speech box to skip/advance. Story.state tells sketches who is talking.
const Story={state:{who:'',typing:false},
play(lines,done){const say=document.getElementById('say'),who=document.getElementById('who'),hint=document.getElementById('hint'),box=say.parentElement,S=Story.state;
  let i=0,id,full='';
  const finish=()=>{clearInterval(id);say.textContent=full;S.typing=false;hint.style.visibility='visible'};
  const next=()=>{if(i>=lines.length){box.onclick=null;hint.style.visibility='hidden';S.typing=false;done&&done();return}
    const[w,t]=lines[i++];S.who=w;who.textContent=w;who.style.color={Narrator:'#9a9ab5','The Sorting Hat':'#C9A24B'}[w]||'#e9b07a';
    full=t;say.textContent='';let k=0;S.typing=true;hint.style.visibility='hidden';
    id=setInterval(()=>{say.textContent+=t[k++];if(k>=t.length)finish()},26)};
  box.onclick=()=>S.typing?finish():next();next()}};
