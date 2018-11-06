/* eslint-disable no-undef */
import React, {Component} from 'react';
import styled from 'react-emotion'
import Peer from 'skyway-js';


const HostWrapper = styled("div")`
`;


const VideoInput = styled("video")`
  transform: scaleX(-1);
`;

class Host extends Component {

  constructor(props) {
    super(props);
    this.state = {
      peer: new Peer("mori", {key: '4ffb33b5-0205-43b1-ac53-ae0f39d8adea', debug: 3}),
      peerId: null,
      videoInput: null,
      videoInput2: null,
      cc: null,
      cc2: null,
      tracker: null,
      tracker2: null,
      canvasInput: null,
      canvasInput2: null,
      position: null,
      position2: null,
      existingCall: null
    }
  }

  drawLoop() {
    requestAnimationFrame(() => this.drawLoop()); // ここで毎フレームdrawLoopを呼び出すように設定します。

    if (this.state.cc != null && this.state.cc2 != null) {
      this.state.cc.clearRect(0, 0, this.state.canvasInput.width, this.state.canvasInput.height); // 毎フレーム出力用のキャンバスをクリアします。これをしないと重ね書きのようになってしまいます。
      this.state.cc2.clearRect(0, 0, this.state.canvasInput2.width, this.state.canvasInput2.height); // 毎フレーム出力用のキャンバスをクリアします。これをしないと重ね書きのようになってしまいます。
      this.state.tracker.draw(this.state.canvasInput); // 判定結果をcanvasに描画します。
      this.state.tracker2.draw(this.state.canvasInput2)
    }
  }

  setupCallEventHandlers(call) {
    if (this.state.existingCall) {
      this.state.existingCall.close();
    }
    ;

    this.setState({
      existingCall: call
    });

    let self = this;

    call.on('stream', function (stream) {
      self.addVideo(call, stream);
      self.setupEndCallUI();
      $('#their-id').text(call.remoteId);
    });

    call.on('close', function () {
      self.removeVideo(call.remoteId);
      self.setupMakeCallUI();
    });
    // 省略
  }

  onRecvMessage(data) {
    // on(data)
    // var glCanvas = new Simple3("glcanvas2",data);

    // 画面に受信したメッセージを表示
  }


  addVideo(call, stream) {
    $('#their-video').get(0).srcObject = stream;
  }

  setupMakeCallUI() {
    $('#make-call').show();
    $('#end-call').hide();
  }

  setupEndCallUI() {
    $('#make-call').hide();
    $('#end-call').show();
  }

  removeVideo(peerId) {
    $('#' + peerId).remove();
  }

  onRecvMessage(data) {
    // on(data)
    // var glCanvas = new Simple3("glcanvas2",data);

    // 画面に受信したメッセージを表示
  }


  componentDidMount() {

    let localStream;

    navigator.mediaDevices.getUserMedia({video: {width: 200, height: 200}, audio: true})
      .then(function (stream) {
        document.getElementById("inputVideo").srcObject = stream;
        localStream = stream;
      }).catch(function (error) {
      // Error
      console.error('mediaDevice.getUserMedia() error:', error);
      return;
    });


    this.state.peer.on('open', () => {

    });

    let self = this;
    this.state.peer.on('call', function (call) {
      call.answer(localStream);
      self.setupCallEventHandlers(call);
    });


    this.state.peer.on('connection', function (connection) {

      // データ通信用に connectionオブジェクトを保存しておく
      let conn = connection;

      // 接続が完了した場合のイベントの設定
      conn.on("open", function () {
      });

      // メッセージ受信イベントの設定
      conn.on("data", self.onRecvMessage);
    });

    this.state.peer.on('open', function () {
      $('#my-id').text("Ready!");
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
      videoInput: videoInput,
      videoInput2: videoInput2,
      tracker: tracker,
      tracker2: tracker2,
      canvasInput: canvasInput,
      canvasInput2: canvasInput2,
      cc: cc,
      cc2: cc2,
      position: positions,
      position2: positions2
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
