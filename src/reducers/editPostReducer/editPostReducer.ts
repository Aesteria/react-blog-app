import { CancelTokenSource } from 'axios';
import { EditPostAction } from './editPostActions';

export type EditPostState = {
  isFetching: boolean;
  isSaving: boolean;
  id: string;
  submitCancelToken: CancelTokenSource;
  notFound: boolean;
};

export const editPostReducer = (
  draft: EditPostState,
  action: EditPostAction
): void => {
  switch (action.type) {
    case 'fetchResolved':
      draft.isFetching = false;
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
    case 'notFound':
      draft.notFound = true;
      break;
    default:
      break;
  }
};
