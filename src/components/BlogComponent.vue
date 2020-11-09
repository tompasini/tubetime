<template>
  <!-- Could not get routing working with router-link either -->
  <!-- <router-link :to="{ name: 'Blog', params: { id: blog._id } }">
    <div class="blog-component col-3 m-1 rounded border shadow-lg">
      <h3>Title: {{ blog.title }}</h3>
      <p>Author: {{ blog.creator.name }}</p>
      <button @click="deleteBlog(blog._id)" class="btn btn-danger" v-if="user.isAuthenticated == true && blog.creatorEmail == profile.email">
        Delete
      </button>
    </div>
  </router-link> -->

  <div @click="getActiveBlog(blog.id)" class="blog-component col-12 rounded border shadow-lg bg-card-gray pointer">
    <h3 class="blog-title">
      Title: {{ blog.title }}
    </h3>
    <p class="blog-title">
      <b>

        <i>
          Author: {{ blog.creatorEmail }}
        </i>
      </b>
    </p>
    <button @click.stop="deleteBlog(blog._id)" class="btn-danger" v-if="user.isAuthenticated == true && blog.creatorEmail == profile.email">
      Delete
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { blogsService } from '../services/BlogsService'
import { useRouter } from 'vue-router'

import { AppState } from '../AppState'
export default {
  name: 'BlogComponent',
  props: {
    blogProp: Object
  },
  setup(props) {
    const router = useRouter()
    return {
      blog: computed(() => props.blogProp),
      getActiveBlog(id) {
        router.push({ name: 'Blog', params: { id: id } })
        blogsService.getActiveBlog(id)
      },
      deleteBlog(id) {
        blogsService.deleteBlog(id)
      },
      user: computed(() => AppState.user),
      profile: computed(() => AppState.profile)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

.bg-card-blue{
  background-color: #a3d6f1;
}

.bg-card-gray{
  background-color: #d5dadf;
};

.blog-title{
  font-family: 'Barlow', sans-serif;
}

.pointer{
  cursor: pointer;
}

</style>
