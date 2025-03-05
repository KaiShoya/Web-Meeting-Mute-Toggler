var R=Object.defineProperty;var E=(n,s,t)=>s in n?R(n,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[s]=t;var e=(n,s,t)=>(E(n,typeof s!="symbol"?s+"":s,t),t);class b extends r{constructor(){super(...arguments);e(this,"SERVICE_NAME","Google Meet");e(this,"URL","https://meet.google.com/");e(this,"URL_AST","https://meet.google.com/*");e(this,"MEETING_URL_PROPERTY",{});e(this,"checkMute",()=>{var a;let t=!1,o=!0;for(let c of document.getElementsByTagName("*"))if(c.innerHTML.indexOf("Join now")!=-1||c.innerHTML.indexOf("Rejoin")!=-1)o=!1;else if(c.matches('[aria-label~="microphone"]')&&["DIV","BUTTON"].includes(c.nodeName)){const i=(a=c.dataset)==null?void 0:a.isMuted;if(i===void 0)continue;t=JSON.parse(i)}return{muted:t,joinedStatus:o}})}}class d extends r{constructor(){super(...arguments);e(this,"SERVICE_NAME","Microsoft Teams");e(this,"URL","https://teams.microsoft.com/_");e(this,"URL_AST","https://teams.microsoft.com/_*");e(this,"MEETING_URL_PROPERTY",{});e(this,"checkMute",()=>{let t=!1,o=!0;return t=document.getElementById("microphone-button").dataset.state=="mic-off",{muted:t,joinedStatus:o}})}}class T extends r{constructor(){super(...arguments);e(this,"SERVICE_NAME","Microsoft Teams");e(this,"URL","https://teams.microsoft.com/light-meetings/launch");e(this,"URL_AST","https://teams.microsoft.com/light-meetings/launch*");e(this,"MEETING_URL_PROPERTY",{});e(this,"checkMute",()=>{let t=!1,o=!0;return t=document.getElementById("microphone-button").dataset.state=="mic-off",{muted:t,joinedStatus:o}})}}class p extends r{constructor(){super(...arguments);e(this,"SERVICE_NAME","Microsoft Teams");e(this,"URL","https://teams.microsoft.com/v2/");e(this,"URL_AST","https://teams.microsoft.com/v2/*");e(this,"MEETING_URL_PROPERTY",{});e(this,"checkMute",()=>{let t=!1,o=!0;return t=document.getElementById("microphone-button").dataset.state=="mic-off",{muted:t,joinedStatus:o}})}}const m=chrome.runtime.getURL("icons/M_gray128.png"),I=chrome.runtime.getURL("icons/M_red128.png"),M=chrome.runtime.getURL("icons/M_green128.png"),_="./service",U={meet:b,teams:d,teams_light_meetings:T,teams_v2:p},L=n=>{if(typeof n!="object"||n===null)return!1;const{SERVICE_NAME:s,SUB_DIRECTORY:t,URL:o,URL_AST:a,MEETING_URL_PROPERTY:c,tab:i,checkMute:u,resetTab:l,assessTabs:h,sendKeypress:f}=n;return!(typeof s!="string"||typeof t!="string"||typeof o!="string"||typeof a!="string"||typeof c!="object"||typeof i!="object"||typeof u!="function"||typeof l!="function"||typeof h!="function"||typeof f!="function")};class r{constructor(){e(this,"SUB_DIRECTORY","");e(this,"tab",{tabId:-1,onlyTab:!1,isOpen:!1,alerts:!1,count:0});e(this,"resetTab",()=>{this.tab={tabId:-1,onlyTab:!1,isOpen:!1,alerts:!1,count:0}});e(this,"assessTabs",async()=>{console.debug("assessTabs");const s=await chrome.tabs.query({url:this.URL_AST});s.forEach((t,o)=>{if(console.debug("item",t),t.url!==void 0){if(t.url===this.URL){this.tab.isOpen=!0;return}if(Object.keys(this.MEETING_URL_PROPERTY).length===0){this.tab.tabId=o,this.tab.count++;return}for(const[a,c]of Object.entries(this.MEETING_URL_PROPERTY))if(new URL(t.url)[a]!==c)return;this.tab.tabId=o,this.tab.count++,this.tab.count>0&&chrome.alarms.create("1min",{periodInMinutes:.05}),this.tab.count===0&&(chrome.alarms.clear("1min"),chrome.action.setIcon({path:m}),chrome.action.setBadgeText({text:""})),this.tab.count===1&&(this.tab.alerts=!1,chrome.action.setBadgeText({text:""})),s.forEach((a,c)=>{this.tab.alerts||this.tab.count>1&&(chrome.notifications.create("",{type:"basic",title:"",message:`You have ${this.tab.count} ${this.SERVICE_NAME} open. Close all but one.`,iconUrl:m}),this.tab.alerts=!0,chrome.action.setBadgeText({text:"Err"}))})}})});e(this,"sendKeypress",()=>{const s=this.URL_AST,t=this.tab.tabId,o=`dist/${_}/${this.SUB_DIRECTORY}/sendKeypress.js`;console.debug("sendKeypress()",s,t,o),chrome.tabs.query({url:s},a=>{t!=-1&&chrome.scripting.executeScript({target:{tabId:Number(a[t].id)},files:[o]})})})}}export{r as A,m as I,_ as S,d as T,U as a,I as b,M as c,T as d,p as e,L as i};
