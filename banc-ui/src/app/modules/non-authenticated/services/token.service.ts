import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private _accessToken: string = '';
  private _refreshToken: string = '';

  setTokens(accessToken: string, refreshToken: string): void {
    this._accessToken = accessToken;
    this._refreshToken = refreshToken;
    localStorage.setItem('accessToken', this._accessToken);
    localStorage.setItem('refreshToken', this._refreshToken);
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }

  clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
