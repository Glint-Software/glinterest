import { useState, useEffect } from 'react';
import api from '../../utils/api.js';

export default function TagFilter({ onTagSelect, selectedTags = [] }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    api.get('/api/search/tags').then(setTags).catch(console.error);
  }, []);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      onTagSelect(selectedTags.filter(t => t !== tag));
    } else {
      onTagSelect([...selectedTags, tag]);
    }
  };

  return (
    <div className="tag-filter-bar">
      {tags.slice(0, 12).map(t => (
        <button
          key={t.tag}
          className={`tag-filter-btn ${selectedTags.includes(t.tag) ? 'active' : ''}`}
          onClick={() => toggleTag(t.tag)}
        >
          #{t.tag}
        </button>
      ))}
      {selectedTags.length > 0 && (
        <button className="tag-filter-btn" onClick={() => onTagSelect([])}>
          Clear all
        </button>
      )}
    </div>
  );
}
