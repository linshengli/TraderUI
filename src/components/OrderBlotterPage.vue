<template>
<div>
    <Navbar></Navbar>
    <el-table
        :data="tableData"
        style="width: 100%"
        height="480"
        border
    >
        <el-table-column
            fixed
            prop="tradeID"
            label="TradeID"
            width="150"
        >
            </el-table-column>
            <el-table-column
                prop="broker"
                label="Broker"
                width="120"
            >
                </el-table-column>
                <el-table-column
                    prop="product"
                    label="Product"
                    width="120"
                >
                    </el-table-column>
                    <el-table-column
                        prop="period"
                        label="Period"
                        width="120"
                    >
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            label="Price"
                            width="120"
                        >
                            </el-table-column>
                            <el-table-column
                                prop="count"
                                label="Quantity"
                                width="120"
                            >
                                </el-table-column>
                                <el-table-column
                                    prop="itrader"
                                    label="Initiator Trader"
                                    width="150"
                                >
                                    </el-table-column>
                                    <el-table-column
                                    prop="itradercom"
                                    width="150"
                                    label="Initiator Company"
                                >
                                    </el-table-column>
                                    <el-table-column
                                    prop="iside"
                                   width="150"
                                    label="Initiator Side"
                                >
                                    </el-table-column>
                                    <el-table-column
                                    prop="ftrader"
                                    width="150"
                                    label="Completion Trader"
                                >
                                    </el-table-column>
                                    <el-table-column
                                    prop="ftradercom"
                                    width="150"
                                    label="Completion Company"
                                >
                                    </el-table-column>
                                    <el-table-column
                                    prop="fside"
                                    width="150"
                                    label="Completion Side"
                                >
                                    </el-table-column>
                                    <el-table-column
                                        fixed="right"
                                        label=""
                                        width="150"
                                    >
                                        <template slot-scope="scope">
                                            <el-button
                                                type="text"
                                                size="small"
                                            >
                                                
                                                </el-button>
                                        </template>
                                        </el-table-column>
                                        </el-table>
                                        <el-pagination
                                        layout="prev, pager, next"
                                        :total="1000"
                                        :page-size=10
                                        background
                                    >
                                        </el-pagination>
</div>
</template>
<script>
import Navbar from "./navbar";
import {post_large_order} from '../api/api';
export default {
  components: {
    Navbar
  },
  name: "OrderBlotterPage",
  methods: {
      deleteRow(index, rows) {
        let params = {};
        post_large_order(0,params)
        .then(data => {
            this.$message.success("取消成功！");
        })
        .catch(err => console.log(err))
        rows.splice(index, 1);
      }
    },
  data() {
    return {
      OrderBlotter: [],
      tableData: [
        {
          tradeID: 1,
          product: "Gold Swaps", //product name
          period: "SEP16", //order 季节 比如 Sep 16 （9月16号）
          count: 54, // 数量
          broker: "M",
          price: 28.7, //价格
          iside: "B", //买还是卖
          itrader: "Sam Wang", //trader
          itradercom: "ABC Corp", //morgan
          fside: "S", //买还是卖
          ftrader: "Sixian Liu", //trader
          ftradercom: "MS" //morgan
        },
        {
          tradeID: 5,
          product: "Gold Swaps", //product name
          period: "SEP16", //order 季节 比如 Sep 16 （9月16号）
          count: 54, // 数量
          broker: "M",
          price: 28.7, //价格
          iside: "B", //买还是卖
          itrader: "Sam Wang", //trader
          itradercom: "ABC Corp", //morgan
          fside: "S", //买还是卖
          ftrader: "Sixian Liu", //trader
          ftradercom: "MS" //morgan
        },
        {
          tradeID: 8,
          product: "Gold Swaps", //product name
          period: "SEP16", //order 季节 比如 Sep 16 （9月16号）
          count: 54, // 数量
          broker: "M",
          price: 28.7, //价格
          iside: "B", //买还是卖
          itrader: "Sam Wang", //trader
          itradercom: "ABC Corp", //morgan
          fside: "S", //买还是卖
          ftrader: "Sixian Liu", //trader
          ftradercom: "MS" //morgan
        },
        {
          product: "Gold Swaps", //product name
          period: "SEP16", //order 季节 比如 Sep 16 （9月16号）
          count: 54, // 数量
          broker: "M",
          price: 28.7, //价格
          iside: "B", //买还是卖
          itrader: "Sam Wang", //trader
          itradercom: "ABC Corp", //morgan
          fside: "S", //买还是卖
          ftrader: "Sixian Liu", //trader
          ftradercom: "MS" //morgan
        },
        {
          tradeID: 9,
          product: "Gold Swaps", //product name
          period: "SEP16", //order 季节 比如 Sep 16 （9月16号）
          count: 54, // 数量
          broker: "M",
          price: 28.7, //价格
          iside: "B", //买还是卖
          itrader: "Sam Wang", //trader
          itradercom: "ABC Corp", //morgan
          fside: "S", //买还是卖
          ftrader: "Sixian Liu", //trader
          ftradercom: "MS" //morgan
        },
        {
          product: "Gold Swaps", //product name
          period: "SEP16", //order 季节 比如 Sep 16 （9月16号）
          count: 54, // 数量
          broker: "M",
          price: 28.7, //价格
          iside: "B", //买还是卖
          itrader: "Sam Wang", //trader
          itradercom: "ABC Corp", //morgan
          fside: "S", //买还是卖
          ftrader: "Sixian Liu", //trader
          ftradercom: "MS" //morgan
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>
