export class Game {
    private gameStatus:any;

    constructor() {
       this.setGameStatus({over:false,result:null});
    }    
    
    getGameStatus() {
       return this.gameStatus;
    }

    setGameStatus(status) {
       this.gameStatus = status;
       // this.gameStatus.result = status.result;
    }
    
    

   
}