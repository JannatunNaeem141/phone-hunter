const main = document.getElementById('main');

const searchButton = () => {
    const input = document.getElementById('input-value');
    const error = document.getElementById('error');
    const inputValue = input.value;
    if (isNaN(inputValue) == true) {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(res => res.json())
            .then(data => phoneDisplay(data.data))

        input.value = '';
    } else {
        error.innerText = 'Please give a Phone name!';
        input.value = '';
    }
};