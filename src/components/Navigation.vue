<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{name: 'Home'}">FireBlogs</router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" :to="{name: 'Home'}">Home</router-link>
          <router-link class="link" :to="{name: 'Blogs'}">Blogs</router-link>
          <router-link class="link" :to="{name: 'CreatePost'}">Create Post</router-link>
          <router-link v-if="!user" class="link" :to="{name: 'Login'}">Login/Register</router-link>
        </ul>
        <div v-if="user" @click="toggleProfileMenu" class="profile" ref="profile">
        <span>{{ this.$store.state.profileInitials }}</span>
        <div v-show="profileMenu" class="profile-menu">
          <div class="info">
            <p class="initials">{{ this.$store.state.profileInitials }}</p>
            <div class="right">
              <p>{{ this.$store.state.profileFirstName }} {{ this.$store.state.profileLastName }}</p>
              <p>{{ this.$store.state.profileEmail }}</p>
              <p>{{ this.$store.state.profileUserName }}</p>
            </div>
          </div>
          <div class="options">
            <div class="option">
              <router-link class="option" :to="{name: 'Profile'}">
                <img src="../assets/Icons/user-alt-light.svg" alt="" class="icon">
                <p>Profile</p>
              </router-link>
            </div>
            <div class="option">
              <router-link class="option" :to="{name: 'Admin'}">
                <img src="../assets/Icons/user-crown-light.svg" alt="" class="icon">
                <p>Admin</p>
              </router-link>
            </div>
            <div @click="signOut" class="option">
                <img src="../assets/Icons/sign-out-alt-regular.svg" alt="" class="icon">
                <p>Sign Out</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      
    </nav>
    <div @click="toggleMobileNav" v-show="mobile">
      <img src="../assets/Icons/bars-regular.svg" alt="" class="menu-icon">
    </div>
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
          <router-link class="link" :to="{name: 'Home'}">Home</router-link>
          <router-link class="link" :to="{name: 'Blogs'}">Blogs</router-link>
          <router-link class="link" :to="{name: 'CreatePost'}">Create Post</router-link>
          <router-link v-if="!user" class="link" :to="{name: 'Login'}">Login/Register</router-link>
        </ul>
    </transition>
  </header>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
export default {
  name: "Navigation",
  components: {
  },
  data() {
    return {
      profileMenu: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    }
  },
  created() {
    window.addEventListener("resize", this.checkScreen)
    this.checkScreen()
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth <= 750) {
        this.mobile = true
        return
      }
      this.mobile = false
      this.mobileNav = false
      return
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav
    },
    toggleProfileMenu(e) {
      if (e.target === this.$refs.profile) {
        this.profileMenu = !this.profileMenu
      }
    },
    signOut() {
      firebase.auth().signOut()
      window.location.reload()
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="scss" scoped>
  header {
    background: #fff;
    padding: 0 25px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
    z-index: 99;

    .link {
      font-weight: 500;
      padding: 0 8px;
      transition: 0.3s color ease;

      &:hover {
        color: #1eb8b8;
      }
    }

    nav {
      display: flex;
      padding: 25px 0;

      .branding {
        display: flex;
        align-items: center;

        .header {
          font-weight: 600;
          font-size: 24px;
          color: #000;
          text-decoration: none;
        }
      }
      .nav-links {
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: flex-end;
        margin-right: 40px;

        ul {
          margin-right: 32px;

          .link {
            margin-right: 32px;
          }

          .link:last-child {
            margin-right: 0;
          }
        }

        .profile {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          color: #fff;
          background: #303030;

          span {
            pointer-events: none;
          }

          .profile-menu {
            position: absolute;
            top: 60px;
            right: 0;
            max-width: 300px;
            background: #303030;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);

            .info {
              display: flex;
              align-items: center;
              padding: 15px;
              border: 1px solid #fff;

              .initials {
                position: initial;
                width: 40px;
                height: 40px;
                background: #fff;
                color: #303030;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
              }

              .right {
                flex: 1;
                margin-left: 24px;
                
                p {
                  font-size: 14px;
                }
              }
            }

            .options {
              padding: 15px;
              .option {
                text-decoration: none;
                color: #fff;
                display: flex;
                align-items: center;
                margin-bottom: 18px;

                &:last-child {
                  margin-bottom: 0;
                }

                .icon {
                  width: 18px;
                  height: auto;
                  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(147deg) brightness(120%) contrast(117%);
                }
                p {
                  font-size: 14px;
                  margin-left: 12px;
                }
              }
            }
          }
        }
      }
    }

    .menu-icon {
      cursor: pointer;
      position: absolute;
      top: 32px;
      right: 25px;
      height: 25px;
      width: auto;
    }

    .mobile-nav {
      padding: 20px;
      width: 70%;
      max-width: 250px;
      display: flex;
      flex-direction: column;
      position: fixed;
      height: 100%;
      background: #303030;
      top: 0;
      left: 0;

      .link {
        padding: 15px 0;
        color: #fff;
      }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
      transition: all 1s ease;
    } 

    .mobile-nav-enter-from {
      transform: translateX(-250px);
    }

    .mobile-nav-enter-to {
      transform: translateX(0);
    }

    .mobile-nav-leave-to {
      transform: translateX(-250px);
    }
  }
</style>