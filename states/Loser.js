gameObj.Loser = function (game) {};

gameObj.Loser.prototype = {
  create: function () {
    // console.log('State - Loser');
    
    this.stage.backgroundColor = '#000';
    
    let loserScreen = this.add.sprite(this.world.centerX, this.world.centerY, 'jumbotron');
    loserScreen.anchor.setTo(0.5, 0.5);

    let replay = this.add.sprite(this.world.centerX, 539, 'replay');
    replay.anchor.setTo(0.5, 0);

    let deadEskimo = this.add.sprite(700, 140, 'deadEskimo');

    gameObj.Loser.booSound = this.add.audio('boo');
    // is audio loaded???????????????????
    gameObj.Loser.soundLoadedFlag = 0;

    this.sound.setDecodedCallback([gameObj.Loser.booSound], this.soundLoadedHandler, this);

    gameObj.Loser.soundLoadedFlag ? gameObj.Loser.booSound.play() : console.log('oh fuck theres no sound');
    
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

    let msgStyle = {
      fill: '#545454',
      font: 'Press Start 2P',
      fontSize: 20
    };
    
    let timerLabel = this.add.text(406, 313, 'Time', labelStyle);
    let scoreLabel = this.add.text(407, 389, 'Hits', labelStyle);

    let timerGameText = this.add.text(640, 313, gameObj.timer.str, gameInfoStyle);
    let scoreGameText = this.add.text(640, 383, gameObj.score, gameInfoStyle);

    timerGameText.anchor.setTo(1, 0);
    scoreGameText.anchor.setTo(1, 0);
  
    let msg = this.add.text(this.world.centerX, 100, 'Could be better...', msgStyle);
    msg.anchor.setTo(0.5, 0);

  },
  update: function() {
    // core game funcitonality, player input, collisions, score
    if (this.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR) ){
      gameObj.score = 0;
      gameObj.timer.str = '02:00';
      gameObj.timer.seconds = 120;
      gameObj.Loser.booSound.stop();
      this.state.start('Play');
    }
  },
  soundLoadedHandler: function() {
    gameObj.Loser.soundLoadedFlag = 1;
  }
};
