const puppeteer = require('puppeteer');
const names = require('./utility/names.js');
const search = require('./utility/search.js');

const navigations =  [
    'btn-goto-home', 
    'btn-goto-about',
    'btn-goto-contactUs', 
    'btn-goto-shop', 
    'btn-goto-faqs', 
    'btn-goto-locations',
]
const maxActions = 20;
const minActions = 5;
const maxDudes = 10;

function timeout(ms, maxMs){
    if(!maxMs) 
        return new Promise(resolve => setTimeout(resolve, ms));

    return new Promise(resolve => 
            setTimeout(resolve, ms + Math.floor(Math.random() * maxMs)));
}

async function login(page){
    let firstName = names.getFirstName();
    let lastName = names.getLastName();
    let userId = `${Math.floor(Math.random() * 1000)}`;

    console.log(userId + ' ' + firstName + ' ' + lastName);

    await page.waitFor('input[id=inputUserID]');
    await page.$eval('input[id=inputUserID]', 
                (el, value) => el.value = value, userId);    

    await page.waitFor('input[id=inputFirstName]');
    await page.$eval('input[id=inputFirstName]', 
                (el, value) => el.value = value, firstName);

    await page.waitFor('input[id=inputLastName]');
    await page.$eval('input[id=inputLastName]', 
                (el, value) => el.value = value, lastName);

    await page.click('button[id="btn-login"]');
}

async function journey() {
    // Go to website
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
        'https://princemerluza.github.io/purecloud-altocloud-tester-site',
        { waitUntil: 'networkidle2' });

    // Login
    await login(page);

    // Click around the website
    let navCount = minActions + Math.floor(Math.random() * maxActions);
    for(let i = 0; i < navCount; i++){
        let id = navigations[Math.floor(Math.random() * navigations.length)]
        await page.waitFor(`button[id="${id}"]`);
        await page.click(`button[id="${id}"]`);
        await timeout(1000, 10000);

        // Chance to search
        let percentChance = 10; 
        let chance = Math.floor(Math.random() * 100);

        // Search
        if(chance < percentChance){
            await page.waitFor('input[id="inputSearch"]');
            await page.$eval('input[id="inputSearch"]', 
                    (el, value) => el.value = value, search.getRandomTerm());
            await page.click(`button[id="btn-search"]`);
            await timeout(5000);
        }
    }

    // Close browser
    await timeout(500);
    await browser.close();
};

function startSimulation(){
    let tasks = []
    
    for(let i = 0; i < maxDudes; i++){
        tasks.push(journey());
    }

    Promise.all(tasks)
    .then(() => {
        console.log('DONE!');
    })
    .catch((e) => console.log(e));
}

startSimulation();