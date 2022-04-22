const loadSearchResult = async () => {
    const searchResult = document.getElementById('search-field');
    const searchText = searchResult.value;

    // clear input field
    searchResult.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
};