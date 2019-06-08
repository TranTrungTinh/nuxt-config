<template>
  <a-modal 
    :visible="visible" :mask-closable="false" 
    :footer="null" :closable="false" :maskClosable="false"
  >
    <a-progress :percent="percent" :status="status" />
  </a-modal>
</template>
<script>
export default {
  props: {
    percent: { type: Number, required: true, default: () => 0 }
  },
  computed: {
    status() {
      if(this.percent < 100) return 'active';
      return 'success';
    }
  },
  methods: {
    open() { this.visible = true },
    close() { this.visible = false }
  }
}
</script>

<style lang="less" scoped>
  .avatar-upload-preview {
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    width: 180px;
    height: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
