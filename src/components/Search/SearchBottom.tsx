import { SearchResultsProps } from '../../types/search';
import SearchResults from './SearchResults';

const SearchBottom = ({ show, results, onCloseSearch }: SearchResultsProps) => {
  return (
    <div className="search-overlay-bottom">
      <div className="container container--narrow py-3">
        <div
          className={
            'circle-loader ' +
            (show === 'loading' ? 'circle-loader--visible' : '')
          }
        ></div>
        <SearchResults
          show={show}
          results={results}
          onCloseSearch={onCloseSearch}
        />
      </div>
    </div>
  );
};

export default SearchBottom;
