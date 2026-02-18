// Login Protection + Show Admin Name
window.onload = function(){

    let name = localStorage.getItem("adminName");

    // Block direct access
    if(name === null){
        window.location.href = "login.html";
    }
    else{
        // Show name on dashboard
        let title = document.getElementById("adminTitle");

        if(title){
            title.innerText = "Welcome, " + name;
        }
    }

    // Default section
    show("users");
};

//show section
function show(id) {

    let sections = document.querySelectorAll(".section");

    sections.forEach(sec => {
        sec.style.display = "none";
    });

    document.getElementById(id).style.display = "block";
}



// Add Book (Temporary)
function addBook() {

    let book = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;

    if (book === "" || author === "") {
        alert("Fill all fields");
        return;
    }

    let li = document.createElement("li");

    li.innerHTML = book + " - " + author;

    document.getElementById("bookList").appendChild(li);

    document.getElementById("bookName").value = "";
    document.getElementById("author").value = "";
}


// Logout
function logout() {

    // Remove login data
    localStorage.removeItem("adminName");

    window.location.href = "login.html";

}



// Sample Data 
let books = [
    {name:"Java Basics", author:"James Gosling", status:"available"},
    {name:"Python Guide", author:"Guido van Rossum", status:"available"},
    {name:"Web Design", author:"Tim Berners-Lee", status:"issued"},
    {name:"C Programming", author:"Dennis Ritchie", status:"available"}
];


// Connect Buttons
window.addEventListener("DOMContentLoaded", function(){

    let search = document.getElementById("searchBtn");
    let issue = document.getElementById("issueBtn");

    if(search) search.addEventListener("click", searchBook);
    if(issue) issue.addEventListener("click", issueBook);

});


// Search Book
function searchBook(){

    let key = document.getElementById("searchBook").value.toLowerCase();
    let table = document.getElementById("resultTable");

    table.innerHTML = `
        <tr>
            <th>Select</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Status</th>
        </tr>
    `;

    if(key===""){
        alert("Enter book name");
        return;
    }

    let found = false;

    books.forEach((b,i)=>{

        if(b.name.toLowerCase().includes(key)){

            found = true;

            let row = table.insertRow();

            row.insertCell(0).innerHTML =
            b.status==="available"
            ? `<input type="radio" name="selectBook" onclick="selectBook(${i})">`
            : "-";

            row.insertCell(1).innerHTML = b.name;
            row.insertCell(2).innerHTML = b.author;
            row.insertCell(3).innerHTML = b.status;
        }
    });

    if(!found){
        alert("No book found");
    }
}


// Select Book
function selectBook(i){

    let book = books[i];

    document.getElementById("issueBookName").value = book.name;
    document.getElementById("issueAuthor").value = book.author;

    let today = new Date();

    document.getElementById("issueDate").value =
        today.toISOString().split("T")[0];

    let future = new Date();
    future.setDate(today.getDate()+15);

    document.getElementById("returnDate").value =
        future.toISOString().split("T")[0];
}


// Issue Book
function issueBook(){

    let book = document.getElementById("issueBookName").value;
    let remark = document.getElementById("remarks").value;
    let ret = document.getElementById("returnDate").value;

    let msg = document.getElementById("issueMsg");

    if(book===""){
        msg.innerHTML="Select a book first";
        msg.style.color="red";
        return;
    }

    if(remark===""){
        msg.innerHTML="Remarks required";
        msg.style.color="red";
        return;
    }

    let today = new Date().toISOString().split("T")[0];

    if(ret < today){
        msg.innerHTML="Invalid return date";
        msg.style.color="red";
        return;
    }

    books.forEach(b=>{
        if(b.name===book){
            b.status="issued";
        }
    });

    msg.style.color="green";
    msg.innerHTML="Book Issued Successfully";

    document.getElementById("issueBookName").value="";
    document.getElementById("issueAuthor").value="";
    document.getElementById("remarks").value="";
}