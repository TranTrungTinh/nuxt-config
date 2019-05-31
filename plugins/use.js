import Vue from 'vue'

// base library
import Viser from 'viser-vue'
import VueCropper from 'vue-cropper'

// ext library
import VueClipboard from 'vue-clipboard2'
import VueStorage from 'vue-ls'
import VueRx from 'vue-rx'

VueClipboard.config.autoSetContainer = true

Vue.use(Viser)

Vue.use(VueClipboard)
Vue.use(VueCropper)

Vue.use(VueStorage, {
  namespace: 'skg__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local' // storage name session, local, memory
})
Vue.use(VueRx)
