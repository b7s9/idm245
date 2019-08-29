gameObj.Play = function (game) {
  // var txScore;
  // var timerObj;
  // var timerSeconds;

  // var txTime;
};

gameObj.Play.prototype = {
  create: function () {
    console.log('State - Play');

    // ---------------------- Add sprites ----------------------

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
    this.physics.enable(eskimo, Phaser.Physics.ARCADE);

    this.physics.setBoundsToWorld(true, true, true, true, false);
    eskimo.body.collideWorldBounds = true;

    // ---------------------- Bullet stuff ----------------------

    // Define constants
    SHOT_DELAY = 100; // milliseconds (10 bullets/second)
    BULLET_SPEED = 300; // pixels/second
    NUMBER_OF_BULLETS = 20;

    gun = this.game.add.sprite(50, this.game.height/2, 'ice');

    // Set the pivot point to the center of the gun
    gun.anchor.setTo(0.5, 0.5);

    // Create an object pool of bullets
    bulletPool = this.add.group();
    for(var i = 0; i < NUMBER_OF_BULLETS; i++) {
        this.createBullet();
    }

    // Simulate a pointer click/tap input at the center of the stage
    // when the example begins running.
    this.input.activePointer.x = this.width/2;
    this.input.activePointer.y = this.height/2;

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

    timerSeconds = 120;
    timerObj = this.time.create(false);
    timerObj.loop(1000, this.updateTimerFun, this);
    timerObj.start();
  },
  update: function() {
    // core game funcitonality, player input, collisions, score
    if (this.input.keyboard.isDown(Phaser.KeyCode.LEFT) ){
      eskimo.body.velocity.x = -600;      
    }else if (this.input.keyboard.isDown(Phaser.KeyCode.RIGHT) ){
      eskimo.body.velocity.x = 600;      
    }else {
      eskimo.body.velocity.x = 0;
    }

    gun.rotation = this.physics.arcade.angleToPointer(gun);

    // Shoot a bullet
    if (this.input.activePointer.isDown) {
        this.shootBullet();
    }

    this.physics.arcade.collide(bulletPool, eskimo, this.collisionHandler, null, this);
  },
  shootBullet: function() {
    // Enforce a short delay between shots by recording
    // the time that each bullet is shot and testing if
    // the amount of time since the last shot is more than
    // the required delay.
    if (typeof this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
    if (this.time.now - this.lastBulletShotAt < SHOT_DELAY) return;
    this.lastBulletShotAt = this.time.now;

    // Get a dead bullet from the pool
    var bullet = bulletPool.getFirstDead();

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

    // Set the bullet position to the gun position.
    bullet.reset(gun.x, gun.y);
    bullet.rotation = gun.rotation;

    // Shoot it in the right direction
    bullet.body.velocity.x = Math.cos(bullet.rotation) * BULLET_SPEED;
    bullet.body.velocity.y = Math.sin(bullet.rotation) * BULLET_SPEED;
  },
  createBulletPool: function() {

  },
  createBullet: function () {
    // Create each bullet and add it to the group.
    var bullet = this.add.sprite(0, 0, 'ice');
    bulletPool.add(bullet);

    // Set its pivot point to the center of the bullet
    bullet.anchor.setTo(0.5, 0.5);

    // Enable physics on the bullet
    this.physics.enable(bullet, Phaser.Physics.ARCADE);

    // Set its initial state to "dead".
    bullet.kill();
  },
  collisionHandler: function (target, bullet) {
    // console.log('bullet collided w you');
    target.body.velocity.y = 0;
    target.body.velocity.x = 0;
    bullet.kill();

    gameObj.gScore++;
    score.text = gameObj.gScore;
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
    gameObj.gScore++;
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
      gameObj.gScore > 3 ? this.state.start('Loser') : this.state.start('Winner');
    }
  }
};
