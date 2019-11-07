import React from "react"
import Champion from "./Champion"

function ChampionWrapper(props) {
  const champions = props.champions.map(champion => {
    return (
      <Champion
        name={champion.name}
        image={champion.image}
        losses={champion.losses}
        done={champion.done}
        key={champion.id}
        kills={champion.kills}
        deaths={champion.deaths}
        assists={champion.assists}
      />
    )
  })

  return <div>{champions}</div>
}

export default ChampionWrapper
