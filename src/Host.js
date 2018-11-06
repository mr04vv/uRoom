/* eslint-disable no-undef */
import React, {Component} from 'react';
import styled from 'react-emotion'
import './App.css';
import Peer from 'skyway-js';


let localStream = null;


const HostWrapper = styled("div")`
`;


const VideoInput = styled("video")`
  transform: scaleX(-1);
`;

class Host extends Component {

  constructor(props) {
    super(props);
    this.state = {
      peer: new Peer("mori", {key: '4ffb33b5-0205-43b1-ac53-ae0f39d8adea'}),
      peerId: null,
      vi: null,
      vi2: null,
      cc: null,
      cc2: null,
      trck: null,
      trck2: null,
      ci: null,
      ci2: null
    }
  }

  drawLoop() {
    requestAnimationFrame(() => this.drawLoop()); // ここで毎フレームdrawLoopを呼び出すように設定します。

    if (this.state.cc != null && this.state.cc2 != null) {
      this.state.cc.clearRect(0, 0, this.state.ci.width, this.state.ci.height); // 毎フレーム出力用のキャンバスをクリアします。これをしないと重ね書きのようになってしまいます。
      this.state.cc2.clearRect(0, 0, this.state.ci2.width, this.state.ci2.height); // 毎フレーム出力用のキャンバスをクリアします。これをしないと重ね書きのようになってしまいます。
      this.state.trck.draw(this.state.ci); // 判定結果をcanvasに描画します。
      this.state.trck2.draw(this.state.ci2)
    }
  }

  componentDidMount() {
    // const peer = new Peer("mori",{key: '4ffb33b5-0205-43b1-ac53-ae0f39d8adea'})

    this.state.peer.on('open', () => {
      this.setState({
        peerId: this.state.peer.id
      })
    });

    navigator.mediaDevices.getUserMedia({video: {width: 200, height: 200}, audio: true})
      .then(function (stream) {
        document.getElementById("inputVideo").srcObject = stream;
        // $('#inputVideo').get(0).srcObject = stream;
        localStream = stream;
      }).catch(function (error) {
      // Error
      console.error('mediaDevice.getUserMedia() error:', error);
      return;
    });

    let videoInput = document.getElementById('their-video');
    let videoInput2 = document.getElementById('inputVideo')
    let tracker = new clm.tracker();
    tracker.init(pModel);
    let tracker2 = new clm.tracker();
    tracker2.init(pModel);
    tracker.start(videoInput);
    tracker2.start(videoInput2);

    let positions = tracker.getCurrentPosition(); // 解析されて位置ベクトル情報
    let positions2 = tracker2.getCurrentPosition(); // 解析されて位置ベクトル情報

    let box = [0, 0, 400, 260];
    let box2 = [0, 0, 400, 260];

    tracker.start(videoInput, box);
    tracker2.start(videoInput2, box2);

    let canvasInput = document.getElementById('canvas');
    let canvasInput2 = document.getElementById('canvas2');
    let cc = canvasInput.getContext('2d')
    let cc2 = canvasInput2.getContext('2d')

    this.setState({
      vi: videoInput,
      vi2: videoInput2,
      trck: tracker,
      trck2: tracker2,
      ci: canvasInput,
      ci2: canvasInput2,
      cc: cc,
      cc2: cc2
    });

    this.drawLoop(this.state)
  }


  render() {
    return (
      <HostWrapper className="App">
          <div id="content">
            <VideoInput id="inputVideo" width={400} height={300} muted="true" autoPlay>
            </VideoInput>
            <VideoInput id="their-video" style={{transform: 'scaleX(-1)', display: 'none'}} width={400} height={300}
                   autoPlay/>
            <canvas ref={"canvas"} id="canvas" style={{transform: 'scaleX(-1)'}} width={400} height={300}/>
            <canvas ref={"cc"} id="canvas2" style={{transform: 'scaleX(-1)'}} width={400} height={300}/>
          </div>
      </HostWrapper>
    );
  }
}

export default Host;
