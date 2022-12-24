export type UserFollower = {
  userId: string;
};

export type UserFollowing = {
  userId: string;
};

export type AddFollowData = {
  authorId: string;
  currentUserId: string;
};
