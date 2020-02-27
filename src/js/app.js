import Phaser from 'phaser'

import WorldScene from './WorldScene'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#ababab',
  parent: 'phaser-example',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0
      },
      debug: false // set to true to view zones
    }
  },
  scene: [
    WorldScene
  ]
};

const game = new Phaser.Game(config);
