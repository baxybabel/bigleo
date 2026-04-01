
currentlevel=1
score = 0
let level1 = [
  "                                                                ",
  "                                                                ",
  "                                                                ",
  "                                                                ",
  "                                                                ",
  "                                                                ",
  "                                                                ",
  "        C                                                       ",
  "                                  C                             ",
  "     bbbbb     b                  b                   b        F",
  "d                         C                                    d",
  "dd                        S           W                C      dd",
  "ddggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggdd",
  "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
  "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
]
 let level2 = [
  "                                                  C        ",
  "                  d     d           C   d         d        ",
  "                                                           ",
  "      C                                                    ",
  "      t                       C     t        g             ",
  "      t        gggggggggggggddg           ddddddddddd      ",
  "      t      gg             dddg         d    d            ",
  "      t     g  F    C       ddddg  ddCCdd     d            ",
  "            d       d       ddddddd           d            ",
  "           g   t    d                         d     d      ",
  "          g         d                tt       d     d      ",
  "         g          d       ddddd    tt             d      ",
  "             g      d     dddCCC                    d  CCC ",
  "     C        gdgg  gdg     dCdddd         gggggg   d  CWC ",
  "gggggggg ggggggddddggdddgg gCCd        gdggggddddddgggggggg",
  "ddddddddddddddddddddddddddddCd      ddddddddddddddddddddddd",
  "bdddddddddddddddddddddddddddddttttttddddddddddddddddddddddb",
  "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
 ]
let fightArena=[
  "                                                                ",
  "                                                               W",
  "                                                               d",
  "                                                                ",
  "                                                                ",
  "                                                               d",
  "                                                                ",
  "                                                                ",
  "                                                               d",
  "     bbbbb                                                     F",
  "d                                                              d",
  "ddCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCdd",
  "ddggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggdd",
  "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
  "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
]

let levels = [
  level1,
  level2,
  fightArena,
]






function preload() {
  worldtileset = loadImage("assets/sprites/world_tileset.png")
  knightSprite = loadImage("assets/sprites/knight.png")
  slimeGreen = loadImage("assets/sprites/slime_green.png")
  swordSprite = loadImage("assets/sprites/sword.png")
  coinsBlingBling = loadImage("assets/sprites/coin.png")
}





function setup() {
  new Canvas(innerWidth / 4, innerHeight / 4, "pixelated x4");

  angleMode(DEGREES)



  player = new Sprite()
  player.debug=false
  player.anis.offset.y = -4
  player.mirror.x = true
  player.w = 12
  player.h = 13
  player.rotationLock = true
  player.spriteSheet = knightSprite
  player.addAnis({
    idle: { w: 32, h: 32, col: 0, row: 0, frames: 4 },
    run: { w: 32, h: 32, col: 0, row: 2, frames: 16 },
    roll: { w: 32, h: 32, col: 0, row: 5, frames: 8 },
    hit: { w: 32, h: 32, col: 0, row: 6, frames: 4 },
    death: { w: 32, h: 32, col: 0, row: 7, frames: 4 },
  })
  player.changeAni("idle")
  player.vies = 3
  player.dmgCooldown = 0

  player.invincible= keyIsDown (67)

  slime = new Sprite()
  slime.spriteSheet = slimeGreen
  slime.addAnis({
    idle: { w: 24, h: 24, col: 1, row: 0, frames: 4 },
    death: {w : 24 , h : 24  , col : 2 , row : 2 , frames : 1}
  })
  slime.debug=false
  slime.w = 12
  slime.h = 12
  slime.changeAni ("idle")
  slime.anis.offset.y = -5
  slime.rotationLock = true
  slime.collider = "dynamic"
  slime.x = 20

  shead=new Sprite ()
  shead.debug=false
  shead.collider="none"
shead.w=0
shead.h=3

fruits= new Group ()
fruits.spriteSheet = worldtileset
fruits.addAni ({
  w:16, h:16, col :4, row :8
})
fruits.w=16
fruits.h=16
fruits.debug=false
fruits.tile = "F"
fruits.collider = "none"

  sword = new Sprite()
  sword.collider = "none"
  sword.debug=false
  sword.w = 6
  sword.h = 22.5
  sword.spriteSheet = swordSprite
  sword.addAni({
    w: 64, h: 64, col: 0, row: 0
  })
  sword.scale = 0.4
  sword.offset.y = -6
  sword.rotation = -90
  sword.rotationlock = true
  sword.visible = false
  //sword.rotationSpeed = 120

  world.gravity.y = 7.5

  dirt = new Group()
  dirt.collider = "static"
  dirt.tile = "d"
  dirt.w = 16
  dirt.h = 16
  dirt.spriteSheet = worldtileset
  dirt.addAni({ w: 16, h: 16, col: 0, row: 1 })
  dirt.debug = false


theWin = new Group()
theWin.collider = "none"
theWin.tile = "W"
theWin.w = 16
theWin.h = 16
theWin.spriteSheet = worldtileset
theWin.addAni({ w: 16, h: 16, col: 1, row: 7 })
theWin.debug = false

  grass = new Group()
  grass.collider = "static"
  grass.tile = "g"
  grass.w = 16
  grass.h = 16
  grass.spriteSheet = worldtileset
  grass.addAni({ w: 16, h: 16, col: 0, row: 0 })
  grass.debug = false

  bedrock = new Group()
  bedrock.collider = "static"
  bedrock.tile = "b"
  bedrock.w = 16
  bedrock.h = 16
  bedrock.spriteSheet = worldtileset
  bedrock.addAni({ w: 16, h: 16, col: 4, row: 1 })
  bedrock.debug = false

  trampoline = new Group()
  trampoline.collider = "static"
  trampoline.tile = "t"
  trampoline.w = 16
  trampoline.h = 16
  trampoline.spriteSheet = worldtileset
  trampoline.addAni({ w: 16, h: 16, col: 6, row: 2 })
  trampoline.debug = false

  sign=new Group()
  sign.spriteSheet= worldtileset
  sign.addAni ({w:16,h:16,col:8,row:3})
  sign.collider="none"
  sign.tile="S"
  sign.w=16
  sign.h=16

  coins=new Group()
  coins.spriteSheet=coinsBlingBling
  coins.addAni ({w:16,h:16,col:0,row:0,frames:12})
  coins.w=16
  coins.h=16
  coins.collider = "none"
  coins.tile="C"
  coins.debug=false
  // ground = new Sprite()
  // ground.collider = "static"
  // ground.w = 100000
  // ground.h = 25
  // ground.x = 400
  // ground.y = 800
  // ground.colour = "green"
  // ground.stroke = green

  // platform = new Sprite()
  // platform.collider="static"
  // platform.w=100
  // platform.h=10
  // platform.x=550
  // platform.y=680

  // platform2 = new Sprite()
  // platform2.collider="static"
  // platform2.w=100
  // platform2.h=10
  // platform2.x= -250
  // platform2.y=710

  // platform3 = new Sprite()
  // platform3.collider="static"
  // platform3.w=100
  // platform3.h=10
  // platform3.x=1300
  // platform3.y=695

  tiles = new Tiles(level1, 0, 0, 16, 16)



}

