// All creature art is drawn with p5 shapes. Used by the Forest, Sorting and Learned pages.
// ---------- detailed Sorting Hat ----------
function hat(x,y,s){
  const ctx=drawingContext;push();translate(x,y);rotate(sin(frameCount*.02)*.02);
  fill(52,33,22);stroke(25,14,8);strokeWeight(3);beginShape();                                               // wavy brim
  for(let a=0;a<TWO_PI;a+=.1)vertex(cos(a)*s*.88*(1+sin(a*7)*.025),sin(a)*s*.17*(1+sin(a*5)*.1));endShape(CLOSE);
  fill(84,56,38);beginShape();for(let a=0;a<TWO_PI;a+=.1)vertex(cos(a)*s*.8*(1+sin(a*7)*.025),sin(a)*s*.13-s*.02);endShape(CLOSE);
  fill(88,60,40);stroke(25,14,8);strokeWeight(3);                                                            // bent cone
  beginShape();vertex(-.6*s,0);bezierVertex(-.52*s,-.4*s,-.3*s,-.75*s,-.1*s,-.98*s);bezierVertex(.05*s,-1.15*s,.35*s,-1.15*s,.52*s,-.9*s);
  bezierVertex(.35*s,-.98*s,.2*s,-.92*s,.15*s,-.78*s);bezierVertex(.3*s,-.5*s,.5*s,-.25*s,.62*s,0);endShape(CLOSE);
  noFill();stroke(135,95,64,150);strokeWeight(s*.035);bezier(-.48*s,-.1*s,-.4*s,-.45*s,-.25*s,-.7*s,-.08*s,-.92*s);   // light edge
  stroke(35,21,13,140);bezier(.52*s,-.1*s,.42*s,-.35*s,.3*s,-.5*s,.17*s,-.72*s);                            // shadow edge
  stroke(40,24,15,150);strokeWeight(2);for(let k=1;k<=5;k++){const yy=-k*.17*s,ww=s*1.1*(1-k*.14);arc(0,yy,ww,s*.07,.1,PI-.1)}  // wrinkles
  ctx.setLineDash([5,4]);                                                                                    // stitched patches
  push();translate(-.3*s,-.6*s);rotate(-.25);fill(112,78,50);stroke(190,150,100);strokeWeight(1.5);rect(-s*.07,-s*.06,s*.14,s*.12);pop();
  push();translate(.27*s,-.48*s);rotate(.3);fill(70,45,30);stroke(190,150,100);strokeWeight(1.5);rect(-s*.06,-s*.08,s*.12,s*.16);pop();
  stroke(190,150,100,170);noFill();bezier(-.55*s,-.2*s,-.3*s,-.28*s,.2*s,-.22*s,.58*s,-.16*s);ctx.setLineDash([]);   // seam
  for(const dx of[-1,1]){const ex=dx*s*.16,ey=-.36*s,a=atan2(mouseY-(y+ey),mouseX-(x+ex)),px=ex+cos(a)*s*.03,py=ey+sin(a)*s*.02;   // eyes
    fill(235,225,200);stroke(40,24,16);strokeWeight(s*.01);ellipse(ex,ey,s*.17,s*.12);
    noStroke();fill(110,70,30);circle(px,py,s*.07);fill(10);circle(px,py,s*.035);fill(255,210);circle(px-s*.01,py-s*.01,s*.012);
    noFill();stroke(35,20,12);strokeWeight(s*.016);arc(ex,ey,s*.19,s*.15,PI*1.05,PI*1.95);
    stroke(60,38,25,160);strokeWeight(2);arc(ex,ey+s*.03,s*.18,s*.08,.2,PI-.2);
    const up=talking?sin(frameCount*.4)*s*.012-s*.01:0;stroke(35,20,12);strokeWeight(s*.024);line(ex+dx*s*.09,ey-s*.09+up,ex-dx*s*.08,ey-s*.125+up)}
  stroke(40,24,16);strokeWeight(s*.014);noFill();arc(0,-.22*s,s*.07,s*.06,0,PI);line(0,-.28*s,-.01*s,-.22*s);   // nose
  if(talking){const m=abs(sin(frameCount*.4))*s*.07;fill(38,8,8);stroke(135,95,64);strokeWeight(s*.012);ellipse(0,-.1*s,s*.3,s*.02+m)}   // mouth
  else{stroke(35,20,12);strokeWeight(s*.018);noFill();arc(0,-.14*s,s*.3,s*.1,.15,PI-.15)}
  pop()}

