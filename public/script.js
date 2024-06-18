let elements = {
    deleNotSure: document.querySelector('#deleNotSure'),
    delAllBtn: document.querySelector(".delAllBtn"),
    delSure: document.querySelector("#delSure"),
     deleteConfirm: document.querySelector(".deleteConfirm"),
     submitBtn: document.querySelector("#submitBtn"),
}
// when click on delete all button 
elements.delAllBtn.addEventListener("click", (elem)=>{
    elements.deleteConfirm.style.opacity= "1";
    elements.deleteConfirm.style.pointerEvents="all";

})
// deleteall file function
async function deleteall(){
try{
let responses = await fetch("/api/deleteall")
     if(responses.status===400){
        showAfterDeleteMessage("No files found here..", "error")
    }
        setTimeout(() => {
            hideDeleteAllMessage()
        }, 3000);
}catch(error){
    console.log(error)
}
} 
// when click on delete yes 
elements.delSure.addEventListener("click", ()=>{
deleteall()
    elements.deleteConfirm.style.opacity= "0";
    elements.deleteConfirm.style.pointerEvents="none";
          showAfterDeleteMessage("All files Deleted. Refresh the Page.", "success")
             setTimeout(() => {
            hideDeleteAllMessage()
        }, 3000);
})
// when click on not to delete
elements.deleNotSure.addEventListener("click", ()=>{
    elements.deleteConfirm.style.opacity= "0";
    elements.deleteConfirm.style.pointerEvents="none";
})

// show message after files deleted 
function showAfterDeleteMessage(text, type){
    const msgElement = document.getElementById("msgElement")
    msgElement.innerText= text;
    msgElement.style.opacity="1"
    if(type === "success"){
        msgElement.style.color= "lightgreen"
    }else if(type=== "error"){
        msgElement.style.color="lightcoral"
    }}
// hide delete all message after deleted
function hideDeleteAllMessage(){
    const msgElement = document.getElementById("msgElement")
      msgElement.style.opacity="0"
      msgElement.style.pointerEvents="none"
}
