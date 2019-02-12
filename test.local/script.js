function checkEmailCorrect(email) {
    if (email.split('@').length !== 2) {
        return false;
    }
    return email.split('@')[1].split('.').length === 2;
}

let botMessageHandler = new BotMessageHandler();
let userDataHandler = new UserDataHandler();

function getLastItem(text) {
    let list = text.split(/;\s*/);
    return list[list.length - 1];
}

function addItemToList(text, item) {
    let list = text.split(/;\s*/);
    list[list.length - 1] = item;
    return list.join('; ') + '; ';
}

function sendMessage(message, flag=true) {
    // flag = true - bot message, flag = false - user message
    let label = "bot";
    if (!flag) {
        label = "user"
    }
    let newMessage = "<div class=\"" + label + "-message\">" + message + "</div>";
    document.getElementById("bot-workspace").innerHTML += newMessage;
    setScrollBottom();
}

// "again" command handler
function startFromBeginning() {
    sendMessage("/again", false);

    if (botMessageHandler.mail !== null) {
        let request = getXmlHttp();
        request.open('POST', '/handlers/delete_user_handler.php', false);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send('id=' + botMessageHandler.mail);
    }

    botMessageHandler = new BotMessageHandler();
    userDataHandler = new UserDataHandler();
    sendMessage("Окей! Я уже тебя забыл! Давай начнем все сначала. Напиши, пожалуйста, свой e-mail.")
}

function cleanInput(inputElement) {
    inputElement.value = "";
    inputElement.disabled = false;
    document.getElementById("offer-list").hidden = true;
    setScrollBottom();
}

// checks if user message is correct
function messageCorrect(message, step) {
    let result = 0;
    let request = getXmlHttp();
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if(request.status === 200) {
                result = JSON.parse(request.responseText);
            }
        }
    };
    request.open('POST', '/handlers/check_message_handler.php', false);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send('message=' + message + '&step=' + step);

    return result === 1;
}

function onUserInput() {
    if (botMessageHandler.isOver()) {
        return;
    }
    let message = document.getElementById("message-input").value;
    // let item = message;
    let property = botMessageHandler.getProperty();

    // if (botMessageHandler.needList()) {
    //     item = getLastItem(message);
    // }
    if (message === "") {
        message = "$"; // for correct work
    }

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
    request.open('POST', '/handlers/offer_list_handler.php', true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send('message=' + message + '&property=' + property);
}

function onClickItem(event) {
    event = event || window.event; // IE
    let target = event.target || event.srcElement; // IE
    // let value = target.innerHTML;
    // if (botMessageHandler.needList()) {
    //     value = addItemToList(document.getElementById("message-input").value, target.innerHTML);
    //     document.getElementById("message-input").value = value;
    //     return;
    // }
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

    if (message === "/again") {
        startFromBeginning();
        cleanInput(inputElement);
        return;
    }

    let justStarted = false;
    if (botMessageHandler.mail === null) {
        if (!checkEmailCorrect(message)) {
            sendMessage(message, false);
            sendMessage("Похоже, ты ввел некорректную почту. Введи, пожалуйста, снова.");

            // refresh default values for input area
            cleanInput(inputElement);
            return;
        }
        botMessageHandler.mail = message;
        justStarted = true;
    }

    // create user message in chat area
    sendMessage(message, false);

    //check if value is correct
    if (!messageCorrect(message, botMessageHandler.step)) {
        sendMessage("Это не похоже на корректное значение, попробуй еще раз.");
        cleanInput(inputElement);
        document.getElementById("message-input").focus();
        return;
    }

    if (botMessageHandler.needList()) {
        if (message !== "Дальше" && message !== "дальше") {
            sendMessage("Ок, записал. Можешь ввести еще, или выбери \"Дальше\" чтобы продолжить диалог.");
            cleanInput(inputElement);
            document.getElementById("message-input").focus();
            return;
        }
    }
    userDataHandler.append(botMessageHandler.step, message);

    // refresh default values for input area
    cleanInput(inputElement);

    //send next question
    botMessageHandler.sendMessage(justStarted);

    document.getElementById("message-input").focus();

    if (botMessageHandler.needSortableChoiceList()) {
        onUserInput();
    }

    if (botMessageHandler.needFixedChoiceList()) {
        inputElement.disabled = true;
        inputElement.value = "Выбери из списка:";
        onUserInput();
    }
}