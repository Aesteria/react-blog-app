type ProfileCounts = {
  followerCount: number;
  followingCount: number;
  postCount: number;
};

export type ProfileFollow = {
  username: string;
  avatar: string;
};

export type ProfileData = {
  profileAvatar: string;
  profileUsername: string;
  isFollowing: boolean;
  counts: ProfileCounts;
};
