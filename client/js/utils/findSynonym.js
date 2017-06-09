"use strict";


function findSynonym(){

    function openInNewTab(query) {
        var win = window.open('https://www.synonimy.pl/synonim/' + query, '_blank');
        win.focus();
    }

    function getSelectionText() {
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type !== "Control") {
            text = document.selection.createRange().text;
        }
        return text;
    }

    var pattern = getSelectionText();
    openInNewTab(pattern);
}