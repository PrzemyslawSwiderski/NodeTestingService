"use strict";


function searchOnWikipedia(){

    function openInNewTab(query) {
        var win = window.open('https://pl.wikipedia.org/w/index.php?search=' + query, '_blank');
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