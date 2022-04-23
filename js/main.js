// Preloader
const preLoader = displayCss => {
    document.getElementById('spinner').style.display = displayCss;
};

// Error Handle
const emptryStrErr = displayCss => {
    document.getElementById('empty-string').style.display = displayCss;
};
const wrongKeyword = displayCss => {
    document.getElementById('wrong-keyword').style.display = displayCss;
};


const loadSearchResult = async () => {
    // clear data
    document.getElementById('display-phones').textContent = '';
    document.getElementById('single-phone-details').textContent = '';

    //get search field
    const searchResult = document.getElementById('search-field');
    const searchText = searchResult.value;

    // clear input field
    searchResult.value = '';

    // Preloader
    preLoader('block');

    // error handle
    emptryStrErr('none');
    wrongKeyword('none');

    if(searchText === ''){
        emptryStrErr('block');
        preLoader('none');
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

    if(phones.length === 0){
        wrongKeyword('block');
        preLoader('none');
    }
    else{
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top mx-auto mt-4 dp-img" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Brand Name: ${phone.brand}</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary">Get Details</button>
                </div>
            </div>
            `;
            phonesCards.appendChild(div);
        });
        preLoader('none');
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
            <img src="${phoneDetails.image}" class="card-img-top mx-auto mt-4 mb-3 dp-img" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phoneDetails.name}</h5>
                <p class="card-text">Brand Name: ${phoneDetails.brand}</p>
                <h6 class="card-text">Main Features:</h6>
                <ul>
                    <li>Chipset: ${phoneDetails.mainFeatures.chipSet ? phoneDetails.mainFeatures.chipSet : '<span class="no-data-found">No Data Found</span>'}</li>
                    <li>Display Size: ${phoneDetails.mainFeatures.displaySize ? phoneDetails.mainFeatures.displaySize : '<span class="no-data-found">No Data Found</span>'}</li>
                    <li>Memory: ${phoneDetails.mainFeatures.memory ? phoneDetails.mainFeatures.memory : '<span class="no-data-found">No Data Found</span>'}</li>
                    <li>Sensors: ${phoneDetails.mainFeatures.sensors ? phoneDetails.mainFeatures.sensors : ''}</li>
                    <li>Storage: ${phoneDetails.mainFeatures.storage ? phoneDetails.mainFeatures.storage : '<span class="no-data-found">No Data Found</span>'}</li>
                </ul>
                <h6 class="card-text">Others:</h6>
                <ul>
                    <li>Bluetooth: ${phoneDetails.others?.Bluetooth ? phoneDetails.others?.Bluetooth : 'No'}</li>
                    <li>GPS: ${phoneDetails.others?.GPS ? phoneDetails.others?.GPS : 'No'}</li>
                    <li>NFC: ${phoneDetails.others?.NFC ? phoneDetails.others?.NFC : 'No'}</li>
                    <li>Radio: ${phoneDetails.others?.Radio ? phoneDetails.others?.Radio : 'No'}</li>
                    <li>USB: ${phoneDetails.others?.USB ? phoneDetails.others?.USB : 'No'}</li>
                    <li>WLAN: ${phoneDetails.others?.WLAN ? phoneDetails.others?.WLAN : 'No'}</li>
                </ul>
                <p class="card-text"><span class="fw-bold no-data-found">Release Date:</span> ${phoneDetails.releaseDate ? phoneDetails.releaseDate : 'No release date found!'}</p>
            </div>
        </div>
    `;
};