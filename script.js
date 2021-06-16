class Song {

    static cont = 0;//variable de clase
    constructor(datos) {
        this.genre = datos.genre;
        this.group = datos.group;
        this.listeners = datos.listeners;
        this.title = datos.title;
        this.url = datos.url;
        Song.cont++ ;
    }   


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

    getNewElement(id, group, url, title, listeners) {
        let eleLi = this.setItemLi();
        let eleAgroup = this.setItemGroupName(group, url);
        let eleAsong = this.setItemSongTitle(title);
        let eleDivListeners = this.setListeners(listeners);

        let span = document.createElement('span');
        let numberSong = document.createTextNode(id+".");
        span.appendChild(numberSong);

        eleLi.appendChild(span);
        eleLi.appendChild(eleAgroup);
        eleLi.appendChild(eleAsong);
        eleLi.appendChild(eleDivListeners);
        return eleLi;
    }

}

let songs = [];//array original global

const loadSongs = (arraySongs) => { 
    let ulLista = document.querySelector('.lista');
    ulLista.innerHTML = '';//resetea el contenido
    for (const obj of arraySongs) {
        let li = obj.getNewElement(obj.cont, obj.group, obj.url, obj.title, obj.listeners);
        ulLista.appendChild(li);
    }
}

const loadOverview = () => {
    document.querySelector('.menu-item-selected').innerHTML = "Overwiew";
    loadSongs(songs);
}

const loadTenListened = () => {
    //slice devuelve los elementos de un array pero sin argumentos los devuelve todos, obteniendo una copia.
    let copyDirty = songs.slice();
    //ordena array de objetos con la propiedad listeners de forma descendente
    copyDirty.sort((first, second) => {return second.listeners - first.listeners});//orden descendente
    let copyClean = copyDirty.slice(0,10);//top 10
    document.querySelector('.menu-item-selected').innerHTML = "Top 10 Listened";

    loadSongs(copyClean);
}



const loadBiggest = (e) => {
    document.querySelector('.menu-item-selected').innerHTML = "The Biggest";
    let array =[];
    songs.map( ( song ) =>{
        repeat =  array.find( function(f){
            if(f.group === song.group){
                 //song.listeners = parseInt(f.listeners)+parseInt(song.listeners);
                return f;
            }
          });
          if(!repeat){
              array.push(new Song( song ));
          }
    }) ;
    array.sort((first, second) => {return second.listeners - first.listeners});//orden descendente
    loadSongs(array);
}

const loadSongsByGenre = (e) => {
    let genreSelected = e.currentTarget.dataset.genre;//extraer el valor data cuando se activa el evento click
    document.querySelector('.menu-item-selected').innerHTML = genreSelected;
    let newArrayFilterByGenre = songs.filter(genero => genero.genre === genreSelected);//filtra por el genero que recoge el data del ancor clickado
    loadSongs(newArrayFilterByGenre); 
}




const urlFetch = async () => {
    try {
        //fetch metodo  asincrono  este retorna una promesa que "espera" a que esa promesa se resuelva
        let response = await (fetch('./music.json'));
        if (response.ok) {//true
            //la respuesta asincrona, "espera" y  se convierte a json
            let responseData = await response.json();
            for (const obj of responseData) {
                let constructorObject = {genre: obj.genre ? obj.genre : null,group: obj.artist.name ? obj.artist.name : null,listeners: obj.listeners ? obj.listeners : null,title: obj.name ? obj.name : null,url: obj.artist.url ? obj.artist.url : null,}
                let objSong = new Song(constructorObject);
                songs.push(objSong);
            }
            loadOverview();
        } else {
            throw `error! status: ${response.status}`;
        }
    } catch (err) {
        throw `HTTP error! status: ${err}`;
    }
}


const init =  () => {
    document.querySelector('.menu-item-selected').title.innerHTML = "Overwiew";
    urlFetch();
    document.querySelector('.overview').addEventListener('click', loadOverview);
    document.querySelector('.top').addEventListener('click', loadTenListened);
    document.querySelector('.biggest').addEventListener('click', loadBiggest);

    //evento generos
    document.querySelectorAll('.list-genero>li>a').forEach( ele => { ele.addEventListener('click', loadSongsByGenre); });

}


window.onload = init;

/* let array =[];
let repeat;
let fans;
let res = songs.reduce( ( acc ,song ) =>{
     repeat =  acc.find( function(f){
        if(f.group === song.group){
             fans = parseInt(f.listeners)+parseInt(song.listeners);
            return f;
        }
      });
      if(!repeat){
        array.push({
            genre : song.genre,
            group : song.group,
            listeners : fans,
            title : song.title,
            url : song.url
        });
        ;
      }
        
      return  acc; 
},[]) ;
console.log(array); */