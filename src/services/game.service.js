const httpStatus = require("http-status");
const { Game } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a game
 * @param {Object} gameBody
 * @returns {Promise<User>}
 */
const createGame = async (gameBody) => {
  if (await Game.isEmailTaken(gameBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  return Game.create(gameBody);
};

/**
 * Query for games
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryGames = async (filter, options) => {
  const games = await Game.paginate(filter, options);
  return games;
};

/**
 * Get game by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getGameById = async (id) => {
  return Game.findById(id);
};

/**
 * Get game by email
 * @param {string} email
 * @returns {Promise<Game>}
 */
const getGameByName = async (name) => {
  return Game.findOne({ name });
};

/**
 * Get game by plataform
 * @param {string} plataform
 * @returns {Promise<Game>}
 */
const getGameByPlataform = async (plataform) => {
  return Game.findOne({ plataform });
};

/**
 * Update game by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Game>}
 */
const updateGameById = async (id, updateBody) => {
  const game = await getGameById(id);
  if (!game) throw new ApiError(httpStatus.NOT_FOUND, "Game not found");
  Object.assign(game, updateBody);
  await game.save();
  return game;
};

/**
 * Delete game by id
 * @param {ObjectId} gameId
 * @returns {Promise<User>}
 */
const deleteGameById = async (id) => {
  const game = await getGameById(id);
  if (!game) throw new ApiError(httpStatus.NOT_FOUND, "Game not found");
  await game.remove();
  return game;
};

module.exports = {
  createGame,
  queryGames,
  getGameById,
  getGameByName,
  getGameByPlataform,
  updateGameById,
  deleteGameById,
};
