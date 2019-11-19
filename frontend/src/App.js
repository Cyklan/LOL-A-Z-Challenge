import React from "react"
import Current from "./Current"
import ChampionWrapper from "./ChampionWrapper"
import StatsLeft from "./StatsLeft"
import StatsRight from "./StatsRight"
import "./App.css"

const TITLE = "Emero intet mit: "
const URL = "https://leagueapi.cyklan.de"
// const URL = "http://localhost:42069"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      champions: [],
      current: {},
      stats: {}
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
      stats
    })
  }

  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <StatsLeft
            first={{name: "Kills", stat: this.state.stats.kills}}
            second={{name: "Deaths", stat: this.state.stats.deaths}}
            third={{name: "Assists", stat: this.state.stats.assists}}
          />
          <Current
            name={this.state.current.name}
            image={this.state.current.image}
            losses={this.state.current.losses}
            kills={this.state.current.kills}
            deaths={this.state.current.deaths}
            assists={this.state.current.assists}
          />
          <StatsRight
            first={{name: "Damage", stat: this.state.stats.damage}}
            second={{name: "Gold", stat: this.state.stats.gold}}
            third={{name: "Time", stat: this.state.stats.duration}}
          />
        </header>
        <ChampionWrapper champions={this.state.champions} />
      </div>
    )
  }
}

export default App
