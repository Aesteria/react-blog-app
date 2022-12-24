import { useEffect } from 'react';
import {
  fetchUsers,
  selectUserById,
  selectUsersError,
  selectUsersStatus,
} from '../../../store/usersSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import RequestStatus from '../../../constants/requestStatus';

export default function useUsersProfile(authorId?: string) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUserById(state, authorId));

  const usersStatus = useAppSelector(selectUsersStatus);
  const usersError = useAppSelector(selectUsersError);

  useEffect(() => {
    if (usersStatus === RequestStatus.Idle) {
      dispatch(fetchUsers());
    }
  }, [dispatch, usersStatus]);

  return {
    user,
    usersError,
    usersStatus,
  };
}
