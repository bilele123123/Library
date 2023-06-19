const libraryContent = document.querySelector(".library-content");
const addBook = document.getElementById("add-book");
const addBookBTN = document.querySelector(".content-addBTN");
const bookPopup = document.querySelector(".bookPopup");

addBook.addEventListener("submit", addBookToLibrary);

addBookBTN.addEventListener("click", () => {
    bookPopup.style.display = "block";
});

bookPopup.addEventListener("click", (event) => {
    if (event.target === bookPopup) {
        bookPopup.style.display = "none";
    }
})

let myLibrary = [];

function Book() {

}

function addBookToLibrary() {
    event.preventDefault();

    const title = prompt("Title:");
    const author = prompt("Author:");
    const pages = prompt("Pages:");
    const hasRead = confirm("Completed Reading?");

    const newBook = new Book(title, author, pages, hasRead);
    myLibrary.push(newBook);

    document.getElementById("add-book").reset();
    displayBook();
}

function displayBook() {
    libraryContent.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const bookInfo = document.createElement("div");
        bookInfo.classList.add("book-info");

        const bookTitle = document.createElement("h2");
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement("p");
        bookAuthor.textContent = book.author;

        const bookPages = document.createElement("p");
        bookPages.textContent = book.pages;

        const bookStatus = document.createElement("p");
        bookStatus.textContent = `${book.hasRead ? "Completed" : "Incomplete"}`

        const removeBTN = document.createElement("button");
        removeBTN.textContent = "Remove";
        removeBTN.addEventListener("click", () => removeBook(index));

        const statusBTN = document.createElement("button");
        statusBTN.textContent = "Have you read it?";
        statusBTN.addEventListener("click", () => toggleReadStatus(index));

        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookPages);
        bookInfo.appendChild(bookStatus);
        bookInfo.appendChild(removeBTN);
        bookInfo.appendChild(statusBTN);
    
        libraryContent.appendChild(bookInfo);
    })
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBook();
}

function toggleReadStatus(index) {
    myLibrary[index].hasRead = !myLibrary[index].hasRead;
    displayBook();
}