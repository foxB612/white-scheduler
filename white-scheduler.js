// ==UserScript==
// @name         White Scheduler
// @namespace    http://foxb612.com
// @version      1.0
// @description  A mysterious scheduler made by White Magic Association
// @author       foxb612
// @match        *://cusis.cuhk.edu.hk/*
// @grant        none
// ==/UserScript==

// Insert buttons
function insertButton() {
    'use strict';
    let table = document.getElementById('ACE_DERIVED_CLASS_S_GROUPBOX1');
    if (table) {
        let newTd = document.createElement('td');
        newTd.setAttribute('rowspan', '3');
        newTd.setAttribute('valign', 'top');
        newTd.id = 'FOXBUTTON1';
        newTd.align = 'left';
        let div = document.createElement('div');
        div.style = `
            width: 50px;
            margin: 0 2px;
            font-size: 9pt;
            cursor: default;
        `;
        div.classList.add('PSPUSHBUTTON', 'Left');
        div.setAttribute('mouseover', hover);
        div.setAttribute('mouseout', out);
        div.onclick = help;
        let img = document.createElement('img');
        img.src = 'https://image.flaticon.com/icons/svg/185/185675.svg';
        img.height = 20;
        img.style = 'vertical-align: middle';
        div.appendChild(img);
        let span = document.createElement('span');
        span.innerHTML = 'Help';
        span.style.backgroundColor = 'Transparent';
        div.appendChild(span);
        newTd.appendChild(div);
        table.children[0].children[1].appendChild(newTd);

        let newTd2 = newTd.cloneNode(true);
        newTd.id = 'FOXBUTTON2';
        newTd2.firstChild.children[1].innerHTML = 'Build';
        newTd2.firstChild.onclick = build;
        table.children[0].children[1].appendChild(newTd2);
    }
}

function hover(e) {
    let div = e.currentTarget;
    div.style.background = '#fad9a5';
}

function out(e) {
    let div = e.currentTarget;
    div.style.background = null;
}

function help(e) {
    let helpText = `Help:
    1. Click blocks to add links;
    2. Hover over the block to see the added link;
    3. Click Build to save the html file.
    
    Credit:
    Fox icon is made by Freepik from www.flaticon.com
    `;
    alert(helpText);
}

let table = document.getElementById('WEEKLY_SCHED_HTMLAREA');
let courses = [];
let links = {};

// Add event listeners to blocks
function blockClick() {
    if (!table) return;
    let tbody = table.children[2];
    let row = 0;
    for (let tr of tbody.children) {
        row++;
        // skip first row
        if (row == 1) continue;
        let column = 0;
        for (let td of tr.children) {
            column++;
            if (row % 2 == 0 && column == 1) continue;
            if (td.childElementCount <= 0) continue;
            courses.push(td);
            td.style.cursor = 'pointer';
            td.addEventListener('click', addLink);
        }
    }
}

function addLink(e) {
    e.preventDefault();
    let td = e.currentTarget;
    let info = td.firstChild.innerHTML;
    let message = '[' + courses.indexOf(td) + '] ' + info.substr(0, info.indexOf('<br>')) + '\n';
    message += 'Input the link:';
    let link = prompt(message);
    if (link === null) return;
    if (validURL(link)) {
        link = setHttp(link);
        td.firstChild.innerHTML += '<br>Link Added';
        td.setAttribute('title', link);
        links['no' + courses.indexOf(td)] = link;
    }
    else {
        alert('Wrong format. Please check the link.');
    }
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

function setHttp(link) {
    if (link.search('^http[s]?://') == -1) {
        link = 'http://' + link;
    }
    return link;
}

function processHTML() {
    if (!table) return;
    let tbody = table.children[2];
    let row = 0;
    for (let tr of tbody.children) {
        row++;
        // skip first row
        if (row == 1) continue;
        let column = 0;
        for (let td of tr.children) {
            column++;
            if (row % 2 == 0 && column == 1) continue;
            if (td.childElementCount <= 0) continue;
            let t = td.firstChild.innerHTML;
            t = t.replace(/((<br>No Room Required )|(<br>Link Added))/g, '');
            td.firstChild.innerHTML = t;
            td.removeEventListener('click', addLink);
            let index = courses.indexOf(td);
            let link = links['no' + index];
            if (link == undefined) continue;
            td.setAttribute('onclick', 'javascript: window.open(\'' + link + '\')');
        }
    }
}

function saveHTML() {
    let style = `<style>
    table, th, tr, td {
        font-family: Arial,sans-serif;
        font-size: 9pt;
        font-weight: normal;
        font-style: normal;
        color: rgb(81,81,81);
        background-color: rgb(255,255,255);
        line-height: 120%;
        border-bottom-width: 1px;
        border-right-width: 1px;
        border-bottom-color: rgb(230,230,230);
        border-right-color: rgb(230,230,230);
        border-bottom-style: solid;
        border-right-style: solid;
    }
    table {
        width: 800px;
        margin: auto;
    }
</style>`;
    let content = '<head>\n' + style + '\n</head>\n<body>\n' + table.outerHTML + '\n</body>';
    let blob = new Blob([content], {type: "text/html;charset=utf-8"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Schedule.html";
    a.hidden = true;
    document.body.appendChild(a);
    a.innerHTML = "White Scheduler download";
    a.click();
}

function build() {
    processHTML();
    saveHTML();
}

(function () {
    insertButton();
    blockClick();

    // Observe DOM tree change to hook Refresh event
    const targetNode = document.getElementById('win0divPSPAGECONTAINER');
    if (!targetNode) return;
    const config = { attributes: false, childList: true, subtree: false };

    let flag = true;
    const callback = function (mutationsList, observer) {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                flag = !flag;
                if (flag) {
                    // page is reloaded.
                    // but whether finished or just start reloading?
                    table = undefined;
                    courses = [];
                    links = {};
                    insertButton();
                    table = document.getElementById('WEEKLY_SCHED_HTMLAREA');
                    blockClick();
                }
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
})();
