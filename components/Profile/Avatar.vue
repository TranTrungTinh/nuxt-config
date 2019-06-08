<template>
  <a-upload
    name="avatar"
    accept=".png, .jpg, .jpeg"
    :custom-request="handleUploadAvatar"
    :file-list="files"
    :before-upload="beforeUpload"
    @change="handleChange"
  >
    <div class="ant-upload-preview">
      <div class="mask">
        <a-icon type="plus" />
      </div>
      <a-avatar class="avatar" :size="120" :src="avatarUrl" icon="user" />
    </div>
  </a-upload>
</template>
<script>
import { mapActions } from 'vuex'
import { getS3Image } from '@/api/storage'

export default {
  props: {
    avatar: { type: String, required: true, default: () => '' }
  },
  data() {
    return {
      avatarUrl: '',
      files: []
    }
  },
  watch: {
    avatar: {
      immediate: true,
      handler() {
        if (this.avatar.includes('https') || this.avatar.includes('/avatar2.jpg')) {
          this.avatarUrl = this.avatar
          return
        }
        getS3Image(this.avatar).then((url) => { this.avatarUrl = url })
      }
    }
  },
  methods: {
    ...mapActions('user', ['updateAttribute']),

    beforeUpload(file) {
      const size = file.size / 1024 / 1024 < 2
      if (!size) {
        this.$message.error('Upload ảnh nhỏ hơn 2MB!')
      }
      return size
    },
    handleChange: () => [],
    async handleUploadAvatar({ data, file, onError, onProgress, onSuccess }) {
      const type = 'avatar'
      const level = 'protected'
      const options = {
        level: level,
        contentType: file.type,
        cacheControl: '31536000' // 1 year
      }
      try {
        const key = `${Date.now()}-${type}`
        const result = await this.$Amplify.Storage.put(key, file, options)
        const user = await this.$Amplify.Auth.currentAuthenticatedUser()
        await this.$Amplify.Auth.updateUserAttributes(user, { picture: result.key })

        this.updateAttribute()
        this.$notification.success({
          message: 'Info',
          description: 'Successful change avatar',
          duration: 8
        })
      } catch (error) {
        this.$notification.error({
          message: 'Error',
          description: error.message || 'Request error, please try again later',
          duration: 4
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 120px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  .mask {
    opacity: 0;
    position: absolute;
    cursor: pointer;
    transition: opacity 0.4s;
    background: rgba(0,0,0,0.4);
    z-index: 10;
    &:hover {
      opacity: 1;
    }
    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }
  .avatar, .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
