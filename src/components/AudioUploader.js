import React from 'react';
const AudioUploader = ({ onUpload }) => {
  // Ref to the hidden file input element
  const hiddenFileInput = React.useRef(null);


  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  // Call the onUpload prop when a file is selected
  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="upload-container">
      <button onClick={handleClick} className="upload-button">
        Upload Audio File
      </button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleFileChange}
        style={{display: 'none'}} // Hide the default input
        accept="audio/*"
      />
    </div>
  );
};

export default AudioUploader;
