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
