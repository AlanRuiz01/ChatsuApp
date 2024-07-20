import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage  {

  constructor() { }

  Groups = [
    {
      name: "Videojuegos",
      description: "Entérate de lanzamientos de videjuegos, conoce gente geek, habla sobre tus juegos favoritos.",
      icon: "assets/icon/videogames.svg"
    },
    {
      name: "Anime",
      description: "Debate los mejores animes de la temporada, descubre animes que no habías visto con la comunidad.",
      icon: "assets/icon/anime.svg"
    },
    {
      name: "Source Following",
      description: "Una comunidad enteramente de fans de Valve, juega a títulos de la desarrolladora con nuevos amigos.",
      icon: "assets/icon/Counter.svg"
    },
    {
      name: "Música",
      description: "Charla de la carrera de tus artistas favoritos, descubre nuevos géneros musicales, artistas y grupos.",
      icon: "assets/icon/music.svg"
    },
    {
      name: "Cine",
      description: "Habla sobre cine y directores de película, asiste de la nueva cartelera con los miembros de la comunidad.",
      icon: "assets/icon/cine.svg"
    }
  ];

}
