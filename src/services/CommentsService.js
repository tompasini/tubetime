import { api } from './AxiosService'
import { AppState } from '../AppState'

class CommentsService {
  async getComments(id) {
    try {
      const res = await api.get('/api/blogs/' + id + '/comments')
      AppState.comments = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async addComment(commentData, blogId) {
    try {
      const newComment = {
        body: commentData.body,
        blogId: blogId
      }
      await api.post('/api/comments/', newComment)
      this.getComments(blogId)
    } catch (error) {
      console.error(error)
    }
  }

  async editComment(editedCommentData, commentId) {
    try {
      const editedComment = {
        body: editedCommentData.body,
        comment: commentId
      }
      await api.put('/api/comments/' + commentId, editedComment)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteComment(commentId) {
    try {
      const res = await api.delete('/api/comments/' + commentId)
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }
}

export const commentsService = new CommentsService()
