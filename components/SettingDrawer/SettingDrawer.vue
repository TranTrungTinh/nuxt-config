
<template>
  <div ref="settingDrawer" class="setting-drawer">
    <a-drawer
      width="300"
      placement="right"
      :closable="false"
      :visible="visible"
      :get-container="() => $refs.settingDrawer"
      :style="{}"
      @close="onClose"
    >
      <div class="setting-drawer-index-content">
        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">
            Menu style
          </h3>

          <div class="setting-drawer-index-blockChecbox">
            <a-tooltip>
              <template slot="title">
                Dark mode
              </template>
              <div class="setting-drawer-index-item" @click="handleMenuTheme('dark')">
                <img src="/settings/dark_theme.svg" alt="dark">
                <div v-if="navTheme === 'dark'" class="setting-drawer-index-selectIcon">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>

            <a-tooltip>
              <template slot="title">
                Light mode
              </template>
              <div class="setting-drawer-index-item" @click="handleMenuTheme('light')">
                <img src="/settings/light_theme.svg" alt="light">
                <div v-if="navTheme !== 'dark'" class="setting-drawer-index-selectIcon">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>
          </div>
        </div>

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">
            Theme color
          </h3>

          <div style="height: 20px">
            <a-tooltip
              v-for="(item, index) in colorList"
              :key="index"
              class="setting-drawer-theme-color-colorBlock"
            >
              <template slot="title">
                {{ item.key }}
              </template>
              <a-tag :color="item.color" @click="changeColor(item.color)">
                <a-icon v-if="item.color === primaryColor" type="check" />
              </a-tag>
            </a-tooltip>
          </div>
        </div>
        <a-divider />

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">
            Navigation mode
          </h3>

          <div class="setting-drawer-index-blockChecbox">
            <a-tooltip>
              <template slot="title">
                Sidebar navigation
              </template>
              <div class="setting-drawer-index-item" @click="handleLayout('sidemenu')">
                <img src="/settings/sidebar.svg" alt="sidemenu">
                <div v-if="layoutMode === 'sidemenu'" class="setting-drawer-index-selectIcon">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>

            <a-tooltip>
              <template slot="title">
                Topbar navigation
              </template>
              <div class="setting-drawer-index-item" @click="handleLayout('topmenu')">
                <img src="/settings/topbar.svg" alt="topmenu">
                <div v-if="layoutMode !== 'sidemenu'" class="setting-drawer-index-selectIcon">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>
          </div>
          <div :style="{ marginTop: '24px' }">
            <a-list :split="false">
              <a-list-item>
                <a-tooltip slot="actions">
                  <template slot="title">
                    This setting is valid only when [Topbar Navigation]
                  </template>
                  <a-select
                    size="small"
                    style="width: 100px;"
                    :default-value="contentWidth"
                    @change="handleContentWidthChange"
                  >
                    <a-select-option value="Fixed">
                      Fixed
                    </a-select-option>
                    <a-select-option v-if="layoutMode !== 'sidemenu'" value="Fluid">
                      Full width
                    </a-select-option>
                  </a-select>
                </a-tooltip>
                <a-list-item-meta>
                  <div slot="title">
                    Bar width
                  </div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :default-checked="fixedHeader"
                  @change="handleFixedHeader"
                />
                <a-list-item-meta>
                  <div slot="title">
                    Fixed Header
                  </div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :disabled="!fixedHeader"
                  :default-checked="autoHideHeader"
                  @change="handleFixedHeaderHidden"
                />
                <a-list-item-meta>
                  <a-tooltip slot="title" placement="left">
                    <template slot="title">
                      Configurable when fixed Header
                    </template>
                    <div :style="{ opacity: !fixedHeader ? '0.5' : '1' }">
                      Auto hide Header
                    </div>
                  </a-tooltip>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :disabled="(layoutMode === 'topmenu')"
                  :default-checked="fixSiderbar"
                  @change="handleFixSiderbar"
                />
                <a-list-item-meta>
                  <div
                    slot="title"
                    :style="{ textDecoration: layoutMode === 'topmenu' ? 'line-through' : 'unset' }"
                  >
                    Fixed side menu
                  </div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </div>
        <a-divider />

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">
            Other settings
          </h3>
          <div>
            <a-list :split="false">
              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :default-checked="colorWeak"
                  @change="onColorWeak"
                />
                <a-list-item-meta>
                  <div slot="title">
                    Weak mode
                  </div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :default-checked="multiTab"
                  @change="onMultiTab"
                />
                <a-list-item-meta>
                  <div slot="title">
                    Multi-page mode
                  </div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </div>
        <a-divider />
        <div :style="{ marginBottom: '24px' }">
          <a-button icon="copy" block @click="doCopy">
            Copy settings
          </a-button>
          <a-alert type="warning" :style="{ marginTop: '24px' }">
            <span slot="message">
              The configuration used in the development environment for preview, the production environment will not be displayed
            </span>
          </a-alert>
        </div>
      </div>
      <div class="setting-drawer-index-handle" @click="toggle">
        <a-icon v-if="!visible" type="setting" />
        <a-icon v-else type="close" />
      </div>
    </a-drawer>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import { DetailList } from '@/components'
