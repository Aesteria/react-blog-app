import { SignUpAction } from './signUpActions';

type SignUpState = {
  username: {
    value: string;
    hasErrors: boolean;
    message: string;
    isUnique: boolean;
    checkCount: number;
  };
  email: {
    value: string;
    hasErrors: boolean;
    message: string;
    isUnique: boolean;
    checkCount: number;
  };
  password: {
    value: string;
    hasErrors: boolean;
    message: string;
  };
  submitCount: number;
};

export const signUpReducer = (
  draft: SignUpState,
  action: SignUpAction
): void => {
  switch (action.type) {
    case 'validateUsername':
      draft.username.hasErrors = false;
      draft.username.value = action.payload;

      if (draft.username.value.length > 30) {
        draft.username.hasErrors = true;
        draft.username.message = 'Username cannot exceed 30 characters';
      }
      if (
        draft.username.value &&
        !/^([a-zA-Z0-9]+)$/.test(draft.username.value)
      ) {
        draft.username.hasErrors = true;
        draft.username.message =
          'Username can only contain letters and numbers.';
      }
      break;
    case 'validateUsernameWithDelay':
      if (draft.username.value.length < 3) {
        draft.username.hasErrors = true;
        draft.username.message = 'Username must be at least 3 characters';
      }
      if (!draft.username.hasErrors && !action.payload?.noRequest) {
        draft.username.checkCount++;
      }
      break;
    case 'isUsernameUnique':
      if (action.payload) {
        draft.username.hasErrors = true;
        draft.username.isUnique = false;
        draft.username.message = 'That username already taken';
      } else {
        draft.username.isUnique = true;
      }
      break;
    case 'validateEmail':
      draft.email.hasErrors = false;
      draft.email.value = action.payload;
      break;
    case 'validateEmailWithDelay':
      if (!/^\S+@\S+$/.test(draft.email.value)) {
        draft.email.hasErrors = true;
        draft.email.message = 'You must provide a valid email address';
      }
      if (!draft.email.hasErrors && !action.payload?.noRequest) {
        draft.email.checkCount++;
      }
      break;
    case 'isEmailUnique':
      if (action.payload) {
        draft.email.hasErrors = true;
        draft.email.isUnique = false;
        draft.email.message = 'That email is already being used.';
      } else {
        draft.email.isUnique = true;
      }
      break;
    case 'validatePassword':
      draft.password.hasErrors = false;
      draft.password.value = action.payload;

      if (draft.password.value.length > 50) {
        draft.password.hasErrors = true;
        draft.password.message = 'Password cannot exceed 50 characters';
      }
      break;
    case 'validatePasswordWithDelay':
      if (draft.password.value.length < 12) {
        draft.password.hasErrors = true;
        draft.password.message = 'Password must be at least 12 characters';
      }
      break;
    case 'submitForm':
      const isUsernameValid =
        !draft.username.hasErrors && draft.username.isUnique;
      const isEmailValid = !draft.email.hasErrors && draft.email.isUnique;
      const isPasswordValid = !draft.password.hasErrors;

      const isFormValid = isUsernameValid && isEmailValid && isPasswordValid;

      if (isFormValid) {
        draft.submitCount++;
      }
      break;
    default:
      break;
  }
};
