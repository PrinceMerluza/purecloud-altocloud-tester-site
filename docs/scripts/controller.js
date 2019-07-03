// Page Navigation 
function goToHome(){
    console.log('Go Home');
    ac('pageview');
}

function goToAbout(){
    console.log('Go to About Page');
    ac('pageview', {
        location: 'about.html',
        title: 'About Us'
    });
}