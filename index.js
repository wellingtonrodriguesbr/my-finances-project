const btnAddTransaction = document.querySelector('.btn-add-transaction');
const btnDeleteTransaction = document.querySelector('.btn-delete');
const btnAddModal = document.querySelector('.btn-add');
const btnCancel = document.querySelector('.btn-cancel');
const btnCloseModal = document.querySelector('.close-modal')
const modal = document.querySelector('.modal');

function handleCloseModal(event){
    if (event.target === this) {
        toggleModal(event);
    }
}

const removeTransaction = (event) => {
    event.preventDefault();
    document.querySelectorAll('tr').removeAttribute();
}

const toggleModal = (event) => {
    event.preventDefault();
    modal.classList.toggle('active');
}

const addTransaction = (event) => {
    event.preventDefault();
}

btnAddTransaction.addEventListener('click', toggleModal);
btnCancel.addEventListener('click', toggleModal);
btnCloseModal.addEventListener('click', toggleModal);
modal.addEventListener('click', handleCloseModal);
btnDeleteTransaction.addEventListener('click', removeTransaction);

