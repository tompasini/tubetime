import { api } from './AxiosService'
import { AppState } from '../AppState'
class BlogsService {
  async createBlog(body) {
    try {
      const res = await api.post('/api/blogs', body)
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  async editBlog(body, id) {
    try {
      const res = await api.put('/api/blogs/' + id, body)
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteBlog(id) {
    try {
      const res = await api.delete('/api/blogs/' + id)
      console.log(res.data)
    } catch (error) {
      console.error()
    }
  }

  async getAllBlogs() {
    try {
      const res = await api.get('/api/blogs')
      AppState.blogs = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getProfileBlogs() {
    try {
      const res = await api.get('/api/profile/blogs')
      AppState.blogs = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getActiveBlog(id) {
    try {
      const res = await api.get('/api/blogs/' + id)
      AppState.activeBlog = res.data
    } catch (error) {
      console.error(error)
    }
  }
}

export const blogsService = new BlogsService()
