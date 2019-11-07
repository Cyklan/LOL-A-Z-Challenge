import React from "react"
import "./Champion.css"

class Champion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      flipped: false,
    }
  }

  clickhandler = () => {
    this.setState(prevState => ({
      flipped: !prevState.flipped,
    }))
  }

  render = () => {
    return (
      <div className='champion' onClick={this.clickhandler}>
        {!this.state.flipped ? (
          <Front
            image={this.props.image}
            name={this.props.name}
            losses={this.props.losses}
            done={this.props.done}
          />
        ) : (
          <Back
            name={this.props.name}
            kills={this.props.kills}
            deaths={this.props.deaths}
            assists={this.props.assists}
            losses={this.props.losses}
          />
        )}
      </div>
    )
  }
}

function Front(props) {
  return (
    <div className='front'>
      <img
        src={props.image}
        alt={props.name}
        className={props.done === 1 ? "champion" : "gray champion"}
      />
      <div className='container'>
        <h4>{props.name}</h4>
        <span>Niederlagen: {props.losses}</span>
      </div>
    </div>
  )
}

function Back(props) {
  const kda = (props.kills + props.assists) / Math.max(1, props.deaths)
  return (
    <div className='back'>
      <div className='container'>
        <h4>{props.name}</h4>
        <span>
          Kills: {props.kills} | Ø:&nbsp;
          {(props.kills / Math.max(1, props.losses)).toFixed(1)}
        </span>
        <br />
        <span>
          Deaths: {props.deaths} | Ø:&nbsp;
          {(props.deaths / Math.max(1, props.losses)).toFixed(1)}
        </span>
        <br />
        <span>
          Assists: {props.assists} | Ø:&nbsp;
          {(props.assists / Math.max(1, props.losses)).toFixed(1)}
        </span>
        <br />
        <span>KD/A: {kda}</span>
      </div>
    </div>
  )
}

export default Champion
