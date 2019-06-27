// (function(){
//     window.fakeCreds = {
//         login: function(){
//             console.log("You have logged in");
//             window.ac.identify("default", {
//                 favoritePet: "dog"
//             })
//         }
//     }
// })();

function login() {
    console.log("You have logged in");
            ac('identify', "default", {
                favoritePet: "dog"
            });
}