function setAboutPanelValue(id,value){
  var node=document.getElementById(id);
  if(node)node.textContent=String(value||"");
}
function installAboutPanel(){
  var button=document.getElementById("infobtn");
  var backdrop=document.getElementById("info-backdrop");
  var panel=document.getElementById("infopanel");
  var close=document.getElementById("info-close");
  if(!button||!backdrop||!panel||!close||button.dataset.aboutReady)return;
  button.dataset.aboutReady="true";
  var previousFocus=null;
  function open(){
    previousFocus=document.activeElement;
    backdrop.hidden=false;panel.hidden=false;
    document.body.classList.add("about-open");
    button.setAttribute("aria-expanded","true");
    requestAnimationFrame(function(){panel.focus();});
  }
  function shut(){
    backdrop.hidden=true;panel.hidden=true;
    document.body.classList.remove("about-open");
    button.setAttribute("aria-expanded","false");
    if(previousFocus&&previousFocus.focus)previousFocus.focus();
  }
  button.setAttribute("aria-haspopup","dialog");
  button.setAttribute("aria-controls","infopanel");
  button.setAttribute("aria-expanded","false");
  button.addEventListener("click",function(event){event.stopPropagation();open();});
  close.addEventListener("click",shut);
  backdrop.addEventListener("click",function(event){if(event.target===backdrop)shut();});
  document.addEventListener("keydown",function(event){if(event.key==="Escape"&&!backdrop.hidden)shut();});
}
