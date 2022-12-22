import { useEffect } from 'react';
import {
  fetchUsers,
  selectUserById,
  selectUsersError,
  selectUsersStatus,
} from '../../../store/usersSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import RequestStatus from '../../../constants/requestStatus';

export default function useUserProfile(authorId: string | undefined) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) =>
    selectUserById(state, authorId as string)
  );

  const userStatus = useAppSelector(selectUsersStatus);
  const userError = useAppSelector(selectUsersError);

  useEffect(() => {
    if (userStatus === RequestStatus.Idle) {
      dispatch(fetchUsers());
    }
  }, [dispatch, userStatus]);

  return {
    user,
    userError,
    userStatus,
  };
}
