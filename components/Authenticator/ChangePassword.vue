<template>
  <div class="user-layout-register">
    <h3>
      <span>Change Password</span>
    </h3>
    <a-form id="formRegister" ref="formRegister" autocomplete="off" :form="form" @submit="handleSubmit">
      <a-form-item>
        <a-input
          v-decorator="['oldPassword', {rules: [{ required: true, message: 'Please input your old password.'}]}]"
          size="large"
          type="password"
          placeholder="Old Password"
        />
      </a-form-item>
      <a-popover placement="rightTop" trigger="click" :visible="state.passwordLevelChecked">
        <template slot="content">
          <div :style="{ width: '240px' }">
            <div :class="['user-register', passwordLevelClass]">
              Password strength:
              <span>{{ passwordLevelName }}</span>
            </div>
            <a-progress
              :percent="state.percent"
              :show-info="false"
              :stroke-color=" passwordLevelColor "
            />
            <div style="margin-top: 10px;">
              <span>Please enter at least 8 characters. Please do not use passwords that are easy to guess.</span>
            </div>
          </div>
        </template>
        <a-form-item>
          <a-input
            v-decorator="['password', {rules: [{ required: true, message: 'At least 8-digit password, case sensitive.'}, { validator: handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
            size="large"
            type="password"
            autocomplete="new-password"
            placeholder="Password"
            @click="handlePasswordInputClick"
          />
        </a-form-item>
      </a-popover>

      <a-form-item>
        <a-input
          v-decorator="['password2', {rules: [{ required: true, message: 'At least 8-digit password, case sensitive.' }, { validator: handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
          size="large"
          type="password"
          autocomplete="false"
          placeholder="Confirm password"
        />
      </a-form-item>

      <a-form-item>
        <a-button
          size="large"
          type="primary"
          html-type="submit"
          class="register-button"
          :loading="registerBtn"
          :disabled="registerBtn"
        >
          Change Password
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'

const levelNames = {
  0: 'Very weak',
  1: 'Weak',
  2: 'Good',
  3: 'Great'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}
// TODO phone reg
// ^\+?[1-9]\d{1,14}$
export default {
  name: 'ChangePassword',
  mixins: [mixinDevice],
  data() {
    return {
      form: this.$form.createForm(this),
      countryCode: '+84',
      state: {
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      registerBtn: false
    }
  },
  computed: {
    passwordLevelClass() {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName() {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor() {
      return levelColor[this.state.passwordLevel]
    }
  },
  methods: {
    handlePasswordLevel(rule, value, callback) {
      let level = 0

      // Determine if there are any numbers in this string
      if (/[0-9]/.test(value)) {
        level++
      }
      // Determine if there are any letters in the string
      if (/[a-zA-Z]/.test(value)) {
        level++
      }
      // Determine if there are any special symbols in the string
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++
      }
      this.state.passwordLevel = level
      this.state.percent = level * 30
      if (level >= 2) {
        if (level >= 3) {
          this.state.percent = 100
        }
        callback()
      } else {
        if (level === 0) {
          this.state.percent = 10
        }
        callback(new Error('Insufficient password strength'))
      }
    },
    handlePhoneCheck(rule, value, callback) {
      callback()
    },
    handlePasswordCheck(rule, value, callback) {
      const password = this.form.getFieldValue('password')
      if (value === undefined) {
        callback(new Error('Please enter your password'))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('Two passwords are inconsistent'))
      }
      callback()
    },

    handlePasswordInputClick() {
      if (!this.isMobile()) {
        this.state.passwordLevelChecked = true
        return
      }
      this.state.passwordLevelChecked = false
    },

    handleSubmit(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        $notification
      } = this
      const validateFieldsKey = ['oldPassword', 'password']
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const { oldPassword, password } = values
          this.$Amplify.Auth.currentAuthenticatedUser()
            .then(user => this.$Amplify.Auth.changePassword(user, oldPassword, password))
            .then((data) => {
              $notification.success({
                message: 'Info',
                description: 'Successful change your password',
                duration: 8
              })
            })
            .catch(error => this.setError(error))
        }
      })
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
<style lang="less">
.user-register {
  &.error {
    color: #ff0000;
  }

  &.warning {
    color: #ff7e05;
  }

  &.success {
    color: #52c41a;
  }
}

.user-layout-register {
  .ant-input-group-addon:first-child {
    background-color: #fff;
  }
}
</style>
<style lang="less" scoped>
.user-layout-register {
  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .register-button {
    width: 100%;
  }

  .login {
    float: right;
    line-height: 40px;
  }
}
</style>
