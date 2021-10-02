
document.addEventListener("DOMContentLoaded", init);

const myWs = new WebSocket('wss://id-wschat.herokuapp.com');
var id = null;

const addMessage = (message, type='out') => {

    const mesEl = document.createElement("div");
    mesEl.classList.add("message", type);
    mesEl.innerText = message;

    const mainEl = document.getElementById('main');
    mainEl.appendChild(mesEl);
    mainEl.scrollTop = 10000;
}

const sendMessage = (message) => {
    addMessage(message);
    const data = {
        client_id: id,
        client_message: message
    };
    myWs.send(JSON.stringify({action: 'client_send_message', data}));    
}

function init() {
    const inputEl = document.getElementById("input");
    const sendEl = document.getElementById("send");
    console.log("Loaded")


    sendEl.addEventListener("click", (e) => {
        let val = inputEl.value;
        sendMessage(val);
        inputEl.value = '';
    });

    inputEl.addEventListener("keypress", (e) => {
        if (e.code == 'Enter') {
            let val = e.target.value;
            sendMessage(val);
            e.target.value = '';
        }
    });

    myWs.onmessage = function (message) {
        console.log('Message: %s', message.data);
        addMessage(message.data, "in");
      };

    window.addEventListener("message", (e) => e.data ? id = e.data : id = null);
}