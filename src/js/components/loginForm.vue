
<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <div class="sign-in-container">
                    <h2>Sign in using your Google account</h2>
                    <button class="btn btn-primary btn-lge" v-bind:click="signIn">Sign in</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>


    export default {
        props: [
           'sign-in-button'
        ],
        data(){
            return {
                msg: 'test',

            }
        },
        methods: {

        }
    }

</script>


<style>
    .sign-in-container {
        width: 100%;
        border: 1px solid #bbb;
        margin: 40px 0 0 0;
        border-radius: 4px;
        text-align: center;
        padding: 50px 10px;

    }

</style>