const db = require("./mysql")
const api = require("./api")

const checkForNewGame = async () => {
  const latest = await db.getLastTimestamp()
  const id = await db.getAccountId()

  const matches = await api.getMatchesByTimestamp(id, latest)
  if (matches) {
    const newLatest = matches[0].timestamp + 1
    if (/*matches[0].queue === 420 */ true) {
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
    console.log(match.participants[0])
    const player = match.participants.find(participant => {
      return participant.championId == championId
    })

    const kills = player.stats.kills
    const deaths = player.stats.deaths
    const assists = player.stats.assists
    const gameWon = player.stats.win
    const gold = player.stats.goldEarned
    const lane = player.timeline.lane
    const vision = player.stats.visionScore
    const totalDamage = player.stats.totalDamageDealt
    const duration = match.gameDuration

    await db
      .updateChampionStats(
        championId,
        kills,
        deaths,
        assists,
        lane,
        gold,
        vision,
        !gameWon ? 1 : 0
      )
      .catch(error => console.log(error))

    await db
      .addMatch(
        gameId,
        kills,
        deaths,
        assists,
        totalDamage,
        duration,
        championId
      )
      .catch(error => console.log(error))

    if (gameWon) {
      await db
        .setChampionFinished(championId)
        .catch(error => console.log(error))
    }
  })
}

module.exports = checkForNewGame
