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

  getDistance2(position, a, b) {
    return Math.pow(position[a][0] - position[b][0], 2) + Math.pow(position[a][1] - position[b][1], 2);
  }

  drawLoop() {
    requestAnimationFrame(() => this.drawLoop()); // ここで毎フレームdrawLoopを呼び出すように設定します。


    var L2D_X = document.getElementById("L2D_X");
    var L2D_Y = document.getElementById("L2D_Y");
    var L2D_Z = document.getElementById("L2D_Z");
    var ml = document.getElementById("ml");
    var mr = document.getElementById("mr");
    var mo = document.getElementById("mo");

    var L2D_X2 = document.getElementById("L2D_X2");
    var L2D_Y2 = document.getElementById("L2D_Y2");
    var L2D_Z2 = document.getElementById("L2D_Z2");
    var ml2 = document.getElementById("ml2");
    var mr2 = document.getElementById("mr2");
    var mo2 = document.getElementById("mo2");


    if (this.state.cc2 != null && this.state.videoInput != null) {
      this.state.cc.clearRect(0, 0, this.state.canvasInput.width, this.state.canvasInput.height); // 毎フレーム出力用のキャンバスをクリアします。これをしないと重ね書きのようになってしまいます。
      this.state.cc2.clearRect(0, 0, this.state.canvasInput2.width, this.state.canvasInput2.height); // 毎フレーム出力用のキャンバスをクリアします。これをしないと重ね書きのようになってしまいます。
      this.state.tracker.draw(this.state.canvasInput); // 判定結果をcanvasに描画します。
      this.state.tracker2.draw(this.state.canvasInput2);

      if (this.state.tracker.getCurrentPosition()) {
        var parameter = {}, faceR = Math.sqrt(this.getDistance2(this.state.tracker.getCurrentPosition(), 37, 2)),
          faceL = Math.sqrt(this.getDistance2(this.state.tracker.getCurrentPosition(), 37, 12)),
          mouthH = Math.sqrt(this.getDistance2(this.state.tracker.getCurrentPosition(), 57, 60)),
          lipH = Math.sqrt(this.getDistance2(this.state.tracker.getCurrentPosition(), 53, 57));
        // face angle

        parameter['PARAM_ANGLE_X'] = Math.asin((faceL - faceR) / (faceL + faceR)) * (180 / Math.PI) * 2;
        parameter['PARAM_ANGLE_Y'] = Math.asin((this.state.tracker.getCurrentPosition()[0][1] + this.state.tracker.getCurrentPosition()[14][1] - this.state.tracker.getCurrentPosition()[27][1] - this.state.tracker.getCurrentPosition()[32][1]) * 2 / (this.state.tracker.getCurrentPosition()[14][0] - this.state.tracker.getCurrentPosition()[0][0])) * (180 / Math.PI);
        parameter['PARAM_ANGLE_Z'] = -Math.atan((this.state.tracker.getCurrentPosition()[32][1] - this.state.tracker.getCurrentPosition()[27][1]) / (this.state.tracker.getCurrentPosition()[32][0] - this.state.tracker.getCurrentPosition()[27][0])) * (180 / Math.PI);
        // mouth
        parameter['PARAM_MOUTH_OPEN_Y'] = mouthH / lipH - 0.5;
        parameter['PARAM_MOUTH_FORM'] = 2 * Math.sqrt(this.getDistance2(this.state.tracker.getCurrentPosition(), 50, 44) / this.getDistance2(this.state.tracker.getCurrentPosition(), 30, 25)) - 1;
        // eye ball
        parameter['PARAM_EYE_BALL_X'] = Math.sqrt(this.getDistance2(this.state.tracker.getCurrentPosition(), 27, 23) / this.getDistance2(this.state.tracker.getCurrentPosition(), 25, 23)) - 0.5;
        parameter['PARAM_EYE_BALL_Y'] = Math.sqrt(this.getDistance2(this.state.tracker.getCurrentPosition(), 27, 24) / this.getDistance2(this.state.tracker.getCurrentPosition(), 26, 24)) - 0.5;
        // eye brow
        parameter['PARAM_BROW_L_Y'] = 2 * Math.sqrt(this.getDistance2(this.state.tracker.getCurrentPosition(), 24, 21)) / lipH - 4;
        parameter['PARAM_BROW_R_Y'] = 2 * Math.sqrt(this.getDistance2(this.state.tracker.getCurrentPosition(), 29, 17)) / lipH - 4;
        L2D_X.value = parameter['PARAM_ANGLE_X'];
        L2D_Y.value = parameter['PARAM_ANGLE_Y'];
        L2D_Z.value = parameter['PARAM_ANGLE_Z'];

        ml.value = parameter['PARAM_BROW_L_Y'];
        mr.value = parameter['PARAM_BROW_R_Y'];
        mo.value = parameter['PARAM_MOUTH_OPEN_Y'];
      }
      if (this.state.tracker2.getCurrentPosition()) {
        var parameter = {}, faceR = Math.sqrt(this.getDistance2(this.state.tracker2.getCurrentPosition(), 37, 2)),
          faceL = Math.sqrt(this.getDistance2(this.state.tracker2.getCurrentPosition(), 37, 12)),
          mouthH = Math.sqrt(this.getDistance2(this.state.tracker2.getCurrentPosition(), 57, 60)),
          lipH = Math.sqrt(this.getDistance2(this.state.tracker2.getCurrentPosition(), 53, 57));
        // face angle

        parameter['PARAM_ANGLE_X'] = Math.asin((faceL - faceR) / (faceL + faceR)) * (180 / Math.PI) * 2;
        parameter['PARAM_ANGLE_Y'] = Math.asin((this.state.tracker2.getCurrentPosition()[0][1] + this.state.tracker2.getCurrentPosition()[14][1] - this.state.tracker2.getCurrentPosition()[27][1] - this.state.tracker2.getCurrentPosition()[32][1]) * 2 / (this.state.tracker2.getCurrentPosition()[14][0] - this.state.tracker2.getCurrentPosition()[0][0])) * (180 / Math.PI);
        parameter['PARAM_ANGLE_Z'] = -Math.atan((this.state.tracker2.getCurrentPosition()[32][1] - this.state.tracker2.getCurrentPosition()[27][1]) / (this.state.tracker2.getCurrentPosition()[32][0] - this.state.tracker2.getCurrentPosition()[27][0])) * (180 / Math.PI);
        // mouth
        parameter['PARAM_MOUTH_OPEN_Y'] = (mouthH / lipH - 0.5) * 2;
        parameter['PARAM_MOUTH_FORM'] = 2 * Math.sqrt(this.getDistance2(this.state.tracker2.getCurrentPosition(), 50, 44) / this.getDistance2(this.state.tracker2.getCurrentPosition(), 30, 25)) - 1;
        // eye ball
        parameter['PARAM_EYE_BALL_X'] = Math.sqrt(this.getDistance2(this.state.tracker2.getCurrentPosition(), 27, 23) / this.getDistance2(this.state.tracker2.getCurrentPosition(), 25, 23)) - 0.5;
        parameter['PARAM_EYE_BALL_Y'] = Math.sqrt(this.getDistance2(this.state.tracker2.getCurrentPosition(), 27, 24) / this.getDistance2(this.state.tracker2.getCurrentPosition(), 26, 24)) - 0.5;
        // eye brow
        parameter['PARAM_BROW_L_Y'] = 2 * Math.sqrt(this.getDistance2(this.state.tracker2.getCurrentPosition(), 24, 21)) / lipH - 4;
        parameter['PARAM_BROW_R_Y'] = 2 * Math.sqrt(this.getDistance2(this.state.tracker2.getCurrentPosition(), 29, 17)) / lipH - 4;
        L2D_X2.value = parameter['PARAM_ANGLE_X'];
        L2D_Y2.value = parameter['PARAM_ANGLE_Y'];
        L2D_Z2.value = parameter['PARAM_ANGLE_Z'];

        ml2.value = parameter['PARAM_BROW_L_Y'];
        mr2.value = parameter['PARAM_BROW_R_Y'];
        mo2.value = parameter['PARAM_MOUTH_OPEN_Y'];
      }

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

    var glcanvas = new Simple3("glcanvas", 0)
    var glcanvas1 = new Simple3("glcanvas2", 0)

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
      position: tracker.getCurrentPosition(),
      position2: tracker2.getCurrentPosition()
    });

    this.drawLoop()
  }


  render() {
    return (
      <HostWrapper className="App">
        <div id="content">
          <VideoInput id="inputVideo" width={300} height={300} muted="true" autoPlay>
          </VideoInput>
          <VideoInput id="their-video" style={{transform: 'scaleX(-1)', display: 'none'}} width={300} height={300}
                      autoPlay/>
          <canvas ref={"canvas"} id="canvas" style={{transform: 'scaleX(-1)'}} width={350} height={300}/>
          <canvas ref={"cc"} id="canvas2" style={{transform: 'scaleX(-1)'}} width={350} height={300}/>
        </div>
        <canvas id={"glcanvas"}/>
        <canvas id={"glcanvas2"} width="300" height="300"/>

        <div style={{display: 'none'}}>
          PARAM_Y<input type="range" id="L2D_Y" defaultValue="0.0" min="-70.0" max="70.0" step="1.0"/>

          PARAM_X<input type="range" id="L2D_X" defaultValue="0.0" min="-70.0" max="70.0" step="1.0"/>
          PARAM_X<input type="range" id="L2D_Z" defaultValue="0.0" min="-70.0" max="70.0" step="1.0"/>


          el<input type="range" id="el" defaultValue="0.0" min="-1.0" max="1.0" step="1.0"/>
          er<input type="range" id="er" defaultValue="0.0" min="-1.0" max="1.0" step="1.0"/>
          ml<input type="range" id="ml" defaultValue="0.0" min="-1.0" max="1.0" step="1.0"/>
          mr<input type="range" id="mr" defaultValue="0.0" min="-1.0" max="1.0" step="1.0"/>
          mo<input type="range" id="mo" defaultValue="0.0" min="-1.0" max="2.0" step="0.5"/>
          <br/>
          サイズ<input type="range" id="SCALE" defaultValue="3.0" min="0.0" max="5.0" step="0.1"/>
          <br/>
          位置X<input type="range" id="POS_X" defaultValue="0.0" min="-3.0" max="3.0" step="0.1"/>
          <br/>
          位置Y<input type="range" id="POS_Y" defaultValue="-0.8" min="-3.0" max="3.0" step="0.1"/>
        </div>
        <div style={{display: 'none'}}>
          PARAM_Y<input type="range" id="L2D_Y2" defaultValue="0.0" min="-70.0" max="70.0" step="1.0"/>

          PARAM_X<input type="range" id="L2D_X2" defaultValue="0.0" min="-70.0" max="70.0" step="1.0"/>
          PARAM_X<input type="range" id="L2D_Z2" defaultValue="0.0" min="-70.0" max="70.0" step="1.0"/>

          el<input type="range" id="el2" defaultValue="0.0" min="-1.0" max="1.0" step="1.0"/>
          er<input type="range" id="er2" defaultValue="0.0" min="-1.0" max="1.0" step="1.0"/>
          ml<input type="range" id="ml2" defaultValue="0.0" min="-1.0" max="1.0" step="1.0"/>
          mr<input type="range" id="mr2" defaultValue="0.0" min="-1.0" max="1.0" step="1.0"/>
          mo<input type="range" id="mo2" defaultValue="0.0" min="-1.0" max="2.0" step="0.5"/>
          <br/>
          サイズ<input type="range" id="SCALE2" defaultValue="1.5" min="0.0" max="5.0" step="0.1"/>
          <br/>
          位置X<input type="range" id="POS_X2" defaultValue="0.0" min="-3.0" max="3.0" step="0.1"/>
          <br/>
          位置Y<input type="range" id="POS_Y2" defaultValue="0.0" min="-3.0" max="3.0" step="0.1"/>
        </div>

      </HostWrapper>
    );
  }
}

export default Host;
