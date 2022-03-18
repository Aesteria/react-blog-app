import { CancelTokenSource } from 'axios';
import { EditPostAction } from './editPostActions';

export type EditPostState = {
  body: {
    value: string;
    hasError: boolean;
    errorMessage: string;
  };
  title: {
    value: string;
    hasError: boolean;
    errorMessage: string;
  };
  isFetching: boolean;
  isSaving: boolean;
  id: string;
  submitCancelToken: CancelTokenSource;
};

export const editPostReducer = (
  draft: EditPostState,
  action: EditPostAction
): void => {
  switch (action.type) {
    case 'fetchResolved':
      draft.body.value = action.payload.body;
      draft.title.value = action.payload.title;
      draft.isFetching = false;
      break;
    case 'changeBody':
      draft.body.value = action.payload;
      if (action.payload.trim() === '') {
        draft.body.hasError = true;
        draft.body.errorMessage = 'You must provide a body.';
      } else {
        draft.body.hasError = false;
      }
      break;
    case 'changeTitle':
      draft.title.value = action.payload;
      if (action.payload.trim() === '') {
        draft.title.hasError = true;
        draft.title.errorMessage = 'You must provide a title.';
      } else {
        draft.title.hasError = false;
      }
      break;
    case 'saveResolved':
      draft.isSaving = false;
      break;
    case 'savePending':
      draft.isSaving = true;
      break;
    case 'setCancelSource':
      draft.submitCancelToken = action.payload;
      break;
    default:
      break;
  }
};
