<template>
    <div class="indexpage">
        <Navbar></Navbar>
        <div>
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528714289258&di=4cbb9e526e356cdffffe375a70724851&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F86d6277f9e2f0708acd392d8ee24b899a801f210.jpg" alt="">
        </div>
    </div>
</template>

<script>
import Navbar from "./navbar";
export default {
  components: { Navbar },
  name: "IndexPage",
  data() {
    return {
    };
  }
};
</script>

<style scoped>
.addorder {
  margin-left: 0px;
}
.indexpage {
  /* background: rgb(100, 100, 100); */
}
</style>
