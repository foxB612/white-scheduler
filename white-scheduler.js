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
    let table = document.getElementById('ACE_DERIVED_CLASS_S_GROUPBOX1');
    if (table) {
        let newTd = document.createElement('td');
        newTd.setAttribute('rowspan', '3');
        newTd.setAttribute('valign', 'top');
        newTd.align = 'left';
        let div = document.createElement('div');
        div.style = `
            margin: 0;
            font-size: 9pt;
            cursor: default;
        `;
        div.classList.add('PSPUSHBUTTON', 'Left');
        div.onmouseover = function(e) {
            let div = e.currentTarget;
            div.style.background = '#fad9a5';
        };
        div.onmouseout = function(e) {
            let div = e.currentTarget;
            div.style.background = null;
        };
        div.onclick = main;
        let img = document.createElement('img');
        img.src = 'https://image.flaticon.com/icons/svg/185/185675.svg';
        img.height = 20;
        img.style = 'vertical-align: middle';
        div.appendChild(img);
        let span = document.createElement('span');
        span.innerHTML = '点我';
        span.style.backgroundColor = 'Transparent';
        div.appendChild(span);
        newTd.appendChild(div);
        table.children[0].children[1].appendChild(newTd);
    }
})();

function main(e) {
    let table = document.getElementById('WEEKLY_SCHED_HTMLAREA');
    table = table.children[2];
    let row = 0;
    for (let tr of table.children) {
        if (row % 2 == 0) {
            // odd row (head not count)
            // skip first row (table head)
            if (row != 0) {
                for (let td of tr.children) {
                    // skip the first column (time)
                    if (td.children.length > 0) {
                        td.style.cursor = 'pointer';
                        td.onclick = addLink;
                    }
                }
            }
        }
        else {
            // even row
            let column = 0;
            for (let td of tr.children) {
                // skip the first column (time)
                if (column != 0 && td.children.length > 0) {
                    td.style.cursor = 'pointer';
                    td.onclick = addLink;
                }
                column++;
            }
        }
        row++;
    }
    alert('Now click on courses to add links.');
}

function addLink(e) {
    var info = e.currentTarget.firstChild.innerHTML;
    alert("You clicked " + info.substr(0, info.indexOf('<br>')));
}