import React from "react"
import "./Current.css"

function Current(props) {
  return (
    <div className='current'>
      <h2>{props.name}</h2>
      <img src={props.image} alt={props.name} className='header' />
      <br />
      <span>Niederlagen: {props.losses}</span>
      <br />
      <span className='stats'>Kills: {props.kills}</span>
      <span className='stats'>Deaths: {props.deaths}</span>
      <span className='stats'>Assists: {props.assists}</span>
    </div>
  )
}

export default Current
