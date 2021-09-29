const Colyseus = require('colyseus.js')
const express = require('express')
const router = express.Router()

var GameServerURL = "wss://azwzhh.colyseus.in/";  //needs to change//
// var GameServerURL = "ws://localhost:2567";
// var GameServerURL = "wss://multiplayer-server.dev.mxplay.com/"

function MX_MULTIPLAYER(serverLocation) {
  this.COLYSEUS_CLIENT = new Colyseus.Client(serverLocation);
}

MX_MULTIPLAYER.prototype.createPrivateRoom = function(options, successCallback, errorCallback) {
  console.log("rommCreating");
  const {
    roomId, gameId
  } = options;
  if (!roomId) {
    return
  }

  this.COLYSEUS_CLIENT.create(options.roomName, {
    roomType: 'private',
    roomId: roomId,
    gameId: gameId,
    playerInfo: options.playerInfo,
    players:options.players,
    gameConfig: options.gameConfig
  }).then(room => {
    this.room = room;
    // console.log(room);
    successCallback();
    console.log("Room Created Successfully");

  }).catch((e) => {
    console.log("error ---------------> " + e);
    errorCallback(e);
  })
}

function getRoom(req, res) {
  let apiServerRequestBody = req.body

  let { initInfo, players, gameConfig='{}' } = (apiServerRequestBody || {})
  console.log("apiServerRequestBody -- spacewar", apiServerRequestBody)
  gameConfig = JSON.parse(gameConfig)

  const isProd = gameConfig && gameConfig.serverInfo && gameConfig.serverInfo.isProd;

  const serverUrlEndPoint = gameConfig && gameConfig.serverInfo && gameConfig.serverInfo.serverUrlEndPoint;
  GameServerURL = isProd ? serverUrlEndPoint && serverUrlEndPoint.prod : serverUrlEndPoint && serverUrlEndPoint.dev;
  console.log(GameServerURL+"  ------------  "+isProd);

    /* apiServerRequestBody will be like this:
    {
        initInfo: {
          gameId: '86a01a92a84646e4ad33252f19b39385',
          roomId: '7d1b376b-0eee-4d53-bd91-3cda5de62b43-1625715627668',
          roomType: 'PRIVATE',
          gameConfig" : {
            "serverInfo": {
              "url": "wss://multiplayer-server.dev.mxplay.com",
              "isProd": false
            }
          }
        },
        players: [
          {
            userId: 'gg-105414866596884556274',
            profilePicUrl: 'https://lh3.googleusercontent.com/a/AATXAJxuzXunP5tERFMHUiJurT1r0kI6kqdSpwiFwUCi=s96-c',
            name: 'rohit',
            host: true,
            bot: false
          },
          {
            userId: 'gg-111014190193897978344',
            profilePicUrl: 'https://lh3.googleusercontent.com/a-/AOh14GhQ8pB-A2wuCR5Y-gJYQTE0R1yNIVKLSLNk5kPnXA=s96-c',
            name: 'Akanksha',
            host: false,
            bot: false
          }
        ]
      }
      */

  const mxMultiplayer = new MX_MULTIPLAYER(GameServerURL)
  mxMultiplayer.createPrivateRoom({
    roomName: 'spacewarRoom',
    roomId: initInfo.roomId,
    gameId: initInfo.gameId,
    roomType: initInfo.roomType,
    players:players,
    playerInfo: {
      role: 'spectator'
    },
    gameConfig: {}
  }, () => {
    res.json({
      success: true
    })
    console.log('room created callback');
  }, (e) => {
    res.status(500).send(e)
    console.log('some error')
  })
}

router.post('/get-room', getRoom)

module.exports = router
