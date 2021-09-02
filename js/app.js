//some constant variables
const resultsContainer = document.getElementById('results-container')
const resultsNum = document.getElementById('results-num');

//spinner function
const showSpinner = isShowing => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = isShowing;
}
showSpinner('none');

// search button click function
const searchItems = () => {
    showSpinner('block');
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;

    //clear input field and result area
    inputField.value = '';
    resultsContainer.textContent = '';
    resultsNum.innerText = '';

    //if no search text found
    if (searchText === '') {
        resultsNum.innerText = 'Please enter a book name.';
        showSpinner('none');
        return;
    }

    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => displayRsults(data))
}

//function for displaying results in result area
const displayRsults = books => {
    //display number of result
    resultsNum.innerText = `${books.numFound} Results found`;

    //if unexpected input occured
    if (books.numFound === 0) {
        resultsNum.innerText = 'No result found';
        showSpinner('none');
   }
    
    books.docs.forEach(book => {
        //book cover url
        let imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

        // if author name or publishing year or image is unavailable
        if (book.author_name === undefined) {
            book.author_name = 'Unknown';
        }
        else if (book.first_publish_year === undefined) {
            book.first_publish_year = 'No info found';
        }
        else if (book.cover_i === undefined) {
            imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
        }
    

        //creating bootstrap cards for showing results
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${imgUrl}" height = "500px" class="card-img-top" alt="Image not available">
            <div class="card-body">
              <h4 class="card-title"><b>${book.title}</b></h4>
              <h5 class="text-info">Author: <u>${book.author_name}</u></h5>
              <h6>Publisher: <u>${book.publisher}</u></h6>
              <h6><small>First publish: ${book.first_publish_year}</small></h6>
            </div>
          </div>
        `;
        resultsContainer.appendChild(div);
        showSpinner('none');
    });
}
