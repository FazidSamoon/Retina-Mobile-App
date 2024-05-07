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

//     type: String,
//     required: [true, "Please provide a username"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please provide a email"],
//     unique: true,
//   },
//   name: {
//     type: String,
//     required: [true, "Please provide a name"],
//   },
//   password: {
//     type: String,
//     required: [true, "Please provide a password"],
//     minlength: 8,
//   },
//   gender: {
//     type: String,
//     enum: ["male", "female", "other"],
//   },
//   date_of_birth: {
//     type: Date,
//   },
//   phone: {
//     type: String,
//   },
//   eye_deciease: {
//     type: String,
//   },
//   location: {
//     type: String,
//   },
//   occupation: {
//     type: String,
//   },