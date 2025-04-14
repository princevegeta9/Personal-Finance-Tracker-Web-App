let transactions = [
];

let btn = document.querySelector(".btn");

btn.addEventListener("click",(e)=>{
    e.preventDefault();
    let inpt = document.querySelector("#title");
    let inpa = document.querySelector("#amount");
    let inpd = document.querySelector("#date");
    
    let obj = {
        title: inpt.value,
        amount: inpa.value,
        date: inpd.value,
        id:`#${transactions.length}`
    }

    transactions.push(obj);

    renderTransaction(obj);
    update();

    inpt.value = "";
    inpa.value = "";
    inpd.value = "";
});


function renderTransaction(obj) {
    let list = document.querySelector("#transaction");
    let li = document.createElement("li");
    li.innerHTML = `<strong>${obj.title} | ₹${obj.amount} |  ${obj.date}</strong> 
    <button onclick="deleteTransaction('${obj.id}')">❌</button>`;
    
    li.classList.add(parseFloat(obj.amount) >= 0 ? 'income' : 'expense');
    li.classList.add("l");
    list.appendChild(li);
}

function deleteTransaction(id) {
    transactions = transactions.filter((t)=>t.id !== id);
    
    let list = document.querySelector("#transaction");
    list.innerHTML = "";
    transactions.forEach(renderTransaction);
};

function update(){
    let tlex = 0;
    let tinc = 0;

    transactions.forEach((transaction)=>{
        let amount = parseFloat(transaction.amount);

        if(amount > 0){
            tinc += amount;
        }
        else{
            tlex += amount;
        }
    });
    let netBalance = tinc + tlex;

    let ex = document.querySelector("#expens");
    let inc = document.querySelector("#income");
    let ba = document.querySelector("#balance");

    ex.textContent =  tlex.toFixed(2);
    inc.textContent = tinc.toFixed(2);
    ba.textContent =  netBalance.toFixed(2);
}
let reset = document.querySelector("#btn");

reset.addEventListener("click",()=>{
    transactions = [];

    document.querySelector("#transactions").innerHTML = "";

    let ex = document.querySelector("#expens");
    let inc = document.querySelector("#income");
    let ba = document.querySelector("#balance");

    ex.textContent =  0;
    inc.textContent = 0;
    ba.textContent =  0;
});

