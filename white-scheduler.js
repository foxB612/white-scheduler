// ==UserScript==
// @name         CUSIS Parser
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://cusis.cuhk.edu.hk/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var table = document.getElementById('ACE_DERIVED_CLASS_S_GROUPBOX1');
    if (table) {
        var newTd = document.createElement('td');
        newTd.setAttribute('rowspan', '3');
        newTd.setAttribute('valign', 'top');
        newTd.align = 'left';
        var div = document.createElement('div');
        div.style = `
            margin: 0;
            font-size: 9pt;
            cursor: default;
        `;
        div.classList.add('PSPUSHBUTTON', 'Left');
        div.onmouseover = function(e) {
            var div = e.currentTarget;
            div.style.background = '#fad9a5';
        };
        div.onmouseout = function(e) {
            var div = e.currentTarget;
            div.style.background = null;
        };
        div.onclick = main;
        var img = document.createElement('img');
        img.src = 'https://image.flaticon.com/icons/svg/185/185675.svg';
        img.height = 20;
        img.style = 'vertical-align: middle';
        div.appendChild(img);
        var span = document.createElement('span');
        span.innerHTML = '点我';
        span.style.backgroundColor = 'Transparent';
        div.appendChild(span);
        newTd.appendChild(div);
        table.children[0].children[1].appendChild(newTd);
    }
})();

function main(e) {
    alert(e.currentTarget);
}