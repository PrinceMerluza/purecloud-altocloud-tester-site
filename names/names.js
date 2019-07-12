const fs = require('fs');
const path = require('path'),   

const g_firstNames = fs.readFileSync(path.join(__dirname, 'g_firstNames'), 'utf8');
const b_firstNames = fs.readFileSync(path.join(__dirname, 'b_firstNames'), 'utf8');
const lastNames = fs.readFileSync(path.join(__dirname, 'lastNames'), 'utf8');

module.exports = {
    getFirstName() {
        let firstName = '';

        // Determine gender
        let firstNames = Math.floor(Math.random() * 2) == 0 ? 
                            g_firstNames : b_firstNames;

        // Concat random first names
        firstName += firstNames[Math.floor(Math.random() * firstNames.length)];
        firstName += ' ';
        firstName += firstNames[Math.floor(Math.random() * firstNames.length)];

        return firstName;
    },

    getLastName() {
        return lastNames[Math.floor(Math.random() * lastNames.length)];
    }
}