import axios from 'axios';
import { ChangeEvent, useContext, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { ApiService } from '../../api/ApiService';
import { AppDispatchContext } from '../../context/appContext';
import { Post } from '../../types/post';
import { formatDate } from '../../utils/formatDate';

type InitialState = {
  searchTerm: string;
  results: Post[];
  show: string;
};

const Search = () => {
  const [state, setState] = useImmer<InitialState>({
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
            onChange={searchChangeHandler}
            value={state.searchTerm}
          />
          <span className="close-live-search" onClick={closeSearchHandler}>
            <i className="fas fa-times-circle"></i>
          </span>
        </div>
      </div>

      <div className="search-overlay-bottom">
        <div className="container container--narrow py-3">
          <div
            className={
              'circle-loader ' +
              (state.show === 'loading' ? 'circle-loader--visible' : '')
            }
          ></div>
          <div
            className={
              'live-search-results ' +
              (state.show === 'results' ? 'live-search-results--visible' : '')
            }
          >
            {Boolean(state.results.length) && (
              <div className="list-group shadow-sm">
                <div className="list-group-item active">
                  <strong>Search Results</strong> ({state.results.length}
                  {state.results.length > 1 ? ' items ' : ' item '}
                  found)
                </div>
                {state.results.map(
                  ({
                    _id,
                    author: { avatar, username },
                    title,
                    createdDate,
                  }) => {
                    const dateFormatted = formatDate(createdDate);

                    return (
                      <Link
                        onClick={() => appDispatch({ type: 'closeSearch' })}
                        key={_id}
                        to={`/post/${_id}`}
                        className="list-group-item list-group-item-action"
                      >
                        <img
                          className="avatar-tiny"
                          src={avatar}
                          alt="profile avatar"
                        />{' '}
                        <strong>{title}</strong>{' '}
                        <span className="text-muted small">
                          by {username} on {dateFormatted}
                        </span>
                      </Link>
                    );
                  }
                )}
              </div>
            )}
            {!Boolean(state.results.length) && (
              <p className="alert alert-danger text-center shadow-sm">
                We could not find any results
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
