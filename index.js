const btnAddTransaction = document.querySelector('.btn-add-transaction');
const btnDeleteTransaction = document.querySelector('.btn-delete');

const btnAddModal = document.querySelector('.btn-add');
const btnCancel = document.querySelector('.btn-cancel');
const btnCloseModal = document.querySelector('.close-modal');



const toggleModal = (event) => {
    const modal = document.querySelector('.modal');

    event.preventDefault();
    modal.classList.toggle('active');
}


const values = {
    incomes() {
        let income = 0;
        transactions.forEach((transaction) => {
            if (transaction.amount > 0) {
                income += transaction.amount;
            }
        });

        return income;
    },
    
    expenses() {    
        let expense = 0;

        transactions.forEach((transaction) => {
            if (transaction.amount < 0) {
                expense += transaction.amount;
            }
        });

        return expense;
    },
    
    total() {
        return values.incomes() + values.expenses();
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021'
    },

    {
        id: 2,
        description: 'Website',
        amount: 20000,
        date: '23/01/2021'
    },

    {
        id: 3,
        description: 'Aluguel',
        amount: -50000,
        date: '23/01/2021'
    },
];

const table = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = table.innerHTMLTransaction(transaction);
        table.transactionsContainer.appendChild(tr);
    },

    innerHTMLTransaction(transaction) {
        const addClassCss = transaction.amount > 0 ? "income" : "expense";
        const amount = utils.formatCurrency(transaction.amount);

        const html = `
            <td class="description">${transaction.description}</td>
            <td class=${addClassCss}>${amount}</td>
            <td class="date">${transaction.date}
            <button type="button"  class="btn-delete">
                <img src="/images/delete.svg" alt="Botão de deletar uma transação">
            </button>   
            </td>
        `

        return html;
    },

    updateBalance() {
        const incomeDisplay = document.querySelector('#incomeDisplay');
        const expenseDisplay = document.querySelector('#expenseDisplay');
        const totalDisplay = document.querySelector('#totalDisplay');
        
        incomeDisplay.innerHTML = utils.formatCurrency(values.incomes()); 
        expenseDisplay.innerHTML = utils.formatCurrency(values.expenses()); 
        totalDisplay.innerHTML = utils.formatCurrency(values.total()); 
    }
} 

const utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "";
        value = String(value).replace(/\D/g, "");
        value = Number(value) / 100;
        value = value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});

        return signal + value;
    }   
}

transactions.forEach((transaction) => {
    table.addTransaction(transaction);
});

table.updateBalance();



btnAddTransaction.addEventListener('click', toggleModal);
btnCancel.addEventListener('click', toggleModal);
btnCloseModal.addEventListener('click', toggleModal);
