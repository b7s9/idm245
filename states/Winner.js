gameObj.Winner = function (game) {};

gameObj.Winner.prototype = {
  create: function () {
    // console.log('State - Winner');

    this.add.sprite(0, 0, 'rainbow');

    let winnerScreen = this.add.sprite(this.world.centerX, this.world.centerY, 'jumbotron');
    winnerScreen.anchor.setTo(0.5, 0.5);

    let replay = this.add.sprite(this.world.centerX, 539, 'replay');
    replay.anchor.setTo(0.5, 0);

    gameObj.Winner.applauseSound = this.add.audio('applause');
    gameObj.Winner.applauseSound.play();
    // decoding callback isnt working for some reason. 
    // this sound is being preloaded so its fine
    
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

    let timerGameText = this.add.text(640, 313, gameObj.timer.str, gameInfoStyle);
    let scoreGameText = this.add.text(640, 383, gameObj.score, gameInfoStyle);

    timerGameText.anchor.setTo(1, 0);
    scoreGameText.anchor.setTo(1, 0);
  },
  update: function() {
    if (this.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR) ){
      gameObj.score = 0;
      gameObj.timer.str = '02:00';
      gameObj.timer.seconds = 120;
      gameObj.Winner.applauseSound.stop();
      this.state.start('Play');
    }
  }
};
