import React, { useState } from "react";
import "./Music.css";

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-container">
      <audio
        src="path/to/your/music.mp3"
        autoPlay={isPlaying}
        loop
        onEnded={togglePlay}
        controls
      />
      <button onClick={togglePlay}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default App;
