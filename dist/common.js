import{a as r,i as u,I as c,b as l,c as b}from"./service/meet/object.js";import{s as n}from"./store.js";const C=async()=>{console.debug("initializer() start");for(const[o,e]of Object.entries(r)){const s=new e;u(s)&&(s.resetTab(),s.SUB_DIRECTORY=o,n.push(s))}console.debug("initializer() end",n)},I=async o=>{console.debug("run() start",n);let e=0,s=0,t=null;for(const i of n)i.resetTab(),await i.assessTabs(),i.tab.count>0&&(e+=i.tab.count,s++,t=i);e<=0||!t||(s===1&&e===1?(o&&(console.debug("isKeypress"),t.sendKeypress()),setTimeout(()=>m(t.URL_AST,t.tab.tabId,t.checkMute),100)):chrome.notifications.create("",{type:"basic",title:"",message:`You have ${e} Meeting open. Close all but one.`,iconUrl:c})),console.debug("run() end")},d=o=>{var i,a;const e=(i=o[0].result)==null?void 0:i.muted,t=((a=o[0].result)==null?void 0:a.joinedStatus)?e?l:b:c;chrome.action.setIcon({path:t})},m=(o,e,s)=>{chrome.tabs.query({url:o},t=>{chrome.scripting.executeScript({target:{tabId:Number(t[e].id)},func:s},d)})};export{C as i,I as r};
