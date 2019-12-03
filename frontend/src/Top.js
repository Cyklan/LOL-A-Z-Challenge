import React from "react"
import "./Top.css"

function Top (props) {
  return (
    <div className="stat">
      {props.children}
    </div>
  )
}

export default Top