const loadSearchResult = () => {
    const searchResult = document.getElementById('search-field');
    const searchText = searchResult.value;

    // clear input field
    searchResult.value = '';
    
    console.log(searchText);
};