import SettingItem from './SettingItem'
import config from '@/config/defaultSettings'
import { updateTheme, updateColorWeak, colorList } from './settingConfig'

import LogoSvg from '@/assets/images/logo.svg?inline'
import { mixin, mixinDevice } from '@/utils/mixin'

export default {
  components: {
    DetailList,
    SettingItem,
    LogoSvg
  },
  mixins: [mixin, mixinDevice],
  data() {
    return {
      visible: true,
      colorList
    }
  },
  watch: {},
  mounted() {
    const vm = this
    setTimeout(() => {
      vm.visible = false
    }, 16)
    // Theme compilation when the theme color is not the default color
    if (this.primaryColor !== config.primaryColor) {
      updateTheme(this.primaryColor)
    }
    if (this.colorWeak !== config.colorWeak) {
      updateColorWeak(this.colorWeak)
    }
  },
  methods: {
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    toggle() {
      this.visible = !this.visible
    },
    onColorWeak(checked) {
      this.$store.dispatch('app/ToggleWeak', checked)
      updateColorWeak(checked)
    },
    onMultiTab(checked) {
      this.$store.dispatch('app/ToggleMultiTab', checked)
    },
    handleMenuTheme(theme) {
      this.$store.dispatch('app/ToggleTheme', theme)
    },
    doCopy() {
      // get current settings from mixin or this.$store.state.app, pay attention to the property name
      const text = `export default {
  primaryColor: '${this.primaryColor}', // primary color of ant design
  navTheme: '${this.navTheme}', // theme for nav menu
  layout: '${this.layoutMode}', // nav menu position: sidemenu or topmenu
  contentWidth: '${this.contentWidth}', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: ${this.fixedHeader}, // sticky header
  fixSiderbar: ${this.fixSiderbar}, // sticky siderbar
  autoHideHeader: ${this.autoHideHeader}, //  auto hide header
  colorWeak: ${this.colorWeak},
  multiTab: ${this.multiTab},
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
}`
      this.$copyText(text)
        .then((message) => {
          console.log('copy', message)
          this.$message.success('Copy completed')
        })
        .catch((err) => {
          console.log('copy.err', err)
          this.$message.error('Copy failed')
        })
    },
    handleLayout(mode) {
      this.$store.dispatch('app/ToggleLayoutMode', mode)
      this.handleFixSiderbar(false)
    },
    handleContentWidthChange(type) {
      this.$store.dispatch('app/ToggleContentWidth', type)
    },
    changeColor(color) {
      if (this.primaryColor !== color) {
        this.$store.dispatch('app/ToggleColor', color)
        updateTheme(color)
      }
    },
    handleFixedHeader(fixed) {
      this.$store.dispatch('app/ToggleFixedHeader', fixed)
    },
    handleFixedHeaderHidden(autoHidden) {
      this.$store.dispatch('app/ToggleFixedHeaderHidden', autoHidden)
    },
    handleFixSiderbar(fixed) {
      if (this.layoutMode === 'topmenu') {
        this.$store.dispatch('app/ToggleFixSiderbar', false)
        return
      }
      this.$store.dispatch('app/ToggleFixSiderbar', fixed)
    }
  }
}
</script>

<style lang="less" scoped>
.setting-drawer-index-content {
  .setting-drawer-index-blockChecbox {
    display: flex;

    .setting-drawer-index-item {
      margin-right: 16px;
      position: relative;
      border-radius: 4px;
      cursor: pointer;

      img {
        width: 48px;
      }

      .setting-drawer-index-selectIcon {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        padding-top: 15px;
        padding-left: 24px;
        height: 100%;
        color: #1890ff;
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
  .setting-drawer-theme-color-colorBlock {
    width: 20px;
    height: 20px;
    border-radius: 2px;
    float: left;
    cursor: pointer;
    margin-right: 8px;
    padding-left: 0px;
    padding-right: 0px;
    text-align: center;
    color: #fff;
    font-weight: 700;

    i {
      font-size: 14px;
    }
  }
}

.setting-drawer-index-handle {
  position: absolute;
  top: 240px;
  background: #1890ff;
  width: 48px;
  height: 48px;
  right: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  z-index: 1001;
  text-align: center;
  font-size: 16px;
  border-radius: 4px 0 0 4px;

  i {
    color: rgb(255, 255, 255);
    font-size: 20px;
  }
}
</style>
