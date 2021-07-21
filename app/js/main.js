let navToggle = document.querySelector(".nav__toggle");
let navWrapper = document.querySelector(".nav__wrapper");

navToggle.addEventListener("click", function () {
    if (navWrapper.classList.contains("active")) {
        this.setAttribute("aria-expanded", "false");
        this.setAttribute("aria-label", "menu");
        navWrapper.classList.remove("active");
    } else {
        navWrapper.classList.add("active");
        this.setAttribute("aria-label", "close menu");
        this.setAttribute("aria-expanded", "true");
        searchForm.classList.remove("active");
        searchToggle.classList.remove("active");
    }
});

let searchToggle = document.querySelector(".search__toggle");
let searchForm = document.querySelector(".search__form");

searchToggle.addEventListener("click", showSearch);

function showSearch() {
    searchForm.classList.toggle("active");
    searchToggle.classList.toggle("active");

    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "menu");
    navWrapper.classList.remove("active");

    if (searchToggle.classList.contains("active")) {
        searchToggle.setAttribute("aria-label", "Close search");
    } else {
        searchToggle.setAttribute("aria-label", "Open search");
    }
}

function updateTable(json, pageNum = 0) {
    let divTable = document.getElementsByClassName("content__table")[0];
    if (pageNum%3 == 0){
        divTable.querySelectorAll('.content__table-body')
            .forEach(node => node.remove());
    }
    json.forEach((row, rowIndex) => {
        addNewRow(divTable, row, rowIndex, pageNum);
    });
}

function addNewRow(divTable, row, rowIndex, pageNum) {
    let divRow = document.createElement('div');
    divRow.classList.add('content__table-body');
    for (var fieldName in row) {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = row[fieldName];
        newDiv.classList.add('content__table-item');
        divRow.appendChild(newDiv);
    };
    let indexDiv = document.createElement("div");
    indexDiv.innerHTML = pageNum*10 + rowIndex + 1;
    indexDiv.classList.add('content__table-item-id');
    divRow.appendChild(indexDiv);
   
    divTable.appendChild(divRow);
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}
const button = document.querySelector('.button__load');
button.addEventListener('click', event => {
    postData('server_test.php', { page: button.getAttribute('data-page') })
        .then((data) => {
            let pageNum = parseInt(button.getAttribute('data-page'))
            updateTable(data, pageNum)
            button.setAttribute('data-page', pageNum+1)
        });
});
document.addEventListener("DOMContentLoaded", (event)=> {
    document.querySelector('.button__load').click();
});