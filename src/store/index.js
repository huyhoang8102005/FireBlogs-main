import { createStore } from 'vuex'
import firebase from 'firebase/compat/app';
import "firebase/compat/auth"
import db from "../firebase/firebaseInit"

export default createStore({
  state: {
    sampleBlogCards: [
      {blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "May 1, 2024"},
      {blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "May 1, 2024"},
      {blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "May 1, 2024"},
      {blogTitle: "Blog Card #4", blogCoverPhoto: "stock-4", blogDate: "May 1, 2024"}
    ],
    blogHTML: "Write your blog title here",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileUrl: null,
    blogPhotoReview: null,
    editPost: null,
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUserName: null,
    profileId: null,
    profileInitials: null,
  },
  getters: {
  },
  mutations: {
    toggleEditPost(state,payload) {
      state.editPost = payload
    },
    updateUser(state,payload) {
      state.user = payload
    },
    setProfileInfo(state,doc) {
      state.profileId = doc.id
      state.profileEmail = doc.data().email
      state.profileFirstName = doc.data().firstname
      state.profileLastName = doc.data().lastname
      state.profileUserName = doc.data().username
    },
    setProfileInitials(state) {
      state.profileInitials = 
        state.profileFirstName.match(/(\b\S)?/g).join("") + 
        state.profileLastName.match(/(\b\S)?/g).join("")
    },
    changeFirstName(state,payload) {
      state.profileFirstName = payload
    },
    changeLastName(state,payload) {
      state.profileLastName = payload
    },
    changeUserName(state,payload) {
      state.profileUserName = payload
    },

  },
  actions: {
    async getCurrentUser({commit}) {
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid)
      const dbResults = await dataBase.get() 
      commit("setProfileInfo",dbResults)
      commit("setProfileInitials")
    },
    async updateUserSetting({commit, state}) {
      const dataBase = await db.collection('users').doc(state.profileId)
      await dataBase.update({
        firstname: state.profileFirstName,
        lastname: state.profileLastName,
        username: state.profileUserName
      })
      commit("setProfileInitials")
    }
  },
  modules: {
  }
})
