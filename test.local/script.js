// import {getXmlHttp} from './requests';

function getXmlHttp() {
    let xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class BotMessageHandler {
    constructor() {
        this.isUserTurn = true;
        this.step = 0;
        this.isBotSentMessage = false;
        this.botMessages = [
            "В каком году ты родился(ась)?",
            "Из какого ты города?",
            "Какое у тебя образование? (1 курс/выпускник/аспирантура/нет)",
            "В каком вузе ты учился(ась) / учишься? "
        ];
    }

    refreshData() {
        this.isUserTurn = true;
        this.step = 0;
        this.isBotSentMessage = false;
    }

    getStep() {
        return this.step;
    }

    sendMessage() {
        if (this.step >= this.botMessages.length) {
            this.step += 1;
            return;
        }
        let newMessage = "<div class=\"bot-message\">" + this.botMessages[this.step] + "</div>";
        document.getElementById("bot-workspace").innerHTML += newMessage;
        setScrollBottom();

        this.step += 1;
    }
}

let botMessageHandler = new BotMessageHandler();

function getProperty(step) {
    switch (step) {
        case 0: return "none";
        case 1: return "none";
        case 2: return "city";
        case 3: return "education";
        case 4: return "university";
        default: return "none";
    }
}

function onUserInput() {
    let message = document.getElementById("message-input").value;
    let property = getProperty(botMessageHandler.getStep());
    //test request
    let req = getXmlHttp();
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            if(req.status === 200) {
                let offerList = JSON.parse(req.responseText);

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
    req.open('GET', '/handlers/offer_list_handler.php?message=' + message + '&property=' + property, true);
    req.send(null);


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
    let message = document.getElementById("message-input").value;
    if (message.length === 0) {
        return
    }
    let newMessage = "<div class=\"user-message\">" + message + "</div>";
    document.getElementById("bot-workspace").innerHTML += newMessage;
    document.getElementById("message-input").value = "";
    document.getElementById("offer-list").hidden = true;
    setScrollBottom();

    // await sleep(700);
    botMessageHandler.sendMessage();

    document.getElementById("message-input").focus();


}