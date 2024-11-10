export class player{
    board;
    constructor(){
      this.board = this.Emptyboard();
    }

    Emptyboard(){
        let board = [];
         for (let i = 0; i < 15; i++) {
        const row = []; 
        for (let j = 0; j < 15; j++) {
          row.push(0);
        }
        board.push(row);
      }
      return board;
    }

    AppleGenerator(){
        return [Math.floor(Math.random() * 15),Math.floor(Math.random() * 15)];
    }
}