const btnAddTransaction = document.querySelector('.btn-add-transaction');
const btnDeleteTransaction = document.querySelector('.btn-delete');
const btnAddModal = document.querySelector('.btn add');
const btnCancel = document.querySelector('.btn cancel');
const modal = document.querySelector('.modal');
const modalBox = document.querySelector('.modal-box');


btnAddTransaction.addEventListener('click', () => {
    modal.classList.add('active');
    modalBox.classList.add('active');
});

btnCancel.addEventListener('click', () => {
    modal.classList.remove('active');
    modalBox.classList.remove('active');
});