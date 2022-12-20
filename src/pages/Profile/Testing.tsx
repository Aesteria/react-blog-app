import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectUserById } from '../../store/usersSlice';

type TestingProps = {
  follower: string;
};

export default function Testing({ follower }: TestingProps) {
  const user = useAppSelector((state) => selectUserById(state, follower));

  return <div>{user?.username}</div>;
}
