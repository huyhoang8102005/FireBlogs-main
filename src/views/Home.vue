<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen"/>
    <BlogPost v-for="(post,index) in samplePost" :key="index" :post="post"/>
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard :blog="blog" v-for="(blog,index) in sampleBlogCards" :key="index"/>
        </div>
      </div>
    </div>
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#">
          Register For Fireblog
          <img src="../assets/Icons/arrow-right-light.svg" alt="" class="arrow arrow-light">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from '@/components/BlogPost.vue';
import BlogCard from '@/components/BlogCard.vue';
export default {
  name: "Home",
  components: {
    BlogPost,
    BlogCard,
  },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome",
        blogPost: "Weekly blog articles with all things programing including HTML, CSS, JavaScript, and more.",
        welcomeScreen: true,
        photo: "coding",
      },
      samplePost: [
        {
          title: "This is a Filler Title!",
          blogHTML: "This is a filler blog post title!",
          blogCoverPhoto: "beautiful-stories"
        },
        {
          title: "This is a Filler Title!",
          blogHTML: "This is a filler blog post title!",
          blogCoverPhoto: "designed-for-everyone"
        },
      ],
    }
  },
  methods: {
  },
  computed: {
    sampleBlogCards() {
      return this.$store.state.sampleBlogCards
    },
    user() {
      return this.$store.state.user
    }
  }
};
</script>

<style lang="scss" scoped>
  .blog-card-wrap {
    background: #f0f0f0;
    h3 {
      font-size: 28px;
      font-weight: 300;
      margin-bottom: 32px;
      color: #000;
    }
  }

  .updates {
    .container {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      padding: 100px 25px;
      @media (min-width: 800px) {
        padding: 125px 25px;
        flex-direction: row;
      }
      
      .router-button {
        display: flex;
        font-size: 14px;
        text-decoration: none;
        @media (min-width: 800px) {
          margin-left: auto;
        }
      }

      h2 {
        font-weight: 300;
        font-size: 32px;
        max-width: 425px;
        width: 100%;
        text-align: center;
        text-transform: uppercase;
        @media (min-width: 800px) {
          text-align: left;
          font-size: 40px;
        }
      }
    }
  }
</style>  


