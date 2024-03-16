"use strict";

let basket = [];

if (JSON.parse(localStorage.getItem("basket")) == null) {
    localStorage.setItem("basket", JSON.stringify(basket));

} else {

    basket = JSON.parse(localStorage.getItem("basket"));
}

function checkCartForShowDatas(basket) {
    let cartAlert = document.querySelector(".cart-alert");
    let cartTable = document.querySelector(".cart-table");
    if (basket.length == 0) {
        cartAlert.classList.remove("d-none");
        cartTable.classList.add("d-none");

    } else {
        cartAlert.classList.add("d-none");
        cartTable.classList.remove("d-none");
    }
}

checkCartForShowDatas(basket);

getBasketCount(basket);

function getBasketCount(arr) {
    let basketCount = 0;
    if (arr.length != 0) {
        for (const item of arr) {
            basketCount += item.count;
        }
    }
    document.querySelector(".navigation .basket-count").innerText = basketCount;
}


function getBasketDatas() {
    let tableBody = document.querySelector("tbody");

    let datas = "";
    basket.forEach(product => {

        datas += `<tr>
        <td> <img src="${product.image}" style="width: 100px; height: 100px;" alt=""></td>
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td><button class="btn-left" data-id=${product.id}><i class="fa-solid fa-chevron-left"></i></button>${product.count} <button class=" btn-right" data-id=${product.id}><i class="fa-solid fa-chevron-right"></i></button></td>
        <td>${product.price} ₼</td>
        <td>${product.price * product.count} ₼</td>
        <td><i class="fa-solid fa-circle-xmark delete-icon" data-id=${product.id}></i></td>
        </tr>`
    });

    tableBody.innerHTML = datas;
}

getBasketDatas();

function getGrandTotal(datas) {
    let grandTotal = 0;
    basket.forEach(data => {
        grandTotal += (data.price * data.count);
    });

    document.querySelector(".total span").innerText = grandTotal;
}


getGrandTotal(basket);


let deleteIcons = document.querySelectorAll(".delete-icon");
deleteIcons.forEach(icon => {
    icon.addEventListener("click", function () {
        basket = basket.filter(m => m.id != parseInt(this.getAttribute("data-id")));
        localStorage.setItem("basket", JSON.stringify(basket));
        this.parentNode.parentNode.remove();
        getGrandTotal(basket);
        checkCartForShowDatas(basket);
        getBasketCount(basket);
    })
});





function countProduct() {

    let rightBtns = document.querySelectorAll(".btn-right");
    let leftBtns = document.querySelectorAll(".btn-left");

    rightBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            let productId = parseInt(this.getAttribute("data-id"));
            let product = basket.find(item => item.id === productId);
            product.count++;
            getBasketCount(basket);
            getGrandTotal(basket);
            getBasketDatas(basket);
            localStorage.setItem("basket", JSON.stringify(basket))
        });
    });

    leftBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            let productId = parseInt(this.getAttribute("data-id"));
            let product = basket.find(item => item.id === productId);
            product.count--;
            if (product.count === 0) {
                basket = basket.filter(item => item.id !== productId);
                this.parentNode.parentNode.remove();
            }
            getBasketCount(basket);
            getGrandTotal(basket);
            getBasketDatas(basket);
            localStorage.setItem("basket", JSON.stringify(basket));
        });
    });

}
countProduct();