// ================= NIFFLER (faces right) =================
function niffler(x,y,s){push();translate(x,y);randomSeed(3);noStroke();
  fill(0,0,0,70);ellipse(0,.42*s,.95*s,.12*s);                                                    // ground shadow
  fill(20,16,16);ellipse(-.5*s,.12*s,.3*s,.16*s);                                                   // short tail
  fill(24,20,20);ellipse(-.2*s,.35*s,.26*s,.14*s);ellipse(.2*s,.36*s,.26*s,.14*s);                  // back feet
  stroke(205,195,175);strokeWeight(s*.01);for(const cx of[-.28,-.2,-.12,.12,.2,.28])line(cx*s,.39*s,cx*s-.02*s,.43*s);noStroke();   // claws
  fill(26,22,22);ellipse(0,0,.9*s,.78*s);                                                           // round fluffy body
  stroke(14,11,11);strokeWeight(s*.014);for(let i=0;i<170;i++){const a=random(TWO_PI),r=random(.85,1.08),px=cos(a)*.45*s*r,py=sin(a)*.39*s*r;line(px,py,px+cos(a)*s*.07,py+sin(a)*s*.07)}   // fur
  noStroke();fill(66,56,50);ellipse(.04*s,.1*s,.5*s,.4*s);fill(18,12,10);ellipse(.04*s,-.02*s,.46*s,.09*s);   // belly pouch + opening
  for(const c of[[-.1,-.03],[.0,-.05],[.1,-.03],[.18,-.04]]){fill(214,170,50);circle(c[0]*s,c[1]*s,.07*s);fill(255,235,150);circle(c[0]*s-.012*s,c[1]*s-.012*s,.02*s)}   // coins in pouch
  stroke(24,20,20);strokeWeight(s*.1);noFill();line(.2*s,-.08*s,.4*s,.12*s);line(.4*s,.12*s,.55*s,0);noStroke();                    // arm
  fill(30,25,25);ellipse(.56*s,-.01*s,.1*s,.09*s);stroke(30,25,25);strokeWeight(s*.016);line(.6*s,-.04*s,.64*s,-.07*s);line(.61*s,-.01*s,.66*s,-.02*s);noStroke();   // hand + fingers
  fill(220,176,52);circle(.64*s,-.1*s,.13*s);fill(255,238,160);circle(.62*s,-.12*s,.04*s);                                          // stolen coin
  const tw=.5+.5*sin(frameCount*.2);stroke(255,245,200,200*tw);strokeWeight(2);line(.64*s,-.2*s,.64*s,-.05*s);line(.56*s,-.12*s,.72*s,-.12*s);noStroke();
  fill(27,23,23);ellipse(.38*s,-.22*s,.54*s,.46*s);stroke(14,11,11);strokeWeight(s*.012);                                          // head + fur
  for(let i=0;i<90;i++){const a=random(PI*.9,PI*2.2),px=.38*s+cos(a)*.27*s,py=-.22*s+sin(a)*.23*s;line(px,py,px+cos(a)*s*.05,py+sin(a)*s*.05)}noStroke();
  fill(26,22,22);ellipse(.2*s,-.43*s,.13*s,.15*s);fill(110,70,70);ellipse(.2*s,-.43*s,.06*s,.08*s);                                    // ear
  fill(54,47,44);beginShape();vertex(.55*s,-.34*s);bezierVertex(.75*s,-.4*s,1.0*s,-.32*s,1.03*s,-.22*s);bezierVertex(1.0*s,-.12*s,.75*s,-.08*s,.55*s,-.12*s);endShape(CLOSE);   // long duck-bill snout
  stroke(125,115,108,160);strokeWeight(s*.01);noFill();bezier(.6*s,-.33*s,.75*s,-.37*s,.92*s,-.31*s,1.0*s,-.25*s);line(.58*s,-.2*s,1.0*s,-.2*s);noStroke();
  fill(10);circle(.95*s,-.27*s,.022*s);circle(.98*s,-.23*s,.022*s);                                                                  // nostrils
  fill(6);circle(.5*s,-.34*s,.085*s);fill(255,235);circle(.52*s,-.36*s,.025*s);                                                      // shiny bead eye
  stroke(14,11,11);strokeWeight(s*.016);line(.43*s,-.42*s,.55*s,-.4*s);                                                              // brow
  stroke(210,200,190,150);strokeWeight(1);line(.9*s,-.2*s,1.06*s,-.14*s);line(.9*s,-.18*s,1.06*s,-.1*s);                             // whiskers
  pop();randomSeed(millis())}

