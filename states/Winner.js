gameObj.Winner = function (game) {};

gameObj.Winner.prototype = {
  create: function () {
    // console.log('State - Winner');

    this.add.sprite(0, 0, 'rainbow');

    let winnerScreen = this.add.sprite(this.world.centerX, this.world.centerY, 'jumbotron');
    winnerScreen.anchor.setTo(0.5, 0.5);

    let replay = this.add.sprite(this.world.centerX, 539, 'replay');
    replay.anchor.setTo(0.5, 0);

    applauseSound = this.add.audio('applause');
    // is audio loaded???????????????????
    soundLoadedFlag = 0;
    applauseSound.play()
    // this.sound.setDecodedCallback([applauseSound], this.soundLoadedHandler, this);

    // soundLoadedFlag ? applauseSound.play() : console.log('oh fuck theres no sound');
    
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
  update: function() {
    if (this.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR) ){
      gameObj.gScore = 0;
      gameObj.gTime = '02:00';
      timerSeconds = 120;
      applauseSound.stop();
      this.state.start('Play');
    }
  }
};
