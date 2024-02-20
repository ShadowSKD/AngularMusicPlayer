var app = angular.module('app', ['angularSoundManager'])

app.controller('appCtrl', function ($scope, angularPlayer) {
    // Song Data
    $scope.songs = [
        {
            id: "1",
            mood: "happy",
            title: "Take My Breath Away",
            artist: "Alesso",
            url: "src/mp3/1.mp3",
            albumart: "src/img/1.png",
            album: "Singles"
        },
        {
            id: "2",
            mood: "happy",
            title: "Sleepwalker",
            artist: "Illenium",
            url: "src/mp3/2.mp3",
            albumart: "src/img/2.png",
            album: "Ashes"
        },
        {
            id: "3",
            mood: "happy",
            title: "Sweet Child O' Mine",
            artist: "Guns N' Roses",
            url: "src/mp3/3.mp3",
            albumart: "src/img/3.png",
            album: "Singles"
        }
    ]

    // Init variables
    $scope.isPlaying = false
    $scope.songHover = false
    $scope.value = angularPlayer.getVolume()
    $scope.min = 0
    $scope.max = 100
    let bgImage = 'src/img/default.jpg'
    $scope.currentPlaying = {albumart:bgImage}
    
    // Init Functions
    $scope.songs.forEach(song=>{
        checkImageExists(song.albumart,(e)=>{
            if(!e) song.albumart=bgImage
        })
    })

    function checkImageExists (url, callback) {
        let img = new Image()
        img.onload = function() {
            callback(true)
        }
        img.onerror = function() {
            callback(false)
        }
        img.src = url
    }
      
    $scope.$on('currentTrack:duration', function(event, data) {
        // Function to check if the track is about to end in 5 seconds
        let getDuration = (time) => {
            if(!time) return 0
            var ct=0
            for (let i = 0; i < time.split(':').length; i++) {
                ct*=60
                ct+=time.split(':')[i]*1
            }
            return ct
        }
        var checkIfTrackIsEndingSoon = () => {
            var timeLeft = getDuration($scope.currentDuration) - getDuration($scope.currentPostion)
            if(timeLeft < 10 && timeLeft > 0 && document.getElementById("NextCard").style.display != 'block') {
                console.log("The song is about to end in 5 seconds.")
                document.getElementById("NextCard").style.display = 'block'
                setTimeout(()=>document.getElementById("NextCard").style.display = 'none',4550)
            }
        }
        checkIfTrackIsEndingSoon()
    })

    // KeyPress DOM Events
    let mute = document.getElementById('vu')
    let unmute = document.getElementById('vo')
    let vbar = document.getElementById('vbar')
    let isHover = false
    $scope.pNext = () => angularPlayer.nextTrack()
    let keypress = (e) => {
        var keyCode = e.keyCode
        // console.log(keyCode)
        if(keyCode == 32) sp()
        else if(keyCode == 112) angularPlayer.prevTrack() 
        else if(keyCode == 110) angularPlayer.nextTrack() 
        else if(keyCode == 109) angularPlayer.mute()
        else if(keyCode == 114) angularPlayer.repeatToggle()
        else if(keyCode == 115) angularPlayer.stop()
        else if(keyCode == 99) angularPlayer.clearPlaylist()
        else if(keyCode == 80) document.getElementById("pall").click()
        else if(keyCode == 65) document.getElementById("addall").click()

    }
    let sp=()=>{
        if($scope.isPlaying) angularPlayer.pause()
        else angularPlayer.play()
    }
    document.addEventListener('keypress',keypress)
    document.onkeydown = (e) =>{
        if(e.keyCode == 38) document.getElementById("c").click()
        else if(e.keyCode == 40) document.getElementById('d').click()
        $scope.value = angularPlayer.getVolume()
    }
    vbar.addEventListener('mouseover', () => {
        isHover=true
    })
    vbar.addEventListener('mouseout', () => {
        isHover=false
    })
    mute.addEventListener('mouseover', () => {
        vbar.style.display="block"
    })
    mute.addEventListener('mouseout', () => {
        let a = setInterval(()=>{
            if(!isHover) {
                vbar.style.display='none'
                clearInterval(a)
            }
        },1750)
    })
    unmute.addEventListener('mouseover', () => {
        vbar.style.display="block"
    })
    unmute.addEventListener('mouseout', () => {
        let a = setInterval(()=>{
            if(!isHover) {
                vbar.style.display='none'
                clearInterval(a)
            }
        },1750)
    })
})

