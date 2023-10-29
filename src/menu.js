import RoadFighters from './road-fighters';

export default class Menu {
  constructor(sk) {
    this.sk = sk;
    this.selectedGame = 0;
    this.games = [
      { name: 'Road Fighters', game: new RoadFighters(sk) },
    ];
  }

  draw() {
    
  }

  splash() {

  }

  handleKeyPress(keyCode) {

  }
}