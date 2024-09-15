const socket=io()
let name;
let textarea=document.querySelector('#textarea')
let messagearea=document.querySelector('.messagearea')
do{
    name=prompt('please enter ur name')
}while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key=='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(messg){
    let msg={
        user:name,message:messg.trim()
    }
    appendMessage(msg,'outgoing')
    textarea.value=''
    scroll()

    //send message to server
    socket.emit('message',msg)
}
function appendMessage(msg,type){
    let maindiv=document.createElement('div')
    let classname=type
    maindiv.classList.add(classname,'message')

    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    maindiv.innerHTML=markup
    messagearea.appendChild(maindiv)
}

//receive messages
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scroll()
})

function scroll(){
    messagearea.scrollTop=messagearea.scrollHeight
}