// ================= THESTRAL (faces left, a = opacity 0-255) =================
function thestral(x,y,s,a){push();translate(x,y);
  noStroke();fill(200,220,235,18*a/255);ellipse(0,-.15*s,1.7*s,1.4*s);                                   // pale mist glow so the black body shows
  const rim=[110,125,135],ink=[16,20,24];
  const leg=(x0,y0,kx,ky,fx,fy)=>{noFill();for(const p of[[rim,.07,.55],[ink,.045,1]]){stroke(p[0][0],p[0][1],p[0][2],a*p[2]);strokeWeight(s*p[1]);line(x0*s,y0*s,kx*s,ky*s);strokeWeight(s*p[1]*.7);line(kx*s,ky*s,fx*s,fy*s)}
    noStroke();fill(ink[0]+14,ink[1]+14,ink[2]+14,a);ellipse(kx*s,ky*s,.06*s,.07*s);fill(ink[0],ink[1],ink[2],a);ellipse(fx*s,(fy+.02)*s,.07*s,.04*s)};
  stroke(rim[0],rim[1],rim[2],a*.55);strokeWeight(s*.012);fill(24,28,34,a);                               // bat-like leathery wing
  beginShape();vertex(.05*s,-.2*s);bezierVertex(.1*s,-.6*s,.25*s,-.9*s,.5*s,-1.0*s);bezierVertex(.52*s,-.8*s,.6*s,-.72*s,.7*s,-.62*s);bezierVertex(.66*s,-.5*s,.76*s,-.42*s,.88*s,-.32*s);bezierVertex(.7*s,-.3*s,.5*s,-.26*s,.3*s,-.17*s);endShape(CLOSE);
  stroke(75,84,92,a);strokeWeight(s*.014);line(.05*s,-.2*s,.5*s,-1.0*s);line(.05*s,-.2*s,.7*s,-.62*s);line(.05*s,-.2*s,.88*s,-.32*s);
  leg(.3,.08,.38,.34,.32,.64);leg(.4,.08,.5,.34,.44,.64);                                                   // back legs
  noFill();for(const p of[[rim,.05,.55],[ink,.03,1]]){stroke(p[0][0],p[0][1],p[0][2],a*p[2]);strokeWeight(s*p[1]);bezier(.55*s,-.15*s,.75*s,-.1*s,.78*s,.15*s,.7*s,.34*s)}   // whip tail
  stroke(ink[0],ink[1],ink[2],a);strokeWeight(s*.012);for(let k=0;k<5;k++)line(.7*s,.34*s,(.68+k*.015)*s,(.4+k*.01)*s);
  stroke(rim[0],rim[1],rim[2],a*.6);strokeWeight(s*.012);fill(ink[0],ink[1],ink[2],a);                    // gaunt torso
  beginShape();vertex(-.4*s,-.2*s);bezierVertex(-.2*s,-.15*s,.1*s,-.14*s,.4*s,-.25*s);bezierVertex(.6*s,-.25*s,.62*s,0,.5*s,.12*s);bezierVertex(.2*s,.04*s,-.1*s,.08*s,-.38*s,.12*s);bezierVertex(-.5*s,.05*s,-.5*s,-.15*s,-.4*s,-.2*s);endShape(CLOSE);
  noFill();stroke(rim[0],rim[1],rim[2],a*.45);strokeWeight(s*.01);for(let k=0;k<7;k++)bezier((-.3+k*.07)*s,-.14*s,(-.27+k*.07)*s,-.05*s,(-.27+k*.07)*s,.02*s,(-.3+k*.07)*s,.09*s);   // visible ribs
  fill(ink[0]+10,ink[1]+10,ink[2]+10,a);stroke(rim[0],rim[1],rim[2],a*.6);circle(.4*s,-.17*s,.08*s);for(let k=0;k<9;k++)circle((-.35+k*.1)*s,-.2*s+(k>5?-.04*s:0),.025*s);   // hip bone + spine
  fill(ink[0],ink[1],ink[2],a);stroke(rim[0],rim[1],rim[2],a*.6);strokeWeight(s*.012);                    // thin neck
  beginShape();vertex(-.4*s,-.2*s);bezierVertex(-.5*s,-.4*s,-.62*s,-.55*s,-.7*s,-.7*s);vertex(-.8*s,-.62*s);bezierVertex(-.7*s,-.45*s,-.55*s,-.25*s,-.45*s,0);endShape(CLOSE);
  leg(-.3,.08,-.32,.34,-.3,.64);leg(-.18,.08,-.14,.32,-.2,.64);                                             // front legs
  fill(ink[0],ink[1],ink[2],a);stroke(rim[0],rim[1],rim[2],a*.7);strokeWeight(s*.012);                    // long reptilian skull
  beginShape();vertex(-.66*s,-.82*s);bezierVertex(-.72*s,-.9*s,-.84*s,-.86*s,-.9*s,-.74*s);bezierVertex(-1.0*s,-.62*s,-1.08*s,-.52*s,-1.06*s,-.46*s);bezierVertex(-1.02*s,-.4*s,-.92*s,-.44*s,-.84*s,-.5*s);bezierVertex(-.76*s,-.56*s,-.7*s,-.6*s,-.64*s,-.66*s);endShape(CLOSE);
  triangle(-.66*s,-.82*s,-.6*s,-.98*s,-.72*s,-.84*s);                                                       // ear
  noFill();stroke(rim[0],rim[1],rim[2],a*.5);bezier(-.7*s,-.74*s,-.8*s,-.66*s,-.9*s,-.58*s,-.98*s,-.52*s);line(-.74*s,-.84*s,-.82*s,-.8*s);   // cheekbone, brow ridge
  noStroke();fill(225,236,248,a);ellipse(-.78*s,-.74*s,.065*s,.045*s);fill(150,170,190,a*.6);ellipse(-.78*s,-.74*s,.03*s,.03*s);   // blank milky eye
  fill(0,a);ellipse(-1.04*s,-.47*s,.02*s,.035*s);pop()}

