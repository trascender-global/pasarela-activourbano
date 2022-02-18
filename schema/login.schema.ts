import * as yup from 'yup';

const schema = yup
    .object({
        user: yup.string().required('El usuario es requerido'),
        password: yup
            .string()
            .min(6, 'La contraseña debe contener mínimo 6 caracteres')
            .required(),
    })
    .required();

export default schema