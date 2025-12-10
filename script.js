const image = document.querySelector("#cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const background = document.getElementById("background");

// Music
const songs = [
  {
    path:
      "Media/fadayi.mp3",
    displayName: "Balast",
    artist: "Fadayi",
    cover:
      "cover-art-music/Fadayi.jpg",
  },
  {
    path: "Media/bahram.mp3",
    displayName: "Khoone Khorshid",
    artist: "Bahram ft Sorena",
    cover: "cover-art-music/Bahram.webp",
  },
  {
    path:
      "Media/poori.m4a",
    displayName: "Untitle |||",
    artist: "God Poori",
    cover:
      "cover-art-music/Poori.jpg",
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  if (!isPlaying) {
    // موزیک در حال پخش نیست → پلی کن
    music.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    isPlaying = true;

  } else {
    // موزیک در حال پخش است → پاز کن
    music.pause();
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    isPlaying = false;
  }
}

// Update DOM
function loadSong(song) {
  console.log(song);
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = song.path;
  changeCover(song.cover);
}

function changeCover(cover) {
  image.classList.remove("active");
  setTimeout(() => {
    image.src = cover;
    image.classList.add("active");
  }, 100);
  background.src = cover;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  music.play();
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  music.play();
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const duration = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = durationMinutes + ":" + durationSeconds;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners


playBtn.addEventListener("click", playSong);

prevBtn.addEventListener("click", prevSong);
prevBtn.addEventListener("touchstart", prevSong);

nextBtn.addEventListener("click", nextSong);
nextBtn.addEventListener("touchstart", nextSong);

music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);

progressContainer.addEventListener("click", setProgressBar);
progressContainer.addEventListener("touchstart", setProgressBar);