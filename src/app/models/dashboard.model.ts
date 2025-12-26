export interface DashboardCard {
  image: string;
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  onClickUrl: string;
}

export interface IUser {
  authenticated: boolean;
  user: {};
  username?: string;
  email?: string;
  empId?: number;
  designation?: string;
  givenName?: string;
  familyName?: string;
}
