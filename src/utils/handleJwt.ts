import { authenticationResponseModel } from "../models/auth.models";
import { claimModel } from "./../models/auth.models";

const tokenKey = "token";
const expirationKey = "token-expiration";

export function saveToken(authData: authenticationResponseModel) {
  localStorage.setItem(tokenKey, authData.token);
  localStorage.setItem(expirationKey, authData.expiration.toString());
}

export function getClaims(): claimModel[] {
  const token = localStorage.getItem(tokenKey);
  if (!token) return [];

  const expiration = localStorage.getItem(expirationKey)!;
  const expirationDate = new Date(expiration);

  if (expirationDate <= new Date()) {
    deleteToken();
    return [];
  }

  const dataToken = JSON.parse(atob(token.split(".")[1]));
  const response: claimModel[] = [];
  for (const property in dataToken) {
    response.push({ name: property, value: dataToken[property] });
  }

  return response;
}

export function deleteToken() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(expirationKey);
}

export function getToken(): string {
  return localStorage.getItem(tokenKey)!;
}