// // fetch("./music.json")
//         //     .then(res => res.json())
//         //     .then(data => console.log(data[0].name))



class Song {
    constructor() {
    }

    setItemLi(element, odd) {
        let txtHTML = this.getNewElement(this.group, this.url_group, this.title, this.listeners, odd)
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
    getNewElement(group, url, title, listeners, odd = null) {
        let classood = '';
        if (odd != null) { classood = (odd) ? 'odd' : ''; }

        let txtHTML = `<li class="far fa-play-circle ${classood}">
    <a class="group-name" title="Ir al Grupo" href=${url}>${group}</a>
    <a class="song-title">${title}</a>
    <div class="listeners">${listeners} listeners</div></li>`

        return txtHTML;
    }

}

const printSongs = (listOfSongs) => {

    const song = new Song();
    let i = 1;
    listOfSongs.forEach(element => {
        song.setItemSongTitle(element.name);
        song.setListeners(element.listeners);
        even = (i % 2);

        song.setItemGroupName(element.artist.name, element.artist.url);

        song.setItemLi(divItemLista, even);
        i++;

    });

}

const loadSongs = (listOfSongs, callback = null) => {

    try {
        if (callback != null) { listOfSongs = callback(listOfSongs) }
        printSongs(listOfSongs);

    } catch (error) {
        throw error;
    }
}

const loadOverview = () => {
    try {
        updateMenuItem(activateElement(overview.item(0)));
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
    try {
        listOfSongs.sort(function (a, b) {
            return b.listeners - a.listeners;
        });
        return listOfSongs;

    } catch (error) {
        throw error;
    }

}

const sortRanking = (listOfSongs) => {
    try {
        listOfSongs.sort(function (a, b) {
            return b["@attr"].rank > a["@attr"].rank;
        });
        return listOfSongs;

    } catch (error) {
        throw error;
    }
}

const loadTenListened = () => {
    try {
        updateMenuItem(activateElement(top_10_Listened.item(0)));
        removeItems_list('far');
        fetchJSON(loadSongs, jsonName, sortTenListened);
        //  loadSongs(listOfSongs_test, sortTenListened);

    } catch (error) {
        throw error;
    }

}

const filterGenre = (listOfSongs, genre) => {

    const result = listOfSongs.filter(element => element.genre == genre);
    return result;
}

const loadSongsByGener = (listOfSongs, callback = null) => {
    try {
        if (callback != null) { listOfSongs = callback(listOfSongs) }
        return listOfSongs;

    } catch (error) {
        throw error;
    }
}

const loadGenre = async (e) => {
    try {
        let genre = e.target.textContent;
        updateMenuItem(genre);
        initActivedElement();
        removeItems_list('far');
        listOfSongs = await fetchJSON(loadSongsByGener, jsonName);
        listOfSongs = filterGenre(listOfSongs, genre);
        printSongs(listOfSongs);

    } catch (error) {
        throw error;
    }
}

const filterBiggest = (listOfSongs) => {
    try {
        
        listOfSongs = sortListened(listOfSongs);
        biggestArtist = listOfSongs[0].artist.name;
        const result = listOfSongs.filter(element => element.artist.name == biggestArtist);

        return result;

    } catch (error) {
        throw error;
    }

}

const loadBiggest = (e) => {
    try {
        updateMenuItem(activateElement(the_biggest.item(0)));
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
            return callback(listOfSongs, callback_fetch);
            // loadSongs(listOfSongs);
        }

    } catch (error) {
        throw error;
    }
}

const updateMenuItem = (string) => {
    mItemSelected.item(0).textContent = string;

}

const activateElement = (element) => {
    initActivedElement();
    element.classList.replace("filter_list_inactived", "filter_list_actived");
    activedElement = element;
    return element.textContent

}

const initActivedElement = () => {
    if (activedElement != undefined) {
        activedElement.classList.replace("filter_list_actived", "filter_list_inactived");
    }
}

const initElementsDOM = () => {
    mItemSelected = document.getElementsByClassName('menu-item-selected');
    overview = document.getElementsByClassName('overview');
    top_10_Listened = document.getElementsByClassName('top-10-Listened');
    the_biggest = document.getElementsByClassName('the-biggest');
    divItemLista = document.getElementsByClassName('lista');

    genres = document.getElementsByClassName('bckimage');

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

    if (genres.length != 0) {
        Array.from(genres).forEach(element => {
            element.addEventListener("click", loadGenre, false);
        })
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

        updateMenuItem(activateElement(overview.item(0)));
        fetchJSON(loadSongs, "./music.json", sortListened);


    } catch (error) {
        console.error(error);
    }

}

let mItemSelected, overview, top_10_Listened, the_biggest;
let divItemLista;
let activedElement;
let genres;

const jsonName = "./music.json";

window.onload = init;

