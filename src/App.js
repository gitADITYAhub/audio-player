import React, { useState, useEffect } from 'react';
import AudioUploader from './components/AudioUploader';
import AudioPlayer from './components/AudioPlayer';

const App = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Load files from local storage
    const savedFiles = JSON.parse(localStorage.getItem('files')) || [];
    setFiles(savedFiles.map(file => new File([file], file.name, { type: file.type })));
  }, []);

  const handleUpload = (file) => {
    const updatedFiles = [...files, file];
    setFiles(updatedFiles);
    localStorage.setItem('files', JSON.stringify(updatedFiles));
  };

  return (
    <div className="App">
      <AudioUploader onUpload={handleUpload} />
      <AudioPlayer files={files} setFiles={setFiles} />

    </div>
  );
};

export default App;

