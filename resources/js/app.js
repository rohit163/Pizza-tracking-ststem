import axios from "axios";

let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector("#cartCounter");

let updateCart = (pizza) => {
  axios.post("/update-cart", pizza).then((res) => {
    cartCounter.innerText = res.data.totalQty;
  });
};

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    let pizza = JSON.parse(btn.dataset.pizza);
    console.log(pizza);
    updateCart(pizza);
  });
});

// const alertMsg = document.querySelector("#success-alert");
// if (alertMsg) {
//   setTimeout(() => {
//     alertMsg.remove();
//   }, 1000);
// }

// //Change Order Status
// let statuses = document.querySelectorAll(".status_line");
// let hiddenInput = document.querySelector("#hiddenInput");
// let order = hiddenInput ? hiddenInput.value : null;
// order = JSON.parse(order);
// let time = document.createElement("small");

// function updateStatus(order) {
//   statuses.forEach((status) => {
//     status.classList.remove("step-completed");
//     status.classList.remove("current");
//   });
//   let stepCompleted = true;
//   statuses.forEach((status) => {
//     let dataProp = status.dataset.status;
//     if (stepCompleted) {
//       status.classList.add("step-completed");
//     }
//     if (dataProp === order.status) {
//       stepCompleted = false;
//       time.innerText = moment(order.updatedAt).format("hh:mm A");
//       status.appendChild(time);
//       if (status.nextElementSibling) {
//         status.nextElementSibling.classList.add("current");
//       }
//     }
//   });
// }

// updateStatus(order);

// let socket = io();

// if (order) {
//   socket.emit("join", `order_${order._id}`);
// }

// let adminAreaPath = window.location.pathname;

// if (adminAreaPath.includes("admin")) {
//   initAdmin(socket);
//   socket.emit("join", "adminRoom");
// }

// socket.on("orderUpdated", (data) => {
//   const updatedOrder = { ...order };
//   updatedOrder.updatedAt = moment().format();
//   updatedOrder.status = data.status;
//   updateStatus(updatedOrder);
//   new Noty({
//     progressBar: false,
//     timeout: 500,
//     text: "Order Updated",
//     type: "success",
//     layout: "topRight",
//   }).show();
// });
