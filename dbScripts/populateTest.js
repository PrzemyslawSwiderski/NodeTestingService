"use strict";

/**
 * Created by PSWIDERSKI on 01.04.2017.
 */

var models = require("../server/models/index");
models.User.create({login: "login2", name: "name1", surname: "surname1", email: "email1", password: "pass1"})
    .then(function (user) {
        user.createEditTest().then(function (test) {
            test.createQuestion({
                question: "question1",
                questionType:"questionType1"
            }).then(function (question) {
                question.createAnswer({answer: "opt1"});
                question.createAnswer({answer: "opt2"});
                question.createAnswer({ifCorrect: true, answer: "opt3"});
                question.createAnswer({answer: "opt5"});
            });
            test.createQuestion({
                question: "question2",
                questionType:"questionType2"
            }).then(function (question) {
                question.createAnswer({answer: "opt1"});
                question.createAnswer({answer: "opt2"});
                question.createAnswer({ifCorrect: true, answer: "opt3"});
                question.createAnswer({answer: "opt5"});
            });
            test.createQuestion({
                question: "question3",
                questionType:"questionType3"
            }).then(function (question) {
                question.createAnswer({answer: "opt1"});
                question.createAnswer({answer: "opt2"});
                question.createAnswer({ifCorrect: true, answer: "opt3"});
                question.createAnswer({answer: "opt5"});
            });
            test.createQuestion({
                question: "question4",
                questionType:"questionType4"
            }).then(function (question) {
                question.createAnswer({answer: "opt1"});
                question.createAnswer({answer: "opt2"});
                question.createAnswer({ifCorrect: true, answer: "opt3"});
                question.createAnswer({answer: "opt5"});
            });
        });
    });
