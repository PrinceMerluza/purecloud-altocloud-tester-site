
// Page Navigation 
function goToPage(page){
    console.log(`Go to: ${ page }`);
    document.getElementById('page-status').textContent = page;

    switch(page){
        case 'home':
            ac('pageview');
            break;
        case 'about':
            ac('pageview', {
                location: 'about',
                title: 'About Us'
            });
            break;
        case 'contactUs':
            ac('pageview', {
                location: 'contact-us',
                title: 'Contact Information'
            });
            break;
        case 'shop':
            ac('pageview', {
                location: 'shop',
                title: 'Shop'
            });
            break;
        case 'faqs':
            ac('pageview', {
                location: 'faqs',
                title: 'FAQs'
            });
            break;
        case 'locations':
            ac('pageview', {
                location: 'locations',
                title: 'Find Us'
            });
            break;
    }
}

function logInPress(){
    // Get values from form
    const userID = document.getElementById('inputUserID').value;
    const fullName = document.getElementById('inputFullName').value;

    // Save to storage
    localStorage.setItem('userID', userID);
    localStorage.setItem('fullName', fullName);

    logIn(userID, fullName);
}

function logIn(userID, fullName){
    const accountStatusElem = document.getElementById('account-status');

    // View
    accountStatusElem.textContent = `${userID} - ${fullName}`;

    // AltoCloud
    ac('identify', userID, { givenName: fullName })

    console.log(`Logged in as ${fullName}`);
}

function logOut(){
    const accountStatusElem = document.getElementById('account-status');

    // Remove from localStorage
    localStorage.removeItem('userID');
    localStorage.removeItem('fullName');

    // View
    accountStatusElem.textContent = 'No User';

    // AltoCloud
    ac('identify', null);

    console.log('Logged Out');
}


// Login automatically on page load
if(localStorage.getItem('userID') && localStorage.getItem('fullName')){
    logIn(localStorage.getItem('userID'), localStorage.getItem('fullName'));
}  