async function draw() {
  background(220);

  camera.x = player.x
  shead.x=slime.x
  shead.y=slime.y-8

  sword.x = player.x + (sword.mirror.x ? -5 : 5)
  sword.y = player.y + -2

  if (player.colliding(slime)
    && player.dmgCooldown >= 10
  ) {
    player.vies = player.vies - 1
    player.changeAni("hit")
    slime.moveAway(player, 0.1)
    player.moveAway(slime, 0.1)
    player.dmgCooldown = 0
  } else {
    slime.moveTowards(player.x, undefined, 0.03)
    if (player.vel.x == 0 && player.vel.y == 0) {
      player.changeAni("idle")
    }
  }
  if (player.vies <= 0) {
    player.changeAni("death")
    //  await  delay(500)
    noLoop()
  }

if(sign.overlapping (player)){
 push()
  textAlign(CENTER)
  text ("allo petit joueur",width/2,height/2)
  pop()
}

  if (keyIsDown(LEFT_ARROW)) {
    player.vel.x = -5 / 2
    player.mirror.x = true
    sword.mirror.x = true
    player.changeAni("run")
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.vel.x = 5 / 2
    player.mirror.x = false
    sword.mirror.x = false
    player.changeAni("run")
  }
  if (keyIsDown(DOWN_ARROW)) {
    player.changeAni("roll")
    if (player.mirror.x) { player.vel.x = -5 }
    else { player.vel.x = 5 }
  }

  for (let coin of coins)
if (coin.overlapping(player)){
  coin.remove()
  score=score+1
}

  if (tiles.colliding(player)) {
    if (keyIsDown(UP_ARROW)) {
      player.vel.y = -5 / 2
    }
  }
if (shead.overlapping (player)){
 await slime.changeAni ("death")  
  slime.remove()
  shead.remove()
}
for (let fruit of fruits)
if (player.overlapping (fruit)){
player.vies=player.vies+1
fruit.remove()
}

  player.colliding(trampoline, (player, tramp) => {

    player.vel.y = -3;
  });

  if (player.overlapping (theWin)){
    tiles.remove()
    tiles = new Tiles(levels [currentlevel], 0, 0, 16, 16)
    currentlevel=currentlevel+1
    if (currentlevel == levels.length){currentlevel=0}
    player.y=20
  }

  if (keyIsDown(32)) {
    sword.visible = true
    sword.rotation = (sword.mirror.x ? 0 : 0)
    sword.rotateTo(sword.mirror.x ?  45 : 45 , 10)
    sword.visible=false
 //    sword.rotation = (sword.mirror.x ? 90 : -90)
  }
  player.dmgCooldown += 0.25

  text("vies:" + player.vies, 10, 40)
  text("score:" + score, 10, 55)
}
