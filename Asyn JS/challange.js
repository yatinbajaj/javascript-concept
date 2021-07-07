const btn = document.querySelector('.btn-country');
const countryContainer = document.querySelector('.countries');

////////////////////////////////
/**
const renderCountry = function (data) {
    const html = `<article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(data.population/1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>`

        countryContainer.insertAdjacentHTML('beforeend', html);
        countryContainer.style.opacity = 1;
}


const whereAmI = function (lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
        .then((response) => {
            if (!response.ok)
                throw new Error(`Problem with Geocoding ${response.status}`);
            
            return response.json();
        }).then((data) => {
            console.log(`Your are in ${data.city} that is in ${data.country}`);
            
            return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
        }).then((response) => response.json())
        .then((data) => {
            renderCountry(data[0])
        })
        .catch((err) => { console.log(`${err.message}`) });
}
btn.addEventListener('click', function () {
    whereAmI(51.50354, -0.12768);
    whereAmI(52.508,13.381);
});
 */

const imgContainer = document.querySelector('images');

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);   // after 1000 ms it will return the resolve Promise.
  });
};

// Promisifying  the asyn task that is set the image src 
const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
        img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener('load', function () {
            imgContainer.append(img);
            resolve(img);
        });

        img.addEventListener('error', function () {
            reject(new Error('Image not found'));
        });
        
    });
};

let currentImg;
createImage().then(img => {
    currentImg = img;
    console.log('Image1 loaded');
    return wait(2);
}).then(() => {
    currentImg.style.display = 'none';
    return createImage('');
}).then((img) => {
    currentImg = img;
    console.log('Image2 loaded');
    return wait(2);
}).then(() => {
    currentImg.style.display='none';
}).catch(err => {
    console.log(err);
    
})

