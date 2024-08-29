<template>
     <div class="form-wrap">
        <form action="" class="register">
            <p class="login-register">
                Already have an account ?
                <router-link class="router-link" :to="{name: 'Login'}">Login</router-link>
            </p>
            <h2>Create Your FireBlog Account</h2>
            <div class="inputs">
                <!-- Input 1  -->
                <div class="input">
                    <input type="text" placeholder="Firstname" v-model="firstname">
                    <img src="../assets/Icons/user-alt-light.svg" alt="" class="icon">
                </div>
                <!-- Input 2  -->
                <div class="input">
                    <input type="text" placeholder="Lastname" v-model="lastname">
                    <img src="../assets/Icons/user-alt-light.svg" alt="" class="icon">
                </div>
                <!-- Input 3  -->
                <div class="input">
                    <input type="text" placeholder="Username" v-model="username">
                    <img src="../assets/Icons/user-alt-light.svg" alt="" class="icon">
                </div>
                <!-- Input 4  -->
                <div class="input">
                    <input type="text" placeholder="Email" v-model="email">
                    <img class="icon" src="../assets/Icons/envelope-regular.svg" alt="">
                </div>
                <!-- Input 5  -->
                <div class="input">
                    <input type="password" placeholder="Password" v-model="password">
                    <img class="icon" src="../assets/Icons/lock-alt-solid.svg" alt="">
                </div>
                <div v-show="error" class="error">{{ this.errorMessage }}</div>
            </div>
            <button @click.prevent="register" class="button">Sign Up</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import "firebase/compat/auth"
import db from "../firebase/firebaseInit"
export default {
  name: "Register",
  data() {
    return {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      error: null,
      errorMessage: ""
    }
  },
  methods: {
    async register() {
      if (
        this.firstname !== "" &&
        this.lastname !== "" &&
        this.username !== "" &&
        this.email !== "" &&
        this.password !== ""
      ) {
        this.error = false
        const firebaseAuth = await firebase.auth()
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password)
        const result = await createUser
        const dataBase = db.collection("users").doc(result.user.uid)
        await dataBase.set({
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          email: this.email,
        })
        this.$router.push({name: "Home"})
        return 
      }
      this.error = true
      this.errorMessage = "Please fill out all the fields"
    }
  },
}
</script>

<style lang="scss" scoped>
  .register {
    h2 {
        max-width: 350px;
    }
  }
</style>