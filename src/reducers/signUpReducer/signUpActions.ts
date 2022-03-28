type ValidateUsername = {
  type: 'validateUsername';
  payload: string;
};

type ValidateUsernameWithDelay = {
  type: 'validateUsernameWithDelay';
  payload?: {
    noRequest: boolean;
  };
};

type IsUsernameUnique = {
  type: 'isUsernameUnique';
  payload: boolean;
};

type ValidateEmail = {
  type: 'validateEmail';
  payload: string;
};

type ValidateEmailWithDelay = {
  type: 'validateEmailWithDelay';
  payload?: {
    noRequest: boolean;
  };
};

type IsEmailUnique = {
  type: 'isEmailUnique';
  payload: boolean;
};

type ValidatePassword = {
  type: 'validatePassword';
  payload: string;
};

type ValidatePasswordWithDelay = {
  type: 'validatePasswordWithDelay';
};

type SubmitForm = {
  type: 'submitForm';
};

export type SignUpAction =
  | ValidateUsername
  | ValidateEmail
  | ValidatePassword
  | ValidateUsernameWithDelay
  | IsUsernameUnique
  | ValidateEmailWithDelay
  | IsEmailUnique
  | ValidatePasswordWithDelay
  | SubmitForm;
