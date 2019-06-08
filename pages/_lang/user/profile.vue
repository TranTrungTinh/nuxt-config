<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false">
          <div class="account-center-avatarHolder">
            <avatar :avatar="avatar" />
            <div class="username">
              {{ profileName }}
            </div>
            <div class="bio">
              {}
            </div>
          </div>
          <div class="account-center-detail">
            <p>
              <i class="title" />Spring Knowledge Global
            </p>
            <p>
              <i class="group" />Developer
            </p>
            <p>
              <i class="address" />
              <span v-if="userInfo.address">{{ userInfo.address }}</span>
              <span v-else>...</span>
            </p>
          </div>
          <a-divider />
          <div>
            <p>
              <a-icon type="tags" />
              <span>
                You are a
                <a-tag v-if="isSeller" color="#f50">Seller</a-tag>
                <a-tag v-else color="#108ee9">Buyer</a-tag>
              </span>
            </p>
          </div>
          <!-- <a-divider /> -->
          <a-button
            v-if="!isSeller"
            type="primary"
            class="account-center-detail--button"
            :loading="registerBtn"
            :disabled="registerBtn"
            @click="handleBecomeSeller"
          >
            Become a Seller
          </a-button>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <a-card
          style="width:100%"
          :bordered="false"
          :tab-list="tabListNoTitle"
          :active-tab-key="noTitleKey"
          @tabChange="key => handleTabChange(key, 'noTitleKey')"
        >
          <account-infos
            v-if="noTitleKey === 'account'"
            :name="userInfo.name"
            :address="userInfo.address"
            :nickname="nickname"
          />
          <!-- <article-page v-if="noTitleKey === 'article'"></article-page>
          <app-page v-else-if="noTitleKey === 'app'"></app-page>
          <project-page v-else-if="noTitleKey === 'project'"></project-page>-->
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Avatar, AccountInfos } from '@/components/Profile'

export default {
  components: {
    Avatar,
    AccountInfos
  },
  data() {
    return {
      tabListNoTitle: [
        {
          key: 'account',
          tab: 'Account'
        }
      ],
      noTitleKey: 'account',
      registerBtn: false
    }
  },
  computed: {
    ...mapGetters('user', ['nickname', 'avatar', 'userInfo', 'isSeller']),
    profileName() {
      return this.userInfo.name || this.nickname
    }
  },
  methods: {
    ...mapActions('user', ['updateAttribute']),

    handleBecomeSeller() {
      const apiName = 'SellerAPI'
      const path = '/seller/register'
      this.registerBtn = true

      this.$Amplify.API.post(apiName, path)
        .then(() => {
          this.registerBtn = false
          this.updateAttribute()
          this.$notification.success({
            message: 'Info',
            description: 'Successful !!! Now you are a Seller.',
            duration: 8
          })
        }).catch((error) => {
          this.registerBtn = false
          this.$notification.error({
            message: 'Error',
            description: error.message || 'Cannot become a seller right now. Please try again.',
            duration: 4
          })
        })
    }
  }

}
</script>

<style lang="less" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;
  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;
    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }
  .account-center-detail {
    p {
      margin-bottom: 8px;
      padding-left: 26px;
      position: relative;
    }
    i {
      position: absolute;
      height: 14px;
      width: 14px;
      left: 0;
      top: 4px;
      background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
    }
    .title {
      background-position: 0 0;
    }
    .group {
      background-position: 0 -22px;
    }
    .address {
      background-position: 0 -44px;
    }

    &--button {
      width: 100%;
    }
  }

}
</style>
