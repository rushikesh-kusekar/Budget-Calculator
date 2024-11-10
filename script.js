let totalAmount = document.getElementById("total-amount");
let userAmount =document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");

let tempAmount = 0;

//set budget

totalAmountButton.addEventListener("click",() =>{

    tempAmount = totalAmount.value;
    
    //empty or negative error

    if(tempAmount === " " || tempAmount < 0){
        errorMessage.classList.remove("hide");
       
    }else{
       
        errorMessage.classList.add("hide");

        //set budget
        amount.innerHTML = tempAmount;

        //set balance
        balanceValue.innerText = tempAmount - expenditureValue.innerText;
        
        //clear input box
        totalAmount.value = "" ;
        
    }
});

//function to disable edit and delete button


const disableButtons = (bool) =>{
    let editButtons = document.getElementsByClassName("edit");

    Array.from(editButtons).forEach((element) => {
        element.disabled = bool ;
    });
};

//function to modify list elements

const modifyElements = (element,edit = false) =>{
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue .innerText ;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;

    if(edit){
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }

    balanceValue.innerText =parseInt(currentBalance) +  parseInt(parentAmount);
    expenditureValue.innerText =parseInt(currentExpense)-parseInt(parentAmount);

    parentDiv.remove();
}

//function to create list

const listCreater = (expenseName, expenseValue) => {
    let sublistContent =document.getElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");

    list.appendChild(sublistContent);
    sublistContent.innerHTML =`<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("./png/edit.png");
    editButton.style.height = "24px";

    editButton.addEventListener("click", () =>{
        modifyElements(editButton,true);

    });

    let deleteButton = document.createElement ("button");

    deleteButton.classList.add("./png/bin.png");
    deleteButton.style.height = "24px";

    deleteButton.addEventListener("click" ,() =>{
        modifyElements(deleteButton);
    });

    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);

}