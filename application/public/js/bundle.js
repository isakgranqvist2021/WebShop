(()=>{const e=[];!function(){const s=new URLSearchParams(window.location.search);e.push({type:"error",message:s.get("err")},{type:"success",message:s.get("success")}),window.history.pushState({},document.title,window.location.pathname)}()})();