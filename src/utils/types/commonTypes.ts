export enum Genders {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export type RegisterUserRequest = {
    username: string;
    email: string;
    name: string;
    password: string;
    gender: string,
    date_of_birth: Date,
    phone: string,
    eye_deciease: string,
    location: string,
    occupation: string
}
