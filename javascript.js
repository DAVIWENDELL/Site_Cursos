if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

var totalAmount = "0,00"

function ready() {
    const removeProductButtons = document.getElementsByClassName("btn btn-outline-danger border-dark btn-sm")
    for ( var i = 0; i < removeProductButtons.length; i++) {
        removeProductButtons[i].addEventListener("click", removeProduct)
    } 

    const quantityInputs = document.getElementsByClassName("form-control text-center border-dark")
    for (var i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener("change", checkIfInputIsNull)
    }
    const addToCartButtons = document.getElementsByClassName("btn btn-primary m-3 d-flex justify-content-center")
    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", addProductTonCart)
    }

    const purchaseButton = document.getElementsByClassName("btn btn-danger btn-lg")[0]
    purchaseButton.addEventListener("click", makePurchase)
}

function makePurchase() {
    if (totalAmount == "0,00") {
        alert("Seu carrinho está vazio!")
    } else {
        alert(
            `
            Obrigado pela sua compra!
            Valor do pedido : R$${totalAmount}
            Volte sempre :)

            `
            )
    }

    document.querySelector(".carrinho ul").innerHTML = ""
    updateTotal()
}

function checkIfInputIsNull(event) {
    console.log(event.target)
    if (event.target.value == "0") {
        event.target.parentElement.parentElement.parentElement.parentElement.remove()

    }
    
    
    
    updateTotal()
}

//CODIGO DE ADICIONAR O PRODUTO NO CARRINHO COM ERRO
/*function addProductTonCart(event) {
    const button = event.target
    const productInfos = button.parentElement
    const productImage = productInfos.getElementsByClassName("card-img-top") [0].src
    const productTitle = productInfos.getElementsByClassName("fst-italic") [0].innerText
    const productDesconto = productInfos.getElementsByClassName("text-secondary-") [0].innerText
    const productPreco = productInfos.getElementsByClassName("fst-italic-") [0].innerText.replace("Valor: R$ ", "por apenas R$")

    const productsCartName = document.getElementsByClassName("text-deciration-none text-danfer")
    for (var i = 0; i < productsCartName.length; i++) {
        if (productsCartName[i].innerText == productTitle) {
            productsCartName[i].parentElement.parentElement.getElementsByClassName("form-control text-center border-dark")[0].value++
            return
        }
    }

    let newCartProduct = document.createElement("li")
    newCartProduct.classList.add("list-group-item")

    newCartProduct.innerHTML = 
    `
    <div class="row g-3">
        <div class="col-4 col-md-3 col-lg-2">
            <a href="#">
                <img src="${productImage}" alt="${productTitle}" class="img-thumbnail">
            </a>
        </div>
        <div class="col-8 col-md-9 col-lg-7 col-xl-8 text-left align-self-center">
            <h4><b><a href="#" class="text-deciration-none text-danfer">${productTitle}
            </a></b></h4>
        </div>
            <div class="col-6 offset-6 col-sm-9 offset-sm-6 col-md-4 offset-md-8 col-lg-3 
            offset-lg-0 col-xl-2 align-self-center mt-3">
            <dvi class="input-group"> 
      
            <input type="number" class="form-control text-center border-dark" value="1">
  
            <button type="button" class="btn btn-outline-danger border-dark btn-sm">
                Remover
            </button>
        </dvi>
        <div class="text-right mt-2">
            <small class="text-secondary">${productDesconto}</small><br>
            <span class="text-dark">${productPreco}</span>
        </div>
        </div>
    </div>
    
    `
//ERRO AQUI
    //const tableBody = productInfos.getElementsByClassName("box")
    const tableBody = document.querySelector(".carrinho ul")
    tableBody.append(newCartProduct);
    
    updateTotal()
    newCartProduct.getElementsByClassName("form-control text-center border-dark")[0].addEventListener("change", checkIfInputIsNull)
    newCartProduct.getElementsByClassName("btn btn-outline-danger border-dark btn-sm")[0].addEventListener("click", removeProduct)
}*/

function removeProduct(event) {
    event.target.parentElement.parentElement.parentElement.parentElement.remove()
    updateTotal()
}

function updateTotal() {
    totalAmount = 0
    const cartProducts = document.getElementsByClassName("list-group-item py-3")
    for (var i = 0; i < cartProducts.length; i++) {
        const productPricer = cartProducts[i].getElementsByClassName("text-dark")[0].innerText.replace("por apenas R$ ", " ").replace(",", ".")
        const productQuantity = cartProducts[i].getElementsByClassName("form-control text-center border-dark")[0].value
    
        totalAmount += productPricer * productQuantity
    }
    totalAmount = totalAmount.toFixed(2)
    totalAmount = totalAmount.replace(".", ",")
    document.querySelector(".text-right h4").innerText = "Valor Total: R$" + totalAmount
}
