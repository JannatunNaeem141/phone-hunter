// call main div
const main = document.getElementById('main');

// getting data 
const searchButton = () => {
    document.getElementById('spinner').style.display = "block";
    const input = document.getElementById('input-value');
    const error = document.getElementById('error');
    const inputValue = input.value;

    // condition check & error handle
    if (isNaN(inputValue) == true) {
        main.innerHTML = '';
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(res => res.json())
            .then(data => phoneDisplay(data.data))
        input.value = '';
        error.innerHTML = '';
    } else {
        error.innerText = 'Please give a Phone name!';
        input.value = '';
        main.innerHTML = '';
    }
    document.getElementById('spinner').style.display = "none";
};

// display data
const phoneDisplay = (phones) => {
    const first20data = phones.slice(0, 20);

    if (phones.length == 0) {
        error.innerText = `No phone found! 
        Try another`;
    }
    for (const phone of first20data) {
        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.classList.add('mb-5');
        div.classList.add('element-center');

        // every phones card
        div.innerHTML = `
        <div class="card shadow-lg card-padding" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h6 class="card-title">${phone.brand}</h6>
                <div class="text-center">
                    <button onclick="phoneDetails('${phone.slug}')" class="btn  button">Details</button>
                </div>
            </div>
        </div>
        `;
        main.appendChild(div);
    }
};

// showing phone details
const phoneDetails = (slug) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        .then(res => res.json())
        .then(data => {
            const allPhones = data.data;
            const div = document.createElement('div');
            div.classList.add('element-center');

            // add data from sensor array
            const sensors = allPhones.mainFeatures.sensors;

            // release date
            const getReleaseDate = allPhones.releaseDate;
            const release = (getReleaseDate == '') ? "Comming soon" : getReleaseDate;

            // others
            const getOthers = allPhones.others;
            const others = (getOthers == undefined) ? "" : getOthers;

            main.innerHTML = '';

            // phone details set
            div.innerHTML = `
                <div class="card shadow-lg p-3" style="width: 18rem;">
                    <img src="${allPhones.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-center">${allPhones.name}</h5>
                        <p class="release">${release}</p>
                        <p><span class="fw-bold">Brand:</span> ${allPhones.brand}</p>
                        <p><span class="fw-bold">Chipset:</span> ${allPhones.mainFeatures.chipSet}</p>
                        <p><span class="fw-bold">Display Size:</span> ${allPhones.mainFeatures.displaySize}</p>
                        <p><span class="fw-bold">Memory:</span> ${allPhones.mainFeatures.memory}</p>
                        <p><span class="fw-bold">Sensors:</span> ${sensors}</p>
                        <p><span class="fw-bold">Others:</span></p>
                        <ul>
                            <li><span class="fw-bold">Bluetooth:</span> ${others.Bluetooth}</li>
                            <li><span class="fw-bold">GPS:</span> ${others.GPS}</li>
                            <li><span class="fw-bold">NFC:</span> ${others.NFC}</li>
                            <li><span class="fw-bold">Radio:</span> ${others.Radio}</li>
                            <li><span class="fw-bold">USB:</span> ${others.USB}</li>
                            <li><span class="fw-bold">WLAN:</span> ${others.WLAN}</li>
                        </ul>
                    </div>
                </div>
            `;
            main.appendChild(div);
        })
};