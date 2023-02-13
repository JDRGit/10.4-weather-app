import React from "react";
import ReactAudioPlayer from "react-audio-player";
import song from "./../assets/Airport-Lounge.mp3";

const Music = () => (
  <div className="music-container">
    <ReactAudioPlayer src={song} autoPlay controls loop />  
  </div>
);

export default Music;
