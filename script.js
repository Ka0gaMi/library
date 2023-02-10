let myLibrary = [];

let currentEditingIndex = -1;

// Edit form functionality //

const getBookData = (index) => {
  let bookTitle = myLibrary[index].title;
  let bookAuthor = myLibrary[index].author;
  let bookPages = myLibrary[index].pages;
  return { bookTitle, bookAuthor, bookPages };
};

const putDataForEdit = (bookTitle, bookAuthor, bookPages) => {
  const titleInput = document.getElementById("book-title");
  const authorInput = document.getElementById("book-author");
  const pagesInput = document.getElementById("book-pages");

  titleInput.value = bookTitle;
  authorInput.value = bookAuthor;
  pagesInput.value = bookPages;
};

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

// Add book button animation //

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

class Book {
  constructor(title = "Unknown", author = "Unknown", pages = 0, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
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

    const readImg = document.createElement("img");
    readImg.src = "./Photos/book-open.svg";
    const readButtonSpan = document.createElement("span");

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("btn-div");

    const readButton = document.createElement("button");
    readButton.classList.add("btn");
    readButton.setAttribute("id", "read-btn");
    readButton.appendChild(readImg);
    readButton.appendChild(readButtonSpan);

    const removeEditDiv = document.createElement("div");
    removeEditDiv.classList.add("remove-edit-div");

    const removeButton = document.createElement("button");
    removeButton.classList.add("btn");
    removeButton.classList.add("btn-remove");
    removeButton.innerHTML = "<img src='./Photos/delete-empty.svg'>";

    const editImg = document.createElement("img");
    editImg.src = "./Photos/book-edit.svg";
    const editButtonSpan = document.createElement("span");

    const editButton = document.createElement("button");
    editButton.classList.add("btn");
    editButton.setAttribute("id", "edit-btn");
    editButton.appendChild(editImg);
    editButton.appendChild(editButtonSpan);

    buttonDiv.appendChild(readButton);
    buttonDiv.appendChild(removeEditDiv);
    removeEditDiv.appendChild(removeButton);
    removeEditDiv.appendChild(editButton);
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
        myLibrary[i].read = true;
      } else {
        readButton.classList.replace("read", "not-read");
        readButtonSpan.textContent = "Not read";
        myLibrary[i].read = false;
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

    function typeTextSpan(target, sentence) {
      target.textContent = "";
      const text = sentence;
      const letters = text.split("");
      let i = 0;
      const typeNextLetter = () => {
        target.textContent += letters[i];
        i++;
        if (i < letters.length) {
          setTimeout(typeNextLetter, 30);
        }
      };
      typeNextLetter();
    }

    function deleteTextSpan(target) {
      const text = target.textContent;
      const letters = text.split("");
      const deleteNextLetter = () => {
        letters.pop();
        target.textContent = letters.join("");
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
        typeTextSpan(readButtonSpan, "Not read");
      } else {
        typeTextSpan(readButtonSpan, "Read");
      }
    });

    readButton.addEventListener("mouseleave", (e) => {
      deleteTextSpan(readButtonSpan);
    });

    // Adding edit button functionality //

    editButton.addEventListener("click", (e) => {
      currentEditingIndex = i;
      openEditOverlay();
      const { bookTitle, bookAuthor, bookPages } = getBookData(i);
      putDataForEdit(bookTitle, bookAuthor, bookPages);
    });

    // Adding edit button text animation //

    editButton.addEventListener("mouseenter", (e) => {
      typeTextSpan(editButtonSpan, "Edit");
    });

    editButton.addEventListener("mouseleave", (e) => {
      deleteTextSpan(editButtonSpan);
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

function getBookInput() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("is-read").checked;
  return [title, author, pages, isRead];
}

function createBookCard(e) {
  e.preventDefault();
  const bookInfo = getBookInput();
  addBookToLibrary(...bookInfo);
  closeAddBookForm({ target: overlay });
}

addBookForm.addEventListener("submit", createBookCard);

// Adding remove overlay //

const removeOverlay = document.querySelector(".remove-overlay");

const closeRemoveOverlay = () => {
  removeOverlay.classList.remove("active");
};

const openRemoveOverlay = () => {
  removeOverlay.classList.add("active");
};

// Adding edit overlay //

const editOverlay = document.querySelector(".edit-overlay");

const openEditOverlay = () => {
  editOverlay.classList.add("active");
};

const closeEditOverlay = () => {
  editOverlay.classList.remove("active");
};

// Edit form functionality //

const editSubmitButton = document.getElementById("edit-btn-submit");

editSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const index = currentEditingIndex;
  const editTitle = document.getElementById("book-title");
  const editAuthor = document.getElementById("book-author");
  const editPages = document.getElementById("book-pages");

  myLibrary[index].title = editTitle.value;
  myLibrary[index].author = editAuthor.value;
  myLibrary[index].pages = editPages.value;

  closeEditOverlay();
  putBooksToGrid();
});
