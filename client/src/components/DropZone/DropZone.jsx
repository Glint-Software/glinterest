import { useState, useRef } from 'react';
import './DropZone.css';

export default function DropZone({ onFileSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => { handleDrag(e); setIsDragging(true); };
  const handleDragOut = (e) => { handleDrag(e); setIsDragging(false); };

  const handleDrop = (e) => {
    handleDrag(e);
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  };

  return (
    <div
      className={`dropzone ${isDragging ? 'dragging' : ''}`}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <p>Drag and drop an image here, or click to browse</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
      />
    </div>
  );
}
