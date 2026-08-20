function normalizeViewerVisibility(root){
  if(!root||typeof root.querySelectorAll!=="function")return 0;
  var hidden=Array.from(root.querySelectorAll(".st.off,.wblob.off"));
  hidden.forEach(function(node){node.classList.remove("off");});
  return hidden.length;
}
