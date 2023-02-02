// Button functionality //

let deleteSentenceRunning = false;

const addBtn = document.querySelector(".add-btn");
const addBook = document.querySelector(".add-book");

addBtn.addEventListener("mouseenter", (e) => {
  if (deleteSentenceRunning) return;
  typeText();
});

addBtn.addEventListener("mouseleave", (e) => {
  if (deleteSentenceRunning) return;
  deleteText();
});

function typeText() {
  if (deleteSentenceRunning) return;
  addBook.textContent = "";
  const text = "Add a book";
  const letters = text.split("");
  let i = 0;
  const typeNextLetter = () => {
    addBook.textContent += letters[i];
    i++;
    if (i < letters.length) {
      setTimeout(typeNextLetter, 30);
    }
  };
  typeNextLetter();
}

function deleteText() {
  deleteSentenceRunning = true;
  const text = addBook.textContent;
  const letters = text.split("");
  const deleteNextLetter = () => {
    letters.pop();
    addBook.textContent = letters.join("");
    if (letters.length > 0) {
      setTimeout(deleteNextLetter, 10);
    } else {
      deleteSentenceRunning = false;
    }
  };
  deleteNextLetter();
}

// Book data structure //

const bookGrid = document.getElementById("bookGrid");

let myLibrary = [];

function Book(title = "Unknown", author = "Unknown", pages = 0, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  putBooksToGrid();
}

function putBooksToGrid() {
  bookGrid.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");
    bookGrid.appendChild(bookDiv);

    const titleP = document.createElement("p");
    titleP.textContent = "Title: " + myLibrary[i].title;
    bookDiv.appendChild(titleP);

    const authorP = document.createElement("p");
    authorP.textContent = "Author: " + myLibrary[i].author;
    bookDiv.appendChild(authorP);

    const pagesP = document.createElement("p");
    pagesP.textContent = "Pages: " + myLibrary[i].pages;
    bookDiv.appendChild(pagesP);

    const readP = document.createElement("p");
    readP.textContent = "Read: " + myLibrary[i].read;
    bookDiv.appendChild(readP);
  }
}
