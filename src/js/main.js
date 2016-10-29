


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
const auth = firebaseApp.auth();
//const db = firebaseApp.database();
export default auth;

import LoginForm from './components/loginForm.vue';

Vue.use(VueFire);

var provider = new Firebase.auth.GoogleAuthProvider();


//var itemsRef = firebaseApp.app("https://vuefiredemo.firebaseio.com/items/");


var vm = new Vue({
    el: '#app',
    data: {
        signedIn: false,
        user: "",
        errorCode: "",
        errorMessage: ""
    },
    components: {
        'login-form': LoginForm
    },
    methods: {
        signIn: function(){

            firebaseApp.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                console.log(result);
                var token = result.credential.accessToken;
                // The signed-in user info.
               // this.user = result.user;
                // ...
            })
        }
    },
    firebase: {

    }
});




