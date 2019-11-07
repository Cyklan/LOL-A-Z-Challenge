const db = require("./mysql")
const api = require("./api")

const checkForNewGame = async () => {
  const latest = await db.getLastTimestamp()
  const id = await db.getAccountId()

  const matches = await api.getMatchesByTimestamp(id, latest)
  if (matches) {
    if (matches[0].queue === 420) {
      const newLatest = matches[0].timestamp + 1
      const gameId = matches[0].gameId
      const champion = matches[0].champion

      await db.setLastTimestamp(newLatest).catch(error => console.log(error))
      updateStats(gameId, champion)
      return true
    }
  }
  return false
}

const updateStats = async (gameId, championId) => {
  return new Promise(async (resolve, reject) => {
    const match = await api.getMatchByGameId(gameId)
    // console.log(match.participants[0])
    const player = match.participants.find(participant => {
      return participant.championId == championId
    })

    const kills = player.stats.kills
    const deaths = player.stats.deaths
    const assists = player.stats.assists
    const gameWon = player.stats.win
    const gold = playyer.stats.goldEarned
    const lane = player.timeline.lane

    await db
      .updateChampionStats(championId, kills, deaths, assists, lane, gold)
      .catch(error => console.log(error))

    await db
      .addMatch(gameId, kills, deaths, assists)
      .catch(error => console.log(error))

    if (gameWon) {
      await db
        .setChampionFinished(championId)
        .catch(error => console.log(error))
    }
  })
}

module.exports = checkForNewGame
