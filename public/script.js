// let localStream = null;

// navigator.mediaDevices.getUserMedia({video: { width: 200, height: 200 }, audio: true})
//   .then(function (stream) {
//     // Success
//     $('#inputVideo').get(0).srcObject = stream;
//     localStream = stream;
//   }).catch(function (error) {
//   // Error
//   console.error('mediaDevice.getUserMedia() error:', error);
//   return;
// });

let peer = null;
let existingCall = null;


peer = new Peer({
  key: '4ffb33b5-0205-43b1-ac53-ae0f39d8adea',
  debug: 3
});

peer.on('open', function(){
  $('#my-id').text(peer.id);
});

$('#make-call').submit(function(e){
  e.preventDefault();
  const call = peer.call($('#callto-id').val(), localStream);
  setupCallEventHandlers(call);
});

$('#end-call').click(function(){
  existingCall.close();
});


peer.on('call', function(call){
  call.answer(localStream);
  setupCallEventHandlers(call);
});

function setupCallEventHandlers(call){
  if (existingCall) {
    existingCall.close();
  };

  existingCall = call;

  call.on('stream', function(stream){
    addVideo(call,stream);
    setupEndCallUI();
    $('#their-id').text(call.remoteId);
    // $('#their-id2').text(call.remoteId);
    // $('#their-id3').text(call.remoteId);
    // $('#their-id4').text(call.remoteId);

  });

  call.on('close', function(){
    removeVideo(call.remoteId);
    setupMakeCallUI();
  });
  // 省略
}

function addVideo(call,stream){
  $('#their-video').get(0).srcObject = stream;
  // $('#their-video3').get(0).srcObject = stream;

  // $('#their-video2').get(0).srcObject = stream;
  // $('#their-video4').get(0).srcObject = stream;

}

function removeVideo(peerId){
  $('#' + peerId).remove();
}

function setupMakeCallUI(){
  $('#make-call').show();
  $('#end-call').hide();
}

function setupEndCallUI() {
  $('#make-call').hide();
  $('#end-call').show();
}
