class Song {
    constructor(group, url, title, listeners, genre) {
        this.group = group;
        this.url = url;
        this.title = title;
        this.listeners = listeners;
        this.genre = genre;
    }

    setItemLi() {
        let li = document.createElement('li');
        li.classList.add('far', 'fa-play-circle');
        return li;
    }

    setItemGroupName(group, url) {
        let grupo = document.createElement("a");
        grupo.classList.add("group-name");
        grupo.title = "Ir al Grupo";
        grupo.setAttribute("href", url);
        grupo.innerHTML = group;
        return grupo;
    }

    setItemSongTitle(title) {
        let titulo = document.createElement("a");
        titulo.classList.add("song-title");
        titulo.innerHTML = title;
        return titulo;
    }

    setListeners(listeners) {
        let lis = document.createElement("div");
        lis.classList.add("listeners");
        lis.innerHTML = listeners;
        return lis;
    }

    getNewElement(group, url, title, listeners) {
        let item = this.setItemLi();
        item.appendChild(this.setItemGroupName(this.group, this.url));
        item.appendChild(this.setItemSongTitle(this.title));
        item.appendChild(this.setListeners(this.listeners));
        return item;
    }

}

let songsArray = [];

const loadSongs = (songsArray) => {
    let div = document.querySelector(".container-selected");
    div.innerHTML = "";
    songsArray.forEach(i => {
        div.appendChild(i.getNewElement());
    });

}

const loadOverview = () => {
    let overview = document.querySelector(".overview");
    document.querySelector(".text-selected").innerHTML = overview.innerHTML;
    loadSongs(songsArray);
}

const loadTenListened = () => {
    let ten = [];
    ten = [...songsArray];
    ten.sort((a, b) => {
        if (a.listeners > b.listeners) {
            return 1;
        }
        if (a.listeners < b.listeners) {
            return -1;
        }
        return 0;
    });
    ten.length = 10;
    let top = document.querySelector(".top");
    document.querySelector(".text-selected").innerHTML = top.innerHTML
    loadSongs(ten);
}

const loadBiggest = (e) => {
    let biggest = document.querySelector(".biggest");
    document.querySelector(".text-selected").innerHTML = biggest.innerHTML;
    loadSongs(songsArray);
}


const loadSongsByGenre = (e) => {
    let genreSelected = e.currentTarget.innerHTML;
    console.log(genreSelected);
    document.querySelector('.text-selected').innerHTML = genreSelected;
    let filterArray = [];
    songsArray.forEach((i) => {
        if (i.genre == e.path[0].innerHTML) {
            filterArray.push(i);
        }
    });
    loadSongs(filterArray);
}

const init = () => {
    fetch("./music.json")
        .then(data => data.json())
        .then(json => {
            json.forEach(i => {
                songsArray.push(new Song(i.artist.name, i.artist.url, i.name, i.listeners, i.genre));
            });
            loadOverview();
        });

    document.querySelector(".overview").addEventListener("click", loadOverview);
    document.querySelector(".top").addEventListener("click", loadTenListened);
    document.querySelector(".biggest").addEventListener("click", loadBiggest);
    document.querySelectorAll('.container-genres>div>p').forEach(ele => { ele.addEventListener('click', loadSongsByGenre); });
}


window.onload = init;