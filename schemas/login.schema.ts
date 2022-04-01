import * as yup from 'yup';

const schema = yup
    .object({
        id: yup.string()
            .required('El número de cédula del titular es requerido.')
            .matches(/^\d+$/, 'El número de cédula del titular sólo debe contener números.')
            .min(4, 'El número de cédula del titular debe tener mínimo 4 dígitos.')
    })
    .required();

export default schema