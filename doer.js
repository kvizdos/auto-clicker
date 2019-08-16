/*
var links = document.querySelectorAll('a[title="Lesson"], a[title="Quiz"]')
var doClick = links[links.length - 1]

1) Check which page it is 
- https://vadriveredu.org/course/view.php?id=3 => Select last item
- https://vadriveredu.org/mod/quiz/attempt.php* => Figure out if it's a test / quiz => Goes to AutoSolver(quiz/test time)
    - Test you need to click manually after filling out and submitting workbook!
- https://vadriveredu.org/mod/lesson/view.php => Auto Clicker
    - Auto upload images to Server
    - Complete:
        - Detect: if(document.querySelector("#content > table > tbody > tr > td > form > div > a").href == "javascript:document.answerform.submit();") {}
        - Select "No": document.querySelector("#answerid1").checked = true
        - Click "Submit": document.querySelector("#content > table > tbody > tr > td > form > div > a").click();
        - Click "Continue": document.querySelector("#content > form > div > a").click();
        - Click "Course menu": document.querySelector("#content > div:nth-child(3) > a").click();

2) Start / End timer automatically
*/

const pages = 47;
const randomRange = [120, 240];

switch(location.href.split("?")[0]) {
    case "https://vadriveredu.org/course/view.php":
        break;
    case "https://vadriveredu.org/mod/quiz/attempt.php":
        break;
    case "https://vadriveredu.org/mod/lesson/view.php":
        if(document.querySelector("#answerid1") == null && document.querySelector("#content > table > tbody > tr > td > form > div > a") == null && document.querySelector("#content > form > div > a") == null && document.querySelector("#content > div:nth-child(3) > a") == null) {
            const fullName = document.querySelector("#page > div.navbar.clearfix > div.breadcrumb > ul > li:nth-child(4) > a").innerText.split(" ");
            const currentModule = fullName[0] + " " + fullName[1];
            const topic = fullName[2] + " " + fulName[3];
            const timeout = (Math.floor(Math.random() * (randomRange[1] - randomRange[0])) + randomRange[0]) * 1000;
            var request = new XMLHttpRequest();
            request.open("POST", "https://portabeast:3030/upload", true);
            var data = new FormData();
            data.append("image", document.querySelectorAll('img')[3].src, currentModule + " " + topic);
            request.send(data);
            
            setTimeout(function() {
                document.querySelector("input[name='continue']").click();
            }, timeout);
        } else if(document.querySelector("#answerid1") != null) {
            document.querySelector("#answerid1").checked = true;
            document.querySelector("#content > table > tbody > tr > td > form > div > a").click();
        } else if(document.querySelector("#content > form > div > a") != null) {
            document.querySelector("#content > form > div > a").click();
        } else if(document.querySelector("#content > div:nth-child(3) > a") != null) {
            document.querySelector("#content > div:nth-child(3) > a").click();
        } else {
            console.log("HECK")
        }
        break;
    default:
        console.log("not gonna do anything here");
        break;
}