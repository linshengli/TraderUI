<template>
<div class="v_box">
    <div class="content">
        <div class="">
            <div class="market-right">
                <div
                    id="marketData"
                    class="market-data"
                >
                    <div class="market-depth">
                        <div class="market-depth-head">
                            <span class="depth-des">&nbsp;</span>
                            <span class="depth-price">价格(NPC)</span>
                            <span class="depth-amount">数量</span>
                        </div>
                        <div
                            class="market-depth-data"
                            id="marketDepthData"
                        >
                            <div class="market-depth-price">
                                <div
                                    class="market-depth-sell"
                                    id="marketDepthSell"
                                >
                                    <article
                                        v-for="(value, index) in marketDepthSell"
                                        :key="index"
                                    >

                                        <span class="depth-des market-font-sell">卖{{ marketDepthSell.length - index}}</span>
                                        <span class="depth-price">{{value.price}}</span>
                                        <span class="depth-amount">{{value.volume}}</span>
                                        </article>
                            </div>
                            <div class="depth-price2 text-left">

                                <span
                                    id="marketPrice"
                                    class="ihprice market-font-1"
                                ></span>
                            </div>
                            <div class="depth-price2 text-center">
                                Market Depth
                                <span
                                    id="cnyPrice"
                                    class="cnyprice market-font-1"
                                ></span>
                            </div>
                            <div class="depth-price2 right">

                                <span
                                    class="ihchange market-font-1"
                                    id="marketRose"
                                ></span>
                            </div>
                            <div
                                class="market-depth-buy"
                                id="marketDepthBuy"
                            >
                                <article
                                    v-for="(value, index) in marketDepthBuy"
                                    :key="index"
                                >
                                    <span class="depth-des market-font-buy">买{{index + 1}}</span>
                                    <span class="depth-price">{{value.price}}</span>
                                    <span class="depth-amount">{{value.volume}}</span>
                                    </article>
                    </div>
            </div>
        </div>
    </div>
    <div class="market-success">
        <div class="market-success-head">
            <span class="success-time">时间</span>
            <span class="success-price">价格(NPC)</span>
            <span class="success-amount">成交量 (
                                    <i class="nb_green">买</i>/
                                    <i class="nb_red">卖</i>)</span>
        </div>
        <div
            class="market-success-data"
            id="marketSuccessData"
        >
            <article
                v-for="(value,index) in marketSuccess"
                :key="index"
            >
                <span class="success-time">{{value.time}}</span>
                <span class="success-price">{{value.price}}</span>
                <span
                    class="success-amount market-font-0"
                    :class="{ 'success-amount': true, 'market-font-0': value.type==0,'market-font-1': value.type==1 }"
                >{{value.count}}</span>
            </article>
    </div>
</div>
</div>
</div>
</div>
</div>
</div>
</template>

