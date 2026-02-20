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

export interface NavItem {
  label: string;
  icon?: string;
  route?: string;
  title?: string;
}

export interface ModuleItem {
  title: string;
  description: string;
  icon: string; // font-awesome icon
  actionLabel: string;
  url: string;
}

export interface Feature {
  key: string;
  name: string;
}

export interface SubModule {
  key: string;
  name: string;
  remoteEntry: string;
  url: string;
  features: Feature[];
}

export interface ModuleConfig {
  key: string;
  name: string;
  remoteEntry: string;
  url: string;
  subModules: SubModule[];
  dummyJwtAccessToken?: string;
}

export interface ModuleRoot {
  modules: ModuleConfig[];
}
