/* notes: 
remove –
remove .
remove ,
remove _

$('.answer').children[0].children[X].innerText.trim().substr(3)

q=QUESTION&a=ANS1:::ANS2:::ANS3


https://vadriveredu.org/mod/quiz/attempt.php?id=168

MODULE 7: 
        + 2x51 =     1.7 (pages)
        + 15x4 =     1 (quizzes)
        + 1x1 =      0.5 (test);
        Total:       3.20
MODULE 8: 
        + 2x60 =     2 (pages)
        + 15x5 =     1.25 (quizzes)
        + 1x1 =      0.5 (test)
        Total:       3.75
MODULE 9: 
        + 3x47 =     2.35 (pages)
        + 15x3 =     0.75 (quizzes)
        + 1x1 =      0.5 (test)
        Total:       3.6
MODULE 10: 
        + 3x46=      2.3
        + 15x4 =     1 (quizzes)
        + 1x1 =      0.5 (test)
        Total:       3.8

        ALL Total:   14.35 (14 hours and 21 minutes) OVER BY (aka wasted time) ==== 3hrs
*/ 

// Install body-parser and Express
const express = require('express')
const app = express()
const https = require('https')

const fs = require('fs');
var cors = require('cors')

const fuzzy = require('fuzzyset.js');

app.use(cors())

class QuestionDb {

    constructor(db) {
        this.db;
        this.questions = FuzzySet();

        fs.readFile('./questions.csv', (err, data) => {
            data = data.toString();
            this.db = data.split(";").map(i => {
                return {q: i.split(" ---:::--- ")[0], a: i.split(" ---:::--- ")[1]};
            });

            for (const el of this.db) {
                this.questions.add(el.q);   
            }
        })
    }

    get(qe) {
        return Promise.all(this.db.filter(question => {
                // let fuzzy = this.questions.get(qe);

                return question.q.toLowerCase() == qe.toLowerCase();
            }));
    }

    getAll() {
        return this.db;
    }
}

const qDb = new QuestionDb();

var bodyParser = require('body-parser')

// Use req.query to read values!!
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile('ask.html', {root: './'})
})

app.get('/search', (req, res) => {
    const query = req.query.q;
    
    const answer = qDb.get(query).then(r => {
        const response = r[0] != undefined ? r[0].a : "ANSWER NOT FOUND"
        res.json({answer: response});
    });
})

app.get('/all', (req, res) => { res.json(qDb.getAll()) })


const httpsOptions = {
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.cert')
}
const server = https.createServer(httpsOptions, app).listen(3030, () => {
        console.log('server running at ' + 3030)
    })