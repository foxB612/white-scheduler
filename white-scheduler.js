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
            border: 1px solid #d8a676;
            border-radius: 2px;
            background: -webkit-gradient(linear, left top, left bottom, from(#FCF0DA), to(#FAE6BF));
            background: -moz-linear-gradient(top, #FCF0DA, #FAE6BF);
            background: -ms-linear-gradient(top, #FCF0DA, #FAE6BF);
            font-size: 9pt;
            cursor: default;
        `;
        var img = document.createElement('img');
        img.src = 'https://image.flaticon.com/icons/svg/185/185675.svg';
        img.height = 20;
        img.style = 'vertical-align: middle';
        div.appendChild(img);
        var span = document.createElement('span');
        span.innerHTML = '点我';
        div.appendChild(span);
        newTd.appendChild(div);
        table.children[0].children[1].appendChild(newTd);

        var refresh = document.getElementById('DERIVED_CLASS_S_SSR_REFRESH_CAL$8$');
        refresh.value = 'Hacked!';
    }
})();