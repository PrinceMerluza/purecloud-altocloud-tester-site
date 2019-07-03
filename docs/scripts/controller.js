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
