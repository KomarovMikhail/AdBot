function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let botMessageHandler = new BotMessageHandler();
let userDataHandler = new UserDataHandler();

function onUserInput() {
    let message = document.getElementById("message-input").value;
    let property = botMessageHandler.getProperty();

    let request = getXmlHttp();
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if(request.status === 200) {
                let offerList = JSON.parse(request.responseText);

                let resultHTML = "";
                for (let i = 0; i < offerList.length; ++i) {
                    resultHTML += "<div class='offer-list-item' onclick='onClickItem(event)' title='" + offerList[i]
                        + "'>" + offerList[i] + "</div>"; // add class to div tag
                }
                if (offerList.length !== 0) {
                    document.getElementById("offer-list").hidden = false;
                }
                document.getElementById("offer-list").innerHTML = resultHTML;
            }
        }
    };
    request.open('GET', '/handlers/offer_list_handler.php?message=' + message + '&property=' + property, true);
    request.send(null);
}

function onClickItem(event) {
    event = event || window.event; // IE
    let target = event.target || event.srcElement; // IE
    document.getElementById("message-input").value = target.innerHTML;
    onSendMessage();
}

function setScrollBottom() {
    let element = document.getElementById("bot-workspace");
    element.scrollTop = element.scrollHeight;
}

function onEnterInput(event) {
    if (event.keyCode === 13) {
        onSendMessage();
    }
}

function onSendMessage() {
    let inputElement = document.getElementById("message-input");
    let message = inputElement.value;
    if (message.length === 0) {
        return
    }
    let newMessage = "<div class=\"user-message\">" + message + "</div>";
    document.getElementById("bot-workspace").innerHTML += newMessage;
    userDataHandler.append(botMessageHandler.step, message);

    // refresh default values for input area
    inputElement.value = "";
    inputElement.disabled = false;
    document.getElementById("offer-list").hidden = true;
    setScrollBottom();

    if (botMessageHandler.needSendData()) {
        userDataHandler.getVacancy();
    }

    // await sleep(700);

    //send next question
    botMessageHandler.sendMessage();

    document.getElementById("message-input").focus();

    if (botMessageHandler.needChoiceList()) {

        inputElement.disabled = true;
        inputElement.value = "Выбери из списка:";
        onUserInput();
    }
}