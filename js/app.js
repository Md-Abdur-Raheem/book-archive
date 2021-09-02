const resultsContainer = document.getElementById('results-container')
const resultsNum = document.getElementById('results-num');

const searchItems = () => {
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => displayRsults(data))
}

const displayRsults = books /* object */ => {
    console.log(books.numFound); //number
    resultsNum.innerText = `${books.numFound} Results found`;
   
    
    books.docs.forEach(book /* array */ => {
        let imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        console.log(book.title); //string
        console.log(book.author_name); // array
        console.log(book.first_publish_year); // number
        console.log(book.cover_i); // number


        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${imgUrl}" class="card-img-top" alt="Image not available">
            <div class="card-body">
              <h4 class="card-title">${book.title}</h4>
              <h5>Author: ${book.author_name}</h5>
              <h5>First publiush: ${book.first_publish_year}</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        `
        resultsContainer.appendChild(div);
    });
}
