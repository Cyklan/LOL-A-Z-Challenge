const mysql = require("mysql")

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
})

const getChampions = () => {
  let sql = "SELECT *, "
  sql +=
    "(SELECT SUM(damage) FROM matches WHERE championid = champions.id) AS damage, "
  sql +=
    "(SELECT SUM(duration) / 60  FROM matches WHERE championid = champions.id) AS duration "
  sql += "FROM champions ORDER BY name"
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) reject(error)
      // console.log(results)
      resolve(results)
    })
  })
}

const getCurrentChampion = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM champions WHERE done IS NULL ORDER BY name ASC LIMIT 1",
      (error, results) => {
        if (error) reject(error)
        resolve(results[0])
      }
    )
  })
}

const setLastTimestamp = timestamp => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE timestamps SET last = ${timestamp} WHERE (id = 1)`,
      (error, results) => {
        if (error) reject(error)
        resolve(timestamp)
      }
    )
  })
}

const getLastTimestamp = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT IF (last IS NOT NULL, last, start) AS timestamp FROM timestamps;",
      (error, results) => {
        if (error) reject(error)
        resolve(results[0].timestamp)
      }
    )
  })
}

const setFirstTimestamp = () => {
  return new Promise((resolve, reject) => {
    const now = Date.now()
    connection.query(
      `INSERT INTO timestamps (id, start) VALUES (1, ${now})`,
      error => {
        if (error) reject(error)
        resolve(now)
      }
    )
  })
}

const getAccountId = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM account", (error, results) => {
      if (error) reject(error)
      resolve(results[0].id)
    })
  })
}

const setAccountId = accountId => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO account VALUES ("${accountId}")`,
      (error, result) => {
        if (error) reject(error)
        resolve(accountId)
      }
    )
  })
}

const updateChampionStats = (
  championId,
  kills,
  deaths,
  assists,
  lane,
  goldEarned,
  visionScore,
  loss
) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE champions SET losses = (losses + ${loss}), kills = (kills + ${kills}), deaths = (deaths + ${deaths}), assists = (assists + ${assists}), position = "${lane}", gold = (gold + ${goldEarned}), vision = (vision + ${visionScore}) WHERE id = ${championId}`,
      error => {
        if (error) reject(error)
        resolve(true)
      }
    )
  })
}

const addMatch = (
  gameId,
  kills,
  deaths,
  assists,
  damage,
  duration,
  champion
) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO matches (id, kills, deaths, assists, championid, duration, damage) VALUES (${gameId}, ${kills}, ${deaths}, ${assists}, ${champion}, ${duration}, ${damage})`,
      error => {
        if (error) reject(error)
        resolve(true)
      }
    )
  })
}

const setChampionFinished = championId => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE champions SET done = 1 WHERE id = " + championId,
      error => {
        if (error) reject(error)
        resolve(true)
      }
    )
  })
}

const getStats = () => {
  const sumSql =
    "select SUM(kills) as kills, SUM(assists) as assists, SUM(deaths) as deaths, SUM(gold) as gold FROM champions"
}

module.exports = {
  addMatch,
  getChampions,
  getCurrentChampion,
  getStats,
  getLastTimestamp,
  getAccountId,
  setAccountId,
  setFirstTimestamp,
  setLastTimestamp,
  setChampionFinished,
  updateChampionStats,
}
