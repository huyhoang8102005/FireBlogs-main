<template>
  <div class="blog-card">
    <div class="icons" v-show="editPost">
      <div class="icon">
        <img class="edit" src="../assets/Icons/edit-regular.svg" alt="">
      </div>
      <div class="icon">
        <img class="delete" src="../assets/Icons/trash-regular.svg" alt="">
      </div>
    </div>
    <img class="blog-img" :src="require(`../assets/blogCards/${blog.blogCoverPhoto}.jpg`)" alt="">
    <div class="info">
      <h4>{{ blog.blogTitle }}</h4>
      <h6>Posted on {{ blog.blogDate }}</h6>
      <router-link class="link" to="#">
        VIEW THE POST
        <img src="../assets/Icons/arrow-right-light.svg" alt="" class="arrow ">
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogCard",
  props: ["blog"],
  computed: {
    editPost() {
      return this.$store.state.editPost
    }
  }
}
</script>

<style lang="scss" scoped>
  .blog-card {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    min-height: 420px;
    border-radius: 8px;
    background: #fff;
    transition: .5s ease all;

    &:hover {
      transform: rotate(-1deg) scale(1.02);
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);

      .link {
        font-weight: 800;
      }
    }

    .icons {
      display: flex;
      gap: 10px;
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 99;

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: #fff;
        transition: .5s ease all;

        &:hover {
          background: #303030;

          .edit,
          .delete {
            filter: brightness(0) saturate(100%) invert(99%) sepia(36%) saturate(0%) hue-rotate(301deg) brightness(101%) contrast(102%);
          }
        }
        .edit,
        .delete {
          pointer-events: none;
          height: 15px;
          width: auto;
        }
      }
    }

    .blog-img {
      display: block;
      border-radius: 8px 8px 0 0;
      z-index: 1;
      width: 100%;
      min-height: 200px;
      object-fit: cover;
    }

    .info {
      display: flex;
      flex-direction: column;
      height: 100%;
      z-index: 3;
      padding: 32px 16px;
      color: #000;

      h4 {
        padding-bottom: 8px;
        font-size: 20px;
        font-weight: 500;
      }

      h6 {
        font-size: 12px;
        font-weight: 500;
        padding-bottom: 16px;
      }

      .link {
        display: inline-flex;
        align-items: center;
        font-weight: 500;
        margin-top: auto;
      }
    }
  }
</style>