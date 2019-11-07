const mysql = require("mysql")

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA
})

const getChampions = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM champions", (error, results) => {
      if (error) reject(error)
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

const getStats = () => {}

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

const updateChampionStats = (championId, kills, deaths, assists, lane) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE champions SET kills = (kills + ${kills}), deaths = (deaths + ${deaths}), assists = (assists + ${assists}), position = "${lane}" WHERE id = ${championId}`,
      error => {
        if (error) reject(error)
        resolve(true)
      }
    )
  })
}

const addMatch = (gameId, kills, deaths, assists) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO matches (id, kills, deaths, assists) VALUES (${gameId}, ${kills}, ${deaths}, ${assists})`,
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
  updateChampionStats
}
