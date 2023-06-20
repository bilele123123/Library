const bookList = document.querySelector(".book-list");
const addBookForm = document.getElementById("add-book-form");
const addBookBTN = document.querySelector(".content-addBTN");
const bookPopup = document.querySelector(".book-popup");

addBookForm.addEventListener("submit", addBookToLibrary);

addBookBTN.addEventListener("click", () => {
    bookPopup.style.display = "block";
});

bookPopup.addEventListener("click", (event) => {
    if (event.target === bookPopup) {
        bookPopup.style.display = "none";
    }
});

let myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function addBookToLibrary(event) {
    event.preventDefault();

    const titleInput = document.getElementById("titleInput");
    const authorInput = document.getElementById("authorInput");
    const pageInput = document.getElementById("pageInput");
    const readInput = document.getElementById("readInput");

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pageInput.value;
    const hasRead = readInput.checked;

    const newBook = new Book(title, author, pages, hasRead);
    myLibrary.push(newBook);

    titleInput.value = "";
    authorInput.value = "";
    pageInput.value = "";
    readInput.checked = false;

    bookPopup.style.display = "none";

    displayBook();
}

function displayBook() {
    bookList.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const bookInfo = document.createElement("div");
        bookInfo.classList.add("book-info");

        const bookTitle = document.createElement("p");
        bookTitle.classList.add("book-title");
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement("p");
        bookAuthor.classList.add("book-author")
        bookAuthor.textContent = book.author;

        const bookPages = document.createElement("p");
        bookAuthor.classList.add("book-pages")
        bookPages.textContent = book.pages;

        const statusBTN = document.createElement("button");
        statusBTN.textContent = book.hasRead ? "Complete" : "Incomplete";
        statusBTN.classList.add("status-button");
        statusBTN.classList.add(book.hasRead ? "complete" : "incomplete");
        statusBTN.addEventListener("click", () => toggleReadStatus(index));
            
        const removeBTN = document.createElement("button");
        removeBTN.textContent = "Remove";
        removeBTN.classList.add("remove-bookBTN");
        removeBTN.addEventListener("click", () => removeBook(index));

        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookPages);
        bookInfo.appendChild(statusBTN);
        bookInfo.appendChild(removeBTN);
        bookList.appendChild(bookInfo);
    });
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBook();
}

function toggleReadStatus(index) {
    myLibrary[index].hasRead = !myLibrary[index].hasRead;
    displayBook();
    const statusBTN = document.querySelectorAll(".status-button");
    statusBTN[index].textContent = myLibrary[index].hasRead ? "Complete" : "Incomplete";
    statusBTN[index].style.backgroundColor = myLibrary[index].hasRead ? "lightgreen" : "lightcoral";
  }
  