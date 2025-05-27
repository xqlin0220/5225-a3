

export default function SearchByTag({ tags, onTagClick }) {
    const defaultTags = ['React', 'JavaScript', 'CSS', 'HTML', 'Node.js'];
  if (!tags || tags.length === 0) {
    tags = defaultTags;
  }
  return (
    <div className="search-by-tag">
      <h2>Search by Tag</h2>
      <ul>
        {tags.map((tag) => (
          <li key={tag} onClick={() => onTagClick(tag)}>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}