// ==UserScript==
// @name         VADETS Auto Clicker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://vadriveredu.org/mod/lesson/view.php
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
        // const startTimer = (pages, current = 1) => {
        //     const timeout = (Math.floor(Math.random() * (180 - 120)) + 120) * 1000;
        //     console.log("CURRENT WAIT:" + (timeout));
        //     // const timeout = (Math.floor(Math.random() * (10 - 5)) + 5) * 1000;
        //     var link = document.createElement('a');
        //     link.href = document.querySelectorAll('img')[3].src;
        //     link.download = '1.jpg';
        //     document.body.appendChild(link);
        //     link.click();
        //     document.body.removeChild(link);

        //     setTimeout(function() {
        //         document.querySelector("input[name='continue']").click();
        //         if(pages != current) {
        //             startTimer(pages, current + 1);
        //         }
        //     // }, Math.random(600, 840) * 1000);
        //     }, timeout);
        // }
        const nextSlideRange = [120, 240];

        const startTimer = () => {
            if(document.querySelector("#answerid1") == null && document.querySelector("#content > table > tbody > tr > td > form > div > a") == null && document.querySelector("#content > form > div > a") == null && document.querySelector("#content > div:nth-child(3) > a") == null) {
                const fullName = document.querySelector("#page > div.navbar.clearfix > div.breadcrumb > ul > li:nth-child(4) > a").innerText.split(" ");
                const currentModule = fullName[0] + " " + fullName[1];
                const topic = fullName[2] + " " + fulName[3];
                const timeout = (Math.floor(Math.random() * (nextSlideRange[1] - nextSlideRange[0])) + nextSlideRange[0]) * 1000;
                var link = document.createElement('a');
                link.href = document.querySelectorAll('img')[3].src;
                link.download = '1.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setTimeout(function() {
                    document.querySelector("input[name='continue']").click();
                }, timeout);
            } else if(document.querySelector("#answerid1") != null) {
                setTimeout(function() {
                    document.querySelector("#answerid1").checked = true;
                    document.querySelector("#content > table > tbody > tr > td > form > div > a").click();
                }, (Math.floor(Math.random() * (3 - 1)) + 1) * 1000)
            } else if(document.querySelector("#content > form > div > a") != null) {
                setTimeout(function() {
                    document.querySelector("#content > form > div > a").click();
                }, (Math.floor(Math.random() * (3 - 1)) + 1) * 1000)
            } else if(document.querySelector("#content > div:nth-child(3) > a") != null) {
                setTimeout(function() {
                    document.querySelector("#content > div:nth-child(3) > a").click();
                }, (Math.floor(Math.random() * (3 - 1)) + 1) * 1000)
            } else {
                console.log("HECK")
            }
        }
        window.onload = function() {
            startTimer();
        }
    // Your code here...
})();