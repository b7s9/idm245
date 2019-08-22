gameObj.Intro = function (game) {};

gameObj.Intro.prototype = {
  create: function () {
    console.log('State - Intro');

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
    `- Dodge as many icicles as possible in two minutes
    - Every time you get hit, your score goes up
    - Win by keeping your score below 3`;
    let paragraph = this.add.text(this.world.centerX, 542, paragraphText, paragraphStyle);

    heading.anchor.setTo(0.5, 0);
    paragraph.anchor.setTo(0.5, 0);

    //Add button
    //The numbers given in parameters are the indexes of the frames, in this order: OVER, OUT, DOWN
    btPlay = this.add.button(9, 720 - 120, 'playButton', this.actionOnClick, this, 1, 0, 2);
    btPlay.anchor.setTo(0, 0.5);

  },  
  actionOnClick: function () {
    console.log('actionOnClick called');
    this.state.start('Play');
  }
};