// ================= PHOENIX =================
function phoenix(x,y,s,a=255){push();translate(x,y);noStroke();glow(0,0,s*1.5,'255,140,40',.35);const t=frameCount*.08,fl=sin(t)*.12;
  noFill();for(let k=0;k<5;k++){stroke(255,200-k*22,60,a);strokeWeight(s*.05);bezier(0,s*.25,(k-2)*s*.15,s*.6,(k-2)*s*.3,s*.9,(k-2)*s*.35+sin(t+k)*s*.06,s*1.15)}   // tail plumes
  noStroke();for(const d of[-1,1]){push();scale(d,1);rotate(-.3+fl);for(let k=0;k<9;k++){const L=s*(.95-k*.04);push();rotate(-1.35+k*.17);fill(255-k*8,80+k*15,25,a);beginShape();vertex(s*.1,0);bezierVertex(s*.3,-L*.13,L*.8,-L*.1,L,0);bezierVertex(L*.8,L*.08,s*.3,L*.1,s*.1,0);endShape(CLOSE);pop()}pop()}
  fill(230,70,30,a);ellipse(0,0,s*.4,s*.62);fill(255,175,60,a);ellipse(0,s*.04,s*.24,s*.4);fill(240,90,30,a);circle(0,-s*.38,s*.26);
  stroke(255,210,70,a);strokeWeight(s*.04);for(let k=-1;k<=1;k++)line(k*s*.04,-s*.5,k*s*.12,-s*.7+sin(t+k)*s*.03);noStroke();
  fill(240,190,50,a);triangle(s*.1,-s*.4,s*.28,-s*.34,s*.1,-s*.3);fill(15,a);circle(s*.04,-s*.42,s*.045);fill(255,a);circle(s*.05,-s*.43,s*.015);pop()}
