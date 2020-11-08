<template>
  <div class="home container-fluid">
    <div class="row text-center justify-content-center" v-if="user.isAuthenticated == true">
      <div class="col-6">
        <h1>TubeTime</h1>
        <form class="form-group" @submit.prevent="createBlog">
          <input type="text"
                 class="form-control"
                 aria-describedby="helpId"
                 placeholder="Title"
                 v-model="state.newBlog.title"
          >
          <textarea name="" id="" cols="30" rows="10" v-model="state.newBlog.body"></textarea>
          <button type="submit" class="btn btn-primary btn-block">
            Create Blog
          </button>
        </form>
      </div>
    </div>

    <div class="row justify-content-center">
      <blog-component v-for="blog in blogs" :key="blog._id" :blog-prop="blog" />
    </div>
  </div>
</template>

<script>
import BlogComponent from '../components/BlogComponent'
import { computed, onMounted, reactive } from 'vue'
import { blogsService } from '../services/BlogsService'
import { AppState } from '../AppState'
// import { useRouter } from 'vue-router'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      newBlog: {}
    })
    // const router = useRouter()
    onMounted(() => {
      blogsService.getAllBlogs()
    })
    return {
      state,
      blogs: computed(() => AppState.blogs),
      user: computed(() => AppState.user),
      createBlog() {
        // router.push({ name: 'Profile' })
        blogsService.createBlog(state.newBlog)
      }
    }
  },
  components: { BlogComponent }
}
</script>

<style lang="scss" scoped>

</style>
