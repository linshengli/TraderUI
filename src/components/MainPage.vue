<template>
    <div class="mainPage">
        <Navbar></Navbar>
        <MarketDepth></MarketDepth>
        <div class="addorder container">
          <AddOrder></AddOrder>
          </div>
    </div>
</template>

<script>
import Navbar from "./navbar";
import MarketDepth from "./marketDepth";
import AddOrder from "./AddOrder";
export default {
  components: { Navbar, MarketDepth, AddOrder },
  name: "MainPage",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<style scoped>
.addorder {
  margin-left: 0px;
}
.mainPage {
  background: rgb(100, 100, 100);
}
</style>
