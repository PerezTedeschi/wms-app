export interface claimModel {
  name: string;
  value: string;
}

export interface userCredentialsModel {
  email: string;
  password: string;
}

export interface authenticationResponseModel {
  token: string;
  expiration: Date;
}
