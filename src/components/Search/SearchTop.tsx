import { ChangeEvent } from 'react';

type SearchTopProps = {
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCloseSearch: () => void;
  searchTerm: string;
};

const SearchTop = ({
  onSearchChange,
  searchTerm,
  onCloseSearch,
}: SearchTopProps) => {
  return (
    <div className="search-overlay-top shadow-sm">
      <div className="container container--narrow">
        <label htmlFor="live-search-field" className="search-overlay-icon">
          <i className="fas fa-search"></i>
        </label>
        <input
          autoFocus
          type="text"
          autoComplete="off"
          id="live-search-field"
          className="live-search-field"
          placeholder="What are you interested in?"
          onChange={onSearchChange}
          value={searchTerm}
        />
        <span className="close-live-search" onClick={onCloseSearch}>
          <i className="fas fa-times-circle"></i>
        </span>
      </div>
    </div>
  );
};

export default SearchTop;
