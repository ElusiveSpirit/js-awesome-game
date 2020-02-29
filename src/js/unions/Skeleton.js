import Phaser from "phaser"

const directionAnimations = {
  left: {offset: 0, x: -2, y: 0, opposite: 'right'},
  upLeft: {offset: 32, x: -2, y: -1, opposite: 'downRight'},
  up: {offset: 64, x: 0, y: -2, opposite: 'down'},
  upRight: {offset: 96, x: 2, y: -1, opposite: 'downLeft'},
  right: {offset: 128, x: 2, y: 0, opposite: 'left'},
  downRight: {offset: 160, x: 2, y: 1, opposite: 'upLeft'},
  down: {offset: 192, x: 0, y: 2, opposite: 'up'},
  downLeft: {offset: 224, x: -2, y: 1, opposite: 'upRight'}
}

const animations = {
  idle: {
    startFrame: 0,
    endFrame: 4,
    speed: 0.2
  },
  walk: {
    startFrame: 4,
    endFrame: 12,
    speed: 0.15
  },
  attack: {
    startFrame: 12,
    endFrame: 20,
    speed: 0.11
  },
  die: {
    startFrame: 20,
    endFrame: 28,
    speed: 0.2
  },
  shoot: {
    startFrame: 28,
    endFrame: 32,
    speed: 0.1
  }
}

export default class Skeleton extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'skeleton')
    this.scene = scene
    this.velocitySpeed = 80
    this.direction = null
  }

  /**
   *
   * @param {string|null} direction
   */
  stop(direction = null) {
    const idleDirection = direction || this.direction || 'down'

    this.body.setVelocity(0);
    this.playAnimation('idle', idleDirection)
  }

  /**
   *
   * @param {string} direction
   */
  move(direction) {
    this.direction = direction
    const rawDirection = direction.toLowerCase()

    this.playAnimation('walk', direction)

    this.body.setVelocity(0);

    // Horizontal movement
    if (rawDirection.includes('left')) {
      this.body.setVelocityX(-this.velocitySpeed);
    } else if (rawDirection.includes('right')) {
      this.body.setVelocityX(this.velocitySpeed);
    }

    // Vertical movement
    if (rawDirection.includes('up')) {
      this.body.setVelocityY(-this.velocitySpeed);
    } else if (rawDirection.includes('down')) {
      this.body.setVelocityY(this.velocitySpeed);
    }
  }

  playAnimation(name, direction) {
    this.anims.play(Skeleton.getCombinedAnimationName(name, direction), true)
  }

  /**
   *
   * @param {string} animationName
   * @param {string} directionName
   * @returns {string}
   */
  static getCombinedAnimationName(animationName, directionName) {
    return `${animationName}${directionName}`
  }

  /**
   *
   * @param {Phaser.Scene} scene
   */
  static preload(scene) {
    scene.load.spritesheet('skeleton', 'assets/sprites/skeleton8.png', {frameWidth: 128, frameHeight: 128})
  }

  /**
   *
   * @param {Phaser.Scene} scene
   */
  static create(scene) {
    const spriteName = 'skeleton'
    const frameRate = 5
    const repeat = -1 // Inf

    // Create animations for sprites set
    Object.entries(animations).forEach(([animationName, opts]) => {
      Object.entries(directionAnimations).forEach(([direction, directionOpts]) => {
        const combinedAnimationName = this.getCombinedAnimationName(animationName, direction)
        const frames = Array(opts.endFrame - opts.startFrame)
          .fill(0)
          .map((_, i) => i + opts.startFrame + directionOpts.offset)

        scene.anims.create({
          key: combinedAnimationName,
          frames: scene.anims.generateFrameNumbers(spriteName, {
            frames: frames
          }),
          frameRate: frameRate,
          repeat: repeat
        })
      })
    })
  }
}
