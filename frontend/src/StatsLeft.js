import React from "react"
import "./Current.css"
import "./Stats.css"

const StatsLeft = props => {
	return (
		<div className="stat">
			<span className="stats">
				Total {props.first ? props.first.name : ""}:&nbsp;
        {props.first.stat ? props.first.stat.toLocaleString("de") : 0}
			</span>
			<br />
			<span className="stats">
				Total {props.second ? props.second.name : ""}:&nbsp;
        {props.second.stat ? props.second.stat.toLocaleString("de") : 0}
			</span>
			<br />
			<span className="stats">
				Total {props.third ? props.third.name : ""}:&nbsp;
        {props.third.stat ? props.third.stat.toLocaleString("de") : 0}
			</span>
			<br />
			<span className="stats">
				{props.fourth ? props.fourth.name : ""}:&nbsp;
				{props.fourth.stat ? props.fourth.stat.toLocaleString("de") : 0}
			</span>
		</div>
	)
}

export default StatsLeft
