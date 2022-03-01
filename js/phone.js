const main = document.getElementById('main');

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
    for (const phone of phones) {
        // console.log(phone.image);
        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.classList.add('mb-5');
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
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
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        .then(res => res.json())
        .then(data => {
            const allPhones = data.data;
            const div = document.createElement('div');
            main.innerHTML = '';
            div.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${allPhones.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${allPhones.name}</h5>
                        <p>${allPhones.releaseDate}</p>
                    </div>
                </div>
            `;
            main.appendChild(div);
        })
}