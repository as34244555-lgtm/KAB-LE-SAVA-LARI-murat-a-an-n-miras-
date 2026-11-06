var Su=Object.defineProperty;var bu=(i,t,e)=>t in i?Su(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var j=(i,t,e)=>bu(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();class Eu{constructor(){j(this,"listeners",new Map)}on(t,e){const n=this.listeners.get(t)??new Set;return n.add(e),this.listeners.set(t,n),()=>n.delete(e)}emit(t,e){const n=this.listeners.get(t);if(n)for(const r of n)r(e)}clear(){this.listeners.clear()}}const En=new Eu,wu={boot:["intro","menu","pick"],intro:["menu","pick"],menu:["intro","pick","map","build","loading"],pick:["map","build","menu"],loading:["map","build","menu"],map:["battle","menu","pick","build"],build:["battle","menu","pick","map"],battle:["map","build","menu"]};class Tu{constructor(){j(this,"phase","boot");j(this,"history",["boot"])}get current(){return this.phase}canEnter(t){return wu[this.phase].includes(t)}enter(t){if(t===this.phase)return this.phase;if(!this.canEnter(t))throw new Error(`Geçersiz durum geçişi: ${this.phase} → ${t}`);return this.phase=t,this.history.push(t),this.phase}force(t){return this.phase=t,this.history.push(t),this.phase}trail(){return this.history}}const we={sariklilar:{id:"sariklilar",name:"Sarıklılar",epithet:"Ateşin ve Barutun Çocukları",temperament:"sicak",colors:{primary:"#c0392b",secondary:"#f4d03f",accent:"#fff4d6"},combat:{class:"bomber",role:"Alan hasarı / bomba",beats:"demirhisar",losesTo:"gokhanli"},accuses:"gokhanli",accusation:"Hançer bir gölge kadar sessiz saplandı. Bunu ancak rüzgârın çocukları yapardı — Gök-Hanlılar tahtın arkasında duruyordu.",voice:"sıcak, öfkeli, iğneleyici"},gokhanli:{id:"gokhanli",name:"Gök-Hanlı",epithet:"Gölgelerin ve Rüzgârın Kabilesi",temperament:"gizemli",colors:{primary:"#2c1a4d",secondary:"#7d3c98",accent:"#d7bde2"},combat:{class:"skirmisher",role:"Hız / kritik hasar",beats:"sariklilar",losesTo:"demirhisar"},accuses:"demirhisar",accusation:"Saraya fark edilmeden girmek için o kadar ağır bir zırh gerekir ki adımlar taşları uyutur. Demir-Hisar bunu bilir.",voice:"alçak, hızlı, iğneleyici"},demirhisar:{id:"demirhisar",name:"Demir-Hisar",epithet:"Çelik ve Yeminin Muhafızları",temperament:"onurlu",colors:{primary:"#7b241c",secondary:"#d4ac0d",accent:"#f5e6c8"},combat:{class:"guardian",role:"Zırh / savunma",beats:"gokhanli",losesTo:"sariklilar"},accuses:"sariklilar",accusation:"Barışı bozmak için kendi liderlerini feda edenler, barutu dualarının yanına koyanlardır. Sarıklılar tahtı yakmak istedi.",voice:"sert, onurlu, iğneleyici"},player:{id:"player",name:"Vâris",epithet:"Parşömenlerin Koruyucusu",temperament:"merakli",colors:{primary:"#2471a3",secondary:"#d4a574",accent:"#fdebd0"},combat:{class:"skirmisher",role:"Keşif / komuta",beats:null,losesTo:null},accuses:null,accusation:"Ben kimseyi suçlamadan önce mührü okuyacağım.",voice:"kararlı, hüzünlü"}},Ui=[{id:"barutcu",tribe:"sariklilar",name:"Sarıklı Barutçu",unitClass:"bomber",lore:"Murat Ağa'nın festival gecelerinde gökyüzünü yakan ustaların torunları. Şimdi aynı kıvılcımı surlara çeviriyorlar.",baseCost:40,baseHp:70,baseAttack:28,baseDefense:8,critChance:.08,aoe:.45},{id:"ruzgar",tribe:"gokhanli",name:"Gök-Hanlı Rüzgâr",unitClass:"skirmisher",lore:"Sessiz adımları Murat Ağa'nın av partilerinde övülürdü. Şimdi aynı adımlar şüpheyle ölçülüyor.",baseCost:45,baseHp:55,baseAttack:22,baseDefense:6,critChance:.28,aoe:0},{id:"muhafiz",tribe:"demirhisar",name:"Demir-Hisar Muhafızı",unitClass:"guardian",lore:"Aslan başlı kalkanlarını Murat Ağa'nın yeminiyle dövdüler. Zırhları hâlâ o yemini taşır.",baseCost:50,baseHp:110,baseAttack:16,baseDefense:22,critChance:.04,aoe:0},{id:"deve",tribe:"sariklilar",name:"Deve Süvarisi",unitClass:"bomber",lore:"Çölü aşan deve sürüleri barutu ve suyu aynı semere bağlar.",baseCost:62,baseHp:95,baseAttack:24,baseDefense:12,critChance:.1,aoe:.2},{id:"panter",tribe:"gokhanli",name:"Panter İzcisi",unitClass:"skirmisher",lore:"Sisli patikalarda panterle yürüyenler, hançerin gölgesini ilk duyanlardır.",baseCost:68,baseHp:48,baseAttack:26,baseDefense:5,critChance:.38,aoe:0},{id:"burc",tribe:"demirhisar",name:"Burç Muhafızı",unitClass:"guardian",lore:"Buz burçlarında nöbet tutanlar, yemini kalkanın arkasına yazar.",baseCost:72,baseHp:140,baseAttack:14,baseDefense:30,critChance:.03,aoe:0}],No=1.35;function Au(i,t){const e=we[i];return e.combat.beats===t?No:e.combat.losesTo===t?1/No:1}function Ru(i){return 1+Math.pow(i/12,1.15)*.22}const xc=[{q:-4,r:-6,kind:"side",sideId:"korsanlar",title:"Tuz Korsanları",unlockLevel:10,questId:"q-korsan-fener"},{q:8,r:5,kind:"side",sideId:"mogollar",title:"Bozkır Moğolları",unlockLevel:20,questId:"q-tuz-hakki"},{q:-9,r:7,kind:"side",sideId:"gocebeler",title:"Kum Göçebeleri",unlockLevel:30,questId:"q-su-ismi"},{q:0,r:10,kind:"temple",sideId:"suikastcilar",title:"Gölge Tapınağı",unlockLevel:40,questId:"q-gercegi-satinalma"},{q:11,r:-8,kind:"side",sideId:"denizciler",title:"İnci Denizcileri",unlockLevel:50,questId:"q-islak-taht"},{q:-12,r:-2,kind:"side",sideId:"colyildizlari",title:"Çöl Yıldızları",unlockLevel:60},{q:6,r:-11,kind:"side",sideId:"dagkartallari",title:"Dağ Kartalları",unlockLevel:70,questId:"q-dortuncu-muhur"},{q:-2,r:14,kind:"side",sideId:"buzmuhafizlari",title:"Buz Muhafızları",unlockLevel:80},{q:14,r:3,kind:"side",sideId:"eskiyeminliler",title:"Eski Yeminliler",unlockLevel:90,questId:"q-en-yakin"},{q:3,r:16,kind:"finale",sideId:"golge-elcisi",title:"Elçi Kalesi",unlockLevel:100,questId:"q-miras"}];function ro(i,t){return xc.find(e=>e.q===i&&e.r===t)}function Cu(i){return i.kind==="finale"?24:i.kind==="temple"?16:6+Math.floor(i.unlockLevel/10)}const or=1.18;function dr(i,t){return`${i},${t}`}function Pu(i){const[t,e]=i.split(",").map(Number);return{q:t,r:e}}function wr(i,t,e=or){return{x:e*Math.sqrt(3)*(i+t/2),z:e*1.5*t}}const Lu=[[1,0],[1,-1],[0,-1],[-1,0],[-1,1],[0,1]];function Ms(i,t){return Lu.map(([e,n])=>({q:i+e,r:t+n}))}function Fn(i,t,e,n){return Math.max(Math.abs(i-e),Math.abs(t-n),Math.abs(i+t-e-n))}function ku(i,t){const e=-i-t;let n=Math.round(i),r=Math.round(t);const s=Math.round(e),a=Math.abs(n-i),o=Math.abs(r-t),l=Math.abs(s-e);return a>o&&a>l?n=-r-s:o>l&&(r=-n-s),{q:n,r}}function Fo(i,t,e=or){const n=(Math.sqrt(3)/3*i-.3333333333333333*t)/e,r=2/3*t/e;return ku(n,r)}function yc(i,t,e,n){for(let r=i-e;r<=i+e;r+=1)for(let s=t-e;s<=t+e;s+=1)Fn(i,t,r,s)<=e&&n(r,s)}function Qn(i,t,e=0){let n=(i+e*17)*374761393+(t-e*9)*668265263;return n=(n^n>>>13)*1274126177,((n^n>>>16)>>>0)/4294967296}function Ss(i,t,e,n=0){const r=i/e,s=t/e,a=Math.floor(r),o=Math.floor(s),l=r-a,c=s-o,u=Qn(a,o,n),h=Qn(a+1,o,n),f=Qn(a,o+1,n),p=Qn(a+1,o+1,n),g=l*l*(3-2*l),x=c*c*(3-2*c);return u*(1-g)*(1-x)+h*g*(1-x)+f*(1-g)*x+p*g*x}const Ni={sariklilar:[{q:-7,r:4},{q:-14,r:1},{q:-6,r:-3}],gokhanli:[{q:0,r:0},{q:1,r:-10},{q:-8,r:-8}],demirhisar:[{q:7,r:-3},{q:13,r:0},{q:4,r:-9}]};function Qr(i){return Ni[i][0]}function so(){return Object.keys(Ni).flatMap(i=>Ni[i].map(t=>({...t,tribe:i})))}function Du(i,t){for(const e of Object.keys(Ni)){const n=Ni[e].findIndex(r=>r.q===i&&r.r===t);if(n>=0)return{tribe:e,capital:n===0}}}const Iu=14,ls=8,cs=18,Uu=10,Nu=2;function Mc(i,t){const e=Ss(i,t,4.2,1)*.62+Ss(i,t,1.7,4)*.38,n=Ss(i+40,t-12,5.1,2);let r="forest";e<.36||e<.45&&n<.32?r="ice":(e>.64||e>.55&&n<.38)&&(r="desert");const s=Qn(i,t,11);s<.07?r="desert":s<.14?r="ice":s<.21&&(r="forest");for(const a of so())Fn(i,t,a.q,a.r)<=2&&Qn(i,t,3)>.28&&(r=a.tribe==="sariklilar"?"desert":a.tribe==="demirhisar"?"ice":"forest");return r}function Fu(i,t){for(const n of so())if(Fn(i,t,n.q,n.r)<=1)return n.tribe;const e=Qn(i,t,19);return e<.035&&Fn(i,t,0,0)>5?e<.012?"sariklilar":e<.024?"gokhanli":"demirhisar":"neutral"}function Ou(i,t,e){return e==="neutral"?!1:Ni[e].some(n=>n.q===i&&n.r===t)}function Sc(i){const t=ro(i.q,i.r);t&&(i.landmark=t.kind,i.sideId=t.sideId,i.label=t.title,i.owner="neutral",i.slot=t.kind==="finale"?"hall":t.kind==="temple"?"tower":void 0,i.garrison=Cu(t))}function ca(i){for(const t of xc){us(i,t.q,t.r,1);const e=i.find(n=>n.q===t.q&&n.r===t.r);e&&!e.landmark&&Sc(e)}}function zu(i,t){const e=ro(i,t),n=Mc(i,t),r=e?"neutral":Fu(i,t),s=Ou(i,t,r),a=s?Du(i,t):void 0,o=Math.floor(Fn(i,t,0,0)/4),l={id:dr(i,t),q:i,r:t,biome:n,owner:r,slot:s?"hall":void 0,level:s?1:0,garrison:r==="neutral"?2+o:s?a!=null&&a.capital?8:6:4+o,label:s?`${we[r].name} ${a!=null&&a.capital?"merkezi":"karakolu"}`:Hu(n,r)};return e&&Sc(l),l}function us(i,t,e,n){const r=new Set(i.map(a=>a.id));let s=0;return yc(t,e,n,(a,o)=>{const l=dr(a,o);r.has(l)||(i.push(zu(a,o)),r.add(l),s+=1)}),s}function bc(i){const t=[],e=Qr(i);us(t,e.q,e.r,Uu);for(const n of so())us(t,n.q,n.r,Nu);return ca(t),t}function Bu(i,t){return i.find(e=>e.id===t)}function Hu(i,t){const e=i==="desert"?"Çöl":i==="ice"?"Buz":"Orman";return t==="neutral"?`${e} geçidi`:`${we[t].name} ${e.toLowerCase()}ı`}function Gu(i,t){if(t){const e=["sariklilar","gokhanli","demirhisar"].filter(n=>n!==i);if(e.some(n=>t[n]==="war"))return"KABİLELER SAVAŞTA — SANCAKLAR AÇILDI";if(e.every(n=>t[n]==="talks"))return`${we[e[0]].name.toUpperCase()} & ${we[e[1]].name.toUpperCase()} GÖRÜŞMESİ AKTİF`;if(e.some(n=>t[n]==="trade"))return"KABİLELER TİCARET BULUŞMASINDA"}return i==="sariklilar"?"GÖK-HANLI & DEMİR-HİSAR GÖRÜŞMESİ AKTİF":i==="gokhanli"?"YAN KABİLELER TİCARET BULUŞMASI":"ÇÖL VE ORMAN KABİLELERİ HAREKETTE"}function Vu(i){return i==="desert"?"Çöl: Sarıklılar avantajlı, Demir-Hisar zorlanır.":i==="ice"?"Buz: Demir-Hisar avantajlı, Sarıklılar zorlanır.":"Orman: Gök-Hanlı avantajlı, Demir-Hisar zorlanır."}function Wu(i){return i==="desert"?"Çöl":i==="ice"?"Buz":"Orman"}function ms(i){return Ui.filter(t=>t.tribe===i)}function Fi(i){var t;return((t=ms(i)[0])==null?void 0:t.id)??"muhafiz"}function Ai(i){return Object.values(i??{}).reduce((t,e)=>t+Math.max(0,e),0)}function Xu(i,t){return{[Fi(i)]:Math.max(0,t)}}function hs(){return{sariklilar:"talks",gokhanli:"talks",demirhisar:"talks"}}function li(i,t,e){const n={...i??{}},r=Fi(e);let s=Ai(n);if(t>s)n[r]=(n[r]??0)+(t-s);else if(t<s){let a=s-t;const o=[...ms(e).map(l=>l.id)].reverse();for(const l of o){if(a<=0)break;const c=Math.min(n[l]??0,a);n[l]=(n[l]??0)-c,a-=c}}return n}function qu(i,t,e){const n={};let r=t;for(const s of ms(e)){const a=i[s.id]??0,o=Math.min(a,r);o<=0||(n[s.id]=o,i[s.id]=a-o,r-=o)}if(r>0){const s=Fi(e);n[s]=(n[s]??0)+r}return n}function Yu(i,t,e){const n=Object.values(t).reduce((a,o)=>a+o,0);if(n<=0)return;let r=0;const s=Object.entries(t);s.forEach(([a,o],l)=>{const c=l===s.length-1?Math.max(0,e-r):Math.round(o*e/n);i[a]=(i[a]??0)+c,r+=c})}function $u(i){return i==="war"?"savaş":i==="trade"?"ticaret":"görüşme"}const ua={sariklilar:{tribe:"sariklilar",biomeLabel:"Çöl Ocağı",hallTitle:"Ateş Divanı",unitName:"Sarıklı Barutçu",unitTitle:"Barut ve deve akını",heroName:"Kum Beyi",slots:[{slot:"hall",name:"Ateş Divanı",lore:"Çölün kalbi. Altın ve emir buradan akar.",cost:{gold:0},produces:{gold:3,food:1}},{slot:"resource",name:"Hurma Tarlası",lore:"Vaha tarlaları kabilenin karnını doyurur.",cost:{gold:40,wood:20},produces:{food:3,leather:1}},{slot:"camp",name:"Barut Çadırı",lore:"Fitil ve toz burada uyanır.",cost:{gold:70,leather:15,food:20},produces:{gold:1}},{slot:"tower",name:"Kum Kulesi",lore:"Çöl rüzgârını gözetler.",cost:{stone:30,gold:40},produces:{}},{slot:"market",name:"Deve Pazarı",lore:"Kervanlar vaha gölgesinde durur.",cost:{gold:80,leather:20},produces:{gold:4}},{slot:"forge",name:"Fitil Ocağı",lore:"Barutçu tüfekleri burada dolanır.",cost:{gold:90,stone:20},produces:{}}]},gokhanli:{tribe:"gokhanli",biomeLabel:"Sisli Orman",hallTitle:"Rüzgâr Ocağı",unitName:"Gök-Hanlı Rüzgâr",unitTitle:"Gölge ve panter binicisi",heroName:"Sis Hanı",slots:[{slot:"hall",name:"Rüzgâr Ocağı",lore:"Ormanın kalbi. Kristal ve sır burada birikir.",cost:{gold:0},produces:{gold:2,crystal:1}},{slot:"resource",name:"Kristal Kök",lore:"Mor damarlar ağaçların altında atar.",cost:{gold:45,wood:25},produces:{wood:3,crystal:2}},{slot:"camp",name:"Gölge Kampı",lore:"Sessiz adımlar burada eğitilir.",cost:{gold:75,wood:20,crystal:10},produces:{gold:1}},{slot:"tower",name:"Sis Kulesi",lore:"Yaprakların üstünden bakar.",cost:{wood:40,gold:35},produces:{}},{slot:"market",name:"Yaprak Pazarı",lore:"Yan kabileler burada takas eder.",cost:{gold:80,wood:25},produces:{gold:3,crystal:1}},{slot:"forge",name:"Gölge Tezgâhı",lore:"Hançerler ve panter semerleri.",cost:{gold:95,crystal:15},produces:{}}]},demirhisar:{tribe:"demirhisar",biomeLabel:"Buz Hisarı",hallTitle:"Çelik Taht",unitName:"Demir-Hisar Muhafızı",unitTitle:"Zırh ve aslan kalkanı",heroName:"Hisar Beyi",slots:[{slot:"hall",name:"Çelik Taht",lore:"Buzun kalbi. Taş ve yemin burada tutulur.",cost:{gold:0},produces:{gold:2,stone:1}},{slot:"resource",name:"Buz Ocağı",lore:"Kristal damarlar ve taş damar.",cost:{gold:50,stone:15},produces:{stone:3,gold:1}},{slot:"camp",name:"Yemin Kışlası",lore:"Aslan kalkanları burada omuzlanır.",cost:{gold:80,stone:25,food:15},produces:{gold:1}},{slot:"tower",name:"Buz Burcu",lore:"Surların gözü.",cost:{stone:45,gold:40},produces:{}},{slot:"market",name:"Demir Çarşı",lore:"Zırh ve tuz takası.",cost:{gold:85,stone:20},produces:{gold:4}},{slot:"forge",name:"Aslan Demirhanesi",lore:"Çeliğe vurulan her çekiç bir yemini hatırlar.",cost:{gold:100,stone:30},produces:{}}]}};function Ec(i){return ua[i]}function ds(i,t){return ua[i].slots.find(e=>e.slot===t)??ua[i].slots[0]}function Tr(i,t){return Object.keys(t).every(e=>(i[e]??0)>=(t[e]??0))}function Ar(i,t){const e={...i};for(const n of Object.keys(t))e[n]-=t[n]??0;return e}function Oo(i,t,e=1){const n={...i};for(const r of Object.keys(t))n[r]+=Math.floor((t[r]??0)*e);return n}const Rr={gold:35,food:12},zo={gold:60,crystal:8};function Ku(i,t){return Math.round(i*Math.pow(1.28,t-1))}function Zu(i,t){return i+Math.max(0,t-1)}const Ju={goldMine:40,barracks:55,forge:70,caravanserai:80,scrollTower:60,shadowTemple:200,hall:0,resource:40,camp:70,tower:40,market:80},Bo={gold:0,wood:0,stone:0,leather:0,crystal:0,food:0};function ha(){return{gold:240,wood:90,stone:80,leather:45,crystal:24,food:110}}class ju{constructor(t=240,e=6,n=ha()){j(this,"gold");j(this,"diamond");j(this,"bag");this.gold=Math.max(0,Math.floor(t)),this.diamond=Math.max(0,Math.floor(e)),this.bag={...ha(),...n,gold:this.gold}}canAfford(t,e){return t==="diamond"?this.diamond>=e:(this.bag[t]??0)>=e}spend(t,e){return this.canAfford(t,e)?(t==="diamond"?this.diamond-=e:(this.bag[t]-=e,t==="gold"&&(this.gold=this.bag.gold)),!0):!1}grant(t,e){const n=Math.max(0,Math.floor(e));t==="diamond"?this.diamond+=n:(this.bag[t]+=n,t==="gold"&&(this.gold=this.bag.gold))}produceTiles(t,e,n=1){if(!e||e==="neutral")return{...Bo};let r={...Bo};for(const s of t){if(s.owner!==e||!s.slot||s.level<=0)continue;const a=ds(e,s.slot);r=Oo(r,a.produces,s.level*n)}return this.bag=Oo(this.bag,r),this.gold=this.bag.gold,r}buildCost(t,e,n){const r=e+1;if(!n.canUpgradeTo(r))return null;const s=Ju[t]??40;return{gold:Ku(Math.max(1,s),r),diamond:Zu(t==="shadowTemple"?4:1,r)}}produce(t,e=1){const n=t.goldMine??t.hall??0,r=t.caravanserai??t.market??0,s=n*2*e+r*1*e;return this.grant("gold",s),s}snapshot(){return{gold:this.gold,diamond:this.diamond,bag:{...this.bag}}}}const bs="ksmam.save.v2",ao="murat-aga-mirasi-v1";function Ho(i="Kabile Lideri"){return{version:2,playerName:i,chosenTribe:null,playerLevel:1,xp:0,diamond:6,resources:ha(),tiles:bc("gokhanli"),army:4,roster:{},unitLevel:1,collectedScrolls:[1],discoveredSideTribes:[],completedQuests:[],caravan:null,shadowTempleRevealed:!1,finaleRevealed:!1,lastTickAt:Date.now(),selectedHex:null,diplomacy:hs(),visitedLandmarks:[],lastDailyAt:Math.floor(Date.now()/864e5),buildingLevels:{goldMine:0,barracks:0,forge:0,caravanserai:0,scrollTower:0,shadowTemple:0}}}async function Qu(i){var t;if((t=globalThis.crypto)!=null&&t.subtle){const e=await Tc(),n=globalThis.crypto.getRandomValues(new Uint8Array(12)),r=new TextEncoder().encode(i),s=await globalThis.crypto.subtle.encrypt({name:"AES-GCM",iv:n},e,r);return`gcm.${da(n)}.${da(new Uint8Array(s))}`}return`xor.${nh(i)}`}async function th(i){var t;if(i.startsWith("gcm.")&&((t=globalThis.crypto)!=null&&t.subtle)){const[,e,n]=i.split("."),r=await Tc(),s=Go(fa(e)),a=Go(fa(n)),o=await globalThis.crypto.subtle.decrypt({name:"AES-GCM",iv:s},r,a);return new TextDecoder().decode(o)}if(i.startsWith("xor."))return ih(i.slice(4));throw new Error("Bozuk kayıt zarfı")}class eh{async persist(t){const e=await Qu(JSON.stringify(t));typeof localStorage<"u"&&localStorage.setItem(bs,e)}async load(){if(typeof localStorage>"u")return null;const t=localStorage.getItem(bs);if(!t)return null;try{const e=JSON.parse(await th(t));return e.version!==2||!e.resources||!e.tiles?null:wc(e)}catch{return null}}clear(){typeof localStorage<"u"&&localStorage.removeItem(bs)}}function wc(i){return i.roster??(i.roster={}),i.diplomacy??(i.diplomacy=hs()),i.visitedLandmarks??(i.visitedLandmarks=[]),i.lastDailyAt??(i.lastDailyAt=0),i}async function Tc(){const i=await globalThis.crypto.subtle.importKey("raw",new TextEncoder().encode(ao),"PBKDF2",!1,["deriveKey"]);return globalThis.crypto.subtle.deriveKey({name:"PBKDF2",salt:new TextEncoder().encode("kanli-taht"),iterations:12e4,hash:"SHA-256"},i,{name:"AES-GCM",length:256},!1,["encrypt","decrypt"])}function nh(i){const t=new TextEncoder().encode(i),e=new TextEncoder().encode(ao);return da(t.map((n,r)=>n^e[r%e.length]))}function ih(i){const t=fa(i),e=new TextEncoder().encode(ao);return new TextDecoder().decode(t.map((n,r)=>n^e[r%e.length]))}function da(i){let t="";return i.forEach(e=>{t+=String.fromCharCode(e)}),btoa(t)}function fa(i){return Uint8Array.from(atob(i),t=>t.charCodeAt(0))}function Go(i){const t=new Uint8Array(i.byteLength);return t.set(i),t}const Vo="Kabile Savaşları: Murat Ağa'nın Mirası",Ci=100,ts=40,es=100,rh=10,Z=(i,t,e,n,r)=>({level:i,title:t,body:e,misdirection:n,tone:r}),Ac=[Z(1,"Kanlı Taht","Gece yarısı hançer kalbe girdi. Mühürler mor ışık saçtı. Ben, Murat Ağa, bu satırları henüz yaşıyorken değil — vârisimin okuması için bırakıyorum. İlk yalan çok yakında başlayacak.","none","suspicion"),Z(2,"Sessiz Sapış","Hançer bir nefes kadar sessizdi. Saray muhafızları bile dönmedi. Gök-Hanlılar rüzgârı böyle kullanır. Kalemim onları işaret ediyor — belki de işaret etmemi istiyorlar.","gokhanli","suspicion"),Z(3,"Turbanın Külü","Sarıklılar festival barutunu bu gece sakladılar. 'Yas gününde kıvılcım olmaz' dediler. Yas henüz ilan edilmemişti.","sariklilar","suspicion"),Z(4,"Ağır Adımlar","Taht salonunun eşiğinde çamur izi var. İz, Demir-Hisar çizmelerine uyuyor. Zırh ağırsa gölge de ağır olur, derler.","demirhisar","suspicion"),Z(5,"Üç Banner","Sarıklılar Gök-Hanlı'yı, Gök-Hanlı Demir-Hisar'ı, Demir-Hisar Sarıklılar'ı suçluyor. Bu daire birinin işine yarıyor.","none","suspicion"),Z(6,"Mor Kabza","Kabzanın mührü üç kabilenin de arşivinde yok. Yine de her kabile 'bu bizden değil, ötekinden' diyor. Çok eminler.","gokhanli","suspicion"),Z(7,"Fener Sönmesi","Suikast gecesi kuzey feneri sönmüş. Gök-Hanlı nöbetçisi 'rüzgâr aldı' diyor. Rüzgâr feneri seçmez.","gokhanli","suspicion"),Z(8,"Barut Defteri","Sarıklı kâtip, o gece bir fıçı eksik olduğunu yazmış. Sonra satırı silmiş. Silgi izi, itiraftan daha yüksek sesle konuşur.","sariklilar","suspicion"),Z(9,"Kalkan Çizigi","Demir-Hisar kalkanında taze bir çizik var. 'Talim' diyorlar. Talim kalkanı tahtın kumaşına sürülmez.","demirhisar","suspicion"),Z(10,"Tuz ve Yemin","Korsan Leyla'nın mektubu: Murat Ağa denizi yeminle bağlardı. Kıyıda mor sandal görülmüş. Gök-Hanlı rumu, diyorlar.","gokhanli","suspicion"),Z(11,"Çelik Kokusu","Hançerin yanında yağ lekesi. Demirhane yağı. Demir-Hisar ustaları bu kokuyu 'onur' diye adlandırır.","demirhisar","suspicion"),Z(12,"Gölge Adımı","İkinci gece nöbetçi, duvarda bir gölgenin 'yanlış yönde' düştüğünü söyledi. Gök-Hanlılar gölgeyi evcilleştirir.","gokhanli","suspicion"),Z(13,"Kızgın Tava","Sarıklı bir usta, 'barış bizi boğuyor' demiş. Söz, hançerden önce söylenmiş. Öfke, planın kıyafetidir.","sariklilar","suspicion"),Z(14,"Aslan Yüzü","Tahtın kolundaki aslanın gözü oyulmuş. Demir-Hisar bunu kendi amblemine hakaret sayar — ya da kendi elleriyle yaptı, suçlu aransın diye.","demirhisar","suspicion"),Z(15,"Yanlış Tanık","Üç tanık, üç farklı kabile gördüğünü iddia ediyor. Hepsi aynı koridorda, aynı anda. Bu matematik değil, tiyatro.","none","suspicion"),Z(16,"Rüzgâr Mührü","Bir parşömen kılıfında Gök-Hanlı tüy motifi. Çok görünür. Gizemli bir kabile izini bu kadar özenle bırakmaz — bırakır gibi yapar.","gokhanli","suspicion"),Z(17,"Festival Borcu","Sarıklılar, Murat Ağa'nın festival vergisini kestiğini unutmamış. Öfke sıcak tutulursa hançer de ısınır.","sariklilar","suspicion"),Z(18,"Nöbet Değişimi","Demir-Hisar, suikast saatinde nöbeti 'tesadüfen' erken teslim etmiş. Onur, bazen kapıyı açık bırakır.","demirhisar","suspicion"),Z(19,"İğne Cümle","Gök-Hanlı elçi, Sarıklı beye 'barutunuz tahttan daha yüksek konuşuyor' demiş. Savaş, dilden önce başlar.","gokhanli","suspicion"),Z(20,"Bozkır Zırhı","Moğol Han Batu, kırık bir Demir-Hisar parçasını gönderdi. 'Bunu çadırımın önünde buldum. Tuz hakkına rağmen.'","demirhisar","suspicion"),Z(21,"Kendi Liderleri","Bir fısıltı: Sarıklılar barışı bozmak için kendi ağalarını feda etti. Fısıltı Demir-Hisar ocaklarından geliyor.","sariklilar","suspicion"),Z(22,"Kırmızı Toz","Taht basamağında kırmızı toz. Sarıklı barut. Ya da kırmızı toprak — ama herkes barut demek istiyor.","sariklilar","suspicion"),Z(23,"Tüy ve Zehir","Gök-Hanlı ok ucunda acı badem kokusu. Zehir mi, yoksa merhem mi? Şüphe, ikisini de aynı şişeye koyar.","gokhanli","suspicion"),Z(24,"Ağır Kapı","Sarayın arka kapısı içeriden kilitliydi. Bunu ancak zırhlı bir omuz zorlar, diyor Gök-Hanlılar. Kapı çiziksiz.","demirhisar","suspicion"),Z(25,"Üç Mektup","Aynı gece üç kabileye de 'yarın taht boş kalacak' diye mektup gitmiş. Mühürler farklı, el yazısı aynı.","none","suspicion"),Z(26,"Sarıklı Yas","Sarıklı çocuklar gerçekten ağlıyor. Büyükler ise öfkeyi Gök-Hanlı'ya çevirmekte çok hızlı. Gözyaşı samimi, parmak değil.","sariklilar","suspicion"),Z(27,"Sessiz Koro","Gök-Hanlılar matemde şarkı söylemez. Bu gelenek. Bu gece de söylemediler. Suç gibi duran bir saygı.","gokhanli","suspicion"),Z(28,"Çelik Yemin","Demir-Hisar, 'onurumuz lekelendi' diye kılıç kaldırdı. Lekeyi kim sürdüyse, kılıcı da o yönlendiriyor.","demirhisar","suspicion"),Z(29,"Sahte İz","Kum Göçebeleri'nin getirdiği mühür Sarıklı görünüyor. Şirin Ana 'koku yanlış' diyor. Sahte kanıt, gerçek öfkeden beslenir.","sariklilar","suspicion"),Z(30,"Su Hakkı","Murat Ağa susuzlara isim sorardı. Göçebeler hâlâ o isimleri sayıyor. Katil, isim soran birini neden öldürür?","none","suspicion"),Z(31,"Dördüncü Adım","Koridorda dört adım izi var. Üç kabile, üç ritim. Dördüncüsü tanıdık değil — ama evin içinde.","none","suspicion"),Z(32,"Mor Işık","Hançerin mühürleri gece yarısı yeniden parladı. Hiçbir kabile o ışığı sahiplenmedi. Korktular. Korku, masumiyet değildir.","none","suspicion"),Z(33,"Bilgi Tüccarı","Sisli haritanın kenarında bir fısıltı: 'Cevabı satanlar var.' Henüz tapınak yok. Ama fiyat konuşuluyor.","assassins","shadow"),Z(34,"Karşıt Kanıt","Her yeni parça önceki parçayı yalanlıyor. Bu bir soruşturma değil, bir labirent. Labirenti kim inşa eder?","none","suspicion"),Z(35,"Yakın Dost","Murat Ağa'nın solunda duran isimsiz danışman, matemde en çok ağlayan kişi. Gözyaşı da bir maske olabilir.","none","shadow"),Z(36,"Üç Suç, Bir El","Sarıklı barut, Gök-Hanlı sessizlik, Demir-Hisar ağırlık — üçü birden aynı hançerde. Bir el üçünü taklit eder.","assassins","shadow"),Z(37,"Sis Çizgisi","Haritanın en karanlık köşesi artık sis tutmuyor. Birileri orayı görünür kılmak istiyor.","assassins","shadow"),Z(38,"Tarikat Sözü","Bir keşiş: 'Biz kan dökmeyiz, sır dökeriz.' Sır, bazen kandan daha keskin.","assassins","shadow"),Z(39,"Kırılma Arifesi","Vâris, kırkıncı mühre yaklaş. Bundan sonra dünya biraz daha karanlık görünecek. Bu bir lanet değil, bir perde.","assassins","shadow"),Z(40,"Gölge Tapınağı","Haritanın en karanlık yerinde tapınak belirdi. Suikastçılar Kabilesi — ilk bakışta bilgi veren bir tarikat. Kapılarında şu yazıyor: 'Gerçeği satın al.' Murat Ağa bir zamanlar bu kapıyı çalmış.","assassins","shadow"),Z(41,"Satılan Cevap","Tapınak, Sarıklılar'a Gök-Hanlı'nın suçunu, Gök-Hanlı'ya Demir-Hisar'ın suçunu sattı. Herkes memnun. Gerçek ucuz kaldı.","assassins","shadow"),Z(42,"Mor Kristal","Tapınağın sütunları hançerle aynı kristali taşıyor. 'Kadim mühür' dedikleri şey, evlerinin tuğlası.","assassins","shadow"),Z(43,"Bilgi ve Bağ","Tarikat üye kaydı istiyor. 'Sadece dinle, sadece öğren.' Dinlemek de bir yemin olabilir.","assassins","shadow"),Z(44,"Eski Kapı","Murat Ağa'nın tapınağa girdiği gece deftere 'fiyatı sordum, vermedim' yazılmış. Vermediği şey neydi?","assassins","shadow"),Z(45,"Kabilelerin Keyfi","Üç kabile tapınağı seviyor. Çünkü tapınak onların öfkesini doğruluyor. Ayna, yalancı bir dosttur.","none","shadow"),Z(46,"Gölge Elçisi I","Bir acemi, 'Elçi' diye bir unvan fısıldadı. Yüz yok, isim yok. Tahtın solunda duran boşluk.","assassins","shadow"),Z(47,"Çelişen Keşiş","İki keşiş aynı geceyi anlattı: biri Murat Ağa'nın güldüğünü, diğeri ağladığını söyledi. İkisi de yemin etti.","assassins","shadow"),Z(48,"Toprak Haritası","Tapınak arşivinde bütün kabile topraklarının çizimi var. Kenarda bir not: 'Birleşince tek lokma.'","assassins","shadow"),Z(49,"İnci Limanı","Denizciler 'Gölge Elçisi' adını limanda duymuş. Kimse yüzünü görmemiş. İsim, dalgadan daha hızlı yayılıyor.","assassins","shadow"),Z(50,"Islak Battaniye","Dümenci Ömer, Murat Ağa'nın fırtınada bir çocuğu kayığa aldığını anlatır. Taht o gece ıslaktı. Katil, ıslak bir tahtı neden ister?","none","shadow"),Z(51,"Sahte Dostluk","Tarikat vârise hediye verdi: üç kabilenin 'suç dosyası'. Dosyalar birbirini yiyor. Hediyeler bazen tuzak tabaktır.","assassins","shadow"),Z(52,"Mühür Karşılaştırması","Hançerdeki mühür, tapınak kapısındaki mührün kardeşi. Keşişler 'tesadüf' diyor. Tesadüf, evlilik yapmaz.","assassins","shadow"),Z(53,"Kayıp Nöbetçi","Suikast gecesi kaybolan tek nöbetçi, sonradan tapınakta 'aydınlanmış' olarak belirdi. Aydınlanma, bazen bir maaş.","assassins","shadow"),Z(54,"Üç Öfke, Bir Yönetmen","Sarıklı öfke, Gök-Hanlı gizem, Demir-Hisar onur — üçü de gerçek. Yönetmen, oyuncuların içten oynamasını ister.","assassins","shadow"),Z(55,"Elçinin Gölgesi","Eski bir portrede Murat Ağa'nın solunda bir siluet var. Yüz kazınmış. Kazıyan el, titrememiş.","assassins","shadow"),Z(56,"Kristal Ticaret","Mor kristaller kervanlarda dolaşıyor. Kaynak: tapınak. Amaç: 'koruma tılsımı.' Tılsım, bağımlılık da olabilir.","assassins","shadow"),Z(57,"Yasak Satır","Murat Ağa'nın günlüklerinde bir satır kesilmiş: 'Elçi bana…' Gerisi yanık. Yangın, kütüphanede değil, vicdanda çıkmış.","assassins","shadow"),Z(58,"Kabile Antlaşması","Tapınak üç kabileye ayrı ayrı 'sizi koruruz' antlaşması önermiş. Aynı kâğıt, üç imza, üç düşman.","assassins","shadow"),Z(59,"Yıldız Çizgisi","Çöl kâhinleri gökyüzünün mor bir çizgiyle yarıldığını söyler. Kehanet üç kabileye birden suçlu der. Bozuk bir pusula.","none","shadow"),Z(60,"Bozuk Kehanet","Yıldızlar yalan söylemez, diyorlar. Yıldızları okuyanlar söyler. Çöl Yıldızları bile artık emin değil.","assassins","shadow"),Z(61,"İçerideki Kapı","Tapınağın altında ikinci bir kapı var. 'Sırların sırları.' Keşişler vârise gülümseyerek kapatıyor.","assassins","shadow"),Z(62,"Asker Sayımı","Tarikatın 'bilgi keşişleri' gece zırh giyiyor. Bilgi, bu kadar ağır olmamalı.","assassins","shadow"),Z(63,"Murat'ın Reddi","Bir keşiş itiraf etti: Murat Ağa tarikata toprak vermeyi reddetti. 'Barış satılık değil' demiş.","assassins","shadow"),Z(64,"Reddin Bedeli","Reddedilenler, tahtı boşaltmayı bir ticaret olarak görür. Hançer, fatura olabilir.","assassins","shadow"),Z(65,"Vâris Uyarısı","Anonim bir not: 'Sana gerçeği satacaklar. Sakın alma. Kendin bul.' El yazısı, Murat Ağa'nınkine çok yakın.","none","shadow"),Z(66,"Çifte Oyun","Gök-Hanlı bir casus, tapınağın Demir-Hisar'a 'Gök-Hanlı saldıracak' dediğini duydu. Casus, kendi kabilesini bile şüpheyle dinliyor.","assassins","shadow"),Z(67,"Barut Hikâyesi","Sarıklı bir yaşlı: 'Bize Gök-Hanlı'nın hançeri sessiz sapladığını tapınak söyledi. Biz de inandık, çünkü inanmak öfkeden kolaydı.'","assassins","shadow"),Z(68,"Onur Tuzağı","Demir-Hisar beyi: 'Sarıklılar kendi liderlerini feda etti dediler. Onurumuz bunu kaldıramadı. Şimdi düşünüyorum: kim söyledi?'","assassins","shadow"),Z(69,"Kartal Yemini","Dağ Kartalları'nın taşı: 'Hiçbir kabile diğerinin gölgesi olmayacak.' Altında dördüncü mühür. Üç kabile onu tanımıyor.","assassins","shadow"),Z(70,"Dördüncü Mühür","Mühür, tapınak kapısındakiyle aynı. Kartal Ana titriyor. Murat Ağa o taşı 'gelecek nesil okusun' diye gömmüş.","assassins","shadow"),Z(71,"Planın İsmi","Yasak bir rulo: 'Kabileleri birbirine düşür, toprağı tek elden yönet.' İmza yerine bir gölge baskısı.","assassins","shadow"),Z(72,"Elçinin Yüzü","Bir çocuk, tahtın solundaki adamın 'çok nazik' olduğunu söyledi. Nazik insanlar hançeri gülümseyerek taşır.","assassins","shadow"),Z(73,"Yakınındaki Gölge","Murat Ağa'nın en yakını, mecliste hiç oy kullanmazdı. 'Ben yalnızca taşırım' derdi. Ne taşırdı?","assassins","shadow"),Z(74,"Taşınan Emir","Elçi, üç kabileye de Murat Ağa'nın ağzından emirler iletmiş. Emirlerin bir kısmı günlükte yok.","assassins","shadow"),Z(75,"Sahte Ferman","Bir ferman: 'Sarıklılar Gök-Hanlı kervanını durdursun.' Mühür doğru, cümle yanlış. El, mührü ödünç almış.","assassins","shadow"),Z(76,"Gülümseyen Keşiş","Tapınak başı vârise diyor: 'Gerçeğe yaklaştıkça karanlık artar. Bu, doğru yolda olduğunun işaretidir.' Bu cümle bir tuzak.","assassins","shadow"),Z(77,"Kayıp Sayfa","Günlüğün 77. yaprağı yok. Yerine tapınak ilahisi yapıştırılmış. İlahi, 'birlik' diyor. Birlik, kimin birliği?","assassins","shadow"),Z(78,"Buz Mektubu","Buz Beyi'nin gönderdiği yazı: 'Kabileler birbirini yerse taht boş kalır.' İmza yok. Ama mürekkep tapınak mürekkebi.","assassins","shadow"),Z(79,"Kuzey Geçidi","Murat Ağa kuzeyi kapatmıştı. Elçi, 'açın' diye ferman uydurmuş. Geçit açılınca mor kervan geçmiş.","assassins","shadow"),Z(80,"Boş Taht Teorisi","Tarikat dersi: Boş taht, dolu tarikattan iyidir. Öğrenciler bunu 'felsefe' sanıyor.","assassins","shadow"),Z(81,"Üç Kurban","Planın özü: üç kabile birbirini yıpratsın, dördüncü el artanı toplasın. Suikast bir cinayet değil, bir tohum.","assassins","shadow"),Z(82,"Vâris Tehlikesi","Elçi, vârisin parşömen topladığını öğrenmiş. 'Çocuk kağıtla savaşır' demiş. Kâğıt, bazen hançerden uzun yaşar.","assassins","shadow"),Z(83,"Son Yâren","Eski Yeminliler'den biri: Murat Ağa ölümünden bir gece önce 'en yakınımdakine güvenme' dedi. Sonra Elçi'ye gülümsedi.","assassins","shadow"),Z(84,"Gülümseme","Gülümseme, hançerin kabzasıdır. Murat Ağa bunu yazmış: 'Dostumun dişi beyaz, niyeti değil.'","assassins","shadow"),Z(85,"İsim","Defterin kenarında ilk kez tam unvan: Gölge Elçisi. Yanında bir not: 'Beni o seçti. Ben onu seçmedim.'","assassins","shadow"),Z(86,"Seçilmek","Elçi, Murat Ağa'nın güvenini yıllarca biriktirmiş. Güven, en pahalı silahtır. Bedava verilmez, çalınır.","assassins","shadow"),Z(87,"Gece Yarısı Prova","Suikasttan bir hafta önce taht salonunda 'prova' yapılmış. Muhafızlar bunu 'temizlik' sanmış. Temizlik, kanı önceden ölçer.","assassins","shadow"),Z(88,"Mühürler Uyanır","Kadim mühürler yalnızca Elçi'nin kanıyla parlar. Bu yüzden hançer mor. Bu yüzden kabileler o ışığı tanımıyor.","assassins","shadow"),Z(89,"Yeminlilerin Fısıltısı","Son yâren: 'Elçi, yıllardır tahtın solunda duran isimsiz danışmandır. İsmi yoktu çünkü isim, iz bırakır.'","assassins","reckoning"),Z(90,"İsimsiz Danışman","Portreler, fermanlar, nöbet listeleri — Elçi hepsinde 'boşluk'. Boşluk, en iyi kamufulajdır.","assassins","reckoning"),Z(91,"Toprak İştahı","Tarikat haritasının son hali: bütün kabileler silinmiş, tek bir mor sınır kalmış. Adı yok. İştahın adı olmaz.","assassins","reckoning"),Z(92,"Çocuk ve Parşömen","Murat Ağa vârise yazıyor: 'Eğer bunları okuyorsan yaşıyorum demektir — kâğıtta. Kanımda değil. Hançeri takip etme, yalanı takip et.'","none","reckoning"),Z(93,"Yalanın Yolu","Yalan üç kabileden geçti. Gerçek tek kapıdan: tapınağın altındaki ikinci kapı. Orada bir isim var.","assassins","reckoning"),Z(94,"İkinci Kapı","Kapının ardında hançerin kardeşi duruyor. Aynı mühür, aynı mor. 'Birinci taht içindi. İkincisi vâris için.'","assassins","reckoning"),Z(95,"Vâris Hançeri","Elçi seni de aynı tahta çivilemek istiyor. Miras, onun için bir engel. Senin için bir yemin.","assassins","reckoning"),Z(96,"Üç Kabileye Mektup","Murat Ağa'nın son isteği: Sarıklı'ya 'öfkeni yakma', Gök-Hanlı'ya 'gölgeni satma', Demir-Hisar'a 'onurunu kırdırma.'","none","reckoning"),Z(97,"Birleşme","Kabileler birleşirse plan çöker. Elçi bunu bildiği için onları birbirine düşürdü. Birlik, onun tek korkusu.","assassins","reckoning"),Z(98,"Hüzünlü Karar","Bu satırlar hüzünlü ama kararlı. Taht boş. Hançer hâlâ orada. Sen, vâris, mirası kurtaracaksın — köy inşa ederek değil, gerçeği inşa ederek.","none","reckoning"),Z(99,"Son Perde","Yüzüncü mühre bir adım. Elçi artık saklanmıyor; tapınak 'gerçeği' satmayı bıraktı, toprak istiyor. Perde kalkmak üzere.","assassins","reckoning"),Z(100,"Gölge Elçisi","Son parça: Suikastçılar, kabileleri birbirine düşürüp bütün toprakları ele geçirmek için bu planı kurdu. Katil, Murat Ağa'nın en yakınındaki Gölge Elçisi'dir. Hançer onun eli, öfke onun koroşu, boş taht onun tahtı olmak istedi. Vâris: üç kabileye gerçeği göster. Miras, kan değil; birliktir.","none","reckoning")];function fs(i){return Ac.find(t=>t.level===i)}function pa(i){return i>=100?"reckoning":i>=40?"shadow":i>=2?"suspicion":"peace"}const fr=[{unlockLevel:10,id:"korsanlar",name:"Tuz Korsanları",relation:"belirsiz",memory:"Kaptan Leyla, Murat Ağa ile bir kış gecesi aynı fenerin altında harita katladıklarını anlatır. 'O, denizi bile yeminle bağlardı' der.",clue:"O gece kıyıda mor ışıklı bir sandal görülmüş. Korsanlar bunu Gök-Hanlı rumuna yorar.",isShadowCult:!1},{unlockLevel:20,id:"mogollar",name:"Bozkır Moğolları",relation:"dusman",memory:"Han Batu, yıllar önce Murat Ağa'nın çadırına ekmek bırakıp savaşmayı reddettiğini söyler. 'Düşmanım bile olsa tuz hakkına sahipti.'",clue:"Bozkırda bulunan kırık bir zırh parçası Demir-Hisar damgası taşır — belki tuzak, belki gerçek.",isShadowCult:!1},{unlockLevel:30,id:"gocebeler",name:"Kum Göçebeleri",relation:"dost",memory:"Yaşlı Şirin, Murat Ağa'nın kervanına su verdiği günü unutmaz. 'O susuzlara tahtını anlatmazdı. İsimlerini sorardı.'",clue:"Kumda bulunan sahte bir mühür Sarıklılar'ın barut işaretine benzer, ama koku yanlıştır.",isShadowCult:!1},{unlockLevel:40,id:"suikastcilar",name:"Suikastçılar Tarikatı",relation:"belirsiz",memory:"Gölge Tapınağı'nın bekçisi fısıldar: 'Biz yalnızca bilgi satarız. Murat Ağa bile bir zamanlar kapımızı çalmıştı.'",clue:"Tarikat, üç kabileye de 'doğru' görünen parçalar verir. Her parça diğerini yakar.",isShadowCult:!0},{unlockLevel:50,id:"denizciler",name:"İnci Denizcileri",relation:"dost",memory:"Dümenci Ömer, Murat Ağa'nın fırtınada bir çocuğu kayığa aldığını hatırlar. 'Taht, o gece ıslak bir battaniyeydi.'",clue:"Limanda duyulan bir isim: Gölge Elçisi. Kimse yüzünü görmemiş.",isShadowCult:!1},{unlockLevel:60,id:"colyildizlari",name:"Çöl Yıldızları",relation:"belirsiz",memory:"Yıldız kâhinleri, Murat Ağa'nın son baharında gökyüzünün mor bir çizgiyle yarıldığını söyler.",clue:"Kehanet üç kabileye birden 'suçlu' der. Bu, kehanetin bozulduğu anlamına gelir.",isShadowCult:!1},{unlockLevel:70,id:"dagkartallari",name:"Dağ Kartalları",relation:"dost",memory:"Kartal Ana, Murat Ağa ile aynı uçurumda yemin ettiklerini anlatır: 'Hiçbir kabile diğerinin gölgesi olmayacak.'",clue:"Yemin taşının altında dördüncü bir mühür kazınmış. Üç kabileden hiçbiri onu tanımıyor.",isShadowCult:!1},{unlockLevel:80,id:"buzmuhafizlari",name:"Buz Muhafızları",relation:"dusman",memory:"Buz Beyi, Murat Ağa'nın kuzey geçidini kapattığı kışı hatırlar. 'Bizi dondurdu, ama yalan söylemedi.'",clue:"Buzda saklı bir mektup: 'Kabileler birbirini yerse taht boş kalır.' İmza yok.",isShadowCult:!1},{unlockLevel:90,id:"eskiyeminliler",name:"Eski Yeminliler",relation:"dost",memory:"Son yâren, Murat Ağa'nın ölümünden bir gece önce 'en yakınımdakine güvenme' dediğini yeminle tekrarlar.",clue:"Gölge Elçisi, yıllardır tahtın solunda duran isimsiz danışmandır.",isShadowCult:!1},{unlockLevel:100,id:"golge-elcisi",name:"Gölge Elçisi",relation:"dusman",memory:"Elçi, Murat Ağa'nın kulağına fısıldayan dosttu. Hançeri kalbe, planı topraklara saplayan da odur.",clue:"Son parşömen: Suikastçılar kabileleri birbirine düşürüp bütün mirası yutacaktı.",isShadowCult:!0}];function Rc(i){return fr.find(t=>t.unlockLevel===i)}function Es(i){return i>=Ci?Number.POSITIVE_INFINITY:Math.round(24+i*15+Math.pow(i,1.08)*2)}class Wo{constructor(t,e){this.level=t,this.xp=e,this.level=sh(t),this.xp=Math.max(0,e)}get currentLevel(){return this.level}get currentXp(){return this.xp}get progress(){const t=Es(this.level);return Number.isFinite(t)?Math.min(1,this.xp/t):1}get atmosphere(){return pa(this.level)}capFor(t){return Math.min(t,this.level)}canUpgradeTo(t){return t<=this.level&&t<=Ci}addXp(t){if(t<=0||this.level>=Ci)return[];this.xp+=t;const e=[];for(;this.level<Ci&&this.xp>=Es(this.level);)this.xp-=Es(this.level),this.level+=1,e.push(this.describeLevel(this.level));return this.level>=Ci&&(this.xp=0),e}describeLevel(t){const e=t%rh===0?Rc(t)??null:null;return{newLevel:t,scroll:fs(t)??null,unlockedSideTribe:e,shadowTempleUnlocked:t===ts,finaleUnlocked:t===es,atmosphere:pa(t)}}snapshot(){return{playerLevel:this.level,xp:this.xp}}}function sh(i){return Math.max(1,Math.min(Ci,Math.floor(i)))}const ah=[{speaker:"narrator",text:"Yüzyıllardır süren Büyük Barış, kabilelerin ortak lideri Murat Ağa'nın bir gece yarısı suikasta kurban gitmesiyle bozuldu."},{speaker:"narrator",text:"Katil, kalbine mor kabzalı, üzerinde kadim mühürler olan bir hançer sapladı ve onu tahtına çiviledi."},{speaker:"narrator",text:"Şimdi üç kabile birbirini suçluyor. Sen ise vârisin kalemini taşıyorsun: bir köy inşa etmeyecek, bir cinayeti çözecek, bir mirası kurtaracaksın."}],oh={sariklilar:[{speaker:"sariklilar",text:"Hançer bir gölge kadar sessiz saplandı. Rüzgâr çocukları, Gök-Hanlılar, tahtın arkasında duruyordu. Bunu bir Sarıklı yapsaydı surlar hâlâ yanıyor olurdu.",barb:"gokhanli"},{speaker:"sariklilar",text:"Demir-Hisar bizi 'kendi ağamızı kestik' diye diline doluyor. Onurları o kadar ağır ki, düşünceleri yerinden kımıldamıyor.",barb:"demirhisar"},{speaker:"sariklilar",text:"Murat Ağa festivalde çocuklara kıvılcım gösterirdi. Şimdi o kıvılcımı yas tutmak için söndürdük. Gök-Hanlılar ise hâlâ fısıldıyor.",barb:"gokhanli"}],gokhanli:[{speaker:"gokhanli",text:"Saraya fark edilmeden girmek için o kadar ağır bir zırh gerekir ki adımlar taşları uyutur. Demir-Hisar bunu 'nöbet' diye adlandırır.",barb:"demirhisar"},{speaker:"gokhanli",text:"Sarıklılar her şeyi ateşle ölçer. Sessizlik onları korkutur; korkunca bizi işaret ederler. Ne kadar da kestirme bir zekâ.",barb:"sariklilar"},{speaker:"gokhanli",text:"Murat Ağa avda bizim adımlarımızı överdi. Şimdi aynı adımlar 'suç' oldu. Demir, kıskandığı şeyi suçlar.",barb:"demirhisar"}],demirhisar:[{speaker:"demirhisar",text:"Barışı bozmak için kendi liderlerini feda edenler, barutu dualarının yanına koyanlardır. Sarıklılar tahtı yakmak istedi.",barb:"sariklilar"},{speaker:"demirhisar",text:"Gök-Hanlılar gölgeyi evcil hayvan gibi gezdirir. Sonra 'biz değiliz' derler. Onur, yüzünü gizleyenle konuşmaz.",barb:"gokhanli"},{speaker:"demirhisar",text:"Murat Ağa kalkanımıza aslanı kendi eliyle çizdi. O aslan hâlâ bakıyor. Sarıklı kıvılcımı, Gök-Hanlı fısıltısı — ikisi de yemine sığmaz.",barb:"sariklilar"}]},lh=[{speaker:"shadow",text:"Hoş geldin, vâris. Biz yalnızca bilgi satarız. Murat Ağa bile bir zamanlar kapımızı çalmıştı."},{speaker:"shadow",text:"Sarıklılar doğru söylüyor olabilir. Gök-Hanlılar da. Demir-Hisar da. Gerçek, fiyatını ödeyene görünür."},{speaker:"narrator",text:"Tapınak gülümser. Müzik alçalır. Renkler morlaşır. Bir tarikat bu kadar cömert olmamalı."}],ch=[{speaker:"narrator",text:"Son parşömen açılır. Mühürler söner, sonra yeniden yanar — bu kez yalan için değil."},{speaker:"shadow",text:"Beni o seçti, vâris. Ben yalnızca taşıdım. Hançeri, öfkeyi, boş tahtı."},{speaker:"narrator",text:"Gölge Elçisi, Murat Ağa'nın en yakınıdır. Suikastçılar kabileleri birbirine düşürüp toprakları yutacaktı. Miras henüz ölmedi — sen duruyorsun."}];class uh{constructor(t=[],e=!1,n=!1){j(this,"collected");j(this,"shadowTempleRevealed");j(this,"finaleRevealed");this.collected=[...new Set(t)].sort((r,s)=>r-s),this.shadowTempleRevealed=e,this.finaleRevealed=n}collect(t){const e=fs(t);return!e||this.collected.includes(t)?null:(this.collected.push(t),this.collected.sort((n,r)=>n-r),t>=ts&&(this.shadowTempleRevealed=!0),t>=es&&(this.finaleRevealed=!0),e)}knownScrolls(){return this.collected.map(t=>fs(t)).filter(t=>!!t)}lockedCount(){return Ac.length-this.collected.length}atmosphere(t){return pa(t)}palette(t){return t>=es||this.finaleRevealed?{sky:"#1a1024",fog:2757184,fogDensity:.042,ambient:3809376,torch:16737843,bloom:1.35,music:"reckoning"}:t>=ts||this.shadowTempleRevealed?{sky:"#241428",fog:3872848,fogDensity:.034,ambient:4860016,torch:16746564,bloom:1.15,music:"shadow"}:t>=10?{sky:"#4a2a38",fog:6961728,fogDensity:.022,ambient:6963248,torch:16755285,bloom:.85,music:"suspicion"}:{sky:"#8a9aa8",fog:9075304,fogDensity:.01,ambient:9076852,torch:16765600,bloom:.35,music:"overture"}}triggerLines(t){if(t===es)return ch;if(t===ts)return lh;const e=fr.find(n=>n.unlockLevel===t);return e?[{speaker:"narrator",text:`Sis çekiliyor: ${e.name} belirdi.`},{speaker:"npc",text:e.memory},{speaker:"narrator",text:e.clue}]:[]}}const hh=[{id:"q-yas-atesi",title:"Yas Ateşini Yakma",giver:"Sarıklı Usta Cemil",unlockLevel:1,memoryOfMurat:"Cemil, Murat Ağa'nın bir kış gecesi ocağına oturup barut yerine çay koyduğunu anlatır. 'Ateş, misafiri yakmaz' demişti.",objective:"Altın Ocağı'nı kur veya yükselt; yas gününde üretim devam etsin.",goldReward:60,xpReward:35,diamondReward:1},{id:"q-ruzgar-izi",title:"Rüzgârın İzi",giver:"Gök-Hanlı İzci Peri",unlockLevel:2,memoryOfMurat:"Peri, Murat Ağa ile aynı sırtta pusu beklediklerini söyler. 'O, rüzgârı düşmana karşı değil, çocuğa karşı sakınırdı.'",objective:"Keşif haritasında sisin bir parçasını aç ve bir kervan gönder.",goldReward:80,xpReward:45,diamondReward:1},{id:"q-aslan-kalkani",title:"Aslan Kalkanı",giver:"Demir-Hisar Usta Arslan",unlockLevel:3,memoryOfMurat:"Arslan, Murat Ağa'nın kalkanına aslanı kendi eliyle çizdiğini unutmaz. 'Onur, çizgide durur' demişti.",objective:"En az bir Demir-Hisar Muhafızı eğit veya bir düşmanı püskürt.",goldReward:90,xpReward:50,diamondReward:1},{id:"q-korsan-fener",title:"Tuz Feneri",giver:"Kaptan Leyla",unlockLevel:10,memoryOfMurat:"Leyla, Murat Ağa ile aynı fenerin altında harita katladıklarını anlatır. 'Denizi bile yeminle bağlardı.'",objective:"Tuz Korsanları'nı keşfet ve kervanı haydutlara karşı koru.",goldReward:140,xpReward:80,diamondReward:2},{id:"q-tuz-hakki",title:"Tuz Hakkı",giver:"Han Batu",unlockLevel:20,memoryOfMurat:"Batu, Murat Ağa'nın çadırına ekmek bırakıp savaşmayı reddettiğini söyler. 'Düşmanım bile olsa tuz hakkına sahipti.'",objective:"Bozkır Moğolları ile yüzleş; sahte zırh parçasını günlüğe işle.",goldReward:180,xpReward:100,diamondReward:2},{id:"q-su-ismi",title:"Susuzların İsmi",giver:"Şirin Ana",unlockLevel:30,memoryOfMurat:"Şirin, Murat Ağa'nın kervanına su verdiği günü unutmaz. 'O susuzlara tahtını anlatmazdı. İsimlerini sorardı.'",objective:"Kum Göçebeleri'nin sahte mührünü Parşömen Kulesi'ne taşı.",goldReward:200,xpReward:120,diamondReward:2},{id:"q-gercegi-satinalma",title:"Gerçeği Satın Alma",giver:"Gölge Bekçisi",unlockLevel:40,memoryOfMurat:"Bekçi fısıldar: 'Murat Ağa kapımızı çalmıştı. Fiyatı sordu, vermedi. Barış satılık değil demişti.'",objective:"Gölge Tapınağı'nı aç ve bir 'bilgi' satın alma — sonra onu şüpheyle oku.",goldReward:240,xpReward:160,diamondReward:3},{id:"q-islak-taht",title:"Islak Taht",giver:"Dümenci Ömer",unlockLevel:50,memoryOfMurat:"Ömer, Murat Ağa'nın fırtınada bir çocuğu kayığa aldığını hatırlar. 'Taht, o gece ıslak bir battaniyeydi.'",objective:"İnci Denizcileri'nden Gölge Elçisi adını günlükle.",goldReward:260,xpReward:180,diamondReward:3},{id:"q-dortuncu-muhur",title:"Dördüncü Mühür",giver:"Kartal Ana",unlockLevel:70,memoryOfMurat:"Kartal Ana, Murat Ağa ile aynı uçurumda yemin ettiklerini anlatır: 'Hiçbir kabile diğerinin gölgesi olmayacak.'",objective:"Yemin taşının altındaki dördüncü mührü üç kabileye göster.",goldReward:320,xpReward:220,diamondReward:4},{id:"q-en-yakin",title:"En Yakınımdakine Güvenme",giver:"Son Yâren",unlockLevel:90,memoryOfMurat:"Yâren, Murat Ağa'nın ölümünden bir gece önce 'en yakınımdakine güvenme' dediğini yeminle tekrarlar. Sonra Elçi'ye gülümsemişti.",objective:"Eski Yeminliler'in tanıklığını son parşömene bağla.",goldReward:400,xpReward:280,diamondReward:5},{id:"q-miras",title:"Miras Değil, Birlik",giver:"Murat Ağa'nın Gölgesi",unlockLevel:100,memoryOfMurat:"Son satır: 'Vâris, üç kabileye gerçeği göster. Miras kan değil; birliktir.'",objective:"Gölge Elçisi'ni ifşa et ve kanlı tahtı boş bırakma — paylaş.",goldReward:1e3,xpReward:500,diamondReward:10}];function Xo(i,t){return hh.filter(e=>e.unlockLevel<=i&&!t.includes(e.id))}class dh{constructor(t=[]){j(this,"completed");this.completed=[...t]}open(t){return Xo(t,this.completed)}complete(t){const e=Xo(Number.MAX_SAFE_INTEGER,[]).find(n=>n.id===t);return!e||this.completed.includes(t)?null:(this.completed.push(t),e)}}const fh={fast_production:"ca-app-pub-xxxxxxxx/fast-prod",diamond:"ca-app-pub-xxxxxxxx/diamond",caravan_speed:"ca-app-pub-xxxxxxxx/caravan"};class ph{constructor(t=!0){this.mock=t}async isAvailable(){var t,e;return this.mock?!0:!!await((e=(t=globalThis.window)==null?void 0:t.admob)==null?void 0:e.isReady())}async watch(t){var r,s;return!await this.isAvailable()||!(this.mock?!0:!!await((s=(r=globalThis.window)==null?void 0:r.admob)==null?void 0:s.showRewarded(fh[t])))?null:mh(t)}}function mh(i){switch(i){case"fast_production":return{kind:i,ticks:45,gold:0};case"diamond":return{kind:i,diamond:2};case"caravan_speed":return{kind:i,caravanMsSaved:2e4}}}const gh=28e3,_h=.42;class vh{constructor(t=null){j(this,"current");this.current=t}get busy(){return this.current!==null}depart(t,e,n=Date.now()){return this.current||e<=0?null:(this.current={destination:t,remainingMs:gh,goldStake:e,departedAt:n},this.current)}speedUp(t){this.current&&(this.current.remainingMs=Math.max(0,this.current.remainingMs-t))}tick(t,e=Math.random){if(!this.current)return null;if(this.current.remainingMs=Math.max(0,this.current.remainingMs-t),this.current.remainingMs>0)return{remainingMs:this.current.remainingMs,arrived:!1,raid:!1,goldReturn:0};const n=e()<_h,r=Math.round(n?this.current.goldStake*.35:this.current.goldStake*1.7+25),s={remainingMs:0,arrived:!0,raid:n,goldReturn:r};return this.current=null,s}}class xh{constructor(){j(this,"ctx",null);j(this,"nodes",[]);j(this,"running",!1);j(this,"theme","overture")}async ensure(){if(this.ctx)return;const t=window.AudioContext||window.webkitAudioContext;this.ctx=new t}async setTheme(t){this.theme===t&&this.running||(this.theme=t,this.running&&(this.stop(),await this.play()))}async play(){if(await this.ensure(),!this.ctx||this.running)return;this.ctx.state==="suspended"&&await this.ctx.resume(),this.running=!0;const t=this.ctx,e=t.createGain();e.gain.value=.045,e.connect(t.destination);const n=yh(this.theme);for(const r of n){const s=t.createOscillator(),a=t.createGain();s.type=r>180?"triangle":"sine",s.frequency.value=r,a.gain.value=r>180?.22:.5;const o=t.createOscillator(),l=t.createGain();o.frequency.value=.08+r/4e3,l.gain.value=4,o.connect(l),l.connect(s.frequency),s.connect(a),a.connect(e),s.start(),o.start(),this.nodes.push(s,o,a,l)}this.nodes.push(e)}stop(){for(const t of this.nodes){if("stop"in t&&typeof t.stop=="function")try{t.stop()}catch{}t.disconnect()}this.nodes=[],this.running=!1}}function yh(i){switch(i){case"overture":return[110,164.8,220];case"suspicion":return[98,146.8,196,233];case"shadow":return[73.4,110,155.6,185];case"reckoning":return[61.7,92.5,123.5,185,246.9]}}function Cc(i,t,e,n){const r=Ui.find(l=>l.id===i)??Ui[2],s=n.capFor(e),a=1+(s-1)*.12,o=Math.round(r.baseHp*a*Math.max(1,t));return{tribe:r.tribe,name:r.name,count:t,startCount:t,level:s,hp:o,maxHp:o,attack:Math.round(r.baseAttack*a),defense:Math.round(r.baseDefense*a),critChance:r.critChance,aoe:r.aoe}}function Pc(i,t,e,n){const r=Ui.find(s=>s.tribe===i)??Ui[2];return Cc(r.id,t,e,n)}function Mh(i,t,e){const n=Ru(i),r=Math.max(1,Math.round(2+i/8)),s=Pc(t,r,Math.max(1,Math.round(i*.85)),e);return s.hp=Math.round(s.hp*n),s.maxHp=s.hp,s.attack=Math.round(s.attack*n),s.defense=Math.round(s.defense*n),s.name=`${we[t].name} Akını`,s}function Sh(i,t,e,n){const r=Mh(e,i,n),s=Math.max(1,t),a=s/Math.max(1,r.count);return r.count=s,r.startCount=s,r.hp=Math.round(r.hp*a),r.maxHp=r.hp,r}function qo(i,t){return i==="sariklilar"?t==="desert"?1.22:t==="ice"?.82:1:i==="gokhanli"?t==="forest"?1.22:t==="desert"?.88:1:i==="demirhisar"?t==="ice"?1.22:t==="forest"?.88:1:1}function bh(i,t){return i==="assault"?{atk:t==="sariklilar"?1.26:1.16,def:.88,crit:0}:i==="ambush"?{atk:1.02,def:.9,crit:t==="gokhanli"?.2:.12}:{atk:.88,def:t==="demirhisar"?1.3:1.18,crit:0}}function Eh(i,t,e=Math.random,n){var m,d,b;const r=[],s=()=>i.filter(E=>E.hp>0&&E.count>0),a=(n==null?void 0:n.stance)??"assault",o=bh(a,((m=i[0])==null?void 0:m.tribe)??"player"),l=n?qo(((d=i[0])==null?void 0:d.tribe)??"player",n.biome):1,c=n?qo(t.tribe,n.biome):1,u=1+Math.min(4,(n==null?void 0:n.flanking)??0)*.06;n&&(t.defense=Math.round(t.defense*c*(n.tower?1.2:1)*(n.hall?1.08:1)),t.hp=Math.round(t.hp*(n.hall?1.12:1)),t.maxHp=Math.max(t.maxHp,t.hp),r.push(`${n.biome==="desert"?"Çöl":n.biome==="ice"?"Buz":"Orman"} savaşı · ${wh(a)} · kanat ${n.flanking}`));let h=0;for(;h<14&&s().length&&t.hp>0;){h+=1;for(const k of s()){const T=Yo(k,t,e,o.atk*l*u,o.crit);if(r.push(`${k.name} ${((b=we[t.tribe])==null?void 0:b.name)??"vahşi"} saflarına ${T} hasar indirdi.`),t.hp<=0)break}if(t.hp<=0)break;const E=s()[Math.floor(e()*s().length)];if(!E)break;const v=Yo(t,E,e,1,0);r.push(`${t.name} ${E.name} birliğini ${v} hasarla sarstı.`)}const f=s().reduce((E,v)=>E+v.hp,0),p=t.hp<=0&&f>0?"player":f<=0&&t.hp>0?"enemy":"draw",g=p==="player"?40+t.level*8:8,x=p==="player"?38+t.level*8:14;return r.push(p==="player"?"Saha senin. Ama hançerin mührü hâlâ parlıyor.":p==="enemy"?"Saflar dağıldı. Murat Ağa'nın mirası bu gece yaralı.":"Toz durdu. Kimse tahtı kazanamadı."),{winner:p,log:r,goldLoot:g,xpReward:x,playerRemaining:s().reduce((E,v)=>E+v.count,0),enemyRemaining:t.hp>0?t.count:0}}function wh(i){return i==="assault"?"hücum":i==="ambush"?"pusu":"kalkan"}function Yo(i,t,e,n=1,r=0){const s=Au(i.tribe,t.tribe),a=e()<i.critChance+r?1.6:1,o=1+i.aoe,l=i.attack*s*a*o*n*Math.max(1,i.count*.35),c=Math.max(4,l-t.defense*.55),u=Math.round(c);t.hp=Math.max(0,t.hp-u);const h=t.startCount??t.count;return t.count=t.hp<=0?0:Math.max(1,Math.round(h*(t.hp/t.maxHp))),u}const Th=["hall","resource","camp","tower","market","forge"];class Ah{constructor(t){j(this,"state",new Tu);j(this,"saveMgr",new eh);j(this,"ads",new ph);j(this,"audio",new xh);j(this,"data");j(this,"economy");j(this,"levels");j(this,"narrative");j(this,"quests");j(this,"caravan");j(this,"toast","");j(this,"openPanel",null);j(this,"lastBattle",null);j(this,"lastEnemy",null);j(this,"lastPlayerLine",[]);j(this,"wantsBattle",!1);j(this,"mapDirty",!0);j(this,"lastStoryBeat","");j(this,"stance","assault");j(this,"commit",null);j(this,"prodAcc",0);j(this,"tilesById",new Map);this.data=t??Ho(),this.bootManagers()}bootManagers(){var t;this.economy=new ju(this.data.resources.gold,this.data.diamond,this.data.resources),this.levels=new Wo(this.data.playerLevel,this.data.xp),this.narrative=new uh(this.data.collectedScrolls,this.data.shadowTempleRevealed,this.data.finaleRevealed),this.quests=new dh(this.data.completedQuests),this.caravan=new vh(this.data.caravan),this.narrative.collected.includes(1)||this.narrative.collect(1),wc(this.data),(t=this.data).diplomacy??(t.diplomacy=hs()),this.data.chosenTribe&&(this.data.roster=li(this.data.roster,this.data.army,this.data.chosenTribe),this.data.army=Ai(this.data.roster),ca(this.data.tiles)),this.tilesById.clear(),this.flush()}reindexTiles(){if(!(this.tilesById.size===this.data.tiles.length&&this.tilesById.size>0)){this.tilesById.clear();for(const t of this.data.tiles)this.tilesById.set(t.id,t)}}tileAt(t,e){return this.reindexTiles(),this.tilesById.get(dr(t,e))}get kit(){return Ec(this.data.chosenTribe??"gokhanli")}get selectedTile(){return this.reindexTiles(),this.data.selectedHex?this.tilesById.get(this.data.selectedHex):void 0}flush(){this.data.resources={...this.economy.bag},this.data.diamond=this.economy.diamond,this.data.playerLevel=this.levels.currentLevel,this.data.xp=this.levels.currentXp,this.data.collectedScrolls=[...this.narrative.collected],this.data.shadowTempleRevealed=this.narrative.shadowTempleRevealed,this.data.finaleRevealed=this.narrative.finaleRevealed,this.data.caravan=this.caravan.current,this.data.completedQuests=[...this.quests.completed],this.data.lastTickAt=Date.now()}newGame(t="Kabile Lideri"){this.data=Ho(t),this.bootManagers(),this.openPanel=null,this.mapDirty=!0,this.toast=`${t}, vârisin kalemini taşıyorsun. Bir kabilenin sancağını al.`}chooseTribe(t){this.data.chosenTribe=t,this.data.tiles=bc(t),this.data.army=8,this.data.roster=Xu(t,8),this.data.unitLevel=1,this.data.diplomacy=hs(),this.data.visitedLandmarks=[],this.data.lastDailyAt=Math.floor(Date.now()/864e5);const e=Qr(t);this.data.selectedHex=dr(e.q,e.r),this.mapDirty=!0,this.toast=`Vâris olarak ${we[t].name} sancağını aldın. Murat Ağa'nın hançerini bu toprakta ara.`,this.flush(),En.emit("save",this.data)}continueGame(){return!!this.data.chosenTribe}async persist(){this.flush(),await this.saveMgr.persist(this.data)}async bootFromDisk(){const t=await this.saveMgr.load();return t?(this.data=t,this.bootManagers(),this.mapDirty=!0,!0):!1}hydrate(){this.bootManagers();const t=this.data.chosenTribe?Qr(this.data.chosenTribe):null;t?this.ensureAround(t.q,t.r):this.ensureAround(0,0)}selectHex(t){if(this.data.selectedHex=t,t){const{q:e,r:n}=Pu(t);this.ensureAround(e,n)}En.emit("hex",t)}setStance(t){this.stance=t}setCommit(t){this.commit=t}ensureAround(t,e,n=Iu){const r=us(this.data.tiles,t,e,n);return r>0&&(this.mapDirty=!0),r>0}sentTroops(){const t=this.data.army;return this.commit==null?t:Math.max(1,Math.min(t,this.commit))}togglePanel(t){this.openPanel=this.openPanel===t?null:t}closePanel(){this.openPanel=null}mapBanner(){const t=this.levels.currentLevel;if(this.narrative.finaleRevealed||t>=100)return"GÖLGE ELÇİSİ ORTAYA ÇIKTI";if(this.narrative.shadowTempleRevealed||t>=40)return"GÖLGE TAPINAĞI SİSİN ARDINDAN GÖRÜNDÜ";if(t>1&&t%10===0){const n=Rc(t);if(n)return`${n.name.toUpperCase()} HARİTAYA DÜŞTÜ`}if(t<=6)return"KANLI TAHT — ÜÇ KABİLE BİRBİRİNİ SUÇLUYOR";if(this.data.chosenTribe)return Gu(this.data.chosenTribe,this.data.diplomacy);const e=fs(t);return e?e.title.toUpperCase():"MÜHÜRLER HENÜZ KONUŞMADI"}isMine(t){return!!(this.data.chosenTribe&&t===this.data.chosenTribe)}buildOnSelected(t){const e=this.selectedTile;if(!e||!this.data.chosenTribe||!this.isMine(e.owner))return"Kendi toprağında inşa et.";if(e.slot)return"Bu altıgende zaten yapı var.";if(t==="hall")return"Merkez zaten kuruludur.";const n=ds(this.data.chosenTribe,t);return Tr(this.economy.bag,n.cost)?(this.economy.bag=Ar(this.economy.bag,n.cost),this.economy.gold=this.economy.bag.gold,e.slot=t,e.level=1,e.label=n.name,this.mapDirty=!0,this.flush(),`${n.name} kuruldu.`):"Kaynak yetmiyor."}upgradeSelected(){const t=this.selectedTile;return!t||!this.data.chosenTribe||!this.isMine(t.owner)||!t.slot?"Yükseltilecek kendi yapın yok.":t.level>=5?"En üst seviye.":this.levels.canUpgradeTo(t.level+1)?Tr(this.economy.bag,zo)?(this.economy.bag=Ar(this.economy.bag,zo),this.economy.gold=this.economy.bag.gold,t.level+=1,this.mapDirty=!0,this.flush(),`${ds(this.data.chosenTribe,t.slot).name} seviye ${t.level}.`):"Yükseltme için kaynak yetmiyor.":"Gelişim oyuncu seviyesini aşamaz."}buildOrUpgrade(t){if(t==="shadowTemple"&&!this.narrative.shadowTempleRevealed)return"Gölge Tapınağı hâlâ sisin ardında.";if(Th.includes(t)){const r=this.selectedTile;return(r==null?void 0:r.slot)===t?this.upgradeSelected():this.buildOnSelected(t)}const e=this.data.buildingLevels[t]??0,n=this.economy.buildCost(t,e,this.levels);return n?this.economy.spend("gold",n.gold)?(this.data.buildingLevels[t]=e+1,this.mapDirty=!0,this.flush(),`${t} mühürlendi.`):"Altın yetmiyor.":"Gelişim oyuncu seviyesini aşamaz."}train(t=1){if(!this.data.chosenTribe)return"Önce kabile seç.";if(!this.data.tiles.filter(o=>this.isMine(o.owner)&&o.slot==="camp").length)return"Önce birlik kampı inşa et.";const n=typeof t=="number"?t:1,r={};if(Object.keys(Rr).forEach(o=>{r[o]=(Rr[o]??0)*n}),!Tr(this.economy.bag,r))return"Eğitim için kaynak yetmiyor.";this.economy.bag=Ar(this.economy.bag,r),this.economy.gold=this.economy.bag.gold;const s=this.data.chosenTribe,a=Fi(s);return this.data.roster=li(this.data.roster,this.data.army,s),this.data.roster[a]=(this.data.roster[a]??0)+n,this.data.army=Ai(this.data.roster),this.flush(),`${n} ${this.kit.unitName} eğitildi.`}trainUnit(t,e=1){if(!this.data.chosenTribe)return"Önce kabile seç.";const n=Ui.find(l=>l.id===t);if(!n||n.tribe!==this.data.chosenTribe)return"Bu birlik senin sancağına ait değil.";if(!this.data.tiles.filter(l=>this.isMine(l.owner)&&l.slot==="camp").length)return"Önce birlik kampı inşa et.";const a=n.id!==Fi(this.data.chosenTribe)?1.6:1,o={};return Object.keys(Rr).forEach(l=>{o[l]=Math.round((Rr[l]??0)*e*a)}),Tr(this.economy.bag,o)?(this.economy.bag=Ar(this.economy.bag,o),this.economy.gold=this.economy.bag.gold,this.data.roster=li(this.data.roster,this.data.army,this.data.chosenTribe),this.data.roster[t]=(this.data.roster[t]??0)+e,this.data.army=Ai(this.data.roster),this.flush(),`${e} ${n.name} eğitildi.`):"Eğitim için kaynak yetmiyor."}upgradeUnit(t){return this.economy.diamond<2?"Elmas yetmiyor.":(this.economy.spend("diamond",2),this.data.unitLevel+=1,this.flush(),"Birlikler güçlendi.")}adjacentToPlayer(t){this.reindexTiles();const e=this.tilesById.get(t);return!e||!this.data.chosenTribe?!1:Ms(e.q,e.r).some(n=>{const r=this.tileAt(n.q,n.r);return r?this.isMine(r.owner):!1})}claimOrAttack(t){this.reindexTiles();const e=t?this.tilesById.get(t):this.selectedTile;if(!e||!this.data.chosenTribe)return"Hedef altıgen yok.";if(this.isMine(e.owner))return"Bu toprak zaten senin.";if(!this.adjacentToPlayer(e.id))return"Sadece komşu altıgene yürüyebilirsin.";if(this.data.army<4)return"Yeterli birliğin yok.";const n=this.sentTroops(),r=Ms(e.q,e.r).filter(a=>{const o=this.tileAt(a.q,a.r);return o?this.isMine(o.owner):!1}).length;if(e.owner==="neutral"&&e.garrison<=3&&e.slot!=="tower"&&!e.landmark)return this.shrinkArmy(1),e.owner=this.data.chosenTribe,e.garrison=3,e.stars=3,this.gainProgress(14),this.mapDirty=!0,this.flush(),this.withStory(`${e.label} bağlandı. ${Vu(e.biome)} Kayıp: 1`);const s=this.fightTile(e,n,r);return this.wantsBattle=!0,this.mapDirty=!0,s.winner==="player"?(e.owner=this.data.chosenTribe,e.garrison=Math.max(2,s.playerRemaining),this.honorCapture(e,n,s.playerRemaining),this.flush(),this.withStory(`${e.label} ele geçirildi. ${s.log[0]??""}`)):(this.flush(),s.winner==="enemy"?`Pusuya düştük. ${s.log.at(-2)??""}`:"Saha berabere kaldı.")}fight(t){const e={biome:"forest",owner:t==="player"?"gokhanli":t,slot:void 0,garrison:6,hall:!1};return this.fightTile(e,this.sentTroops(),0)}fightTile(t,e,n){const r=this.data.chosenTribe??"gokhanli",s=t.owner==="neutral"?t.biome==="desert"?"sariklilar":t.biome==="ice"?"demirhisar":"gokhanli":t.owner;this.data.roster=li(this.data.roster,this.data.army,r);const a=qu(this.data.roster,Math.max(1,e),r),o=Object.entries(a).filter(([,u])=>u>0).map(([u,h])=>Cc(u,h,this.data.unitLevel,this.levels));o.length||o.push(Pc(r,Math.max(1,e),this.data.unitLevel,this.levels));const l=Sh(s,Math.max(1,t.garrison),this.levels.currentLevel,this.levels);t.owner==="neutral"&&(l.name=t.landmark?"Hikâye nöbeti":"Vahşi sürü"),this.lastEnemy=l,this.lastPlayerLine=o;const c=Eh(o,l,Math.random,{biome:t.biome,tower:t.slot==="tower",hall:t.slot==="hall",flanking:n,stance:this.stance,garrison:t.garrison});return this.lastBattle=c,Yu(this.data.roster,a,c.playerRemaining),this.data.army=Ai(this.data.roster),t.owner!=="neutral"&&t.owner!==r&&(this.data.diplomacy[t.owner]="war"),c.winner==="player"?(this.economy.grant("gold",c.goldLoot),this.gainProgress(c.xpReward)):this.gainProgress(12),this.flush(),c}gainProgress(t){const e=this.levels.addXp(t);for(const n of e)this.narrative.collect(n.newLevel),n.unlockedSideTribe&&!this.data.discoveredSideTribes.includes(n.unlockedSideTribe.id)&&this.data.discoveredSideTribes.push(n.unlockedSideTribe.id),n.shadowTempleUnlocked&&(this.narrative.shadowTempleRevealed=!0),n.finaleUnlocked&&(this.narrative.finaleRevealed=!0);if(e.length){const n=e[e.length-1];n.finaleUnlocked?this.lastStoryBeat="Gölge Elçisi ortaya çıktı.":n.shadowTempleUnlocked?this.lastStoryBeat="Gölge Tapınağı sisin ardından göründü.":n.unlockedSideTribe?this.lastStoryBeat=`${n.unlockedSideTribe.name} haritaya düştü.`:n.scroll&&(this.lastStoryBeat=`Parşömen ${n.newLevel}: ${n.scroll.title}`),En.emit("levelup",this.levels.currentLevel)}}withStory(t){if(!this.lastStoryBeat)return t;const e=this.lastStoryBeat;return this.lastStoryBeat="",`${t} ${e}`}honorCapture(t,e,n){const r=n/Math.max(1,e);if(t.stars=r>=.8?3:r>=.5?2:1,!t.landmark)return;this.data.visitedLandmarks.includes(t.id)||this.data.visitedLandmarks.push(t.id);const s=ro(t.q,t.r);if(!s)return;s.sideId&&!this.data.discoveredSideTribes.includes(s.sideId)&&this.data.discoveredSideTribes.push(s.sideId);const a=this.narrative.collect(s.unlockLevel);if(a&&(this.lastStoryBeat=`Parşömen ${s.unlockLevel}: ${a.title}`),s.kind==="temple"&&(this.narrative.shadowTempleRevealed=!0,this.lastStoryBeat="Gölge Tapınağı sisin ardından göründü."),s.kind==="finale"&&(this.narrative.finaleRevealed=!0,this.lastStoryBeat="Gölge Elçisi ortaya çıktı."),s.questId){const l=this.quests.complete(s.questId);l&&(this.economy.grant("gold",l.goldReward),this.economy.grant("diamond",l.diamondReward),this.lastStoryBeat=`${this.lastStoryBeat} ${l.title} tamamlandı.`.trim())}const o=fr.find(l=>l.id===s.sideId);o&&(this.lastStoryBeat=`${this.lastStoryBeat} ${o.clue}`.trim())}shrinkArmy(t){if(!this.data.chosenTribe){this.data.army=Math.max(0,this.data.army-t);return}this.data.roster=li(this.data.roster,this.data.army,this.data.chosenTribe),this.data.roster=li(this.data.roster,Math.max(0,this.data.army-t),this.data.chosenTribe),this.data.army=Ai(this.data.roster)}tickProduction(){this.data.chosenTribe&&(this.economy.produceTiles(this.data.tiles,this.data.chosenTribe,1),this.flush())}sendCaravan(){if(this.caravan.busy)return"Kervan yolda.";if(!this.data.tiles.some(e=>this.isMine(e.owner)&&e.slot==="market"))return"Ticaret pazarı kur.";const t=Math.min(50,this.economy.gold);return t<10?"Kervan için altın yetmiyor.":(this.economy.spend("gold",t),this.caravan.depart("Tuz Yolu",t),this.flush(),"Kervan yola çıktı.")}completeQuest(t){const e=this.quests.complete(t);return e?(this.economy.grant("gold",e.goldReward),this.economy.grant("diamond",e.diamondReward),this.gainProgress(e.xpReward),this.flush(),`${e.title} tamamlandı.`):"Görev yok."}async watchAd(t="fast_production"){const e=await this.ads.watch(t);return e?(e.diamond&&this.economy.grant("diamond",e.diamond),e.ticks&&this.economy.produceTiles(this.data.tiles,this.data.chosenTribe,2),e.caravanMsSaved&&this.caravan.speedUp(e.caravanMsSaved),this.flush(),"İzlenen ödül kasaya işlendi."):"Reklam hazır değil."}talk(t){return t==="player"?[]:oh[t]??[]}unlockedTribes(){return fr.filter(t=>t.unlockLevel<=this.levels.currentLevel)}tick(t){this.prodAcc+=t,this.prodAcc>=8e3&&(this.prodAcc=0,this.tickProduction(),this.tickAi()),this.grantDaily();const e=this.caravan.tick(t);e!=null&&e.arrived&&(this.economy.grant("gold",e.goldReturn),this.toast=e.raid?"Kervan baskına uğradı.":"Kervan döndü.",this.flush())}grantDaily(){if(!this.data.chosenTribe)return;const t=Math.floor(Date.now()/864e5);this.data.lastDailyAt!==t&&(this.data.lastDailyAt=t,this.economy.grant("gold",18),this.toast||(this.toast="Günlük kervan payı kasaya düştü."),this.flush())}otherTribes(){return["sariklilar","gokhanli","demirhisar"].filter(t=>t!==this.data.chosenTribe)}tickAi(t=Math.random){if(this.data.chosenTribe){for(const e of this.otherTribes())this.stepTribeAi(e,t);this.flush()}}raidPlayer(t,e=Math.random){const n=this.data.tiles.filter(l=>l.owner===t);if(!n.length||!this.data.chosenTribe)return!1;const r=this.data.diplomacy[t]??"talks",a=this.borderOf(n).filter(l=>this.isMine(l.owner)&&!this.isPlayerCapital(l));let o=a.length?a[Math.floor(e()*a.length)]:void 0;if(!o){const l=r==="war"?.22:r==="trade"?.08:.14;if(e()>=l)return!1;const c=this.data.tiles.filter(u=>this.isMine(u.owner)&&!this.isPlayerCapital(u)&&u.slot!=="hall"&&!u.landmark);if(!c.length)return!1;o=c[Math.floor(e()*c.length)]}return this.data.diplomacy[t]="war",o.garrison<=3||e()<.4?(o.owner=t,o.garrison=3,o.label=`${we[t].name} ${o.biome==="desert"?"çölü":o.biome==="ice"?"buzı":"ormanı"}`,this.shrinkArmy(1)):o.garrison=Math.max(1,o.garrison-2),this.toast=`${we[t].name} karakolundan akın geldi.`,this.mapDirty=!0,!0}isPlayerCapital(t){if(!this.data.chosenTribe)return!1;const e=Qr(this.data.chosenTribe);return t.q===e.q&&t.r===e.r}stepTribeAi(t,e){const n=this.data.tiles.filter(c=>c.owner===t);if(!n.length)return;const r=this.data.diplomacy[t]??"talks",s=this.borderOf(n),a=s.filter(c=>c.owner==="neutral"&&!c.landmark),o=s.filter(c=>c.owner!=="neutral"&&!this.isMine(c.owner)&&c.owner!==t&&!c.landmark&&c.slot!=="hall");if(a.length&&e()<.55){const c=a[Math.floor(e()*a.length)];c.owner=t,c.garrison=3,c.label=`${we[t].name} ${c.biome==="desert"?"çölü":c.biome==="ice"?"buzı":"ormanı"}`,this.mapDirty=!0,this.softenMood(t);return}const l=r==="war"?.45:r==="trade"?.1:.2;if(!(e()<l&&this.raidPlayer(t,e))){if(o.length&&e()<.18){const c=o[Math.floor(e()*o.length)],u=c.owner;c.owner=t,c.garrison=3,this.data.diplomacy[t]=this.data.diplomacy[t]==="talks"?"trade":this.data.diplomacy[t],this.data.diplomacy[u]="war",this.mapDirty=!0,this.toast.includes("akın")||(this.toast=`${we[t].name} ile ${we[u].name} sınırda çarpıştı.`);return}this.softenMood(t)}}borderOf(t){const e=new Set,n=[];for(const r of t)for(const s of Ms(r.q,r.r)){const a=this.tileAt(s.q,s.r);!a||e.has(a.id)||a.owner===r.owner||(e.add(a.id),n.push(a))}return n}softenMood(t){const e=this.data.diplomacy[t];e==="war"?this.data.diplomacy[t]="talks":e==="talks"&&Math.random()<.35&&(this.data.diplomacy[t]="trade")}debugSetLevel(t){this.levels=new Wo(t,0),this.data.playerLevel=t;for(let e=1;e<=t;e+=1)this.narrative.collect(e);this.data.collectedScrolls=[...this.narrative.collected],this.data.shadowTempleRevealed=this.narrative.shadowTempleRevealed,this.data.finaleRevealed=this.narrative.finaleRevealed,this.data.chosenTribe&&ca(this.data.tiles)}unitsOfTribe(){return this.data.chosenTribe?ms(this.data.chosenTribe):[]}clearBattleFlag(){this.wantsBattle=!1}}const Rh=[{id:"yonetim",label:"Yönetim",icon:"🤝"},{id:"ticaret",label:"Ticaret",icon:"🐪"},{id:"insa",label:"İnşa",icon:"🔨"},{id:"birlikler",label:"Birlikler",icon:"🛡️"},{id:"arastirma",label:"Araştırma",icon:"📜"}],Ch=["resource","camp","tower","market","forge"];class Ph{constructor(t){j(this,"layer");j(this,"onAction",null);j(this,"heldToast","");j(this,"heldUntil",0);this.layer=document.createElement("div"),this.layer.id="ui-root",t.appendChild(this.layer),this.layer.addEventListener("click",e=>{var r;const n=e.target.closest("[data-act]");n&&(n.classList.add("pop"),window.setTimeout(()=>n.classList.remove("pop"),180),(r=this.onAction)==null||r.call(this,n.dataset.act??"",n.dataset.arg))})}bind(t){this.onAction=t}render(t,e,n="",r=!1){t.toast&&(this.heldToast=t.toast,this.heldUntil=Date.now()+4500,t.toast="");const s=n||(Date.now()<this.heldUntil?this.heldToast:"");if(e==="intro"||e==="boot"){this.layer.innerHTML=this.intro();return}if(e==="menu"){this.layer.innerHTML=this.menu();return}if(e==="pick"){this.layer.innerHTML=this.pick();return}this.layer.innerHTML=this.hud(t,s,e==="battle",r)}intro(){return`
      <section class="cinematic">
        <div class="vignette"></div>
        <div class="crawl neu-card">
          <p class="eyebrow">Hüzünlü ama kararlı</p>
          <h1>${Vo}</h1>
          ${ah.map(t=>`<p>${t.text}</p>`).join("")}
          <p>Bir kabilenin sancağını al. Asker ve bina o toprağa göre değişir. Ama kalem aynı kalır: cinayeti çöz, mirası kurtar.</p>
          <button class="neu-btn gold" data-act="finish-intro">Tahta Yaklaş</button>
        </div>
      </section>`}menu(){return`
      <section class="cinematic menu">
        <div class="vignette"></div>
        <div class="crawl neu-card">
          <p class="eyebrow">Kanlı Taht</p>
          <h1>${Vo}</h1>
          <div class="row">
            <button class="neu-btn gold" data-act="new-game">Yeni Yemin</button>
            <button class="neu-btn" data-act="continue">Kayıttan Devam</button>
          </div>
          <div class="row">
            <a class="neu-btn slim ghost" href="./kabile-savaslari-unreal-engine-5.zip" download="kabile-savaslari-unreal-engine-5.zip">Unreal oyununu indir</a>
          </div>
          <p class="fine">Sarıklılar • Gök-Hanlı • Demir-Hisar — ve sisin ardındaki dördüncü gölge.</p>
        </div>
      </section>`}pick(){return`
      <section class="pick-screen">
        <div class="vignette"></div>
        <div class="pick-copy">
          <p class="eyebrow">Vârisin seçimi</p>
          <h1>Hangi sancağı alacaksın?</h1>
          <p>Murat Ağa'nın tahtı boş. Bir kabilenin toprağını tut, birbirini suçlayan üç sesten gerçeği ayır.</p>
        </div>
        <div class="tribe-grid">${["sariklilar","gokhanli","demirhisar"].map(e=>{const n=we[e],r=Ec(e);return`
          <button class="tribe-card ${e}" data-act="choose-tribe" data-arg="${e}">
            <span class="eyebrow">${r.biomeLabel}</span>
            <strong>${n.name}</strong>
            <span>${n.epithet}</span>
            <em>${n.accusation}</em>
          </button>`}).join("")}</div>
      </section>`}hud(t,e,n,r=!1){const s=t.economy.bag,a=t.selectedTile,o=t.data.playerName;if(n&&t.lastBattle){if(r)return`
          <header class="res-bar slim">
            <div class="res-chips">${this.res("🪙",t.economy.gold)}${this.res("🛡️",t.data.army)}</div>
            <div class="leader"><strong>${o}</strong></div>
          </header>
          <div class="banner live">SAVAŞ SÜRÜYOR — SAFLAR ÇARPIŞIYOR</div>`;const l=t.lastBattle.winner==="player"?"Zafer":t.lastBattle.winner==="enemy"?"Yenilgi":"Berabere",c=t.lastBattle.log.slice(-6).map(u=>`<li>${u}</li>`).join("");return`
        <header class="res-bar slim">
          <div class="res-chips">${this.res("🪙",t.economy.gold)}${this.res("🛡️",t.data.army)}</div>
          <div class="leader"><strong>${o}</strong></div>
        </header>
        <aside class="battle-sheet neu-card">
          <p class="eyebrow">Saha</p>
          <h2>${l}</h2>
          <ul>${c}</ul>
          <button class="neu-btn gold" data-act="continue-battle">Devam</button>
        </aside>`}return`
      <header class="res-bar">
        <div class="res-chips">
          ${this.res("🪙",t.economy.gold)}
          ${this.res("🪵",s.wood)}
          ${this.res("🪨",s.stone)}
          ${this.res("🦬",s.leather)}
          ${this.res("💎",s.crystal)}
          ${this.res("🍖",s.food)}
          ${this.res("🛡️",t.data.army)}
        </div>
        <div class="leader">
          <span class="portrait"></span>
          <div>
            <small>Vâris · Sv ${t.levels.currentLevel}</small>
            <strong>${o}</strong>
          </div>
        </div>
      </header>
      <div class="banner">${t.mapBanner()}</div>
      ${t.openPanel?"":`<div class="hex-inspect ${a?"on":""}">
        ${a?this.inspect(t,a.id):"<span>Haritadan bir altıgen seç</span>"}
      </div>`}
      ${t.openPanel?`<section class="sheet">${this.sheet(t,t.openPanel)}</section>`:""}
      ${e?`<aside class="toast neu-card">${e}</aside>`:""}
      <nav class="circle-dock">
        ${Rh.map(l=>`
          <button class="circle ${t.openPanel===l.id?"on":""}" data-act="dock" data-arg="${l.id}">
            <span>${l.icon}</span>
            <small>${l.label}</small>
          </button>`).join("")}
      </nav>
    `}res(t,e){return`<span class="res"><i>${t}</i>${Lh(e)}</span>`}inspect(t,e){const n=Bu(t.data.tiles,e);if(!n)return"";const r=t.isMine(n.owner),s=n.owner!=="neutral"&&!r,a=n.stars?"★".repeat(n.stars):"",o=n.sideId?fr.find(l=>l.id===n.sideId):void 0;return`
      <div>
        <strong>${n.label} ${a}</strong>
        <span>${Wu(n.biome)} · Garnizon ${n.garrison}${n.landmark?" · hikâye":""}</span>
        ${o&&r?`<span class="fine">${o.clue}</span>`:""}
      </div>
      <div class="row">
        ${r&&n.slot?'<button class="neu-btn slim gold" data-act="upgrade">Yükselt</button>':""}
        ${r?"":`<button class="neu-btn slim gold" data-act="attack" data-arg="${n.id}">${s?"Yüzleş":"Bağla"} · ${t.sentTroops()}</button>`}
        <button class="neu-btn slim ghost" data-act="deselect">Seçimi bırak</button>
      </div>`}sheet(t,e){return e==="yonetim"?this.manage(t):e==="ticaret"?this.trade(t):e==="insa"?this.build(t):e==="birlikler"?this.army(t):this.research(t)}manage(t){const e=t.narrative.knownScrolls().at(-1),n=t.unlockedTribes().at(-1),s=["sariklilar","gokhanli","demirhisar"].filter(a=>a!==t.data.chosenTribe).map(a=>{const o=t.talk(a)[0],l=$u(t.data.diplomacy[a]);return`<article class="neu-card talk"><h3>${we[a].name}</h3><p class="eyebrow">${l} · ${we[a].voice}</p><p>“${(o==null?void 0:o.text)??we[a].accusation}”</p></article>`}).join("");return`
      <div class="sheet-head"><h2>Vârisin Divanı</h2><button class="neu-btn slim ghost" data-act="close-sheet">Paneli kapat</button></div>
      <p>Seviye ${t.levels.currentLevel} · XP ${t.levels.currentXp} (${Math.round(t.levels.progress*100)}%). ${t.kit.biomeLabel}. Üç kabile birbirini suçluyor; sen mühürleri okuyorsun.</p>
      ${e?`<article class="neu-card"><div class="eyebrow">Parşömen ${e.level}</div><h3>${e.title}</h3><p>${e.body}</p></article>`:""}
      ${s}
      ${n?`<article class="neu-card"><h3>${n.name}</h3><p class="memory">${n.memory}</p><p>${n.clue}</p></article>`:"<p>Her 10 seviyede bir yan kabile Murat Ağa'nın eski bir anısını bırakır.</p>"}
      <div class="row">
        <button class="neu-btn slim" data-act="save">Mühürle</button>
        <button class="neu-btn slim ghost" data-act="menu">Menü</button>
        <a class="neu-btn slim ghost" href="./kabile-savaslari-unreal-engine-5.zip" download="kabile-savaslari-unreal-engine-5.zip">Unreal oyunu</a>
      </div>`}trade(t){var e;return`
      <div class="sheet-head"><h2>Ticaret</h2><button class="neu-btn slim ghost" data-act="close-sheet">Paneli kapat</button></div>
      <p>Pazar kur, kervanı yola çıkar. Dönüşte altın ve deri gelir — bazen baskın.</p>
      <p class="fine">${t.caravan.busy?`Yolda ${Math.ceil((((e=t.caravan.current)==null?void 0:e.remainingMs)??0)/1e3)}s`:"Kervan bekliyor"}</p>
      <div class="row">
        <button class="neu-btn gold" data-act="caravan">Kervan Gönder</button>
        <button class="neu-btn slim" data-act="ad" data-arg="caravan_speed">Reklam: Hızlandır</button>
      </div>`}build(t){if(!t.data.chosenTribe)return"<p>Önce kabile seç.</p>";const e=Ch.map(n=>{const r=ds(t.data.chosenTribe,n),s=Object.entries(r.cost).map(([a,o])=>`${a} ${o}`).join(" · ");return`
        <button class="neu-btn chip-btn" data-act="build" data-arg="${n}">
          <strong>${r.name}</strong>
          <span>${r.lore}</span>
          <span>${s}</span>
        </button>`}).join("");return`
      <div class="sheet-head"><h2>İnşa · ${t.kit.hallTitle}</h2><button class="neu-btn slim ghost" data-act="close-sheet">Paneli kapat</button></div>
      <p>Kendi altıgenini seç, sonra yapıyı kur. Türler kabilene özeldir.</p>
      <div class="chips">${e}</div>`}army(t){const e=t.data.chosenTribe?Fi(t.data.chosenTribe):"",n=t.unitsOfTribe().map(r=>{const s=t.data.roster[r.id]??0,a=r.id!==e;return`<article class="neu-card talk">
          <h3>${r.name} · ${s}</h3>
          <p class="fine">${r.lore}</p>
          <button class="neu-btn slim gold" data-act="train-unit" data-arg="${r.id}">${a?"Elit eğit":"Eğit"}</button>
        </article>`}).join("");return`
      <div class="sheet-head"><h2>Birlikler</h2><button class="neu-btn slim ghost" data-act="close-sheet">Paneli kapat</button></div>
      <p>Toplam <strong>${t.data.army}</strong> · Sv ${t.data.unitLevel} · sefere ${t.sentTroops()}</p>
      <p class="fine">${t.kit.unitTitle}. Duruş burada seçilir; harita kartı kısa kalır.</p>
      <div class="row">
        <button class="neu-btn slim ${t.stance==="assault"?"gold":""}" data-act="stance" data-arg="assault">Hücum</button>
        <button class="neu-btn slim ${t.stance==="ambush"?"gold":""}" data-act="stance" data-arg="ambush">Pusu</button>
        <button class="neu-btn slim ${t.stance==="hold"?"gold":""}" data-act="stance" data-arg="hold">Kalkan</button>
      </div>
      <div class="row">
        <button class="neu-btn slim" data-act="commit" data-arg="4">4 gönder</button>
        <button class="neu-btn slim" data-act="commit" data-arg="half">Yarısı</button>
        <button class="neu-btn slim" data-act="commit" data-arg="all">Hepsi</button>
      </div>
      ${n}
      <div class="row">
        <button class="neu-btn gold" data-act="train">1 Birlik Eğit</button>
        <button class="neu-btn" data-act="train-five">5 Birlik</button>
        <button class="neu-btn slim" data-act="upgrade-unit">Güçlendir</button>
      </div>`}research(t){const e=t.narrative.lockedCount(),n=t.narrative.knownScrolls().slice(-5).reverse().map(r=>`<article class="neu-card scroll"><div class="eyebrow">Parşömen ${r.level} · ${r.tone}</div><h3>${r.title}</h3><p>${r.body}</p></article>`).join("");return`
      <div class="sheet-head"><h2>Gizli Günlük</h2><button class="neu-btn slim ghost" data-act="close-sheet">Paneli kapat</button></div>
      <p>1–39 yanlış iz, 40. kırılma, 100. gerçek. Kalan mühür: ${e}.</p>
      ${n}
      <p class="fine">${t.narrative.shadowTempleRevealed?"Gölge Tapınağı açıldı.":"Gölge Tapınağı 40. mühürde."} ${t.narrative.finaleRevealed?"Gölge Elçisi ortaya çıktı.":"Elçi 100. mühürde bekliyor."}</p>
      <div class="row">
        <button class="neu-btn slim" data-act="ad" data-arg="fast_production">Reklam: Üretim</button>
        <button class="neu-btn slim" data-act="ad" data-arg="diamond">Reklam: Elmas</button>
      </div>`}}function Lh(i){return i>=1e4?`${(i/1e3).toFixed(1)}K`:i>=1e3?`${(i/1e3).toFixed(1)}K`:String(Math.floor(i))}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const oo="170",kh=0,$o=1,Dh=2,Lc=1,Ih=2,yn=3,Bn=0,Ie=1,Mn=2,On=0,Li=1,Ko=2,Zo=3,Jo=4,Uh=5,Jn=100,Nh=101,Fh=102,Oh=103,zh=104,Bh=200,Hh=201,Gh=202,Vh=203,ma=204,ga=205,Wh=206,Xh=207,qh=208,Yh=209,$h=210,Kh=211,Zh=212,Jh=213,jh=214,_a=0,va=1,xa=2,Oi=3,ya=4,Ma=5,Sa=6,ba=7,lo=0,Qh=1,td=2,zn=0,ed=1,nd=2,id=3,kc=4,rd=5,sd=6,ad=7,Dc=300,zi=301,Bi=302,Ea=303,wa=304,gs=306,pr=1e3,ti=1001,Ta=1002,Ve=1003,od=1004,Cr=1005,ln=1006,ws=1007,ei=1008,Tn=1009,Ic=1010,Uc=1011,mr=1012,co=1013,ii=1014,cn=1015,xr=1016,uo=1017,ho=1018,Hi=1020,Nc=35902,Fc=1021,Oc=1022,en=1023,zc=1024,Bc=1025,ki=1026,Gi=1027,fo=1028,po=1029,Hc=1030,mo=1031,go=1033,ns=33776,is=33777,rs=33778,ss=33779,Aa=35840,Ra=35841,Ca=35842,Pa=35843,La=36196,ka=37492,Da=37496,Ia=37808,Ua=37809,Na=37810,Fa=37811,Oa=37812,za=37813,Ba=37814,Ha=37815,Ga=37816,Va=37817,Wa=37818,Xa=37819,qa=37820,Ya=37821,as=36492,$a=36494,Ka=36495,Gc=36283,Za=36284,Ja=36285,ja=36286,ld=3200,cd=3201,Vc=0,ud=1,Sn="",Be="srgb",Wi="srgb-linear",_s="linear",te="srgb",ci=7680,jo=519,hd=512,dd=513,fd=514,Wc=515,pd=516,md=517,gd=518,_d=519,Qo=35044,vd=35048,tl="300 es",bn=2e3,ps=2001;class Xi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}}const Ae=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let el=1234567;const lr=Math.PI/180,gr=180/Math.PI;function qi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ae[i&255]+Ae[i>>8&255]+Ae[i>>16&255]+Ae[i>>24&255]+"-"+Ae[t&255]+Ae[t>>8&255]+"-"+Ae[t>>16&15|64]+Ae[t>>24&255]+"-"+Ae[e&63|128]+Ae[e>>8&255]+"-"+Ae[e>>16&255]+Ae[e>>24&255]+Ae[n&255]+Ae[n>>8&255]+Ae[n>>16&255]+Ae[n>>24&255]).toLowerCase()}function Se(i,t,e){return Math.max(t,Math.min(e,i))}function _o(i,t){return(i%t+t)%t}function xd(i,t,e,n,r){return n+(i-t)*(r-n)/(e-t)}function yd(i,t,e){return i!==t?(e-i)/(t-i):0}function cr(i,t,e){return(1-e)*i+e*t}function Md(i,t,e,n){return cr(i,t,1-Math.exp(-e*n))}function Sd(i,t=1){return t-Math.abs(_o(i,t*2)-t)}function bd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Ed(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function wd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Td(i,t){return i+Math.random()*(t-i)}function Ad(i){return i*(.5-Math.random())}function Rd(i){i!==void 0&&(el=i);let t=el+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Cd(i){return i*lr}function Pd(i){return i*gr}function Ld(i){return(i&i-1)===0&&i!==0}function kd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Dd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Id(i,t,e,n,r){const s=Math.cos,a=Math.sin,o=s(e/2),l=a(e/2),c=s((t+n)/2),u=a((t+n)/2),h=s((t-n)/2),f=a((t-n)/2),p=s((n-t)/2),g=a((n-t)/2);switch(r){case"XYX":i.set(o*u,l*h,l*f,o*c);break;case"YZY":i.set(l*f,o*u,l*h,o*c);break;case"ZXZ":i.set(l*h,l*f,o*u,o*c);break;case"XZX":i.set(o*u,l*g,l*p,o*c);break;case"YXY":i.set(l*p,o*u,l*g,o*c);break;case"ZYZ":i.set(l*g,l*p,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ri(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Pe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const nl={DEG2RAD:lr,RAD2DEG:gr,generateUUID:qi,clamp:Se,euclideanModulo:_o,mapLinear:xd,inverseLerp:yd,lerp:cr,damp:Md,pingpong:Sd,smoothstep:bd,smootherstep:Ed,randInt:wd,randFloat:Td,randFloatSpread:Ad,seededRandom:Rd,degToRad:Cd,radToDeg:Pd,isPowerOfTwo:Ld,ceilPowerOfTwo:kd,floorPowerOfTwo:Dd,setQuaternionFromProperEuler:Id,normalize:Pe,denormalize:Ri};class ft{constructor(t=0,e=0){ft.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*r+t.x,this.y=s*r+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ft{constructor(t,e,n,r,s,a,o,l,c){Ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,l,c)}set(t,e,n,r,s,a,o,l,c){const u=this.elements;return u[0]=t,u[1]=r,u[2]=o,u[3]=e,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],p=n[5],g=n[8],x=r[0],m=r[3],d=r[6],b=r[1],E=r[4],v=r[7],k=r[2],T=r[5],A=r[8];return s[0]=a*x+o*b+l*k,s[3]=a*m+o*E+l*T,s[6]=a*d+o*v+l*A,s[1]=c*x+u*b+h*k,s[4]=c*m+u*E+h*T,s[7]=c*d+u*v+h*A,s[2]=f*x+p*b+g*k,s[5]=f*m+p*E+g*T,s[8]=f*d+p*v+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],h=u*a-o*c,f=o*l-u*s,p=c*s-a*l,g=e*h+n*f+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=h*x,t[1]=(r*c-u*n)*x,t[2]=(o*n-r*a)*x,t[3]=f*x,t[4]=(u*e-r*l)*x,t[5]=(r*s-o*e)*x,t[6]=p*x,t[7]=(n*l-c*e)*x,t[8]=(a*e-n*s)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-r*c,r*l,-r*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Ts.makeScale(t,e)),this}rotate(t){return this.premultiply(Ts.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ts.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ts=new Ft;function Xc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function _r(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ud(){const i=_r("canvas");return i.style.display="block",i}const il={};function sr(i){i in il||(il[i]=!0,console.warn(i))}function Nd(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function Fd(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Od(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Kt={enabled:!0,workingColorSpace:Wi,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===te&&(i.r=wn(i.r),i.g=wn(i.g),i.b=wn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===te&&(i.r=Di(i.r),i.g=Di(i.g),i.b=Di(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Sn?_s:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function wn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Di(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const rl=[.64,.33,.3,.6,.15,.06],sl=[.2126,.7152,.0722],al=[.3127,.329],ol=new Ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ll=new Ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Kt.define({[Wi]:{primaries:rl,whitePoint:al,transfer:_s,toXYZ:ol,fromXYZ:ll,luminanceCoefficients:sl,workingColorSpaceConfig:{unpackColorSpace:Be},outputColorSpaceConfig:{drawingBufferColorSpace:Be}},[Be]:{primaries:rl,whitePoint:al,transfer:te,toXYZ:ol,fromXYZ:ll,luminanceCoefficients:sl,outputColorSpaceConfig:{drawingBufferColorSpace:Be}}});let ui;class zd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ui===void 0&&(ui=_r("canvas")),ui.width=t.width,ui.height=t.height;const n=ui.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ui}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=_r("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=wn(s[a]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(wn(e[n]/255)*255):e[n]=wn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Bd=0;class qc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Bd++}),this.uuid=qi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(As(r[a].image)):s.push(As(r[a]))}else s=As(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function As(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?zd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Hd=0;class Ce extends Xi{constructor(t=Ce.DEFAULT_IMAGE,e=Ce.DEFAULT_MAPPING,n=ti,r=ti,s=ln,a=ei,o=en,l=Tn,c=Ce.DEFAULT_ANISOTROPY,u=Sn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hd++}),this.uuid=qi(),this.name="",this.source=new qc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ft(0,0),this.repeat=new ft(1,1),this.center=new ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Dc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case pr:t.x=t.x-Math.floor(t.x);break;case ti:t.x=t.x<0?0:1;break;case Ta:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case pr:t.y=t.y-Math.floor(t.y);break;case ti:t.y=t.y<0?0:1;break;case Ta:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ce.DEFAULT_IMAGE=null;Ce.DEFAULT_MAPPING=Dc;Ce.DEFAULT_ANISOTROPY=1;class ee{constructor(t=0,e=0,n=0,r=1){ee.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*r+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],g=l[9],x=l[2],m=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(c+1)/2,v=(p+1)/2,k=(d+1)/2,T=(u+f)/4,A=(h+x)/4,P=(g+m)/4;return E>v&&E>k?E<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(E),r=T/n,s=A/n):v>k?v<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),n=T/r,s=P/r):k<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(k),n=A/s,r=P/s),this.set(n,r,s,e),this}let b=Math.sqrt((m-g)*(m-g)+(h-x)*(h-x)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(h-x)/b,this.z=(f-u)/b,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Gd extends Xi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ee(0,0,t,e),this.scissorTest=!1,this.viewport=new ee(0,0,t,e);const r={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Ce(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,r=t.textures.length;n<r;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new qc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ri extends Gd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Yc extends Ce{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Vd extends Ce{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yr{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],h=n[r+3];const f=s[a+0],p=s[a+1],g=s[a+2],x=s[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(o===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=x;return}if(h!==x||l!==f||c!==p||u!==g){let m=1-o;const d=l*f+c*p+u*g+h*x,b=d>=0?1:-1,E=1-d*d;if(E>Number.EPSILON){const k=Math.sqrt(E),T=Math.atan2(k,d*b);m=Math.sin(m*T)/k,o=Math.sin(o*T)/k}const v=o*b;if(l=l*m+f*v,c=c*m+p*v,u=u*m+g*v,h=h*m+x*v,m===1-o){const k=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=k,c*=k,u*=k,h*=k}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],h=s[a],f=s[a+1],p=s[a+2],g=s[a+3];return t[e]=o*g+u*h+l*p-c*f,t[e+1]=l*g+u*f+c*h-o*p,t[e+2]=c*g+u*p+o*f-l*h,t[e+3]=u*g-o*h-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),h=o(s/2),f=l(n/2),p=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"YXZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"ZXY":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"ZYX":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"YZX":this._x=f*u*h+c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h-f*p*g;break;case"XZY":this._x=f*u*h-c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=n+o+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(n>o&&n>h){const p=2*Math.sqrt(1+n-o-h);this._w=(u-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-n-h);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-n-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Se(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*t._w+n*t._x+r*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*r+e*this._y,this._z=p*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=a*h+this._w*f,this._x=n*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(t=0,e=0,n=0){C.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(cl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(cl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*r-o*n),u=2*(o*e-s*r),h=2*(s*n-a*e);return this.x=e+l*c+a*h-o*u,this.y=n+l*u+o*c-s*h,this.z=r+l*h+s*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Rs.copy(this).projectOnVector(t),this.sub(Rs)}reflect(t){return this.sub(Rs.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Rs=new C,cl=new yr;class si{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Je.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Je.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Je.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Je):Je.fromBufferAttribute(s,a),Je.applyMatrix4(t.matrixWorld),this.expandByPoint(Je);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Pr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Pr.copy(n.boundingBox)),Pr.applyMatrix4(t.matrixWorld),this.union(Pr)}const r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Je),Je.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ji),Lr.subVectors(this.max,ji),hi.subVectors(t.a,ji),di.subVectors(t.b,ji),fi.subVectors(t.c,ji),Pn.subVectors(di,hi),Ln.subVectors(fi,di),Vn.subVectors(hi,fi);let e=[0,-Pn.z,Pn.y,0,-Ln.z,Ln.y,0,-Vn.z,Vn.y,Pn.z,0,-Pn.x,Ln.z,0,-Ln.x,Vn.z,0,-Vn.x,-Pn.y,Pn.x,0,-Ln.y,Ln.x,0,-Vn.y,Vn.x,0];return!Cs(e,hi,di,fi,Lr)||(e=[1,0,0,0,1,0,0,0,1],!Cs(e,hi,di,fi,Lr))?!1:(kr.crossVectors(Pn,Ln),e=[kr.x,kr.y,kr.z],Cs(e,hi,di,fi,Lr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Je).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Je).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(mn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const mn=[new C,new C,new C,new C,new C,new C,new C,new C],Je=new C,Pr=new si,hi=new C,di=new C,fi=new C,Pn=new C,Ln=new C,Vn=new C,ji=new C,Lr=new C,kr=new C,Wn=new C;function Cs(i,t,e,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Wn.fromArray(i,s);const o=r.x*Math.abs(Wn.x)+r.y*Math.abs(Wn.y)+r.z*Math.abs(Wn.z),l=t.dot(Wn),c=e.dot(Wn),u=n.dot(Wn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Wd=new si,Qi=new C,Ps=new C;class Mr{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Wd.setFromPoints(t).getCenter(n);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Qi.subVectors(t,this.center);const e=Qi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(Qi,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ps.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Qi.copy(t.center).add(Ps)),this.expandByPoint(Qi.copy(t.center).sub(Ps))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const gn=new C,Ls=new C,Dr=new C,kn=new C,ks=new C,Ir=new C,Ds=new C;class $c{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,gn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=gn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(gn.copy(this.origin).addScaledVector(this.direction,e),gn.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){Ls.copy(t).add(e).multiplyScalar(.5),Dr.copy(e).sub(t).normalize(),kn.copy(this.origin).sub(Ls);const s=t.distanceTo(e)*.5,a=-this.direction.dot(Dr),o=kn.dot(this.direction),l=-kn.dot(Dr),c=kn.lengthSq(),u=Math.abs(1-a*a);let h,f,p,g;if(u>0)if(h=a*l-o,f=a*o-l,g=s*u,h>=0)if(f>=-g)if(f<=g){const x=1/u;h*=x,f*=x,p=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Ls).addScaledVector(Dr,f),p}intersectSphere(t,e){gn.subVectors(t.center,this.origin);const n=gn.dot(this.direction),r=gn.dot(gn)-n*n,s=t.radius*t.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,r=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,r=(t.min.x-f.x)*c),u>=0?(s=(t.min.y-f.y)*u,a=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,a=(t.min.y-f.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(o=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,gn)!==null}intersectTriangle(t,e,n,r,s){ks.subVectors(e,t),Ir.subVectors(n,t),Ds.crossVectors(ks,Ir);let a=this.direction.dot(Ds),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;kn.subVectors(this.origin,t);const l=o*this.direction.dot(Ir.crossVectors(kn,Ir));if(l<0)return null;const c=o*this.direction.dot(ks.cross(kn));if(c<0||l+c>a)return null;const u=-o*kn.dot(Ds);return u<0?null:this.at(u/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ne{constructor(t,e,n,r,s,a,o,l,c,u,h,f,p,g,x,m){ne.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,l,c,u,h,f,p,g,x,m)}set(t,e,n,r,s,a,o,l,c,u,h,f,p,g,x,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=g,d[11]=x,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ne().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/pi.setFromMatrixColumn(t,0).length(),s=1/pi.setFromMatrixColumn(t,1).length(),a=1/pi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const f=a*u,p=a*h,g=o*u,x=o*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=p+g*c,e[5]=f-x*c,e[9]=-o*l,e[2]=x-f*c,e[6]=g+p*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*u,p=l*h,g=c*u,x=c*h;e[0]=f+x*o,e[4]=g*o-p,e[8]=a*c,e[1]=a*h,e[5]=a*u,e[9]=-o,e[2]=p*o-g,e[6]=x+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*u,p=l*h,g=c*u,x=c*h;e[0]=f-x*o,e[4]=-a*h,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*u,e[9]=x-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*u,p=a*h,g=o*u,x=o*h;e[0]=l*u,e[4]=g*c-p,e[8]=f*c+x,e[1]=l*h,e[5]=x*c+f,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,p=a*c,g=o*l,x=o*c;e[0]=l*u,e[4]=x-f*h,e[8]=g*h+p,e[1]=h,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=p*h+g,e[10]=f-x*h}else if(t.order==="XZY"){const f=a*l,p=a*c,g=o*l,x=o*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+x,e[5]=a*u,e[9]=p*h-g,e[2]=g*h-p,e[6]=o*u,e[10]=x*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Xd,t,qd)}lookAt(t,e,n){const r=this.elements;return Fe.subVectors(t,e),Fe.lengthSq()===0&&(Fe.z=1),Fe.normalize(),Dn.crossVectors(n,Fe),Dn.lengthSq()===0&&(Math.abs(n.z)===1?Fe.x+=1e-4:Fe.z+=1e-4,Fe.normalize(),Dn.crossVectors(n,Fe)),Dn.normalize(),Ur.crossVectors(Fe,Dn),r[0]=Dn.x,r[4]=Ur.x,r[8]=Fe.x,r[1]=Dn.y,r[5]=Ur.y,r[9]=Fe.y,r[2]=Dn.z,r[6]=Ur.z,r[10]=Fe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],p=n[13],g=n[2],x=n[6],m=n[10],d=n[14],b=n[3],E=n[7],v=n[11],k=n[15],T=r[0],A=r[4],P=r[8],S=r[12],y=r[1],R=r[5],B=r[9],z=r[13],W=r[2],K=r[6],V=r[10],Q=r[14],G=r[3],ot=r[7],pt=r[11],Et=r[15];return s[0]=a*T+o*y+l*W+c*G,s[4]=a*A+o*R+l*K+c*ot,s[8]=a*P+o*B+l*V+c*pt,s[12]=a*S+o*z+l*Q+c*Et,s[1]=u*T+h*y+f*W+p*G,s[5]=u*A+h*R+f*K+p*ot,s[9]=u*P+h*B+f*V+p*pt,s[13]=u*S+h*z+f*Q+p*Et,s[2]=g*T+x*y+m*W+d*G,s[6]=g*A+x*R+m*K+d*ot,s[10]=g*P+x*B+m*V+d*pt,s[14]=g*S+x*z+m*Q+d*Et,s[3]=b*T+E*y+v*W+k*G,s[7]=b*A+E*R+v*K+k*ot,s[11]=b*P+E*B+v*V+k*pt,s[15]=b*S+E*z+v*Q+k*Et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],p=t[14],g=t[3],x=t[7],m=t[11],d=t[15];return g*(+s*l*h-r*c*h-s*o*f+n*c*f+r*o*p-n*l*p)+x*(+e*l*p-e*c*f+s*a*f-r*a*p+r*c*u-s*l*u)+m*(+e*c*h-e*o*p-s*a*h+n*a*p+s*o*u-n*c*u)+d*(-r*o*u-e*l*h+e*o*f+r*a*h-n*a*f+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],p=t[11],g=t[12],x=t[13],m=t[14],d=t[15],b=h*m*c-x*f*c+x*l*p-o*m*p-h*l*d+o*f*d,E=g*f*c-u*m*c-g*l*p+a*m*p+u*l*d-a*f*d,v=u*x*c-g*h*c+g*o*p-a*x*p-u*o*d+a*h*d,k=g*h*l-u*x*l-g*o*f+a*x*f+u*o*m-a*h*m,T=e*b+n*E+r*v+s*k;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return t[0]=b*A,t[1]=(x*f*s-h*m*s-x*r*p+n*m*p+h*r*d-n*f*d)*A,t[2]=(o*m*s-x*l*s+x*r*c-n*m*c-o*r*d+n*l*d)*A,t[3]=(h*l*s-o*f*s-h*r*c+n*f*c+o*r*p-n*l*p)*A,t[4]=E*A,t[5]=(u*m*s-g*f*s+g*r*p-e*m*p-u*r*d+e*f*d)*A,t[6]=(g*l*s-a*m*s-g*r*c+e*m*c+a*r*d-e*l*d)*A,t[7]=(a*f*s-u*l*s+u*r*c-e*f*c-a*r*p+e*l*p)*A,t[8]=v*A,t[9]=(g*h*s-u*x*s-g*n*p+e*x*p+u*n*d-e*h*d)*A,t[10]=(a*x*s-g*o*s+g*n*c-e*x*c-a*n*d+e*o*d)*A,t[11]=(u*o*s-a*h*s-u*n*c+e*h*c+a*n*p-e*o*p)*A,t[12]=k*A,t[13]=(u*x*r-g*h*r+g*n*f-e*x*f-u*n*m+e*h*m)*A,t[14]=(g*o*r-a*x*r-g*n*l+e*x*l+a*n*m-e*o*m)*A,t[15]=(a*h*r-u*o*r+u*n*l-e*h*l-a*n*f+e*o*f)*A,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,a=t.x,o=t.y,l=t.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,a){return this.set(1,n,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,u=a+a,h=o+o,f=s*c,p=s*u,g=s*h,x=a*u,m=a*h,d=o*h,b=l*c,E=l*u,v=l*h,k=n.x,T=n.y,A=n.z;return r[0]=(1-(x+d))*k,r[1]=(p+v)*k,r[2]=(g-E)*k,r[3]=0,r[4]=(p-v)*T,r[5]=(1-(f+d))*T,r[6]=(m+b)*T,r[7]=0,r[8]=(g+E)*A,r[9]=(m-b)*A,r[10]=(1-(f+x))*A,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=pi.set(r[0],r[1],r[2]).length();const a=pi.set(r[4],r[5],r[6]).length(),o=pi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],je.copy(this);const c=1/s,u=1/a,h=1/o;return je.elements[0]*=c,je.elements[1]*=c,je.elements[2]*=c,je.elements[4]*=u,je.elements[5]*=u,je.elements[6]*=u,je.elements[8]*=h,je.elements[9]*=h,je.elements[10]*=h,e.setFromRotationMatrix(je),n.x=s,n.y=a,n.z=o,this}makePerspective(t,e,n,r,s,a,o=bn){const l=this.elements,c=2*s/(e-t),u=2*s/(n-r),h=(e+t)/(e-t),f=(n+r)/(n-r);let p,g;if(o===bn)p=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===ps)p=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,a,o=bn){const l=this.elements,c=1/(e-t),u=1/(n-r),h=1/(a-s),f=(e+t)*c,p=(n+r)*u;let g,x;if(o===bn)g=(a+s)*h,x=-2*h;else if(o===ps)g=s*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const pi=new C,je=new ne,Xd=new C(0,0,0),qd=new C(1,1,1),Dn=new C,Ur=new C,Fe=new C,ul=new ne,hl=new yr;class hn{constructor(t=0,e=0,n=0,r=hn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],p=r[10];switch(e){case"XYZ":this._y=Math.asin(Se(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Se(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Se(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Se(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Se(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Se(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ul.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ul,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return hl.setFromEuler(this),this.setFromQuaternion(hl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hn.DEFAULT_ORDER="XYZ";class vo{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Yd=0;const dl=new C,mi=new yr,_n=new ne,Nr=new C,tr=new C,$d=new C,Kd=new yr,fl=new C(1,0,0),pl=new C(0,1,0),ml=new C(0,0,1),gl={type:"added"},Zd={type:"removed"},gi={type:"childadded",child:null},Is={type:"childremoved",child:null};class Ee extends Xi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=qi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ee.DEFAULT_UP.clone();const t=new C,e=new hn,n=new yr,r=new C(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ne},normalMatrix:{value:new Ft}}),this.matrix=new ne,this.matrixWorld=new ne,this.matrixAutoUpdate=Ee.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return mi.setFromAxisAngle(t,e),this.quaternion.multiply(mi),this}rotateOnWorldAxis(t,e){return mi.setFromAxisAngle(t,e),this.quaternion.premultiply(mi),this}rotateX(t){return this.rotateOnAxis(fl,t)}rotateY(t){return this.rotateOnAxis(pl,t)}rotateZ(t){return this.rotateOnAxis(ml,t)}translateOnAxis(t,e){return dl.copy(t).applyQuaternion(this.quaternion),this.position.add(dl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(fl,t)}translateY(t){return this.translateOnAxis(pl,t)}translateZ(t){return this.translateOnAxis(ml,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(_n.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Nr.copy(t):Nr.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),tr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_n.lookAt(tr,Nr,this.up):_n.lookAt(Nr,tr,this.up),this.quaternion.setFromRotationMatrix(_n),r&&(_n.extractRotation(r.matrixWorld),mi.setFromRotationMatrix(_n),this.quaternion.premultiply(mi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(gl),gi.child=t,this.dispatchEvent(gi),gi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Zd),Is.child=t,this.dispatchEvent(Is),Is.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),_n.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),_n.multiply(t.parent.matrixWorld)),t.applyMatrix4(_n),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(gl),gi.child=t,this.dispatchEvent(gi),gi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tr,t,$d),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tr,Kd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(t.shapes,h)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),h=a(t.shapes),f=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}Ee.DEFAULT_UP=new C(0,1,0);Ee.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Qe=new C,vn=new C,Us=new C,xn=new C,_i=new C,vi=new C,_l=new C,Ns=new C,Fs=new C,Os=new C,zs=new ee,Bs=new ee,Hs=new ee;class tn{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),Qe.subVectors(t,e),r.cross(Qe);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){Qe.subVectors(r,e),vn.subVectors(n,e),Us.subVectors(t,e);const a=Qe.dot(Qe),o=Qe.dot(vn),l=Qe.dot(Us),c=vn.dot(vn),u=vn.dot(Us),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const f=1/h,p=(c*l-o*u)*f,g=(a*u-o*l)*f;return s.set(1-p-g,g,p)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,xn)===null?!1:xn.x>=0&&xn.y>=0&&xn.x+xn.y<=1}static getInterpolation(t,e,n,r,s,a,o,l){return this.getBarycoord(t,e,n,r,xn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,xn.x),l.addScaledVector(a,xn.y),l.addScaledVector(o,xn.z),l)}static getInterpolatedAttribute(t,e,n,r,s,a){return zs.setScalar(0),Bs.setScalar(0),Hs.setScalar(0),zs.fromBufferAttribute(t,e),Bs.fromBufferAttribute(t,n),Hs.fromBufferAttribute(t,r),a.setScalar(0),a.addScaledVector(zs,s.x),a.addScaledVector(Bs,s.y),a.addScaledVector(Hs,s.z),a}static isFrontFacing(t,e,n,r){return Qe.subVectors(n,e),vn.subVectors(t,e),Qe.cross(vn).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Qe.subVectors(this.c,this.b),vn.subVectors(this.a,this.b),Qe.cross(vn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return tn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return tn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return tn.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return tn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return tn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let a,o;_i.subVectors(r,n),vi.subVectors(s,n),Ns.subVectors(t,n);const l=_i.dot(Ns),c=vi.dot(Ns);if(l<=0&&c<=0)return e.copy(n);Fs.subVectors(t,r);const u=_i.dot(Fs),h=vi.dot(Fs);if(u>=0&&h<=u)return e.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(n).addScaledVector(_i,a);Os.subVectors(t,s);const p=_i.dot(Os),g=vi.dot(Os);if(g>=0&&p<=g)return e.copy(s);const x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(vi,o);const m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return _l.subVectors(s,r),o=(h-u)/(h-u+(p-g)),e.copy(r).addScaledVector(_l,o);const d=1/(m+x+f);return a=x*d,o=f*d,e.copy(n).addScaledVector(_i,a).addScaledVector(vi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Kc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},In={h:0,s:0,l:0},Fr={h:0,s:0,l:0};function Gs(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class kt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Be){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Kt.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=Kt.workingColorSpace){if(t=_o(t,1),e=Se(e,0,1),n=Se(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=Gs(a,s,t+1/3),this.g=Gs(a,s,t),this.b=Gs(a,s,t-1/3)}return Kt.toWorkingColorSpace(this,r),this}setStyle(t,e=Be){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Be){const n=Kc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=wn(t.r),this.g=wn(t.g),this.b=wn(t.b),this}copyLinearToSRGB(t){return this.r=Di(t.r),this.g=Di(t.g),this.b=Di(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Be){return Kt.fromWorkingColorSpace(Re.copy(this),t),Math.round(Se(Re.r*255,0,255))*65536+Math.round(Se(Re.g*255,0,255))*256+Math.round(Se(Re.b*255,0,255))}getHexString(t=Be){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.fromWorkingColorSpace(Re.copy(this),e);const n=Re.r,r=Re.g,s=Re.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=Kt.workingColorSpace){return Kt.fromWorkingColorSpace(Re.copy(this),e),t.r=Re.r,t.g=Re.g,t.b=Re.b,t}getStyle(t=Be){Kt.fromWorkingColorSpace(Re.copy(this),t);const e=Re.r,n=Re.g,r=Re.b;return t!==Be?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(In),this.setHSL(In.h+t,In.s+e,In.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(In),t.getHSL(Fr);const n=cr(In.h,Fr.h,e),r=cr(In.s,Fr.s,e),s=cr(In.l,Fr.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Re=new kt;kt.NAMES=Kc;let Jd=0;class Sr extends Xi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jd++}),this.uuid=qi(),this.name="",this.blending=Li,this.side=Bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ma,this.blendDst=ga,this.blendEquation=Jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new kt(0,0,0),this.blendAlpha=0,this.depthFunc=Oi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ci,this.stencilZFail=ci,this.stencilZPass=ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Li&&(n.blending=this.blending),this.side!==Bn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ma&&(n.blendSrc=this.blendSrc),this.blendDst!==ga&&(n.blendDst=this.blendDst),this.blendEquation!==Jn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Oi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ci&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ci&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ci&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(e){const s=r(t.textures),a=r(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class xo extends Sr{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=lo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const _e=new C,Or=new ft;class nn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Qo,this.updateRanges=[],this.gpuType=cn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Or.fromBufferAttribute(this,e),Or.applyMatrix3(t),this.setXY(e,Or.x,Or.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ri(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Pe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ri(e,this.array)),e}setX(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ri(e,this.array)),e}setY(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ri(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ri(e,this.array)),e}setW(t,e){return this.normalized&&(e=Pe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Pe(e,this.array),n=Pe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=Pe(e,this.array),n=Pe(n,this.array),r=Pe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=Pe(e,this.array),n=Pe(n,this.array),r=Pe(r,this.array),s=Pe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Qo&&(t.usage=this.usage),t}}class Zc extends nn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Jc extends nn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class he extends nn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let jd=0;const Ye=new ne,Vs=new Ee,xi=new C,Oe=new si,er=new si,ye=new C;class We extends Xi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=qi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Xc(t)?Jc:Zc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ft().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ye.makeRotationFromQuaternion(t),this.applyMatrix4(Ye),this}rotateX(t){return Ye.makeRotationX(t),this.applyMatrix4(Ye),this}rotateY(t){return Ye.makeRotationY(t),this.applyMatrix4(Ye),this}rotateZ(t){return Ye.makeRotationZ(t),this.applyMatrix4(Ye),this}translate(t,e,n){return Ye.makeTranslation(t,e,n),this.applyMatrix4(Ye),this}scale(t,e,n){return Ye.makeScale(t,e,n),this.applyMatrix4(Ye),this}lookAt(t){return Vs.lookAt(t),Vs.updateMatrix(),this.applyMatrix4(Vs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xi).negate(),this.translate(xi.x,xi.y,xi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let r=0,s=t.length;r<s;r++){const a=t[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new he(n,3))}else{for(let n=0,r=e.count;n<r;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new si);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];Oe.setFromBufferAttribute(s),this.morphTargetsRelative?(ye.addVectors(this.boundingBox.min,Oe.min),this.boundingBox.expandByPoint(ye),ye.addVectors(this.boundingBox.max,Oe.max),this.boundingBox.expandByPoint(ye)):(this.boundingBox.expandByPoint(Oe.min),this.boundingBox.expandByPoint(Oe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){const n=this.boundingSphere.center;if(Oe.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];er.setFromBufferAttribute(o),this.morphTargetsRelative?(ye.addVectors(Oe.min,er.min),Oe.expandByPoint(ye),ye.addVectors(Oe.max,er.max),Oe.expandByPoint(ye)):(Oe.expandByPoint(er.min),Oe.expandByPoint(er.max))}Oe.getCenter(n);let r=0;for(let s=0,a=t.count;s<a;s++)ye.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(ye));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)ye.fromBufferAttribute(o,c),l&&(xi.fromBufferAttribute(t,c),ye.add(xi)),r=Math.max(r,n.distanceToSquared(ye))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new nn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let P=0;P<n.count;P++)o[P]=new C,l[P]=new C;const c=new C,u=new C,h=new C,f=new ft,p=new ft,g=new ft,x=new C,m=new C;function d(P,S,y){c.fromBufferAttribute(n,P),u.fromBufferAttribute(n,S),h.fromBufferAttribute(n,y),f.fromBufferAttribute(s,P),p.fromBufferAttribute(s,S),g.fromBufferAttribute(s,y),u.sub(c),h.sub(c),p.sub(f),g.sub(f);const R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(R),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(R),o[P].add(x),o[S].add(x),o[y].add(x),l[P].add(m),l[S].add(m),l[y].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let P=0,S=b.length;P<S;++P){const y=b[P],R=y.start,B=y.count;for(let z=R,W=R+B;z<W;z+=3)d(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const E=new C,v=new C,k=new C,T=new C;function A(P){k.fromBufferAttribute(r,P),T.copy(k);const S=o[P];E.copy(S),E.sub(k.multiplyScalar(k.dot(S))).normalize(),v.crossVectors(T,S);const R=v.dot(l[P])<0?-1:1;a.setXYZW(P,E.x,E.y,E.z,R)}for(let P=0,S=b.length;P<S;++P){const y=b[P],R=y.start,B=y.count;for(let z=R,W=R+B;z<W;z+=3)A(t.getX(z+0)),A(t.getX(z+1)),A(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new nn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const r=new C,s=new C,a=new C,o=new C,l=new C,c=new C,u=new C,h=new C;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),x=t.getX(f+1),m=t.getX(f+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)r.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ye.fromBufferAttribute(t,e),ye.normalize(),t.setXYZ(e,ye.x,ye.y,ye.z)}toNonIndexed(){function t(o,l){const c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u);let p=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*u;for(let d=0;d<u;d++)f[g++]=c[p++]}return new nn(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new We,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=t(l,n);e.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const f=c[u],p=t(f,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];u.push(p.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const r=t.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const vl=new ne,Xn=new $c,zr=new Mr,xl=new C,Br=new C,Hr=new C,Gr=new C,Ws=new C,Vr=new C,yl=new C,Wr=new C;class it extends Ee{constructor(t=new We,e=new xo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const o=this.morphTargetInfluences;if(s&&o){Vr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(Ws.fromBufferAttribute(h,t),a?Vr.addScaledVector(Ws,u):Vr.addScaledVector(Ws.sub(e),u))}e.add(Vr)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),zr.copy(n.boundingSphere),zr.applyMatrix4(s),Xn.copy(t.ray).recast(t.near),!(zr.containsPoint(Xn.origin)===!1&&(Xn.intersectSphere(zr,xl)===null||Xn.origin.distanceToSquared(xl)>(t.far-t.near)**2))&&(vl.copy(s).invert(),Xn.copy(t.ray).applyMatrix4(vl),!(n.boundingBox!==null&&Xn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Xn)))}_computeIntersections(t,e,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=f.length;g<x;g++){const m=f[g],d=a[m.materialIndex],b=Math.max(m.start,p.start),E=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let v=b,k=E;v<k;v+=3){const T=o.getX(v),A=o.getX(v+1),P=o.getX(v+2);r=Xr(this,d,t,n,c,u,h,T,A,P),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=g,d=x;m<d;m+=3){const b=o.getX(m),E=o.getX(m+1),v=o.getX(m+2);r=Xr(this,a,t,n,c,u,h,b,E,v),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=f.length;g<x;g++){const m=f[g],d=a[m.materialIndex],b=Math.max(m.start,p.start),E=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=b,k=E;v<k;v+=3){const T=v,A=v+1,P=v+2;r=Xr(this,d,t,n,c,u,h,T,A,P),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,d=x;m<d;m+=3){const b=m,E=m+1,v=m+2;r=Xr(this,a,t,n,c,u,h,b,E,v),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function Qd(i,t,e,n,r,s,a,o){let l;if(t.side===Ie?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,t.side===Bn,o),l===null)return null;Wr.copy(o),Wr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Wr);return c<e.near||c>e.far?null:{distance:c,point:Wr.clone(),object:i}}function Xr(i,t,e,n,r,s,a,o,l,c){i.getVertexPosition(o,Br),i.getVertexPosition(l,Hr),i.getVertexPosition(c,Gr);const u=Qd(i,t,e,n,Br,Hr,Gr,yl);if(u){const h=new C;tn.getBarycoord(yl,Br,Hr,Gr,h),r&&(u.uv=tn.getInterpolatedAttribute(r,o,l,c,h,new ft)),s&&(u.uv1=tn.getInterpolatedAttribute(s,o,l,c,h,new ft)),a&&(u.normal=tn.getInterpolatedAttribute(a,o,l,c,h,new C),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new C,materialIndex:0};tn.getNormal(Br,Hr,Gr,f.normal),u.face=f,u.barycoord=h}return u}class Tt extends We{constructor(t=1,e=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let f=0,p=0;g("z","y","x",-1,-1,n,e,t,a,s,0),g("z","y","x",1,-1,n,e,-t,a,s,1),g("x","z","y",1,1,t,n,e,r,a,2),g("x","z","y",1,-1,t,n,-e,r,a,3),g("x","y","z",1,-1,t,e,n,r,s,4),g("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new he(c,3)),this.setAttribute("normal",new he(u,3)),this.setAttribute("uv",new he(h,2));function g(x,m,d,b,E,v,k,T,A,P,S){const y=v/A,R=k/P,B=v/2,z=k/2,W=T/2,K=A+1,V=P+1;let Q=0,G=0;const ot=new C;for(let pt=0;pt<V;pt++){const Et=pt*R-z;for(let Bt=0;Bt<K;Bt++){const ie=Bt*y-B;ot[x]=ie*b,ot[m]=Et*E,ot[d]=W,c.push(ot.x,ot.y,ot.z),ot[x]=0,ot[m]=0,ot[d]=T>0?1:-1,u.push(ot.x,ot.y,ot.z),h.push(Bt/A),h.push(1-pt/P),Q+=1}}for(let pt=0;pt<P;pt++)for(let Et=0;Et<A;Et++){const Bt=f+Et+K*pt,ie=f+Et+K*(pt+1),q=f+(Et+1)+K*(pt+1),nt=f+(Et+1)+K*pt;l.push(Bt,ie,nt),l.push(ie,q,nt),G+=6}o.addGroup(p,G,S),p+=G,f+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Tt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Vi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function Le(i){const t={};for(let e=0;e<i.length;e++){const n=Vi(i[e]);for(const r in n)t[r]=n[r]}return t}function tf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function jc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const ef={clone:Vi,merge:Le};var nf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,rf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Hn extends Sr{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nf,this.fragmentShader=rf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Vi(t.uniforms),this.uniformsGroups=tf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Qc extends Ee{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ne,this.projectionMatrix=new ne,this.projectionMatrixInverse=new ne,this.coordinateSystem=bn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Un=new C,Ml=new ft,Sl=new ft;class He extends Qc{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=gr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(lr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return gr*2*Math.atan(Math.tan(lr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Un.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Un.x,Un.y).multiplyScalar(-t/Un.z),Un.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Un.x,Un.y).multiplyScalar(-t/Un.z)}getViewSize(t,e){return this.getViewBounds(t,Ml,Sl),e.subVectors(Sl,Ml)}setViewOffset(t,e,n,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(lr*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,e-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const yi=-90,Mi=1;class sf extends Ee{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new He(yi,Mi,t,e);r.layers=this.layers,this.add(r);const s=new He(yi,Mi,t,e);s.layers=this.layers,this.add(s);const a=new He(yi,Mi,t,e);a.layers=this.layers,this.add(a);const o=new He(yi,Mi,t,e);o.layers=this.layers,this.add(o);const l=new He(yi,Mi,t,e);l.layers=this.layers,this.add(l);const c=new He(yi,Mi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,a,o,l]=e;for(const c of e)this.remove(c);if(t===bn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ps)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,a),t.setRenderTarget(n,2,r),t.render(e,o),t.setRenderTarget(n,3,r),t.render(e,l),t.setRenderTarget(n,4,r),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,r),t.render(e,u),t.setRenderTarget(h,f,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class tu extends Ce{constructor(t,e,n,r,s,a,o,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:zi,super(t,e,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class af extends ri{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new tu(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ln}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Tt(5,5,5),s=new Hn({name:"CubemapFromEquirect",uniforms:Vi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ie,blending:On});s.uniforms.tEquirect.value=e;const a=new it(r,s),o=e.minFilter;return e.minFilter===ei&&(e.minFilter=ln),new sf(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,r){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,r);t.setRenderTarget(s)}}const Xs=new C,of=new C,lf=new Ft;class Kn{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=Xs.subVectors(n,e).cross(of.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Xs),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||lf.getNormalMatrix(t),r=this.coplanarPoint(Xs).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const qn=new Mr,qr=new C;class yo{constructor(t=new Kn,e=new Kn,n=new Kn,r=new Kn,s=new Kn,a=new Kn){this.planes=[t,e,n,r,s,a]}set(t,e,n,r,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=bn){const n=this.planes,r=t.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],u=r[5],h=r[6],f=r[7],p=r[8],g=r[9],x=r[10],m=r[11],d=r[12],b=r[13],E=r[14],v=r[15];if(n[0].setComponents(l-s,f-c,m-p,v-d).normalize(),n[1].setComponents(l+s,f+c,m+p,v+d).normalize(),n[2].setComponents(l+a,f+u,m+g,v+b).normalize(),n[3].setComponents(l-a,f-u,m-g,v-b).normalize(),n[4].setComponents(l-o,f-h,m-x,v-E).normalize(),e===bn)n[5].setComponents(l+o,f+h,m+x,v+E).normalize();else if(e===ps)n[5].setComponents(o,h,x,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),qn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),qn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(qn)}intersectsSprite(t){return qn.center.set(0,0,0),qn.radius=.7071067811865476,qn.applyMatrix4(t.matrixWorld),this.intersectsSphere(qn)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(qr.x=r.normal.x>0?t.max.x:t.min.x,qr.y=r.normal.y>0?t.max.y:t.min.y,qr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(qr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function eu(){let i=null,t=!1,e=null,n=null;function r(s,a){e(s,a),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function cf(i){const t=new WeakMap;function e(o,l){const c=o.array,u=o.usage,h=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){const u=l.array,h=l.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,u);else{h.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<h.length;p++){const g=h[f],x=h[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,h[f]=x)}h.length=f+1;for(let p=0,g=h.length;p<g;p++){const x=h[p];i.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}class Yi extends We{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,a=e/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,h=t/o,f=e/l,p=[],g=[],x=[],m=[];for(let d=0;d<u;d++){const b=d*f-a;for(let E=0;E<c;E++){const v=E*h-s;g.push(v,-b,0),x.push(0,0,1),m.push(E/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let b=0;b<o;b++){const E=b+c*d,v=b+c*(d+1),k=b+1+c*(d+1),T=b+1+c*d;p.push(E,v,T),p.push(v,k,T)}this.setIndex(p),this.setAttribute("position",new he(g,3)),this.setAttribute("normal",new he(x,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yi(t.width,t.height,t.widthSegments,t.heightSegments)}}var uf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,df=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ff=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,mf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,_f=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,xf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,yf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Mf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Sf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,bf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ef=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,wf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Tf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Af=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Rf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Cf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Pf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Lf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,kf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Df=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,If=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Uf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Nf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ff=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Of=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Bf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Hf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Vf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Wf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Xf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Yf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$f=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Kf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Zf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,jf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Qf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ep=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,np=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,ip=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ap=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,op=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,cp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,up=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,hp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,dp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,fp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,gp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_p=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,xp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Mp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Sp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ep=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Tp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ap=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Rp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Cp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,kp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Dp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ip=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Up=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Np=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Fp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Op=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,zp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Bp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Hp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Gp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Vp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Wp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Xp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,qp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Yp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,$p=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Kp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Zp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Jp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Qp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,tm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,em=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,im=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,rm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,sm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,om=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,lm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const cm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,um=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,gm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,_m=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,vm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ym=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Sm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Em=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Am=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Rm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Pm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Lm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,km=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Im=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Um=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Om=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Hm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Gm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,zt={alphahash_fragment:uf,alphahash_pars_fragment:hf,alphamap_fragment:df,alphamap_pars_fragment:ff,alphatest_fragment:pf,alphatest_pars_fragment:mf,aomap_fragment:gf,aomap_pars_fragment:_f,batching_pars_vertex:vf,batching_vertex:xf,begin_vertex:yf,beginnormal_vertex:Mf,bsdfs:Sf,iridescence_fragment:bf,bumpmap_pars_fragment:Ef,clipping_planes_fragment:wf,clipping_planes_pars_fragment:Tf,clipping_planes_pars_vertex:Af,clipping_planes_vertex:Rf,color_fragment:Cf,color_pars_fragment:Pf,color_pars_vertex:Lf,color_vertex:kf,common:Df,cube_uv_reflection_fragment:If,defaultnormal_vertex:Uf,displacementmap_pars_vertex:Nf,displacementmap_vertex:Ff,emissivemap_fragment:Of,emissivemap_pars_fragment:zf,colorspace_fragment:Bf,colorspace_pars_fragment:Hf,envmap_fragment:Gf,envmap_common_pars_fragment:Vf,envmap_pars_fragment:Wf,envmap_pars_vertex:Xf,envmap_physical_pars_fragment:np,envmap_vertex:qf,fog_vertex:Yf,fog_pars_vertex:$f,fog_fragment:Kf,fog_pars_fragment:Zf,gradientmap_pars_fragment:Jf,lightmap_pars_fragment:jf,lights_lambert_fragment:Qf,lights_lambert_pars_fragment:tp,lights_pars_begin:ep,lights_toon_fragment:ip,lights_toon_pars_fragment:rp,lights_phong_fragment:sp,lights_phong_pars_fragment:ap,lights_physical_fragment:op,lights_physical_pars_fragment:lp,lights_fragment_begin:cp,lights_fragment_maps:up,lights_fragment_end:hp,logdepthbuf_fragment:dp,logdepthbuf_pars_fragment:fp,logdepthbuf_pars_vertex:pp,logdepthbuf_vertex:mp,map_fragment:gp,map_pars_fragment:_p,map_particle_fragment:vp,map_particle_pars_fragment:xp,metalnessmap_fragment:yp,metalnessmap_pars_fragment:Mp,morphinstance_vertex:Sp,morphcolor_vertex:bp,morphnormal_vertex:Ep,morphtarget_pars_vertex:wp,morphtarget_vertex:Tp,normal_fragment_begin:Ap,normal_fragment_maps:Rp,normal_pars_fragment:Cp,normal_pars_vertex:Pp,normal_vertex:Lp,normalmap_pars_fragment:kp,clearcoat_normal_fragment_begin:Dp,clearcoat_normal_fragment_maps:Ip,clearcoat_pars_fragment:Up,iridescence_pars_fragment:Np,opaque_fragment:Fp,packing:Op,premultiplied_alpha_fragment:zp,project_vertex:Bp,dithering_fragment:Hp,dithering_pars_fragment:Gp,roughnessmap_fragment:Vp,roughnessmap_pars_fragment:Wp,shadowmap_pars_fragment:Xp,shadowmap_pars_vertex:qp,shadowmap_vertex:Yp,shadowmask_pars_fragment:$p,skinbase_vertex:Kp,skinning_pars_vertex:Zp,skinning_vertex:Jp,skinnormal_vertex:jp,specularmap_fragment:Qp,specularmap_pars_fragment:tm,tonemapping_fragment:em,tonemapping_pars_fragment:nm,transmission_fragment:im,transmission_pars_fragment:rm,uv_pars_fragment:sm,uv_pars_vertex:am,uv_vertex:om,worldpos_vertex:lm,background_vert:cm,background_frag:um,backgroundCube_vert:hm,backgroundCube_frag:dm,cube_vert:fm,cube_frag:pm,depth_vert:mm,depth_frag:gm,distanceRGBA_vert:_m,distanceRGBA_frag:vm,equirect_vert:xm,equirect_frag:ym,linedashed_vert:Mm,linedashed_frag:Sm,meshbasic_vert:bm,meshbasic_frag:Em,meshlambert_vert:wm,meshlambert_frag:Tm,meshmatcap_vert:Am,meshmatcap_frag:Rm,meshnormal_vert:Cm,meshnormal_frag:Pm,meshphong_vert:Lm,meshphong_frag:km,meshphysical_vert:Dm,meshphysical_frag:Im,meshtoon_vert:Um,meshtoon_frag:Nm,points_vert:Fm,points_frag:Om,shadow_vert:zm,shadow_frag:Bm,sprite_vert:Hm,sprite_frag:Gm},rt={common:{diffuse:{value:new kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ft}},envmap:{envMap:{value:null},envMapRotation:{value:new Ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ft},normalScale:{value:new ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0},uvTransform:{value:new Ft}},sprite:{diffuse:{value:new kt(16777215)},opacity:{value:1},center:{value:new ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}}},an={basic:{uniforms:Le([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:zt.meshbasic_vert,fragmentShader:zt.meshbasic_frag},lambert:{uniforms:Le([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new kt(0)}}]),vertexShader:zt.meshlambert_vert,fragmentShader:zt.meshlambert_frag},phong:{uniforms:Le([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new kt(0)},specular:{value:new kt(1118481)},shininess:{value:30}}]),vertexShader:zt.meshphong_vert,fragmentShader:zt.meshphong_frag},standard:{uniforms:Le([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag},toon:{uniforms:Le([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new kt(0)}}]),vertexShader:zt.meshtoon_vert,fragmentShader:zt.meshtoon_frag},matcap:{uniforms:Le([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:zt.meshmatcap_vert,fragmentShader:zt.meshmatcap_frag},points:{uniforms:Le([rt.points,rt.fog]),vertexShader:zt.points_vert,fragmentShader:zt.points_frag},dashed:{uniforms:Le([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:zt.linedashed_vert,fragmentShader:zt.linedashed_frag},depth:{uniforms:Le([rt.common,rt.displacementmap]),vertexShader:zt.depth_vert,fragmentShader:zt.depth_frag},normal:{uniforms:Le([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:zt.meshnormal_vert,fragmentShader:zt.meshnormal_frag},sprite:{uniforms:Le([rt.sprite,rt.fog]),vertexShader:zt.sprite_vert,fragmentShader:zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:zt.background_vert,fragmentShader:zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ft}},vertexShader:zt.backgroundCube_vert,fragmentShader:zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:zt.cube_vert,fragmentShader:zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:zt.equirect_vert,fragmentShader:zt.equirect_frag},distanceRGBA:{uniforms:Le([rt.common,rt.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:zt.distanceRGBA_vert,fragmentShader:zt.distanceRGBA_frag},shadow:{uniforms:Le([rt.lights,rt.fog,{color:{value:new kt(0)},opacity:{value:1}}]),vertexShader:zt.shadow_vert,fragmentShader:zt.shadow_frag}};an.physical={uniforms:Le([an.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ft},clearcoatNormalScale:{value:new ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ft},sheen:{value:0},sheenColor:{value:new kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ft},transmissionSamplerSize:{value:new ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ft},attenuationDistance:{value:0},attenuationColor:{value:new kt(0)},specularColor:{value:new kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ft},anisotropyVector:{value:new ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ft}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag};const Yr={r:0,b:0,g:0},Yn=new hn,Vm=new ne;function Wm(i,t,e,n,r,s,a){const o=new kt(0);let l=s===!0?0:1,c,u,h=null,f=0,p=null;function g(b){let E=b.isScene===!0?b.background:null;return E&&E.isTexture&&(E=(b.backgroundBlurriness>0?e:t).get(E)),E}function x(b){let E=!1;const v=g(b);v===null?d(o,l):v&&v.isColor&&(d(v,1),E=!0);const k=i.xr.getEnvironmentBlendMode();k==="additive"?n.buffers.color.setClear(0,0,0,1,a):k==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,E){const v=g(E);v&&(v.isCubeTexture||v.mapping===gs)?(u===void 0&&(u=new it(new Tt(1,1,1),new Hn({name:"BackgroundCubeMaterial",uniforms:Vi(an.backgroundCube.uniforms),vertexShader:an.backgroundCube.vertexShader,fragmentShader:an.backgroundCube.fragmentShader,side:Ie,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(k,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Yn.copy(E.backgroundRotation),Yn.x*=-1,Yn.y*=-1,Yn.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Yn.y*=-1,Yn.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Vm.makeRotationFromEuler(Yn)),u.material.toneMapped=Kt.getTransfer(v.colorSpace)!==te,(h!==v||f!==v.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,h=v,f=v.version,p=i.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new it(new Yi(2,2),new Hn({name:"BackgroundMaterial",uniforms:Vi(an.background.uniforms),vertexShader:an.background.vertexShader,fragmentShader:an.background.fragmentShader,side:Bn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(v.colorSpace)!==te,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||f!==v.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,f=v.version,p=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function d(b,E){b.getRGB(Yr,jc(i)),n.buffers.color.setClear(Yr.r,Yr.g,Yr.b,E,a)}return{getClearColor:function(){return o},setClearColor:function(b,E=1){o.set(b),l=E,d(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,d(o,l)},render:x,addToRenderList:m}}function Xm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let s=r,a=!1;function o(y,R,B,z,W){let K=!1;const V=h(z,B,R);s!==V&&(s=V,c(s.object)),K=p(y,z,B,W),K&&g(y,z,B,W),W!==null&&t.update(W,i.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,v(y,R,B,z),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function h(y,R,B){const z=B.wireframe===!0;let W=n[y.id];W===void 0&&(W={},n[y.id]=W);let K=W[R.id];K===void 0&&(K={},W[R.id]=K);let V=K[z];return V===void 0&&(V=f(l()),K[z]=V),V}function f(y){const R=[],B=[],z=[];for(let W=0;W<e;W++)R[W]=0,B[W]=0,z[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:B,attributeDivisors:z,object:y,attributes:{},index:null}}function p(y,R,B,z){const W=s.attributes,K=R.attributes;let V=0;const Q=B.getAttributes();for(const G in Q)if(Q[G].location>=0){const pt=W[G];let Et=K[G];if(Et===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(Et=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(Et=y.instanceColor)),pt===void 0||pt.attribute!==Et||Et&&pt.data!==Et.data)return!0;V++}return s.attributesNum!==V||s.index!==z}function g(y,R,B,z){const W={},K=R.attributes;let V=0;const Q=B.getAttributes();for(const G in Q)if(Q[G].location>=0){let pt=K[G];pt===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(pt=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(pt=y.instanceColor));const Et={};Et.attribute=pt,pt&&pt.data&&(Et.data=pt.data),W[G]=Et,V++}s.attributes=W,s.attributesNum=V,s.index=z}function x(){const y=s.newAttributes;for(let R=0,B=y.length;R<B;R++)y[R]=0}function m(y){d(y,0)}function d(y,R){const B=s.newAttributes,z=s.enabledAttributes,W=s.attributeDivisors;B[y]=1,z[y]===0&&(i.enableVertexAttribArray(y),z[y]=1),W[y]!==R&&(i.vertexAttribDivisor(y,R),W[y]=R)}function b(){const y=s.newAttributes,R=s.enabledAttributes;for(let B=0,z=R.length;B<z;B++)R[B]!==y[B]&&(i.disableVertexAttribArray(B),R[B]=0)}function E(y,R,B,z,W,K,V){V===!0?i.vertexAttribIPointer(y,R,B,W,K):i.vertexAttribPointer(y,R,B,z,W,K)}function v(y,R,B,z){x();const W=z.attributes,K=B.getAttributes(),V=R.defaultAttributeValues;for(const Q in K){const G=K[Q];if(G.location>=0){let ot=W[Q];if(ot===void 0&&(Q==="instanceMatrix"&&y.instanceMatrix&&(ot=y.instanceMatrix),Q==="instanceColor"&&y.instanceColor&&(ot=y.instanceColor)),ot!==void 0){const pt=ot.normalized,Et=ot.itemSize,Bt=t.get(ot);if(Bt===void 0)continue;const ie=Bt.buffer,q=Bt.type,nt=Bt.bytesPerElement,Mt=q===i.INT||q===i.UNSIGNED_INT||ot.gpuType===co;if(ot.isInterleavedBufferAttribute){const lt=ot.data,Ct=lt.stride,Dt=ot.offset;if(lt.isInstancedInterleavedBuffer){for(let Ht=0;Ht<G.locationSize;Ht++)d(G.location+Ht,lt.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let Ht=0;Ht<G.locationSize;Ht++)m(G.location+Ht);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let Ht=0;Ht<G.locationSize;Ht++)E(G.location+Ht,Et/G.locationSize,q,pt,Ct*nt,(Dt+Et/G.locationSize*Ht)*nt,Mt)}else{if(ot.isInstancedBufferAttribute){for(let lt=0;lt<G.locationSize;lt++)d(G.location+lt,ot.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let lt=0;lt<G.locationSize;lt++)m(G.location+lt);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let lt=0;lt<G.locationSize;lt++)E(G.location+lt,Et/G.locationSize,q,pt,Et*nt,Et/G.locationSize*lt*nt,Mt)}}else if(V!==void 0){const pt=V[Q];if(pt!==void 0)switch(pt.length){case 2:i.vertexAttrib2fv(G.location,pt);break;case 3:i.vertexAttrib3fv(G.location,pt);break;case 4:i.vertexAttrib4fv(G.location,pt);break;default:i.vertexAttrib1fv(G.location,pt)}}}}b()}function k(){P();for(const y in n){const R=n[y];for(const B in R){const z=R[B];for(const W in z)u(z[W].object),delete z[W];delete R[B]}delete n[y]}}function T(y){if(n[y.id]===void 0)return;const R=n[y.id];for(const B in R){const z=R[B];for(const W in z)u(z[W].object),delete z[W];delete R[B]}delete n[y.id]}function A(y){for(const R in n){const B=n[R];if(B[y.id]===void 0)continue;const z=B[y.id];for(const W in z)u(z[W].object),delete z[W];delete B[y.id]}}function P(){S(),a=!0,s!==r&&(s=r,c(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:P,resetDefaultState:S,dispose:k,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:b}}function qm(i,t,e){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),e.update(u,n,1)}function a(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),e.update(u,n,h))}function o(c,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let p=0;for(let g=0;g<h;g++)p+=u[g];e.update(p,n,1)}function l(c,u,h,f){if(h===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],u[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,h);let g=0;for(let x=0;x<h;x++)g+=u[x]*f[x];e.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Ym(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(A){return!(A!==en&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const P=A===xr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Tn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==cn&&!P)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),k=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:b,maxVaryings:E,maxFragmentUniforms:v,vertexTextures:k,maxSamples:T}}function $m(i){const t=this;let e=null,n=0,r=!1,s=!1;const a=new Kn,o=new Ft,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||n!==0||r;return r=f,n=h.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,p){const g=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,d=i.get(h);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const b=s?0:n,E=b*4;let v=d.clippingState||null;l.value=v,v=u(g,f,E,p);for(let k=0;k!==E;++k)v[k]=e[k];d.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,f,p,g){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const d=p+x*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<d)&&(m=new Float32Array(d));for(let E=0,v=p;E!==x;++E,v+=4)a.copy(h[E]).applyMatrix4(b,o),a.normal.toArray(m,v),m[v+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function Km(i){let t=new WeakMap;function e(a,o){return o===Ea?a.mapping=zi:o===wa&&(a.mapping=Bi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ea||o===wa)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new af(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",r),e(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class nu extends Qc{constructor(t=-1,e=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,a=n+t,o=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Pi=4,bl=[.125,.215,.35,.446,.526,.582],jn=20,qs=new nu,El=new kt;let Ys=null,$s=0,Ks=0,Zs=!1;const Zn=(1+Math.sqrt(5))/2,Si=1/Zn,wl=[new C(-Zn,Si,0),new C(Zn,Si,0),new C(-Si,0,Zn),new C(Si,0,Zn),new C(0,Zn,-Si),new C(0,Zn,Si),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];class Tl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){Ys=this._renderer.getRenderTarget(),$s=this._renderer.getActiveCubeFace(),Ks=this._renderer.getActiveMipmapLevel(),Zs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Cl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ys,$s,Ks),this._renderer.xr.enabled=Zs,t.scissorTest=!1,$r(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===zi||t.mapping===Bi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ys=this._renderer.getRenderTarget(),$s=this._renderer.getActiveCubeFace(),Ks=this._renderer.getActiveMipmapLevel(),Zs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ln,minFilter:ln,generateMipmaps:!1,type:xr,format:en,colorSpace:Wi,depthBuffer:!1},r=Al(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Al(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Zm(s)),this._blurMaterial=Jm(s,t,e)}return r}_compileMaterial(t){const e=new it(this._lodPlanes[0],t);this._renderer.compile(e,qs)}_sceneToCubeUV(t,e,n,r){const o=new He(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(El),u.toneMapping=zn,u.autoClear=!1;const p=new xo({name:"PMREM.Background",side:Ie,depthWrite:!1,depthTest:!1}),g=new it(new Tt,p);let x=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,x=!0):(p.color.copy(El),x=!0);for(let d=0;d<6;d++){const b=d%3;b===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):b===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const E=this._cubeSize;$r(r,b*E,d>2?E:0,E,E),u.setRenderTarget(r),x&&u.render(g,o),u.render(t,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===zi||t.mapping===Bi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Cl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new it(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;$r(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,qs)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=wl[(r-s-1)%wl.length];this._blur(t,s-1,s,a,o)}e.autoClear=n}_blur(t,e,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,r,"latitudinal",s),this._halfBlur(a,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new it(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*jn-1),x=s/g,m=isFinite(s)?1+Math.floor(u*x):jn;m>jn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${jn}`);const d=[];let b=0;for(let A=0;A<jn;++A){const P=A/x,S=Math.exp(-P*P/2);d.push(S),A===0?b+=S:A<m&&(b+=2*S)}for(let A=0;A<d.length;A++)d[A]=d[A]/b;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:E}=this;f.dTheta.value=g,f.mipInt.value=E-n;const v=this._sizeLods[r],k=3*v*(r>E-Pi?r-E+Pi:0),T=4*(this._cubeSize-v);$r(e,k,T,3*v,2*v),l.setRenderTarget(e),l.render(h,qs)}}function Zm(i){const t=[],e=[],n=[];let r=i;const s=i-Pi+1+bl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>i-Pi?l=bl[a-i+Pi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,x=3,m=2,d=1,b=new Float32Array(x*g*p),E=new Float32Array(m*g*p),v=new Float32Array(d*g*p);for(let T=0;T<p;T++){const A=T%3*2/3-1,P=T>2?0:-1,S=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];b.set(S,x*g*T),E.set(f,m*g*T);const y=[T,T,T,T,T,T];v.set(y,d*g*T)}const k=new We;k.setAttribute("position",new nn(b,x)),k.setAttribute("uv",new nn(E,m)),k.setAttribute("faceIndex",new nn(v,d)),t.push(k),r>Pi&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Al(i,t,e){const n=new ri(i,t,e);return n.texture.mapping=gs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $r(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function Jm(i,t,e){const n=new Float32Array(jn),r=new C(0,1,0);return new Hn({name:"SphericalGaussianBlur",defines:{n:jn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function Rl(){return new Hn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function Cl(){return new Hn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function Mo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function jm(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Ea||l===wa,u=l===zi||l===Bi;if(c||u){let h=t.get(o);const f=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Tl(i)),h=c?e.fromEquirectangular(o,h):e.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),h.texture;if(h!==void 0)return h.texture;{const p=o.image;return c&&p&&p.height>0||u&&p&&r(p)?(e===null&&(e=new Tl(i)),h=c?e.fromEquirectangular(o):e.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Qm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&sr("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function tg(i,t,e,n){const r={},s=new WeakMap;function a(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const x=f.morphAttributes[g];for(let m=0,d=x.length;m<d;m++)t.remove(x[m])}f.removeEventListener("dispose",a),delete r[f.id];const p=s.get(f);p&&(t.remove(p),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)t.update(f[g],i.ARRAY_BUFFER);const p=h.morphAttributes;for(const g in p){const x=p[g];for(let m=0,d=x.length;m<d;m++)t.update(x[m],i.ARRAY_BUFFER)}}function c(h){const f=[],p=h.index,g=h.attributes.position;let x=0;if(p!==null){const b=p.array;x=p.version;for(let E=0,v=b.length;E<v;E+=3){const k=b[E+0],T=b[E+1],A=b[E+2];f.push(k,T,T,A,A,k)}}else if(g!==void 0){const b=g.array;x=g.version;for(let E=0,v=b.length/3-1;E<v;E+=3){const k=E+0,T=E+1,A=E+2;f.push(k,T,T,A,A,k)}}else return;const m=new(Xc(f)?Jc:Zc)(f,1);m.version=x;const d=s.get(h);d&&t.remove(d),s.set(h,m)}function u(h){const f=s.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function eg(i,t,e){let n;function r(f){n=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,p){i.drawElements(n,p,s,f*a),e.update(p,n,1)}function c(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,s,f*a,g),e.update(p,n,g))}function u(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,s,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,n,1)}function h(f,p,g,x){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/a,p[d],x[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,s,f,0,x,0,g);let d=0;for(let b=0;b<g;b++)d+=p[b]*x[b];e.update(d,n,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function ng(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(s/3);break;case i.LINES:e.lines+=o*(s/2);break;case i.LINE_STRIP:e.lines+=o*(s-1);break;case i.LINE_LOOP:e.lines+=o*s;break;case i.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function ig(i,t,e){const n=new WeakMap,r=new ee;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(o);if(f===void 0||f.count!==h){let y=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",y)};var p=y;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],b=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let v=0;g===!0&&(v=1),x===!0&&(v=2),m===!0&&(v=3);let k=o.attributes.position.count*v,T=1;k>t.maxTextureSize&&(T=Math.ceil(k/t.maxTextureSize),k=t.maxTextureSize);const A=new Float32Array(k*T*4*h),P=new Yc(A,k,T,h);P.type=cn,P.needsUpdate=!0;const S=v*4;for(let R=0;R<h;R++){const B=d[R],z=b[R],W=E[R],K=k*T*4*R;for(let V=0;V<B.count;V++){const Q=V*S;g===!0&&(r.fromBufferAttribute(B,V),A[K+Q+0]=r.x,A[K+Q+1]=r.y,A[K+Q+2]=r.z,A[K+Q+3]=0),x===!0&&(r.fromBufferAttribute(z,V),A[K+Q+4]=r.x,A[K+Q+5]=r.y,A[K+Q+6]=r.z,A[K+Q+7]=0),m===!0&&(r.fromBufferAttribute(W,V),A[K+Q+8]=r.x,A[K+Q+9]=r.y,A[K+Q+10]=r.z,A[K+Q+11]=W.itemSize===4?r.w:1)}}f={count:h,texture:P,size:new ft(k,T)},n.set(o,f),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const x=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function rg(i,t,e,n){let r=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=t.get(l,u);if(r.get(h)!==c&&(t.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:a}}class iu extends Ce{constructor(t,e,n,r,s,a,o,l,c,u=ki){if(u!==ki&&u!==Gi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===ki&&(n=ii),n===void 0&&u===Gi&&(n=Hi),super(null,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ve,this.minFilter=l!==void 0?l:Ve,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const ru=new Ce,Pl=new iu(1,1),su=new Yc,au=new Vd,ou=new tu,Ll=[],kl=[],Dl=new Float32Array(16),Il=new Float32Array(9),Ul=new Float32Array(4);function $i(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=Ll[r];if(s===void 0&&(s=new Float32Array(r),Ll[r]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(s,o)}return s}function ve(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function xe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function vs(i,t){let e=kl[t];e===void 0&&(e=new Int32Array(t),kl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function sg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function ag(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2fv(this.addr,t),xe(e,t)}}function og(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ve(e,t))return;i.uniform3fv(this.addr,t),xe(e,t)}}function lg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4fv(this.addr,t),xe(e,t)}}function cg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),xe(e,t)}else{if(ve(e,n))return;Ul.set(n),i.uniformMatrix2fv(this.addr,!1,Ul),xe(e,n)}}function ug(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),xe(e,t)}else{if(ve(e,n))return;Il.set(n),i.uniformMatrix3fv(this.addr,!1,Il),xe(e,n)}}function hg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),xe(e,t)}else{if(ve(e,n))return;Dl.set(n),i.uniformMatrix4fv(this.addr,!1,Dl),xe(e,n)}}function dg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function fg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2iv(this.addr,t),xe(e,t)}}function pg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;i.uniform3iv(this.addr,t),xe(e,t)}}function mg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4iv(this.addr,t),xe(e,t)}}function gg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function _g(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2uiv(this.addr,t),xe(e,t)}}function vg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;i.uniform3uiv(this.addr,t),xe(e,t)}}function xg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4uiv(this.addr,t),xe(e,t)}}function yg(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Pl.compareFunction=Wc,s=Pl):s=ru,e.setTexture2D(t||s,r)}function Mg(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||au,r)}function Sg(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||ou,r)}function bg(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||su,r)}function Eg(i){switch(i){case 5126:return sg;case 35664:return ag;case 35665:return og;case 35666:return lg;case 35674:return cg;case 35675:return ug;case 35676:return hg;case 5124:case 35670:return dg;case 35667:case 35671:return fg;case 35668:case 35672:return pg;case 35669:case 35673:return mg;case 5125:return gg;case 36294:return _g;case 36295:return vg;case 36296:return xg;case 35678:case 36198:case 36298:case 36306:case 35682:return yg;case 35679:case 36299:case 36307:return Mg;case 35680:case 36300:case 36308:case 36293:return Sg;case 36289:case 36303:case 36311:case 36292:return bg}}function wg(i,t){i.uniform1fv(this.addr,t)}function Tg(i,t){const e=$i(t,this.size,2);i.uniform2fv(this.addr,e)}function Ag(i,t){const e=$i(t,this.size,3);i.uniform3fv(this.addr,e)}function Rg(i,t){const e=$i(t,this.size,4);i.uniform4fv(this.addr,e)}function Cg(i,t){const e=$i(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Pg(i,t){const e=$i(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Lg(i,t){const e=$i(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function kg(i,t){i.uniform1iv(this.addr,t)}function Dg(i,t){i.uniform2iv(this.addr,t)}function Ig(i,t){i.uniform3iv(this.addr,t)}function Ug(i,t){i.uniform4iv(this.addr,t)}function Ng(i,t){i.uniform1uiv(this.addr,t)}function Fg(i,t){i.uniform2uiv(this.addr,t)}function Og(i,t){i.uniform3uiv(this.addr,t)}function zg(i,t){i.uniform4uiv(this.addr,t)}function Bg(i,t,e){const n=this.cache,r=t.length,s=vs(e,r);ve(n,s)||(i.uniform1iv(this.addr,s),xe(n,s));for(let a=0;a!==r;++a)e.setTexture2D(t[a]||ru,s[a])}function Hg(i,t,e){const n=this.cache,r=t.length,s=vs(e,r);ve(n,s)||(i.uniform1iv(this.addr,s),xe(n,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||au,s[a])}function Gg(i,t,e){const n=this.cache,r=t.length,s=vs(e,r);ve(n,s)||(i.uniform1iv(this.addr,s),xe(n,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||ou,s[a])}function Vg(i,t,e){const n=this.cache,r=t.length,s=vs(e,r);ve(n,s)||(i.uniform1iv(this.addr,s),xe(n,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||su,s[a])}function Wg(i){switch(i){case 5126:return wg;case 35664:return Tg;case 35665:return Ag;case 35666:return Rg;case 35674:return Cg;case 35675:return Pg;case 35676:return Lg;case 5124:case 35670:return kg;case 35667:case 35671:return Dg;case 35668:case 35672:return Ig;case 35669:case 35673:return Ug;case 5125:return Ng;case 36294:return Fg;case 36295:return Og;case 36296:return zg;case 35678:case 36198:case 36298:case 36306:case 35682:return Bg;case 35679:case 36299:case 36307:return Hg;case 35680:case 36300:case 36308:case 36293:return Gg;case 36289:case 36303:case 36311:case 36292:return Vg}}class Xg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Eg(e.type)}}class qg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Wg(e.type)}}class Yg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(t,e[o.id],n)}}}const Js=/(\w+)(\])?(\[|\.)?/g;function Nl(i,t){i.seq.push(t),i.map[t.id]=t}function $g(i,t,e){const n=i.name,r=n.length;for(Js.lastIndex=0;;){const s=Js.exec(n),a=Js.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Nl(e,c===void 0?new Xg(o,i,t):new qg(o,i,t));break}else{let h=e.map[o];h===void 0&&(h=new Yg(o),Nl(e,h)),e=h}}}class os{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),a=t.getUniformLocation(e,s.name);$g(s,a,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,a=e.length;s!==a;++s){const o=e[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const a=t[r];a.id in e&&n.push(a)}return n}}function Fl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Kg=37297;let Zg=0;function Jg(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Ol=new Ft;function jg(i){Kt._getMatrix(Ol,Kt.workingColorSpace,i);const t=`mat3( ${Ol.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(i)){case _s:return[t,"LinearTransferOETF"];case te:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function zl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=i.getShaderInfoLog(t).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+Jg(i.getShaderSource(t),a)}else return r}function Qg(i,t){const e=jg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function t0(i,t){let e;switch(t){case ed:e="Linear";break;case nd:e="Reinhard";break;case id:e="Cineon";break;case kc:e="ACESFilmic";break;case sd:e="AgX";break;case ad:e="Neutral";break;case rd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Kr=new C;function e0(){Kt.getLuminanceCoefficients(Kr);const i=Kr.x.toFixed(4),t=Kr.y.toFixed(4),e=Kr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function n0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ar).join(`
`)}function i0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function r0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function ar(i){return i!==""}function Bl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Hl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const s0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qa(i){return i.replace(s0,o0)}const a0=new Map;function o0(i,t){let e=zt[t];if(e===void 0){const n=a0.get(t);if(n!==void 0)e=zt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Qa(e)}const l0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gl(i){return i.replace(l0,c0)}function c0(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Vl(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function u0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Lc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ih?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===yn&&(t="SHADOWMAP_TYPE_VSM"),t}function h0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case zi:case Bi:t="ENVMAP_TYPE_CUBE";break;case gs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function d0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Bi:t="ENVMAP_MODE_REFRACTION";break}return t}function f0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case lo:t="ENVMAP_BLENDING_MULTIPLY";break;case Qh:t="ENVMAP_BLENDING_MIX";break;case td:t="ENVMAP_BLENDING_ADD";break}return t}function p0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function m0(i,t,e,n){const r=i.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=u0(e),c=h0(e),u=d0(e),h=f0(e),f=p0(e),p=n0(e),g=i0(s),x=r.createProgram();let m,d,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ar).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ar).join(`
`),d.length>0&&(d+=`
`)):(m=[Vl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ar).join(`
`),d=[Vl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==zn?"#define TONE_MAPPING":"",e.toneMapping!==zn?zt.tonemapping_pars_fragment:"",e.toneMapping!==zn?t0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",zt.colorspace_pars_fragment,Qg("linearToOutputTexel",e.outputColorSpace),e0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ar).join(`
`)),a=Qa(a),a=Bl(a,e),a=Hl(a,e),o=Qa(o),o=Bl(o,e),o=Hl(o,e),a=Gl(a),o=Gl(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===tl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===tl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const E=b+m+a,v=b+d+o,k=Fl(r,r.VERTEX_SHADER,E),T=Fl(r,r.FRAGMENT_SHADER,v);r.attachShader(x,k),r.attachShader(x,T),e.index0AttributeName!==void 0?r.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function A(R){if(i.debug.checkShaderErrors){const B=r.getProgramInfoLog(x).trim(),z=r.getShaderInfoLog(k).trim(),W=r.getShaderInfoLog(T).trim();let K=!0,V=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,x,k,T);else{const Q=zl(r,k,"vertex"),G=zl(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+B+`
`+Q+`
`+G)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(z===""||W==="")&&(V=!1);V&&(R.diagnostics={runnable:K,programLog:B,vertexShader:{log:z,prefix:m},fragmentShader:{log:W,prefix:d}})}r.deleteShader(k),r.deleteShader(T),P=new os(r,x),S=r0(r,x)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(x,Kg)),y},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Zg++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=k,this.fragmentShader=T,this}let g0=0;class _0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new v0(t),e.set(t,n)),n}}class v0{constructor(t){this.id=g0++,this.code=t,this.usedTimes=0}}function x0(i,t,e,n,r,s,a){const o=new vo,l=new _0,c=new Set,u=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,y,R,B,z){const W=B.fog,K=z.geometry,V=S.isMeshStandardMaterial?B.environment:null,Q=(S.isMeshStandardMaterial?e:t).get(S.envMap||V),G=Q&&Q.mapping===gs?Q.image.height:null,ot=g[S.type];S.precision!==null&&(p=r.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const pt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Et=pt!==void 0?pt.length:0;let Bt=0;K.morphAttributes.position!==void 0&&(Bt=1),K.morphAttributes.normal!==void 0&&(Bt=2),K.morphAttributes.color!==void 0&&(Bt=3);let ie,q,nt,Mt;if(ot){const Qt=an[ot];ie=Qt.vertexShader,q=Qt.fragmentShader}else ie=S.vertexShader,q=S.fragmentShader,l.update(S),nt=l.getVertexShaderID(S),Mt=l.getFragmentShaderID(S);const lt=i.getRenderTarget(),Ct=i.state.buffers.depth.getReversed(),Dt=z.isInstancedMesh===!0,Ht=z.isBatchedMesh===!0,de=!!S.map,Yt=!!S.matcap,ge=!!Q,U=!!S.aoMap,Xe=!!S.lightMap,Vt=!!S.bumpMap,Wt=!!S.normalMap,At=!!S.displacementMap,ae=!!S.emissiveMap,wt=!!S.metalnessMap,w=!!S.roughnessMap,_=S.anisotropy>0,N=S.clearcoat>0,Y=S.dispersion>0,J=S.iridescence>0,X=S.sheen>0,St=S.transmission>0,ct=_&&!!S.anisotropyMap,mt=N&&!!S.clearcoatMap,$t=N&&!!S.clearcoatNormalMap,tt=N&&!!S.clearcoatRoughnessMap,gt=J&&!!S.iridescenceMap,Rt=J&&!!S.iridescenceThicknessMap,Pt=X&&!!S.sheenColorMap,_t=X&&!!S.sheenRoughnessMap,Xt=!!S.specularMap,Ot=!!S.specularColorMap,re=!!S.specularIntensityMap,L=St&&!!S.transmissionMap,st=St&&!!S.thicknessMap,H=!!S.gradientMap,$=!!S.alphaMap,dt=S.alphaTest>0,ut=!!S.alphaHash,Ut=!!S.extensions;let me=zn;S.toneMapped&&(lt===null||lt.isXRRenderTarget===!0)&&(me=i.toneMapping);const Te={shaderID:ot,shaderType:S.type,shaderName:S.name,vertexShader:ie,fragmentShader:q,defines:S.defines,customVertexShaderID:nt,customFragmentShaderID:Mt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:Ht,batchingColor:Ht&&z._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&z.instanceColor!==null,instancingMorph:Dt&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:lt===null?i.outputColorSpace:lt.isXRRenderTarget===!0?lt.texture.colorSpace:Wi,alphaToCoverage:!!S.alphaToCoverage,map:de,matcap:Yt,envMap:ge,envMapMode:ge&&Q.mapping,envMapCubeUVHeight:G,aoMap:U,lightMap:Xe,bumpMap:Vt,normalMap:Wt,displacementMap:f&&At,emissiveMap:ae,normalMapObjectSpace:Wt&&S.normalMapType===ud,normalMapTangentSpace:Wt&&S.normalMapType===Vc,metalnessMap:wt,roughnessMap:w,anisotropy:_,anisotropyMap:ct,clearcoat:N,clearcoatMap:mt,clearcoatNormalMap:$t,clearcoatRoughnessMap:tt,dispersion:Y,iridescence:J,iridescenceMap:gt,iridescenceThicknessMap:Rt,sheen:X,sheenColorMap:Pt,sheenRoughnessMap:_t,specularMap:Xt,specularColorMap:Ot,specularIntensityMap:re,transmission:St,transmissionMap:L,thicknessMap:st,gradientMap:H,opaque:S.transparent===!1&&S.blending===Li&&S.alphaToCoverage===!1,alphaMap:$,alphaTest:dt,alphaHash:ut,combine:S.combine,mapUv:de&&x(S.map.channel),aoMapUv:U&&x(S.aoMap.channel),lightMapUv:Xe&&x(S.lightMap.channel),bumpMapUv:Vt&&x(S.bumpMap.channel),normalMapUv:Wt&&x(S.normalMap.channel),displacementMapUv:At&&x(S.displacementMap.channel),emissiveMapUv:ae&&x(S.emissiveMap.channel),metalnessMapUv:wt&&x(S.metalnessMap.channel),roughnessMapUv:w&&x(S.roughnessMap.channel),anisotropyMapUv:ct&&x(S.anisotropyMap.channel),clearcoatMapUv:mt&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:$t&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:gt&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:Rt&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:Pt&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:_t&&x(S.sheenRoughnessMap.channel),specularMapUv:Xt&&x(S.specularMap.channel),specularColorMapUv:Ot&&x(S.specularColorMap.channel),specularIntensityMapUv:re&&x(S.specularIntensityMap.channel),transmissionMapUv:L&&x(S.transmissionMap.channel),thicknessMapUv:st&&x(S.thicknessMap.channel),alphaMapUv:$&&x(S.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(Wt||_),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!K.attributes.uv&&(de||$),fog:!!W,useFog:S.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Ct,skinning:z.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:Et,morphTextureStride:Bt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:me,decodeVideoTexture:de&&S.map.isVideoTexture===!0&&Kt.getTransfer(S.map.colorSpace)===te,decodeVideoTextureEmissive:ae&&S.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(S.emissiveMap.colorSpace)===te,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Mn,flipSided:S.side===Ie,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ut&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ut&&S.extensions.multiDraw===!0||Ht)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Te.vertexUv1s=c.has(1),Te.vertexUv2s=c.has(2),Te.vertexUv3s=c.has(3),c.clear(),Te}function d(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const R in S.defines)y.push(R),y.push(S.defines[R]);return S.isRawShaderMaterial===!1&&(b(y,S),E(y,S),y.push(i.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function b(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function E(S,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),S.push(o.mask)}function v(S){const y=g[S.type];let R;if(y){const B=an[y];R=ef.clone(B.uniforms)}else R=S.uniforms;return R}function k(S,y){let R;for(let B=0,z=u.length;B<z;B++){const W=u[B];if(W.cacheKey===y){R=W,++R.usedTimes;break}}return R===void 0&&(R=new m0(i,y,S,s),u.push(R)),R}function T(S){if(--S.usedTimes===0){const y=u.indexOf(S);u[y]=u[u.length-1],u.pop(),S.destroy()}}function A(S){l.remove(S)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:v,acquireProgram:k,releaseProgram:T,releaseShaderCache:A,programs:u,dispose:P}}function y0(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:s}}function M0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Wl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Xl(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function a(h,f,p,g,x,m){let d=i[t];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:g,renderOrder:h.renderOrder,z:x,group:m},i[t]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=x,d.group=m),t++,d}function o(h,f,p,g,x,m){const d=a(h,f,p,g,x,m);p.transmission>0?n.push(d):p.transparent===!0?r.push(d):e.push(d)}function l(h,f,p,g,x,m){const d=a(h,f,p,g,x,m);p.transmission>0?n.unshift(d):p.transparent===!0?r.unshift(d):e.unshift(d)}function c(h,f){e.length>1&&e.sort(h||M0),n.length>1&&n.sort(f||Wl),r.length>1&&r.sort(f||Wl)}function u(){for(let h=t,f=i.length;h<f;h++){const p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function S0(){let i=new WeakMap;function t(n,r){const s=i.get(n);let a;return s===void 0?(a=new Xl,i.set(n,[a])):r>=s.length?(a=new Xl,s.push(a)):a=s[r],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function b0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new C,color:new kt};break;case"SpotLight":e={position:new C,direction:new C,color:new kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new kt,groundColor:new kt};break;case"RectAreaLight":e={color:new kt,position:new C,halfWidth:new C,halfHeight:new C};break}return i[t.id]=e,e}}}function E0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let w0=0;function T0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function A0(i){const t=new b0,e=E0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);const r=new C,s=new ne,a=new ne;function o(c){let u=0,h=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let p=0,g=0,x=0,m=0,d=0,b=0,E=0,v=0,k=0,T=0,A=0;c.sort(T0);for(let S=0,y=c.length;S<y;S++){const R=c[S],B=R.color,z=R.intensity,W=R.distance,K=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=B.r*z,h+=B.g*z,f+=B.b*z;else if(R.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(R.sh.coefficients[V],z);A++}else if(R.isDirectionalLight){const V=t.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const Q=R.shadow,G=e.get(R);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,n.directionalShadow[p]=G,n.directionalShadowMap[p]=K,n.directionalShadowMatrix[p]=R.shadow.matrix,b++}n.directional[p]=V,p++}else if(R.isSpotLight){const V=t.get(R);V.position.setFromMatrixPosition(R.matrixWorld),V.color.copy(B).multiplyScalar(z),V.distance=W,V.coneCos=Math.cos(R.angle),V.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),V.decay=R.decay,n.spot[x]=V;const Q=R.shadow;if(R.map&&(n.spotLightMap[k]=R.map,k++,Q.updateMatrices(R),R.castShadow&&T++),n.spotLightMatrix[x]=Q.matrix,R.castShadow){const G=e.get(R);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,n.spotShadow[x]=G,n.spotShadowMap[x]=K,v++}x++}else if(R.isRectAreaLight){const V=t.get(R);V.color.copy(B).multiplyScalar(z),V.halfWidth.set(R.width*.5,0,0),V.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=V,m++}else if(R.isPointLight){const V=t.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),V.distance=R.distance,V.decay=R.decay,R.castShadow){const Q=R.shadow,G=e.get(R);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,G.shadowCameraNear=Q.camera.near,G.shadowCameraFar=Q.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=K,n.pointShadowMatrix[g]=R.shadow.matrix,E++}n.point[g]=V,g++}else if(R.isHemisphereLight){const V=t.get(R);V.skyColor.copy(R.color).multiplyScalar(z),V.groundColor.copy(R.groundColor).multiplyScalar(z),n.hemi[d]=V,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=rt.LTC_FLOAT_1,n.rectAreaLTC2=rt.LTC_FLOAT_2):(n.rectAreaLTC1=rt.LTC_HALF_1,n.rectAreaLTC2=rt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const P=n.hash;(P.directionalLength!==p||P.pointLength!==g||P.spotLength!==x||P.rectAreaLength!==m||P.hemiLength!==d||P.numDirectionalShadows!==b||P.numPointShadows!==E||P.numSpotShadows!==v||P.numSpotMaps!==k||P.numLightProbes!==A)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=v+k-T,n.spotLightMap.length=k,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,P.directionalLength=p,P.pointLength=g,P.spotLength=x,P.rectAreaLength=m,P.hemiLength=d,P.numDirectionalShadows=b,P.numPointShadows=E,P.numSpotShadows=v,P.numSpotMaps=k,P.numLightProbes=A,n.version=w0++)}function l(c,u){let h=0,f=0,p=0,g=0,x=0;const m=u.matrixWorldInverse;for(let d=0,b=c.length;d<b;d++){const E=c[d];if(E.isDirectionalLight){const v=n.directional[h];v.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),h++}else if(E.isSpotLight){const v=n.spot[p];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),p++}else if(E.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),a.identity(),s.copy(E.matrixWorld),s.premultiply(m),a.extractRotation(s),v.halfWidth.set(E.width*.5,0,0),v.halfHeight.set(0,E.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),f++}else if(E.isHemisphereLight){const v=n.hemi[x];v.direction.setFromMatrixPosition(E.matrixWorld),v.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:n}}function ql(i){const t=new A0(i),e=[],n=[];function r(u){c.camera=u,e.length=0,n.length=0}function s(u){e.push(u)}function a(u){n.push(u)}function o(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function R0(i){let t=new WeakMap;function e(r,s=0){const a=t.get(r);let o;return a===void 0?(o=new ql(i),t.set(r,[o])):s>=a.length?(o=new ql(i),a.push(o)):o=a[s],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class C0 extends Sr{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=ld,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class P0 extends Sr{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const L0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,k0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function D0(i,t,e){let n=new yo;const r=new ft,s=new ft,a=new ee,o=new C0({depthPacking:cd}),l=new P0,c={},u=e.maxTextureSize,h={[Bn]:Ie,[Ie]:Bn,[Mn]:Mn},f=new Hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ft},radius:{value:4}},vertexShader:L0,fragmentShader:k0}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new We;g.setAttribute("position",new nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new it(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lc;let d=this.type;this.render=function(T,A,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const S=i.getRenderTarget(),y=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),B=i.state;B.setBlending(On),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const z=d!==yn&&this.type===yn,W=d===yn&&this.type!==yn;for(let K=0,V=T.length;K<V;K++){const Q=T[K],G=Q.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const ot=G.getFrameExtents();if(r.multiply(ot),s.copy(G.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ot.x),r.x=s.x*ot.x,G.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ot.y),r.y=s.y*ot.y,G.mapSize.y=s.y)),G.map===null||z===!0||W===!0){const Et=this.type!==yn?{minFilter:Ve,magFilter:Ve}:{};G.map!==null&&G.map.dispose(),G.map=new ri(r.x,r.y,Et),G.map.texture.name=Q.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const pt=G.getViewportCount();for(let Et=0;Et<pt;Et++){const Bt=G.getViewport(Et);a.set(s.x*Bt.x,s.y*Bt.y,s.x*Bt.z,s.y*Bt.w),B.viewport(a),G.updateMatrices(Q,Et),n=G.getFrustum(),v(A,P,G.camera,Q,this.type)}G.isPointLightShadow!==!0&&this.type===yn&&b(G,P),G.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(S,y,R)};function b(T,A){const P=t.update(x);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ri(r.x,r.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,P,f,x,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,P,p,x,null)}function E(T,A,P,S){let y=null;const R=P.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(R!==void 0)y=R;else if(y=P.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const B=y.uuid,z=A.uuid;let W=c[B];W===void 0&&(W={},c[B]=W);let K=W[z];K===void 0&&(K=y.clone(),W[z]=K,A.addEventListener("dispose",k)),y=K}if(y.visible=A.visible,y.wireframe=A.wireframe,S===yn?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:h[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,P.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const B=i.properties.get(y);B.light=P}return y}function v(T,A,P,S,y){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&y===yn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,T.matrixWorld);const z=t.update(T),W=T.material;if(Array.isArray(W)){const K=z.groups;for(let V=0,Q=K.length;V<Q;V++){const G=K[V],ot=W[G.materialIndex];if(ot&&ot.visible){const pt=E(T,ot,S,y);T.onBeforeShadow(i,T,A,P,z,pt,G),i.renderBufferDirect(P,null,z,pt,T,G),T.onAfterShadow(i,T,A,P,z,pt,G)}}}else if(W.visible){const K=E(T,W,S,y);T.onBeforeShadow(i,T,A,P,z,K,null),i.renderBufferDirect(P,null,z,K,T,null),T.onAfterShadow(i,T,A,P,z,K,null)}}const B=T.children;for(let z=0,W=B.length;z<W;z++)v(B[z],A,P,S,y)}function k(T){T.target.removeEventListener("dispose",k);for(const P in c){const S=c[P],y=T.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}const I0={[_a]:va,[xa]:Sa,[ya]:ba,[Oi]:Ma,[va]:_a,[Sa]:xa,[ba]:ya,[Ma]:Oi};function U0(i,t){function e(){let L=!1;const st=new ee;let H=null;const $=new ee(0,0,0,0);return{setMask:function(dt){H!==dt&&!L&&(i.colorMask(dt,dt,dt,dt),H=dt)},setLocked:function(dt){L=dt},setClear:function(dt,ut,Ut,me,Te){Te===!0&&(dt*=me,ut*=me,Ut*=me),st.set(dt,ut,Ut,me),$.equals(st)===!1&&(i.clearColor(dt,ut,Ut,me),$.copy(st))},reset:function(){L=!1,H=null,$.set(-1,0,0,0)}}}function n(){let L=!1,st=!1,H=null,$=null,dt=null;return{setReversed:function(ut){if(st!==ut){const Ut=t.get("EXT_clip_control");st?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT);const me=dt;dt=null,this.setClear(me)}st=ut},getReversed:function(){return st},setTest:function(ut){ut?lt(i.DEPTH_TEST):Ct(i.DEPTH_TEST)},setMask:function(ut){H!==ut&&!L&&(i.depthMask(ut),H=ut)},setFunc:function(ut){if(st&&(ut=I0[ut]),$!==ut){switch(ut){case _a:i.depthFunc(i.NEVER);break;case va:i.depthFunc(i.ALWAYS);break;case xa:i.depthFunc(i.LESS);break;case Oi:i.depthFunc(i.LEQUAL);break;case ya:i.depthFunc(i.EQUAL);break;case Ma:i.depthFunc(i.GEQUAL);break;case Sa:i.depthFunc(i.GREATER);break;case ba:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}$=ut}},setLocked:function(ut){L=ut},setClear:function(ut){dt!==ut&&(st&&(ut=1-ut),i.clearDepth(ut),dt=ut)},reset:function(){L=!1,H=null,$=null,dt=null,st=!1}}}function r(){let L=!1,st=null,H=null,$=null,dt=null,ut=null,Ut=null,me=null,Te=null;return{setTest:function(Qt){L||(Qt?lt(i.STENCIL_TEST):Ct(i.STENCIL_TEST))},setMask:function(Qt){st!==Qt&&!L&&(i.stencilMask(Qt),st=Qt)},setFunc:function(Qt,Ke,fn){(H!==Qt||$!==Ke||dt!==fn)&&(i.stencilFunc(Qt,Ke,fn),H=Qt,$=Ke,dt=fn)},setOp:function(Qt,Ke,fn){(ut!==Qt||Ut!==Ke||me!==fn)&&(i.stencilOp(Qt,Ke,fn),ut=Qt,Ut=Ke,me=fn)},setLocked:function(Qt){L=Qt},setClear:function(Qt){Te!==Qt&&(i.clearStencil(Qt),Te=Qt)},reset:function(){L=!1,st=null,H=null,$=null,dt=null,ut=null,Ut=null,me=null,Te=null}}}const s=new e,a=new n,o=new r,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,p=[],g=null,x=!1,m=null,d=null,b=null,E=null,v=null,k=null,T=null,A=new kt(0,0,0),P=0,S=!1,y=null,R=null,B=null,z=null,W=null;const K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,Q=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(G)[1]),V=Q>=1):G.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),V=Q>=2);let ot=null,pt={};const Et=i.getParameter(i.SCISSOR_BOX),Bt=i.getParameter(i.VIEWPORT),ie=new ee().fromArray(Et),q=new ee().fromArray(Bt);function nt(L,st,H,$){const dt=new Uint8Array(4),ut=i.createTexture();i.bindTexture(L,ut),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ut=0;Ut<H;Ut++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(st,0,i.RGBA,1,1,$,0,i.RGBA,i.UNSIGNED_BYTE,dt):i.texImage2D(st+Ut,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,dt);return ut}const Mt={};Mt[i.TEXTURE_2D]=nt(i.TEXTURE_2D,i.TEXTURE_2D,1),Mt[i.TEXTURE_CUBE_MAP]=nt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Mt[i.TEXTURE_2D_ARRAY]=nt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Mt[i.TEXTURE_3D]=nt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),lt(i.DEPTH_TEST),a.setFunc(Oi),Vt(!1),Wt($o),lt(i.CULL_FACE),U(On);function lt(L){u[L]!==!0&&(i.enable(L),u[L]=!0)}function Ct(L){u[L]!==!1&&(i.disable(L),u[L]=!1)}function Dt(L,st){return h[L]!==st?(i.bindFramebuffer(L,st),h[L]=st,L===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=st),L===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=st),!0):!1}function Ht(L,st){let H=p,$=!1;if(L){H=f.get(st),H===void 0&&(H=[],f.set(st,H));const dt=L.textures;if(H.length!==dt.length||H[0]!==i.COLOR_ATTACHMENT0){for(let ut=0,Ut=dt.length;ut<Ut;ut++)H[ut]=i.COLOR_ATTACHMENT0+ut;H.length=dt.length,$=!0}}else H[0]!==i.BACK&&(H[0]=i.BACK,$=!0);$&&i.drawBuffers(H)}function de(L){return g!==L?(i.useProgram(L),g=L,!0):!1}const Yt={[Jn]:i.FUNC_ADD,[Nh]:i.FUNC_SUBTRACT,[Fh]:i.FUNC_REVERSE_SUBTRACT};Yt[Oh]=i.MIN,Yt[zh]=i.MAX;const ge={[Bh]:i.ZERO,[Hh]:i.ONE,[Gh]:i.SRC_COLOR,[ma]:i.SRC_ALPHA,[$h]:i.SRC_ALPHA_SATURATE,[qh]:i.DST_COLOR,[Wh]:i.DST_ALPHA,[Vh]:i.ONE_MINUS_SRC_COLOR,[ga]:i.ONE_MINUS_SRC_ALPHA,[Yh]:i.ONE_MINUS_DST_COLOR,[Xh]:i.ONE_MINUS_DST_ALPHA,[Kh]:i.CONSTANT_COLOR,[Zh]:i.ONE_MINUS_CONSTANT_COLOR,[Jh]:i.CONSTANT_ALPHA,[jh]:i.ONE_MINUS_CONSTANT_ALPHA};function U(L,st,H,$,dt,ut,Ut,me,Te,Qt){if(L===On){x===!0&&(Ct(i.BLEND),x=!1);return}if(x===!1&&(lt(i.BLEND),x=!0),L!==Uh){if(L!==m||Qt!==S){if((d!==Jn||v!==Jn)&&(i.blendEquation(i.FUNC_ADD),d=Jn,v=Jn),Qt)switch(L){case Li:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ko:i.blendFunc(i.ONE,i.ONE);break;case Zo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Jo:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Li:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ko:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Zo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Jo:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}b=null,E=null,k=null,T=null,A.set(0,0,0),P=0,m=L,S=Qt}return}dt=dt||st,ut=ut||H,Ut=Ut||$,(st!==d||dt!==v)&&(i.blendEquationSeparate(Yt[st],Yt[dt]),d=st,v=dt),(H!==b||$!==E||ut!==k||Ut!==T)&&(i.blendFuncSeparate(ge[H],ge[$],ge[ut],ge[Ut]),b=H,E=$,k=ut,T=Ut),(me.equals(A)===!1||Te!==P)&&(i.blendColor(me.r,me.g,me.b,Te),A.copy(me),P=Te),m=L,S=!1}function Xe(L,st){L.side===Mn?Ct(i.CULL_FACE):lt(i.CULL_FACE);let H=L.side===Ie;st&&(H=!H),Vt(H),L.blending===Li&&L.transparent===!1?U(On):U(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);const $=L.stencilWrite;o.setTest($),$&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),ae(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?lt(i.SAMPLE_ALPHA_TO_COVERAGE):Ct(i.SAMPLE_ALPHA_TO_COVERAGE)}function Vt(L){y!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),y=L)}function Wt(L){L!==kh?(lt(i.CULL_FACE),L!==R&&(L===$o?i.cullFace(i.BACK):L===Dh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ct(i.CULL_FACE),R=L}function At(L){L!==B&&(V&&i.lineWidth(L),B=L)}function ae(L,st,H){L?(lt(i.POLYGON_OFFSET_FILL),(z!==st||W!==H)&&(i.polygonOffset(st,H),z=st,W=H)):Ct(i.POLYGON_OFFSET_FILL)}function wt(L){L?lt(i.SCISSOR_TEST):Ct(i.SCISSOR_TEST)}function w(L){L===void 0&&(L=i.TEXTURE0+K-1),ot!==L&&(i.activeTexture(L),ot=L)}function _(L,st,H){H===void 0&&(ot===null?H=i.TEXTURE0+K-1:H=ot);let $=pt[H];$===void 0&&($={type:void 0,texture:void 0},pt[H]=$),($.type!==L||$.texture!==st)&&(ot!==H&&(i.activeTexture(H),ot=H),i.bindTexture(L,st||Mt[L]),$.type=L,$.texture=st)}function N(){const L=pt[ot];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Y(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function J(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function X(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function St(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ct(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function mt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function $t(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function tt(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function gt(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Rt(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Pt(L){ie.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),ie.copy(L))}function _t(L){q.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),q.copy(L))}function Xt(L,st){let H=c.get(st);H===void 0&&(H=new WeakMap,c.set(st,H));let $=H.get(L);$===void 0&&($=i.getUniformBlockIndex(st,L.name),H.set(L,$))}function Ot(L,st){const $=c.get(st).get(L);l.get(st)!==$&&(i.uniformBlockBinding(st,$,L.__bindingPointIndex),l.set(st,$))}function re(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ot=null,pt={},h={},f=new WeakMap,p=[],g=null,x=!1,m=null,d=null,b=null,E=null,v=null,k=null,T=null,A=new kt(0,0,0),P=0,S=!1,y=null,R=null,B=null,z=null,W=null,ie.set(0,0,i.canvas.width,i.canvas.height),q.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:lt,disable:Ct,bindFramebuffer:Dt,drawBuffers:Ht,useProgram:de,setBlending:U,setMaterial:Xe,setFlipSided:Vt,setCullFace:Wt,setLineWidth:At,setPolygonOffset:ae,setScissorTest:wt,activeTexture:w,bindTexture:_,unbindTexture:N,compressedTexImage2D:Y,compressedTexImage3D:J,texImage2D:gt,texImage3D:Rt,updateUBOMapping:Xt,uniformBlockBinding:Ot,texStorage2D:$t,texStorage3D:tt,texSubImage2D:X,texSubImage3D:St,compressedTexSubImage2D:ct,compressedTexSubImage3D:mt,scissor:Pt,viewport:_t,reset:re}}function Yl(i,t,e,n){const r=N0(n);switch(e){case Fc:return i*t;case zc:return i*t;case Bc:return i*t*2;case fo:return i*t/r.components*r.byteLength;case po:return i*t/r.components*r.byteLength;case Hc:return i*t*2/r.components*r.byteLength;case mo:return i*t*2/r.components*r.byteLength;case Oc:return i*t*3/r.components*r.byteLength;case en:return i*t*4/r.components*r.byteLength;case go:return i*t*4/r.components*r.byteLength;case ns:case is:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case rs:case ss:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ra:case Pa:return Math.max(i,16)*Math.max(t,8)/4;case Aa:case Ca:return Math.max(i,8)*Math.max(t,8)/2;case La:case ka:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Da:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ia:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ua:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Na:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Fa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Oa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case za:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ba:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ha:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ga:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Va:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Wa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Xa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case qa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ya:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case as:case $a:case Ka:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Gc:case Za:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ja:case ja:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function N0(i){switch(i){case Tn:case Ic:return{byteLength:1,components:1};case mr:case Uc:case xr:return{byteLength:2,components:1};case uo:case ho:return{byteLength:2,components:4};case ii:case co:case cn:return{byteLength:4,components:1};case Nc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function F0(i,t,e,n,r,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ft,u=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,_){return p?new OffscreenCanvas(w,_):_r("canvas")}function x(w,_,N){let Y=1;const J=wt(w);if((J.width>N||J.height>N)&&(Y=N/Math.max(J.width,J.height)),Y<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const X=Math.floor(Y*J.width),St=Math.floor(Y*J.height);h===void 0&&(h=g(X,St));const ct=_?g(X,St):h;return ct.width=X,ct.height=St,ct.getContext("2d").drawImage(w,0,0,X,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+X+"x"+St+")."),ct}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),w;return w}function m(w){return w.generateMipmaps}function d(w){i.generateMipmap(w)}function b(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(w,_,N,Y,J=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let X=_;if(_===i.RED&&(N===i.FLOAT&&(X=i.R32F),N===i.HALF_FLOAT&&(X=i.R16F),N===i.UNSIGNED_BYTE&&(X=i.R8)),_===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(X=i.R8UI),N===i.UNSIGNED_SHORT&&(X=i.R16UI),N===i.UNSIGNED_INT&&(X=i.R32UI),N===i.BYTE&&(X=i.R8I),N===i.SHORT&&(X=i.R16I),N===i.INT&&(X=i.R32I)),_===i.RG&&(N===i.FLOAT&&(X=i.RG32F),N===i.HALF_FLOAT&&(X=i.RG16F),N===i.UNSIGNED_BYTE&&(X=i.RG8)),_===i.RG_INTEGER&&(N===i.UNSIGNED_BYTE&&(X=i.RG8UI),N===i.UNSIGNED_SHORT&&(X=i.RG16UI),N===i.UNSIGNED_INT&&(X=i.RG32UI),N===i.BYTE&&(X=i.RG8I),N===i.SHORT&&(X=i.RG16I),N===i.INT&&(X=i.RG32I)),_===i.RGB_INTEGER&&(N===i.UNSIGNED_BYTE&&(X=i.RGB8UI),N===i.UNSIGNED_SHORT&&(X=i.RGB16UI),N===i.UNSIGNED_INT&&(X=i.RGB32UI),N===i.BYTE&&(X=i.RGB8I),N===i.SHORT&&(X=i.RGB16I),N===i.INT&&(X=i.RGB32I)),_===i.RGBA_INTEGER&&(N===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),N===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),N===i.UNSIGNED_INT&&(X=i.RGBA32UI),N===i.BYTE&&(X=i.RGBA8I),N===i.SHORT&&(X=i.RGBA16I),N===i.INT&&(X=i.RGBA32I)),_===i.RGB&&N===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),_===i.RGBA){const St=J?_s:Kt.getTransfer(Y);N===i.FLOAT&&(X=i.RGBA32F),N===i.HALF_FLOAT&&(X=i.RGBA16F),N===i.UNSIGNED_BYTE&&(X=St===te?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function v(w,_){let N;return w?_===null||_===ii||_===Hi?N=i.DEPTH24_STENCIL8:_===cn?N=i.DEPTH32F_STENCIL8:_===mr&&(N=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ii||_===Hi?N=i.DEPTH_COMPONENT24:_===cn?N=i.DEPTH_COMPONENT32F:_===mr&&(N=i.DEPTH_COMPONENT16),N}function k(w,_){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Ve&&w.minFilter!==ln?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function T(w){const _=w.target;_.removeEventListener("dispose",T),P(_),_.isVideoTexture&&u.delete(_)}function A(w){const _=w.target;_.removeEventListener("dispose",A),y(_)}function P(w){const _=n.get(w);if(_.__webglInit===void 0)return;const N=w.source,Y=f.get(N);if(Y){const J=Y[_.__cacheKey];J.usedTimes--,J.usedTimes===0&&S(w),Object.keys(Y).length===0&&f.delete(N)}n.remove(w)}function S(w){const _=n.get(w);i.deleteTexture(_.__webglTexture);const N=w.source,Y=f.get(N);delete Y[_.__cacheKey],a.memory.textures--}function y(w){const _=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let J=0;J<_.__webglFramebuffer[Y].length;J++)i.deleteFramebuffer(_.__webglFramebuffer[Y][J]);else i.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)i.deleteFramebuffer(_.__webglFramebuffer[Y]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const N=w.textures;for(let Y=0,J=N.length;Y<J;Y++){const X=n.get(N[Y]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),a.memory.textures--),n.remove(N[Y])}n.remove(w)}let R=0;function B(){R=0}function z(){const w=R;return w>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),R+=1,w}function W(w){const _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function K(w,_){const N=n.get(w);if(w.isVideoTexture&&At(w),w.isRenderTargetTexture===!1&&w.version>0&&N.__version!==w.version){const Y=w.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(N,w,_);return}}e.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+_)}function V(w,_){const N=n.get(w);if(w.version>0&&N.__version!==w.version){q(N,w,_);return}e.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+_)}function Q(w,_){const N=n.get(w);if(w.version>0&&N.__version!==w.version){q(N,w,_);return}e.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+_)}function G(w,_){const N=n.get(w);if(w.version>0&&N.__version!==w.version){nt(N,w,_);return}e.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+_)}const ot={[pr]:i.REPEAT,[ti]:i.CLAMP_TO_EDGE,[Ta]:i.MIRRORED_REPEAT},pt={[Ve]:i.NEAREST,[od]:i.NEAREST_MIPMAP_NEAREST,[Cr]:i.NEAREST_MIPMAP_LINEAR,[ln]:i.LINEAR,[ws]:i.LINEAR_MIPMAP_NEAREST,[ei]:i.LINEAR_MIPMAP_LINEAR},Et={[hd]:i.NEVER,[_d]:i.ALWAYS,[dd]:i.LESS,[Wc]:i.LEQUAL,[fd]:i.EQUAL,[gd]:i.GEQUAL,[pd]:i.GREATER,[md]:i.NOTEQUAL};function Bt(w,_){if(_.type===cn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===ln||_.magFilter===ws||_.magFilter===Cr||_.magFilter===ei||_.minFilter===ln||_.minFilter===ws||_.minFilter===Cr||_.minFilter===ei)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,ot[_.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,ot[_.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,ot[_.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,pt[_.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,pt[_.minFilter]),_.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,Et[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ve||_.minFilter!==Cr&&_.minFilter!==ei||_.type===cn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const N=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function ie(w,_){let N=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",T));const Y=_.source;let J=f.get(Y);J===void 0&&(J={},f.set(Y,J));const X=W(_);if(X!==w.__cacheKey){J[X]===void 0&&(J[X]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),J[X].usedTimes++;const St=J[w.__cacheKey];St!==void 0&&(J[w.__cacheKey].usedTimes--,St.usedTimes===0&&S(_)),w.__cacheKey=X,w.__webglTexture=J[X].texture}return N}function q(w,_,N){let Y=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=i.TEXTURE_3D);const J=ie(w,_),X=_.source;e.bindTexture(Y,w.__webglTexture,i.TEXTURE0+N);const St=n.get(X);if(X.version!==St.__version||J===!0){e.activeTexture(i.TEXTURE0+N);const ct=Kt.getPrimaries(Kt.workingColorSpace),mt=_.colorSpace===Sn?null:Kt.getPrimaries(_.colorSpace),$t=_.colorSpace===Sn||ct===mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$t);let tt=x(_.image,!1,r.maxTextureSize);tt=ae(_,tt);const gt=s.convert(_.format,_.colorSpace),Rt=s.convert(_.type);let Pt=E(_.internalFormat,gt,Rt,_.colorSpace,_.isVideoTexture);Bt(Y,_);let _t;const Xt=_.mipmaps,Ot=_.isVideoTexture!==!0,re=St.__version===void 0||J===!0,L=X.dataReady,st=k(_,tt);if(_.isDepthTexture)Pt=v(_.format===Gi,_.type),re&&(Ot?e.texStorage2D(i.TEXTURE_2D,1,Pt,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,Pt,tt.width,tt.height,0,gt,Rt,null));else if(_.isDataTexture)if(Xt.length>0){Ot&&re&&e.texStorage2D(i.TEXTURE_2D,st,Pt,Xt[0].width,Xt[0].height);for(let H=0,$=Xt.length;H<$;H++)_t=Xt[H],Ot?L&&e.texSubImage2D(i.TEXTURE_2D,H,0,0,_t.width,_t.height,gt,Rt,_t.data):e.texImage2D(i.TEXTURE_2D,H,Pt,_t.width,_t.height,0,gt,Rt,_t.data);_.generateMipmaps=!1}else Ot?(re&&e.texStorage2D(i.TEXTURE_2D,st,Pt,tt.width,tt.height),L&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,tt.width,tt.height,gt,Rt,tt.data)):e.texImage2D(i.TEXTURE_2D,0,Pt,tt.width,tt.height,0,gt,Rt,tt.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ot&&re&&e.texStorage3D(i.TEXTURE_2D_ARRAY,st,Pt,Xt[0].width,Xt[0].height,tt.depth);for(let H=0,$=Xt.length;H<$;H++)if(_t=Xt[H],_.format!==en)if(gt!==null)if(Ot){if(L)if(_.layerUpdates.size>0){const dt=Yl(_t.width,_t.height,_.format,_.type);for(const ut of _.layerUpdates){const Ut=_t.data.subarray(ut*dt/_t.data.BYTES_PER_ELEMENT,(ut+1)*dt/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,H,0,0,ut,_t.width,_t.height,1,gt,Ut)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,H,0,0,0,_t.width,_t.height,tt.depth,gt,_t.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,H,Pt,_t.width,_t.height,tt.depth,0,_t.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ot?L&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,H,0,0,0,_t.width,_t.height,tt.depth,gt,Rt,_t.data):e.texImage3D(i.TEXTURE_2D_ARRAY,H,Pt,_t.width,_t.height,tt.depth,0,gt,Rt,_t.data)}else{Ot&&re&&e.texStorage2D(i.TEXTURE_2D,st,Pt,Xt[0].width,Xt[0].height);for(let H=0,$=Xt.length;H<$;H++)_t=Xt[H],_.format!==en?gt!==null?Ot?L&&e.compressedTexSubImage2D(i.TEXTURE_2D,H,0,0,_t.width,_t.height,gt,_t.data):e.compressedTexImage2D(i.TEXTURE_2D,H,Pt,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ot?L&&e.texSubImage2D(i.TEXTURE_2D,H,0,0,_t.width,_t.height,gt,Rt,_t.data):e.texImage2D(i.TEXTURE_2D,H,Pt,_t.width,_t.height,0,gt,Rt,_t.data)}else if(_.isDataArrayTexture)if(Ot){if(re&&e.texStorage3D(i.TEXTURE_2D_ARRAY,st,Pt,tt.width,tt.height,tt.depth),L)if(_.layerUpdates.size>0){const H=Yl(tt.width,tt.height,_.format,_.type);for(const $ of _.layerUpdates){const dt=tt.data.subarray($*H/tt.data.BYTES_PER_ELEMENT,($+1)*H/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,$,tt.width,tt.height,1,gt,Rt,dt)}_.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,gt,Rt,tt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Pt,tt.width,tt.height,tt.depth,0,gt,Rt,tt.data);else if(_.isData3DTexture)Ot?(re&&e.texStorage3D(i.TEXTURE_3D,st,Pt,tt.width,tt.height,tt.depth),L&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,gt,Rt,tt.data)):e.texImage3D(i.TEXTURE_3D,0,Pt,tt.width,tt.height,tt.depth,0,gt,Rt,tt.data);else if(_.isFramebufferTexture){if(re)if(Ot)e.texStorage2D(i.TEXTURE_2D,st,Pt,tt.width,tt.height);else{let H=tt.width,$=tt.height;for(let dt=0;dt<st;dt++)e.texImage2D(i.TEXTURE_2D,dt,Pt,H,$,0,gt,Rt,null),H>>=1,$>>=1}}else if(Xt.length>0){if(Ot&&re){const H=wt(Xt[0]);e.texStorage2D(i.TEXTURE_2D,st,Pt,H.width,H.height)}for(let H=0,$=Xt.length;H<$;H++)_t=Xt[H],Ot?L&&e.texSubImage2D(i.TEXTURE_2D,H,0,0,gt,Rt,_t):e.texImage2D(i.TEXTURE_2D,H,Pt,gt,Rt,_t);_.generateMipmaps=!1}else if(Ot){if(re){const H=wt(tt);e.texStorage2D(i.TEXTURE_2D,st,Pt,H.width,H.height)}L&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,gt,Rt,tt)}else e.texImage2D(i.TEXTURE_2D,0,Pt,gt,Rt,tt);m(_)&&d(Y),St.__version=X.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function nt(w,_,N){if(_.image.length!==6)return;const Y=ie(w,_),J=_.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+N);const X=n.get(J);if(J.version!==X.__version||Y===!0){e.activeTexture(i.TEXTURE0+N);const St=Kt.getPrimaries(Kt.workingColorSpace),ct=_.colorSpace===Sn?null:Kt.getPrimaries(_.colorSpace),mt=_.colorSpace===Sn||St===ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const $t=_.isCompressedTexture||_.image[0].isCompressedTexture,tt=_.image[0]&&_.image[0].isDataTexture,gt=[];for(let $=0;$<6;$++)!$t&&!tt?gt[$]=x(_.image[$],!0,r.maxCubemapSize):gt[$]=tt?_.image[$].image:_.image[$],gt[$]=ae(_,gt[$]);const Rt=gt[0],Pt=s.convert(_.format,_.colorSpace),_t=s.convert(_.type),Xt=E(_.internalFormat,Pt,_t,_.colorSpace),Ot=_.isVideoTexture!==!0,re=X.__version===void 0||Y===!0,L=J.dataReady;let st=k(_,Rt);Bt(i.TEXTURE_CUBE_MAP,_);let H;if($t){Ot&&re&&e.texStorage2D(i.TEXTURE_CUBE_MAP,st,Xt,Rt.width,Rt.height);for(let $=0;$<6;$++){H=gt[$].mipmaps;for(let dt=0;dt<H.length;dt++){const ut=H[dt];_.format!==en?Pt!==null?Ot?L&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,dt,0,0,ut.width,ut.height,Pt,ut.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,dt,Xt,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ot?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,dt,0,0,ut.width,ut.height,Pt,_t,ut.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,dt,Xt,ut.width,ut.height,0,Pt,_t,ut.data)}}}else{if(H=_.mipmaps,Ot&&re){H.length>0&&st++;const $=wt(gt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,st,Xt,$.width,$.height)}for(let $=0;$<6;$++)if(tt){Ot?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,gt[$].width,gt[$].height,Pt,_t,gt[$].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Xt,gt[$].width,gt[$].height,0,Pt,_t,gt[$].data);for(let dt=0;dt<H.length;dt++){const Ut=H[dt].image[$].image;Ot?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,dt+1,0,0,Ut.width,Ut.height,Pt,_t,Ut.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,dt+1,Xt,Ut.width,Ut.height,0,Pt,_t,Ut.data)}}else{Ot?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Pt,_t,gt[$]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Xt,Pt,_t,gt[$]);for(let dt=0;dt<H.length;dt++){const ut=H[dt];Ot?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,dt+1,0,0,Pt,_t,ut.image[$]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,dt+1,Xt,Pt,_t,ut.image[$])}}}m(_)&&d(i.TEXTURE_CUBE_MAP),X.__version=J.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function Mt(w,_,N,Y,J,X){const St=s.convert(N.format,N.colorSpace),ct=s.convert(N.type),mt=E(N.internalFormat,St,ct,N.colorSpace),$t=n.get(_),tt=n.get(N);if(tt.__renderTarget=_,!$t.__hasExternalTextures){const gt=Math.max(1,_.width>>X),Rt=Math.max(1,_.height>>X);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?e.texImage3D(J,X,mt,gt,Rt,_.depth,0,St,ct,null):e.texImage2D(J,X,mt,gt,Rt,0,St,ct,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),Wt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,J,tt.__webglTexture,0,Vt(_)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,J,tt.__webglTexture,X),e.bindFramebuffer(i.FRAMEBUFFER,null)}function lt(w,_,N){if(i.bindRenderbuffer(i.RENDERBUFFER,w),_.depthBuffer){const Y=_.depthTexture,J=Y&&Y.isDepthTexture?Y.type:null,X=v(_.stencilBuffer,J),St=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=Vt(_);Wt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct,X,_.width,_.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,X,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,X,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,St,i.RENDERBUFFER,w)}else{const Y=_.textures;for(let J=0;J<Y.length;J++){const X=Y[J],St=s.convert(X.format,X.colorSpace),ct=s.convert(X.type),mt=E(X.internalFormat,St,ct,X.colorSpace),$t=Vt(_);N&&Wt(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,$t,mt,_.width,_.height):Wt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,$t,mt,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,mt,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ct(w,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(_.depthTexture);Y.__renderTarget=_,(!Y.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),K(_.depthTexture,0);const J=Y.__webglTexture,X=Vt(_);if(_.depthTexture.format===ki)Wt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0);else if(_.depthTexture.format===Gi)Wt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Dt(w){const _=n.get(w),N=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){const Y=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Y){const J=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Y.removeEventListener("dispose",J)};Y.addEventListener("dispose",J),_.__depthDisposeCallback=J}_.__boundDepthTexture=Y}if(w.depthTexture&&!_.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Ct(_.__webglFramebuffer,w)}else if(N){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]===void 0)_.__webglDepthbuffer[Y]=i.createRenderbuffer(),lt(_.__webglDepthbuffer[Y],w,!1);else{const J=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,X)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),lt(_.__webglDepthbuffer,w,!1);else{const Y=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,J)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ht(w,_,N){const Y=n.get(w);_!==void 0&&Mt(Y.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&Dt(w)}function de(w){const _=w.texture,N=n.get(w),Y=n.get(_);w.addEventListener("dispose",A);const J=w.textures,X=w.isWebGLCubeRenderTarget===!0,St=J.length>1;if(St||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=_.version,a.memory.textures++),X){N.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer[ct]=[];for(let mt=0;mt<_.mipmaps.length;mt++)N.__webglFramebuffer[ct][mt]=i.createFramebuffer()}else N.__webglFramebuffer[ct]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer=[];for(let ct=0;ct<_.mipmaps.length;ct++)N.__webglFramebuffer[ct]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(St)for(let ct=0,mt=J.length;ct<mt;ct++){const $t=n.get(J[ct]);$t.__webglTexture===void 0&&($t.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&Wt(w)===!1){N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let ct=0;ct<J.length;ct++){const mt=J[ct];N.__webglColorRenderbuffer[ct]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[ct]);const $t=s.convert(mt.format,mt.colorSpace),tt=s.convert(mt.type),gt=E(mt.internalFormat,$t,tt,mt.colorSpace,w.isXRRenderTarget===!0),Rt=Vt(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt,gt,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,N.__webglColorRenderbuffer[ct])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),lt(N.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Bt(i.TEXTURE_CUBE_MAP,_);for(let ct=0;ct<6;ct++)if(_.mipmaps&&_.mipmaps.length>0)for(let mt=0;mt<_.mipmaps.length;mt++)Mt(N.__webglFramebuffer[ct][mt],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,mt);else Mt(N.__webglFramebuffer[ct],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);m(_)&&d(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let ct=0,mt=J.length;ct<mt;ct++){const $t=J[ct],tt=n.get($t);e.bindTexture(i.TEXTURE_2D,tt.__webglTexture),Bt(i.TEXTURE_2D,$t),Mt(N.__webglFramebuffer,w,$t,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,0),m($t)&&d(i.TEXTURE_2D)}e.unbindTexture()}else{let ct=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ct=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ct,Y.__webglTexture),Bt(ct,_),_.mipmaps&&_.mipmaps.length>0)for(let mt=0;mt<_.mipmaps.length;mt++)Mt(N.__webglFramebuffer[mt],w,_,i.COLOR_ATTACHMENT0,ct,mt);else Mt(N.__webglFramebuffer,w,_,i.COLOR_ATTACHMENT0,ct,0);m(_)&&d(ct),e.unbindTexture()}w.depthBuffer&&Dt(w)}function Yt(w){const _=w.textures;for(let N=0,Y=_.length;N<Y;N++){const J=_[N];if(m(J)){const X=b(w),St=n.get(J).__webglTexture;e.bindTexture(X,St),d(X),e.unbindTexture()}}}const ge=[],U=[];function Xe(w){if(w.samples>0){if(Wt(w)===!1){const _=w.textures,N=w.width,Y=w.height;let J=i.COLOR_BUFFER_BIT;const X=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,St=n.get(w),ct=_.length>1;if(ct)for(let mt=0;mt<_.length;mt++)e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let mt=0;mt<_.length;mt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),ct){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,St.__webglColorRenderbuffer[mt]);const $t=n.get(_[mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,$t,0)}i.blitFramebuffer(0,0,N,Y,0,0,N,Y,J,i.NEAREST),l===!0&&(ge.length=0,U.length=0,ge.push(i.COLOR_ATTACHMENT0+mt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(ge.push(X),U.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,U)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ge))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ct)for(let mt=0;mt<_.length;mt++){e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,St.__webglColorRenderbuffer[mt]);const $t=n.get(_[mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,$t,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const _=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function Vt(w){return Math.min(r.maxSamples,w.samples)}function Wt(w){const _=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function At(w){const _=a.render.frame;u.get(w)!==_&&(u.set(w,_),w.update())}function ae(w,_){const N=w.colorSpace,Y=w.format,J=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||N!==Wi&&N!==Sn&&(Kt.getTransfer(N)===te?(Y!==en||J!==Tn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),_}function wt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=B,this.setTexture2D=K,this.setTexture2DArray=V,this.setTexture3D=Q,this.setTextureCube=G,this.rebindTextures=Ht,this.setupRenderTarget=de,this.updateRenderTargetMipmap=Yt,this.updateMultisampleRenderTarget=Xe,this.setupDepthRenderbuffer=Dt,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=Wt}function O0(i,t){function e(n,r=Sn){let s;const a=Kt.getTransfer(r);if(n===Tn)return i.UNSIGNED_BYTE;if(n===uo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ho)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Nc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ic)return i.BYTE;if(n===Uc)return i.SHORT;if(n===mr)return i.UNSIGNED_SHORT;if(n===co)return i.INT;if(n===ii)return i.UNSIGNED_INT;if(n===cn)return i.FLOAT;if(n===xr)return i.HALF_FLOAT;if(n===Fc)return i.ALPHA;if(n===Oc)return i.RGB;if(n===en)return i.RGBA;if(n===zc)return i.LUMINANCE;if(n===Bc)return i.LUMINANCE_ALPHA;if(n===ki)return i.DEPTH_COMPONENT;if(n===Gi)return i.DEPTH_STENCIL;if(n===fo)return i.RED;if(n===po)return i.RED_INTEGER;if(n===Hc)return i.RG;if(n===mo)return i.RG_INTEGER;if(n===go)return i.RGBA_INTEGER;if(n===ns||n===is||n===rs||n===ss)if(a===te)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===ns)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===is)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===rs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ss)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===ns)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===is)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===rs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ss)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Aa||n===Ra||n===Ca||n===Pa)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Aa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ra)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ca)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Pa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===La||n===ka||n===Da)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===La||n===ka)return a===te?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Da)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ia||n===Ua||n===Na||n===Fa||n===Oa||n===za||n===Ba||n===Ha||n===Ga||n===Va||n===Wa||n===Xa||n===qa||n===Ya)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ia)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ua)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Na)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Fa)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Oa)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===za)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ba)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ha)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ga)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Va)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Wa)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Xa)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===qa)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ya)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===as||n===$a||n===Ka)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===as)return a===te?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===$a)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ka)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Gc||n===Za||n===Ja||n===ja)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===as)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Za)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ja)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ja)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Hi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class z0 extends He{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ue extends Ee{constructor(){super(),this.isGroup=!0,this.type="Group"}}const B0={type:"move"};class js{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ue,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ue,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ue,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),d=this._getHandJoint(c,x);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(B0)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ue;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const H0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,G0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class V0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const r=new Ce,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Hn({vertexShader:H0,fragmentShader:G0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new it(new Yi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class W0 extends Xi{constructor(t,e){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,f=null,p=null,g=null;const x=new V0,m=e.getContextAttributes();let d=null,b=null;const E=[],v=[],k=new ft;let T=null;const A=new He;A.viewport=new ee;const P=new He;P.viewport=new ee;const S=[A,P],y=new z0;let R=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let nt=E[q];return nt===void 0&&(nt=new js,E[q]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(q){let nt=E[q];return nt===void 0&&(nt=new js,E[q]=nt),nt.getGripSpace()},this.getHand=function(q){let nt=E[q];return nt===void 0&&(nt=new js,E[q]=nt),nt.getHandSpace()};function z(q){const nt=v.indexOf(q.inputSource);if(nt===-1)return;const Mt=E[nt];Mt!==void 0&&(Mt.update(q.inputSource,q.frame,c||a),Mt.dispatchEvent({type:q.type,data:q.inputSource}))}function W(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",K);for(let q=0;q<E.length;q++){const nt=v[q];nt!==null&&(v[q]=null,E[q].disconnect(nt))}R=null,B=null,x.reset(),t.setRenderTarget(d),p=null,f=null,h=null,r=null,b=null,ie.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(k.width,k.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(d=t.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",W),r.addEventListener("inputsourceschange",K),m.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(k),r.renderState.layers===void 0){const nt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,e,nt),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new ri(p.framebufferWidth,p.framebufferHeight,{format:en,type:Tn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let nt=null,Mt=null,lt=null;m.depth&&(lt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=m.stencil?Gi:ki,Mt=m.stencil?Hi:ii);const Ct={colorFormat:e.RGBA8,depthFormat:lt,scaleFactor:s};h=new XRWebGLBinding(r,e),f=h.createProjectionLayer(Ct),r.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),b=new ri(f.textureWidth,f.textureHeight,{format:en,type:Tn,depthTexture:new iu(f.textureWidth,f.textureHeight,Mt,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),ie.setContext(r),ie.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function K(q){for(let nt=0;nt<q.removed.length;nt++){const Mt=q.removed[nt],lt=v.indexOf(Mt);lt>=0&&(v[lt]=null,E[lt].disconnect(Mt))}for(let nt=0;nt<q.added.length;nt++){const Mt=q.added[nt];let lt=v.indexOf(Mt);if(lt===-1){for(let Dt=0;Dt<E.length;Dt++)if(Dt>=v.length){v.push(Mt),lt=Dt;break}else if(v[Dt]===null){v[Dt]=Mt,lt=Dt;break}if(lt===-1)break}const Ct=E[lt];Ct&&Ct.connect(Mt)}}const V=new C,Q=new C;function G(q,nt,Mt){V.setFromMatrixPosition(nt.matrixWorld),Q.setFromMatrixPosition(Mt.matrixWorld);const lt=V.distanceTo(Q),Ct=nt.projectionMatrix.elements,Dt=Mt.projectionMatrix.elements,Ht=Ct[14]/(Ct[10]-1),de=Ct[14]/(Ct[10]+1),Yt=(Ct[9]+1)/Ct[5],ge=(Ct[9]-1)/Ct[5],U=(Ct[8]-1)/Ct[0],Xe=(Dt[8]+1)/Dt[0],Vt=Ht*U,Wt=Ht*Xe,At=lt/(-U+Xe),ae=At*-U;if(nt.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(ae),q.translateZ(At),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Ct[10]===-1)q.projectionMatrix.copy(nt.projectionMatrix),q.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const wt=Ht+At,w=de+At,_=Vt-ae,N=Wt+(lt-ae),Y=Yt*de/w*wt,J=ge*de/w*wt;q.projectionMatrix.makePerspective(_,N,Y,J,wt,w),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function ot(q,nt){nt===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(nt.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let nt=q.near,Mt=q.far;x.texture!==null&&(x.depthNear>0&&(nt=x.depthNear),x.depthFar>0&&(Mt=x.depthFar)),y.near=P.near=A.near=nt,y.far=P.far=A.far=Mt,(R!==y.near||B!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),R=y.near,B=y.far),A.layers.mask=q.layers.mask|2,P.layers.mask=q.layers.mask|4,y.layers.mask=A.layers.mask|P.layers.mask;const lt=q.parent,Ct=y.cameras;ot(y,lt);for(let Dt=0;Dt<Ct.length;Dt++)ot(Ct[Dt],lt);Ct.length===2?G(y,A,P):y.projectionMatrix.copy(A.projectionMatrix),pt(q,y,lt)};function pt(q,nt,Mt){Mt===null?q.matrix.copy(nt.matrixWorld):(q.matrix.copy(Mt.matrixWorld),q.matrix.invert(),q.matrix.multiply(nt.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(nt.projectionMatrix),q.projectionMatrixInverse.copy(nt.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=gr*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(q){l=q,f!==null&&(f.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(y)};let Et=null;function Bt(q,nt){if(u=nt.getViewerPose(c||a),g=nt,u!==null){const Mt=u.views;p!==null&&(t.setRenderTargetFramebuffer(b,p.framebuffer),t.setRenderTarget(b));let lt=!1;Mt.length!==y.cameras.length&&(y.cameras.length=0,lt=!0);for(let Dt=0;Dt<Mt.length;Dt++){const Ht=Mt[Dt];let de=null;if(p!==null)de=p.getViewport(Ht);else{const ge=h.getViewSubImage(f,Ht);de=ge.viewport,Dt===0&&(t.setRenderTargetTextures(b,ge.colorTexture,f.ignoreDepthValues?void 0:ge.depthStencilTexture),t.setRenderTarget(b))}let Yt=S[Dt];Yt===void 0&&(Yt=new He,Yt.layers.enable(Dt),Yt.viewport=new ee,S[Dt]=Yt),Yt.matrix.fromArray(Ht.transform.matrix),Yt.matrix.decompose(Yt.position,Yt.quaternion,Yt.scale),Yt.projectionMatrix.fromArray(Ht.projectionMatrix),Yt.projectionMatrixInverse.copy(Yt.projectionMatrix).invert(),Yt.viewport.set(de.x,de.y,de.width,de.height),Dt===0&&(y.matrix.copy(Yt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),lt===!0&&y.cameras.push(Yt)}const Ct=r.enabledFeatures;if(Ct&&Ct.includes("depth-sensing")){const Dt=h.getDepthInformation(Mt[0]);Dt&&Dt.isValid&&Dt.texture&&x.init(t,Dt,r.renderState)}}for(let Mt=0;Mt<E.length;Mt++){const lt=v[Mt],Ct=E[Mt];lt!==null&&Ct!==void 0&&Ct.update(lt,nt,c||a)}Et&&Et(q,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),g=null}const ie=new eu;ie.setAnimationLoop(Bt),this.setAnimationLoop=function(q){Et=q},this.dispose=function(){}}}const $n=new hn,X0=new ne;function q0(i,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,jc(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,b,E,v){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),h(m,d)):d.isMeshPhongMaterial?(s(m,d),u(m,d)):d.isMeshStandardMaterial?(s(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,v)):d.isMeshMatcapMaterial?(s(m,d),g(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),x(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,b,E):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Ie&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Ie&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const b=t.get(d),E=b.envMap,v=b.envMapRotation;E&&(m.envMap.value=E,$n.copy(v),$n.x*=-1,$n.y*=-1,$n.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&($n.y*=-1,$n.z*=-1),m.envMapRotation.value.setFromMatrix4(X0.makeRotationFromEuler($n)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,b,E){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*b,m.scale.value=E*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,b){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ie&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function x(m,d){const b=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Y0(i,t,e,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,E){const v=E.program;n.uniformBlockBinding(b,v)}function c(b,E){let v=r[b.id];v===void 0&&(g(b),v=u(b),r[b.id]=v,b.addEventListener("dispose",m));const k=E.program;n.updateUBOMapping(b,k);const T=t.render.frame;s[b.id]!==T&&(f(b),s[b.id]=T)}function u(b){const E=h();b.__bindingPointIndex=E;const v=i.createBuffer(),k=b.__size,T=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,k,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,v),v}function h(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const E=r[b.id],v=b.uniforms,k=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let T=0,A=v.length;T<A;T++){const P=Array.isArray(v[T])?v[T]:[v[T]];for(let S=0,y=P.length;S<y;S++){const R=P[S];if(p(R,T,S,k)===!0){const B=R.__offset,z=Array.isArray(R.value)?R.value:[R.value];let W=0;for(let K=0;K<z.length;K++){const V=z[K],Q=x(V);typeof V=="number"||typeof V=="boolean"?(R.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,B+W,R.__data)):V.isMatrix3?(R.__data[0]=V.elements[0],R.__data[1]=V.elements[1],R.__data[2]=V.elements[2],R.__data[3]=0,R.__data[4]=V.elements[3],R.__data[5]=V.elements[4],R.__data[6]=V.elements[5],R.__data[7]=0,R.__data[8]=V.elements[6],R.__data[9]=V.elements[7],R.__data[10]=V.elements[8],R.__data[11]=0):(V.toArray(R.__data,W),W+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(b,E,v,k){const T=b.value,A=E+"_"+v;if(k[A]===void 0)return typeof T=="number"||typeof T=="boolean"?k[A]=T:k[A]=T.clone(),!0;{const P=k[A];if(typeof T=="number"||typeof T=="boolean"){if(P!==T)return k[A]=T,!0}else if(P.equals(T)===!1)return P.copy(T),!0}return!1}function g(b){const E=b.uniforms;let v=0;const k=16;for(let A=0,P=E.length;A<P;A++){const S=Array.isArray(E[A])?E[A]:[E[A]];for(let y=0,R=S.length;y<R;y++){const B=S[y],z=Array.isArray(B.value)?B.value:[B.value];for(let W=0,K=z.length;W<K;W++){const V=z[W],Q=x(V),G=v%k,ot=G%Q.boundary,pt=G+ot;v+=ot,pt!==0&&k-pt<Q.storage&&(v+=k-pt),B.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=v,v+=Q.storage}}}const T=v%k;return T>0&&(v+=k-T),b.__size=v,b.__cache={},this}function x(b){const E={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(E.boundary=4,E.storage=4):b.isVector2?(E.boundary=8,E.storage=8):b.isVector3||b.isColor?(E.boundary=16,E.storage=12):b.isVector4?(E.boundary=16,E.storage=16):b.isMatrix3?(E.boundary=48,E.storage=48):b.isMatrix4?(E.boundary=64,E.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),E}function m(b){const E=b.target;E.removeEventListener("dispose",m);const v=a.indexOf(E.__bindingPointIndex);a.splice(v,1),i.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function d(){for(const b in r)i.deleteBuffer(r[b]);a=[],r={},s={}}return{bind:l,update:c,dispose:d}}class $0{constructor(t={}){const{canvas:e=Ud(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,d=null;const b=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Be,this.toneMapping=zn,this.toneMappingExposure=1;const v=this;let k=!1,T=0,A=0,P=null,S=-1,y=null;const R=new ee,B=new ee;let z=null;const W=new kt(0);let K=0,V=e.width,Q=e.height,G=1,ot=null,pt=null;const Et=new ee(0,0,V,Q),Bt=new ee(0,0,V,Q);let ie=!1;const q=new yo;let nt=!1,Mt=!1;const lt=new ne,Ct=new ne,Dt=new C,Ht=new ee,de={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Yt=!1;function ge(){return P===null?G:1}let U=n;function Xe(M,D){return e.getContext(M,D)}try{const M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${oo}`),e.addEventListener("webglcontextlost",$,!1),e.addEventListener("webglcontextrestored",dt,!1),e.addEventListener("webglcontextcreationerror",ut,!1),U===null){const D="webgl2";if(U=Xe(D,M),U===null)throw Xe(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let Vt,Wt,At,ae,wt,w,_,N,Y,J,X,St,ct,mt,$t,tt,gt,Rt,Pt,_t,Xt,Ot,re,L;function st(){Vt=new Qm(U),Vt.init(),Ot=new O0(U,Vt),Wt=new Ym(U,Vt,t,Ot),At=new U0(U,Vt),Wt.reverseDepthBuffer&&f&&At.buffers.depth.setReversed(!0),ae=new ng(U),wt=new y0,w=new F0(U,Vt,At,wt,Wt,Ot,ae),_=new Km(v),N=new jm(v),Y=new cf(U),re=new Xm(U,Y),J=new tg(U,Y,ae,re),X=new rg(U,J,Y,ae),Pt=new ig(U,Wt,w),tt=new $m(wt),St=new x0(v,_,N,Vt,Wt,re,tt),ct=new q0(v,wt),mt=new S0,$t=new R0(Vt),Rt=new Wm(v,_,N,At,X,p,l),gt=new D0(v,X,Wt),L=new Y0(U,ae,Wt,At),_t=new qm(U,Vt,ae),Xt=new eg(U,Vt,ae),ae.programs=St.programs,v.capabilities=Wt,v.extensions=Vt,v.properties=wt,v.renderLists=mt,v.shadowMap=gt,v.state=At,v.info=ae}st();const H=new W0(v,U);this.xr=H,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const M=Vt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Vt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(M){M!==void 0&&(G=M,this.setSize(V,Q,!1))},this.getSize=function(M){return M.set(V,Q)},this.setSize=function(M,D,F=!0){if(H.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=M,Q=D,e.width=Math.floor(M*G),e.height=Math.floor(D*G),F===!0&&(e.style.width=M+"px",e.style.height=D+"px"),this.setViewport(0,0,M,D)},this.getDrawingBufferSize=function(M){return M.set(V*G,Q*G).floor()},this.setDrawingBufferSize=function(M,D,F){V=M,Q=D,G=F,e.width=Math.floor(M*F),e.height=Math.floor(D*F),this.setViewport(0,0,M,D)},this.getCurrentViewport=function(M){return M.copy(R)},this.getViewport=function(M){return M.copy(Et)},this.setViewport=function(M,D,F,O){M.isVector4?Et.set(M.x,M.y,M.z,M.w):Et.set(M,D,F,O),At.viewport(R.copy(Et).multiplyScalar(G).round())},this.getScissor=function(M){return M.copy(Bt)},this.setScissor=function(M,D,F,O){M.isVector4?Bt.set(M.x,M.y,M.z,M.w):Bt.set(M,D,F,O),At.scissor(B.copy(Bt).multiplyScalar(G).round())},this.getScissorTest=function(){return ie},this.setScissorTest=function(M){At.setScissorTest(ie=M)},this.setOpaqueSort=function(M){ot=M},this.setTransparentSort=function(M){pt=M},this.getClearColor=function(M){return M.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor.apply(Rt,arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha.apply(Rt,arguments)},this.clear=function(M=!0,D=!0,F=!0){let O=0;if(M){let I=!1;if(P!==null){const et=P.texture.format;I=et===go||et===mo||et===po}if(I){const et=P.texture.type,ht=et===Tn||et===ii||et===mr||et===Hi||et===uo||et===ho,vt=Rt.getClearColor(),xt=Rt.getClearAlpha(),Lt=vt.r,Nt=vt.g,yt=vt.b;ht?(g[0]=Lt,g[1]=Nt,g[2]=yt,g[3]=xt,U.clearBufferuiv(U.COLOR,0,g)):(x[0]=Lt,x[1]=Nt,x[2]=yt,x[3]=xt,U.clearBufferiv(U.COLOR,0,x))}else O|=U.COLOR_BUFFER_BIT}D&&(O|=U.DEPTH_BUFFER_BIT),F&&(O|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",$,!1),e.removeEventListener("webglcontextrestored",dt,!1),e.removeEventListener("webglcontextcreationerror",ut,!1),mt.dispose(),$t.dispose(),wt.dispose(),_.dispose(),N.dispose(),X.dispose(),re.dispose(),L.dispose(),St.dispose(),H.dispose(),H.removeEventListener("sessionstart",Ro),H.removeEventListener("sessionend",Co),Gn.stop()};function $(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),k=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),k=!1;const M=ae.autoReset,D=gt.enabled,F=gt.autoUpdate,O=gt.needsUpdate,I=gt.type;st(),ae.autoReset=M,gt.enabled=D,gt.autoUpdate=F,gt.needsUpdate=O,gt.type=I}function ut(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Ut(M){const D=M.target;D.removeEventListener("dispose",Ut),me(D)}function me(M){Te(M),wt.remove(M)}function Te(M){const D=wt.get(M).programs;D!==void 0&&(D.forEach(function(F){St.releaseProgram(F)}),M.isShaderMaterial&&St.releaseShaderCache(M))}this.renderBufferDirect=function(M,D,F,O,I,et){D===null&&(D=de);const ht=I.isMesh&&I.matrixWorld.determinant()<0,vt=xu(M,D,F,O,I);At.setMaterial(O,ht);let xt=F.index,Lt=1;if(O.wireframe===!0){if(xt=J.getWireframeAttribute(F),xt===void 0)return;Lt=2}const Nt=F.drawRange,yt=F.attributes.position;let Zt=Nt.start*Lt,se=(Nt.start+Nt.count)*Lt;et!==null&&(Zt=Math.max(Zt,et.start*Lt),se=Math.min(se,(et.start+et.count)*Lt)),xt!==null?(Zt=Math.max(Zt,0),se=Math.min(se,xt.count)):yt!=null&&(Zt=Math.max(Zt,0),se=Math.min(se,yt.count));const oe=se-Zt;if(oe<0||oe===1/0)return;re.setup(I,O,vt,F,xt);let De,Jt=_t;if(xt!==null&&(De=Y.get(xt),Jt=Xt,Jt.setIndex(De)),I.isMesh)O.wireframe===!0?(At.setLineWidth(O.wireframeLinewidth*ge()),Jt.setMode(U.LINES)):Jt.setMode(U.TRIANGLES);else if(I.isLine){let bt=O.linewidth;bt===void 0&&(bt=1),At.setLineWidth(bt*ge()),I.isLineSegments?Jt.setMode(U.LINES):I.isLineLoop?Jt.setMode(U.LINE_LOOP):Jt.setMode(U.LINE_STRIP)}else I.isPoints?Jt.setMode(U.POINTS):I.isSprite&&Jt.setMode(U.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)Jt.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(Vt.get("WEBGL_multi_draw"))Jt.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const bt=I._multiDrawStarts,pn=I._multiDrawCounts,jt=I._multiDrawCount,Ze=xt?Y.get(xt).bytesPerElement:1,oi=wt.get(O).currentProgram.getUniforms();for(let Ne=0;Ne<jt;Ne++)oi.setValue(U,"_gl_DrawID",Ne),Jt.render(bt[Ne]/Ze,pn[Ne])}else if(I.isInstancedMesh)Jt.renderInstances(Zt,oe,I.count);else if(F.isInstancedBufferGeometry){const bt=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,pn=Math.min(F.instanceCount,bt);Jt.renderInstances(Zt,oe,pn)}else Jt.render(Zt,oe)};function Qt(M,D,F){M.transparent===!0&&M.side===Mn&&M.forceSinglePass===!1?(M.side=Ie,M.needsUpdate=!0,Er(M,D,F),M.side=Bn,M.needsUpdate=!0,Er(M,D,F),M.side=Mn):Er(M,D,F)}this.compile=function(M,D,F=null){F===null&&(F=M),d=$t.get(F),d.init(D),E.push(d),F.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),M!==F&&M.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),d.setupLights();const O=new Set;return M.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const et=I.material;if(et)if(Array.isArray(et))for(let ht=0;ht<et.length;ht++){const vt=et[ht];Qt(vt,F,I),O.add(vt)}else Qt(et,F,I),O.add(et)}),E.pop(),d=null,O},this.compileAsync=function(M,D,F=null){const O=this.compile(M,D,F);return new Promise(I=>{function et(){if(O.forEach(function(ht){wt.get(ht).currentProgram.isReady()&&O.delete(ht)}),O.size===0){I(M);return}setTimeout(et,10)}Vt.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let Ke=null;function fn(M){Ke&&Ke(M)}function Ro(){Gn.stop()}function Co(){Gn.start()}const Gn=new eu;Gn.setAnimationLoop(fn),typeof self<"u"&&Gn.setContext(self),this.setAnimationLoop=function(M){Ke=M,H.setAnimationLoop(M),M===null?Gn.stop():Gn.start()},H.addEventListener("sessionstart",Ro),H.addEventListener("sessionend",Co),this.render=function(M,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),H.enabled===!0&&H.isPresenting===!0&&(H.cameraAutoUpdate===!0&&H.updateCamera(D),D=H.getCamera()),M.isScene===!0&&M.onBeforeRender(v,M,D,P),d=$t.get(M,E.length),d.init(D),E.push(d),Ct.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),q.setFromProjectionMatrix(Ct),Mt=this.localClippingEnabled,nt=tt.init(this.clippingPlanes,Mt),m=mt.get(M,b.length),m.init(),b.push(m),H.enabled===!0&&H.isPresenting===!0){const et=v.xr.getDepthSensingMesh();et!==null&&ys(et,D,-1/0,v.sortObjects)}ys(M,D,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(ot,pt),Yt=H.enabled===!1||H.isPresenting===!1||H.hasDepthSensing()===!1,Yt&&Rt.addToRenderList(m,M),this.info.render.frame++,nt===!0&&tt.beginShadows();const F=d.state.shadowsArray;gt.render(F,M,D),nt===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset();const O=m.opaque,I=m.transmissive;if(d.setupLights(),D.isArrayCamera){const et=D.cameras;if(I.length>0)for(let ht=0,vt=et.length;ht<vt;ht++){const xt=et[ht];Lo(O,I,M,xt)}Yt&&Rt.render(M);for(let ht=0,vt=et.length;ht<vt;ht++){const xt=et[ht];Po(m,M,xt,xt.viewport)}}else I.length>0&&Lo(O,I,M,D),Yt&&Rt.render(M),Po(m,M,D);P!==null&&(w.updateMultisampleRenderTarget(P),w.updateRenderTargetMipmap(P)),M.isScene===!0&&M.onAfterRender(v,M,D),re.resetDefaultState(),S=-1,y=null,E.pop(),E.length>0?(d=E[E.length-1],nt===!0&&tt.setGlobalState(v.clippingPlanes,d.state.camera)):d=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function ys(M,D,F,O){if(M.visible===!1)return;if(M.layers.test(D.layers)){if(M.isGroup)F=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(D);else if(M.isLight)d.pushLight(M),M.castShadow&&d.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||q.intersectsSprite(M)){O&&Ht.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Ct);const ht=X.update(M),vt=M.material;vt.visible&&m.push(M,ht,vt,F,Ht.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||q.intersectsObject(M))){const ht=X.update(M),vt=M.material;if(O&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ht.copy(M.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Ht.copy(ht.boundingSphere.center)),Ht.applyMatrix4(M.matrixWorld).applyMatrix4(Ct)),Array.isArray(vt)){const xt=ht.groups;for(let Lt=0,Nt=xt.length;Lt<Nt;Lt++){const yt=xt[Lt],Zt=vt[yt.materialIndex];Zt&&Zt.visible&&m.push(M,ht,Zt,F,Ht.z,yt)}}else vt.visible&&m.push(M,ht,vt,F,Ht.z,null)}}const et=M.children;for(let ht=0,vt=et.length;ht<vt;ht++)ys(et[ht],D,F,O)}function Po(M,D,F,O){const I=M.opaque,et=M.transmissive,ht=M.transparent;d.setupLightsView(F),nt===!0&&tt.setGlobalState(v.clippingPlanes,F),O&&At.viewport(R.copy(O)),I.length>0&&br(I,D,F),et.length>0&&br(et,D,F),ht.length>0&&br(ht,D,F),At.buffers.depth.setTest(!0),At.buffers.depth.setMask(!0),At.buffers.color.setMask(!0),At.setPolygonOffset(!1)}function Lo(M,D,F,O){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[O.id]===void 0&&(d.state.transmissionRenderTarget[O.id]=new ri(1,1,{generateMipmaps:!0,type:Vt.has("EXT_color_buffer_half_float")||Vt.has("EXT_color_buffer_float")?xr:Tn,minFilter:ei,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace}));const et=d.state.transmissionRenderTarget[O.id],ht=O.viewport||R;et.setSize(ht.z,ht.w);const vt=v.getRenderTarget();v.setRenderTarget(et),v.getClearColor(W),K=v.getClearAlpha(),K<1&&v.setClearColor(16777215,.5),v.clear(),Yt&&Rt.render(F);const xt=v.toneMapping;v.toneMapping=zn;const Lt=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),d.setupLightsView(O),nt===!0&&tt.setGlobalState(v.clippingPlanes,O),br(M,F,O),w.updateMultisampleRenderTarget(et),w.updateRenderTargetMipmap(et),Vt.has("WEBGL_multisampled_render_to_texture")===!1){let Nt=!1;for(let yt=0,Zt=D.length;yt<Zt;yt++){const se=D[yt],oe=se.object,De=se.geometry,Jt=se.material,bt=se.group;if(Jt.side===Mn&&oe.layers.test(O.layers)){const pn=Jt.side;Jt.side=Ie,Jt.needsUpdate=!0,ko(oe,F,O,De,Jt,bt),Jt.side=pn,Jt.needsUpdate=!0,Nt=!0}}Nt===!0&&(w.updateMultisampleRenderTarget(et),w.updateRenderTargetMipmap(et))}v.setRenderTarget(vt),v.setClearColor(W,K),Lt!==void 0&&(O.viewport=Lt),v.toneMapping=xt}function br(M,D,F){const O=D.isScene===!0?D.overrideMaterial:null;for(let I=0,et=M.length;I<et;I++){const ht=M[I],vt=ht.object,xt=ht.geometry,Lt=O===null?ht.material:O,Nt=ht.group;vt.layers.test(F.layers)&&ko(vt,D,F,xt,Lt,Nt)}}function ko(M,D,F,O,I,et){M.onBeforeRender(v,D,F,O,I,et),M.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),I.onBeforeRender(v,D,F,O,M,et),I.transparent===!0&&I.side===Mn&&I.forceSinglePass===!1?(I.side=Ie,I.needsUpdate=!0,v.renderBufferDirect(F,D,O,I,M,et),I.side=Bn,I.needsUpdate=!0,v.renderBufferDirect(F,D,O,I,M,et),I.side=Mn):v.renderBufferDirect(F,D,O,I,M,et),M.onAfterRender(v,D,F,O,I,et)}function Er(M,D,F){D.isScene!==!0&&(D=de);const O=wt.get(M),I=d.state.lights,et=d.state.shadowsArray,ht=I.state.version,vt=St.getParameters(M,I.state,et,D,F),xt=St.getProgramCacheKey(vt);let Lt=O.programs;O.environment=M.isMeshStandardMaterial?D.environment:null,O.fog=D.fog,O.envMap=(M.isMeshStandardMaterial?N:_).get(M.envMap||O.environment),O.envMapRotation=O.environment!==null&&M.envMap===null?D.environmentRotation:M.envMapRotation,Lt===void 0&&(M.addEventListener("dispose",Ut),Lt=new Map,O.programs=Lt);let Nt=Lt.get(xt);if(Nt!==void 0){if(O.currentProgram===Nt&&O.lightsStateVersion===ht)return Io(M,vt),Nt}else vt.uniforms=St.getUniforms(M),M.onBeforeCompile(vt,v),Nt=St.acquireProgram(vt,xt),Lt.set(xt,Nt),O.uniforms=vt.uniforms;const yt=O.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(yt.clippingPlanes=tt.uniform),Io(M,vt),O.needsLights=Mu(M),O.lightsStateVersion=ht,O.needsLights&&(yt.ambientLightColor.value=I.state.ambient,yt.lightProbe.value=I.state.probe,yt.directionalLights.value=I.state.directional,yt.directionalLightShadows.value=I.state.directionalShadow,yt.spotLights.value=I.state.spot,yt.spotLightShadows.value=I.state.spotShadow,yt.rectAreaLights.value=I.state.rectArea,yt.ltc_1.value=I.state.rectAreaLTC1,yt.ltc_2.value=I.state.rectAreaLTC2,yt.pointLights.value=I.state.point,yt.pointLightShadows.value=I.state.pointShadow,yt.hemisphereLights.value=I.state.hemi,yt.directionalShadowMap.value=I.state.directionalShadowMap,yt.directionalShadowMatrix.value=I.state.directionalShadowMatrix,yt.spotShadowMap.value=I.state.spotShadowMap,yt.spotLightMatrix.value=I.state.spotLightMatrix,yt.spotLightMap.value=I.state.spotLightMap,yt.pointShadowMap.value=I.state.pointShadowMap,yt.pointShadowMatrix.value=I.state.pointShadowMatrix),O.currentProgram=Nt,O.uniformsList=null,Nt}function Do(M){if(M.uniformsList===null){const D=M.currentProgram.getUniforms();M.uniformsList=os.seqWithValue(D.seq,M.uniforms)}return M.uniformsList}function Io(M,D){const F=wt.get(M);F.outputColorSpace=D.outputColorSpace,F.batching=D.batching,F.batchingColor=D.batchingColor,F.instancing=D.instancing,F.instancingColor=D.instancingColor,F.instancingMorph=D.instancingMorph,F.skinning=D.skinning,F.morphTargets=D.morphTargets,F.morphNormals=D.morphNormals,F.morphColors=D.morphColors,F.morphTargetsCount=D.morphTargetsCount,F.numClippingPlanes=D.numClippingPlanes,F.numIntersection=D.numClipIntersection,F.vertexAlphas=D.vertexAlphas,F.vertexTangents=D.vertexTangents,F.toneMapping=D.toneMapping}function xu(M,D,F,O,I){D.isScene!==!0&&(D=de),w.resetTextureUnits();const et=D.fog,ht=O.isMeshStandardMaterial?D.environment:null,vt=P===null?v.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Wi,xt=(O.isMeshStandardMaterial?N:_).get(O.envMap||ht),Lt=O.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Nt=!!F.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),yt=!!F.morphAttributes.position,Zt=!!F.morphAttributes.normal,se=!!F.morphAttributes.color;let oe=zn;O.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(oe=v.toneMapping);const De=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Jt=De!==void 0?De.length:0,bt=wt.get(O),pn=d.state.lights;if(nt===!0&&(Mt===!0||M!==y)){const qe=M===y&&O.id===S;tt.setState(O,M,qe)}let jt=!1;O.version===bt.__version?(bt.needsLights&&bt.lightsStateVersion!==pn.state.version||bt.outputColorSpace!==vt||I.isBatchedMesh&&bt.batching===!1||!I.isBatchedMesh&&bt.batching===!0||I.isBatchedMesh&&bt.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&bt.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&bt.instancing===!1||!I.isInstancedMesh&&bt.instancing===!0||I.isSkinnedMesh&&bt.skinning===!1||!I.isSkinnedMesh&&bt.skinning===!0||I.isInstancedMesh&&bt.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&bt.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&bt.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&bt.instancingMorph===!1&&I.morphTexture!==null||bt.envMap!==xt||O.fog===!0&&bt.fog!==et||bt.numClippingPlanes!==void 0&&(bt.numClippingPlanes!==tt.numPlanes||bt.numIntersection!==tt.numIntersection)||bt.vertexAlphas!==Lt||bt.vertexTangents!==Nt||bt.morphTargets!==yt||bt.morphNormals!==Zt||bt.morphColors!==se||bt.toneMapping!==oe||bt.morphTargetsCount!==Jt)&&(jt=!0):(jt=!0,bt.__version=O.version);let Ze=bt.currentProgram;jt===!0&&(Ze=Er(O,D,I));let oi=!1,Ne=!1,Zi=!1;const le=Ze.getUniforms(),sn=bt.uniforms;if(At.useProgram(Ze.program)&&(oi=!0,Ne=!0,Zi=!0),O.id!==S&&(S=O.id,Ne=!0),oi||y!==M){At.buffers.depth.getReversed()?(lt.copy(M.projectionMatrix),Fd(lt),Od(lt),le.setValue(U,"projectionMatrix",lt)):le.setValue(U,"projectionMatrix",M.projectionMatrix),le.setValue(U,"viewMatrix",M.matrixWorldInverse);const Rn=le.map.cameraPosition;Rn!==void 0&&Rn.setValue(U,Dt.setFromMatrixPosition(M.matrixWorld)),Wt.logarithmicDepthBuffer&&le.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&le.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),y!==M&&(y=M,Ne=!0,Zi=!0)}if(I.isSkinnedMesh){le.setOptional(U,I,"bindMatrix"),le.setOptional(U,I,"bindMatrixInverse");const qe=I.skeleton;qe&&(qe.boneTexture===null&&qe.computeBoneTexture(),le.setValue(U,"boneTexture",qe.boneTexture,w))}I.isBatchedMesh&&(le.setOptional(U,I,"batchingTexture"),le.setValue(U,"batchingTexture",I._matricesTexture,w),le.setOptional(U,I,"batchingIdTexture"),le.setValue(U,"batchingIdTexture",I._indirectTexture,w),le.setOptional(U,I,"batchingColorTexture"),I._colorsTexture!==null&&le.setValue(U,"batchingColorTexture",I._colorsTexture,w));const Ji=F.morphAttributes;if((Ji.position!==void 0||Ji.normal!==void 0||Ji.color!==void 0)&&Pt.update(I,F,Ze),(Ne||bt.receiveShadow!==I.receiveShadow)&&(bt.receiveShadow=I.receiveShadow,le.setValue(U,"receiveShadow",I.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(sn.envMap.value=xt,sn.flipEnvMap.value=xt.isCubeTexture&&xt.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&D.environment!==null&&(sn.envMapIntensity.value=D.environmentIntensity),Ne&&(le.setValue(U,"toneMappingExposure",v.toneMappingExposure),bt.needsLights&&yu(sn,Zi),et&&O.fog===!0&&ct.refreshFogUniforms(sn,et),ct.refreshMaterialUniforms(sn,O,G,Q,d.state.transmissionRenderTarget[M.id]),os.upload(U,Do(bt),sn,w)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(os.upload(U,Do(bt),sn,w),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&le.setValue(U,"center",I.center),le.setValue(U,"modelViewMatrix",I.modelViewMatrix),le.setValue(U,"normalMatrix",I.normalMatrix),le.setValue(U,"modelMatrix",I.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const qe=O.uniformsGroups;for(let Rn=0,Cn=qe.length;Rn<Cn;Rn++){const Uo=qe[Rn];L.update(Uo,Ze),L.bind(Uo,Ze)}}return Ze}function yu(M,D){M.ambientLightColor.needsUpdate=D,M.lightProbe.needsUpdate=D,M.directionalLights.needsUpdate=D,M.directionalLightShadows.needsUpdate=D,M.pointLights.needsUpdate=D,M.pointLightShadows.needsUpdate=D,M.spotLights.needsUpdate=D,M.spotLightShadows.needsUpdate=D,M.rectAreaLights.needsUpdate=D,M.hemisphereLights.needsUpdate=D}function Mu(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(M,D,F){wt.get(M.texture).__webglTexture=D,wt.get(M.depthTexture).__webglTexture=F;const O=wt.get(M);O.__hasExternalTextures=!0,O.__autoAllocateDepthBuffer=F===void 0,O.__autoAllocateDepthBuffer||Vt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),O.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(M,D){const F=wt.get(M);F.__webglFramebuffer=D,F.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(M,D=0,F=0){P=M,T=D,A=F;let O=!0,I=null,et=!1,ht=!1;if(M){const xt=wt.get(M);if(xt.__useDefaultFramebuffer!==void 0)At.bindFramebuffer(U.FRAMEBUFFER,null),O=!1;else if(xt.__webglFramebuffer===void 0)w.setupRenderTarget(M);else if(xt.__hasExternalTextures)w.rebindTextures(M,wt.get(M.texture).__webglTexture,wt.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const yt=M.depthTexture;if(xt.__boundDepthTexture!==yt){if(yt!==null&&wt.has(yt)&&(M.width!==yt.image.width||M.height!==yt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(M)}}const Lt=M.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(ht=!0);const Nt=wt.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Nt[D])?I=Nt[D][F]:I=Nt[D],et=!0):M.samples>0&&w.useMultisampledRTT(M)===!1?I=wt.get(M).__webglMultisampledFramebuffer:Array.isArray(Nt)?I=Nt[F]:I=Nt,R.copy(M.viewport),B.copy(M.scissor),z=M.scissorTest}else R.copy(Et).multiplyScalar(G).floor(),B.copy(Bt).multiplyScalar(G).floor(),z=ie;if(At.bindFramebuffer(U.FRAMEBUFFER,I)&&O&&At.drawBuffers(M,I),At.viewport(R),At.scissor(B),At.setScissorTest(z),et){const xt=wt.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,xt.__webglTexture,F)}else if(ht){const xt=wt.get(M.texture),Lt=D||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,xt.__webglTexture,F||0,Lt)}S=-1},this.readRenderTargetPixels=function(M,D,F,O,I,et,ht){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=wt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ht!==void 0&&(vt=vt[ht]),vt){At.bindFramebuffer(U.FRAMEBUFFER,vt);try{const xt=M.texture,Lt=xt.format,Nt=xt.type;if(!Wt.textureFormatReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Wt.textureTypeReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=M.width-O&&F>=0&&F<=M.height-I&&U.readPixels(D,F,O,I,Ot.convert(Lt),Ot.convert(Nt),et)}finally{const xt=P!==null?wt.get(P).__webglFramebuffer:null;At.bindFramebuffer(U.FRAMEBUFFER,xt)}}},this.readRenderTargetPixelsAsync=async function(M,D,F,O,I,et,ht){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=wt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ht!==void 0&&(vt=vt[ht]),vt){const xt=M.texture,Lt=xt.format,Nt=xt.type;if(!Wt.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Wt.textureTypeReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=M.width-O&&F>=0&&F<=M.height-I){At.bindFramebuffer(U.FRAMEBUFFER,vt);const yt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,yt),U.bufferData(U.PIXEL_PACK_BUFFER,et.byteLength,U.STREAM_READ),U.readPixels(D,F,O,I,Ot.convert(Lt),Ot.convert(Nt),0);const Zt=P!==null?wt.get(P).__webglFramebuffer:null;At.bindFramebuffer(U.FRAMEBUFFER,Zt);const se=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Nd(U,se,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,yt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,et),U.deleteBuffer(yt),U.deleteSync(se),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(M,D=null,F=0){M.isTexture!==!0&&(sr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,M=arguments[1]);const O=Math.pow(2,-F),I=Math.floor(M.image.width*O),et=Math.floor(M.image.height*O),ht=D!==null?D.x:0,vt=D!==null?D.y:0;w.setTexture2D(M,0),U.copyTexSubImage2D(U.TEXTURE_2D,F,0,0,ht,vt,I,et),At.unbindTexture()},this.copyTextureToTexture=function(M,D,F=null,O=null,I=0){M.isTexture!==!0&&(sr("WebGLRenderer: copyTextureToTexture function signature has changed."),O=arguments[0]||null,M=arguments[1],D=arguments[2],I=arguments[3]||0,F=null);let et,ht,vt,xt,Lt,Nt,yt,Zt,se;const oe=M.isCompressedTexture?M.mipmaps[I]:M.image;F!==null?(et=F.max.x-F.min.x,ht=F.max.y-F.min.y,vt=F.isBox3?F.max.z-F.min.z:1,xt=F.min.x,Lt=F.min.y,Nt=F.isBox3?F.min.z:0):(et=oe.width,ht=oe.height,vt=oe.depth||1,xt=0,Lt=0,Nt=0),O!==null?(yt=O.x,Zt=O.y,se=O.z):(yt=0,Zt=0,se=0);const De=Ot.convert(D.format),Jt=Ot.convert(D.type);let bt;D.isData3DTexture?(w.setTexture3D(D,0),bt=U.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(w.setTexture2DArray(D,0),bt=U.TEXTURE_2D_ARRAY):(w.setTexture2D(D,0),bt=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,D.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,D.unpackAlignment);const pn=U.getParameter(U.UNPACK_ROW_LENGTH),jt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Ze=U.getParameter(U.UNPACK_SKIP_PIXELS),oi=U.getParameter(U.UNPACK_SKIP_ROWS),Ne=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,oe.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,oe.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,xt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Lt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Nt);const Zi=M.isDataArrayTexture||M.isData3DTexture,le=D.isDataArrayTexture||D.isData3DTexture;if(M.isRenderTargetTexture||M.isDepthTexture){const sn=wt.get(M),Ji=wt.get(D),qe=wt.get(sn.__renderTarget),Rn=wt.get(Ji.__renderTarget);At.bindFramebuffer(U.READ_FRAMEBUFFER,qe.__webglFramebuffer),At.bindFramebuffer(U.DRAW_FRAMEBUFFER,Rn.__webglFramebuffer);for(let Cn=0;Cn<vt;Cn++)Zi&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,wt.get(M).__webglTexture,I,Nt+Cn),M.isDepthTexture?(le&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,wt.get(D).__webglTexture,I,se+Cn),U.blitFramebuffer(xt,Lt,et,ht,yt,Zt,et,ht,U.DEPTH_BUFFER_BIT,U.NEAREST)):le?U.copyTexSubImage3D(bt,I,yt,Zt,se+Cn,xt,Lt,et,ht):U.copyTexSubImage2D(bt,I,yt,Zt,se+Cn,xt,Lt,et,ht);At.bindFramebuffer(U.READ_FRAMEBUFFER,null),At.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else le?M.isDataTexture||M.isData3DTexture?U.texSubImage3D(bt,I,yt,Zt,se,et,ht,vt,De,Jt,oe.data):D.isCompressedArrayTexture?U.compressedTexSubImage3D(bt,I,yt,Zt,se,et,ht,vt,De,oe.data):U.texSubImage3D(bt,I,yt,Zt,se,et,ht,vt,De,Jt,oe):M.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,I,yt,Zt,et,ht,De,Jt,oe.data):M.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,I,yt,Zt,oe.width,oe.height,De,oe.data):U.texSubImage2D(U.TEXTURE_2D,I,yt,Zt,et,ht,De,Jt,oe);U.pixelStorei(U.UNPACK_ROW_LENGTH,pn),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,jt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Ze),U.pixelStorei(U.UNPACK_SKIP_ROWS,oi),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ne),I===0&&D.generateMipmaps&&U.generateMipmap(bt),At.unbindTexture()},this.copyTextureToTexture3D=function(M,D,F=null,O=null,I=0){return M.isTexture!==!0&&(sr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,O=arguments[1]||null,M=arguments[2],D=arguments[3],I=arguments[4]||0),sr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(M,D,F,O,I)},this.initRenderTarget=function(M){wt.get(M).__webglFramebuffer===void 0&&w.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?w.setTextureCube(M,0):M.isData3DTexture?w.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?w.setTexture2DArray(M,0):w.setTexture2D(M,0),At.unbindTexture()},this.resetState=function(){T=0,A=0,P=null,At.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}}class Ii{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new kt(t),this.density=e}clone(){return new Ii(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class K0 extends Ee{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hn,this.environmentIntensity=1,this.environmentRotation=new hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Z0 extends Ce{constructor(t=null,e=1,n=1,r,s,a,o,l,c=Ve,u=Ve,h,f){super(null,a,o,l,c,u,r,s,h,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $l extends nn{constructor(t,e,n,r=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const bi=new ne,Kl=new ne,Zr=[],Zl=new si,J0=new ne,nr=new it,ir=new Mr;class j0 extends it{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new $l(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,J0)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new si),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,bi),Zl.copy(t.boundingBox).applyMatrix4(bi),this.boundingBox.union(Zl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Mr),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,bi),ir.copy(t.boundingSphere).applyMatrix4(bi),this.boundingSphere.union(ir)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=t*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(t,e){const n=this.matrixWorld,r=this.count;if(nr.geometry=this.geometry,nr.material=this.material,nr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ir.copy(this.boundingSphere),ir.applyMatrix4(n),t.ray.intersectsSphere(ir)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,bi),Kl.multiplyMatrices(n,bi),nr.matrixWorld=Kl,nr.raycast(t,Zr);for(let a=0,o=Zr.length;a<o;a++){const l=Zr[a];l.instanceId=s,l.object=this,e.push(l)}Zr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new $l(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Z0(new Float32Array(r*this.count),r,this.count,fo,cn));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*t;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class dn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,r=this.getPoint(0),s=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),s+=n.distanceTo(r),e.push(s),r=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let r=0;const s=n.length;let a;e?a=e:a=t*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===a)return r/(s-1);const u=n[r],f=n[r+1]-u,p=(a-u)/f;return(r+p)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=e||(a.isVector2?new ft:new C);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new C,r=[],s=[],a=[],o=new C,l=new ne;for(let p=0;p<=t;p++){const g=p/t;r[p]=this.getTangentAt(g,new C)}s[0]=new C,a[0]=new C;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),f=Math.abs(r[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let p=1;p<=t;p++){if(s[p]=s[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(r[p-1],r[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Se(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(o,g))}a[p].crossVectors(r[p],s[p])}if(e===!0){let p=Math.acos(Se(s[0].dot(s[t]),-1,1));p/=t,r[0].dot(o.crossVectors(s[0],s[t]))>0&&(p=-p);for(let g=1;g<=t;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],p*g)),a[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class So extends dn{constructor(t=0,e=0,n=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ft){const n=e,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*u-p*h+this.aX,c=f*h+p*u+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Q0 extends So{constructor(t,e,n,r,s,a){super(t,e,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function bo(){let i=0,t=0,e=0,n=0;function r(s,a,o,l){i=s,t=o,e=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,h){let f=(a-s)/c-(o-s)/(c+u)+(o-a)/u,p=(o-a)/u-(l-a)/(u+h)+(l-o)/h;f*=u,p*=u,r(a,o,f,p)},calc:function(s){const a=s*s,o=a*s;return i+t*s+e*a+n*o}}}const Jr=new C,Qs=new bo,ta=new bo,ea=new bo;class t_ extends dn{constructor(t=[],e=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=r}getPoint(t,e=new C){const n=e,r=this.points,s=r.length,a=(s-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(Jr.subVectors(r[0],r[1]).add(r[0]),c=Jr);const h=r[o%s],f=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(Jr.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Jr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),p),x=Math.pow(h.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(u),p);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),Qs.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,g,x,m),ta.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,g,x,m),ea.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,g,x,m)}else this.curveType==="catmullrom"&&(Qs.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),ta.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),ea.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return n.set(Qs.calc(l),ta.calc(l),ea.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new C().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Jl(i,t,e,n,r){const s=(n-t)*.5,a=(r-e)*.5,o=i*i,l=i*o;return(2*e-2*n+s+a)*l+(-3*e+3*n-2*s-a)*o+s*i+e}function e_(i,t){const e=1-i;return e*e*t}function n_(i,t){return 2*(1-i)*i*t}function i_(i,t){return i*i*t}function ur(i,t,e,n){return e_(i,t)+n_(i,e)+i_(i,n)}function r_(i,t){const e=1-i;return e*e*e*t}function s_(i,t){const e=1-i;return 3*e*e*i*t}function a_(i,t){return 3*(1-i)*i*i*t}function o_(i,t){return i*i*i*t}function hr(i,t,e,n,r){return r_(i,t)+s_(i,e)+a_(i,n)+o_(i,r)}class lu extends dn{constructor(t=new ft,e=new ft,n=new ft,r=new ft){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new ft){const n=e,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(hr(t,r.x,s.x,a.x,o.x),hr(t,r.y,s.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class l_ extends dn{constructor(t=new C,e=new C,n=new C,r=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new C){const n=e,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(hr(t,r.x,s.x,a.x,o.x),hr(t,r.y,s.y,a.y,o.y),hr(t,r.z,s.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class cu extends dn{constructor(t=new ft,e=new ft){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ft){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ft){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class c_ extends dn{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class uu extends dn{constructor(t=new ft,e=new ft,n=new ft){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ft){const n=e,r=this.v0,s=this.v1,a=this.v2;return n.set(ur(t,r.x,s.x,a.x),ur(t,r.y,s.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class u_ extends dn{constructor(t=new C,e=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new C){const n=e,r=this.v0,s=this.v1,a=this.v2;return n.set(ur(t,r.x,s.x,a.x),ur(t,r.y,s.y,a.y),ur(t,r.z,s.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class hu extends dn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ft){const n=e,r=this.points,s=(r.length-1)*t,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],u=r[a>r.length-2?r.length-1:a+1],h=r[a>r.length-3?r.length-1:a+2];return n.set(Jl(o,l.x,c.x,u.x,h.x),Jl(o,l.y,c.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new ft().fromArray(r))}return this}}var jl=Object.freeze({__proto__:null,ArcCurve:Q0,CatmullRomCurve3:t_,CubicBezierCurve:lu,CubicBezierCurve3:l_,EllipseCurve:So,LineCurve:cu,LineCurve3:c_,QuadraticBezierCurve:uu,QuadraticBezierCurve3:u_,SplineCurve:hu});class h_ extends dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new jl[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const a=r[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,r=this.curves.length;n<r;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(new jl[r.type]().fromJSON(r))}return this}}class d_ extends h_{constructor(t){super(),this.type="Path",this.currentPoint=new ft,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new cu(this.currentPoint.clone(),new ft(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,r){const s=new uu(this.currentPoint.clone(),new ft(t,e),new ft(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(t,e,n,r,s,a){const o=new lu(this.currentPoint.clone(),new ft(t,e),new ft(n,r),new ft(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new hu(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,r,s,a),this}absarc(t,e,n,r,s,a){return this.absellipse(t,e,n,n,r,s,a),this}ellipse(t,e,n,r,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,n,r,s,a,o,l),this}absellipse(t,e,n,r,s,a,o,l){const c=new So(t,e,n,r,s,a,o,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Eo extends We{constructor(t=[new ft(0,-.5),new ft(.5,0),new ft(0,.5)],e=12,n=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:r},e=Math.floor(e),r=Se(r,0,Math.PI*2);const s=[],a=[],o=[],l=[],c=[],u=1/e,h=new C,f=new ft,p=new C,g=new C,x=new C;let m=0,d=0;for(let b=0;b<=t.length-1;b++)switch(b){case 0:m=t[b+1].x-t[b].x,d=t[b+1].y-t[b].y,p.x=d*1,p.y=-m,p.z=d*0,x.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case t.length-1:l.push(x.x,x.y,x.z);break;default:m=t[b+1].x-t[b].x,d=t[b+1].y-t[b].y,p.x=d*1,p.y=-m,p.z=d*0,g.copy(p),p.x+=x.x,p.y+=x.y,p.z+=x.z,p.normalize(),l.push(p.x,p.y,p.z),x.copy(g)}for(let b=0;b<=e;b++){const E=n+b*u*r,v=Math.sin(E),k=Math.cos(E);for(let T=0;T<=t.length-1;T++){h.x=t[T].x*v,h.y=t[T].y,h.z=t[T].x*k,a.push(h.x,h.y,h.z),f.x=b/e,f.y=T/(t.length-1),o.push(f.x,f.y);const A=l[3*T+0]*v,P=l[3*T+1],S=l[3*T+0]*k;c.push(A,P,S)}}for(let b=0;b<e;b++)for(let E=0;E<t.length-1;E++){const v=E+b*t.length,k=v,T=v+t.length,A=v+t.length+1,P=v+1;s.push(k,T,P),s.push(A,P,T)}this.setIndex(s),this.setAttribute("position",new he(a,3)),this.setAttribute("uv",new he(o,2)),this.setAttribute("normal",new he(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Eo(t.points,t.segments,t.phiStart,t.phiLength)}}class on extends Eo{constructor(t=1,e=1,n=4,r=8){const s=new d_;s.absarc(0,-e/2,t,Math.PI*1.5,0),s.absarc(0,e/2,t,0,Math.PI*.5),super(s.getPoints(n),r),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:r}}static fromJSON(t){return new on(t.radius,t.length,t.capSegments,t.radialSegments)}}class Ki extends We{constructor(t=1,e=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:r},e=Math.max(3,e);const s=[],a=[],o=[],l=[],c=new C,u=new ft;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=e;h++,f+=3){const p=n+h/e*r;c.x=t*Math.cos(p),c.y=t*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[f]/t+1)/2,u.y=(a[f+1]/t+1)/2,l.push(u.x,u.y)}for(let h=1;h<=e;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new he(a,3)),this.setAttribute("normal",new he(o,3)),this.setAttribute("uv",new he(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ki(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class qt extends We{constructor(t=1,e=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],f=[],p=[];let g=0;const x=[],m=n/2;let d=0;b(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new he(h,3)),this.setAttribute("normal",new he(f,3)),this.setAttribute("uv",new he(p,2));function b(){const v=new C,k=new C;let T=0;const A=(e-t)/n;for(let P=0;P<=s;P++){const S=[],y=P/s,R=y*(e-t)+t;for(let B=0;B<=r;B++){const z=B/r,W=z*l+o,K=Math.sin(W),V=Math.cos(W);k.x=R*K,k.y=-y*n+m,k.z=R*V,h.push(k.x,k.y,k.z),v.set(K,A,V).normalize(),f.push(v.x,v.y,v.z),p.push(z,1-y),S.push(g++)}x.push(S)}for(let P=0;P<r;P++)for(let S=0;S<s;S++){const y=x[S][P],R=x[S+1][P],B=x[S+1][P+1],z=x[S][P+1];(t>0||S!==0)&&(u.push(y,R,z),T+=3),(e>0||S!==s-1)&&(u.push(R,B,z),T+=3)}c.addGroup(d,T,0),d+=T}function E(v){const k=g,T=new ft,A=new C;let P=0;const S=v===!0?t:e,y=v===!0?1:-1;for(let B=1;B<=r;B++)h.push(0,m*y,0),f.push(0,y,0),p.push(.5,.5),g++;const R=g;for(let B=0;B<=r;B++){const W=B/r*l+o,K=Math.cos(W),V=Math.sin(W);A.x=S*V,A.y=m*y,A.z=S*K,h.push(A.x,A.y,A.z),f.push(0,y,0),T.x=K*.5+.5,T.y=V*.5*y+.5,p.push(T.x,T.y),g++}for(let B=0;B<r;B++){const z=k+B,W=R+B;v===!0?u.push(W,W+1,z):u.push(W+1,W,z),P+=3}c.addGroup(d,P,v===!0?1:2),d+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class be extends qt{constructor(t=1,e=1,n=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,t,e,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(t){return new be(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class wo extends We{constructor(t=[],e=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:r};const s=[],a=[];o(r),c(n),u(),this.setAttribute("position",new he(s,3)),this.setAttribute("normal",new he(s.slice(),3)),this.setAttribute("uv",new he(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(b){const E=new C,v=new C,k=new C;for(let T=0;T<e.length;T+=3)p(e[T+0],E),p(e[T+1],v),p(e[T+2],k),l(E,v,k,b)}function l(b,E,v,k){const T=k+1,A=[];for(let P=0;P<=T;P++){A[P]=[];const S=b.clone().lerp(v,P/T),y=E.clone().lerp(v,P/T),R=T-P;for(let B=0;B<=R;B++)B===0&&P===T?A[P][B]=S:A[P][B]=S.clone().lerp(y,B/R)}for(let P=0;P<T;P++)for(let S=0;S<2*(T-P)-1;S++){const y=Math.floor(S/2);S%2===0?(f(A[P][y+1]),f(A[P+1][y]),f(A[P][y])):(f(A[P][y+1]),f(A[P+1][y+1]),f(A[P+1][y]))}}function c(b){const E=new C;for(let v=0;v<s.length;v+=3)E.x=s[v+0],E.y=s[v+1],E.z=s[v+2],E.normalize().multiplyScalar(b),s[v+0]=E.x,s[v+1]=E.y,s[v+2]=E.z}function u(){const b=new C;for(let E=0;E<s.length;E+=3){b.x=s[E+0],b.y=s[E+1],b.z=s[E+2];const v=m(b)/2/Math.PI+.5,k=d(b)/Math.PI+.5;a.push(v,1-k)}g(),h()}function h(){for(let b=0;b<a.length;b+=6){const E=a[b+0],v=a[b+2],k=a[b+4],T=Math.max(E,v,k),A=Math.min(E,v,k);T>.9&&A<.1&&(E<.2&&(a[b+0]+=1),v<.2&&(a[b+2]+=1),k<.2&&(a[b+4]+=1))}}function f(b){s.push(b.x,b.y,b.z)}function p(b,E){const v=b*3;E.x=t[v+0],E.y=t[v+1],E.z=t[v+2]}function g(){const b=new C,E=new C,v=new C,k=new C,T=new ft,A=new ft,P=new ft;for(let S=0,y=0;S<s.length;S+=9,y+=6){b.set(s[S+0],s[S+1],s[S+2]),E.set(s[S+3],s[S+4],s[S+5]),v.set(s[S+6],s[S+7],s[S+8]),T.set(a[y+0],a[y+1]),A.set(a[y+2],a[y+3]),P.set(a[y+4],a[y+5]),k.copy(b).add(E).add(v).divideScalar(3);const R=m(k);x(T,y+0,b,R),x(A,y+2,E,R),x(P,y+4,v,R)}}function x(b,E,v,k){k<0&&b.x===1&&(a[E]=b.x-1),v.x===0&&v.z===0&&(a[E]=k/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function d(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wo(t.vertices,t.indices,t.radius,t.details)}}class Ge extends wo{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,r,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ge(t.radius,t.detail)}}class fe extends We{constructor(t=1,e=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new C,f=new C,p=[],g=[],x=[],m=[];for(let d=0;d<=n;d++){const b=[],E=d/n;let v=0;d===0&&a===0?v=.5/e:d===n&&l===Math.PI&&(v=-.5/e);for(let k=0;k<=e;k++){const T=k/e;h.x=-t*Math.cos(r+T*s)*Math.sin(a+E*o),h.y=t*Math.cos(a+E*o),h.z=t*Math.sin(r+T*s)*Math.sin(a+E*o),g.push(h.x,h.y,h.z),f.copy(h).normalize(),x.push(f.x,f.y,f.z),m.push(T+v,1-E),b.push(c++)}u.push(b)}for(let d=0;d<n;d++)for(let b=0;b<e;b++){const E=u[d][b+1],v=u[d][b],k=u[d+1][b],T=u[d+1][b+1];(d!==0||a>0)&&p.push(E,v,T),(d!==n-1||l<Math.PI)&&p.push(v,k,T)}this.setIndex(p),this.setAttribute("position",new he(g,3)),this.setAttribute("normal",new he(x,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fe(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ai extends We{constructor(t=1,e=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const a=[],o=[],l=[],c=[],u=new C,h=new C,f=new C;for(let p=0;p<=n;p++)for(let g=0;g<=r;g++){const x=g/r*s,m=p/n*Math.PI*2;h.x=(t+e*Math.cos(m))*Math.cos(x),h.y=(t+e*Math.cos(m))*Math.sin(x),h.z=e*Math.sin(m),o.push(h.x,h.y,h.z),u.x=t*Math.cos(x),u.y=t*Math.sin(x),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(g/r),c.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=r;g++){const x=(r+1)*p+g-1,m=(r+1)*(p-1)+g-1,d=(r+1)*(p-1)+g,b=(r+1)*p+g;a.push(x,m,b),a.push(m,d,b)}this.setIndex(a),this.setAttribute("position",new he(o,3)),this.setAttribute("normal",new he(l,3)),this.setAttribute("uv",new he(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ai(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ke extends Sr{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vc,this.normalScale=new ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=lo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Ql={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class f_{constructor(t,e,n){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){const p=c[h],g=c[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null}}}const p_=new f_;class To{constructor(t){this.manager=t!==void 0?t:p_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(r,s){n.load(t,r,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}To.DEFAULT_MATERIAL_NAME="__DEFAULT";class m_ extends To{constructor(t){super(t)}load(t,e,n,r){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,a=Ql.get(t);if(a!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(a),s.manager.itemEnd(t)},0),a;const o=_r("img");function l(){u(),Ql.add(t,this),e&&e(this),s.manager.itemEnd(t)}function c(h){u(),r&&r(h),s.manager.itemError(t),s.manager.itemEnd(t)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(t),o.src=t,o}}class g_ extends To{constructor(t){super(t)}load(t,e,n,r){const s=new Ce,a=new m_(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){s.image=o,s.needsUpdate=!0,e!==void 0&&e(s)},n,r),s}}class xs extends Ee{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new kt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class __ extends xs{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.groundColor=new kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const na=new ne,tc=new C,ec=new C;class du{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ft(512,512),this.map=null,this.mapPass=null,this.matrix=new ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new yo,this._frameExtents=new ft(1,1),this._viewportCount=1,this._viewports=[new ee(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;tc.setFromMatrixPosition(t.matrixWorld),e.position.copy(tc),ec.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ec),e.updateMatrixWorld(),na.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(na),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(na)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const nc=new ne,rr=new C,ia=new C;class v_ extends du{constructor(){super(new He(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ft(4,2),this._viewportCount=6,this._viewports=[new ee(2,1,1,1),new ee(0,1,1,1),new ee(3,1,1,1),new ee(1,1,1,1),new ee(3,0,1,1),new ee(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,r=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),rr.setFromMatrixPosition(t.matrixWorld),n.position.copy(rr),ia.copy(n.position),ia.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(ia),n.updateMatrixWorld(),r.makeTranslation(-rr.x,-rr.y,-rr.z),nc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(nc)}}class to extends xs{constructor(t,e,n=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new v_}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class x_ extends du{constructor(){super(new nu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class y_ extends xs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.target=new Ee,this.shadow=new x_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class M_ extends xs{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const ic=new ne;class S_{constructor(t,e,n=0,r=1/0){this.ray=new $c(t,e),this.near=n,this.far=r,this.camera=null,this.layers=new vo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ic.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ic),this}intersectObject(t,e=!0,n=[]){return eo(t,this,n,e),n.sort(rc),n}intersectObjects(t,e=!0,n=[]){for(let r=0,s=t.length;r<s;r++)eo(t[r],this,n,e);return n.sort(rc),n}}function rc(i,t){return i.distance-t.distance}function eo(i,t,e,n){let r=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)eo(s[a],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:oo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=oo);function ra(i){return`./${i.replace(/^\//,"")}`}const b_=new g_;function sa(i,t,e){const n=b_.load(i);return n.colorSpace=t?Be:Sn,n.wrapS=pr,n.wrapT=pr,n.repeat.set(e,e),n.anisotropy=1,n.generateMipmaps=!0,n}function An(i,t){return{map:sa(ra(`/pbr/${i}/diff.jpg`),!0,t),normal:sa(ra(`/pbr/${i}/nor.jpg`),!1,t),rough:sa(ra(`/pbr/${i}/rough.jpg`),!1,t),repeat:t}}const fu=An("stone",2.2),E_=An("wall",2),pu=An("wood",2.4),w_=An("plaster",2),mu=An("roof",3.2),T_=An("ground",6),A_=An("cobble",4),R_=An("barrel",1),C_=An("beam",2.2),un={wood:pu.map,stone:fu.map,tile:mu.map},P_={stone:fu,wall:E_,wood:pu,plaster:w_,tile:mu,sand:T_,cobble:A_,barrel:R_,beam:C_},sc=new Map;function rn(i,t,e={}){const n=`${t.uuid}:${i}:${e.emissive??0}:${e.emit??0}`,r=sc.get(n);if(r)return r;const s=new ke({color:i,map:t,emissive:e.emissive??0,emissiveIntensity:e.emit??0});return sc.set(n,s),s}function ze(i,t=16777215,e={}){const n=P_[i];return rn(t,n.map)}const ac=new Map;function pe(i,t={}){const e=`${i}:${t.emissive??0}:${t.emit??0}`,n=ac.get(e);if(n)return n;const r=new ke({color:i,emissive:t.emissive??0,emissiveIntensity:t.emit??0});return ac.set(e,r),r}function L_(i,t,e,n=!0){n&&(i.background=new kt(e.sky)),i.fog=new Ii(e.fog,n?e.fogDensity:e.fogDensity*.4),t.ambient.color.setHex(e.ambient),t.fill.color.setHex(e.torch)}function k_(i,t){const e=new ue,n=new it(new Yi(1.15,1.7),pe(i,{}));n.position.y=.2;const r=new it(new Ki(.28,24),pe(t,{}));return r.position.set(0,.45,.03),e.add(n,r),e}const oc=new Map;function no(i,t,e="none"){const n=`${i}:${t}:${e}`,r=oc.get(n);if(r)return r.clone(!0);const s=new ue,a=pe(13010498,{}),o=ze("plaster",i,{}),l=ze("beam",16777215,{}),c=ze("stone",12961996,{}),u=new it(new fe(.11,12,10),o);u.position.y=.92;const h=new it(new on(.16,.34,6,10),o);h.position.y=1.22;const f=new it(new fe(.115,16,14),a);f.position.y=1.58;const p=new it(new qt(.045,.05,.08,8),a);p.position.y=1.46;const g=(v,k,T,A,P,S,y=0)=>{const R=new it(new on(A,P,5,8),S);return R.position.set(v,k,T),R.rotation.x=y,s.add(R),R};g(-.08,.48,0,.055,.38,l),g(.08,.48,0,.055,.38,l),g(-.08,.16,.02,.05,.32,l),g(.08,.16,.02,.05,.32,l);const x=new it(new Tt(.1,.08,.16),l);x.position.set(-.08,.04,.04);const m=x.clone();m.position.x=.08,g(-.22,1.18,0,.045,.28,o,.15),g(.22,1.18,0,.045,.28,o,.15),g(-.24,.92,.02,.04,.26,a,.1),g(.24,.92,.02,.04,.26,a,.1);const d=new it(new Tt(.08,.012,.02),pe(3810324,{}));d.position.set(0,1.61,.1);const b=new it(new fe(.014,8,6),pe(1708556));b.position.set(-.035,1.58,.1);const E=b.clone();if(E.position.x=.035,s.add(u,h,f,p,x,m,d,b,E),e==="turban"){const v=new it(new ai(.1,.055,10,16),pe(t,{}));v.rotation.x=Math.PI/2,v.position.y=1.68;const k=new it(new fe(.09,12,10,0,Math.PI*2,0,Math.PI/2),pe(t,{}));k.position.y=1.7,s.add(v,k)}else if(e==="hood"){const v=new it(new fe(.14,12,10,0,Math.PI*2,0,Math.PI/1.6),pe(t,{}));v.position.set(0,1.62,-.02);const k=new it(new Tt(.38,.7,.06),pe(2757176,{}));k.position.set(0,1.05,-.16),s.add(v,k)}else if(e==="helm"){const v=new it(new fe(.13,14,12,0,Math.PI*2,0,Math.PI/1.7),c);v.position.y=1.62;const k=new it(new Tt(.025,.08,.04),c);k.position.set(0,1.56,.11);const T=new it(new fe(.08,10,8,0,Math.PI,0,Math.PI/2),c);T.position.set(-.2,1.4,0);const A=T.clone();A.position.x=.2,s.add(v,k,T,A)}return s.traverse(v=>{v instanceof it&&(v.castShadow=!1,v.receiveShadow=!1)}),oc.set(n,s),s.clone(!0)}function Ue(i){return i.castShadow=!1,i.receiveShadow=!1,i}function D_(i,t,e=.72){const n=new ue,r=rn(9059876,un.tile,{}),s=new Tt(i+.28,.1,t*.62),a=Ue(new it(s,r));a.rotation.x=.62,a.position.set(0,e*.35,-t*.18);const o=Ue(new it(s.clone(),r));o.rotation.x=-.62,o.position.set(0,e*.35,t*.18);const l=Ue(new it(new qt(.06,.06,i+.2,8),rn(9124382,un.tile,{})));return l.rotation.z=Math.PI/2,l.position.y=e*.72,n.add(a,o,l),n}function I_(){const i=new ue,t=Ue(new it(new qt(.035,.04,.55,8),rn(5911832,un.wood)));t.position.y=.28;const e=Ue(new it(new fe(.09,10,8),pe(16750899,{emissive:16738816,emit:1.2})));e.position.y=.58;const n=new to(16750899,1.1,4.5,2);return n.position.y=.6,i.add(t,e,n),i.userData.flame=e,i}new fe(.16,8,6);new ke({color:4868682,transparent:!0,opacity:.45});function U_(i,t=1.7){const e=new ue,n=Ue(new it(new Tt(i,t,.55),rn(10131084,un.stone,{})));n.position.y=t/2;const r=Ue(new it(new Tt(.16,t+.1,.62),rn(4860952,un.wood)));r.position.set(-i/2+.12,t/2,0);const s=r.clone();s.position.x=i/2-.12;const a=Math.max(3,Math.round(i/.7));e.add(n,r,s);for(let o=0;o<a;o+=1){const l=Ue(new it(new Tt(.28,.28,.5),rn(9276034,un.stone)));l.position.set(-i/2+.4+o*(i/a),t+.12,0),e.add(l)}return e}function lc(){const i=new ue,t=Ue(new it(new Tt(1.35,2.4,1.35),rn(10131084,un.stone,{})));t.position.y=1.2;const e=Ue(new it(new Tt(1.5,.7,1.5),rn(7029286,un.wood)));e.position.y=2.15;const n=D_(1.55,1.55,.55);n.position.y=2.55;const r=I_();return r.position.set(0,2.55,.2),i.add(t,e,n,r),i}function N_(){const i=new ue,t=Ue(new it(new Ki(.55,22),pe(13685976,{}))),e=[[16044095,-.18,.18],[7091331,.18,.18],[11549230,-.18,-.18],[13935988,.18,-.18]];for(const[n,r,s]of e){const a=new it(new Yi(.26,.26),pe(n,{}));a.position.set(r,s,.02),i.add(a)}return i.add(t),t.position.z=-.01,i}function F_(){const i=new ue,t=Ue(new it(new Tt(1.1,.12,.7),rn(9132587,un.wood)));t.position.y=.45;const e=Ue(new it(new Tt(1.2,.08,.85),pe(12597547,{})));e.position.set(0,.95,0),e.rotation.x=-.35;const n=Ue(new it(new qt(.04,.04,1.1,8),rn(5911832,un.wood)));n.position.set(-.5,.55,-.25);const r=n.clone();return r.position.x=.5,i.add(t,e,n,r),i}function O_(i,t,e){return no(i,t,e)}function cc(i,t,e){const n=Math.max(0,Math.min(i,Math.round(t/Math.max(1,e)*i))),r=i-n;return Array.from({length:i},(s,a)=>a<r)}const aa=1.35,uc=5.1,z_={sariklilar:"turban",gokhanli:"hood",demirhisar:"helm",player:"none"},B_={sariklilar:[12597547,16044095],gokhanli:[2890317,8207512],demirhisar:[8070172,13937677],player:[2388387,13935988]};class H_{constructor(){j(this,"root",new ue);j(this,"finished",!1);j(this,"fighters",[]);j(this,"sparks",new ue);j(this,"clock",0);j(this,"announced",!1);this.root.name="battle";const t=new it(new Ki(9,40),ze("sand",16777215,{}));t.rotation.x=-Math.PI/2,t.receiveShadow=!1;const e=new it(new ai(6.4,.14,8,40),pe(13938487,{}));e.rotation.x=Math.PI/2,e.position.y=.07;const n=U_(8);n.position.set(0,0,-6.4);const r=lc();r.position.set(-5.5,0,-5.8),r.scale.setScalar(.7);const s=lc();s.position.set(5.5,0,-5.8),s.scale.setScalar(.7);const a=F_();a.position.set(-4.2,0,3.4);const o=N_();o.position.set(0,2.3,-6.1),this.root.add(t,e,n,r,s,a,o,this.sparks)}refreshFighters(){}stage(t,e,n){this.fighters.forEach(f=>this.root.remove(f.mesh)),this.fighters=[],this.sparks.clear(),this.clock=0,this.finished=!1,this.announced=!1;const r=t.reduce((f,p)=>f+Math.min(4,Math.max(1,p.startCount??p.count)),0),s=Math.min(5,Math.max(2,e.count)),a=t.reduce((f,p)=>f+Math.max(1,p.startCount??p.count),0),o=(n==null?void 0:n.playerRemaining)??a,l=(n==null?void 0:n.enemyRemaining)??s,c=cc(r,o,a),u=cc(s,l,Math.max(1,e.startCount??e.count));let h=0;t.forEach(f=>{const p=Math.min(4,Math.max(1,f.startCount??f.count));for(let g=0;g<p;g+=1){const x=-1.4+h*.85;this.addFighter("player",f.tribe,new C(-3.4-g%2*.35,0,x),x,c[h]??!1,h),h+=1}});for(let f=0;f<s;f+=1){const p=-1.4+f*.85;this.addFighter("enemy",e.tribe,new C(3.4+f%2*.35,0,p),p,u[f]??!1,f)}}consumeFinished(){return!this.finished||this.announced?!1:(this.announced=!0,!0)}update(t,e=1/60){const n=Math.max(.008,Math.min(.05,e||.016666666666666666));if(!this.fighters.length){this.clock>0&&(this.finished=!0);return}this.clock+=n;const r=this.clock;for(const s of this.fighters)if(!s.fallen)if(r<aa){const a=r/aa;s.mesh.position.lerpVectors(s.home,s.clash,W_(a)),s.mesh.rotation.y=s.side==="player"?Math.PI/2:-Math.PI/2,hc(s.mesh,r,10)}else if(r<uc){const a=r-aa,o=Math.sin(a*9+s.pair)*.22,l=s.side==="player"?1:-1;s.mesh.position.x=s.clash.x+o*l,s.mesh.position.z=s.clash.z+Math.sin(a*7+s.pair*.6)*.06,s.mesh.rotation.y=s.side==="player"?Math.PI/2:-Math.PI/2,s.mesh.rotation.z=Math.sin(a*11+s.pair)*.18*l,hc(s.mesh,r,16),s.doomed&&a>1.4+s.pair*.18&&this.fall(s),Math.floor(a*6+s.pair)!==Math.floor((a-n)*6+s.pair)&&this.spark(s.clash.x,1.1,s.clash.z)}else s.doomed&&!s.fallen?this.fall(s):(s.mesh.position.lerp(s.clash,.08),s.mesh.rotation.z*=.9,s.mesh.position.y=0);this.sparks.children.forEach(s=>{s.position.y+=n*1.4,s.scale.multiplyScalar(1-n*3),s.rotation.z+=n*8}),r>=uc+.35&&(this.finished=!0)}addFighter(t,e,n,r,s,a){const o=O_(...B_[e],z_[e]);o.position.copy(n),o.rotation.y=t==="player"?Math.PI/2:-Math.PI/2,o.add(X_(t==="player"?13939274:9079434));const l=new C(t==="player"?-.45:.45,0,r);this.root.add(o),this.fighters.push({mesh:o,side:t,home:n.clone(),clash:l,doomed:s,fallen:!1,pair:a})}fall(t){t.fallen=!0,t.mesh.rotation.x=Math.PI/2,t.mesh.rotation.z=t.side==="player"?-.4:.4,t.mesh.position.y=.08}spark(t,e,n){const r=new it(G_,V_);r.position.set(t+(Math.random()-.5)*.3,e,n+(Math.random()-.5)*.2),this.sparks.add(r),this.sparks.children.length>14&&this.sparks.remove(this.sparks.children[0])}}const G_=new Ge(.08),V_=new xo({color:16769162});function hc(i,t,e){i.position.y=Math.abs(Math.sin(t*e))*.06}function W_(i){return 1-(1-Math.min(1,Math.max(0,i)))**2}function X_(i){const t=new ue,e=new it(new qt(.018,.02,.85,5),pe(5913112,{}));e.position.set(.22,1.15,.12),e.rotation.z=-.55;const n=new it(new be(.04,.14,5),pe(i,{}));return n.position.set(.42,1.48,.12),n.rotation.z=-.55,t.add(e,n),t}const dc=new Map,fc=new Map;function Me(i,t,e){const n=`${i}`,r=dc.get(n);if(r)return r;const s=new ke({color:i});return dc.set(n,s),s}function q_(i){const t=i.getAttribute("position"),e=`${i.type}:${t.count}:${t.getX(0).toFixed(3)}:${t.getY(0).toFixed(3)}:${t.getZ(1).toFixed(3)}`,n=fc.get(e);return n?(i.dispose(),n):(fc.set(e,i),i)}function It(i,t,e,n,r){const s=new it(q_(i),t);return s.position.set(e,n,r),s.castShadow=!1,s.receiveShadow=!1,s}function Y_(i,t){if(!i.slot)return null;const e=new ue;e.name=`bld-${i.id}`;const n=i.slot;return t==="sariklilar"?$_(e,n,i.level):t==="demirhisar"?Z_(e,n,i.level):K_(e,n,i.level),e}function $_(i,t,e){const n=Me(12868138),r=Me(6965800),s=Me(13215339);if(t==="hall")i.add(It(new be(.55,.55,8),n,0,.5,0)),i.add(It(new qt(.04,.04,.7,6),r,0,.35,0)),i.add(It(new fe(.12,10,8),Me(13938794),0,.82,0));else if(t==="resource"){i.add(It(new Tt(.55,.12,.55),s,0,.08,0));for(let a=0;a<4;a++)i.add(It(new Tt(.08,.22,.08),Me(9071152),-.18+a%2*.3,.2,-.12+Math.floor(a/2)*.28))}else t==="camp"?(i.add(It(new be(.32,.38,7),n,-.18,.28,.05)),i.add(It(new be(.26,.3,7),Me(9060384),.2,.24,-.08))):t==="tower"?(i.add(It(new qt(.16,.2,.7,8),Me(12093770),0,.4,0)),i.add(It(new be(.22,.18,8),n,0,.84,0))):t==="market"?(i.add(It(new Tt(.7,.08,.4),Me(9054746),0,.28,0)),i.add(It(new qt(.03,.03,.28,6),r,-.3,.14,.16)),i.add(It(new qt(.03,.03,.28,6),r,.3,.14,-.16))):(i.add(It(new qt(.22,.26,.28,10),Me(5914672),0,.2,0)),i.add(It(new qt(.06,.08,.22,8),Me(3355443),.18,.28,.1)));i.scale.setScalar(1+e*.06)}function K_(i,t,e){const n=Me(5913122),r=Me(3103288),s=Me(7260415);t==="hall"?(i.add(It(new qt(.28,.34,.45,8),n,0,.28,0)),i.add(It(new be(.4,.38,8),r,0,.62,0)),i.add(It(new Ge(.16),s,0,.88,0))):t==="resource"?(i.add(It(new Ge(.22),s,-.15,.28,.05)),i.add(It(new Ge(.16),s,.18,.22,-.08))):t==="camp"?(i.add(It(new Tt(.5,.22,.38),n,0,.16,0)),i.add(It(new be(.18,.2,6),r,.18,.36,.1))):t==="tower"?(i.add(It(new qt(.12,.16,.85,7),n,0,.46,0)),i.add(It(new Ge(.14),s,0,.96,0))):t==="market"?(i.add(It(new Tt(.55,.08,.55),n,0,.12,0)),i.add(It(new Tt(.18,.2,.18),Me(9071152),-.16,.24,.12))):(i.add(It(new Tt(.4,.28,.36),n,0,.2,0)),i.add(It(new Ge(.1),s,.18,.38,0))),i.scale.setScalar(1+e*.06)}function Z_(i,t,e){const n=Me(9081760),r=Me(13625599),s=Me(3818576);t==="hall"?(i.add(It(new Tt(.7,.45,.55),n,0,.28,0)),i.add(It(new qt(.1,.12,.7,6),n,-.28,.5,-.18)),i.add(It(new qt(.1,.12,.7,6),n,.28,.5,-.18)),i.add(It(new be(.14,.2,6),r,-.28,.92,-.18)),i.add(It(new be(.14,.2,6),r,.28,.92,-.18))):t==="resource"?(i.add(It(new Tt(.5,.18,.5),s,0,.12,0)),i.add(It(new Tt(.12,.28,.12),n,.16,.28,.1))):t==="camp"?(i.add(It(new Tt(.55,.28,.4),n,0,.18,0)),i.add(It(new Tt(.2,.12,.12),s,.22,.28,.08))):t==="tower"?(i.add(It(new qt(.16,.2,.95,8),n,0,.5,0)),i.add(It(new be(.2,.22,8),r,0,1.08,0))):t==="market"?(i.add(It(new Tt(.62,.22,.45),n,0,.16,0)),i.add(It(new Tt(.7,.04,.5),s,0,.3,0))):(i.add(It(new Tt(.42,.32,.38),s,0,.2,0)),i.add(It(new qt(.08,.1,.2,8),Me(4473924),.2,.28,.1))),i.scale.setScalar(1+e*.06)}const pc=new Map;function ce(i,t,e){const n=`${i}`,r=pc.get(n);if(r)return r;const s=new ke({color:i});return pc.set(n,s),s}function Gt(i,t,e,n,r,s){const a=new it(t,e);return a.position.set(n,r,s),a.castShadow=!1,a.receiveShadow=!1,i.add(a),a}const mc=new Map;function J_(i){const t=mc.get(i);if(t)return t.clone(!0);const e=io(i);return mc.set(i,e),e.clone(!0)}function io(i){const t=new ue;t.name=`warrior-${i}`;const e=ce(12886138),n=ce(1708556),r=ce(i==="sariklilar"?9058850:i==="gokhanli"?2771512:i==="demirhisar"?3818576:4863016),s=ce(9081760),a=ce(5913122),o=ce(13214247);if(i==="panther"){const u=Gt(t,new on(.16,.42,3,6),ce(1709088),0,.22,0);u.rotation.z=Math.PI/2,Gt(t,new fe(.14,8,6),ce(1709088),.28,.26,0),Gt(t,new qt(.045,.05,.28,8),ce(1709088),.22,.12,.1),Gt(t,new qt(.045,.05,.28,8),ce(1709088),.22,.12,-.1),Gt(t,new qt(.045,.05,.28,8),ce(1709088),-.18,.12,.1),Gt(t,new qt(.045,.05,.28,8),ce(1709088),-.18,.12,-.1),Gt(t,new be(.04,.22,6),ce(1709088),-.32,.2,0).rotation.z=1.2;const h=io("gokhanli");return h.scale.setScalar(.72),h.position.set(0,.38,0),t.add(h),t}if(i==="rider"){const u=Gt(t,new on(.18,.5,3,6),ce(4861984),0,.28,0);u.rotation.z=Math.PI/2,Gt(t,new fe(.14,8,6),ce(4861984),.32,.36,0),Gt(t,new qt(.05,.055,.34,8),ce(3810328),.2,.16,.1),Gt(t,new qt(.05,.055,.34,8),ce(3810328),.2,.16,-.1),Gt(t,new qt(.05,.055,.34,8),ce(3810328),-.2,.16,.1),Gt(t,new qt(.05,.055,.34,8),ce(3810328),-.2,.16,-.1);const h=io("sariklilar");return h.scale.setScalar(.7),h.position.set(0,.48,0),t.add(h),t}Gt(t,new qt(.09,.11,.38,6),r,0,.42,0),Gt(t,new fe(.11,8,6),e,0,.72,0),Gt(t,new fe(.115,8,6),n,0,.76,-.01),Gt(t,new Tt(.22,.08,.16),a,0,.56,.02);const l=Gt(t,new on(.035,.22,2,5),e,-.16,.5,0);l.rotation.z=.35;const c=Gt(t,new on(.035,.22,2,5),e,.16,.5,0);return c.rotation.z=-.35,Gt(t,new on(.04,.26,2,5),r,-.05,.16,0),Gt(t,new on(.04,.26,2,5),r,.05,.16,0),Gt(t,new Tt(.07,.04,.12),a,-.05,.02,.02),Gt(t,new Tt(.07,.04,.12),a,.05,.02,.02),i==="sariklilar"?(Gt(t,new ai(.1,.035,8,16),ce(14206090),0,.82,0).rotation.x=Math.PI/2,Gt(t,new qt(.012,.012,.55,6),s,.22,.55,.04),Gt(t,new fe(.045,8,8),ce(2236962),.22,.84,.04),Gt(t,new Tt(.1,.14,.04),a,0,.48,.1)):i==="gokhanli"?(Gt(t,new be(.1,.16,7),r,0,.88,0),Gt(t,new Tt(.04,.32,.08),s,.2,.52,.02),Gt(t,new qt(.02,.05,.18,6),o,0,.58,.1),Gt(t,new fe(.03,8,8),ce(7260415),0,.7,.1)):(Gt(t,new fe(.13,8,6),s,0,.78,0),Gt(t,new Tt(.26,.22,.18),s,0,.52,0),Gt(t,new Tt(.08,.36,.04),s,.22,.55,.02),Gt(t,new Tt(.18,.22,.04),s,-.16,.5,.02)),t}function j_(i,t){const e=new ue,r=J_(i==="gokhanli"?"panther":i==="sariklilar"?"rider":i);return r.scale.setScalar(.72+Math.min(3,Math.max(1,t))*.03),e.add(r),e}const Q_={sariklilar:new kt(12868130),gokhanli:new kt(3107396),demirhisar:new kt(9085112),neutral:new kt(16777215)},tv=3*cs*(cs+1)+1,Ei=3*ls*(ls+1)+1,ev=new be(.2,.48,5),nv=new fe(.26,6,4,0,Math.PI*2,0,Math.PI/2),iv=new Ge(.18),rv=new Ge(.07),sv=new ke({color:15781984,emissive:13214247,emissiveIntensity:.4}),wi={pole:new ke({color:6965800}),cloth:new ke({color:13215339,emissive:4861968,emissiveIntensity:.12}),crystal:new ke({color:4856426,emissive:6953882,emissiveIntensity:.4}),ring:new ke({color:2756640,emissive:3805256,emissiveIntensity:.25}),keep:new ke({color:1708568,emissive:2754576,emissiveIntensity:.15}),spire:new ke({color:4853792,emissive:6950952,emissiveIntensity:.3})},Ti={pole:new qt(.04,.05,.7,5),cloth:new be(.42,.38,5),crystal:new Ge(.42),ring:new ai(.38,.04,4,10),keep:new Tt(.55,.9,.55),spire:new be(.22,.4,5)};function av(i){return`${i.id}|${i.owner}|${i.slot??""}|${i.level}|${i.garrison}|${i.landmark??""}|${i.stars??0}`}class ov{constructor(t,e){j(this,"root",new ue);j(this,"active",!1);j(this,"marks",new ue);j(this,"selectRing");j(this,"ray",new S_);j(this,"pointer",new ft);j(this,"dragging",!1);j(this,"moved",!1);j(this,"lastX",0);j(this,"lastY",0);j(this,"pinch",0);j(this,"target",new C(0,.4,0));j(this,"yaw",.62);j(this,"pitch",.92);j(this,"dist",18);j(this,"lookId",null);j(this,"save",null);j(this,"focus",new C);j(this,"lookAt",new C);j(this,"focusStep",new C);j(this,"lastExplore","");j(this,"exploreAt",0);j(this,"followSelect",!0);j(this,"carpet");j(this,"trees");j(this,"dunes");j(this,"ice");j(this,"carpetIds",[]);j(this,"carpetKey","");j(this,"dummy",new Ee);j(this,"tint",new kt);j(this,"props",new Map);j(this,"propKey",new Map);j(this,"byId",new Map);j(this,"carpetColors",{desert:new kt(12886106),forest:new kt(4155962),ice:new kt(13162728)});this.canvas=t,this.camera=e,this.root.name="hex-map",this.root.add(this.marks),this.selectRing=new it(new ai(or*.92,.045,6,6),new ke({color:15781984,emissive:13214247,emissiveIntensity:.45})),this.selectRing.rotation.x=-Math.PI/2,this.selectRing.position.y=.42,this.selectRing.visible=!1,this.root.add(this.selectRing),this.carpet=this.makeInstances(new qt(or*.96,or*.96,.28,6),16777215,tv),this.carpet.position.y=-.04,this.trees=this.makeInstances(ev,2382386,Ei),this.dunes=this.makeInstances(nv,15253616,Ei),this.ice=this.makeInstances(iv,11065599,Ei),this.root.add(this.carpet,this.trees,this.dunes,this.ice),this.bindInput()}sync(t){if(this.save=t,this.byId.size!==t.tiles.length){this.byId.clear();for(const r of t.tiles)this.byId.set(r.id,r)}this.followSelect&&(this.lookId=t.selectedHex);const e=this.followSelect&&t.selectedHex?this.byId.get(t.selectedHex):void 0,n=e?{q:e.q,r:e.r}:Fo(this.target.x,this.target.z);this.layoutCarpet(n.q,n.r,t),this.syncProps(t,n.q,n.r),`${n.q},${n.r}`!==this.lastExplore&&(this.lastExplore=`${n.q},${n.r}`,En.emit("explore",n)),this.placeSelect(t.selectedHex)}update(t){this.selectRing.rotation.z=t*.45}placeCamera(){if(this.focus.copy(this.target),this.lookId&&this.save){const r=this.byId.get(this.lookId);if(r){const{x:s,z:a}=wr(r.q,r.r);this.focusStep.set(s,.3,a),this.focus.lerp(this.focusStep,.12),this.target.copy(this.focus)}}const t=this.focus.x+Math.sin(this.yaw)*Math.cos(this.pitch)*this.dist,e=this.focus.y+Math.sin(this.pitch)*this.dist,n=this.focus.z+Math.cos(this.yaw)*Math.cos(this.pitch)*this.dist;this.camera.position.set(t,e,n),this.lookAt.set(this.focus.x,.35,this.focus.z),this.camera.lookAt(this.lookAt)}makeInstances(t,e,n){const r=new j0(t,new ke({color:e}),n);return r.castShadow=!1,r.receiveShadow=!1,r.count=0,r.instanceMatrix.setUsage(vd),r.frustumCulled=!1,r}layoutCarpet(t,e,n){const r=new Map;let s=0;for(const h of n.tiles)r.set(h.id,h),Fn(t,e,h.q,h.r)<=cs&&(s=s+h.level+h.owner.charCodeAt(0)|0);const a=`${t},${e}|${s}`;if(a===this.carpetKey)return;this.carpetKey=a,this.carpetIds=[];let o=0,l=0,c=0,u=0;yc(t,e,cs,(h,f)=>{const p=dr(h,f),g=r.get(p),x=(g==null?void 0:g.biome)??Mc(h,f),{x:m,z:d}=wr(h,f),b=x==="ice"?.38:x==="forest"?.3:.24;this.dummy.position.set(m,b/2,d),this.dummy.rotation.set(0,0,0),this.dummy.scale.set(1,b/.28,1),this.dummy.updateMatrix(),this.carpet.setMatrixAt(o,this.dummy.matrix),this.tint.copy(this.carpetColors[x]),g&&g.owner!=="neutral"&&this.tint.lerp(Q_[g.owner],.38),this.carpet.setColorAt(o,this.tint),this.carpetIds[o]=p,o+=1,!(Fn(t,e,h,f)>ls)&&(g!=null&&g.slot||g!=null&&g.landmark||Math.abs(h*3+f*5)%3===0&&(this.dummy.position.set(m,.28,d),this.dummy.rotation.set(0,(h+f)*.4,0),this.dummy.scale.set(1,1,1),this.dummy.updateMatrix(),x==="forest"&&l<Ei?this.trees.setMatrixAt(l++,this.dummy.matrix):x==="desert"&&c<Ei?this.dunes.setMatrixAt(c++,this.dummy.matrix):x==="ice"&&u<Ei&&this.ice.setMatrixAt(u++,this.dummy.matrix)))}),this.carpet.count=o,this.trees.count=l,this.dunes.count=c,this.ice.count=u,this.carpet.instanceMatrix.needsUpdate=!0,this.trees.instanceMatrix.needsUpdate=!0,this.dunes.instanceMatrix.needsUpdate=!0,this.ice.instanceMatrix.needsUpdate=!0,this.carpet.instanceColor&&(this.carpet.instanceColor.needsUpdate=!0)}syncProps(t,e,n){const r=new Set;for(const s of t.tiles){if(Fn(e,n,s.q,s.r)>ls||!s.slot&&!s.landmark&&!(s.stars&&s.stars>0))continue;r.add(s.id);const a=av(s);if(this.propKey.get(s.id)===a)continue;const o=this.props.get(s.id);o&&this.marks.remove(o);const l=this.dress(s);this.marks.add(l),this.props.set(s.id,l),this.propKey.set(s.id,a)}for(const[s,a]of this.props)r.has(s)||(this.marks.remove(a),this.props.delete(s),this.propKey.delete(s))}emitExplore(){const t=performance.now();if(t-this.exploreAt<280)return;this.exploreAt=t;const e=Fo(this.target.x,this.target.z),n=`${e.q},${e.r}`;n!==this.lastExplore&&(this.lastExplore=n,En.emit("explore",e))}dress(t){const e=new ue,{x:n,z:r}=wr(t.q,t.r);e.position.set(n,.28,r);const s=t.owner==="neutral"?uv(t.biome):t.owner;if(t.landmark)e.add(lv(t.landmark));else{const a=Y_(t,s);a&&e.add(a)}if(t.stars&&t.stars>0&&e.add(cv(t.stars)),t.owner!=="neutral"&&(t.slot==="hall"||t.slot==="camp")&&!t.landmark){const a=j_(t.owner,t.slot==="hall"?2:1);a.position.set(.15,0,.28),e.add(a)}return e}placeSelect(t){if(!t||!this.save){this.selectRing.visible=!1;return}const e=this.byId.get(t);if(!e){this.selectRing.visible=!1;return}const{x:n,z:r}=wr(e.q,e.r);this.selectRing.position.set(n,.48,r),this.selectRing.visible=!0}bindInput(){this.canvas.addEventListener("pointerdown",t=>{this.active&&(this.dragging=!0,this.moved=!1,this.lastX=t.clientX,this.lastY=t.clientY)}),this.canvas.addEventListener("pointermove",t=>{if(!this.active||!this.dragging)return;const e=t.clientX-this.lastX,n=t.clientY-this.lastY;Math.hypot(e,n)>6&&(this.moved=!0),this.lastX=t.clientX,this.lastY=t.clientY,this.target.x-=(e*.022+n*.012)*(this.dist/16),this.target.z-=(n*.022-e*.008)*(this.dist/16),this.lookId=null,this.followSelect=!1,this.emitExplore()}),this.canvas.addEventListener("pointerup",t=>{this.active&&(this.dragging&&!this.moved&&this.pick(t.clientX,t.clientY),this.dragging=!1)}),this.canvas.addEventListener("wheel",t=>{this.active&&(t.preventDefault(),this.dist=nl.clamp(this.dist+t.deltaY*.014,10,42))},{passive:!1}),this.canvas.addEventListener("touchstart",t=>{this.active&&t.touches.length===2&&(this.pinch=gc(t.touches[0],t.touches[1]))}),this.canvas.addEventListener("touchmove",t=>{if(!this.active||t.touches.length!==2)return;const e=gc(t.touches[0],t.touches[1]);this.dist=nl.clamp(this.dist+(this.pinch-e)*.02,10,42),this.pinch=e})}pick(t,e){const n=this.canvas.getBoundingClientRect();this.pointer.x=(t-n.left)/n.width*2-1,this.pointer.y=-((e-n.top)/n.height)*2+1,this.ray.setFromCamera(this.pointer,this.camera);const r=this.ray.intersectObject(this.carpet,!1)[0],s=r&&r.instanceId!=null?this.carpetIds[r.instanceId]:void 0;s&&(this.lookId=s,this.followSelect=!0,this.placeSelect(s),En.emit("hex-select",s))}}function lv(i){const t=new ue;if(i==="side"){const e=new it(Ti.pole,wi.pole);e.position.y=.35;const n=new it(Ti.cloth,wi.cloth);n.position.y=.72,t.add(e,n)}else if(i==="temple"){const e=new it(Ti.crystal,wi.crystal);e.position.y=.48;const n=new it(Ti.ring,wi.ring);n.rotation.x=Math.PI/2,n.position.y=.18,t.add(e,n)}else{const e=new it(Ti.keep,wi.keep);e.position.y=.5;const n=new it(Ti.spire,wi.spire);n.position.y=1.1,t.add(e,n)}return t}function cv(i){const t=new ue;t.position.y=.7;for(let e=0;e<i;e+=1){const n=new it(rv,sv);n.position.set((e-(i-1)/2)*.2,0,0),t.add(n)}return t}function uv(i){return i==="desert"?"sariklilar":i==="ice"?"demirhisar":"gokhanli"}function gc(i,t){return Math.hypot(i.clientX-t.clientX,i.clientY-t.clientY)}class hv{constructor(){j(this,"root",new ue);j(this,"daggerLight");j(this,"dagger");j(this,"torches",[]);this.root.name="throne-room",this.buildHall(),this.buildThrone(),this.dagger=this.buildDagger(),this.root.add(this.dagger),this.daggerLight=new to(11766015,4.2,14,1.6),this.daggerLight.position.set(0,1.55,.35),this.root.add(this.daggerLight),this.hangBanners(),this.placeTorches(),this.placeHonorGuard()}update(t){const e=.55+Math.sin(t*2.2)*.25;this.daggerLight.intensity=3.4+e*2.2,this.dagger.position.y=1.15+Math.sin(t*1.6)*.03,this.dagger.rotation.y=Math.sin(t*.35)*.08;for(const n of this.torches)n.intensity=1.6+Math.sin(t*7+n.position.x)*.35}buildHall(){const t=new it(new Tt(16,.35,18),ze("wood",16777215,{}));t.position.y=-.17,t.receiveShadow=!1;const e=new it(new Tt(3.4,.06,7),ze("plaster",9117214,{}));e.position.set(0,.04,1.2);const n=new it(new Tt(16,9,.4),ze("stone",16777215,{}));n.position.set(0,4.2,-6.4);const r=new it(new Ki(1.7,20),new ke({color:10474751,emissive:8308991,emissiveIntensity:.45}));r.position.set(0,5.1,-6.15);const s=new it(new Tt(.4,9,18),ze("wall",16777215,{}));s.position.set(-8,4.2,0);const a=s.clone();a.position.x=8;const o=new it(new Tt(16,.35,.35),ze("beam",16777215,{}));o.position.set(0,7.6,-2),this.root.add(t,e,n,r,s,a,o)}buildThrone(){const t=new it(new Tt(1.7,.35,1.4),ze("wood",16777215,{}));t.position.set(0,.85,-2.1);const e=new it(new Tt(1.45,.18,1.15),ze("plaster",10558762,{}));e.position.set(0,1.1,-2.05);const n=new it(new Tt(1.7,2.2,.32),ze("beam",16777215,{}));n.position.set(0,2.1,-2.7);const r=new it(new fe(.28,12,12),pe(13938487,{}));r.position.set(0,3.35,-2.7);const s=new it(new Ge(.1),pe(8069026,{emissive:10233776,emit:.8}));s.position.set(0,3.55,-2.55);const a=new it(new Tt(.28,.7,1.2),ze("wood"));a.position.set(-.85,1.15,-2.15);const o=a.clone();o.position.x=.85;const l=new it(new fe(.16,10,10),pe(13938487,{}));l.position.set(-.85,1.55,-1.55);const c=l.clone();c.position.x=.85;for(const u of[t,e,n,r,s,a,o,l,c])u.castShadow=!1,u.receiveShadow=!1,this.root.add(u)}buildDagger(){const t=new ue;t.position.set(0,1.18,-2);const e=new it(new be(.07,.85,6),pe(14794471,{emissive:10233776,emit:1.2}));e.rotation.x=Math.PI,e.position.y=.15;const n=new it(new qt(.055,.07,.32,10),pe(6953882,{emissive:4854924,emit:.6}));n.position.y=.68;const r=new it(new Ge(.12),pe(13538264,{emissive:15368444,emit:1.4}));return r.position.y=.9,t.add(e,n,r),t}hangBanners(){const t=[[12000284,16044095,-3.4],[1402304,15527921,0],[3622735,13621468,3.4]];for(const[e,n,r]of t){const s=k_(e,n);s.position.set(r,3.4,-6.05),this.root.add(s)}}placeTorches(){for(const t of[-5.2,5.2]){const e=new to(16750899,1.8,10,2);e.position.set(t,3.2,-1.4),e.castShadow=!1,this.torches.push(e);const n=new it(new fe(.12,8,8),pe(16764006,{emissive:16748288,emit:.9}));n.position.copy(e.position),this.root.add(e,n)}}placeHonorGuard(){const t=no(8070172,13937677,"helm");t.position.set(-2.4,0,1.6);const e=no(12597547,16044095,"turban");e.position.set(2.4,0,1.6),this.root.add(t,e)}}function dv(){var t;return typeof navigator>"u"?!1:typeof window<"u"&&((t=window.matchMedia)==null?void 0:t.call(window,"(pointer: coarse)").matches)||/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)||window.innerWidth<900}function _c(){const i=typeof window>"u"?1:window.devicePixelRatio||1;return Math.min(i,dv()?1:1.1)}function fv(){return 1e3/30}class pv{constructor(t){j(this,"renderer");j(this,"scene",new K0);j(this,"camera");j(this,"throne",new hv);j(this,"battle",new H_);j(this,"hexMap");j(this,"ambient",new __(13227232,4010536,.62));j(this,"sun",new y_(16769732,2.1));j(this,"fill",new M_(6971992,.22));j(this,"elapsed",0);j(this,"hidden",!1);this.renderer=new $0({canvas:t,antialias:!1,alpha:!1,stencil:!1,powerPreference:"low-power"}),this.renderer.setClearColor(2760728,1),this.renderer.setPixelRatio(_c()),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!1,this.renderer.toneMapping=kc,this.renderer.toneMappingExposure=1.05,this.camera=new He(42,window.innerWidth/window.innerHeight,.2,280),this.scene.environment=null,this.scene.environmentIntensity=0,this.scene.background=new kt(3814440),this.scene.fog=new Ii(4866100,.012),this.sun.position.set(14,18,9),this.sun.castShadow=!1,this.hexMap=new ov(t,this.camera),this.scene.add(this.ambient,this.sun,this.fill,this.throne.root,this.battle.root,this.hexMap.root),this.show("intro"),window.addEventListener("resize",()=>this.resize()),document.addEventListener("visibilitychange",()=>{this.hidden=document.hidden})}apply(t,e=!0){L_(this.scene,{ambient:this.fill,fill:this.sun},t,e),this.ambient.color.setHex(t.ambient),this.renderer.toneMappingExposure=e?1+t.bloom*.02:1.02,e?this.scene.fog=new Ii(t.fog,Math.min(.018,t.fogDensity*.35)):(this.scene.background=new kt(3814440),this.scene.fog=new Ii(4866100,.01))}show(t){this.throne.root.visible=t==="intro"||t==="menu"||t==="boot",this.hexMap.root.visible=t==="map"||t==="build"||t==="pick",this.hexMap.active=t==="map"||t==="build"||t==="pick",this.battle.root.visible=t==="battle",this.scene.environmentIntensity=0}syncMap(t){this.hexMap.sync(t)}resize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(_c()),this.renderer.setSize(window.innerWidth,window.innerHeight)}frame(t){this.hidden||(this.elapsed+=t,this.throne.root.visible&&this.throne.update(this.elapsed),this.battle.root.visible&&this.battle.update(this.elapsed,t),this.hexMap.root.visible&&this.hexMap.update(this.elapsed),this.placeCamera(),this.renderer.render(this.scene,this.camera))}placeCamera(){if(this.throne.root.visible){const t=this.elapsed;this.camera.position.set(Math.sin(t*.12)*1.4,2.5+Math.sin(t*.2)*.15,6.4),this.camera.lookAt(0,1.6,-2.1);return}if(this.battle.root.visible){const t=this.elapsed;this.camera.position.set(Math.sin(t*.35)*2.4+.4,3.6,7.8+Math.cos(t*.28)*.8),this.camera.lookAt(0,1.05,0);return}this.hexMap.root.visible&&this.hexMap.placeCamera()}}const gu=document.querySelector("#app"),_u=document.querySelector("#stage");if(!gu||!_u)throw new Error("Sahne kökü bulunamadı.");const at=new Ah,Ao=new Ph(gu),$e=new pv(_u);let ni="intro";at.state.force("intro");$e.show("intro");$e.apply(at.narrative.palette(1));Ao.render(at,"intro");Ao.bind(async(i,t)=>{if(at.audio.play().catch(()=>{}),i==="finish-intro")return Nn("menu");if(i==="new-game")return at.newGame(),await at.persist(),Nn("pick");if(i==="continue")return await at.bootFromDisk()?Nn(at.continueGame()?"map":"pick"):(at.newGame(),Nn("pick"));if(i==="choose-tribe"&&t)return at.chooseTribe(t),Nn("map");if(i==="menu")return Nn("menu");if(i==="dock"&&t&&at.togglePanel(t),i==="close-sheet"&&at.closePanel(),i==="deselect"&&at.selectHex(null),i==="build"&&t&&(at.toast=at.buildOrUpgrade(t)),i==="upgrade"&&(at.toast=at.upgradeSelected()),i==="train"&&(at.toast=at.train(1)),i==="train-five"&&(at.toast=at.train(5)),i==="train-unit"&&t&&(at.toast=at.trainUnit(t)),i==="upgrade-unit"&&(at.toast=at.upgradeUnit()),i==="caravan"&&(at.toast=at.sendCaravan()),i==="stance"&&t&&at.setStance(t),i==="commit"&&t&&(t==="all"?at.setCommit(null):t==="half"?at.setCommit(Math.max(4,Math.floor(at.data.army/2))):at.setCommit(Number(t))),i==="attack"&&(at.toast=at.claimOrAttack(t),at.wantsBattle&&at.lastBattle&&at.lastEnemy))return $e.battle.stage(at.lastPlayerLine,at.lastEnemy,at.lastBattle),Nn("battle");if(i==="continue-battle")return at.clearBattleFlag(),Nn("map");i==="ad"&&t&&(at.toast=await at.watchAd(t)),i==="save"&&(await at.persist(),at.toast="Kayıt mühürlendi."),vr()});En.on("hex-select",i=>{at.selectHex(i),vr()});En.on("explore",i=>{const t=at.mapDirty,e=at.ensureAround(i.q,i.r);$e.syncMap(at.data),e&&!t&&(at.mapDirty=!1)});En.on("levelup",()=>{const i=ni==="intro"||ni==="menu"||ni==="boot";$e.apply(at.narrative.palette(at.levels.currentLevel),i),at.audio.setTheme(at.narrative.palette(at.levels.currentLevel).music).catch(()=>{})});function Nn(i){try{at.state.current==="boot"?at.state.force(i):at.state.canEnter(i)?at.state.enter(i):at.state.force(i)}catch{at.state.force(i)}ni=i,$e.show(i);const t=i==="intro"||i==="menu"||i==="boot";$e.apply(at.narrative.palette(at.levels.currentLevel),t),vr()}function vr(){$e.syncMap(at.data),at.mapDirty=!1,Ao.render(at,ni,"",ni==="battle"&&!$e.battle.finished)}let vc=performance.now(),oa=0,la=0,jr=0;const mv=fv();function vu(i){requestAnimationFrame(vu);const t=Math.min(50,i-vc);if(vc=i,document.hidden)return;if(at.tick(t),(at.mapDirty||at.toast)&&vr(),oa+=t,oa>2e4){oa=0;const n=()=>void at.persist();typeof requestIdleCallback=="function"?requestIdleCallback(n,{timeout:1500}):n()}if(jr+=t,jr<mv)return;const e=Math.min(.05,jr/1e3);jr=0,$e.frame(e),ni==="battle"?(la+=e*1e3,la>6200&&($e.battle.finished=!0),$e.battle.consumeFinished()&&vr()):la=0}requestAnimationFrame(vu);at.bootFromDisk().then(i=>{i&&at.hydrate()});
