<template>
<div>
    <Navbar></Navbar>
    <el-table
        :data="historyOrder"
        style="width: 100%"
        height="480"
        border
    >
        <el-table-column
            fixed
            prop="id"
            label="TradeID"
            sortable
            width="150"
        >
            </el-table-column>
            <el-table-column
                prop="time"
                type="date"
                label="Start Time"
                sortable
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
                                sortable
                                width="120"
                            >
                                </el-table-column>
                                <el-table-column
                                    prop="count"
                                    label="Quantity"
                                    sortable
                                    width="120"
                                >
                                    </el-table-column>
                                    <el-table-column
                                        prop="status"
                                        label="Completed"
                                        sortable
                                        width="120"
                                    >
                                        <template slot-scope="scope">
                                            <span style="margin-left: 10px">{{ statusToWord[scope.row.status] }}</span>
                                        </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="type"
                                            label="order type"
                                            sortable
                                            width="120"
                                        >
                                            <template slot-scope="scope">
                                                <span style="margin-left: 10px">{{ orderType[scope.row.type] }}</span>
                                            </template>
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
                                                        width="90"
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
                                                                    width="90"
                                                                    label="Completion Side"
                                                                >
                                                                    </el-table-column>
                                                                    <el-table-column
                                                                        fixed="right"
                                                                        label="操作"
                                                                        width="120"
                                                                    >
                                                                        <template slot-scope="scope">
                                                                            <el-button
                                                                                type="text"
                                                                                size="small"
                                                                                @click.prevent="cancelOrder(scope.row.id)"
                                                                                :disabled="enadleCancel(scope.row.status)"
                                                                            >
                                                                            <!-- Cancel Order -->
                                                                                {{ cancelText(scope.row.status) }}
                                                                                </el-button>
                                                                        </template>
                                                                        </el-table-column>
                                                                        </el-table>

                                                                        <el-pagination
                                                                            layout="prev, pager, next"
                                                                            :total="historyOrder.length || 10"
                                                                            :page-size=10
                                                                            background
                                                                            @current-change="handleCurrentChange" 
                                                                        >
                                                                            </el-pagination>

</div>
</template>

<script>
import Navbar from "./navbar";
import { get_historyOrders, api_cancelOrder } from "../api/api";
export default {
  components: {
    Navbar
  },
  name: "HistoryPage",
  computed: {},
  data() {
    return {
      currentPage: 0,
      statusToWord: ["pending", "completed", "canceled"],
      orderType: ["Market Order", "Limit Order", "Stop Order", "Cancel Order"],
      historyOrder: []
    };
  },
  methods: {
    cancelText(status) {
      if (status == 2) {
        return "Canceled";
      }
      return "Cancel Order";
    },
    cancelOrder(id) {
      let product = this.$route.params.company;
      api_cancelOrder(product, id)
        .then(data => {
          console.log("cancel success!");
          this.$router.go(0);
        })
        .catch(err => console.log(err));
      //   this.$router.go(0);
    },
    enadleCancel(status) {
      return status != 0;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      get_historyOrders(user.username, this.currentPage)
        .then(data => {
          this.historyOrder = data;
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user == undefined || user.username == undefined) {
      this.$message.error("Please login");
      return;
    }
    get_historyOrders(user.username, this.currentPage)
      .then(data => {
        this.historyOrder = data;
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
</style>
