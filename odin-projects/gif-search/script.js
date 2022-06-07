const img = document.querySelector('img');
const searchBtn = document.getElementById('search-btn');
const getAnotherGif = document.getElementById('get-gif-button');
const searchTerm = document.getElementById('search-box');
const baseUrl = 'https://api.giphy.com/v1/gifs/translate?api_key=RGSpqLTNeCUgFIBsO2kcC0KT2gf1R4rI&s=';

searchBtn.addEventListener('click', getQuery);
getAnotherGif.addEventListener('click', getQuery);

const changeBtnStatus = (loadingStatus) => searchBtn.disabled = loadingStatus;
const changeOpacity = (selector, show) => document.querySelector(selector).style.opacity = show ? 1 : 0;

img.onload = function() {
    changeOpacity('.gif-section', true);
    changeOpacity('.loader', false);
    changeBtnStatus(false);  
}

changeBtnStatus(false);

function getQuery(e) {
    if (typeof e !== 'undefined') e.preventDefault();

    const term = searchTerm.value;
    if (term.length === 0) return;
    const fullUrl = `${baseUrl}${term}`;
    img.src = '';

    changeOpacity('.loader', true);
    changeOpacity('.gif-section', false);
    changeBtnStatus(true);

    fetch(fullUrl, {mode: 'cors'})
        .then((result) => {return result.json()}) 
        .then((res) => {
            const imgContent = res.data.images.original.url;
            img.src = imgContent; 
        })  
        .catch ((err) => document.querySelector('.loader h1').textContent = err.message);
        //TODO
        // Crear una función (cambiar texto de selectores) para mostrar errores cuando falla el fetch
        // y devolverlo a su estado de "loading"
};