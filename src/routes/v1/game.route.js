const express = require("express");
const gameController = require("../../controllers/game.controller");

const router = express.Router();

router.post(
  "/",
  gameController.createGame
);

router.get(
  "/:id",
  gameController.getGameById
);

router.get(
  "/:name",
  gameController.getGameByName
);

router.get(
  "/:console",
  gameController.getGameByPlataform
);

router.put("/:id",
  gameController.updateGame
);

router.delete("/:id",
  gameController.deleteGame
);

module.exports = router;