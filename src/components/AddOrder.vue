<template>
<div class="addorderform">
    <h2>New Order</h2>
    <div class="container-fluid form-group">
        <el-form
            ref="form"
            :model="form"
            label-width="80px"
        >
            <el-form-item
                label-width="10px"
                class="text-center"
            >
                <el-col :span=3>
                    Broker:
                </el-col>
                <el-col :span=9>
                    <el-input v-model="form.broker"></el-input>
                </el-col>
                <el-col :span=3>
                    Type:
                </el-col>
                <el-col :span=9>
                    <el-select
                        v-model="form.type"
                        placeholder="Please choose order type"
                    >
                        <el-option
                            label="Market order"
                            value="0"
                            style="width: 100%;"
                        ></el-option>
                            <el-option
                                label="Limit Order"
                                value="1"
                            ></el-option>

                                <el-option
                                    label="Stop Order"
                                    value="2"
                                ></el-option>
                                    </el-select>
                </el-col>
                </el-form-item>
                <el-form-item
                    label-width="10px"
                    class="text-center"
                >
                    <el-col :span=3>
                        Count:
                    </el-col>
                    <el-col :span=9>
                        <el-input-number v-model="form.count"></el-input-number>
                    </el-col>
                    <el-col :span=3>
                        Buy/Sell:
                    </el-col>
                    <el-col :span=9>
                        <el-select
                            v-model="form.iside"
                            placeholder="Please choose buy or sell"
                        >
                            <el-option
                                label="Buy"
                                value="B"
                            ></el-option>
                                <el-option
                                    label="Sell"
                                    value="S"
                                ></el-option>
                                    </el-select>
                    </el-col>
                    </el-form-item>
                    <el-form-item
                        label-width="10px"
                        class="text-center"
                    >
                        <el-col :span=3>
                            Period:
                        </el-col>
                        <el-col :span=21>
                            <el-date-picker
                                type="date"
                                placeholder="Choose Period"
                                v-model="form.period"
                                style="width: 100%;"
                                :picker-options="pickerOptions1"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-col>
                        </el-form-item>
                        <el-form-item
                            label-width="10px"
                            class="text-center"
                        >
                            <el-col :span=3>
                                Price:
                            </el-col>
                            <el-col :span=9>
                                <el-input
                                    :disabled="form.type == 0"
                                    v-model="form.price"
                                    type="number"
                                ></el-input>
                            </el-col>

                            <el-col :span=3>
                                isLarge:
                            </el-col>
                            <el-col :span=9>
                                <el-switch v-model="form.isLarge"></el-switch>
                            </el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    type="primary"
                                    @click="onSubmit"
                                >立即创建</el-button>
                                    <el-button>取消</el-button>
                            </el-form-item>
                            </el-form>
    </div>
</div>
</template>

<script>
import {
    post_large_order
} from "../api/api";
export default {
    name: "AddOrder",
    data() {
        // //init trader
        // @Column(name="itrader")
        // private String itrader;
        // @Column(name="itradercom")
        // private String itradercom;
        // @Column(name="iside")
        // private char iside;
        // //finish trader
        // @Column(name="ftrader")
        // private String ftrader;
        // @Column(name="ftradercom")
        // private String ftradercom;
        // @Column(name="fside")
        // private char fside;
        return {
            pickerOptions1: {
                disabledDate(time) {
                    // console.log(time)
                    return time.getTime() <= Date.now();
                }
            },
            defaultform: {
                product: "", //product name
                period: "", //order 季节 比如 Sep 16 （9月16号）
                count: 0, // 数量
                isLarge: false, // 是否是大订单
                price: 0, //价格
                status: 0,
                type: "",
                // — Market Order  0
                // – Limit Order   1
                // – Stop Order    2
                // – Cancel Order  3
                time: "",
                iside: "B", //买还是卖
                itrader: "", //trader
                itradercom: "", //morgan
                broker: ""
            },
            form: {
                product: "", //product name
                period: "", //order 季节 比如 Sep 16 （9月16号）
                count: 0, // 数量
                isLarge: false, // 是否是大订单
                price: 0, //价格
                status: 0,
                type: "",
                // — Market Order  0
                // – Limit Order   1
                // – Stop Order    2
                // – Cancel Order  3
                time: "",
                iside: "B", //买还是卖
                itrader: "", //trader
                itradercom: "", //morgan

                broker: ""
                // name: "",
                // region: "",
                // date1: "",
                // date2: "",
                // delivery: false,
                // type: [],
                // resource: "",
                // desc: ""
            }
        };
    },
    methods: {
        preProcess(params) {
            if (params.count <= 0) {
                return 0;
            }
            if (params.price <= 0) {
                return 1;
            }
            let user = JSON.parse(sessionStorage.getItem("user"));
            if (user == undefined) {
                return 3;
            }
            params.itrader = user.username || "nouserlogin";
            return 2;
        },
        onSubmit() {
            console.log("submit!");
            let params = {};
            let self = this;
            Object.assign(params, this.form);
            params.itradercom = this.$route.params.company;
            params.product = this.$route.params.product;
            // params.itrader = "testusername";
            let ret = this.preProcess(params);
            if (ret == 0) {
                this.$message.error(
                    "Count is equal or smaller than 0! Please input again!"
                );
                this.form.count = 0;
                return;
            } else if (ret == 1) {
                this.$message.error(
                    "Price is equal or smaller than 0! Please input again!"
                );
                this.form.price = 0;
                return;
            } else if (ret == 3) {
                this.$message.error("Please login");
                Object.assign(this.form, this.defaultform);
                return;
            } else if (ret == 2) {
                console.log(params);
                console.log(params.isLarge);
                let isLarge = params.isLarge ? 1 : 0;
                post_large_order(isLarge, params)
                    .then(data => {
                        console.log("submit order:");
                        console.log(data);
                        this.$message.success("submit success");
                        Object.assign(this.form, this.defaultform);
                    })
                    .catch(err => {
                        this.$message.error("submit error!");
                        console.log(err);
                    });
            }
        }
    }
};
</script>

<style scoped>
.addorderform {
    /* width: 500px; */
    float: right;
    border-color: black;
    border-width: 20px;
    background: #2b2929;
    color: aliceblue !important;
}

.el-col {
    color: aliceblue !important;
}

label {
    color: #ffffff !important;
}

h2 {
    margin: 20px;
    border-bottom: 1px solid #ffffff;
}
</style>