// ================= HIPPOGRIFF =================
function hippogriff(x,y,s,a=255){push();translate(x,y);noStroke();glow(0,0,s*1.3,'200,200,225',.18);
  fill(100,90,86,a);for(const lx of[-.3,-.16,.26,.4])rect(lx*s,.1*s,.07*s,.48*s,4);fill(55,48,46,a);for(const lx of[-.3,-.16,.26,.4])ellipse((lx+.035)*s,.6*s,.11*s,.06*s);
  stroke(95,84,80,a);strokeWeight(s*.07);noFill();bezier(.5*s,-.05*s,.75*s,0,.8*s,.3*s,.7*s,.5*s);noStroke();                       // horse tail
  fill(110,98,92,a);ellipse(0,0,1.05*s,.52*s);fill(150,138,128,a);ellipse(-.38*s,-.02*s,.36*s,.44*s);                                  // body + feathered chest
  fill(80,70,66,a);beginShape();vertex(-.1*s,-.2*s);bezierVertex(.1*s,-.7*s,.5*s,-.7*s,.7*s,-.3*s);bezierVertex(.5*s,-.2*s,.2*s,-.1*s,-.1*s,-.2*s);endShape(CLOSE);   // folded wing
  stroke(150,138,128,a);strokeWeight(2);for(let k=0;k<5;k++)line((.05+k*.1)*s,-.25*s,(.2+k*.1)*s,-.45*s+k*.03*s);noStroke();
  fill(150,138,128,a);push();translate(-.5*s,-.38*s);rotate(-.35);ellipse(0,0,.26*s,.5*s);pop();                                     // eagle neck
  fill(180,170,160,a);ellipse(-.6*s,-.66*s,.3*s,.24*s);fill(235,150,40,a);triangle(-.72*s,-.7*s,-.92*s,-.6*s,-.72*s,-.56*s);fill(255,190,60,a);circle(-.64*s,-.69*s,.07*s);fill(10,a);circle(-.65*s,-.69*s,.03*s);   // head, hooked beak, eye
  stroke(235,150,40,a);strokeWeight(s*.04);line(-.3*s,.1*s,-.34*s,.5*s);line(-.18*s,.1*s,-.16*s,.5*s);for(const lx of[-.34,-.16])for(const d of[-.03,0,.03])line(lx*s,.5*s,(lx+d-.03)*s,.58*s);pop()}   // eagle talons
