export class User {


    firstName: String
    middleName: String
    lastName: String
    title: String
    email: String
    role: Roles
    
}

export enum Roles {
    admin = 'admin',
    user = 'user',
    visitor = 'visitor'
};