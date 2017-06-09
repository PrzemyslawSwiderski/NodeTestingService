"use strict";


function getCurrentDateToString() {
    var d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + "-" +
        (d.getDate() < 10 ? "0" + d.getDate() : d.getDate());
}

function getSafePDFString(field) {

    if (field === null) {
        return " ";
    }

    if (typeof field === "number" || field instanceof Number) {
        return field.toString();
    }

    if (typeof field === "string" || field instanceof String) {
        return field;
    }
}
