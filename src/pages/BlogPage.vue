<template>
  <div class="blog container-fluid bg-dark text-light full-screen" v-if="blog.title">
    <div class="row">
      <div class="d-flex col-12 bg-dark text-light justify-content-center">
        <h1 class="tubetime-font">
          <i class="fa fa-television"></i>tubetime
        </h1>
      </div>
      <div class="col-6 offset-3 border rounded shadow-lg bg-card-gray-transparent text-light">
        <h1>
          {{ blog.title }}
        </h1>
        <h5>Written By: {{ blog.creator.email }}</h5>
        <p>{{ blog.body }}</p>
        <button class="btn btn-info" v-if="user.isAuthenticated == true && blog.creatorEmail == profile.email" data-toggle="modal" data-target="#edit-blog">
          Edit
        </button>
        <div class="modal fade"
             id="edit-blog"
             tabindex="-1"
             role="dialog"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-dark" id="exampleModalLabel">
                  Edit Blog
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form class="form-group" @submit.prevent="editBlog">
                  <input type="text"
                         class="form-control"
                         aria-describedby="helpId"
                         v-model="state.editedBlog.title"
                  >
                  <textarea name="" id="" cols="30" rows="10" v-model="state.editedBlog.body"></textarea>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
                      Close
                    </button>
                    <button type="submit" class="btn btn-info">
                      Save Blog
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button class="emerald-button text-light" v-if="user.isAuthenticated == true" data-toggle="modal" data-target="#add-comment">
            Add a Comment
          </button>
        </div>
        <div class="modal fade"
             id="add-comment"
             tabindex="-1"
             role="dialog"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-dark" id="exampleModalLabel">
                  Add Comment
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="addComment" class="form-group">
                  <textarea name="" id="" cols="50" rows="3" v-model="state.newComment.body"></textarea>
                  <div class="modal-footer">
                    <button type="button" class="btn-secondary" data-dismiss="modal">
                      Close
                    </button>
                    <button type="submit" class="btn-info">
                      Add Comment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <comment-component v-for="comment in comments" :key="comment._id" :comment-prop="comment" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { blogsService } from '../services/BlogsService'
import { commentsService } from '../services/CommentsService'
import { AppState } from '../AppState'
import CommentComponent from '../components/CommentComponent'
export default {
  name: 'Blog',
  setup() {
    const state = reactive({
      editedBlog: {},
      newComment: {}
    })
    const route = useRoute()
    onMounted(() => {
      blogsService.getActiveBlog(route.params.id)
      commentsService.getComments(route.params.id)
    })
    return {
      state,
      blog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.comments),
      user: computed(() => AppState.user),
      profile: computed(() => AppState.profile),
      editBlog() {
        blogsService.editBlog(state.editedBlog, route.params.id)
      },
      addComment() {
        commentsService.addComment(state.newComment, route.params.id)
      }
    }
  },
  components: { CommentComponent }
}
</script>

<style lang="scss" scoped>

.bg-card-gray-transparent{
  background-color: rgb(213, 218, 223, .3);
};

.bg-card-gray{
  background-color: #d5dadf;
};

.emerald-button{
  background-color: #50C878;
}

.tubetime-font{
  font-family: 'Indie Flower', cursive;
}

.full-screen{
  min-height: 100vh;
}

</style>
