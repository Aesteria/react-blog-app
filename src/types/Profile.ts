type ProfileCounts = {
  followerCount: number;
  followingCount: number;
  postCount: number;
};

type PostAuthor = {
  avatar: string;
  username: string;
};

export type ProfileData = {
  profileAvatar: string;
  profileUsername: string;
  isFollowing: boolean;
  counts: ProfileCounts;
};

export type ProfilePost = {
  author: PostAuthor;
  body: string;
  title: string;
  createdDate: string;
  isVisitorOwner: boolean;
  _id: string;
};
