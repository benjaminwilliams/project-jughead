
var vueApp = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        text: "",
        testBind: 'a',
        username: '',
        signedIn: false,
        gifts: [
            {text: "hello 1"},
            {text: "hello 2"}
        ]

    },
    methods: {
        setGift: function(text){
            firebaseAuth.newPost(text);
        },
        getUsername: function(){
            firebaseAuth.getUsername();
        },
        setUserName: function(username){
            firebaseAuth.setUsername(username);
        },
        getData: function(){
            var datas = firebaseAuth.getData();
            this.text = datas;
        }
    }
});


module.exports = vueApp;




