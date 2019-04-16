class Start extends Phaser.Scene {
  constructor() {
    super({key:"Start"});
  }

  preload() {
    this.load.image('startLogo', 'assets/gameStart.png');
    this.load.image('background', 'assets/background.png');
  }

  create() {
    this.add.image((window.innerWidth/2), (window.innerHeight/2), 'background');
    var startImage = this.add.image((window.innerWidth/2), (window.innerHeight/2), 'startLogo');
    startImage.setInteractive().on('pointerdown', function(event) {
        this.scene.start('NewGame')
    }, this)
  }
}
