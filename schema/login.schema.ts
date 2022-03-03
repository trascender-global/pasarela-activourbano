import * as yup from 'yup';

const schema = yup
    .object({
        id: yup.string()
            .required('El documento de identidad es requerido.')
            .matches(/^\d+$/, 'El documento sólo debe contener números.')
            .min(4, 'El documento debe tener mínimo 4 dígitos.')
    })
    .required();

export default schema