export interface User {
    _id: string;
    name: {
        _id: string,
        firstName: string,
        lastName: string
    };
    userName: string,
    emailAddress: string,
    __v: number;
}
