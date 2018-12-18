class BotMessageHandler {
    constructor() {
        this.step = 0;
        this.botMessages = [
            "В каком году ты родился(ась)?", // 1
            "Из какого ты города?", // 2
            "Какое у тебя образование? (1 курс/выпускник/аспирантура/нет)", // 3
            "В каком вузе ты учился(ась) / учишься?", // 4
            "На какой специальности?", // 5
            "В каком году ты окончишь/окончил(а) институт?", // 6
            "Какой твой срединий балл?", // 7
            "Есть ли у тебя опыт стажировки?", // 8
            "А опыт работы?", // 9
            "Какие специальности ты для себя рассматриваешь? (Перечисли через запятую)", // 10
            "Какие сферы бизнеса ты для себя рассматриваешь? (Перечисли через запятую)", // 11
            "Какие специальности ты для себя категорически не рассматриваешь? (Перечисли через запятую)", // 12
            "Какие сферы бизнеса ты для себя категорически не рассматриваешь? (Перечисли через запятую)", // 13
            "Сколько часов в неделю ты готов работать?", // 14
            "Какие твои ожидания по З/П", // 15
            "Отметь приоритетные для тебя типы занятости.", // 16
        ];
    }

    getProperty() {
        switch (this.step) {
            case 2: return "city";
            case 3: return "education";
            case 4: return "university";
            case 5: return "specialty";
            case 10: return "specialty";
            case 11: return "business";
            case 12: return "specialty";
            case 13: return "business";
            default: return "none";
        }
    }

    sendMessage() {
        if (this.step === this.botMessages.length) {
            this.step += 1;
            return;
        }
        let newMessage = "<div class=\"bot-message\">" + this.botMessages[this.step] + "</div>";
        document.getElementById("bot-workspace").innerHTML += newMessage;
        setScrollBottom();

        this.step += 1;
    }
}

class UserDataHandler {
    constructor() {
        this.data = {};
    }

    append(step, data) {
        let key;
        switch (step) {
            case 0: key = 'name'; break;
            case 1: key = 'born'; break;
            case 2: key = 'city'; break;
            case 3: key = 'education'; break;
            case 4: key = 'university'; break;
            case 5: key = 'edu_specialty'; break;
            case 6: key = 'graduated'; break;
            case 7: key = 'mean_mark'; break;
            case 8: key = 'intern_exp'; break;
            case 9: key = 'work_exp'; break;
            case 10: key = 'true_spec'; break;
            case 11: key = 'true_business'; break;
            case 12: key = 'false_spec'; break;
            case 13: key = 'false_business'; break;
            case 14: key = 'hours_week'; break;
            case 15: key = 'salary'; break;
            case 16: key = 'types'; break;
        }
        this.data[key] = data;
    }

    getVacancy() {
        let requestUrl = '/handlers/vacancy_handler.php?';
        for (let key in this.data) {
            if (this.data.hasOwnProperty(key)) {
                requestUrl += key + '=' + this.data[key] + '&';
            }
        }
        requestUrl = requestUrl.substring(0, requestUrl.length - 1);
        alert(requestUrl);

        let request = getXmlHttp();
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if(request.status === 200) {

                }
            }
        };
        request.open('GET', requestUrl, true);
        request.send(null);
    }
}