import React from "react"
import Current from "./Current"
import ChampionWrapper from "./ChampionWrapper"
import Top from "./Top"
import "./App.css"
import Stat from "./Stat"

const TITLE = "Emero intet mit: "
const URL = "https://leagueapi.cyklan.de"
// const URL = "http://localhost:42069"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      champions: [],
      current: {},
      stats: {},
    }
  }

  componentDidMount = async () => {
    this.refresh()
    setInterval(this.refresh, 20000)
  }

  refresh = async () => {
    const currentChampion = await fetch(`${URL}/api/champions/current`)
      .then(res => res.json())
      .then(res => res.message)
    const allChampions = await fetch(`${URL}/api/champions/`)
      .then(res => res.json())
      .then(res => res.message)
    const stats = await fetch(`${URL}/api/stats`)
      .then(res => res.json())
      .then(res => res.message)
    const favicon = document.querySelector("link[rel*='icon']")
    favicon.href = currentChampion.image
    document.title = TITLE + currentChampion.name
    this.setState({
      champions: allChampions,
      current: currentChampion,
      stats,
    })
  }

  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <Top>
            <Stat
              prefix="Total"
              stat={{
                name: "Kills",
                value: this.state.stats.kills,
              }}
            />
            <Stat
              prefix="Total"
              stat={{
                name: "Deaths",
                value: this.state.stats.deaths,
              }}
            />
            <Stat
              prefix="Total"
              stat={{
                name: "Assists",
                value: this.state.stats.assists,
              }}
            />
            <Stat
              stat={{
                name: "Games Played",
                value: this.state.stats.games,
              }}
            />
          </Top>
          <Current
            name={this.state.current.name}
            image={this.state.current.image}
            losses={this.state.current.losses}
            kills={this.state.current.kills}
            deaths={this.state.current.deaths}
            assists={this.state.current.assists}
          />
          <Top>
            <Stat
              prefix="Total"
              stat={{
                name: "Damage",
                value: this.state.stats.damage,
              }}
            />
						<Stat
              prefix="Total"
              stat={{
                name: "Gold",
                value: this.state.stats.gold,
							}}
            />
						<Stat
							suffix="h"
              stat={{
                name: "Time Wasted",
                value: (this.state.stats.duration / 3600).toFixed(2),
              }}
            />
						<Stat
							suffix="%"
              stat={{
                name: "Winrate",
                value: (this.state.stats.winrate * 1).toFixed(2),
              }}
            />
          </Top>
        </header>
        <ChampionWrapper champions={this.state.champions} />
      </div>
    )
  }
}

export default App
