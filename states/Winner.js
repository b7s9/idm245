gameObj.Winner = function (game) {};

gameObj.Winner.prototype = {
  create: function () {
    console.log('State - Winner');

    this.add.sprite(0, 0, 'rainbow');

    let winnerScreen = this.add.sprite(this.world.centerX, this.world.centerY, 'jumbotron');
    winnerScreen.anchor.setTo(0.5, 0.5);

    let replay = this.add.sprite(this.world.centerX, 539, 'replay');
    replay.anchor.setTo(0.5, 0);
    
    //The numbers given in parameters are the indexes of the frames, in this order: OVER, OUT, DOWN
    var btReplay = this.add.button(9, 600, 'replayButton', this.replayFun, this, 1, 0, 2);

    let labelStyle = {
      fill: '#272727',
      font: 'Press Start 2P',
      fontSize: 18
    }

    let gameInfoStyle = {
      fill: '#272727',
      font: 'Press Start 2P',
      fontSize: 24
    }
    
    let timerLabel = this.add.text(406, 313, 'Time', labelStyle);
    let scoreLabel = this.add.text(407, 389, 'Hits', labelStyle);

    timer = this.add.text(640, 313, gameObj.gTime, gameInfoStyle);
    score = this.add.text(640, 383, gameObj.gScore, gameInfoStyle);

    timer.anchor.setTo(1, 0);
    score.anchor.setTo(1, 0);
  },
  replayFun: function () {
    console.log('replayFun called');
    this.state.start('Play');
  }
};
