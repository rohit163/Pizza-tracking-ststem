import axios from 'axios';

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');



function updateCart(pizzaData) {
    // axios
    axios.post('/update-cart', pizzaData).then(res=>{
        console.log(res)
        cartCounter.innerText = res.data.totalQty
        
    })
}


addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
        console.log(pizza)
    })
});