
var firebaseAuth = (function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBRf0NacqgyFA_HxITRh00Ne_fY6s56LYI",
        authDomain: "test-3d257.firebaseapp.com",
        databaseURL: "https://test-3d257.firebaseio.com",
        storageBucket: "",
        messagingSenderId: "545250910349"
    };

    var signInButton = document.getElementById('sign-in');

    function init(){
        firebase.initializeApp(config);


        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
               vueApp.signedIn = true;
            } else {
               vueApp.signedIn = false;
            }
        });
    }
    function signIn(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    }

    function newPost(text) {

        var userId = firebase.auth().currentUser.uid;

        firebase.database().ref('users/' + userId).set({
            text: text
        });

    }

    function getData(){
        var userId = firebase.auth().currentUser.uid;

        return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {

            return snapshot.val().text;
        });
    }


    function getUsername(){
        var userId = firebase.auth().currentUser.uid;

        return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
            var username = snapshot.val().username;
            return username;
        });
    }

    function setUsername(username){
        var userId = firebase.auth().currentUser.uid;

        firebase.database().ref('users/' + userId).set({
            username: username
        });
    }




    return {
        init: init,
        newPost: newPost,
        getUsername: getUsername,
        setUsername: setUsername,
        getData: getData,
        signIn: signIn
    };

})();

module.exports = firebaseAuth;