// ================= BOWTRUCKLE =================
function bowtruckle(x,y,s,a=255){push();translate(x,y);noFill();stroke(80,56,36,a);strokeWeight(s*.08);line(-s*.9,s*.58,s*.9,s*.46);line(s*.45,s*.48,s*.75,s*.15);
  stroke(100,72,42,a);strokeWeight(s*.06);line(0,s*.45,0,-s*.1);line(0,s*.12,-s*.28,s*.28);line(0,s*.12,s*.3,-s*.02);line(-s*.04,s*.45,-s*.16,s*.55);line(s*.04,s*.45,s*.18,s*.53);
  strokeWeight(s*.025);for(let k=-1;k<=1;k++){line(s*.3,-s*.02,s*(.4+k*.02),s*(-.1+k*.05));line(-s*.28,s*.28,s*(-.38+k*.03),s*(.28+k*.06))}
  noStroke();fill(112,82,46,a);ellipse(0,-s*.3,s*.36,s*.42);fill(255,a);circle(-s*.08,-s*.32,s*.13);circle(s*.08,-s*.32,s*.13);fill(30,16,8,a);circle(-s*.075+sin(frameCount*.04)*s*.01,-s*.32,s*.08);circle(s*.085+sin(frameCount*.04)*s*.01,-s*.32,s*.08);
  fill(80,150,60,a);for(let k=-2;k<=2;k++){push();translate(k*s*.07,-s*.5);rotate(k*.35);ellipse(0,-s*.1,s*.09,s*.24);pop()}fill(60,40,24,a);ellipse(0,-s*.2,s*.06,s*.03);pop()}
// ================= NARGLE =================
function nargle(x,y,s,a=255){push();translate(x,y);noStroke();glow(0,0,s*1.4,'180,255,200',.28);
  for(let k=0;k<26;k++){const an=k*.62,r=s*(.3+.06*sin(frameCount*.05+k));fill(165+k*2,200,190,a*.3);ellipse(cos(an)*r*.8,sin(an)*r*.8,s*.5,s*.5)}
  fill(205,225,215,a);ellipse(0,0,s*.62,s*.56);triangle(-s*.25,-s*.18,-s*.38,-s*.5,-s*.1,-s*.26);triangle(s*.25,-s*.18,s*.38,-s*.5,s*.1,-s*.26);
  for(const d of[-1,1]){fill(0,a);ellipse(d*s*.14,-s*.04,s*.2,s*.27);fill(255,240,150,a);circle(d*s*.14+s*.02,-s*.1,s*.07)}fill(40,a);ellipse(0,s*.13,s*.16,s*.06);
  stroke(70,120,60,a);strokeWeight(s*.03);line(s*.1,-s*.28,s*.34,-s*.52);noStroke();fill(80,140,70,a);ellipse(s*.22,-s*.4,s*.14,s*.07);ellipse(s*.34,-s*.5,s*.14,s*.07);fill(255,a);circle(s*.28,-s*.46,s*.05);circle(s*.18,-s*.45,s*.04);pop()}   // mistletoe sprig
const CREATURES={
 phoenix:{n:'Phoenix',fn:phoenix,c:'255,140,40',d:'Brave, resilient and born to lead. Every time life knocks you down, you rise again from the ashes.',m:'Fawkes and Albus Dumbledore'},
 hippogriff:{n:'Hippogriff',fn:hippogriff,c:'200,200,225',d:'Proud, loyal and easily offended. Treat you with respect and you will carry people anywhere.',m:'Buckbeak and Hagrid'},
 niffler:{n:'Niffler',fn:niffler,c:'255,220,120',d:'Curious, chaotic and attracted to anything shiny. Nothing in your pockets is ever really yours.',m:'Newt Scamander'},
 thestral:{n:'Thestral',fn:thestral,c:'170,200,230',d:'Quiet, watchful and misunderstood. You see what other people look straight past.',m:'Luna Lovegood'},
 bowtruckle:{n:'Bowtruckle',fn:bowtruckle,c:'140,220,110',d:'Small, careful and fiercely protective of the people you love. You bite only when you have to.',m:'Neville Longbottom'},
 nargle:{n:'Nargle',fn:nargle,c:'180,255,200',d:'Unpredictable and mysterious. Some people say you are not real. That suits you fine.',m:'Xenophilius Lovegood'}};
