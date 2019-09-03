gameObj.Play = function () {
};

gameObj.Play.prototype = {
  
  create: function () {
    // console.log('State - Play');

    // ---------------------- Add sprites ----------------------

    this.stage.backgroundColor = '#fff';

    this.add.sprite(0, 100, 'background');
    this.add.sprite(291, 300, 'jumbotron');

    this.add.sprite(100, 0, 'icicles');
    this.add.sprite(300, 0, 'icicles');
    this.add.sprite(500, 0, 'icicles');
    this.add.sprite(700, 0, 'icicles');

    gameObj.Play.eskimo = this.add.sprite(532, 696, 'eskimo');
    gameObj.Play.eskimo.anchor.setTo(0,1);
    this.physics.enable(gameObj.Play.eskimo, Phaser.Physics.ARCADE);

    this.physics.setBoundsToWorld(true, true, true, true, false);
    gameObj.Play.eskimo.body.collideWorldBounds = true;

    // ---------------------- Bullet stuff ----------------------

    // Define constants
    
    gameObj.Play.SHOT_DELAY = 100; // milliseconds (10 bullets/second)
    gameObj.Play.NUMBER_OF_BULLETS = 30
    // Create an object pool of bullets
    gameObj.Play.bulletPool = this.add.group();
    for(var i = 0; i < gameObj.Play.NUMBER_OF_BULLETS; i++) {
        this.createBullet();
    }

    // Add walking mummy
    // var sMummy = this.add.sprite(300, 200, 'mummy');
    //  Here we add a new animation called 'walk'
    //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'mummy' sprite sheet
    // var walk = sMummy.animations.add('walk');
    //  And this starts the animation playing by using its key ("walk")
    //  30 is the frame rate (30fps)
    //  true means it will loop when it finishes
    // sMummy.animations.play('walk', 30, true);

    // ---------------------- Text and Timer ----------------------

    //The numbers given in parameters are the indexes of the frames, in this order: OVER, OUT, DOWN
    // var btWin = this.add.button(10, 600, 'winButton', this.winnerFun, this, 1, 0, 2);
    // var btLose = this.add.button(110, 600, 'loseButton', this.loserFun, this, 1, 0, 2);
    // var btPoints = this.add.button(210, 600, 'pointsButton', this.pointsFun, this, 1, 0, 2);

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

    gameObj.Play.impactSound = this.add.audio('impact');
    // is audio loaded???????????????????
    gameObj.Play.soundLoadedFlag = 0;

    this.sound.setDecodedCallback([gameObj.Play.impactSound], this.soundLoadedHandler, this);
    
    let timerLabel = this.add.text(406, 363, 'Time', labelStyle);
    let scoreLabel = this.add.text(407, 429, 'Hits', labelStyle);

    gameObj.Play.timerGameText = this.add.text(640, 357, gameObj.timer.str, gameInfoStyle);
    gameObj.Play.scoreGameText = this.add.text(640, 423, gameObj.score, gameInfoStyle);

    gameObj.Play.timerGameText.anchor.setTo(1, 0);
    gameObj.Play.scoreGameText.anchor.setTo(1, 0);

    gameObj.timer.seconds = 120;
    let timerObj = this.time.create(false);
    timerObj.loop(1000, this.updateTimerFun, this);
    timerObj.start();

    // recursive function ends when Play state ends
    this.updateIcicleTimer();

  },
  update: function() {

    // core game funcitonality, player input, collisions, score
    if (this.input.keyboard.isDown(Phaser.KeyCode.LEFT) ){
      gameObj.Play.eskimo.body.acceleration.x = -500;    
      // gameObj.Play.eskimo.setFrame(1);
      // gameObj.Play.eskimo.body.velocity > 300 ? gameObj.Play.eskimo.frame = 2 : gameObj.Play.eskimo.frame = 4;

    }else if (this.input.keyboard.isDown(Phaser.KeyCode.RIGHT) ){
      gameObj.Play.eskimo.body.acceleration.x = 500;      
      gameObj.Play.eskimo.body.velocity > 300 ? gameObj.Play.eskimo.frame = 3 : gameObj.Play.eskimo.frame = 5;
    }else {
      gameObj.Play.eskimo.body.acceleration.x = 0;
      // gameObj.Play.eskimo.setFrame(1);

    }

    this.physics.arcade.collide(gameObj.Play.bulletPool, gameObj.Play.eskimo, this.collisionHandler, null, this);
  },
  shootBullet: function(x, v) {
    // Enforce a short delay between shots by recording
    // the time that each bullet is shot and testing if
    // the amount of time since the last shot is more than
    // the required delay.
    if (typeof this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
    if (this.time.now - this.lastBulletShotAt < gameObj.Play.SHOT_DELAY) return;
    this.lastBulletShotAt = this.time.now;

    // Get a dead bullet from the pool
    let bullet = gameObj.Play.bulletPool.getFirstDead();

    // If there aren't any bullets available then don't shoot
    if (bullet === null || bullet === undefined) return;

    // Revive the bullet
    // This makes the bullet "alive"
    bullet.revive();

    // Bullets should kill themselves when they leave the world.
    // Phaser takes care of this for me by setting this flag
    // but you can do it yourself by killing the bullet if
    // its x,y coordinates are outside of the world.
    bullet.checkWorldBounds = true;
    bullet.outOfBoundsKill = true;

    bullet.reset(x, -50);
    bullet.rotation = 1.5;

    // Shoot it in the right direction
    bullet.body.velocity.x = Math.cos(bullet.rotation) * v;
    bullet.body.velocity.y = Math.sin(bullet.rotation) * v;
  },
  createBullet: function () {
    // Create each bullet and add it to the group.
    let bullet = this.add.sprite(0, 0, 'ice');
    // let icicleShimmer = bullet.animations.add('icicleShimmer');
    // bullet.animations.play('icicleShimmer', 15, true);
    gameObj.Play.bulletPool.add(bullet);

    // Set its pivot point to the center of the bullet
    bullet.anchor.setTo(0.5, 0.5);

    // Enable physics on the bullet
    this.physics.enable(bullet, Phaser.Physics.ARCADE);

    // Set its initial state to "dead".
    bullet.kill();
  },
  collisionHandler: function (target, bullet) {
    target.body.velocity.y = 0;
    target.body.velocity.x = 0;
    bullet.kill();

    gameObj.Play.soundLoadedFlag ? gameObj.Play.impactSound.play() : console.log('oh fuck theres no sound');

    gameObj.score++;
    gameObj.Play.scoreGameText.text = gameObj.score;
  },
  winnerFun: function () {
    this.state.start('Winner');
  },
  loserFun: function () {
    this.state.start('Loser');
  },
  pointsFun: function () {
    gameObj.score++;
    gameObj.Play.scoreGameText.text = gameObj.score;
  },
  updateTimerFun: function () {
    gameObj.timer.seconds--;
    let timerMinutes = Math.floor(gameObj.timer.seconds / 60);
    let displaySeconds = gameObj.timer.seconds % 60;

    gameObj.timer.str = '0' + timerMinutes + ':' + ( (displaySeconds < 10) ? '0'+displaySeconds : displaySeconds );
    gameObj.Play.timerGameText.text = gameObj.timer.str;
    
    if(gameObj.timer.seconds <= 0){
      gameObj.score > 3 ? this.state.start('Loser') : this.state.start('Winner');
    }
  },
  updateIcicleTimer: function(){
    
    let t = 200 * (gameObj.timer.seconds / 120) + 600 ;
    
    if(t >= 600){
      this.time.events.add(t, this.updateIcicleTimer, this)
    }else{
      return false;
    }

    // x value of icicle drop
    let x = Math.floor( (this.rnd.integerInRange(0,100) / 100) * this.game.width);
    // drop velocity
    // y = m * x^2 * r + b
    // coeficient (200) * x^2 (inverse percentage of time remaining)^2 * random scalar [0,3] + b [80, 400]
    let v =  200 * Math.pow( 1 - (gameObj.timer.seconds / 120), 2 ) * Math.floor(Math.random() * 3) + this.rnd.integerInRange(80,400)
    this.shootBullet(x, v);
  },
  soundLoadedHandler: function() {
    gameObj.Play.soundLoadedFlag = 1;
  }
};
