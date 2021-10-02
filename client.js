
document.addEventListener("DOMContentLoaded", init);


var id = null;

const addMessage = (message, type='out') => {

    const mesEl = document.createElement("div");
    mesEl.classList.add("message", type);
    mesEl.innerText = message;

    const mainEl = document.getElementById('main');
    mainEl.appendChild(mesEl);
    mainEl.scrollTop = 10000;
}

function init() {
    const myWs = new WebSocket('wss://id-wschat.herokuapp.com');
    console.log("Loaded")

    document.getElementById('input').addEventListener("keypress", (e) => {
        if (e.code == 'Enter') {
            let val = e.target.value;
            e.target.value = null;
            console.log(val);
            addMessage(val);
            const data = {
                client_id: id,
                client_message: val
            };
            myWs.send(JSON.stringify({action: 'client_send_message', data}));    
        }
    });

    myWs.onmessage = function (message) {
        console.log('Message: %s', message.data);
        addMessage(message.data, "in");
      };

    window.addEventListener("message", (e) => e.data ? id = e.data : id = null);
}