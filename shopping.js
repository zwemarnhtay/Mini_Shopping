console.log("hello from Linux!");

$(document).ready(function(){
    loadProductTable();
})

function loadProductTable(){
    let table = `<table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Price</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                <tbody>`;
                
                table += `<tr>
                            <th scope="row">1</th>
                            <td>Banana</td>
                            <td>30</td>
                            <td>1200</td>
                            <td>
                                <button type="button" class="btn btn-outline-warning" onclick="addCart(${1})"> + </button>
                            </td>
                        </tr>`;
                table += `<tr>
                            <th scope="row">1</th>
                            <td>Banana</td>
                            <td>30</td>
                            <td>1200</td>
                            <td>
                                <button type="button" class="btn btn-outline-warning" onclick="addCart(${2})"> + </button>
                            </td>
                        </tr>`;
        table += `</tbody>
        </table>`;

        $('#productTable').html(table);
}

function addCart(id){
    console.log(id);
    let cart = `<li class="list-group-item">An item</li>`;

    $('#cartList').append(cart);
}