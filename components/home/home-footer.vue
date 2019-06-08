<template>
  <div class="footer">
    <a-row :gutter="16">
      <a-col :lg="4">
        <div class="footer--item">
          <h4 class="title">
            Lazaha
          </h4>
          <p class="handmade-links">
            Về chúng tôi
          </p>
          <p class="handmade-links">
            Hổ trợ khách hàng
          </p>
          <p class="handmade-links">
            Liên hệ
          </p>
        </div>
      </a-col>
      <a-col :lg="4">
        <div class="footer--item">
          <h4 class="title">
            Bán hàng với Lazaha
          </h4>
          <p class="handmade-links">
            Đăng ký bán hàng
          </p>
          <p class="handmade-links">
            Chính sách bán hàng
          </p>
          <p class="handmade-links">
            Hợp tác
          </p>
        </div>
      </a-col>
      <a-col :lg="11">
        <div class="footer--item">
          <h4 class="title">
            Danh mục sản phẩm
          </h4>
          <a-row :gutter="16">
            <a-col :xs="8">
              <p class="handmade-links">
                Phụ kiện, trang sức
              </p>
              <p class="handmade-links">
                Túi xách
              </p>
              <p class="handmade-links">
                Thời trang
              </p>
              <p class="handmade-links">
                Đồ trẻ em
              </p>
            </a-col>
            <a-col :xs="8">
              <p class="handmade-links">
                Phụ kiện, trang sức
              </p>
              <p class="handmade-links">
                Túi xách
              </p>
              <p class="handmade-links">
                Thời trang
              </p>
              <p class="handmade-links">
                Đồ trẻ em
              </p>
            </a-col>
            <a-col :xs="8">
              <p class="handmade-links">
                Phụ kiện, trang sức
              </p>
              <p class="handmade-links">
                Túi xách
              </p>
              <p class="handmade-links">
                Thời trang
              </p>
              <p class="handmade-links">
                Đồ trẻ em
              </p>
            </a-col>
          </a-row>
        </div>
      </a-col>
      <a-col :lg="5">
        <div class="footer--item">
          <h4 class="title">
            Kết nối
          </h4>
          <p>
            <a-icon type="facebook" />
            <a-icon type="youtube" />
          </p>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
  @import '@/assets/scss/home/home-footer.scss';
</style>
