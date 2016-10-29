


import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'
const firebaseApp = Firebase.initializeApp({
        apiKey: "AIzaSyBRf0NacqgyFA_HxITRh00Ne_fY6s56LYI",
        authDomain: "test-3d257.firebaseapp.com",
        databaseURL: "https://test-3d257.firebaseio.com",
        storageBucket: "",
        messagingSenderId: "545250910349"
    });
const db = firebaseApp.database();
export default db;

import LoginForm from './components/loginForm.vue';

Vue.use(VueFire);

var provider = new Firebase.auth.GoogleAuthProvider();


//var itemsRef = firebaseApp.app("https://vuefiredemo.firebaseio.com/items/");


var vm = new Vue({
    el: '#app',
    data: {
        signedIn: false
    },
    components: {
        'login-form': LoginForm
    },
    methods: {
        signIn: function(){
            firebaseApp.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
        }
    },
    firebase: {

    }
});




