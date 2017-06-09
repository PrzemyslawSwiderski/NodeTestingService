"use strict";

/**
 * Skrypt umożliwiający synchronizację z bazą danych bez potrzeby uruchomienia aplikacji
 *
 * Created by PSWIDERSKI on 28.03.2017.
 */


var models = require("../server/models/index");

models.sequelize.sync({force: true});