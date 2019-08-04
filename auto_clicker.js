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
        const startTimer = (pages, current = 1) => {
            const timeout = (Math.floor(Math.random() * (720 - 480)) + 480) * 1000;
            console.log("CURRENT WAIT:" + (timeout));
            // const timeout = (Math.floor(Math.random() * (10 - 5)) + 5) * 1000;
            var link = document.createElement('a');
            link.href = document.querySelectorAll('img')[3].src;
            link.download = '1.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(function() {
                document.querySelector("input[name='continue']").click();
                if(pages != current) {
                    startTimer(pages, current + 1);
                }
            // }, Math.random(600, 840) * 1000);
            }, timeout);
        }

        const clicked = () => {
            console.log("Clicked");
        }

        window.onload = function() {
                startTimer(8);
        }
    // Your code here...
})();