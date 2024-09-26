console.log("Welcome to Vaishnav's Library");

class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

class Display {
  add(book, index) {
    console.log("adding book");
    let tableBody = document.getElementById("tableBody");
    let insideValue = `<tr>
                                <td>${book.name}</td>
                                <td>${book.author}</td>
                                <td>${book.type}</td>
                                <td><button type="button" id = "${index}" onclick = "deleteBook(this.id)" class="btn btn-outline-danger">Delete</button></td>
                            </tr>`;
    tableBody.innerHTML += insideValue;

    //add the books to the local storage without replacing the current one
    let storedBooks = JSON.parse(localStorage.getItem("books"));
    // Ensure storedBooks is an array
    if (!Array.isArray(storedBooks)) {
      storedBooks = [];
    }
    storedBooks.push(book);
    localStorage.setItem("books", JSON.stringify(storedBooks));
  }

  //clear the form
  clear() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
  }

  //validate the form
  validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    } else return true;
  }

  //show the alert bar
  show(type, displayMessage) {
    let message = document.getElementById("message");
    let boldText;
    if (type === "success") {
      boldText = "Success";
    } else {
      boldText = "Error!";
    }
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;

    setTimeout(function () {
      message.innerHTML = "";
    }, 2000);
  }
  
  //display the books form local storage
  displayStoredBooks() {
    let storedBooks = JSON.parse(localStorage.getItem("books"));
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    if (storedBooks != null) {
      storedBooks.forEach((element, index) => {
        let insideValue = `<tr>
                                        <td>${element.name}</td>
                                        <td>${element.author}</td>
                                        <td>${element.type}</td>
                                        <td><button type="button" id = "${index}" onclick = "deleteBook(this.id)" class="btn btn-outline-danger">Delete</button></td>
                                        </tr>`;
        tableBody.innerHTML += insideValue;
      });
    }
  }
}

let display = new Display();
// Display stored books on page load
display.displayStoredBooks();

let submit = document.getElementById("libraryForm");
console.log(submit);
submit.addEventListener("submit", submitFrom);
function submitFrom(e) {
  e.preventDefault();
  console.log("You have submitted the form");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type;
  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");
  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }
  let book = new Book(name, author, type);
  console.log(book);

  let display = new Display();
  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show("success", "Your Book is added successfully");
  } else {
    display.show("danger", "Sorry!!, cannot add your book");
  }
}

//deleting the book
function deleteBook(index){
    console.log(index);
    let storedBooks = JSON.parse(localStorage.getItem("books"));
    // console.log(storedBooks);
    if (!Array.isArray(storedBooks)) {
      storedBooks = [];
    }
    console.log(storedBooks);
    storedBooks.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(storedBooks));
    let display = new Display();
    display.displayStoredBooks();
}