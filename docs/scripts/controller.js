// Globals... yea I know
let isLoggedIn = false;

// Login automatically on page load
if(localStorage.getItem('userID') && 
    localStorage.getItem('firstName') && 
    localStorage.getItem('lastName')){

    logIn(localStorage.getItem('userID'), 
          localStorage.getItem('firstName'),
          localStorage.getItem('lastName'));
}  

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
            }, {
                "TestingAttr": 100
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
    const firstName = document.getElementById('inputFirstName').value;
    const lastName = document.getElementById('inputLastName').value;

    // Save to storage
    localStorage.setItem('userID', userID);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);

    logIn(userID, firstName, lastName);
}

function logIn(userID, firstName, lastName){
    const accountStatusElem = document.getElementById('account-status');
    let fullName = firstName + ' ' + lastName;

    // View
    accountStatusElem.textContent = `${userID} - ${fullName}`;

    // AltoCloud
    ac('identify', userID, { 
        givenName: firstName,
        familyName: lastName,
        displayName: fullName,
        randomAttribute: 'yep' // TODO:
    });

    isLoggedIn = true;
    console.log(`Logged in as ${fullName}`);
}

function logOut(){
    const accountStatusElem = document.getElementById('account-status');

    // Remove from localStorage
    localStorage.removeItem('userID');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');

    // View
    accountStatusElem.textContent = 'No User';

    // AltoCloud
    ac('identify', null);

    isLoggedIn = false;
    console.log('Logged Out');
}

// AltoCloud Advanced Configuration
function getAdvancedConfig(){
    if(isLoggedIn){
        return {
            form: {
                firstname: localStorage.getItem('firstName'),
                lastname: localStorage.getItem('lastName'),
                autoSubmit: true
            }
        };
    }
    
    return {};
}

function search(){
    let keyword = document.getElementById('inputSearch').value;
    window.location.href = `index.html?q=${keyword}`;
}