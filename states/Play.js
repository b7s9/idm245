gameObj.Play = function (game) {
  // var txScore;
  // var timerObj;
  // var timerSeconds;

  // var txTime;
};

gameObj.Play.prototype = {
  create: function () {
    console.log('State - Play');

    this.stage.backgroundColor = '#fff';

    this.add.sprite(0, 100, 'background');
    this.add.sprite(291, 300, 'jumbotron');

    this.add.sprite(100, 0, 'icicles');
    this.add.sprite(300, 0, 'icicles');
    this.add.sprite(500, 0, 'icicles');
    this.add.sprite(700, 0, 'icicles');

    this.add.sprite(120, 200, 'ice');

    eskimo = this.add.sprite(532, 696, 'eskimo');
    eskimo.anchor.setTo(0,1);

    // Add walking mummy
    // var sMummy = this.add.sprite(300, 200, 'mummy');
    //  Here we add a new animation called 'walk'
    //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'mummy' sprite sheet
    // var walk = sMummy.animations.add('walk');
    //  And this starts the animation playing by using its key ("walk")
    //  30 is the frame rate (30fps)
    //  true means it will loop when it finishes
    // sMummy.animations.play('walk', 30, true);

    //The numbers given in parameters are the indexes of the frames, in this order: OVER, OUT, DOWN
    var btWin = this.add.button(10, 600, 'winButton', this.winnerFun, this, 1, 0, 2);
    var btLose = this.add.button(110, 600, 'loseButton', this.loserFun, this, 1, 0, 2);
    var btPoints = this.add.button(210, 600, 'pointsButton', this.pointsFun, this, 1, 0, 2);

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
    
    let timerLabel = this.add.text(406, 363, 'Time', labelStyle);
    let scoreLabel = this.add.text(407, 429, 'Hits', labelStyle);

    timer = this.add.text(640, 357, gameObj.gTime, gameInfoStyle);
    score = this.add.text(640, 423, gameObj.gScore, gameInfoStyle);

    timer.anchor.setTo(1, 0);
    score.anchor.setTo(1, 0);

    timerSeconds = 4;
    timerObj = this.time.create(false);
    timerObj.loop(1000, this.updateTimerFun, this);
    timerObj.start();
  },
  update: function() {
    // core game funcitonality, player input, collisions, score
    if (this.input.keyboard.isDown(Phaser.KeyCode.LEFT) ){
      eskimo.x -= 6;
    }else if (this.input.keyboard.isDown(Phaser.KeyCode.RIGHT) ){
      eskimo.x += 6;
    }
  },
  winnerFun: function () {
    // console.log('winnerFun called');
    this.state.start('Winner');
  },
  loserFun: function () {
    // console.log('loserFun called');
    this.state.start('Loser');
  },
  pointsFun: function () {
    // console.log('pointsFun called');
    gameObj.gScore += 10;
    score.text = gameObj.gScore;
  },
  updateTimerFun: function () {
    // console.log('updateTimerFun called');
    timerSeconds--;
    // txTime.text = timerSeconds;
    timerMinutes = Math.floor(timerSeconds / 60);
    displaySeconds = timerSeconds % 60;

    // gameObj.gTime = `0${timerMinutes}:${displaySeconds}`;
    gameObj.gTime = '0' + timerMinutes + ':' + ( (displaySeconds < 10) ? '0'+displaySeconds : displaySeconds );
    timer.text = gameObj.gTime;
    

    // console.log(gameObj.gScore);
    if(timerSeconds <= 0){
      gameObj.gScore < 2 ? this.state.start('Loser') : this.state.start('Winner');
    }
  }
};
