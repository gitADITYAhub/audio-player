import React, { useState, useEffect, useRef } from 'react';

const AudioPlayer = ({ files, setFiles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Load the current song
    if (files.length > 0 && currentIndex < files.length) {
      const objectURL = URL.createObjectURL(files[currentIndex]);
      audioRef.current.src = objectURL;
      // Automatically play the song if the user has interacted before
      if (userHasInteracted) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((e) => {
            console.error("Playback was prevented:", e);
            // Handle the error or indicate the user needs to interact
          });
        }
      }
      return () => URL.revokeObjectURL(objectURL);
    }
  }, [currentIndex, files, userHasInteracted]);

  const handleEnded = () => {
    // Automatically move to the next song when one ends
    const nextIndex = (currentIndex + 1) % files.length;
    setCurrentIndex(nextIndex);
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, fileIndex) => fileIndex !== index);
    setFiles(newFiles);
    localStorage.setItem('files', JSON.stringify(newFiles));
    if (currentIndex === index) {
      setCurrentIndex(0);
    }
  };

  const handlePlayClick = (index) => {
    setCurrentIndex(index);
    setUserHasInteracted(true);
    // Attempt to play the selected file
    audioRef.current.play().catch((e) => console.log(e));
  };

  return (
    <div className="playlist">
      <audio
        controls
        ref={audioRef}
        onEnded={handleEnded}
      />
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file ? file.name : 'Loading...'}
            <button onClick={() => removeFile(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AudioPlayer;
