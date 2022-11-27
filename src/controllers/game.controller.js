/* eslint-disable prettier/prettier */
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");

const createGame = catchAsync(async (req, res) => {
  const user = await userService.createGame(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getGames = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await userService.queryGames(filter, options);
  res.send(result);
});

const getGameById = catchAsync(async (req, res) => {
  const user = await userService.getGameById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "Game not found");
  }
  res.send(user);
});

const getGameByName = catchAsync(async (req, res) => {
  const user = await userService.getGameByName(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "Game not found");
  }
  res.send(user);
});

const getGameByPlataform = catchAsync(async (req, res) => {
  const user = await userService.getGameByPlataform(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "Game not found");
  }
  res.send(user);
});

const updateGame = catchAsync(async (req, res) => {
  const user = await userService.updateGameById(req.params.userId, req.body);
  res.send(user);
});

const deleteGame = catchAsync(async (req, res) => {
  await userService.deleteGameById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createGame,
  getGames,
  getGameById,
  getGameByName,
  getGameByPlataform,
  updateGame,
  deleteGame,
};
