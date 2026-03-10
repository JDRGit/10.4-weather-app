import { useEffect, useRef, useState } from "react";
import song from "./../assets/Airport-Lounge.mp3";

const Music = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      setBlocked(true);
    });

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => {
      audio.currentTime = 0;
      audio.play();
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
      setBlocked(false);
    }
  };

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value);
    audioRef.current.volume = val;
    setVolume(val);
  };

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    audioRef.current.currentTime = val;
    setCurrentTime(val);
  };

  const formatTime = (s) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div className="music-container">
      <audio ref={audioRef} src={song} preload="auto" />
      <div className="music-card">
        <div className="music-header">
          <span className="music-icon">🎵</span>
          <div>
            <p className="music-title">Airport Lounge</p>
            <p className="music-subtitle">Ambient · Background Music</p>
          </div>
        </div>

        {blocked && (
          <p className="music-autoplay-notice">Click play to start music</p>
        )}

        <div className="music-progress">
          <span className="music-time">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="music-seek"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
          />
          <span className="music-time">{formatTime(duration)}</span>
        </div>

        <div className="music-controls">
          <button className="music-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? "⏸" : "▶"}
          </button>
          <div className="music-volume">
            <span>🔈</span>
            <input
              type="range"
              className="music-seek"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolume}
            />
            <span>🔊</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;
