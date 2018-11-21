import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import styled from 'react-emotion'

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
        <TopWrapper>
        <Form name="make_room_form" id="make-room" className="pure-form" onSubmit={(e) => e.preventDefault()}>
          <FormTitle className="room-text" id="createText">部屋を作成する</FormTitle>
          <div className="ui input">
            <input name="host" type="text" placeholder="Enter Room Id" value={this.state.hostPeerId} onChange={(e) => this.hostIdHandler(e)} required id="hostRoomId"/>
          </div>
          <button className=" ui teal button  pure-button pure-button-success room-button" onClick={() => this.createRoom()}>作成する
          </button>
        </Form>
        <Form name="enter_room_form" id="make-room" className="pure-form" onSubmit={(e) => e.preventDefault()}>
          <FormTitle className="room-text" id="createText">部屋に入る</FormTitle>
          <div className="ui input">
            <input type="text" placeholder="Enter Room Id" value={this.state.guestPeerId}
                   onChange={(e) => this.guestIdHandler(e)} required/>
          </div>
          <button className=" ui teal button  pure-button pure-button-success room-button" onClick={() => this.enterRoom()}>入室する
          </button>
        </Form>
        </TopWrapper>
      </Fragment>
    )
  }

}

const TopWrapper = styled('div')`
  margin: 80px 120px 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media (max-width: 420px) {
    margin: 70px 0;
  }
`;

const FormTitle = styled("div")`
  color: white;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Form = styled('form')`
  margin-top: 25px;
   @media (max-width: 420px) {
    display: block;
    margin: 0 auto;
    margin-top: 25px;
  }
`;

export default Top
