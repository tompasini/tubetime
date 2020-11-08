<template>
  <div class="about text-center">
    <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt="" />
    <p>{{ profile.email }}</p>
  </div>
  <div class="row">
    <blog-component v-for="blog in blogs" :key="blog._id" :blog-prop="blog" />
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
</style>
