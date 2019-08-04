// ==UserScript==
// @name         VADETS Quizzes / Test Automator
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://vadriveredu.org/mod/quiz/attempt.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var qs = document.querySelectorAll('.qtext')
    var fullQs = [];
    var together = [];

    for(var q of qs) {
        fullQs.push(q.innerText);
    }

    const getAns = (questions = fullQs) => {
        const currentQ = questions[0];

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                together.push({q: currentQ, a: JSON.parse(xhttp.responseText).answer});
                questions = questions.splice(1)
                if(questions.length > 0) {
                    getAns(questions);
                } else {
                    let i = 0;
                    for(q of qs) {
                        q.innerHTML += ` <span class='ans99999' style='color: transparent;'>${together[i].a}</span>`
                        i++;
                    }
                }
            }
        };
        xhttp.open("GET", "http://localhost:3030/search?q=" + currentQ.replace(/’/gm, '\'').replace(/–/gm, '-'), true);
        xhttp.send();
    }

    document.addEventListener('keydown', (e) => {
        if(e.key == "`") {
            var myElements = document.querySelectorAll(".ans99999");

            for (var i = 0; i < myElements.length; i++) {
                myElements[i].style.display = "inline";
            }
        }
    })

    document.addEventListener('keyup', (e) => {
        if(e.key == "`") {
            var myElements = document.querySelectorAll(".ans99999");

            for (var i = 0; i < myElements.length; i++) {
                myElements[i].style.display = "none";
            }
        }
    })

    getAns()

    // Your code here...
})();