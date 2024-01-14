//Search box
const searchContainer = document.querySelector('.search-container');
const searchForm = document.createElement('form');
searchForm.action = '#';
searchForm.method = 'get';
searchContainer.appendChild(searchForm);
searchForm.innerHTML = `<input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        `;
//GALLERY
const gallery = document.getElementById('gallery');
// gallery.innerHTML = `<h1>Gallery cards go here</h1>`;

const url = 'https://randomuser.me/api/?results=12&nat=ca,us,gb,nz,au';
let profiles = '';

fetch(url)
    .then((res) => {
        if (!res.ok) throw new Error('Error Fetching Data');
        return res.json();
    })
    .then((data) => data.results)
    .then(createCards)
    .then(createModal)
    .catch((err) => console.warn);

function createCards(results) {
    profiles = results;
    results.forEach((result) => {
        const name = `${result.name.first} ${result.name.last}`;
        const image = result.picture.thumbnail;
        const email = result.email;
        const cityState = `${result.location.city}, ${result.location.state}`;
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = name;
        card.innerHTML = `<div class="card-img-container">
                                    <img class="card-img" src='${image}' alt="profile picture">
                                </div>
                                <div class="card-info-container">
                                    <h3 id="name" class="card-name cap">${name}</h3>
                                    <p class="card-text">${email}</p>
                                    <p class="card-text cap">${cityState}</p>
                                </div>`;
        gallery.appendChild(card);
    });

    const cards = document.querySelectorAll('.card');
    return cards;
}
const body = document.querySelector('body');

function createModal(cards) {
    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            modalSeperate(profiles, i);
        });
    });
}

function modalSeperate(arr, index) {
    let current = arr[index];
    const name = `${current.name.title}. ${current.name.first} ${current.name.last}`;
    const image = current.picture.large;
    const email = current.email;
    const street = `${current.location.street.number} ${current.location.street.name}`;
    const city = current.location.city;
    const country = current.location.country;
    const state = current.location.state;
    const postcode = current.location.postcode;
    const phone = current.phone;
    const dob = current.dob.date;
    const modal = document.createElement('div');
    modal.classList.add('modal-container');
    modal.innerHTML = `<div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${image}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${name}</h3>
                        <p class="modal-text">${email}</p>
                        <p class="modal-text cap">${city}</p>
                        <hr>
                        <p class="modal-text">${phone}</p>
                        <p class="modal-text">${street}, ${country},<br> ${state} ${postcode}</p>
                        <p class="modal-text">Birthday: ${dateFormat(dob)}</p>
                    </div>
                </div>

                // IMPORTANT: Below is only for exceeds tasks 
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>`;
    body.appendChild(modal);

    ///clicking on the close button will close the modal
    modal.addEventListener('click', (e) => {
        if (e.target.closest('.modal-close-btn')) {
            modal.remove();
        }
        if (e.target.closest('.modal-prev')) {
            console.log(index);
            if (index > 0) {
                modal.remove();
                modalSeperate(profiles, (index -= 1));
            } else {
                modal.remove();
                modalSeperate(profiles, (index = 11));
            }
        }
        if (e.target.closest('.modal-next')) {
            console.log(index);
            modal.remove();
            if (index < 11) {
                modal.remove();
                modalSeperate(profiles, (index += 1));
            } else {
                modal.remove();
                modalSeperate(profiles, (index = 0));
            }
        }
    });
}
//clicking outside the modal will close the modal
window.addEventListener('click', (e) => {
    if (e.target.className === 'modal-container') {
        document.querySelector('.modal-container').remove();
    }
});

//HELPER FUNCTIONS
function dateFormat(date) {
    const dob = new Date(date);
    return dob.toLocaleDateString();
}

/* 
{
    "gender": "female",
    "name": {
        "title": "Miss",
        "first": "Madison",
        "last": "Dean"
    },
    "location": {
        "street": {
            "number": 6455,
            "name": "Oak Lawn Ave"
        },
        "city": "Brisbane",
        "state": "Western Australia",
        "country": "Australia",
        "postcode": 8981,
        "coordinates": {
            "latitude": "73.4053",
            "longitude": "91.3719"
        },
        "timezone": {
            "offset": "+3:30",
            "description": "Tehran"
        }
    },
    "email": "madison.dean@example.com",
    "login": {
        "uuid": "a349a93f-7d9e-49df-96a1-d237d3b99c66",
        "username": "beautifulswan249",
        "password": "olympia",
        "salt": "YM5JY8gB",
        "md5": "86eba342aa7f8abfe3a03ed591ea2405",
        "sha1": "2cbd1a8ab3c7e758217088a66b578c523e5f6ca5",
        "sha256": "8446692e9161436f19edb06a584f1a778a8162f7ec6ea6624beac8e3f689727a"
    },
    "dob": {
        "date": "1958-08-04T04:32:18.887Z",
        "age": 65
    },
    "registered": {
        "date": "2011-03-24T22:42:49.562Z",
        "age": 12
    },
    "phone": "02-7557-3452",
    "cell": "0419-811-890",
    "id": {
        "name": "TFN",
        "value": "649037915"
    },
    "picture": {
        "large": "https://randomuser.me/api/portraits/women/79.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/79.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/79.jpg"
    },
    "nat": "AU"
}
*/
