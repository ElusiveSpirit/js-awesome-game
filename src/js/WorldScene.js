import Phaser from "phaser";
import Skeleton from "./unions/Skeleton"

export default class WorldScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'WorldScene'
    });

    this.tileWidthHalf = null;
    this.tileHeightHalf = null;
    this.skeletons = [];
    this.player = null;
  }

  preload() {
    this.load.json('map', 'assets/maps/isometric-grass-and-water.json');
    this.load.spritesheet('tiles', 'assets/sprites/isometric-grass-and-water.png', {frameWidth: 64, frameHeight: 64});
    this.load.spritesheet('skeleton', 'assets/sprites/skeleton8.png', {frameWidth: 128, frameHeight: 128});
    this.load.image('house', 'assets/images/rem_0002.png');
  }

  create() {
    //  Our Skeleton class

    this.buildMap();
    this.placeHouses();

    this.skeletons.push(this.add.existing(new Skeleton(this, 240, 290, 'walk', 'southEast', 100)));
    this.skeletons.push(this.add.existing(new Skeleton(this, 100, 380, 'walk', 'southEast', 230)));
    this.skeletons.push(this.add.existing(new Skeleton(this, 620, 140, 'walk', 'south', 380)));
    this.skeletons.push(this.add.existing(new Skeleton(this, 460, 180, 'idle', 'south', 0)));

    this.skeletons.push(this.add.existing(new Skeleton(this, 760, 100, 'attack', 'southEast', 0)));
    this.skeletons.push(this.add.existing(new Skeleton(this, 800, 140, 'attack', 'northWest', 0)));

    this.skeletons.push(this.add.existing(new Skeleton(this, 750, 480, 'walk', 'east', 200)));

    this.skeletons.push(this.add.existing(new Skeleton(this, 1030, 300, 'die', 'west', 0)));

    this.skeletons.push(this.add.existing(new Skeleton(this, 1180, 340, 'attack', 'northEast', 0)));

    this.skeletons.push(this.add.existing(new Skeleton(this, 1180, 180, 'walk', 'southEast', 160)));

    this.skeletons.push(this.add.existing(new Skeleton(this, 1450, 320, 'walk', 'southWest', 320)));
    this.skeletons.push(this.add.existing(new Skeleton(this, 1500, 340, 'walk', 'southWest', 340)));
    this.skeletons.push(this.add.existing(new Skeleton(this, 1550, 360, 'walk', 'southWest', 330)));

    this.player = this.add.existing(new Skeleton(this, 300, 300, 'walk', 'east', 330))

    this.cameras.main.setSize(1600, 600);

    // this.cameras.main.scrollX = 800;
  }

  update(time, delta) {
    this.skeletons.forEach(function (skeleton) {
      skeleton.update();
    });

    // return;

    //  only move when you click
    // if (game.input.mousePointer.isDown) {
    //   //  400 is the speed it will move towards the mouse
    //   game.physics.arcade.moveToPointer(player, 400);
    //
    //   //  if it's overlapping the mouse, don't move any more
    //   if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y)) {
    //     player.velocity.setTo(0, 0);
    //   }
    // } else {
    //   player.body.velocity.setTo(0, 0);
    // }
    // if (d) {
    //   this.cameras.main.scrollX -= 0.5;
    //
    //   if (this.cameras.main.scrollX <= 0) {
    //     d = 0;
    //   }
    // } else {
    //   this.cameras.main.scrollX += 0.5;
    //
    //   if (this.cameras.main.scrollX >= 800) {
    //     d = 1;
    //   }
    // }
  }

  buildMap() {
    //  Parse the data out of the map
    const data = this.cache.json.get('map');

    const tilewidth = data.tilewidth;
    const tileheight = data.tileheight;

    this.tileWidthHalf = tilewidth / 2;
    this.tileHeightHalf = tileheight / 2;

    const layer = data.layers[0].data;

    const mapwidth = data.layers[0].width;
    const mapheight = data.layers[0].height;

    const centerX = mapwidth * this.tileWidthHalf;
    const centerY = 16;

    let i = 0;

    for (let y = 0; y < mapheight; y++) {
      for (let x = 0; x < mapwidth; x++) {
        let id = layer[i] - 1;

        const tx = (x - y) * this.tileWidthHalf;
        const ty = (x + y) * this.tileHeightHalf;

        const tile = this.add.image(centerX + tx, centerY + ty, 'tiles', id);

        tile.depth = centerY + ty;

        i++;
      }
    }
  }

  placeHouses() {
    let house = this.add.image(240, 370, 'house');

    house.depth = house.y + 86;

    house = this.add.image(1300, 290, 'house');

    house.depth = house.y + 86;
  }
}