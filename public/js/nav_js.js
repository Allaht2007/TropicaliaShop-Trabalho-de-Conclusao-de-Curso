

input.addEventListener("focus",()=>{
    input.classList.add("searchIptClick") 
  
})
input.addEventListener("focusout",()=>{
    input.classList.remove("searchIptClick") 
})