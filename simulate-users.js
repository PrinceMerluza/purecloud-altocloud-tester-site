const puppeteer = require('puppeteer');
const names = require('./names/names.js');

const navigations =  [
    'btn-goto-home', 
    'btn-goto-about',
    'btn-goto-contactUs', 
    'btn-goto-shop', 
    'btn-goto-faqs', 
    'btn-goto-locations',
]
const maxNavigation = 20;
const minNavigation = 5;
const maxDudes = 5;

function timeout(ms, maxMs){
    if(!maxMs) 
        return new Promise(resolve => setTimeout(resolve, ms));

    return new Promise(resolve => 
            setTimeout(resolve, ms + Math.floor(Math.random() * maxMs)));
}

async function navigate() {
    // Go to website
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
        'https://princemerluza.github.io/purecloud-altocloud-tester-site',
        { waitUntil: 'networkidle2' });

    // Login
    let firstName = names.getFirstName();
    let lastName = names.getLastName();

    await page.waitFor('input[id=inputFirstName]');
    await page.$eval('input[name=inputFirstName]', 
                el => el.value = firstName);

    await page.waitFor('input[id=inputLastName]');
    await page.$eval('input[name=inputLastName]', 
                el => el.value = lastName);

    await page.click('button[id="btn-login"]');

    // Click around the website
    let navCount = minNavigation + Math.floor(Math.random() * maxNavigation);
    for(let i = 0; i < navCount; i++){
        let id = navigations[Math.floor(Math.random() * navigations.length)]
        await page.click(`button[id="${id}"]`);
        await timeout(1000, 10000);
    }

    // Close browser
    await timeout(500);
    await browser.close();
};

function startSimulation(){
    let tasks = []
    
    for(let i = 0; i < maxDudes; i++){
        tasks.push(navigate());
    }

    Promise.all(tasks)
    .then(() => {
        console.log('DONE!');
    })
    .catch((e) => console.log(e));
}

startSimulation();