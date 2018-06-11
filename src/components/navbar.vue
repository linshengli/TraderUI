<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a
        class="navbar-brand"
        href="#/index"
    >TraderUI</a>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
            </button>
            <div
                class="collapse navbar-collapse"
                id="navbarNav"
            >
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            v-text="tbrand"
                        >
                            </a>
                            <div
                                class="dropdown-menu"
                                aria-labelledby="navbarDropdownMenuLink"
                            >
                                <a
                                    class="dropdown-item"
                                    href="#/company/SHFE/product/Gold Swaps"
                                >Gold Swaps(SHFE)</a>
                                    <a
                                        class="dropdown-item"
                                        href="#/company/SHFE/product/Silver Swaps"
                                    >Silver Swaps(SHFE)</a>
                                        <a
                                            class="dropdown-item"
                                            href="#/company/CDE/product/Gold Swaps"
                                        >Gold Swaps(CDE)</a>
                                        <a
                                            class="dropdown-item"
                                            href="#/company/CDE/product/Silver Swaps"
                                        >Silver Swaps(CDE)</a>
                                            </div>
                    </li>
                    <li class="nav-item pull-right" v-if="$route.params.company">
                        <div
                            class="nav-link btn"
                            @click="changeToHistoryPage"
                        >History Order</div>
                    </li>
                    <li class="nav-item pull-right logout">
                        <div @click="loginOrOutlink" class="btn btn-success" >
                            {{loginOrOut}}
                        </div>
                    </li>
                </ul>
                </div>
</nav>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    changeToHistoryPage() {
      let company = this.$route.params.company;
      let product = this.$route.params.product;
      this.$router.push(
        "/company/" + company + "/product/" + product + "/history"
      );
    },
    loginOrOutlink() {
      let user = sessionStorage.getItem("user");
      if (user == undefined) {
        this.$router.push("/login");
      } else {
        sessionStorage.clear();
        this.$message.success("log out success!");
        this.$router.push("/");
      }
    }
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  computed: {
    loginOrOut() {
      let user = sessionStorage.getItem("user");
      if (user == undefined) {
        return "Login";
      } else {
        return "Logout";
      }
    },
    tbrand() {
      if (
        this.$route.params.company != undefined &&
        this.$route.params.product != undefined
      ) {
        return this.$route.params.company + "  " + this.$route.params.product;
      } else {
        return "Broker Company";
      }
    }
  }
};
</script>

<style scoped>
nav {
  margin-top: -60px;
}
.logout {
  margin-left: 800px;
}
</style>
