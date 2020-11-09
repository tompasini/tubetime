<template>
  <div class="container-fluid bg-dark text-light full-screen">
    <div class="row">
      <div class="d-flex col-12 bg-dark text-light justify-content-center">
        <h1 class="tubetime-font">
          <i class="fa fa-television"></i>tubetime
        </h1>
      </div>
    </div>
    <div class="row justify-content-center text-center text-dark">
      <div class="col-6">
        <div class="row">
          <blog-component v-for="blog in blogs" :key="blog._id" :blog-prop="blog" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogComponent from '../components/BlogComponent'
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'
export default {
  name: 'Profile',
  setup() {
    onMounted(() => {
      blogsService.getProfileBlogs()
    })
    return {
      profile: computed(() => AppState.profile),
      blogs: computed(() => AppState.blogs)
    }
  },
  components: { BlogComponent }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.bg-card-gray{
  background-color: #d5dadf;
};

.blog-title{
  font-family: 'Barlow', sans-serif;
}

.bg-card-gray-transparent{
  background-color: rgb(213, 218, 223, .3);
};

.emerald-button{
  background-color: #50C878;
}

.red-button{
  background-color: rgb(219, 42, 42);
}

.tubetime-font{
  font-family: 'Indie Flower', cursive;
}

.full-screen{
  height: 100vh;
}
</style>
