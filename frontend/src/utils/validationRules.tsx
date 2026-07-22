import { Rule } from "antd/es/form";

export const ValidationRules = {
    required: (fieldName: string) => ({
        required: true,
        message: `${fieldName} je obavezno polje!`,
    }),

    email: (): Rule => ({
        type: "email",
        message: "Unesite ispravnu email adresu!",
    }),

    minLength: (min: number, fieldName: string): Rule => ({
        min,
        message: `${fieldName} mora imati najmanje ${min} znakova!`,
    }),

    maxLength: (max: number, fieldName: string): Rule => ({
        max,
        message: `${fieldName} može imati najviše ${max} znakova!`,
    }),

    passwordStrength: (): Rule => ({
        pattern: /^(?=.*[A-Z])(?=.*\d).{4,}$/,
        message: "Lozinka mora imati najmanje 4 znaka, 1 veliko slovo i 1 broj!",
    }),

    confirmPassword: (getFieldValue: (name: string) => any): Rule => ({
        validator: (_, value) => {
            if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error("Lozinke se ne podudaraju!"));
        },
    }),

    phoneNumber: (): Rule => ({
        pattern: /^(?:\+385|0)\d{5,13}$/,
        message: "Unesi važeći broj mobitela!",
    }),

    checkBoxValidator: (): Rule => ({
        validator: (_, value) =>
            value
                ? Promise.resolve()
                : Promise.reject("Potvrda o prihvaćanju je obavezno polje!")
    }),

    fileSize: (maxSizeMB: number): Rule => ({
        validator: (_, value) => {
            if (!value || !value.fileList || value.fileList.length === 0) {
                return Promise.reject(new Error("Datoteka je obavezna!"));
            }

            const file = value.fileList[0].originFileObj;
            const maxSizeBytes = maxSizeMB * 1024 * 1024;

            if (file.size > maxSizeBytes) {
                return Promise.reject(
                    `Datoteka mora biti manja od ${maxSizeMB} MB!`
                );
            }

            return Promise.resolve();
        },
    }),

    noSpecialChars: (fieldName: string): Rule => ({
        pattern: /^[a-zA-Z0-9čćžšđČĆŽŠĐ\s_-]+$/,
        message: `${fieldName} ne smije sadržavati nedopuštene specijalne znakove!`,    
    }),
}