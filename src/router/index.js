import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld"
import Navbar from "@/components/navbar"
import IndexPage from "@/components/IndexPage"
import MainPage from "@/components/MainPage"
import LoginPage from "@/components/LoginPage"
import HistoryPage from "@/components/HistoryPage"
import OrderBlotterPage from "@/components/OrderBlotterPage"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "indexPage_default",
      component: IndexPage
    },
    {
      path: "/index",
      name: "indexPage",
      component: IndexPage
    },
    {
      path:"/login",
      name:"loginPage",
      component:LoginPage
    },
    {
      path:"/company/:company/product/:product/history",
      name:"historyPage",
      component:HistoryPage
    },
    {
      path:"/company/:company/product/:product",
      name:"companyPage",
      component:MainPage
    }
  ]
});
