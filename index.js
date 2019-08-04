/* notes: 
remove –
remove .
remove ,
remove _

$('.answer').children[0].children[X].innerText.trim().substr(3)

q=QUESTION&a=ANS1:::ANS2:::ANS3


https://vadriveredu.org/mod/quiz/attempt.php?id=168

MODULE 7: 3-4 = 2.5
MODULE 8: 4-5 MINS = 4.5 
MODULE 9: 4-5 MINS = 4.5
MODULE 10: 5-6 MINS = 3.8 
*/ 

// Install body-parser and Express
const express = require('express')
const app = express()
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

                return question.q == qe;
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

app.listen(3030, () => console.log('Example app listening on port 3030!'))