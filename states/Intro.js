gameObj.Intro = function (game) {};

gameObj.Intro.prototype = {
  create: function () {
    // console.log('State - Intro');

    this.stage.backgroundColor = '#000';    

    let instructions = this.add.sprite(this.world.centerX, this.world.centerY, 'instructions');
    instructions.anchor.setTo(0.5, 0.5);

    let headingStyle = {
      fill: 'white',
      font: 'Press Start 2P',
      fontSize: 33
    };

    let paragraphStyle = {
      fill: 'white',
      font: 'Source Sans Pro',
      fontSize: 24
    };

    let heading = this.add.text(this.world.centerX, 100, 'Icicle Dodging Simulator', headingStyle);
    const paragraphText = 
    `
    - Dodge as many icicles as possible in two minutes
    - Every time you get hit, your score goes up
    - Win by keeping your score below 3
    - Beware, the stage is icy!
    `;
    let paragraph = this.add.text(this.world.centerX, 542, paragraphText, paragraphStyle);

    heading.anchor.setTo(0.5, 0);
    paragraph.anchor.setTo(0.5, 0);

  },  
  update: function() {
    // core game funcitonality, player input, collisions, score
    if (this.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR) ){
      this.state.start('Play');

    }
  }
};


