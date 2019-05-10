export class UserSessionModel {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    imageUrl: string;

    constructor(id: number, firstName: string, lastName: string, userName: string, imageUrl: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.imageUrl = imageUrl;
    }
}
