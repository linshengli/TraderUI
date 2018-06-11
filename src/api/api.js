import axios from "axios";
import qs from "qs";
let host = "192.168.43.117";
let httpport = "8080";
let wsport = "8080";
let base = "http://" + host + ":" + httpport;
export const WEBSOCKETBASE = "ws://" + host + ":" + wsport + "/websocket2/";

//192.168.43.117
const errorProcess = (url, err) => {
  console.log("Error in " + url + err);
};

/**
 * Example:
 * post http://localhost:8080/login
 *
 *{
 *    username:root123
 *    password:mypassword
 *}
 */
export const api_login = params => {
  return axios
    .post(`${base}/login`, params, {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.data)
    .catch(err => errorProcess("login", err));
};

/**
 * Example:
 * get http://localhost:8080/getblotter?brokerCompany
 */

export const api_getBlotter = params => {
  return axios
    .get(`${base}/getblotter`, params)
    .then(res => res.data)
    .catch(err => errorProcess("getBlotter", err));
};

/**
 * Example:
 * get http://localhost:8080/orderBotter/{BrokerCompany}/{product}
 */
export const getOrderBlotters = (company, product, params) => {
  return axios
    .get(`${base}/orderBlotter/${company}/${product}`)
    .then(res => res.data)
    .catch(err => errorProcess("orderBotter", err));
};

/**
 * Example:
 * get http://localhost:8080/cancelOrder/{BrokerCompany}/{orderId}
 */
export const api_cancelOrder = (company, id, params) => {
  return axios
    .get(`${base}/cancelOrder/${company}/${id}`, params)
    .then(res => res.data)
    .catch(err => errorProcess("cancelOrder", err));
};

// /**
//  * Example:
//  * post http://localhost:8080/addOrder/{company}
//  */
// export const post_order = params => {
//   return axios
//     .post(`${base}/addOrder/${params.itradercom}`, params)
//     .then(res => res.data)
//     .catch(err => errorProcess("post_order", err));
// };

/**
 * Example:
 * post http://localhost:8080/addOrder/{company}/{isLarge}
 */
export const post_large_order = (isLarge, params) => {
  return axios
    .post(`${base}/addOrder/${params.itradercom}/${isLarge}`, params)
    .then(res => res.data)
    .catch(err => errorProcess("post_large_order", err));
};

/**
 * Example:
 * get http://localhost:8080/historyOrders/{username}/{page}
 */
export const get_historyOrders = (username, page, params) => {
  return axios
    .get(`${base}/historyOrders/${username}/${page}`, params)
    .then(res => res.data)
    .catch(err => errorProcess("get_historyOrders", err));
};

/**
 * Example:
 * get marketDepth every second.
 * get http://localhost:8080/orderBlotter/{BrokerCompany}/{product}
 *
 */
export const api_marketDepth_every_second = (company, product, params) => {
  return axios
    .get(`${base}/orderBlotter/${company}/${product}`)
    .then(res => res.data)
    .catch(err => errorProcess("api_marketDepth_every_second", err));
};

export const BROKERGATEWAYANDPRODUCT = [
  {
    company: "SHFE",
    product: "Gold Swaps"
  },
  {
    company: "SHFE",
    product: "Silver Swaps"
  },
  {
    company: "CDE",
    product: "Gold Swaps"
  },
  {
    company: "CDE",
    product: "Silver Swaps"
  }
];