<script>
import { api_marketDepth_every_second, WEBSOCKETBASE } from "../api/api";
export default {
  name: "MarketDepth",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      // ws: {},
      wss: {},
      marketDepthSell: [],
      marketDepthBuy: [],
      // marketSuccess:[]
      marketSuccess: [],
      timer: {}
    };
  },
  watch: {
    $route(to, from) {
      let ws = {};
      let product = this.$route.params.product;
      let company = this.$route.params.company;
      ws = new WebSocket(WEBSOCKETBASE + company + "/" + product);
      ws.onmessage = this.onMessage;
      ws.onclose = () => {
        console.log("closed ws in onclose.");
      };
      this.wss[company] = this.wss[company] || {};
      this.wss[company][product] = ws;
    }
  },
  // {"type":"MarketDepthBuy","data":[{"dpid":11,"level":-1,"price":1230,"volume":10},{"dpid":12,"level":-2,"price":1229,"volume":10},{"dpid":13,"level":-3,"price":1228,"volume":30},{"dpid":14,"level":-4,"price":1227,"volume":10},{"dpid":15,"level":-5,"price":1226,"volume":10},{"dpid":16,"level":-6,"price":1225,"volume":10},{"dpid":17,"level":-7,"price":1224,"volume":10},{"dpid":18,"level":-8,"price":1223,"volume":10},{"dpid":22,"level":-9,"price":1222,"volume":10},{"dpid":19,"level":-10,"price":1221,"volume":10}]}
  methods: {
    connect() {
      this.orderBlotter();
      let ws = {};
      let product = this.$route.params.product;
      let company = this.$route.params.company;
      ws = new WebSocket(WEBSOCKETBASE + company + "/" + product);
      ws.onmessage = this.onMessage;
      ws.onclose = () => {
        console.log("closed ws in onclose.");
      };
      this.wss[company] = this.wss[company] || {};
      this.wss[company][product] = ws;
    },
    onMessage(evt) {
      var msg = JSON.parse(evt.data);
      console.log("Websocket");
      console.log(msg);
      switch (msg.type) {
        case "MarketDepthBuy":
          this.marketDepthBuy = msg.data;
          break;
        case "MarketDepthSell":
          // this.users = JSON.parse(msg.mess).map(value => JSON.parse(value));
          this.marketDepthSell = msg.data;
          break;
        default:
          break;
      }
    },
    orderBlotter() {
      let product = this.$route.params.product;
      let company = this.$route.params.company;
      api_marketDepth_every_second(company, product)
        .then(data => {
          console.log("Data : " + data);
          this.marketSuccess = data;
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.timer = window.setInterval(this.orderBlotter, 1000);
  },
  created() {
    this.connect(); 
    this.orderBlotter();
  },
  beforeDestroy() {
    window.clearInterval(timer);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body {
  height: 100%;
  border: 0px;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

::-webkit-scrollbar-track {
  background: #000;
  -webkit-box-shadow: inset 0 0 6px #000;
  -webkit-border-radius: 8px;
}

::-webkit-scrollbar-thumb {
  -webkit-border-radius: 8px;
  background: #38383c;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.19);
}

::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(75, 75, 75, 0.95);
}

.market-font-sell {
  color: #dd5d36;
}

.market-font-buy {
  color: #75d75c;
}

.market-font-0 {
  color: #dd5d36;
}

.market-font-1 {
  color: #75d75c;
}

.market-head {
  height: 52px;
  background: #1f1d1d;
  border-bottom: 1px solid #2b2929;
}

.market-head .head-logo {
  padding: 5px 15px;
  margin: 0;
  display: inline-block;
}

.market-head .head-logo a {
  width: 122px;
  height: 36px;
  display: inline-block;
  background-position: 0 0;
  vertical-align: middle;
}

.market-head .head-nav {
  display: inline-block;
}

.market-head .head-nav a {
  font-size: 14px;
  display: inline-block;
  padding: 0 10px;
  color: #6d7b82;
  transition: color 0.3s;
}

.market-head .head-nav a:hover,
.market-head .head-nav a.active {
  color: #de211d;
  text-decoration: none;
}

.market-head .head-login {
  display: inline-block;
  float: right;
  height: 52px;
  padding: 13px 15px;
  font-size: 14px;
  color: #6d7b82;
  line-height: 25px;
}

.market-head .head-login input {
  background-color: #161616;
  border: 1px solid #434343;
  outline: 0;
  padding: 0;
  height: 25px;
  text-indent: 0.5em;
  color: #ccc;
  margin-right: 5px;
}

.market-head .head-login button {
  outline: none;
  background-color: #4d9cec;
  border: 1px solid #4175ab;
  color: #fff;
  height: 25px;
  padding: 0 20px;
  cursor: pointer;
  line-height: 25px;
}

.market-head .head-login span {
  cursor: pointer;
  padding: 0 3px;
}

.market-head .head-login span:hover {
  color: #1686cc;
}

.market-left {
  float: left;
  width: 100%;
}

.entrust-left {
  float: left;
  width: 60%;
}

.market-right {
  float: left;
  width: 505px;
  border-top: 1px solid #2b2929;
  background-color: #1b1b1b;
  font-size: 12px;
}

.business-right {
  float: left;
  width: 505px;
  border-left: 1px solid #2b2929;
}

.market-start,
.entrust-start {
  width: 100%;
  height: 500px;
  position: relative;
  float: left;
  height: 500px;
}

.market-data {
  width: 505px;
  height: 500px;
  float: right;
  color: #bababa;
  text-align: right;
}

.business-go {
  width: 505px;
  height: 500px;
  float: right;
  color: #bababa;
}

.market-depth {
  width: 245px;
  height: 100%;
  float: left;
  border-bottom: 1px solid #2b2929;
  border-right: 1px solid #2b2929;
}

.business-go-buy {
  width: 246px;
  height: 100%;
  float: left;
  border-right: 1px solid #2b2929;
}

.market-depth-head {
  height: 43px;
  background-color: #1a1a1a;
  border-bottom: 1px solid #282828;
  line-height: 43px;
}

.market-depth-data {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.market-depth-sell {
  /* position: absolute;
	left: 0;
	bottom: 32px; */
  width: 100%;
  height: 43%;
  overflow: auto;
}

.market-depth-buy {
  /* position: absolute;
	left: 0;
	top: 35px; */
  width: 100%;
  height: 42.5%;
  overflow: auto;
}

.market-depth article {
  height: 21px;
  line-height: 21px;
}

.market-depth article:hover {
  background: #333333;
  cursor: pointer;
}

.market-depth .depth-des {
  width: 46px;
  float: left;
  text-align: left;
  padding-left: 8px;
}

.market-depth .depth-price {
  width: 70px;
  float: left;
}

.market-depth .depth-amount {
  width: 108px;
  float: left;
}

.market-depth-price {
  width: 100%;
  /* height: 30px;
	line-height: 30px;
	background: #26272a;
	position: absolute;
	top: 50%;
	margin-top: -18px; */
  height: 100%;
}

.market-depth-price div.depth-price {
  width: 50%;
  float: left;
  padding-left: 8px;
  white-space: nowrap;
  background: #26272a;
  height: 30px;
  line-height: 30px;
}

.market-depth-price div.depth-price.right {
  padding-right: 5px;
  padding-left: 0;
}

.market-depth-price span {
  display: inline-block;
}

.market-success {
  width: 260px;
  height: 100px;
  float: left;
  border-bottom: 1px solid #2b2929;
}

.business-go-sell {
  width: 259px;
  height: 100%;
  float: left;
  border-bottom: 1px solid #2b2929;
}

.market-success-head {
  height: 43px;
  background-color: #1a1a1a;
  border-bottom: 1px solid #282828;
  line-height: 43px;
}

.market-success .success-time {
  width: 75px;
  float: left;
  padding-left: 10px;
  text-align: left;
}

.market-success .success-price {
  width: 70px;
  float: left;
}

.market-success .success-amount {
  width: 95px;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* course: hand; */
  text-align: right;
}

.market-success-data {
  overflow-y: auto;
  height: 455px;
}

.market-success-data article {
  height: 21px;
  line-height: 21px;
}

.market-entruts {
  width: 100%;
  height: 159px;
  float: left;
}

.market-entruts .entruts-data {
  width: 50%;
  height: 129px;
  float: left;
  border-right: 1px solid #2b2929;
}

.market-entruts .entruts-head {
  height: 30px;
  line-height: 30px;
  background: #1e1e1e;
  color: #707070;
  border-right: 1px solid #2b2929;
}

.market-entruts .entruts-head .entruts-head-nav-full {
  width: 50%;
  float: left;
  padding-left: 10px;
  border-right: 1px solid #2b2929;
}

.market-entruts .entruts-head .entruts-head-nav-small {
  padding: 0 10px;
  float: left;
  border-right: 1px solid #2b2929;
  cursor: pointer;
}

.market-entruts .entruts-head .entruts-head-nav-small:hover {
  color: #bababa;
}

.market-entruts .entruts-data {
  color: #bababa;
}

.market-entruts .entruts-data-head {
  height: 34px;
  line-height: 34px;
  border-top: 1px solid #2b2929;
  border-bottom: 1px solid #2b2929;
  color: #707070;
}

.market-entruts .entruts-data span {
  float: left;
}

.market-entruts .col-1 {
  width: 24%;
  padding-left: 10px;
}

.market-entruts .col-2 {
  width: 8%;
}

.market-entruts .col-3 {
  width: 15%;
}

.market-entruts .entruts-data-data {
  width: 100%;
  height: 95px;
  overflow-y: auto;
}

.market-entruts .entruts-data-data article {
  height: 30px;
  line-height: 30px;
  transition: all 0.3s;
}

.market-entruts .entruts-data-data article:hover {
  background: #4d4d4d;
}

.market-entruts .entruts-cancel {
  color: #1685c9;
  cursor: pointer;
  transition: all 0.3s;
}

.market-entruts .entruts-cancel:hover {
  color: #bababa;
}

.market-trade {
  width: 505px;
  height: 288px;
  float: right;
  font-size: 14px;
  float: right;
}

.market-trade .trade-table {
  width: 252.5px;
  float: left;
}

.market-trade .trade-table.left {
  padding-left: 20px;
  padding-right: 10px;
}

.market-trade .trade-table.right {
  padding-left: 10px;
  padding-right: 20px;
}

.market-trade .trade-tr {
  margin-bottom: 5px;
  color: #707070;
  position: relative;
  height: 36px;
  line-height: 36px;
}

.market-trade .trade-tr input {
  background-color: #26272a;
  border: 1px solid #4d4d4d;
  outline: 0;
  padding: 0;
  height: 36px;
  color: #fff;
  width: 100%;
  padding-right: 10px;
  text-align: right;
  border-radius: 1px;
}

.market-trade .trade-tr input:hover,
.market-trade .trade-tr input:focus {
  border-color: #1685c9;
}

.market-trade .trade-tr button {
  width: 100%;
  height: 33px;
  line-height: 33px;
  border-radius: 2px;
  color: #fff;
  cursor: pointer;
  border: 0;
  outline: none;
  border-radius: 2px;
}

.market-trade .trade-tr button.buy {
  background: #da2e22;
}

.market-trade .trade-tr button.sell {
  background: #009900;
}

.market-trade .tr-tips {
  position: absolute;
  left: 10px;
  top: 0;
  font-weight: 400;
  cursor: text;
}

.market-trade .tr-right {
  position: absolute;
  right: 10px;
  top: 0;
}

.market-trade .tr-boder {
  border: 1px solid #4d4d4d;
}

.market-trade .tr-btn {
  padding: 14px 0;
  height: 64px;
}

.market-trade .tr-slider {
  height: 50px;
}

/***********jslider*************/

.buysellbar {
  height: 30px;
  padding-top: 10px;
  position: relative;
}

.buysellbar .buysellbar-box {
  position: relative;
}

.slider-points {
  width: 100%;
  position: absolute;
  top: 10px;
  left: 0;
}

.slider-points .proportioncircle {
  background: #cdcccc;
  width: 1px;
  height: 6px;
  position: absolute;
  top: 10px;
  margin-left: -1px;
  cursor: pointer;
  z-index: 100;
}

.slider-points .proportioncircle.proportion0 {
  margin-left: 0;
}

.slider-points .proportioncircle.proportion1 {
  left: 25%;
}

.slider-points .proportioncircle.proportion2 {
  left: 50%;
}

.slider-points .proportioncircle.proportion3 {
  left: 75%;
}

.slider-points .proportioncircle.proportion4 {
  left: 100%;
}

.slider {
  height: 8px;
  width: auto;
  position: relative;
  background-color: #26272a;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #4d4d4d;
  z-index: 100;
}

.slider .complete {
  height: 100%;
  width: auto;
  background-color: #da2e22;
  z-index: 2;
  border-radius: 15px;
  position: absolute;
  top: 0px;
  height: 6px;
  left: 0;
}

.buysellbar .marker {
  height: 6px;
  width: 0px;
  position: absolute;
  top: 1px;
  left: 0;
  z-index: 100;
  border-radius: 6px;
  cursor: -webkit-grab;
}

.buysellbar .circle {
  height: 17px;
  width: 10px;
  background-color: #26272a;
  border: 1px solid #4d4d4d;
  z-index: 3;
  cursor: pointer;
  position: absolute;
  top: -6px;
  left: 0;
  margin-left: -5px;
}

.slider .sell-marker {
  background-color: #009900;
}

.slider .sell-complete {
  background-color: #009900;
}

.nb_green {
  color: #75d75c;
}

.nb_red {
  color: #dd5d36;
}

.market-depth-price div.depth-price2 {
  width: 33.3%;
  float: left;
  padding-left: 5px;
  white-space: nowrap;
  background: #26272a;
  height: 30px;
  line-height: 30px;
}

.market-depth-price div.depth-price2.right {
  padding-right: 0;
  text-align: center;
}
</style>
