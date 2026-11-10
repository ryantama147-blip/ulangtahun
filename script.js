const $=id=>document.getElementById(id);
const screens=["s0","s1","s2","s3","s4"];
function show(n){screens.forEach((s,i)=>$(s).classList.toggle("hidden",i!==n))}
let name="Sahabat",age=0,wished=false;

$("start").onclick=()=>{
  name=$("name").value.trim()||"Sahabat";
  const a=parseInt($("age").value,10);age=a>0&&a<150?a:0;
  const n=age?Math.min(age,12):5;
  const c=$("candles");c.innerHTML="";
  for(let i=0;i<n;i++){const d=document.createElement("div");d.className="candle";d.onclick=()=>snuff(d);c.appendChild(d)}
  update();show(1);
};
function lit(){return [...document.querySelectorAll(".candle:not(.out)")]}
function snuff(el){el.classList.add("out");update()}
function update(){
  const k=lit().length;
  $("left").textContent=k?`${name}, masih ada ${k} lilin menyala. Klik lilin atau tekan Tiup.`:"";
  if(!k){setTimeout(()=>show(2),900)}
}
$("blow").onclick=()=>{
  const l=lit();let n=1+Math.floor(Math.random()*3);
  while(n-- >0&&l.length){snuff(l.splice(Math.floor(Math.random()*l.length),1)[0])}
};

$("send").onclick=()=>{
  wished=$("wish").value.trim().length>0;
  $("send").classList.add("hidden");$("wish").classList.add("hidden");
  $("stars").classList.remove("hidden");$("sending").classList.remove("hidden");
  const st=["Mengirim permohonanmu ke bintang...","Bintang-bintang sedang mendengarkan...","Menaburkan sedikit keajaiban..."];
  let i=0;$("sending").textContent=st[0];
  const t=setInterval(()=>{i++;if(i<st.length){$("sending").textContent=st[i]}else{clearInterval(t);$("sending").textContent="Permohonanmu sudah terkirim! 🌟";confetti();setTimeout(()=>show(3),2200)}},1100);
};

const gifts=["persediaan good vibes seumur hidup","bebas cuci piring satu kali","tiket emas untuk tidur siang kapan saja","kue tanpa batas (kalori tidak dihitung hari ini)","kekuatan super: selalu dapat parkir terbaik","kupon pelukan hangat"];
document.querySelectorAll(".box").forEach(b=>b.onclick=()=>{
  b.textContent="🎉";$("gift").textContent="Kamu dapat: "+gifts[Math.floor(Math.random()*gifts.length)]+"!";
  $("finish").classList.remove("hidden");confetti();
});
$("finish").onclick=()=>{
  $("fin").textContent=`Selamat Ulang Tahun, ${name}!`;
  $("finmsg").textContent=(age?`Bersulang untuk ${age} tahun yang luar biasa dan banyak tahun lagi. `:"")+(wished?"Dan permohonanmu tadi? Sudah di tangan yang baik.":"");
  show(4);confetti();
};
$("again").onclick=()=>{$("name").value="";$("age").value="";$("wish").value="";$("wish").classList.remove("hidden");$("send").classList.remove("hidden");$("stars").classList.add("hidden");$("sending").classList.add("hidden");$("gift").textContent="";$("finish").classList.add("hidden");document.querySelectorAll(".box").forEach(b=>b.textContent="🎁");show(0)};

const cv=$("cv"),cx=cv.getContext("2d");let P=[],run=false;
function size(){cv.width=innerWidth;cv.height=innerHeight}
addEventListener("resize",size);size();
function confetti(){
  const cols=["#ff6b9d","#fab005","#51cf66","#339af0","#9775fa","#ff922b"];
  for(let i=0;i<140;i++)P.push({x:Math.random()*cv.width,y:-20-Math.random()*200,vx:(Math.random()-.5)*3,vy:2+Math.random()*4,s:5+Math.random()*7,c:cols[i%cols.length],r:Math.random()*6});
  if(!run){run=true;requestAnimationFrame(tick)}
}
function tick(){
  cx.clearRect(0,0,cv.width,cv.height);
  P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.r+=.15;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);cx.restore()});
  P=P.filter(p=>p.y<cv.height+20);
  if(P.length)requestAnimationFrame(tick);else{run=false;cx.clearRect(0,0,cv.width,cv.height)}
}