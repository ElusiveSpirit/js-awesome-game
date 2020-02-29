import Phaser from "phaser";
import Skeleton from "./unions/Skeleton"
import {keyDirections} from "./settings";

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
    Skeleton.preload(this)
    this.load.image('house', 'assets/images/rem_0002.png');
  }

  create() {
    this.buildMap();
    this.placeHouses();

    Skeleton.create(this)

    this.cursors = this.input.keyboard.createCursorKeys();

    this.player = this.add.existing(new Skeleton(this, 200, 200, 'idle', 'down', 330))
    this.physics.world.enable(this.player);

    this.player.stop()

    this.cameras.main.setSize(1600, 600);

    // this.cameras.main.scrollX = 800;
  }

  update(time, delta) {
    this.skeletons.forEach(function (skeleton) {
      skeleton.update();
    });

    // Remove direction keys moving
    // const direction = this.getDirectionByKeys()
    // if (direction) {
    //   this.player.move(direction)
    // } else {
    //   this.player.stop()
    // }

    if (this.player.isMoving) {
      const directionStep = this.getAvailableStepForUnit(this.player)
      this.player.move(directionStep)
    } else {
      this.player.stop()
    }

     // only move when you click

    // if (this.input.mousePointer.rightButtonReleased()) {
    if (this.input.mousePointer.isDown) {
      this.player.setMoveTo(
        this.input.mousePointer.x,
        this.input.mousePointer.y
      )
    }
  }

  /**
   * Return direction for the next unit step
   * @param unit
   */
  getAvailableStepForUnit(unit) {
    const keyDowns = [
      unit.moveToY < unit.y,
      unit.moveToY > unit.y,
      unit.moveToX < unit.x,
      unit.moveToX > unit.x,
    ]
    const keyDownsToStr = keyDowns.map(state => state ? '1' : '0').join('')
    return keyDirections[keyDownsToStr]
  }

  getDirectionByKeys() {
    const keyDowns = [
      this.cursors.up.isDown,
      this.cursors.down.isDown,
      this.cursors.left.isDown,
      this.cursors.right.isDown,
    ]
    const keyDownsToStr = keyDowns.map(state => state ? '1' : '0').join('')
    return keyDirections[keyDownsToStr]
  }

  buildMap() {
    //  Parse the data out of the map
    const data = this.cache.json.get('map');

    const tilewidth = data.tilewidth;
    const tileheight = data.tileheight;

    this.physics.world.bounds.width = data.widthInPixels;
    this.physics.world.bounds.height = data.heightInPixels;

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