//Version 01

// let form = document.querySelector("#searchForm");
// let showList = document.querySelector("#showlist");
// let allItems = document.querySelectorAll("li");
//
// let searchShow = async () => {
//     try {
//         let searchQuery = form.elements.query.value;
//         let response = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchQuery}`);
//         console.log(response);
//         for (let i = 0; i < response.data.length; i++) {
//             let showItem = document.createElement("li");
//             let showName = response.data[i].show.name;
//             let releaseYear = response.data[i].show.premiered.slice(0, 4);
//             let countryCode = response.data[i].show.network.country.code;
//             showItem.innerText = `${showName} [${releaseYear}], ${countryCode}`;
//             showList.appendChild(showItem);
//         };
//         document.querySelector("h2").innerText = `Here are the results for "${searchQuery}":`;
//     }
//     catch (e) {
//         document.querySelector("h2").innerText = "An error occurred.";
//     };
// };
//
// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     searchShow();
// });

//Version 02

let form = document.querySelector("#searchForm");
let showDisplay = document.querySelector("#showblock");

let searchShow = async () => {
    try {
        let searchQuery = form.elements.query.value;
        const config = {params: {q: searchQuery}};
        let response = await axios.get("https://api.tvmaze.com/search/shows", config);
        createImages(response.data);
        document.querySelector("h2").innerText = `Here are the results for "${searchQuery}":`;
    }
    catch (e) {
        document.querySelector("h2").innerText = "An error occurred.";
    }
};

let createImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            let img = document.createElement("img");
            img.src = result.show.image.medium;
            showDisplay.appendChild(img);
        }
    }
};

let clearDisplay = () => {
    let allImages = document.querySelectorAll("img");
    for (let image of allImages) {
        image.remove();
    }
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearDisplay();
    searchShow();
});