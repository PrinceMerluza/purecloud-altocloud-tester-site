const fs = require('fs');
const path = require('path');   

const terms = fs.readFileSync(path.join(__dirname, 'searches'), 'utf8').split("\n");

module.exports = {
    getRandomTerm() {
        return terms[Math.floor(Math.random() * terms.length)];
    }
}