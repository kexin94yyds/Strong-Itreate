(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))e(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&e(c)}).observe(document,{childList:!0,subtree:!0});function r(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function e(i){if(i.ep)return;i.ep=!0;const n=r(i);fetch(i.href,n)}})();const fe=""+new URL("跑步2024-DC2CQijG.JPG",import.meta.url).href,be=""+new URL("越来越强-DES4cyZo.jpg",import.meta.url).href,we=""+new URL("死不旋踵-DTz8rXTB.webp",import.meta.url).href,ve=""+new URL("世界在我面前-DORMQ4Xr.png",import.meta.url).href,xe=""+new URL("世界在我面前，缓缓展开-DVAd7CNY.JPG",import.meta.url).href,Me=""+new URL("水仙花-uQ-4odYQ.png",import.meta.url).href,Ce=""+new URL("心中温暖-ChFn9q9L.jpg",import.meta.url).href,Le=""+new URL("江南书院-WRdfojg2.png",import.meta.url).href,ke=""+new URL("你怎么就没血了-CIeCAz7k.PNG",import.meta.url).href,Ee=""+new URL("我们没有永远-CrC187Ao.JPG",import.meta.url).href,Se=""+new URL("科目三-Dnl5iKy4.JPG",import.meta.url).href,Ae=""+new URL("Slash Command Prompter-DSg8bMqg.JPG",import.meta.url).href,qe=""+new URL("笑来-C4MQpn4S.JPG",import.meta.url).href,ze=""+new URL("请辩-BkVEeSJP.JPG",import.meta.url).href,Pe=""+new URL("GPT Builder-CgdXwr1W.JPG",import.meta.url).href,Te=""+new URL("Learn-BRQ7JBwk.png",import.meta.url).href,Ve=""+new URL("Run-1Rb6meOj.png",import.meta.url).href,He=""+new URL("事实核查员-CU-iMZlV.png",import.meta.url).href,Ie=""+new URL("将抵月-DxzhICUM.png",import.meta.url).href;function Re(o,t){const r=Math.floor(o)&255,e=Math.floor(t)&255;o-=Math.floor(o),t-=Math.floor(t);const i=ee(o),n=ee(t),c=E[r]+e,h=E[r+1]+e;return W(n,W(i,G(E[c],o,t),G(E[h],o-1,t)),W(i,G(E[c+1],o,t-1),G(E[h+1],o-1,t-1)))}function ee(o){return o*o*o*(o*(o*6-15)+10)}function W(o,t,r){return t+o*(r-t)}function G(o,t,r){const e=o&15,i=1+(e&7);return(e&8?-i:i)*t+(e&4?-i:i)*r}const E=new Array(512);for(let o=0;o<256;o++)E[o]=E[o+256]=Math.floor(Math.random()*256);const S=document.getElementById("noiseCanvas"),$=S.getContext("2d");function re(){S.width=window.innerWidth,S.height=window.innerHeight}window.addEventListener("resize",re);re();let te=0;function ne(){$.fillStyle="#0066CC",$.globalAlpha=.05;const o=$.createImageData(S.width,S.height),t=o.data;for(let r=0;r<S.width;r++)for(let e=0;e<S.height;e++){const i=Re(r/100,e/100+te/10)*.5+.5,n=(e*S.width+r)*4;t[n]=0,t[n+1]=102,t[n+2]=204,t[n+3]=i*255*.1}$.putImageData(o,0,0),te+=.03,requestAnimationFrame(ne)}gsap.to(".venn-diagram",{rotation:360,duration:15,repeat:-1,ease:"none"});window.addEventListener("scroll",()=>{const o=window.pageYOffset;gsap.to(".venn-diagram",{y:o*.2,duration:.5})});const oe=document.querySelectorAll(".episode-selector button");oe.forEach(o=>{o.addEventListener("click",()=>{oe.forEach(t=>t.classList.remove("selected")),o.classList.add("selected")})});const je=document.querySelector(".menu-toggle"),De=document.querySelector(".close"),Be=document.querySelectorAll(".menu-item");je.addEventListener("click",()=>{document.body.classList.toggle("menu-open")});De.addEventListener("click",()=>{document.body.classList.remove("menu-open"),k.forEach(v=>v.style.display="none");const o=document.querySelector(".create-detail");o&&(o.style.display="none");const t=document.querySelector(".plugin-detail-view");t&&(t.style.display="none");const r=document.querySelector(".gpts-list-view");r&&(r.style.display="none");const e=document.querySelector(".action-grid"),i=document.querySelector(".run-story");e&&(e.style.display="none"),i&&(i.style.display="none");const n=document.querySelector(".write-detail");n&&(n.style.display="none");const c=document.querySelector(".running-container"),h=document.querySelector(".running-next-btn");c&&c.remove(),h&&h.remove(),L&&(L.style.display="none"),A.style.display="flex",gsap.fromTo(A,{opacity:0},{opacity:1,duration:.5,ease:"power2.out"})});Be.forEach(o=>{o.addEventListener("click",()=>{const t=document.querySelector(".menu-item.active");t&&t!==o&&t.classList.remove("active"),o.classList.toggle("active");const r=document.querySelector(".action-grid"),e=document.querySelector(".person-grid");if(o.querySelector("span").textContent.trim()==="WHO"){r.style.display="none";const i=document.querySelector(".run-story");if(i.style.display="none",e.style.display==="none"||!e.style.display){e.style.display="block";const n=e.querySelector(".person-card");gsap.fromTo(n,{opacity:0,y:20},{opacity:1,y:0,duration:.5,ease:"power2.out"})}else e.style.display="none"}else if(o.querySelector("span").textContent.trim()==="DO"){e.style.display="none";const i=document.querySelector(".run-story");if(r.style.display==="none"||!r.style.display){r.style.display="grid",i.style.display="none";const n=r.querySelectorAll(".action-button");gsap.fromTo(n,{opacity:0,y:20},{opacity:1,y:0,duration:.5,stagger:.05,ease:"power2.out"}),n.forEach(c=>{c.addEventListener("click",()=>{c.textContent.trim()==="Run"?(r.style.display="none",i.style.display="block",gsap.fromTo(i,{opacity:0,y:20},{opacity:1,y:0,duration:.5,ease:"power2.out"})):i.style.display="none"})})}else r.style.display="none",i.style.display="none"}else r.style.display="none",e.style.display="none"})});document.addEventListener("click",o=>{!o.target.closest(".side-menu")&&!o.target.closest(".menu-toggle")&&document.body.classList.contains("menu-open")&&document.body.classList.remove("menu-open")});const Ue=document.querySelector(".profile-image"),N=document.querySelector(".detail-view"),se=document.querySelector(".close-detail"),_e=document.querySelector(".progress-indicator"),L=document.getElementById("nav-back-to-creations-btn"),A=document.querySelector(".main-default"),k=document.querySelectorAll(".main-detail");A.style.display="flex";k.forEach(o=>{o.style.display="none"});L&&(L.style.display="none");Ue.addEventListener("click",()=>{A.style.display="none",k.forEach(o=>{o.style.display="none"}),k[0].style.display="flex",L&&(L.style.display="none"),document.body.classList.remove("menu-open")});const Ge=document.querySelectorAll(".next-episode-btn");Ge.forEach((o,t)=>{o.addEventListener("click",()=>{L&&(L.style.display="none"),k[t].style.display="none",k[t+1]?(k[t+1].style.display="flex",gsap.fromTo(k[t+1],{opacity:0},{opacity:1,duration:.5,ease:"power2.out"})):(k[t].style.display="none",A.style.display="flex",gsap.fromTo(A,{opacity:0},{opacity:1,duration:.5,ease:"power2.out"}))})});k.forEach(o=>{o.addEventListener("click",t=>{t.target===o&&(L&&(L.style.display="none"),k.forEach(r=>r.style.display="none"),A.style.display="flex",gsap.fromTo(A,{opacity:0},{opacity:1,duration:.5,ease:"power2.out"}))})});se.addEventListener("click",()=>{N.classList.remove("active"),setTimeout(()=>{N.style.display="none",_e.style.width="0"},500)});N.addEventListener("click",o=>{o.target===N&&se.click()});ne();function ae(){const o=document.getElementById("metamorphosis-container");if(!o)return;const t=o.querySelector(".metamorphosis-canvas");if(!t)return;function r(){t.width=window.innerWidth,t.height=window.innerHeight}window.addEventListener("resize",r),r();const e=t.getContext("2d");if(!e)return;const i=t.width,n=t.height,c=150,h=200,v=.5,z=.6,ce=.001,J=400,R=.2,le=1-R*2;let P=0;const O=[(M,g,s)=>{const d=M*Math.PI*2,a=g*Math.PI,m=Math.sin(s*.009)*.6+.5,b=Math.cos(s*.006)*.4+.7,p=Math.sin(s*.012)*.5+.6;let l=120+30*Math.sin(a*4+d*2+s*.03);l+=20*Math.sin(a*6+s*.024)*Math.cos(d*3+s*.015),l*=b;let w=l*Math.sin(a)*Math.cos(d),y=l*Math.sin(a)*Math.sin(d),C=l*Math.cos(a)+20*Math.sin(d*5+a*3+s*.012)*m;const u=Math.sin(s*.006+a*2)*15*p;return w+=u*Math.cos(d),y+=u*Math.sin(d),{x:w,y,z:C}},(M,g,s)=>{const d=M*Math.PI*2,a=g*Math.PI,m=Math.sin(s*.012)*.3+1,b=Math.cos(s*.009)*.2+.8,p=Math.sin(s*.006)*.5;let l=150+20*Math.cos(a*8+s*.01);l*=(.8+.2*Math.abs(Math.cos(d*2+s*.007)))*m;const w=Math.sin(s*.005+a*3)*.3,y=d+w;let C=l*Math.sin(a)*Math.cos(y),u=l*Math.sin(a)*Math.sin(y),x=l*Math.cos(a)*(b+.3*Math.sin(y*4+s*.009));const f=p*a,q=C*Math.cos(f)-u*Math.sin(f),Y=C*Math.sin(f)+u*Math.cos(f);return{x:q,y:Y,z:x}},(M,g,s)=>{const d=M*Math.PI*2,a=g*Math.PI,m=Math.sin(s*.015)*.4+1,b=Math.cos(s*.009)*.3+.7,p=Math.sin(s*.012)*.2;let l=120*m;l+=50*Math.sin(a*3+s*.008)*Math.sin(d*2.5+s*.006)*b,l+=30*Math.cos(a*5+d+s*.01);const w=Math.sin(s*.007),y=Math.max(0,Math.sin(a*2+d*3+w)-.7);l*=1-y*(.8+p*.3);const C=Math.sin(s*.009+a*4)*10;l+=C;let u=l*Math.sin(a)*Math.cos(d),x=l*Math.sin(a)*Math.sin(d),f=l*Math.cos(a);const q=Math.sin(s*.004+d)*8*b;return u+=q*Math.cos(a),x+=q*Math.sin(a),{x:u,y:x,z:f}},(M,g,s)=>{const d=M*Math.PI*2,a=g*Math.PI,m=Math.sin(s*.018)*.2+1,b=Math.cos(s*.012)*.3,p=s*.006,l=5,w=.2,y=Math.floor(a/Math.PI*l),u=Math.PI*2/6,x=p*(y+1)*.5,f=d+x,q=Math.floor(f/u),Y=f%u/u,j=q*u+Y*u,me=120,F=1-y/(l-1)*(.7+b*.2),pe=me*F*m,he=Math.cos(f-q*u-u/2),X=pe/Math.max(.6,Math.abs(he)),D=180*(.5+.5*F)*m,I=a/Math.PI;let T,V,B;if(I<.15||I>.85){const H=X*(.6+.3*F);T=H*Math.cos(j),V=H*Math.sin(j),B=I<.15?-D/2:D/2;const U=y*w*20*(1+b*.5);B+=I<.15?U:-U}else{const H=(I-.15)/.7;B=-D/2+H*D;const U=.9+.1*Math.sin(H*Math.PI*4+s*.008),K=X*U;T=K*Math.cos(j),V=K*Math.sin(j);const ue=y*.1,_=H*Math.PI*ue+s*.003*y,ge=T*Math.cos(_)-V*Math.sin(_),ye=T*Math.sin(_)+V*Math.cos(_);T=ge,V=ye}return{x:T,y:V,z:B}}],de=(M,g,s,d,a,m)=>{const b=M(s,d,a),p=g(s,d,a);return{x:b.x*(1-m)+p.x*m,y:b.y*(1-m)+p.y*m,z:b.z*(1-m)+p.z*m}},Q=(M,g,s)=>{const d=O.length,a=s%(J*d)/J,m=Math.floor(a),b=(m+1)%d;let p=a-m,l;if(p<R)l=0;else if(p>1-R)l=1;else{const w=(p-R)/le;l=w<.5?4*w*w*w:1-Math.pow(-2*w+2,3)/2}return de(O[m],O[b],M,g,s,l)},Z=()=>{e.clearRect(0,0,i,n),e.fillStyle="#000000",e.fillRect(0,0,i,n);const M=ce*(1+Math.sin(P*.003)*.5),g=P*M*.3+Math.sin(P*.006)*.2;for(let s=0;s<c;s++){const d=s/(c-1);e.beginPath(),e.strokeStyle=`rgba(255, 255, 255, ${v})`,e.lineWidth=z;let a=!1;for(let m=0;m<=h;m++){const b=m/h,p=Q(b,d,P),l=p.x*Math.cos(g)-p.y*Math.sin(g),w=p.x*Math.sin(g)+p.y*Math.cos(g),y=p.z,C=1.5+y*.001,u=i/2+l*C,x=n/2+w*C,f=y>-50;m===0?f&&(e.moveTo(u,x),a=!0):f&&a?e.lineTo(u,x):f&&!a&&e.moveTo(u,x),a=f}e.stroke()}for(let s=0;s<c*.3;s++){const d=s/(c*.3-1);e.beginPath(),e.strokeStyle=`rgba(255, 255, 255, ${v*.7})`,e.lineWidth=z*.7;let a=!1;for(let m=0;m<=h*.5;m++){const b=m/(h*.5),p=Q(d,b,P),l=p.x*Math.cos(g)-p.y*Math.sin(g),w=p.x*Math.sin(g)+p.y*Math.cos(g),y=p.z,C=1.5+y*.001,u=i/2+l*C,x=n/2+w*C,f=y>-50;m===0?f&&(e.moveTo(u,x),a=!0):f&&a?e.lineTo(u,x):f&&!a&&e.moveTo(u,x),a=f}e.stroke()}P+=1,requestAnimationFrame(Z)};Z()}document.addEventListener("DOMContentLoaded",()=>{ae()});window.addEventListener("resize",()=>{ae()});document.querySelector(".action-button:nth-child(7)").addEventListener("click",()=>{const o=document.querySelector("main"),t=document.querySelector(".running-record-image");document.querySelector(".running-next-btn");const r=document.querySelector(".main-default");if(!t){const e=document.createElement("div");e.className="running-container",e.style.position="absolute",e.style.top="50%",e.style.left="50%",e.style.transform="translate(-50%, -50%)",e.style.zIndex="2",e.style.width="80%",e.style.maxWidth="1000px";const i=document.createElement("img");i.className="running-record-image",i.src=fe,i.style.width="90%",i.style.height="auto",i.style.opacity="0",i.style.display="block",i.style.margin="0 auto";const n=document.createElement("button");n.className="running-next-btn next-episode-btn",n.textContent="›››",n.style.position="fixed",n.style.bottom="40px",n.style.right="40px",n.style.background="none",n.style.border="none",n.style.color="white",n.style.fontSize="24px",n.style.cursor="pointer",n.style.padding="10px",n.style.zIndex="3",n.style.opacity="0.8",n.style.transition="opacity 0.3s",n.addEventListener("mouseenter",()=>{n.style.opacity="1"}),n.addEventListener("mouseleave",()=>{n.style.opacity="0.8"}),n.addEventListener("click",()=>{gsap.to(e,{opacity:0,duration:.3,onComplete:()=>{e.remove(),n.remove(),r.style.display="flex",gsap.fromTo(r,{opacity:0},{opacity:1,duration:.5,ease:"power2.out"})}})}),e.appendChild(i),document.body.appendChild(n),o.appendChild(e),gsap.to(i,{opacity:1,duration:.5,ease:"power2.out"}),r.style.display="none"}});document.addEventListener("DOMContentLoaded",()=>{const o=document.querySelector(".action-button:nth-child(9)"),t=document.querySelector(".main-default");o.addEventListener("click",()=>{t.style.display="none",document.querySelectorAll(".main-detail").forEach(e=>{e.classList.contains("write-detail")||(e.style.display="none")});let r=document.querySelector(".write-detail");r||(r=document.createElement("div"),r.className="main-detail write-detail",r.style.flexDirection="column",r.style.alignItems="stretch",r.style.padding="2rem 1.5rem",r.style.textAlign="left",r.style.justifyContent="flex-start",r.style.backgroundColor="#121212",r.innerHTML=`
                <div style="margin-bottom: 2rem; text-align: center;">
                    <div class="season-info" style="font-size: 0.8rem; color: #999; margin-bottom: 0.2rem;">MY WRITINGS</div>
                    <!-- <h2 class="detail-title" style="font-size: 1.8rem; color: #e0e0e0; margin-top: 0; letter-spacing: 1px;">微信公众号文章</h2> -->
                        </div>
                <div class="articles-container-wrapper" style="max-width: 750px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; flex-grow: 1;">
                    <div class="wechat-articles-list" style="display: flex; flex-wrap: wrap; justify-content: space-between; overflow-y: auto; width: 100%; flex-grow: 1; align-content: space-around;">
                        
                        <!-- Article Card 1 -->
                        <div class="wechat-article-card" data-article-id="article-1" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); /* Adjusted for space-between on parent */ box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-07-15</p>
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">越来越强</h3>
                                <!-- <p class="article-meta" style="font-size: 0.75rem; color: #777; margin-bottom: 0;">60 reads · 9 likes · 2 shared</p> -->
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <img src="${be}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>

                        <!-- Article Card 2 (New: 生命力) -->
                        <div class="wechat-article-card" data-article-id="article-2" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); /* Adjusted for space-between on parent */ box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-05-10</p> <!-- Date from original article-3 -->
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">生命力</h3>
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <img src="${we}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>
                        
                        <!-- Article Card 3 (New: TO 2024) -->
                        <div class="wechat-article-card" data-article-id="article-3" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); /* Adjusted for space-between on parent */ box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-04-20</p> <!-- Date from original article-4 -->
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">TO 2024</h3>
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <img src="${ve}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>

                         <!-- Article Card 4 (New: 世界在我前面，缓缓展开) -->
                        <div class="wechat-article-card" data-article-id="article-4" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); /* Adjusted for space-between on parent */ box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-06-28</p> <!-- Date from original article-2 -->
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">世界在我前面，缓缓展开</h3>
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <img src="${xe}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>

                        <!-- Article Card 5 -->
                        <div class="wechat-article-card" data-article-id="article-5" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-03-15</p>
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">与自己</h3>
                                <!-- <p class="article-meta" style="font-size: 0.75rem; color: #777; margin-bottom: 0;">300 reads · 40 likes · 15 shared</p> -->
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <img src="${Me}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>

                        <!-- Article Card 6 -->
                        <div class="wechat-article-card" data-article-id="article-6" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2024-02-20</p>
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">勇敢打开你的索引</h3>
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <img src="${Ce}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>

                        <!-- Placeholder Article Card 7 -->
                        <div class="wechat-article-card" data-article-id="article-7" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2023-12-01</p>
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">与江南书院</h3>
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <img src="${Le}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>

                        <!-- Placeholder Article Card 8 -->
                        <div class="wechat-article-card" data-article-id="article-8" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2023-11-25</p>
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">你怎么就没血了</h3>
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <img src="${ke}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>

                        <!-- Placeholder Article Card 9 -->
                        <div class="wechat-article-card" data-article-id="article-9" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2023-11-20</p>
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">我们没有永远</h3>
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <img src="${Ee}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>

                        <!-- Placeholder Article Card 10 -->
                        <div class="wechat-article-card" data-article-id="article-10" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2023-11-15</p>
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">科目三</h3>
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <img src="${Se}" alt="Thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>

                        <!-- Placeholder Article Card 11 -->
                        <div class="wechat-article-card" data-article-id="article-11" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2023-12-10</p>
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">Placeholder Article 11</h3>
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <!-- No image tag for placeholders -->
                            </div>
                        </div>

                        <!-- Placeholder Article Card 12 -->
                        <div class="wechat-article-card" data-article-id="article-12" 
                             style="background-color: #1E1E1E; display: flex; align-items: center; padding: 1rem; margin-bottom: 0.5rem; border-radius: 8px; border: 1px solid #282828; cursor: pointer; transition: background-color 0.2s, transform 0.15s ease-out; width: calc(50% - 0.5rem); box-sizing: border-box;">
                            <div class="article-text-content" style="flex-grow: 1; margin-right: 1rem;">
                                <p class="article-date" style="font-size: 0.7rem; color: #888; margin-top: 0; margin-bottom: 0.3rem;">2023-12-05</p>
                                <h3 class="article-title" style="font-size: 1.1rem; font-weight: 500; color: #d0d0d0; margin-top: 0; margin-bottom: 0.4rem; line-height: 1.4;">Placeholder Article 12</h3>
                            </div>
                            <div class="article-thumbnail" style="flex-shrink: 0; width: 70px; height: 70px; background-color: #2C2C2C; border-radius: 6px; overflow: hidden;">
                                <!-- No image tag for placeholders -->
                            </div>
                        </div>

                    </div>
                </div>
            `,document.querySelector("main").appendChild(r),r.querySelectorAll(".wechat-article-card").forEach(e=>{e.addEventListener("click",()=>{const i=e.dataset.articleId,n=e.querySelector(".article-title").textContent;i==="article-1"?window.open("https://mp.weixin.qq.com/s/Vo-UGtOUmVAqPQLt94SGdg","_blank"):i==="article-2"?window.open("https://mp.weixin.qq.com/s/VSDlvWIv2Q1M2udMvwkYUQ","_blank"):i==="article-3"?window.open("https://mp.weixin.qq.com/s/qi__Z4IPiEQ4kW-mMzmHrw","_blank"):i==="article-4"?window.open("https://mp.weixin.qq.com/s/wjDEGHZ4FnAOOXnIT1Pw1w","_blank"):i==="article-5"?window.open("https://mp.weixin.qq.com/s/E4djVYPjjknWaPjwttsFjA","_blank"):i==="article-6"?window.open("https://mp.weixin.qq.com/s/_L9UpYUw9YFz2cNpUVUqgQ","_blank"):i==="article-7"?window.open("https://mp.weixin.qq.com/s?__biz=Mzk0MjU2OTA1Nw==&mid=2247483933&idx=1&sn=7a6360a478627b05e26cb91f0a8f5164&scene=21#wechat_redirect","_blank"):i==="article-8"?window.open("https://mp.weixin.qq.com/s?__biz=Mzk0MjU2OTA1Nw==&mid=2247483962&idx=1&sn=e984f3909965e70e1cb2ab4d6936e457&scene=21&poc_token=HJodPGijFYYRg4UJPY7ZQJC05NQcdJyDCh145ups","_blank"):i==="article-9"?window.open("https://mp.weixin.qq.com/s?__biz=Mzk0MjU2OTA1Nw==&mid=2247484150&idx=1&sn=9172b3d07a5f01b40782818c1da468b9&scene=21#wechat_redirect","_blank"):i==="article-10"?window.open("https://mp.weixin.qq.com/s?__biz=Mzk0MjU2OTA1Nw==&mid=2247484288&idx=1&sn=bafb1665755d6d6abeba5a8e5d6b1d51&scene=21#wechat_redirect","_blank"):console.log(`Navigating to article: ${n} (ID: ${i})`)}),e.addEventListener("mouseenter",()=>{e.style.backgroundColor="#2A2A2A",e.style.transform="translateY(-2px)"}),e.addEventListener("mouseleave",()=>{e.style.backgroundColor="#1E1E1E",e.style.transform="translateY(0px)"})})),r.style.display="flex",gsap.fromTo(r,{opacity:0},{opacity:1,duration:.3}),document.body.classList.remove("menu-open")})});document.addEventListener("DOMContentLoaded",()=>{const o=document.querySelector(".action-grid .action-button:nth-child(2)"),t=document.querySelector(".main-default"),r=document.querySelector("main");o&&t&&r&&o.addEventListener("click",()=>{t.style.display="none",document.querySelectorAll(".main-detail").forEach(i=>{i.style.display="none"});let e=document.querySelector(".create-detail");e||(e=document.createElement("div"),e.className="main-detail create-detail",e.style.flexDirection="column",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="2rem",e.innerHTML=`
                    <h2 class="create-section-title">MY CREATIONS</h2>
                    <div class="product-categories-grid">
                        <div class="product-category-card" data-category="plugins">
                            <div class="product-category-icon">
                                <svg viewBox="0 0 24 24" width="64" height="64"><path fill="currentColor" d="M20.5,11H19V7C19,5.89 18.11,5 17,5H13V3.5A2.5,2.5 0 0,0 10.5,1A2.5,2.5 0 0,0 8,3.5V5H4A2,2 0 0,0 2,7V10.5A2.5,2.5 0 0,0 4.5,13A2.5,2.5 0 0,0 2,15.5V19A2,2 0 0,0 4,21H8V19.5A2.5,2.5 0 0,0 10.5,17A2.5,2.5 0 0,0 8,14.5V13H12V17H13.5A2.5,2.5 0 0,0 16,19.5A2.5,2.5 0 0,0 13.5,22H17A2,2 0 0,0 19,20V16H20.5A2.5,2.5 0 0,0 23,13.5A2.5,2.5 0 0,0 20.5,11Z"></path></svg>
                            </div>
                            <h3 class="product-category-name">插件</h3>
                            <p class="product-category-desc">提升效率的浏览器与应用扩展。</p>
                            <button class="view-products-btn">查看插件</button>
                        </div>
                        <div class="product-category-card" data-category="gpts">
                            <div class="product-category-icon">
                                <svg viewBox="0 0 24 24" width="64" height="64"><path fill="currentColor" d="M12,2A2,2 0 0,1 14,4V6H10V4A2,2 0 0,1 12,2M19,11V13H16.8C16.42,14.18 15.61,15.18 14.54,15.82L16,17.27L14.59,18.69L13.04,17.14C12.71,17.19 12.36,17.22 12,17.22C11.64,17.22 11.29,17.19 10.96,17.14L9.41,18.69L8,17.27L9.46,15.82C8.39,15.18 7.58,14.18 7.2,13H5V11H7.2C7.07,10.68 7,10.35 7,10C7,9.65 7.07,9.32 7.2,9H5V7H7.2C7.58,5.82 8.39,4.82 9.46,4.18L8,2.73L9.41,1.31L10.96,2.86C11.29,2.81 11.64,2.78 12,2.78C12.36,2.78 12.71,2.81 13.04,2.86L14.59,1.31L16,2.73L14.54,4.18C15.61,4.82 16.42,5.82 16.8,7H19V9H16.8C16.93,9.32 17,9.65 17,10C17,10.35 16.93,10.68 16.8,11H19M12,9A1,1 0 0,0 11,10A1,1 0 0,0 12,11A1,1 0 0,0 13,10A1,1 0 0,0 12,9M10,10.5A1.5,1.5 0 0,0 8.5,12A1.5,1.5 0 0,0 10,13.5V15H14V13.5A1.5,1.5 0 0,0 15.5,12A1.5,1.5 0 0,0 14,10.5H10Z"></path></svg>
                            </div>
                            <h3 class="product-category-name">GPTS</h3>
                            <p class="product-category-desc">专为特定任务定制的智能模型。</p>
                            <button class="view-products-btn">探索 GPTS</button>
                        </div>
                        <div class="product-category-card" data-category="apps">
                            <div class="product-category-icon">
                                <svg viewBox="0 0 24 24" width="64" height="64"><path fill="currentColor" d="M17,1H7C5.89,1 5,1.89 5,3V21C5,22.11 5.89,23 7,23H17C18.11,23 19,22.11 19,21V3C19,1.89 18.11,1 17,1M17,19H7V5H17V19Z"></path></svg>
                            </div>
                            <h3 class="product-category-name">APP</h3>
                            <p class="product-category-desc">精心设计的移动与桌面应用。</p>
                            <button class="view-products-btn">体验 APP</button>
                        </div>
                        <div class="product-category-card" data-category="crawlers">
                            <div class="product-category-icon">
                                <svg viewBox="0 0 24 24" width="64" height="64"><path fill="currentColor" d="M12,5.5A2.5,2.5 0 0,1 14.5,8A2.5,2.5 0 0,1 12,10.5A2.5,2.5 0 0,1 9.5,8A2.5,2.5 0 0,1 12,5.5M6,3C4.89,3 4,3.89 4,5V7H6V5H7V3H6M10,3V5H14V3H10M17,3V5H18V7H20V5C20,3.89 19.11,3 18,3H17M7,8V11H5V8H7M17,8V11H19V8H17M4.79,13.04L7.62,14.46L7.03,16.29L3.06,14.79L4.79,13.04M19.21,13.04L20.94,14.79L16.97,16.29L16.38,14.46L19.21,13.04M7.03,17.71L7.62,19.54L4.79,20.96L3.06,19.21L7.03,17.71M16.97,17.71L20.94,19.21L19.21,20.96L16.38,19.54L16.97,17.71M10,13V15H7V19H9V16H11V21H13V16H15V19H17V15H14V13H10Z"></path></svg>
                            </div>
                            <h3 class="product-category-name">爬虫</h3>
                            <p class="product-category-desc">自动化数据收集与处理工具。</p>
                            <button class="view-products-btn">探索爬虫</button>
                        </div>
                    </div>
                `,r.appendChild(e),e.querySelectorAll(".view-products-btn").forEach(i=>{i.addEventListener("click",n=>{const c=n.target.closest(".product-category-card");if(!c)return;const h=c.dataset.category;e.style.display="none",h==="plugins"?$e():h==="gpts"?Ne():console.log(`查看 ${h} 详情`)})})),e.style.display="flex",L&&(L.style.display="none"),gsap.fromTo(e,{opacity:0,y:20},{opacity:1,y:0,duration:.5,ease:"power2.out"}),document.body.classList.remove("menu-open")})});function $e(){const o=document.querySelector("main");let t=document.querySelector(".plugin-detail-view");const r=document.getElementById("nav-back-to-creations-btn");t||(t=document.createElement("div"),t.className="main-detail plugin-detail-view",t.style.flexDirection="column",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="2rem",t.style.textAlign="center",t.innerHTML=`
            <div class="plugin-content-wrapper">
                <img src="${Ae}" alt="Slash Command Prompter" class="plugin-image">
                <div class="plugin-info">
                    <h2 class="plugin-title">Slash Command Prompter</h2>
                    <p class="plugin-description">我做了一个适用于所有AI的插件
</p>
                    <a href="https://chromewebstore.google.com/detail/slash-command-prompter/kjfihbeejjmdmkedgcopiglnhemejipl?hl=en-US&utm_source=ext_sidebar" target="_blank" class="plugin-store-link">
                        <svg class="chrome-store-icon" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.93 4.93c1.52 1.52 2.47 3.59 2.47 5.87s-.95 4.34-2.47 5.87C15.41 20.22 13.78 21 12 21c-1.43 0-2.76-.54-3.77-1.45l6.22-6.22-4.01-4.01-6.22 6.22C3.17 14.25 2.5 12.62 2.5 11c0-1.78.54-3.41 1.45-4.77L10.17 10l4.01-4.01-6.22-6.22C9.24 3.17 10.57 2.5 12 2.5c1.78 0 3.41.54 4.77 1.45L10.55 10l6.38-6.07z"/><path fill="currentColor" d="M12,6.5c1.38 0 2.5 1.12 2.5 2.5S13.38 11.5 12,11.5 9.5 10.38 9.5 9s1.12-2.5 2.5-2.5zm0 7c2.49 0 4.5 2.01 4.5 4.5S14.49 22.5 12,22.5s-4.5-2.01-4.5-4.5 2.01-4.5 4.5-4.5z"/></svg>
                        <span>在 Chrome 网上应用店查看</span>
                    </a>
                    <a href="https://mp.weixin.qq.com/s/x8a3cLB_YRRfmVvpUqYnYA" target="_blank" class="plugin-manual-link">
                        <span>使用说明书</span>
                    </a>
                </div>
            </div>
        `,o.appendChild(t),r&&r.addEventListener("click",()=>{t.style.display="none",r.style.display="none";const e=document.querySelector(".create-detail");e&&(e.style.display="flex",gsap.fromTo(e,{opacity:0,y:-20},{opacity:1,y:0,duration:.5,ease:"power2.out"}))})),document.querySelectorAll(".main-detail").forEach(e=>{e!==t&&(e.style.display="none")}),t.style.display="flex",r&&(r.style.display="inline-block"),gsap.fromTo(t,{opacity:0,scale:.95},{opacity:1,scale:1,duration:.4,ease:"power2.out"})}function Ne(){const o=document.querySelector("main");let t=document.querySelector(".gpts-list-view");const r=document.getElementById("nav-back-to-creations-btn");if(!t){t=document.createElement("div"),t.className="main-detail gpts-list-view",t.style.flexDirection="column",t.style.alignItems="center",t.style.padding="2rem",t.style.textAlign="center";const e=[{id:"gpts-xiaolai",name:"笑来",icon:`<img src="${qe}" alt="笑来" class="gpts-card-img-icon">`,description:"读书、健身、投资、帮朋友、陪家人..."},{id:"gpts-qingbian",name:"请辩",icon:`<img src="${ze}" alt="请辩" class="gpts-card-img-icon">`,description:"思考永不止步"},{id:"gpts-builder",name:"GPT Builder",icon:`<img src="${Pe}" alt="GPT Builder" class="gpts-card-img-icon">`,description:"用 AI 构建 AI"},{id:"gpts-learn",name:"Learn",icon:`<img src="${Te}" alt="Learn" class="gpts-card-img-icon">`,description:"辅助你学习想学的一切"},{id:"gpts-run",name:"Run",icon:`<img src="${Ve}" alt="Run" class="gpts-card-img-icon">`,description:"更快、更久、更强"},{id:"gpts-fact-checker",name:"Fact Checker",icon:`<img src="${He}" alt="Fact Checker" class="gpts-card-img-icon">`,description:"打破 AI 幻觉"}],i=["gpts-xiaolai","gpts-qingbian","gpts-builder"];let n="";if(e.forEach(c=>{let h;c.id==="gpts-learn"?h='<a href="https://chatgpt.com/g/g-67be8d6b2dec819186d2ab6041969366-learn" target="_blank" class="gpts-action-btn">启动 GPTs</a>':c.id==="gpts-run"?h='<a href="https://chatgpt.com/g/g-67d4ce8e0894819183f11ae56e049445-run" target="_blank" class="gpts-action-btn">启动 GPTs</a>':c.id==="gpts-fact-checker"?h='<a href="https://chatgpt.com/g/g-67be8eb1a560819191efb6675cb8d169-shi-shi-he-cha-yuan" target="_blank" class="gpts-action-btn">启动 GPTs</a>':h='<button class="gpts-action-btn">启动 GPTs</button>',n+=`
                <div class="gpts-card" data-gptid="${c.id}">
                    <div class="gpts-card-icon">${c.icon}</div>
                    <h3 class="gpts-card-name">${c.name}</h3>
                    <p class="gpts-card-description">${c.description}</p>
                    ${h}
                    ${i.includes(c.id)?`<div class="gpts-hover-tooltip">
                            <img src="${Ie}" alt="QR Code">
                            <p>付费内容，联系作者获取</p>
                        </div>`:""}
                </div>
            `}),t.innerHTML=`
            <div class="gpts-cards-grid">
                ${n}
            </div>
        `,o.appendChild(t),r){const c=t,h=()=>{c.style.display="none",r.style.display="none";const v=document.querySelector(".create-detail");v&&(v.style.display="flex",gsap.fromTo(v,{opacity:0,y:-20},{opacity:1,y:0,duration:.5,ease:"power2.out"}))};r.gptsViewListenerAttached||(r.addEventListener("click",h),r.gptsViewListenerAttached=!0)}t.querySelectorAll(".gpts-card").forEach(c=>{const h=c.dataset.gptid,v=c.querySelector(".gpts-hover-tooltip");if(v&&i.includes(h)){const z=c.querySelector(".gpts-action-btn");z&&(z.addEventListener("mouseenter",()=>{gsap.to(v,{opacity:1,visibility:"visible",duration:.3,ease:"power2.out"})}),z.addEventListener("mouseleave",()=>{gsap.to(v,{opacity:0,visibility:"hidden",duration:.2,ease:"power2.in"})}))}}),t.querySelectorAll(".gpts-action-btn").forEach(c=>{c.addEventListener("click",h=>{const v=h.target.closest(".gpts-card").dataset.gptid;console.log(`启动或查看 GPTS 详情: ${v}`)})})}document.querySelectorAll(".main-detail").forEach(e=>{e!==t&&(e.style.display="none")}),t.style.display="flex",r&&(r.style.display="inline-block"),gsap.fromTo(t,{opacity:0,y:20},{opacity:1,y:0,duration:.5,ease:"power2.out"})}const ie=document.querySelector(".run-story");document.querySelectorAll(".action-button").forEach(o=>{o.addEventListener("click",()=>{o.textContent.trim()==="Run"&&(actionGrid.style.display="none",ie.style.display="block",gsap.fromTo(ie,{opacity:0,y:20},{opacity:1,y:0,duration:.5,ease:"power2.out"}))})});
