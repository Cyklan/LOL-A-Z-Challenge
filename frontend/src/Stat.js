import React from "react"
import "./Stat.css"

function Stat(props) {
  let doesStatExist = props.stat.value !== undefined
  let prefix = props.prefix || ""
  let suffix = props.suffix || ""
  let statName = doesStatExist ? props.stat.name : ""
  let statValue = doesStatExist ? props.stat.value.toLocaleString("de") : 0

  return (
    <span className="stats">
      {prefix} {statName}: {statValue}
      {suffix}
    </span>
  )
}

export default Stat
