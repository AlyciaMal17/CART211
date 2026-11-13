// Shared drawing helpers. Scenes are drawn on a "logical" landscape canvas and centered, so phones (480px) get a cropped view instead of a squashed one.
const Lg=()=>{const w=Math.max(width,height*1.2);return{w,h:height,ox:(width-w)/2}};
function glow(x,y,r,rgb,a,g){const c=g?g.drawingContext:drawingContext,q=c.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,`rgba(${rgb},${a})`);q.addColorStop(1,`rgba(${rgb},0)`);c.fillStyle=q;c.fillRect(x-r,y-r,r*2,r*2)}
function vignette(a=.6,r=.3){const c=drawingContext,w=width,h=height,g=c.createRadialGradient(w/2,h/2,h*r,w/2,h/2,Math.max(w,h)*.75);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,'+a+')');c.fillStyle=g;c.fillRect(0,0,w,h)}
function spot(x,y,r,a){const c=drawingContext,g=c.createRadialGradient(x,y,r*.2,x,y,r);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,'+a+')');c.fillStyle=g;c.fillRect(0,0,width,height)}
function fig(x,y,s,col,wave=0){push();translate(x,y);noStroke();fill(col[0],col[1],col[2]);beginShape();vertex(-s*.5,0);vertex(-s*.3,-s*1.1);vertex(s*.3,-s*1.1);vertex(s*.5,0);endShape(CLOSE);
  stroke(col[0],col[1],col[2]);strokeWeight(s*.18);line(s*.3,-s*.95,s*.6,-s*(.9+wave*.8));line(-s*.3,-s*.95,-s*.6,-s*.7);noStroke();fill(230,190,160);circle(0,-s*1.35,s*.55);fill(40,26,18);arc(0,-s*1.4,s*.58,s*.5,PI,TWO_PI);pop()}
