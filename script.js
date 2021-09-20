let curBudget = 0;
let listOfExpense = [];
let expense = 0;

const deleteButtonPrefix = `<td><button onclick="deleteExpense(this.id)" id="`;
const deleteButtonSuffix = `" class="btn btn-danger-outline">Delete</button></td></tr>`;

const editButtonPrefix = `<td><button onclick="editExpense(this.id)" id="`;
const editButtonSuffix = `" class="btn btn-danger-outline">Edit</button></td>`;

function updateBalance() {
    document.getElementById('balanceValue').textContent = curBudget - expense;
}

function updateExpenses() {
    document.getElementById('expenseValue').textContent = expense;
}

function calculateBudget() {
    const budgetValue = document.getElementById('budgetInput');

    if (budgetValue.value !== '') {
        curBudget += (Number)(budgetValue.value);
        document.getElementById('budgetValue').textContent = curBudget;
    }
    updateBalance();
}

function printList() {
    let curData = '';
    listOfExpense.forEach(ele => {
        curData += `<tr><th scope="row">`;
        curData += ele.id;
        curData += `</th><td>`;
        curData += ele.expenseValue;
        curData += `</td><td>`;
        curData += ele.expenseAmount;
        curData += `</td>`; 
        curData += deleteButtonPrefix; 
        curData += ele.id;
        curData += deleteButtonSuffix;
    });
    document.getElementsByTagName('tbody')[0].innerHTML = curData;
}

function calculateExpense() {
    const expenseValue = document.getElementById('expenseInput').value || 0;
    const expenseAmount = document.getElementById('expenseAmountInput').value;

    expense += (Number)(expenseAmount);
    listOfExpense.push({
        id: (listOfExpense.length + 1),
        expenseValue: expenseValue,
        expenseAmount: expenseAmount
    });

    printList();

    updateBalance();
    updateExpenses();
}

function deleteExpense(currentId) {
    if(currentId === '')return;

    let id = (Number)(currentId);

    expense -= listOfExpense[id - 1].expenseAmount;
    listOfExpense.splice(id - 1, 1);
    let cur = 1;
    listOfExpense.forEach(ele => ele.id = cur++);

    printList();
    updateBalance();
    updateExpenses();
}
