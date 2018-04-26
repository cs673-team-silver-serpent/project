export class User {
    _id: String
    firstName: String
    lastName: String
    title: String
    email: String
    password: String
    __v: number
}

export enum Roles {
    admin = 'admin',
    user = 'user',
    visitor = 'visitor'
};