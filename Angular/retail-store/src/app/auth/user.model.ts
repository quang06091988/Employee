export class User {
    constructor(
        public email: string,
        public id: string,
        public token: string,
        public tokenExpirationDate: Date
    ) {}

    checkToken() {
        if(!this.tokenExpirationDate || this.tokenExpirationDate < new Date()) {
            return false;
        }
        return true;
    }
}
