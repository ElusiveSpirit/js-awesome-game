export const directions = {
  west: {offset: 0, x: -2, y: 0, opposite: 'east'},
  northWest: {offset: 32, x: -2, y: -1, opposite: 'southEast'},
  north: {offset: 64, x: 0, y: -2, opposite: 'south'},
  northEast: {offset: 96, x: 2, y: -1, opposite: 'southWest'},
  east: {offset: 128, x: 2, y: 0, opposite: 'west'},
  southEast: {offset: 160, x: 2, y: 1, opposite: 'northWest'},
  south: {offset: 192, x: 0, y: 2, opposite: 'north'},
  southWest: {offset: 224, x: -2, y: 1, opposite: 'northEast'}
};

export const anims = {
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
};