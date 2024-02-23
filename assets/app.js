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
        },
        {
            id: "4",
            mood: "happy",
            title: "Take My Breath Away",
            artist: "Alesso",
            url: "src/mp3/1.mp3",
            albumart: "src/img/1.png",
            album: "Singles"
        },
        {
            id: "5",
            mood: "happy",
            title: "Sleepwalker",
            artist: "Illenium",
            url: "src/mp3/2.mp3",
            albumart: "src/img/2.png",
            album: "Ashes"
        },
        {
            id: "6",
            mood: "sad",
            title: "Sweet Child O' Mine",
            artist: "Guns N' Roses",
            url: "src/mp3/3.mp3",
            albumart: "src/img/3.png",
            album: "Singles"
        },
        {
            id: "7",
            mood: "sad",
            title: "Take My Breath Away",
            artist: "Alesso",
            url: "src/mp3/1.mp3",
            albumart: "src/img/1.png",
            album: "Singles"
        },
        {
            id: "8",
            mood: "happy",
            title: "Sleepwalker",
            artist: "Illenium",
            url: "src/mp3/2.mp3",
            albumart: "src/img/2.png",
            album: "Ashes"
        },
        {
            id: "9",
            mood: "sad",
            title: "Sweet Child O' Mine",
            artist: "Guns N' Roses",
            url: "src/mp3/3.mp3",
            albumart: "src/img/3.png",
            album: "Singles"
        },
        {
            id: "10",
            mood: "happy",
            title: "Take My Breath Away",
            artist: "Alesso",
            url: "src/mp3/1.mp3",
            albumart: "src/img/1.png",
            album: "Singles"
        },
        {
            id: "11",
            mood: "sad",
            title: "Sleepwalker",
            artist: "Illenium",
            url: "src/mp3/2.mp3",
            albumart: "src/img/2.png",
            album: "Ashes"
        },
        {
            id: "12",
            mood: "happy",
            title: "Sweet Child O' Mine",
            artist: "Guns N' Roses",
            url: "src/mp3/3.mp3",
            albumart: "src/img/3.png",
            album: "Singles"
        }
    ]

    // Init variables
    $scope.incr = false
    $scope.decr = false
    $scope.about = false
    $scope.gen = ''
    $scope.ipa = false
    $scope.iaa = false
    $scope.icp = false
    $scope.ipt = false
    $scope.ish = false
    $scope.inxt = false
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

    $scope.pRecomm = () => {
        let genre = []
        let high = {
            name: '',
            count: -1
        }
        $scope.playlist.forEach(song=> {
            let gen = song.mood
            let isGen = null
            genre.forEach(g=>{
                if(g.name==gen) isGen = genre.indexOf(g)
            })
            if(isGen) {
                genre[isGen].count+=1
            } else {
                genre[genre.length] = {
                    name: gen,
                    count: 1
                }
            }
        })
        genre.forEach(g=>{
            if(high.count<g.count) {
                high.name=g.name
                high.count=g.count
            }
        })
        $scope.gen=high.name
        console.log($scope.gen)
        return $scope.gen
    }

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
                // console.log("The song is about to end in 5 seconds.")
                document.getElementById("NextCard").style.display = 'block'
                setTimeout(()=>document.getElementById("NextCard").style.display = 'none',4550)
            }
        }
        checkIfTrackIsEndingSoon()
    })

    function downloadText() {
        let text = 'Playlist:\n'
        let i=1
        // Get the text from the textarea
        $scope.playlist.forEach(song=> {
            text += `${i}.Song Title: ${song.title}, Song Artist: ${song.artist}, Song Album: ${song.album}, Song Mood: ${song.mood}\n`
            i+=1
        })
        // Create a data URL
        var dataUrl = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
        // Create a new anchor element
        var downloadAnchorNode = document.createElement('a')
        downloadAnchorNode.setAttribute("href",dataUrl)
        downloadAnchorNode.setAttribute("download", "Playlist.txt")
        document.body.appendChild(downloadAnchorNode) // Required for Firefox
        downloadAnchorNode.click()
        downloadAnchorNode.remove()
    }

    $scope.sharePlaylist = () => {
        if($scope.playlist.length==0) alert("Atleast 1 song in Playlist should be present for share.")
        else {
            alert("Downloading Playlist for user to share.")
            downloadText()
        }
    }

    // KeyPress DOM Events
    let mute = document.getElementById('vu')
    let unmute = document.getElementById('vo')
    let vbar = document.getElementById('vbar')
    let isHover = false
    $scope.pNext = () => {
        document.getElementById("NextCard").style.display = 'none'
        angularPlayer.nextTrack()
    }
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
        if(e.keyCode == 38) {
            
            document.getElementById('in-de-vbar').style.display='block'
            $scope.incr = true
            document.getElementById("c").click()
            setTimeout(()=> {
                document.getElementById('in-de-vbar').style.display='none'
                $scope.incr = false
            },500)
        } else if(e.keyCode == 40) {
            
            document.getElementById('in-de-vbar').style.display='block'
            $scope.decr = true
            document.getElementById('d').click()
            setTimeout(()=> {
                document.getElementById('in-de-vbar').style.display='none'
                $scope.decr = false
            },500)
        }
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

