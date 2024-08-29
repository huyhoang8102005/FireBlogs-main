<template>
    <Modal :modalMessage="modalMessage" v-if="modal" @close-modal="closeModal"/>
    <Loading v-if="loading"/>    
    <div class="form-wrap">  
        <form action="" class="reset-password">
            <p class="login-register">
                Back to 
                <router-link class="router-link" :to="{name: 'Login'}">Login</router-link>
            </p>
            <h2>Reset Password</h2>
            <p class="login-register">
                Forgot your passowrd? Enter your email to reset it
            </p>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="Email" v-model="email">
                    <img class="icon" src="../assets/Icons/envelope-regular.svg" alt="">
                </div>
            </div>
            <button class="button" @click.prevent="resetPassword">Reset</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import Modal from '@/components/Modal.vue';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth"
export default {
    name: "ForgotPassword",
    components: {
        Modal,
        Loading,
    },
    data() {
        return {
            email: null,
            modal: false,
            loading: false,
            modalMessage: ""
        }
    },
    methods: {
        resetPassword() {
            this.loading = true;
            firebase
                .auth()
                .sendPasswordResetEmail(this.email)
                .then(() => {
                    this.modalMessage = "If your account exists, you will receive a email"
                    this.modal = true;
                    this.loading = false;
                })
                .catch(err => {
                    this.modalMessage = err.message
                    this.loading = false
                    this.modal = true
                })
        },
        closeModal() {
            this.modal = !this.modal;
            this.email = "";
        }
    },
}
</script>

<style lang="scss" scoped>
    .reset-password {
        position: relative;
        h2 {
            margin-bottom: 8px;
        }
    }
</style>