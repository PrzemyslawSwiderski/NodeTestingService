"use strict";

function generateTestAsPDF(test) {

    const testDocDefinition = {
        content: [
            {
                text: "Test o id: " + getSafePDFString(test.id) + " dla stanowiska: " + getSafePDFString(test.Job.name) + "\n\n\n\n",
                style: "header"
            }
            ,
            {text: "Pytania:\n\n", style: "bigger"},
            {
                ul: getQuestionsList()
            },
            {
                text: "Prosimy o podkreślenie poprawnej odpowiedzi w pytaniach zamkniętych oraz o wpisanie odpowiedzi tekstowej pod pytaniami otwartymi.\n\n\n",
                style: "bigger"
            }
        ],
        footer: {
            text: "Data wygenerowania: " + getCurrentDateToString(), alignment: "center"
        },
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                color: "maroon"
            },
            bigger: {
                fontSize: 15,
                bold: true
            },
            ulOpenQuestion: {
                fontSize: 15,
                italics: true,
                color: "darkblue",
                margin: [0, 0, 0, 80]
            },
            ulClosedQuestion: {
                fontSize: 15,
                italics: true,
                color: "blue"
            },
            ol: {
                fontSize: 15,
                italics: true,
                color: "darkgreen",
                margin: [0, 5, 0, 5]
            }
        }
    };

    function getQuestionsList() {
        var questionsList = [];
        test.Questions.forEach(function (q, i) {
            var questionType = q.questionType === "OPEN" ? "otwarte" : "zamknięte";
            questionsList.push({
                text: "Pytanie " + questionType + " nr. " + (i + 1) + " : " + getSafePDFString(q.question),
                style: q.questionType === "CLOSED" ? "ulClosedQuestion" : "ulOpenQuestion"
            });
            var answersList = [];

            if (q.questionType === "CLOSED") {
                q.Answers.forEach(function (a, i) {
                    answersList.push({text: getSafePDFString(a.answer) + "\n", style: "ol"})
                });
                questionsList.push({ol: answersList});
            }
        });
        return questionsList;
    }

    pdfMake.createPdf(testDocDefinition).download("test_" + test.id + "_as_PDF");
}