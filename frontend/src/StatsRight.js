import React from "react"
import "./Current.css"
import "./Stats.css"

const StatsRight = props => {
  return (
    <div className="stat">
      <span className="stats">
        Total {props.first ? props.first.name : ""}:&nbsp;
        {props.first ? props.first.stat : ""}
      </span>
      <br />
      <span className="stats">
        Total {props.second ? props.second.name : ""}:&nbsp;
        {props.second ? props.second.stat : ""}
      </span>
      <br />
      <span className="stats">
        Time Wasted:&nbsp;
        {props.third ? (props.third.stat / 3600).toFixed(2): "0"}h
      </span>
    </div>
  )
}

export default StatsRight
