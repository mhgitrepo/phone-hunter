// Error Handle
const emptryStrErr = displayCss => {
    document.getElementById('empty-string').style.display = displayCss;
};
const wrongKeyword = displayCss => {
    document.getElementById('wrong-keyword').style.display = displayCss;
};

const loadSearchResult = async () => {
    // clear data
    // document.getElementById('display-phones').textContent = '';
    document.getElementById('single-phone-details').textContent = '';

    //get search field
    const searchResult = document.getElementById('search-field');
    const searchText = searchResult.value;
    // clear input field
    searchResult.value = '';

    // error handle
    emptryStrErr('none');
    wrongKeyword('none');

    if(searchText === ''){
        emptryStrErr('block');
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        displayPhones(data.data);
    }
};

const displayPhones = phones => {
    const phonesCards = document.getElementById('display-phones');
    phonesCards.textContent = '';
    wrongKeyword('none');
    if(phones.length === 0){
        wrongKeyword('block');
    }
    else{
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top mx-auto mt-2 dp-img" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Brand Name: ${phone.brand}</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary">Get Details</button>
                </div>
            </div>
            `;
            phonesCards.appendChild(div);
        });
    }
};

const loadPhoneDetails = async phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
};

const displayPhoneDetails = phoneDetails => {
    const phoneDetailsCard = document.getElementById('single-phone-details');
    phoneDetailsCard.textContent = '';

    phoneDetailsCard.innerHTML = `
        <div class="card mb-5 mx-auto">
            <img src="${phoneDetails.image}" class="card-img-top mx-auto mt-2 dp-img" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phoneDetails.name}</h5>
                <p class="card-text">Brand Name: ${phoneDetails.brand}</p>
                <h6 class="card-text">Main Features:</h6>
                <ul>
                    <li>Chipset: ${phoneDetails.mainFeatures.chipSet}</li>
                    <li>Display Size: ${phoneDetails.mainFeatures.displaySize}</li>
                    <li>Memory: ${phoneDetails.mainFeatures.memory}</li>
                    <li>Sensors: ${phoneDetails.mainFeatures.sensors[0]}, ${phoneDetails.mainFeatures.sensors[1]}, ${phoneDetails.mainFeatures.sensors[2]}, ${phoneDetails.mainFeatures.sensors[3]}, ${phoneDetails.mainFeatures.sensors[4]}, ${phoneDetails.mainFeatures.sensors[5]}</li>
                    <li>Storage: ${phoneDetails.mainFeatures.storage}</li>
                </ul>
                <h6 class="card-text">Others:</h6>
                <p class="card-text">${phoneDetails.others}</p>
            </div>
        </div>
    `;
};