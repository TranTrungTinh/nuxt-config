<template>
  <div class="user-info">
    <div class="user-info--body">
      <a-form :form="form">
        <a-form-item class="user-info--body__item">
          <div class="user-info--body__item-label">
            Họ & Tên
          </div>
          <div class="user-info--body__item-input">
            <a-input
              v-decorator="[ 'name', { rules: rules.name, initialValue: name }]"
              size="large"
              placeholder="Nhập họ của bạn"
              :disabled="!isEdit"
            />
          </div>
        </a-form-item>

        <a-form-item class="user-info--body__item">
          <div class="user-info--body__item-label">
            Địa chỉ
          </div>
          <div class="user-info--body__item-input">
            <a-input
              v-decorator="[ 'address', { rules: rules.address, initialValue: address }]"
              size="large"
              placeholder="Nhập tên của bạn"
              :disabled="!isEdit"
            />
          </div>
        </a-form-item>

        <!-- <a-form-item class="user-info--body__item">
          <div class="user-info--body__item-label">
            Số điện thoại
          </div>
          <div class="user-info--body__item-input">
            <a-input
              v-decorator="[ 'phoneNumber', { rules: rules.phoneNumber, initialValue: userInfo.phoneNumber || '' }]"
              size="large"
              type="number"
              placeholder="Nhập số điện thoại của bạn"
              :disabled="!isEdit"
            >
              <a-select slot="addonBefore" style="width: 70px" default-value="84">
                <a-select-option value="84">
                  +84
                </a-select-option>
              </a-select>
            </a-input>
          </div>
        </a-form-item> -->

        <a-form-item class="user-info--body__item">
          <div class="user-info--body__item-label">
            Email
          </div>
          <div class="user-info--body__item-input">
            <a-input
              v-decorator="[ 'email', { initialValue: nickname }]"
              size="large"
              placeholder="Nhập email của bạn"
              disabled
            />
          </div>
        </a-form-item>
      </a-form>

      <div class="user-info--body__item">
        <div class="user-info--body__item-label">
          Mật khẩu
        </div>
        <a-button class="user-info--body__item-button" @click="showChangePassword">
          Đổi mật khẩu
        </a-button>
      </div>
    </div>
    <a-divider />
    <div class="user-info--footer">
      <div v-if="isEdit">
        <a-button type="dashed" size="large" @click="toggleEdit">
          Huỷ
        </a-button>
        <a-button class="user-info--footer-button" size="large" @click="handleSubmit">
          Lưu thay đổi
        </a-button>
      </div>
      <a-button v-else type="primary" size="large" @click="toggleEdit">
        Thay đổi thông tin
      </a-button>
    </div>

    <a-modal
      v-model="showLoginDialog"
      centered
      :mask-closable="true"
      :closable="true"
      :footer="null"
    >
      <change-password />
    </a-modal>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { ChangePassword } from '@/components/Authenticator'

export default {
  components: {
    ChangePassword
  },
  props: {
    name: { type: String, required: true, default: () => '' },
    address: { type: String, required: true, default: () => '' },
    nickname: { type: String, required: true, default: () => '' }
  },
  data() {
    return {
      rules: {
        name: [{ required: true, message: 'Nhập họ & tên của bạn !' }],
        address: [{ required: true, message: 'Nhập địa chỉ của bạn !' }],
        phoneNumber: [{ required: true, message: 'Nhập số điện thoại của bạn !' }]
      },
      isEdit: false,
      showLoginDialog: false
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  methods: {
    ...mapActions('user', ['updateAttribute']),
    toggleEdit() {
      this.isEdit = !this.isEdit
    },
    handleSubmit(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        $notification,
        updateAttribute,
        toggleEdit
      } = this
      const validateFieldsKey = ['name', 'address']
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const { name, address } = values
          const payload = {
            name: name,
            address: address
          }
          this.$Amplify.Auth.currentAuthenticatedUser()
            .then(user => this.$Amplify.Auth.updateUserAttributes(user, payload))
            .then((result) => {
              updateAttribute()
              toggleEdit()
              $notification.success({
                message: 'Info',
                description: 'Successful change your info',
                duration: 8
              })
            })
            .catch(error => this.setError(error))
        }
      })
    },
    showChangePassword() {
      this.showLoginDialog = true
    },
    setError(err) {
      this.$notification.error({
        message: 'Error',
        description: err.message || 'Request error, please try again later',
        duration: 4
      })
      this.registerBtn = false
    }
  }
}
</script>
