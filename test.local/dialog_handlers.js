class BotMessageHandler {
    constructor() {
        this.over = false;
        this.step = -1;
        this.mail = null;
        this.botMessages = [
            "Похоже, мы с тобой видимся впервые. Ну или ты решил не сохранять данные о себе и я тебя забыл. " +
            "В любом случае - давай знакомиться! Как тебя зовут? (Фамилия, имя)", // 0
            "Какой год твоего рождения?", // 1
            "Из какого ты города? (Если твоего города нет в списке, то выбери \"Другое\")", // 2
            "Какое у тебя образование? (1 курс/выпускник/аспирантура/нет)", // 3
            "Из какого ты вуза? (Если не твоего вуза нет в списке, то выбери \"Другое\")", // 4
            "На какой специальности? (Обязательно выбери из предлагаемого списка)", // 5
            "Напиши год своего выпуска из института?", // 6
            "Какой твой срединий балл по 5-бальной школе? (Например: 4.56)", // 7
            "Есть ли у тебя опыт стажировки?", // 8
            "А опыт работы?", // 9
            "Какая твоя желаемая должность? Можешь выбрать несколько, а когда закончишь выбирать - просто введи \"Дальше\" (Обязательно выбери из предлагаемого списка)", // 10
            "Какие должности ты для себя категорически не рассматриваешь? Можешь выбрать несколько, а когда закончишь выбирать - просто введи \"Дальше\" (Обязательно выбери из предлагаемого списка)", // 11
            "Какая твоя желаемая сферы бизнеса? Можешь выбрать несколько, а когда закончишь выбирать - просто введи \"Дальше\" (Обязательно выбери из предлагаемого списка)", // 12
            "Какие сферы бизнеса ты для себя категорически не рассматриваешь? Можешь выбрать несколько, а когда закончишь выбирать - просто введи \"Дальше\" (Обязательно выбери из предлагаемого списка)", // 13
            "Сколько часов в неделю ты готов работать?", // 14
            "Какую работу ты рассматриваешь", // 15
            "Отметь приоритетные для тебя типы занятости.", // 16
        ];
    }

    // when need to choose several values
    needList() {
        return this.step === 10 || this.step === 11 || this.step === 12 || this.step === 13
    }

    isOver() {
        return this.over;
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
            case 11: return "specialty";
            case 12: return "business";
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
        request.open('POST', '/handlers/vacancy_handler.php', false);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send('id=' + this.mail);

        let newMessage = "<div class='bot-message'><p>Вот вакансии, которые тебе могут подойти:</p>";
        for (let i = 0; i < vacancies.length; i++) {
            newMessage += "<p>" + i + ") <a href='" + vacancies[i]['link'] + "' target='_blank'>" + vacancies[i]['name'] + "</a></p>";
        }
        newMessage += "<p>Если захочешь ответить на все вопросы заново - введи /again</p>";
        newMessage += "</div>";
        document.getElementById("bot-workspace").innerHTML += newMessage;
        setScrollBottom();
    }

    sendMessage(justStarted) {
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
        request.open('POST', '/handlers/user_step_handler.php', false);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send('id=' + this.mail);

        if (justStarted && step > 0) {
            sendMessage("Похоже, что мы уже общались раньше. Давай продолжим)");
            step -= 1;
        }

        if (step < this.botMessages.length) {
            sendMessage(this.botMessages[step]);
        }
        if (step === this.botMessages.length) {
            this.sendVacancies();
            this.over = true;
        }
        if (step > this.botMessages.length) {
            sendMessage("Спасибо за ответы! Если хочешь ответить на вопросы заново - введи /again")
        }

        this.step = step;
    }

    // when need to show fixed offer list
    needFixedChoiceList() {
        return this.step === 8 || this.step === 9 || this.step === 14 || this.step === 15 || this.step === 16
    }

    // when need to show sortable offer list
    needSortableChoiceList() {
        return this.step >= 2 && this.step <= 5 ||
            this.step >= 10 && this.step <= 13
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
            case 11: key = 'false_spec'; break;
            case 12: key = 'true_business'; break;
            case 13: key = 'false_business'; break;
            case 14: key = 'hours_week'; break;
            case 15: key = 'salary'; break;
            case 16: key = 'emp_type'; break;
        }

        let request = getXmlHttp();
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if(request.status === 200) {
                    let response = JSON.parse(request.responseText);
                    alert(response.length)
                }
            }
        };
        request.open('POST', '/handlers/user_data_handler.php', true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send('id=' + this.mail + '&property=' + key + '&value=' + data);
    }
}