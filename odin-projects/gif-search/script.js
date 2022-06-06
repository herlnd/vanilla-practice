const img = document.querySelector('img');
const searchBtn = document.getElementById('search-btn');
const getAnotherGif = document.getElementById('get-gif-button');
const searchTerm = document.getElementById('search-box');
const baseUrl = 'https://api.giphy.com/v1/gifs/translate?api_key=RGSpqLTNeCUgFIBsO2kcC0KT2gf1R4rI&s=';

searchBtn.addEventListener('click', getQuery);
getAnotherGif.addEventListener('click', getQuery);

function getQuery(e) {
    e.preventDefault();
    let term = searchTerm.value;
    let fullUrl = `${baseUrl}${term}`;
    fetch(fullUrl, {mode: 'cors'})
        .then((result) => {return result.json()}) 
        .then((res) => {
            const gifSection = document.querySelector('.gif-section');
            const imgContent = res.data.images.original.url;
            img.src = imgContent;
            gifSection.style.opacity = '1';        
    });
};