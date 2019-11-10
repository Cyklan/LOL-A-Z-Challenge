const fetch = require("node-fetch")
require("dotenv").config()
const requestOptions = {
  method: "GET",
  mode: "cors",
  headers: {
    "X-Riot-Token": process.env.API_KEY,
  },
}

const getAccountId = username => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}`,
      requestOptions
    )
      .then(res => res.json())
      .catch(error => reject(error))
    resolve(res.accountId)
  })
}

const getAllMatches = accountId => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(
      `https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`,
      requestOptions
    )
      .then(res => res.json())
      .then(res => res.matches)
      .catch(error => reject(error))
    resolve(res)
  })
}

const getMatchesByTimestamp = (accountId, timestamp) => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(
      `https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?beginTime=${timestamp}&queue=420`,
      requestOptions
    )
      .then(res => res.json())
      .then(res => res.matches)
      .catch(error => reject(error))
    resolve(res)
  })
}

const getMatchByGameId = gameId => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(
      `https://euw1.api.riotgames.com/lol/match/v4/matches/${gameId}`,
      requestOptions
    )
      .then(res => res.json())
      .catch(error => reject(error))
    resolve(res)
  })
}

module.exports = {
  getMatchByGameId,
  getAccountId,
  getAllMatches,
  getMatchByGameId,
  getMatchesByTimestamp,
}
