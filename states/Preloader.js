gameObj.Preloader = function (game) {};

gameObj.Preloader.prototype = {
  preload: function () {
    // console.log("State - Preloader");
    this.stage.backgroundColor = '#333';

    // Progress bar animation code
    this.preloadBar = this.add.sprite((960 - 418) / 2, (720 - 95) / 2, 'preloaderBar');
    this.load.setPreloadSprite(this.preloadBar);
    this.load.spritesheet('playButton', 'img/play_button.png', 180, 90);

    // Load ALL GAME images into memory
    this.load.image('instructions', 'img/instructions.png');

    this.load.image('background', 'img/hills.png');
    this.load.image('jumbotron', 'img/jumbotron.png');
    this.load.image('icicles', 'img/icicles.png');
    this.load.image('eskimo', 'img/eskimo.png');
    // this.load.spritesheet('eskimo', 'img/eskimo-sprite.png', 100, 140);
    this.load.image('ice', 'img/falling-ice.png');
    
    this.load.image('deadEskimo', 'img/dead-eskimo.png');
    this.load.image('replay', 'img/replay.png');
    this.load.image('rainbow', 'img/rainbow.png');

    this.load.spritesheet('replayButton', 'img/replay_button.png', 180, 90);
    this.load.spritesheet('playButton', 'img/play_button.png', 180, 90);

    //  Load the Google WebFont Loader script
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    //  37x45 is the size of each frame
    //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, but in this case there are some
    //  blank frames at the end, so we tell the loader how many to load
    // this.load.spritesheet('mummy', 'img/metalslug_mummy37x45.png', 37, 45, 18);

    // Load temp buttons
    this.load.spritesheet('winButton', 'img/btn_win.png', 90, 90);
    this.load.spritesheet('loseButton', 'img/btn_lose.png', 90, 90);
    this.load.spritesheet('pointsButton', 'img/btn_points.png', 90, 90);

    this.load.audio('impact', 'snd/impact.mp3');
    this.load.audio('applause', 'snd/applause.mp3');
    this.load.audio('boo', 'snd/boo.mp3');

  },
  create: function () {
    // Comment out the line below to check preloader animation
    this.state.start('Intro');
  }
};
