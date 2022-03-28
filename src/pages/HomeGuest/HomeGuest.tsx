import axios from 'axios';
import { FormEvent, useContext, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useImmerReducer } from 'use-immer';
import { ApiService } from '../../api/ApiService';
import { AppDispatchContext } from '../../context/appContext';
import { signUpReducer } from '../../reducers/signUpReducer/signUpReducer';
import Page from '../Page/Page';

const initialState = {
  username: {
    value: '',
    hasErrors: false,
    message: '',
    isUnique: false,
    checkCount: 0,
  },
  email: {
    value: '',
    hasErrors: false,
    message: '',
    isUnique: false,
    checkCount: 0,
  },
  password: {
    value: '',
    hasErrors: false,
    message: '',
  },
  submitCount: 0,
};

const HomeGuest = () => {
  const [state, dispatch] = useImmerReducer(signUpReducer, initialState);
  const appDispatch = useContext(AppDispatchContext);

  const submitUserHandler = async (event: FormEvent) => {
    event.preventDefault();

    dispatch({ type: 'validateUsername', payload: state.username.value });
    dispatch({
      type: 'validateUsernameWithDelay',
      payload: { noRequest: true },
    });
    dispatch({ type: 'validateEmail', payload: state.email.value });
    dispatch({ type: 'validateEmailWithDelay', payload: { noRequest: true } });
    dispatch({ type: 'validatePassword', payload: state.password.value });
    dispatch({ type: 'validatePasswordWithDelay' });

    dispatch({ type: 'submitForm' });
  };

  useEffect(() => {
    if (state.username.value) {
      const delay = setTimeout(() => {
        dispatch({ type: 'validateUsernameWithDelay' });
      }, 800);

      return () => clearTimeout(delay);
    }
  }, [state.username.value, dispatch]);

  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(() => {
        dispatch({ type: 'validateEmailWithDelay' });
      }, 800);

      return () => clearTimeout(delay);
    }
  }, [state.email.value, dispatch]);

  useEffect(() => {
    if (state.password.value) {
      const delay = setTimeout(() => {
        dispatch({ type: 'validatePasswordWithDelay' });
      }, 800);

      return () => clearTimeout(delay);
    }
  }, [state.password.value, dispatch]);

  useEffect(() => {
    if (state.username.checkCount) {
      const source = axios.CancelToken.source();

      const delay = setTimeout(() => {
        const fetchResults = async () => {
          try {
            const response = await ApiService.doesUsernameExist(
              state.username.value,
              { cancelToken: source.token }
            );
            dispatch({ type: 'isUsernameUnique', payload: response.data });
          } catch (e) {
            console.log(
              'There was an error while check username or request was cancelled.'
            );
          }
        };
        fetchResults();
      }, 900);

      return () => {
        clearTimeout(delay);
        source.cancel();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.username.checkCount, dispatch]);

  useEffect(() => {
    if (state.email.checkCount) {
      const source = axios.CancelToken.source();

      const delay = setTimeout(() => {
        const fetchResults = async () => {
          try {
            const response = await ApiService.doesEmailExist(
              state.email.value,
              { cancelToken: source.token }
            );
            dispatch({ type: 'isEmailUnique', payload: response.data });
          } catch (e) {
            console.log(
              'There was an error while check email or request was cancelled.'
            );
          }
        };
        fetchResults();
      }, 900);

      return () => {
        clearTimeout(delay);
        source.cancel();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.email.checkCount, dispatch]);

  // Register new user request
  useEffect(() => {
    if (state.submitCount) {
      const source = axios.CancelToken.source();

      const delay = setTimeout(() => {
        const fetchResults = async () => {
          try {
            const response = await ApiService.signup(
              {
                username: state.username.value,
                email: state.email.value,
                password: state.password.value,
              },
              { cancelToken: source.token }
            );
            appDispatch({ type: 'LOGIN', payload: response.data });
            appDispatch({
              type: 'ADD_FLASH_MESSAGE',
              payload: 'Welcome to your account.',
            });
          } catch (e) {
            console.log(
              'There was an error while check username or request was cancelled.'
            );
          }
        };
        fetchResults();
      }, 900);

      return () => {
        clearTimeout(delay);
        source.cancel();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.submitCount, dispatch]);

  return (
    <Page wide={true} title="Welcome">
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <h1 className="display-3">Remember Writing?</h1>
          <p className="lead text-muted">
            Are you sick of short tweets and impersonal &ldquo;shared&rdquo;
            posts that are reminiscent of the late 90&rsquo;s email forwards? We
            believe getting back to actually writing is the key to enjoying the
            internet again.
          </p>
        </div>
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
          <form onSubmit={submitUserHandler}>
            <div className="form-group">
              <label htmlFor="username-register" className="text-muted mb-1">
                <small>Username</small>
              </label>
              <input
                id="username-register"
                name="username"
                className="form-control"
                type="text"
                placeholder="Pick a username"
                autoComplete="off"
                onChange={(e) =>
                  dispatch({
                    type: 'validateUsername',
                    payload: e.target.value,
                  })
                }
                value={state.username.value}
              />
              <CSSTransition
                in={state.username.hasErrors}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit
              >
                <div className="alert alert-danger small liveValidateMessage">
                  {state.username.message}
                </div>
              </CSSTransition>
            </div>
            <div className="form-group">
              <label htmlFor="email-register" className="text-muted mb-1">
                <small>Email</small>
              </label>
              <input
                id="email-register"
                name="email"
                className="form-control"
                type="text"
                placeholder="you@example.com"
                autoComplete="off"
                onChange={(e) =>
                  dispatch({
                    type: 'validateEmail',
                    payload: e.target.value,
                  })
                }
                value={state.email.value}
              />
              <CSSTransition
                in={state.email.hasErrors}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit
              >
                <div className="alert alert-danger small liveValidateMessage">
                  {state.email.message}
                </div>
              </CSSTransition>
            </div>
            <div className="form-group">
              <label htmlFor="password-register" className="text-muted mb-1">
                <small>Password</small>
              </label>
              <input
                id="password-register"
                name="password"
                className="form-control"
                type="password"
                placeholder="Create a password"
                onChange={(e) =>
                  dispatch({
                    type: 'validatePassword',
                    payload: e.target.value,
                  })
                }
                value={state.password.value}
              />
              <CSSTransition
                in={state.password.hasErrors}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit
              >
                <div className="alert alert-danger small liveValidateMessage">
                  {state.password.message}
                </div>
              </CSSTransition>
            </div>
            <button
              type="submit"
              className="py-3 mt-4 btn btn-lg btn-success btn-block"
            >
              Sign up for ComplexApp
            </button>
          </form>
        </div>
      </div>
    </Page>
  );
};

export default HomeGuest;
