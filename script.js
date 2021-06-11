// // fetch("./music.json")
//         //     .then(res => res.json())
//         //     .then(data => console.log(data[0].name))



class Song {
    constructor() {
    }

    setItemLi(element) {
        let txtHTML = this.getNewElement(this.group, this.url_group, this.title, this.listeners)
        element[0].insertAdjacentHTML("beforeend", txtHTML);

    }
    setItemGroupName(group, url) {
        this.group = group;
        this.url_group = url;
    }
    setItemSongTitle(title) {
        this.title = title;
    }
    setListeners(listeners) {
        this.listeners = listeners;
    }
    getNewElement(group, url, title, listeners) {

        let txtHTML = `<li class="far fa-play-circle">
    <a class="group-name" title="Ir al Grupo" href=${url}>${group}</a>
    <a class="song-title">${title}</a>
    <div class="listeners">${listeners}</div></li>`

        return txtHTML;
    }

}


const loadSongs = (listOfSongs) => {
    divLista = document.getElementsByClassName('lista');
    try {
        const song = new Song();

        listOfSongs.forEach(element => {
            song.setItemSongTitle(element.name);
            song.setListeners(element.listeners);
            song.setItemGroupName(element.artist.name, element.artist.url);

            song.setItemLi(divLista);

        });


    } catch (error) {
        throw error;
    }
}

const loadOverview = () => {
}

const loadTenListened = () => {

}

const loadBiggest = (e) => {

}

const fetchJSON = async (callback, url) => {

    let response = await fetch(url);
    if (response.ok) {
        let listOfSongs = await response.json();
        callback(listOfSongs);
        // loadSongs(listOfSongs);
    }
}

const updateMenuItem = (string) => {
    mItemSelected[0].innerHTML = string;

}

const init = () => {
    try {
        mItemSelected = document.getElementsByClassName('menu-item-selected');
        overview = document.getElementsByClassName('overview');

        updateMenuItem(overview[0].textContent);

        fetchJSON(loadSongs, "./music.json");

        // let response = await fetch("./music.json");
        //     if (response.ok) {
        //         let listOfSongs = await response.json();
        //         loadSongs(listOfSongs);
        //     }

    } catch (error) {
        console.error(error);
    }

}

// let listOfSongs = [
//     {
//         "name": "The Less I Know the Better",
//         "duration": "0",
//         "listeners": "439958",
//         "mbid": "",
//         "url": "https://www.last.fm/music/Tame+Impala/_/The+Less+I+Know+the+Better",
//         "artist": {
//             "name": "Tame Impala",
//             "mbid": "63aa26c3-d59b-4da4-84ac-716b54f1ef4d",
//             "url": "https://www.last.fm/music/Tame+Impala"
//         },
//         "@attr": {
//             "rank": "0"
//         },
//         "genre": "reggae"
//     },
//     {
//         "name": "Creep",
//         "duration": "239",
//         "listeners": "1647583",
//         "mbid": "d11fcceb-dfc5-4d19-b45d-f4e8f6d3eaa6",
//         "url": "https://www.last.fm/music/Radiohead/_/Creep",
//         "artist": {
//             "name": "Radiohead",
//             "mbid": "a74b1b7f-71a5-4011-9441-d0b5e4122711",
//             "url": "https://www.last.fm/music/Radiohead"
//         },
//         "@attr": {
//             "rank": "1"
//         },
//         "genre": "jazz"
//     }];

let mItemSelected, overview;
let divLista;

window.onload = init;

