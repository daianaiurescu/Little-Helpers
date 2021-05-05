// export interface User {
//   id : number;
//   firstName : string;
//   lastName : string;
//   emailAddress : string;
//   role : string;
//   token : string;
// }

export class User {

  constructor(
    public id: number,
    public lastName: string,
    public firstName: string,
    public emailAddress: string,
    public role: string,
    // tslint:disable-next-line:variable-name
    private _token: string,
    // tslint:disable-next-line:variable-name
    private _tokenExpirationDate: Date
  ) {}
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

}
