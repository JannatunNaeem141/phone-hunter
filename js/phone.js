const main = document.getElementById('main');
main.classList.add('test');

const searchButton = () => {
    const input = document.getElementById('input-value');
    const error = document.getElementById('error');
    const inputValue = input.value;
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
};
const phoneDisplay = (phones) => {
    if (phones.length == 0) {
        error.innerText = `No phone found! 
        Try another`;
    }
    for (const phone of phones) {
        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.classList.add('mb-5');
        div.classList.add('element-center');
        div.innerHTML = `
        <div class="card shadow-lg p-3" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h6 class="card-title">${phone.brand}</h6>
                <div class="text-center">
                    <button onclick="phoneDetails('${phone.slug}')" class="btn btn-primary ">Details</button>
                </div>
            </div>
        </div>
        `;
        main.appendChild(div);
    }
};
const phoneDetails = (slug) => {
    console.log(slug);
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        .then(res => res.json())
        .then(data => {
            const allPhones = data.data;
            const div = document.createElement('div');
            div.classList.add('element-center');
            main.innerHTML = '';
            div.innerHTML = `
                <div class="card shadow-lg p-3" style="width: 18rem;">
                    <img src="${allPhones.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-center">${allPhones.name}</h5>
                        <p>${allPhones.releaseDate}</p>
                        <p><span class="fw-bold">Brand:</span> ${allPhones.brand}</p>
                        <p><span class="fw-bold">Chipset:</span> ${allPhones.mainFeatures.chipSet}</p>
                        <p><span class="fw-bold">Display Size:</span> ${allPhones.mainFeatures.displaySize}</p>
                        <p><span class="fw-bold">Memory:</span> ${allPhones.mainFeatures.memory}</p>
                        <p><span class="fw-bold">Others:</span></p>
                        <ul>
                            <li><span class="fw-bold">Bluetooth:</span> ${allPhones.others.Bluetooth}</li>
                            <li><span class="fw-bold">GPS:</span> ${allPhones.others.GPS}</li>
                            <li><span class="fw-bold">NFC:</span> ${allPhones.others.NFC}</li>
                            <li><span class="fw-bold">Radio:</span> ${allPhones.others.Radio}</li>
                            <li><span class="fw-bold">USB:</span> ${allPhones.others.USB}</li>
                            <li><span class="fw-bold">WLAN:</span> ${allPhones.others.WLAN}</li>
                        </ul>
                    </div>
                </div>
            `;
            main.appendChild(div);
        })
};