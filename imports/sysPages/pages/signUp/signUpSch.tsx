import { validarEmail } from "/imports/libs/validaEmail";
import { IDoc } from "/imports/typings/IDoc";
import { ISchema } from "/imports/typings/ISchema";

export interface ISignUp extends IDoc {
    email: string;
    password: string;
}

const signUpSchema: ISchema<ISignUp> = {
    email: {
        type: 'String',
        label: 'Email',
        optional: false,
        validationFunction: (value: string) => {
            if (!value) return undefined;
            const email = validarEmail(value);
            if (!email) return 'Email inválido';
            return undefined;
        }
    },

    password: {
        type: 'String',
        label: 'Senha',
        optional: false,
    }
}

export default signUpSchema