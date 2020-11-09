<template>
  <div class="comment-component col-6 offset-3 border rounded shadow-lg mt-2 bg-card-gray-transparent text-light">
    <div v-if="user.isAuthenticated == true && comment.creatorEmail == profile.email">
      {{ comment.body }}
      <form @submit.prevent="editComment(comment._id)">
        <textarea rows="1" style="border: none" v-model="state.editedComment.body"></textarea>
        <div>
          <button class="btn-secondary" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
    <div v-else>
      <p>
        {{ comment.body }}
      </p>
    </div>
    <p>-{{ comment.creatorEmail }}</p>
    <button @click="deleteComment(comment._id)" class="red-button text-light" v-if="user.isAuthenticated == true && comment.creatorEmail == profile.email">
      Delete
    </button>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
export default {
  name: 'CommentComponent',
  props: {
    commentProp: Object
  },
  setup(props) {
    const state = reactive({
      editedComment: {}
    })
    return {
      state,
      comment: computed(() => props.commentProp),
      user: computed(() => AppState.user),
      profile: computed(() => AppState.profile),
      editComment(commentId) {
        commentsService.editComment(state.editedComment, commentId)
      },
      deleteComment(commentId) {
        commentsService.deleteComment(commentId)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

.bg-card-gray{
  background-color: #d5dadf;
};

.bg-card-gray-transparent{
  background-color: rgb(213, 218, 223, .3);
};

.red-button{
  background-color: rgb(219, 42, 42);
}

</style>
