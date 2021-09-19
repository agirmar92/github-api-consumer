export type UserCompact = {
  name: string;
  img_url: string;
};

export type UsersSearchResults = {
  users: Array<UserCompact>;
  message?: string;
};
