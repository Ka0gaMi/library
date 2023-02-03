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

    const img = document.createElement("img");
    img.src = "./Photos/book-open.svg";
    const readButtonSpan = document.createElement("span");

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("btn-div");
    const readButton = document.createElement("button");
    readButton.classList.add("btn");
    readButton.setAttribute("id", "read-btn");
    readButton.appendChild(img);
    readButton.appendChild(readButtonSpan);
    const removeButton = document.createElement("button");
    removeButton.classList.add("btn");
    removeButton.classList.add("btn-remove");
    removeButton.innerHTML = "<img src='./Photos/delete-empty.svg'>";

    buttonDiv.appendChild(readButton);
    buttonDiv.appendChild(removeButton);
    bookDiv.appendChild(buttonDiv);

    if (myLibrary[i].read === true) {
      readButton.classList.add("read");
    } else {
      readButton.classList.add("not-read");
    }

    // Adding read button toggling //

    readButton.addEventListener("click", () => {
      if (readButton.classList.contains("not-read")) {
        readButton.classList.replace("not-read", "read");
        readButtonSpan.textContent = "Read";
      } else {
        readButton.classList.replace("read", "not-read");
        readButtonSpan.textContent = "Not read";
      }
    });

    // Adding remove button functionality //

    removeButton.addEventListener("click", () => {
      openRemoveOverlay();

      const confirmButton = document.querySelector(".confirm-btn");
      const cancelButton = document.querySelector(".cancel-btn");

      confirmButton.addEventListener("click", (e) => {
        e.preventDefault();
        myLibrary.splice(i, 1);
        bookGrid.removeChild(bookDiv);
        closeRemoveOverlay();
      });

      cancelButton.addEventListener("click", (e) => {
        e.preventDefault();
        closeRemoveOverlay();
      });
    });

    // Adding typeText and deleteText functions //

    function typeTextSpan(sentence) {
      readButtonSpan.textContent = "";
      const text = sentence;
      const letters = text.split("");
      let i = 0;
      const typeNextLetter = () => {
        readButtonSpan.textContent += letters[i];
        i++;
        if (i < letters.length) {
          setTimeout(typeNextLetter, 30);
        }
      };
      typeNextLetter();
    }

    function deleteTextSpan() {
      const text = readButtonSpan.textContent;
      const letters = text.split("");
      const deleteNextLetter = () => {
        letters.pop();
        readButtonSpan.textContent = letters.join("");
        if (letters.length > 0) {
          setTimeout(deleteNextLetter, 10);
        } else {
          deleteSentenceRunning = false;
        }
      };
      deleteNextLetter();
    }

    // Adding read button text animation //

    readButton.addEventListener("mouseenter", (e) => {
      if (readButton.classList.contains("not-read")) {
        typeTextSpan("Not read");
      } else {
        typeTextSpan("Read", readButton);
      }
    });

    readButton.addEventListener("mouseleave", (e) => {
      deleteTextSpan();
    });
  }
}

// Form structure //

const addBookForm = document.querySelector(".add-book-form");
const addBookBtn = document.querySelector(".add-btn");
const overlay = document.querySelector(".overlay");

const openAddBookForm = () => {
  addBookForm.reset();
  overlay.classList.add("active");
};

const closeAddBookForm = (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("active");
  }
};

addBookBtn.onclick = openAddBookForm;
overlay.onclick = closeAddBookForm;

// Form functionality //

const getBookInput = () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("is-read").checked;
  return [title, author, pages, isRead];
};

const createBookCard = (e) => {
  e.preventDefault();
  const bookInfo = getBookInput();
  addBookToLibrary(...bookInfo);
  closeAddBookForm({ target: overlay });
};

addBookForm.addEventListener("submit", createBookCard);

// Adding remove overlay //

const removeOverlay = document.querySelector(".remove-overlay");

const closeRemoveOverlay = () => {
  removeOverlay.classList.remove("active");
};

const openRemoveOverlay = () => {
  removeOverlay.classList.add("active");
};
