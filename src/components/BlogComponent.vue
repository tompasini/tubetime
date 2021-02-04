<template>
  <div @click="getActiveBlog(blog.id)" class="blog-component col-12 rounded border shadow-lg bg-card-gray pointer">
    <h3 class="blog-title">
      Title: {{ blog.title }}
    </h3>
    <p class="blog-title">
      <b>

        <i>
          Author: {{ blog.creator.email }}
        </i>
      </b>
    </p>
    <button @click.stop="deleteBlog(blog.id)" class="btn-danger" v-if="user.isAuthenticated == true && blog.creator.email == profile.email">
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
