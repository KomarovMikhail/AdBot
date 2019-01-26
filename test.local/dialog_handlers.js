class BotMessageHandler {
    constructor() {
        this.over = false;
        this.step = -1;
        this.mail = null;
        this.botMessages = [
            "Похоже, мы с тобой видимся впервые. Ну или ты решил не сохранять данные о себе и я тебя забыл. " +
            "В любом случае - давай знакомиться! Как тебя зовут?", // 0
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

    needList() {
        if (this.step === 10) return true;
        if (this.step === 11) return true;
        if (this.step === 12) return true;
        return this.step === 13;
    }

    getProperty() {
        switch (this.step) {
            case 2: return "city";
            case 3: return "education";
            case 4: return "university";
            case 5: return "specialty";
            case 8: return "intern_exp";
            case 9: return "work_exp";
            case 10: return "specialty";
            case 11: return "business";
            case 12: return "specialty";
            case 13: return "business";
            case 14: return "hours_week";
            case 15: return "salary";
            case 16: return "emp_type";
            default: return "none";
        }
    }

    sendVacancies() {
        let request = getXmlHttp();
        let vacancies = [];
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if(request.status === 200) {
                    vacancies = JSON.parse(request.responseText);
                }
            }
        };
        request.open('GET', '/handlers/vacancy_handler.php?id=' + this.mail, false);
        request.send(null);

        let newMessage = "<div class='bot-message'><p>Вот вакансии, которые тебе могут подойти:</p>";
        for (let i = 0; i < vacancies.length; i++) {
            newMessage += "<p>" + i + ") <a href='" + vacancies[i]['link'] + "' target='_blank'>" + vacancies[i]['name'] + "</a></p>";
        }
        newMessage += "</div>";
        document.getElementById("bot-workspace").innerHTML += newMessage;
        setScrollBottom();
    }

    sendMessage(justStarted) {
        if (this.over) {
            let newMessage = "<div class=\"bot-message\">Спасибо за ответы! Если хочешь ответить на вопросы заново - нажми на кнопку \"Начать заново\" (Она скоро появится)</div>";
            document.getElementById("bot-workspace").innerHTML += newMessage;
            setScrollBottom();
            return;
        }
        if (this.step === this.botMessages.length - 1) {
            this.sendVacancies();
            this.over = true;
            return;
        }
        let request = getXmlHttp();
        let step = -1;
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if(request.status === 200) {
                    step = JSON.parse(request.responseText);
                    // alert(step)
                }
            }
        };
        request.open('GET', '/handlers/user_step_handler.php?id=' + this.mail, false);
        request.send(null);

        if (justStarted && step > 0) {
            let newMessage = "<div class=\"bot-message\">Похоже, что мы уже общались раньше. Давай продолжим)</div>";
            document.getElementById("bot-workspace").innerHTML += newMessage;
            setScrollBottom();
        }
        let newMessage = "<div class=\"bot-message\">" + this.botMessages[step] + "</div>";
        document.getElementById("bot-workspace").innerHTML += newMessage;
        setScrollBottom();

        this.step = step;
    }

    needChoiceList() {
        return this.step === 8 || this.step === 9 || this.step === 14 || this.step === 15 || this.step === 16
    }

    needSendData() {
        return this.step >= this.botMessages.length;
    }
}

class UserDataHandler {
    constructor() {
        this.mail = null;
    }

    append(step, data) {
        if (step === -1) {
            this.mail = data;
            return
        }

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
            case 16: key = 'emp_type'; break;
        }

        let requestUrl = '/handlers/user_data_handler.php?id=' + this.mail + '&property=' + key + '&value=' + data;

        let request = getXmlHttp();
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if(request.status === 200) {
                    let response = JSON.parse(request.responseText);
                    alert(response.length)
                }
            }
        };
        request.open('GET', requestUrl, true);
        request.send(null);
    }

    // getVacancy() {
    //     let requestUrl = '/handlers/vacancy_handler.php?';
    //     for (let key in this.data) {
    //         if (this.data.hasOwnProperty(key)) {
    //             requestUrl += key + '=' + this.data[key] + '&';
    //         }
    //     }
    //     requestUrl = requestUrl.substring(0, requestUrl.length - 1);
    //
    //     let request = getXmlHttp();
    //     request.onreadystatechange = function() {
    //         if (request.readyState === 4) {
    //             if(request.status === 200) {
    //                 let response = JSON.parse(request.responseText);
    //                 alert(response)
    //             }
    //         }
    //     };
    //     request.open('GET', requestUrl, true);
    //     request.send(null);
    // }
}