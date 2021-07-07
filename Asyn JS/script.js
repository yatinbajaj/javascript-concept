const btn = document.querySelector('.btn-country');
const countryContainer = document.querySelector('.countries');


///////////////////////////////////////

const renderCountry = function (data,className ='') {
    const html = `<article class="country ${className}">
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
        // countryContainer.style.opacity = 1;
}

const renderError = function (msg) {
  countryContainer.insertAdjacentText('beforeend', msg);
  countryContainer.style.opacity = 1;
}




