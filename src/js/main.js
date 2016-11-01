


import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'
import LoginForm from './components/loginForm.vue';

Vue.use(VueFire);

var firebaseApp = Firebase.initializeApp({
    apiKey: "AIzaSyBRf0NacqgyFA_HxITRh00Ne_fY6s56LYI",
    authDomain: "test-3d257.firebaseapp.com",
    databaseURL: "https://test-3d257.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "545250910349"
});

var provider = new Firebase.auth.GoogleAuthProvider();

var vm = new Vue({
    el: '#app',
    data: {
        loading: true,
        signedIn: false,
        createNew: false,
        user: {},
        errorCode: "",
        errorMessage: "",
        gifts: "",
        newGiftName: "",
        newGiftGoal: "",
        newGiftFor: ""
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
                    self.loading = false;
                } else {
                    self.signedIn = false;
                    self.loading = false;
                }
            });
        },
        signIn: function(){
            var self = this;

            function addUser(currentUser){

               // var userKey = firebaseApp.database().ref().child('allUsers').push().key;
                var updates = {};
                updates['/allUsers/' + currentUser] = currentUser;
                return firebaseApp.database().ref().update(updates);

            }

            firebaseApp.auth().signInWithPopup(provider).then(function(result) {
                console.log(result);
                var token = result.credential.accessToken;
                self.user = result.user;
                addUser(result.user.displayName);
            })
        },
        signOut: function(){
            firebaseApp.auth().signOut().then(function() {
                console.log('Signed Out');
            }, function(error) {
                console.error('Sign Out Error', error);
            });
        },
        displayGifts: function(){
            var self = this;

            // Get a database reference to our posts
            var db = firebaseApp.database();
            var ref = db.ref("gifts");

            ref.on("value", function(snapshot) {
                self.gifts = snapshot.val();
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });

        },
        createGift: function(){
            var self = this;

            var postsRef = firebaseApp.database().ref("gifts");
            var userId = firebaseApp.auth().currentUser.uid;

            // we can also chain the two calls together
            postsRef.push().set({
                createdId: userId,
                name: self.newGiftName,
                goal: self.newGiftGoal,
                for: self.newGiftFor
            });

            //var postID = postsRef.key();
        }
    },
    firebase: {

    }
});

vm.checkSignedIn();




