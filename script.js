class Song {
   
    constructor(datos) {
        this.group = datos.artist.name ? datos.artist.name : null;
        this.url = datos.artist.url ? datos.artist.url : null;
        this.title = datos.name ? datos.name : null;
        this.genre = datos.genre ? datos.genre : null;
        this.listeners = datos.listeners ? datos.listeners : null;
    }

    static songs = [];

    setItemLi() {
        let li = document.createElement('li');
        li.classList.add('far', 'fa-play-circle');
        return li;
    }

    setItemGroupName(group, url) {
        let aGroup = document.createElement('a');
        aGroup.classList.add('group-name');
        aGroup.setAttribute('title', 'Ir al Grupo');
        aGroup.setAttribute('href', url);
        let content = document.createTextNode(group);
        aGroup.appendChild(content);
        return aGroup;
    }

    setItemSongTitle(title) {
        let aSong = document.createElement('a');
        aSong.classList.add('song-title');
        let content = document.createTextNode(title);
        aSong.appendChild(content);
        return aSong;
    }

    setListeners(listeners) {
        let divListen = document.createElement('div');
        let span = document.createElement('span');
        divListen.classList.add('listeners');
        let content = document.createTextNode(listeners);
        let info = document.createTextNode("listeners");
        divListen.appendChild(content);
        span.appendChild(info);
        divListen.appendChild(span);
        return divListen;
    }

    getNewElement(group, url, title, listeners) {
        let eleLi = setItemLi();
        let eleAgroup = setItemGroupName(group, url);
        let eleAsong = setItemSongTitle(title);
        let eleDivListeners = setListeners(listeners);
        eleLi.appendChild(eleAgroup);
        eleLi.appendChild(eleAsong);
        eleLi.appendChild(eleDivListeners);
        return eleLi;
    }

}



const loadSongs = (arraySongs) => { 
    let ulLista = document.querySelector('.lista');
    for (const obj of arraySongs) {
        let li = getNewElement(obj.artist.name, obj.artist.url, obj.name, obj.listeners);
        ulLista.appendChild(li);
    }
}

const loadOverview = () => {
}

const loadTenListened = () => {

}

const loadBiggest = (e) => {

}

const urlFetch = async () => {
    try {
        //fetch metodo  asincrono  este retorna una promesa que "espera" a que esa promesa se resuelva
        let response = await (fetch('./music.json'));
        if (response.ok) {//true
            //la respuesta asincrona, "espera" y  se convierte a json
            let responseData = await response.json();
       
            responseData.forEach(data => {
                let obj = new Song(data);
                songs.push(obj);
            });
            loadSongs(Song.songs);
        } else {
            throw new Error(`error! status: ${response.status}`);
        }
    } catch (err) {
        throw new Error(`HTTP error! status: ${err}`);
    }
}

//
const init = async () => {
    urlFetch();
}


window.onload = init;

