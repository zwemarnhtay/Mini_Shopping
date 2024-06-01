console.log("hello from Linux!");

$(document).ready(function(){
    createProduct("Banana", 20, 1000);
    createProduct("Mango", 15, 1500);

    loadProductTable();
})

let list = [];
let cart = [];

function loadProductTable(){
    let table = `<table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Price Per One</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                <tbody>`;
                list.forEach(product => {
                    table += `<tr>
                                <th scope="row">1</th>
                                <td>${product.Name}</td>
                                <td>${product.Qty}</td>
                                <td>${product.Price}</td>
                                <td>
                                    <button type="button" class="btn btn-outline-warning" onclick="addCart('${product.Id}')"> + </button>
                                </td>
                            </tr>`;
                });
        table += `</tbody>
        </table>`;

        $('#productTable').html(table);
}

function createProduct(name, qty, price){
    let product = {
        Id : uuidv4(),
        Name : name,
        Qty : qty,
        Price : price
    }
    list.push(product);
}

function addCart(id){
    let product = list.find(x => x.Id == id);
    console.log(product);

    let isExist = cart.find(x => x.Id == product.Id);
    
    let count = 1;
    if(isExist){
        console.log(isExist);
        isExist.Qty += count;
        isExist.Price *= isExist.Qty;


        if(product.Qty < isExist.Qty){
            alert("no enought product");
            return;
        }

        let cartTable = `<div class="row justify-content-evenly"> 
                            <div class="col">${isExist.Name} </div>
                            <div class="col qty">${isExist.Qty} </div>
                            <div class="col">
                                <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeCart('${product.Id}')"> - </button>
                            </div>
                        </div>`;

        $(`#${product.Id}`).html(cartTable);
    }else {
        let newCart = {
            Id : product.Id,
            Name : product.Name,
            Qty : count,
            Price : product.Price,
        };
        cart.push(newCart);
        
        let cartTable = `<li id="${product.Id}" class="list-group-item">
                            <div class="row justify-content-evenly"> 
                                <div class="col">${product.Name} </div>
                                <div class="col qty">${count} </div>
                                <div class="col">
                                    <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeCart('${product.Id}')"> - </button>
                                </div>
                            </div>
                        </li>`;

        $('#cartList').append(cartTable);
    }

    totalAmount();
    console.log(cart);
}

function totalAmount(){
    let total = 0;
    cart.forEach(x => {
        total += x.Price;
    })
    let display = `<div class="p-2 text-end">  total amount : ${total} </div>`;

    $('#totalAmount').html(display);
}

function removeCart(id){
    let pricePerOne = list.find(x => x.Id == id);
    pricePerOne = pricePerOne.Price;

    let product = cart.find(x => x.Id == id);
    product.Qty -= 1;
    product.Price = pricePerOne * product.Qty;

    if(product.Qty < 1){
        $(`#${id}`).html('');
    } else{
        $(`#${id} .qty`).text(product.Qty);
    }

    totalAmount();
}

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}