const first = () => {
    console.log('Hey there first function called');
    second();
    third();
}

const second = () => {
    
    setTimeout(() => {
        console.log('Hey there Asyn called that is in second function');
    }, 2000);
    console.log('Hey there second function called');
}

const third = () => {
    console.log('Hey there third function called');
}

first();

// setTimeOut() function is used to set timer in js and this will allow us to write code that should be executed later.so, that is Async js. first parameter is an callback and second parameter is time in milli second.

// the code inside will execute after the 2000 milli second and print rest code will execute according to its order.timer run in background and console log appear after the timeout. But that did not stop the remaining code on foreground from running even before the timer had fininshed

////////////////////////////////////////////////////////////////


const getCountryData = function (country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    request.send();
    request.addEventListener('load', function () {
        const [data] = JSON.parse(request.responseText);
        console.log(data);
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
    })

}
getCountryData('USA');
// data = request.send(); we can't write like this because it does not implicitly return the data it first load in the background so we attach the listeners to it. that is when the data load succesfully it triger the event and callback function code run.

////////////////////////////////
// Welcome to Callback Hell


const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // Render country 1
    renderCountry(data);
    // Get neighbour country (2)
    const [neighbour] = data.borders; 
    if (!neighbour) return;
    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};
// when neighbour is loaded from the first request then the second is made
// getCountryAndNeighbour('portugal');

getCountryAndNeighbour('usa');
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

///////////////////////////////////////
// Consuming Promises
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

const getCountryData = function (country) {
    fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(function (response) {
        console.log(response);
        return response.json();
    }).then(function (data) {
        console.log(data);
        renderCountry(data[0]);
    });

};
getCountryData('USA');

// fetch function return promises and then we use .then() function which return response to read the data from response we use json() function which is Async run in background, .then() always return the promise and again we use .then() function to use that data that is read by json() function.

///////////////////////////////////////
// Chaining Promises
const getCountryData = function (country) {
    // country 1
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
        .then((response) => response.json())
        .then((data) => {
            renderCountry(data[0]);
            const neighbour = data[0].borders[0];

            if (!neighbour) return;
            // country 2
            return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
        }).then((response) => response.json())
        .then((data) => renderCountry(data, 'neighbour'));
    
};
getCountryData('USA');

// then method  return promises always whether we return some value or not then that value will become  fulfillment value of the return promise
// promises is a powerful an elegant solution to handle the asynchronus code


////////////////////////////////
// err handling



const renderError = function (msg) {
  countryContainer.insertAdjacentText('beforeend', msg);
  // countryContainer.style.opacity = 1;
}

const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    }).then((response) => response.json())
    .then((data) => renderCountry(data, 'neighbour'))
    .catch((err) => {
      console.error(err);
      renderError(`Something went wrong ${err.message}.`);
    }).finally(() => {
      countryContainer.style.opacity = 1;
    });
    
};
btn.addEventListener('click', function () {
  getCountryData('USA');
});

// fetch function only reject when there is no internet connection. But 404 err which is not a real err BUt any way with this 404 fetch promise will still get fulfilled
// catch can handle any err in the chain. err propogate from top to bottom to verify that err is handeled or not. if not throw an err to console

////////////////////////////////
// Throwing err manully

const getJSON = function (url, errMessage='Something went wrong') {
    return fetch(url)
      .then((response) => {

        if (!response.ok)
          throw new Error(`${errMessage} (${response.status})`);
        
      return response.json()
    });
}

const getCountryData = function (country) {
  getJSON(`https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found')
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      

      if (!neighbour) throw new Error('Neighbour country not found');

      return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`,'Country not found');
    })
    .then((data) => renderCountry(data, 'neighbour'))
    .catch((err) => {
      console.error(err);
      renderError(`Something went wrong ${err.message}. Try Again !`);
    }).finally(() => {
      countryContainer.style.opacity = 1;
    });
    
};
btn.addEventListener('click', function () {
  getCountryData('USA');
});

// fetch function only reject when there is no internet connection. But 404 err which is not a real err BUt any way with this 404 fetch promise will still get fulfilled. 400 for neighbour
// catch can handle any err in the chain. err propogate from top to bottom to verify that err is handeled or not. if not throw an err to console



///////////////////////////////////////
// Building a Simple Promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);   // after 1000 ms it will return the resolve Promise.
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);
Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));





////////////////////////////////


const getPosition = function () {
  return new Promise((resolve, reject) => {

    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );

    navigator.geolocation.getCurrentPosition(resolve, reject);

  });
}

// getPosition().then(position => console.log(position));

// resolve is now itself a callback function which will get called with a position

const whereAmI = function () {
  getPosition().then(position => {
    const { latitude: lat, longitude: lng } = position.coords;
    return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
  })
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
    whereAmI();
    
});

////////////////////////////////
// challange 2

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

////////////////////////////////////////////////////////////////

const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);

  });
}



const whereAmI = async function () {
  
  // fetch(`https://restcountries.eu/rest/v2/name/${country}`)
  //       .then((response) => response.json())
  //  same as done below

  try {

    // geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse Geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json(); // return  resolved promise

    //Country data
    const res = await fetch(`https://restcountries.eu/rest/v2/name/${dataGeo.country}`);
    if (!res.ok) throw new Error('Problem getting location data');
    const data = await res.json();   // return  resolved promise

    renderCountry(data[0]);
  } catch (err) {
    console.error(`${err.message}`);
    renderError(err.message);
  }
}

btn.addEventListener('click', function () {
  whereAmI();
  
});









///////////////////////////////////////
// Returning Values from Async Functions
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();
    // Country data
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    if (!resGeo.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);
    // Reject promise returned from async function
    throw err;
  }
};
console.log('1: Will get location');
// const city = whereAmI();
// console.log(city);
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location'));
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message} 💥`);
  }
  console.log('3: Finished getting location');
})();




///////////////////////////////////////
// Running Promises in Parallel

const getJSON = function (url, errMessage='Something went wrong') {
    return fetch(url)
      .then((response) => {

        if (!response.ok)
          throw new Error(`${errMessage} (${response.status})`);
        
      return response.json()
    });
}



const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );
    // console.log([data1.capital, data2.capital, data3.capital]);
    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));

  } catch (err) {
    console.error(err);
  }
};

btn.addEventListener('click', function () {
 get3Countries('portugal', 'canada', 'tanzania');
});

// we have run all this Ajax call(Async operations that don't depend one one another) one after the another even though the result of second one here is does not depend on first one ..... so, we use Promise.all() to run all the Ajax call parallel.

// when one Async task/ Ajax call fail then whole circuit break.
 


///////////////////////////////////////
// Other Promise Combinators: race, allSettled and any

 
// Promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/italy`),
    getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
    getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
  ]);
  console.log(res[0]);
})();
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));


  // Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));
Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));


  // Promise.any [ES2021]
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
