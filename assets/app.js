var app = angular.module('app', ['angularSoundManager'])

app.controller('appCtrl', function ($scope, angularPlayer) {
    // Song Data
    $scope.songs = [
        {
            id: "1",
            mood: "happy",
            title: "Suzume feat. Toaka",
            artist: "RADWIMPS",
            url: "src/mp3/19.mp3",
            albumart: "src/img/19.jpg",
            album: "Suzume no Tonjari"
        },
        {
            id: "2",
            mood: "happy",
            title: "Idol",
            artist: "YAOSOBI",
            url: "src/mp3/2.mp3",
            albumart: "src/img/2.jpg",
            album: "Oshi no Ko"
        },
        {
            id: "3",
            mood: "sad",
            title: "Mephisto",
            artist: "Ziyoou-vachi",
            url: "src/mp3/3.mp3",
            albumart: "src/img/3.jpg",
            album: "Oshi no Ko"
        },
        {
            id: "4",
            mood: "happy",
            title: "BUSSIN'",
            artist: "Twisted",
            url: "src/mp3/4.mp3",
            albumart: "src/img/4.jpg",
            album: "NCS"
        },
        {
            id: "5",
            mood: "happy",
            title: "Lies",
            artist: "Diamond Eyes",
            url: "src/mp3/5.mp3",
            albumart: "src/img/5.jpg",
            album: "NCS"
        },
        {
            id: "6",
            mood: "instrument",
            title: "I Like It",
            artist: "Defx x P for Parker x Fame Sounds",
            url: "src/mp3/6.mp3",
            albumart: "src/img/6.jpg",
            album: "NCS"
        },
        {
            id: "7",
            mood: "instrument",
            title: "Reason",
            artist: "MANIA",
            url: "src/mp3/7.mp3",
            albumart: "src/img/7.jpg",
            album: "NCS"
        },
        {
            id: "8",
            mood: "instrument",
            title: "Calling Out Your Name (ft. Lottie Jones)",
            artist: "MANIA & Tom Wigley",
            url: "src/mp3/8.mp3",
            albumart: "src/img/8.jpg",
            album: "NCS"
        },
        {
            id: "9",
            mood: "happy",
            title: "Throne",
            artist: "Tomatow & SagaB & Adam Putra",
            url: "src/mp3/9.mp3",
            albumart: "src/img/9.jpg",
            album: "NCS"
        },
        {
            id: "10",
            mood: "instrument",
            title: "Memory Box",
            artist: "ROY KNOX",
            url: "src/mp3/10.mp3",
            albumart: "src/img/10.jpg",
            album: "NCS"
        },
        {
            id: "11",
            mood: "sad",
            title: "Back To You",
            artist: "Nightcore mania",
            url: "src/mp3/11.mp3",
            albumart: "src/img/11.jpg",
            album: "Nightcore"
        },
        {
            id: "12",
            mood: "happy",
            title: "Dandelions",
            artist: "Ruth B",
            url: "src/mp3/12.mp3",
            albumart: "src/img/12.jpg",
            album: "Nightcore"
        },
        {
            id: "13",
            mood: "instrument",
            title: "Move Into Light",
            artist: "NightStep",
            url: "src/mp3/13.mp3",
            albumart: "src/img/13.jpg",
            album: "Nightcore"
        },
        {
            id: "14",
            mood: "happy",
            title: "Don't you Worry Child",
            artist: "Beth B",
            url: "src/mp3/14.mp3",
            albumart: "src/img/14.jpg",
            album: "Nightcore"
        },
        {
            id: "15",
            mood: "sad",
            title: "Dynasty",
            artist: "Miia",
            url: "src/mp3/15.mp3",
            albumart: "src/img/15.jpg",
            album: "Nightcore"
        },
        {
            id: "16",
            mood: "happy",
            title: "The Girl [Different Heaven Remix]",
            artist: "HellBerg ft. Cozi Zuehlsdorff",
            url: "src/mp3/16.mp3",
            albumart: "src/img/16.jpg",
            album: "Nightcore"
        },
        {
            id: "17",
            mood: "happy",
            title: "Royalty",
            artist: "Ezgod, Maestro Chives, Neoni",
            url: "src/mp3/17.mp3",
            albumart: "src/img/17.jpg",
            album: "Nightcore"
        },
        {
            id: "18",
            mood: "sad",
            title: "Sorry",
            artist: "NightStep",
            url: "src/mp3/18.mp3",
            albumart: "src/img/18.jpg",
            album: "Nightcore"
        },
        {
            id: "19",
            mood: "happy",
            title: "Shatter Me",
            artist: "NightStep",
            url: "src/mp3/1.mp3",
            albumart: "src/img/1.jpg",
            album: "NightCore"
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
    $scope.showAbout = () => {
        $scope.about = !$scope.about
        if($scope.about) document.body.style.overflow = "hidden"
        else document.body.style.overflow = "auto"
    }

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
            if(timeLeft < 10 && timeLeft > 0) {
                if(document.getElementById("NextCard"))
                    if(document.getElementById("NextCard").style.display != 'block'){
                        document.getElementById("NextCard").style.display = 'block'
                        setTimeout(()=>document.getElementById("NextCard").style.display = 'none',4550)
                    }
            }
        }
        checkIfTrackIsEndingSoon()
    })

    function downloadText() {
        let text = 'Playlist:\n'
        let i=1
        $scope.playlist.forEach(song=> {
            text += `${i}.Song Title: ${song.title}, Song Artist: ${song.artist}, Song Album: ${song.album}, Song Mood: ${song.mood}\n`
            i+=1
        })
        console.log(encodeURIComponent(text))
        var dataUrl = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
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
            document.body.style.overflow = "hidden"
            document.getElementById('in-de-vbar').style.display='block'
            $scope.incr = true
            document.getElementById("c").click()
            setTimeout(()=> {
                document.getElementById('in-de-vbar').style.display='none'
                $scope.incr = false
            },500)
        } else if(e.keyCode == 40) {
            document.body.style.overflow = "hidden"
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

window.addEventListener('keydown', function() {
    if (event.keyCode == 32) document.body.style.overflow = "hidden"
})
window.addEventListener('keyup', function() {
    if (event.keyCode == 32 || event.keyCode == 40 || event.keyCode == 38) document.body.style.overflow = "auto"
})