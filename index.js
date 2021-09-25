// Função de abrir e fechar Modal.
const Modal = {
    open(){
        document.querySelector('.modal').classList.add('active')

    },
    close(){
        document.querySelector('.modal').classList.remove('active')
    }
}

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("my.finances:transactions")) || [];
    },

    set(transactions) {
        localStorage.setItem("my.finances:transactions", JSON.stringify(transactions));
    }
}

const Transaction = {
    all: Storage.get(),

    add(transaction) {
        Transaction.all.push(transaction);
        app.reload();
    },

    remove(index) {
        Transaction.all.splice(index, 1);

        app.reload();
    },

    incomes() {
        let income = 0;
        Transaction.all.forEach((transaction) => {
            if (transaction.amount > 0) {
                income += transaction.amount;
            }
        });

        return income;
    },
    
    expenses() {    
        let expense = 0;

        Transaction.all.forEach((transaction) => {
            if (transaction.amount < 0) {
                expense += transaction.amount;
            }
        });

        return expense;
    },
    
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
        tr.dataset.index = index;
        DOM.transactionsContainer.appendChild(tr);
    },

    innerHTMLTransaction(transaction, index) {
        const addClassCss = transaction.amount > 0 ? "income" : "expense";
        const amount = utils.formatCurrency(transaction.amount);

        const html = `
            <td class="description">${transaction.description}</td>
            <td class=${addClassCss}>${amount}</td>
            <td class="date">${transaction.date}</td>
            <td class="btn-delete">
                <img onclick="Transaction.remove(${index})" src="/images/delete.svg" alt="Botão de deletar uma transação"> 
            </td>
        `
        return html;
    },

    updateBalance() {
        document.querySelector('#incomeDisplay').innerHTML = utils.formatCurrency(Transaction.incomes()); 
        document.querySelector('#expenseDisplay').innerHTML = utils.formatCurrency(Transaction.expenses()); 
        document.querySelector('#totalDisplay').innerHTML = utils.formatCurrency(Transaction.total()); 
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = "";
    }
} 

const utils = {
    formatDate(date) {
        const splittedDate = date.split("/")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatAmount(value) {
        value = Number(value) * 100;
        return value;
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "";
        value = String(value).replace(/\D/g, "");
        value = Number(value) / 100;
        value = value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});

        return signal + value;
    }   
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.amount.value,
        }
    },

    validateFields() {
        const { description, amount, date } = Form.getValues();

        if (description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Por favor preencha todos os campos");
        }
    },

    formatValues() {
        let { description, amount, date } = Form.getValues();

        amount = utils.formatAmount(amount);
        date = utils.formatDate(date);

        return {
            description,
            amount,
            date
        }
    },

    clearFields() {
        Form.description.value = "";
        Form.amount.value = "";
        Form.date.value = "";

    },

    submit(event) {
        event.preventDefault();

        try {
            Form.validateFields();
            const transaction = Form.formatValues();
            Transaction.add(transaction)
            Form.clearFields();
            Modal.close();

        } catch (error) {
            alert (error.message);
        }
        
    } 
        
}

const app = {
    init() {
        Transaction.all.forEach(DOM.addTransaction);
        DOM.updateBalance();
        Storage.set(Transaction.all);
    },

    reload() {
        DOM.clearTransactions();
        app.init();
    }
}

app.init();
