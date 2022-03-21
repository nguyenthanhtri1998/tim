
//#1
let client = AgoraRTC.createClient({mode:'rtc', codec:"vp8"})

//#2
let config = {
    appid:'f22c48e8ef3a427fa4c24868ece31a33',
    token:'006f22c48e8ef3a427fa4c24868ece31a33IADFkt+4TsCnqXokQQ4NmCYFuWScDJGGJghnuGlFxR9oBCJ+V/gAAAAAEADjTvSOKrA2YgEAAQAzsDZi',
    uid:null,
    channel:'GE',
}

//#3 - Đặt tuyến đường cho thời điểm người dùng tham gia
let localTracks = {
    audioTrack:null,
    videoTrack:null
}

//#4 - Muốn giữ trạng thái cho người dùng âm thanh và video để người dùng có thể tắt tiếng và ẩn
let localTrackState = {
    audioTrackMuted:false,
    videoTrackMuted:false
}

//#5 - Đặt các tuyến đường từ xa để lưu trữ những người dùng khác
let remoteTracks = {}


document.getElementById('join-btn').addEventListener('click', async () => {
    config.uid = document.getElementById('user2').innerHTML
    await joinStreams()
    document.getElementById('join-wrapper').style.display = 'none'
    document.getElementById('footer').style.display = 'flex'
})

document.getElementById('mic-btn').addEventListener('click', async () => {
    // Kiểm tra xem trạng thái tắt tiếng hiện tại là gì
     // Nút vô hiệu hóa
    if(!localTrackState.audioTrackMuted){
       // Tắt âm thanh của bạn
        await localTracks.audioTrack.setMuted(true);
        localTrackState.audioTrackMuted = true
        document.getElementById('mic-btn').style.backgroundColor ='rgb(255, 80, 80, 0.7)'
    }else{
        await localTracks.audioTrack.setMuted(false)
        localTrackState.audioTrackMuted = false
        document.getElementById('mic-btn').style.backgroundColor ='#1f1f1f8e'

    }

})

document.getElementById('camera-btn').addEventListener('click', async () => {
    // Kiểm tra xem trạng thái tắt tiếng hiện tại là gì
     // Nút vô hiệu hóa
    if(!localTrackState.videoTrackMuted){
        // Tắt camera của bạn
        await localTracks.videoTrack.setMuted(true);
        localTrackState.videoTrackMuted = true
        document.getElementById('camera-btn').style.backgroundColor ='rgb(255, 80, 80, 0.7)'
    }else{
        await localTracks.videoTrack.setMuted(false)
        localTrackState.videoTrackMuted = false
        document.getElementById('camera-btn').style.backgroundColor ='#1f1f1f8e'

    }

})

document.getElementById('leave-btn').addEventListener('click', async () => {
    // Vòng lặp đã ném các bản nhạc cục bộ và dừng chúng để kích hoạt sự kiện hủy xuất bản, sau đó đặt thành không xác định
     // Ẩn chân trang
    for (trackName in localTracks){
        let track = localTracks[trackName]
        if(track){
            track.stop()
            track.close()
            localTracks[trackName] = null
        }
    }

    // Rời khỏi kênh
    await client.leave()
    document.getElementById('footer').style.display = 'none'
    document.getElementById('user-streams').innerHTML = ''
    document.getElementById('join-wrapper').style.display = 'block'
    

})




// Phương thức sẽ lấy tất cả thông tin của tôi và thiết lập luồng người dùng trong khung
let joinStreams = async () => {
    //Is this place hear strategicly or can I add to end of method?
    
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);


    client.enableAudioVolumeIndicator(); // Triggers the "volume-indicator" callback event every two seconds.
    client.on("volume-indicator", function(evt){
        for (let i = 0; evt.length > i; i++){
            let speaker = evt[i].uid
            let volume = evt[i].level
            if(volume > 0){
                document.getElementById(`volume-${speaker}`).src = './asset/volume-on.svg'
            }else{
                document.getElementById(`volume-${speaker}`).src = './asset/volume-off.svg'
            }
            
        
            
        }
    });

    //#6 - Đặt và lấy lại các tuyến đường cho người dùng cục bộ
    [config.uid, localTracks.audioTrack, localTracks.videoTrack] = await  Promise.all([
        client.join(config.appid, config.channel, config.token ||null, config.uid ||null),
        AgoraRTC.createMicrophoneAudioTrack(),
        AgoraRTC.createCameraVideoTrack()

    ])
    
    //#7 - Tạo trình phát và thêm vào danh sách trình phát
    let player = `<div class="video-containers" id="video-wrapper-${config.uid}">
                        <p class="user-uid"><img class="volume-icon" id="volume-${config.uid}" src="./asset/volume-on.svg" /> ${config.uid}</p>
                        <div class="video-player player" id="stream-${config.uid}"></div>
                  </div>`

    document.getElementById('user-streams').insertAdjacentHTML('beforeend', player);
    //#8 - Luồng người dùng trình phát trong div
    localTracks.videoTrack.play(`stream-${config.uid}`)
    

    //#9 Thêm người dùng vào danh sách tên / id user

    //#10 - Publish để mọi người trong cuộc trò chuyện thấy
    await client.publish([localTracks.audioTrack, localTracks.videoTrack])

}


let handleUserJoined = async (user, mediaType) => {
    console.log('Handle user joined')

    //#11 - Thêm người dùng vào danh sách remote users
    remoteTracks[user.uid] = user

    //#12 Subscribe to remote users
    await client.subscribe(user, mediaType)
   
    
    if (mediaType === 'video'){
        let player = document.getElementById(`video-wrapper-${user.uid}`)
        console.log('player:', player)
        if (player != null){
            player.remove()
        }
 
        player = `<div class="video-containers" id="video-wrapper-${user.uid}">
                        <p class="user-uid"><img class="volume-icon" id="volume-${user.uid}" src="./asset/volume-on.svg" /> ${user.uid}</p>
                        <div  class="video-player player" id="stream-${user.uid}"></div>
                      </div>`
        document.getElementById('user-streams').insertAdjacentHTML('beforeend', player);
         user.videoTrack.play(`stream-${user.uid}`)

          
    }
    

    if (mediaType === 'audio') {
        user.audioTrack.play();
      }
}


let handleUserLeft = (user) => {
    console.log('Handle user left!')
    //Xóa khỏi người dùng từ xa và xóa trình bao bọc video của người dùng
    delete remoteTracks[user.uid]
    document.getElementById(`video-wrapper-${user.uid}`).remove()
}

function myFunction()
{
document.getElementById("record-btn").style.visibility = 'hidden';
document.getElementById("stop-btn").style.visibility = 'visible';
document.getElementById("rcd").style.visibility = 'visible';

}
function myFunction2()
{
document.getElementById("stop-btn").style.visibility = 'hidden';
document.getElementById("record-btn").style.visibility = 'visible';
document.getElementById("download").style.visibility = 'visible';
document.getElementById("h2rcd").style.visibility = 'visible';
}
function remove()
{
    var element = document.getElementById("rcd");
    element.remove();
}
