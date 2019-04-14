export class UserSessionModel {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;

    constructor(id: number, firstName: string, lastName: string, userName: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
    }
}
