let input = document.querySelector("#inputbox");
let chatcontainer=document.querySelector(".chat-container");

const url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyALGZdurKU2wbYEQJfmTt1o4uv4pnFVzBc"

let user={
    data:null,

}
console.log(user.data);

async function generateresponse(aichatbox){
    let chatoutput=aichatbox.querySelector(".chat-output");
    let requestoption={
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
            contents: [{
              parts:[{text: user.data}]
              }]
             })
    }
    try{
        let response=await fetch(url,requestoption);
        let data=await response.json();
        let apiresponse=data?.candidates[0].content.parts[0].text;
        chatoutput.innerText=apiresponse;
    }
    catch(error){
        console.log(error)
    }
    
}

function creatchat(html,classes){
    let div=document.createElement("div");
    div.innerHTML=html;
    div.classList.add(classes);
    return div;
}

function chatprocess(message){
    user.data=message;
    let html=`<img src="sig.jpg" alt="user image" id="user-img" width="50">
    <div class="user-input">
        ${user.data}
    </div>`
    input.value="";
    let createchatbox= creatchat(html,"user-chat");
    chatcontainer.appendChild(createchatbox);

    setTimeout(()=>{
        let html=`<img src="logo.jpg" id="aiprofile" alt="Chankya" width="50">
        <div class="chat-output">
        <img src="UDui.gif" class="load" alt="loading" width="80px" height="30px">
        </div>`
        let aichatbox=creatchat(html,"ai-chat");
        chatcontainer.appendChild(aichatbox);
        smoothScrollToBottom();
        generateresponse(aichatbox);
    },400)
}
function smoothScrollToBottom() {
    chatcontainer.scrollTo({
        top: chatcontainer.scrollHeight,
        behavior: "smooth",
    });
}
input.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
       chatprocess(input.value);
       
    }
})
