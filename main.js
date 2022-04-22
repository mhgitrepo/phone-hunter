const loadSearchResult = async () => {
    const searchResult = document.getElementById('search-field');
    const searchText = searchResult.value;

    // clear input field
    searchResult.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
};

const displayPhones = phones => {
    const phonesContainer = document.getElementById('display-phones');
    phonesContainer.textContent = ''

    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top mx-auto mt-2 dp-img" alt="...">
            <div class="card-body">
            <h5 class="card-title"></h5>
            <p class="card-text"></p>
            </div>
        </div>
        `;
        phonesContainer.appendChild(div);
    });
};