<template>
  <div class="home container-fluid bg-dark text-light">
    <div class="row text-center justify-content-center">
      <div class="col-12 bg-dark text-light">
        <h1 class="tubetime-font">
          <i class="fa fa-television"></i>tubetime
        </h1>
      </div>
      <div class="col-6">
        <b>
          <i>
            <h1 class="blog-title">
              Start a Conversation
            </h1>
          </i>
        </b>
        <form class="form-group" @submit.prevent="createBlog">
          <input type="text"
                 class="form-control"
                 aria-describedby="helpId"
                 placeholder="Title"
                 v-model="state.newBlog.title"
          >
          <textarea name="" id="" cols="98" rows="20" v-model="state.newBlog.body"></textarea>
          <button type="submit" class="emerald-button btn-block text-light">
            Create
          </button>
        </form>
      </div>
      <div class="col-4">
        <div class="row">
          <div class="col-12">
            <b>
              <i>
                <h1 class="blog-title">
                  Join a Conversation
                </h1>
              </i>
            </b>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-12 text-dark blogs overflow-auto">
            <div class="row">
              <blog-component v-for="blog in blogs" :key="blog._id" :blog-prop="blog" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogComponent from '../components/BlogComponent'
import { computed, onMounted, reactive } from 'vue'
import { blogsService } from '../services/BlogsService'
import { AppState } from '../AppState'
import { useRouter } from 'vue-router'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      newBlog: {}
    })
    const router = useRouter()
    onMounted(() => {
      blogsService.getAllBlogs()
    })
    return {
      state,
      blogs: computed(() => AppState.blogs),
      user: computed(() => AppState.user),
      createBlog() {
        blogsService.createBlog(state.newBlog)
        router.push({ name: 'Profile' })
      }
    }
  },
  components: { BlogComponent }
}
</script>

<style lang="scss" scoped>
.bg-gray{
  background-color: #d5dadf;
};

.tubetime-font{
  font-family: 'Indie Flower', cursive;
}

.blogs{
  height: 75vh;
}

.blog-title{
  font-family: 'Barlow', sans-serif;
}

.emerald-button{
  background-color: #50C878;
}
</style>
