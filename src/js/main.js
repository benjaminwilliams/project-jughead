


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
        user: {},
        errorCode: "",
        errorMessage: "",
        gifts: "",
        newGiftName: "",
        newGiftGoal: ""
    },
    components: {
        'login-form': LoginForm
    },
    methods: {
        checkSignedIn: function(){
            var self = this;
            firebaseApp.auth().onAuthStateChanged(function(user) {
                if (user) {
                    self.signedIn = true;
                    self.user = user;
                    self.displayGifts();
                } else {
                    self.signedIn = false;
                }
            });
        },
        signIn: function(){
            var self = this;

            firebaseApp.auth().signInWithPopup(provider).then(function(result) {
                console.log(result);
                var token = result.credential.accessToken;
                self.user = result.user;
                // The signed-in user info.
               // this.user = result.user;
                // ...
            })
        },
        displayGifts: function(){
            var self = this;

            return firebaseApp.database().ref('/gifts/').once('value').then(function(snapshot) {
                self.gifts = snapshot.val();
            });

        },
        createGift: function(){
            var self = this;

            var postsRef = firebaseApp.database().ref("gifts");

            // we can also chain the two calls together
            postsRef.push().set({
                name: self.newGiftName,
                goal: self.newGiftGoal
            });

            //var postID = postsRef.key();
        }
    },
    firebase: {

    }
});

vm.checkSignedIn();




