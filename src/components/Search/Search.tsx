import axios from 'axios';
import { ChangeEvent, useContext, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { ApiService } from '../../api/ApiService';
import { AppDispatchContext } from '../../context/appContext';
import { Post } from '../../types/post';
import SearchBottom from './SearchBottom';
import SearchTop from './SearchTop';

type InitialSearchState = {
  searchTerm: string;
  results: Post[];
  show: string;
};

const Search = () => {
  const [state, setState] = useImmer<InitialSearchState>({
    searchTerm: '',
    results: [],
    show: 'neither',
  });
  const appDispatch = useContext(AppDispatchContext);

  const closeSearchHandler = () => {
    appDispatch({ type: 'closeSearch' });
  };

  const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setState((draft) => {
      draft.searchTerm = event.target.value;
    });
  };

  useEffect(() => {
    if (state.searchTerm.trim()) {
      const source = axios.CancelToken.source();

      setState((draft) => {
        draft.show = 'loading';
      });
      const delay = setTimeout(() => {
        const fetchResults = async () => {
          try {
            const response = await ApiService.fetchSearchResults(
              state.searchTerm,
              { cancelToken: source.token }
            );
            setState((draft) => {
              draft.results = response.data;
              draft.show = 'results';
            });
          } catch (e) {
            console.log(
              'There was an error while fetch results or request was cancelled.'
            );
          }
        };
        fetchResults();
      }, 900);

      return () => {
        clearTimeout(delay);
        source.cancel();
      };
    } else {
      setState((draft) => {
        draft.show = 'neither';
      });
    }
  }, [state.searchTerm, setState]);

  useEffect(() => {
    const keypressHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        appDispatch({ type: 'closeSearch' });
      }
    };

    document.addEventListener('keyup', keypressHandler);

    return () => {
      document.removeEventListener('keyup', keypressHandler);
    };
  }, [appDispatch]);

  return (
    <div className="search-overlay">
      <SearchTop
        onSearchChange={searchChangeHandler}
        onCloseSearch={closeSearchHandler}
        searchTerm={state.searchTerm}
      />
      <SearchBottom
        onCloseSearch={closeSearchHandler}
        show={state.show}
        results={state.results}
      />
    </div>
  );
};

export default Search;
