const puppeteer = require('puppeteer');
const names = require('./utility/names.js');
const search = require('./utility/search.js');
const FakeDude = require('./FakeDude.js');

const navigations =  [
    'btn-goto-home', 
    'btn-goto-about',
    'btn-goto-contactUs', 
    'btn-goto-shop', 
    'btn-goto-faqs', 
    'btn-goto-locations',
]
const maxActions = 10;
const minActions = 10;
const maxDudes = 10; // Practical max of 15
const proactiveChatRate = 0;
const searchRate = 0.1

const enableChat = true;
const debugMode = false; 

function timeout(ms, maxMs){
    if(!maxMs) 
        return new Promise(resolve => setTimeout(resolve, ms));

    return new Promise(resolve => 
            setTimeout(resolve, ms + Math.floor(Math.random() * maxMs)));
}

function createUser(){
    return {
        firstName: names.getFirstName(),
        lastName: names.getLastName()
    }
}

async function login(page, userInfo){
    let firstName = userInfo.firstName;
    let lastName = userInfo.lastName;

    let userId = `${Math.floor(Math.random() * 50000) + 10000}`;

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

    await timeout(500);
}

async function requestChat(page, userInfo){
    console.log(`${userInfo.firstName} ${userInfo.lastName} - requesting Chat.`);

    await page.waitFor('button[id="btn-webchat"]');
    await page.click('button[id="btn-webchat"]');
    await timeout(2000);

    chatTextAreaSelector = 'textarea[data-message="ChatInputPlaceholder"';
    await page.waitFor(chatTextAreaSelector);
    console.log("FOUND");
    await page.type(chatTextAreaSelector, 'Waddup', {delay: 100});
    await page.keyboard.press('Enter');

    await timeout(2000);
}

async function journey() {
    let userInfo = createUser();
    let finishedChat = false;


    // Go to website
    
    const browser = debugMode 
        ? await puppeteer.launch({
            headless: false,
            slowMo: 250
        })
        : await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(
        'https://princemerluza.github.io/purecloud-altocloud-tester-site',
        { waitUntil: 'networkidle2' });

    // Login
    await login(page, userInfo);

    // Click around the website
    let navCount = minActions + 
        Math.floor(Math.random() * (maxActions - minActions));
    for(let i = 0; i < navCount; i++){
        let id = navigations[Math.floor(Math.random() * navigations.length)]
        await page.waitFor(`button[id="${id}"]`);
        await page.click(`button[id="${id}"]`);
        await timeout(1000, 5000);

        // Search
        if(Math.floor(Math.random() * 100) < Math.floor(searchRate * 100)){
            await page.waitFor('input[id="inputSearch"]');
            await page.$eval('input[id="inputSearch"]', 
                    (el, value) => el.value = value, search.getRandomTerm());
            await page.click(`button[id="btn-search"]`);
            await timeout(3000);
        }

        // Determine if user will request chat
        if(enableChat 
                && !finishedChat 
                && i == Math.floor(navCount / 2)
                && Math.floor(Math.random() * 100) 
                    < Math.floor(proactiveChatRate * 100)) {
            await requestChat(page, userInfo);
            finishedChat = true;
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