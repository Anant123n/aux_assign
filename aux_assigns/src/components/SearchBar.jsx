import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-bar">
      <span className="sr-only">Search all widgets</span>
      <Search size={16} aria-hidden="true" />
      <input
        type="search"
        placeholder="Search all widgets..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value && (
        <button type="button" aria-label="Clear search" onClick={() => onChange("")}>
          <X size={15} aria-hidden="true" />
        </button>
      )}
    </label>
  );
}
