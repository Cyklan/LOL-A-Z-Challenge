import React from "react"
import "./Current.css"
import "./Stats.css"

const StatsLeft = props => {
  return (
    <div className="stat">
      <span className="stats">
        Total {props.first ? props.first.name : ""}:&nbsp;
        {props.first ? props.first.stat : 0}
      </span>
      <br />
      <span className="stats">
        Total {props.second ? props.second.name : ""}:&nbsp;
        {props.second ? props.second.stat : 0}
      </span>
      <br />
      <span className="stats">
        Total {props.third ? props.third.name : ""}:&nbsp;
        {props.third ? props.third.stat : 0}
      </span>
    </div>
  )
}

export default StatsLeft
