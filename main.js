const myLibrary = [];

const bookAdditionButton = document.getElementById('new-book');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const pages = document.getElementById('pages');
const form = document.getElementById('book-addition-form');
const bookShelf = document.getElementById('book-shelf');
const modalOpener = document.getElementById('modal-opener');
const modal = document.getElementById('modal');
const closeButton = document.getElementById('close-button');

class Book {
  #id;
  #title;
  #author;
  #pages;
  #isRead;

  constructor(title, author, pages, isRead = false) {
    this.#id = crypto.randomUUID();
    this.#title = title;
    this.#author = author;
    this.#pages = pages;
    this.#isRead = isRead
  }

  toggleRead() { 
    this.#isRead = !this.#isRead;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get author() {
    return this.#author;
  }

  get pages() {
    return this.#pages;
  }

  get isRead() {
    return this.#isRead;
  }
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);

  if (newBook instanceof Book) {
    myLibrary.push(newBook);
    depictBook(newBook);
  } else {
    return newBook;
  }
  
}

function depictBook(book) {
  let container = document.createElement("div");

  container.classList.add("book-container");
  container.setAttribute('data-book-id', book.id)

  let newElement = document.createElement("p");

  newElement.innerHTML = `${book.author} | ${book.title} | ${book.pages} Pages | ${book.isRead}`;

  container.appendChild(newElement);
  bookShelf.appendChild(container);

  addRemoveButton(container, book.id);
  addReadToggle(container, book);
}

function addReadToggle(container, book) {
  let button = document.createElement("button");

  button.setAttribute('data-id', book.id);
  button.classList.add('read-toggle');
  button.innerText = book.isRead ? "Mark as Unread" : "Mark as Read";
  container.appendChild(button);

  button.addEventListener('click', () => {
    book.toggleRead();
    displayBooks();
  });
}


function addRemoveButton(bookContainer, uuid) {
  let button = document.createElement("button");

  button.setAttribute('data-id', uuid);
  button.classList.add('remove-button');
  button.innerText = "Remove book";
  bookContainer.appendChild(button);

  button.addEventListener("click", () => {
    removeBook(button.getAttribute('data-id'));
  })
}

function removeBook(uuid) {
  for (let book of myLibrary) {

    if (book.id == uuid) {
      let index = myLibrary.indexOf(book);
      

      if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
      }
    }
  }
}

function displayBooks() {
  
  bookShelf.innerHTML = "";
  myLibrary.forEach(book => {
    depictBook(book);
  })
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let isRead = document.querySelector('input[name="read"]:checked');
  if (bookTitle.value != "" && bookAuthor.value != "" && pages.value > 0) {
    addBookToLibrary(bookTitle.value, bookAuthor.value, pages.value, Boolean(isRead.value));
    modal.classList.remove('modal-active');
  } else {
    alert("Please fill the form.");
  }

  form.reset();
})

modalOpener.addEventListener('click', () => {
  modal.classList.add('modal-active');
})

closeButton.addEventListener('click', () => {
  modal.classList.remove('modal-active');
})