//book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//ui constructor
function UI(){

}
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');

    // create tr element
    const row = document.createElement('tr');

    //insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row);
}

//show alert
UI.prototype.showAlert = function(message, className){
     // create div
     const div = document.createElement('div');

     //add classes
     div.className = `alert ${className}`;

     //add text
     div.appendChild(document.createTextNode(message));

    // get parent element
    const container = document.querySelector('.container');

    //get form
    const form = document.querySelector('#book-form');

    //insert alert
    container.insertBefore(div, form);

    //timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);

}
// delete books
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
};


//clear input fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// event listeners for adding books
document.getElementById('book-form').addEventListener('submit',
  function(e){

    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;


          //instantiating book
          const book = new Book(title, author, isbn)
  
          //instantiating ui
          const ui = new UI();

          //validate
          if(title === '' || author === '' || isbn === '') {
              ui.showAlert('Please fill in all fields', 'error')
          }
          else{
          //add book to list
          ui.addBookToList(book)

          /// show success message
          
          ui.showAlert('Book Added!', 'success')



          //clear fields
          ui.clearFields()
          }

    e.preventDefault()
})

// event listener for deleting books
document.getElementById('book-list').addEventListener('click',
    function(e){
        const ui = new UI();
        ui.deleteBook(e.target);


        // show delete message
        ui.showAlert('Book deleted successfully', 'success');
        e.preventDefault()
})