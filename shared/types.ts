export type UserCompact = {
  username: string;
  imgUrl: string;
};

export type UserDetailed = {
  createdAt: Date;
  email: string;
  imgUrl: string;
  location: string;
  name: string;
  url: string;
  username: string;
};

export type UsersSearchResults = {
  users: Array<UserCompact>;
  message?: string;
};

export type UserFetchResults = {
  user: UserDetailed | null;
  message?: string;
};
