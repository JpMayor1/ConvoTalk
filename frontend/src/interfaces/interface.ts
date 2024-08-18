export interface User {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
}

export interface AuthState {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
  clearAuthUser: () => void;
}
