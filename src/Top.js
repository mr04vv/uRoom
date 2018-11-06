import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

class Top extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hostPeerId: null,
      guestPeerId: null
    }
  }

  hostIdHandler(e) {
    this.setState({
      hostPeerId: e.target.value
    })
  }

  guestIdHandler(e) {
    this.setState({
      guestPeerId: e.target.value
    })
  }

  createRoom() {
    if (this.state.hostPeerId !== null) {
      window.location.href = window.location.href + `host/${this.state.hostPeerId}`
    }
  }

  enterRoom() {
    if (this.state.guestPeerId !== null) {
      window.location.href = window.location.href + `guest/${this.state.guestPeerId}`
    }
  }

  render() {
    return (
      <Fragment>
        <form name="make_room_form" id="make-room" className="pure-form" onSubmit={(e) => e.preventDefault()}>
          <div className="room-text" id="createText">部屋を作成する</div>
          <div className="ui input">
            <input name="host" type="text" placeholder="Enter Room Id" value={this.state.hostPeerId} onChange={(e) => this.hostIdHandler(e)} required id="hostRoomId"/>
          </div>
          <button className=" ui teal button  pure-button pure-button-success room-button" onClick={() => this.createRoom()}>作成する
          </button>
        </form>
        <form name="enter_room_form" id="make-room" className="pure-form" onSubmit={(e) => e.preventDefault()}>
          <div className="room-text" id="createText">部屋に入る</div>
          <div className="ui input">
            <input type="text" placeholder="Enter Room Id" value={this.state.guestPeerId}
                   onChange={(e) => this.guestIdHandler(e)} required/>
          </div>
          <button className=" ui teal button  pure-button pure-button-success room-button" onClick={() => this.enterRoom()}>入室する
          </button>
        </form>
        <Link to={"/host/ss"}>aaa</Link>
      </Fragment>
    )
  }

}

export default Top
