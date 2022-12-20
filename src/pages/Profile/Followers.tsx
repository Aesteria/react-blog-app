import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectUsers } from '../../store/usersSlice';

export default function Followers() {
  console.log('h');

  const users = useAppSelector(selectUsers);
  console.log(users);

  return <div>Followers</div>;
}
