import React from "react"
import Current from "./Current"
import ChampionWrapper from "./ChampionWrapper"
import "./App.css"

const TITLE = "Emero gewinnt mit: "

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      champions: [],
      current: {}
    }
  }

  componentDidMount = async () => {
    this.refresh()
    setInterval(this.refresh, 20000)
  }

  refresh = async () => {
    const currentChampion = await fetch(
      "https://leagueapi.cyklan.de/api/champions/current"
    )
      .then(res => res.json())
      .then(res => res.message)
    const allChampions = await fetch(
      "https://leagueapi.cyklan.de/api/champions"
    )
      .then(res => res.json())
      .then(res => res.message)
    const favicon = document.querySelector("link[rel*='icon']")
    favicon.href = currentChampion.image
    document.title = TITLE + currentChampion.name
    this.setState({
      champions: allChampions,
      current: currentChampion
    })
  }

  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <Current
            name={this.state.current.name}
            image={this.state.current.image}
            losses={this.state.current.losses}
            kills={this.state.current.kills}
            deaths={this.state.current.deaths}
            assists={this.state.current.assists}
          />
        </header>
        <ChampionWrapper champions={this.state.champions} />
      </div>
    )
  }
}

export default App
