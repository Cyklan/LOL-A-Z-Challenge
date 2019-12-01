const express = require("express")
const router = express.Router()
const db = require("./mysql")
const api = require("./api")

// get info and stats about all champions
router.get("/champions", async (req, res) => {
	await db
		.getChampions()
		.then(champions => {
			res.json({ status: "success", message: champions })
		})
		.catch(error => {
			res.json({ status: "failure", message: error })
		})

	res.send()
})

// get current champion
router.get("/champions/current", async (req, res) => {
	await db
		.getCurrentChampion()
		.then(champion => {
			res.json({ status: "success", message: champion })
		})
		.catch(error => {
			res.json({ status: "failure", message: error })
		})

	res.send()
})

router.get("/stats", async (req, res) => {
	await db
		.getStats()
		.then(stats => {
			res.json({ status: "success", message: stats })
		})
		.catch(error => {
			res.json({ status: "failure", message: error })
		})

	res.send()
})

router.get("/timestamp/last", async (req, res) => {
	await db
		.getLastTimestamp()
		.then(timestamp => {
			res.json({ status: "success", message: timestamp })
		})
		.catch(error => {
			res.json({ status: "failure", message: error })
		})

	res.send()
})

router.post("/timestamp/first", async (req, res) => {
	await db
		.setFirstTimestamp()
		.then(now => {
			res.json({ status: "success", message: now })
		})
		.catch(error => {
			res.json({ status: "failure", message: error })
		})
	res.send()
	let accountId = await api.getAccountId(req.body.summoner)
	await db.setAccountId(accountId).catch(error => console.log(error))
	setInterval(require("./refresh")(), 10000)
})

module.exports = router
