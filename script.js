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


const loadSongs = (listOfSongs, callback = null) => {

    try {
        const song = new Song();
        if (callback != null) { listOfSongs = callback(listOfSongs) }
        listOfSongs.forEach(element => {
            song.setItemSongTitle(element.name);
            song.setListeners(element.listeners);
            song.setItemGroupName(element.artist.name, element.artist.url);

            song.setItemLi(divItemLista);

        });


    } catch (error) {
        throw error;
    }
}

const loadOverview = () => {
    try {
        updateMenuItem(initActivedElement(overview.item(0)));
        removeItems_list('far');
        fetchJSON(loadSongs, jsonName, sortListened);

    } catch (error) {
        throw error;
    }
}

const sortTenListened = (listOfSongs) => {

    return sortListened(listOfSongs).slice(0, 10);

}

const sortListened = (listOfSongs) => {
    listOfSongs.sort(function (a, b) {
        return b.listeners - a.listeners;
    });
    return listOfSongs;

}

const sortRanking = (listOfSongs) => {
    listOfSongs.sort(function (a, b) {
        return b["@attr"].rank > a["@attr"].rank;
    });
    return listOfSongs;
}

const loadTenListened = () => {
    try {
        updateMenuItem(initActivedElement(top_10_Listened.item(0)));
        removeItems_list('far');
        fetchJSON(loadSongs, jsonName, sortTenListened);
        //  loadSongs(listOfSongs_test, sortTenListened);

    } catch (error) {
        throw error;
    }

}

const filterBiggest = (listOfSongs) => {
    // listOfSong nmust be sort by ... biggest.
    listOfSongs = sortListened(listOfSongs);
    biggestArtist = listOfSongs[0].artist.name;
    const result = listOfSongs.filter(element => element.artist.name == biggestArtist);

    return result;

}

const loadBiggest = (e) => {
    try {
        updateMenuItem(initActivedElement(the_biggest.item(0)));
        removeItems_list('far');
        fetchJSON(loadSongs, jsonName, filterBiggest);

    } catch (error) {
        throw error;
    }
}

const fetchJSON = async (callback, url, callback_fetch = null) => {
    try {
        let response = await fetch(url);
        if (response.ok) {
            let listOfSongs = await response.json();
            callback(listOfSongs, callback_fetch);
            // loadSongs(listOfSongs);
        }

    } catch (error) {
        throw error;
    }
}

const updateMenuItem = (string) => {
    mItemSelected.item(0).textContent = string;

}

const initActivedElement = (element) => {
    if (activedElement != undefined){
        activedElement.classList.replace("filter_list_actived", "filter_list_inactived");
    }
    element.classList.replace("filter_list_inactived", "filter_list_actived");
    activedElement = element;
    return element.textContent
}

const initElementsDOM = () => {
    mItemSelected = document.getElementsByClassName('menu-item-selected');
    overview = document.getElementsByClassName('overview');
    top_10_Listened = document.getElementsByClassName('top-10-Listened');
    the_biggest = document.getElementsByClassName('the-biggest');
    divItemLista = document.getElementsByClassName('lista');
}

const initEventListener = () => {

    if (overview.length != 0) {
        overview.item(0).addEventListener("click", loadOverview, false);
    };
    if (top_10_Listened != 0) {
        top_10_Listened.item(0).addEventListener("click", loadTenListened, false);
    };
    if (the_biggest.length != 0) {
        the_biggest.item(0).addEventListener("click", loadBiggest, false);
    };

}
const removeItems_list = (className) => {

    items = document.getElementsByClassName(className);
    Array.from(items).forEach(element => { element.remove() });
}




const init = () => {
    try {

        //init elements
        initElementsDOM();
        initEventListener();

        updateMenuItem(initActivedElement(overview.item(0)));
        fetchJSON(loadSongs, "./music.json", sortListened);


    } catch (error) {
        console.error(error);
    }

}

let listOfSongs_test = [
    {
        "name": "The Less I Know the Better",
        "duration": "0",
        "listeners": "439958",
        "mbid": "",
        "url": "https://www.last.fm/music/Tame+Impala/_/The+Less+I+Know+the+Better",
        "artist": {
            "name": "Tame Impala",
            "mbid": "63aa26c3-d59b-4da4-84ac-716b54f1ef4d",
            "url": "https://www.last.fm/music/Tame+Impala"
        },
        "@attr": {
            "rank": "0"
        },
        "genre": "reggae"
    },
    {
        "name": "Creep",
        "duration": "239",
        "listeners": "1647583",
        "mbid": "d11fcceb-dfc5-4d19-b45d-f4e8f6d3eaa6",
        "url": "https://www.last.fm/music/Radiohead/_/Creep",
        "artist": {
            "name": "Radiohead",
            "mbid": "a74b1b7f-71a5-4011-9441-d0b5e4122711",
            "url": "https://www.last.fm/music/Radiohead"
        },
        "@attr": {
            "rank": "1"
        },
        "genre": "jazz"
    }];

let mItemSelected, overview, top_10_Listened, the_biggest;
let divItemLista;
let activedElement

const jsonName = "./music.json";

window.onload = init;

