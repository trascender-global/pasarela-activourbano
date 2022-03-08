import { faker } from '@faker-js/faker'
import { EstadoCuenta, EstadoCuentaDetallado } from '@/types/ApiResponses'
import { formatCurrency } from '@lib/format'

export function mockEstadosCuenta(n = 5): EstadoCuenta[] {
    const estadosCuenta: EstadoCuenta[] = Array(n)
    for (let i = 0; i < n; i++) {

        const referencia = faker.random.alphaNumeric(15)
        const fechacorte = faker.date.soon(30).toJSON()
        const contrato_cliente = faker.datatype.number({ min: 1000, max: 9999 }).toString()
        const direccion_cliente = faker.address.streetAddress(true)
        const valor = faker.datatype.float({ min: 900000.0, precision: 2 })
        const nro_id_cliente = faker.unique(faker.datatype.number, [{ max: 199999999 }]).toString()
        const valorTexto = formatCurrency(valor)
        const fechacorte_texto = new Date(fechacorte).toLocaleDateString('es-419', { year: 'numeric', month: 'long', day: 'numeric' })

        const estadoCuenta: EstadoCuenta = {
            referencia,
            fechacorte,
            contrato_cliente,
            direccion_cliente,
            valor,
            nro_id_cliente,
            valorTexto,
            fechacorte_texto
        }
        estadosCuenta[i] = estadoCuenta
    }

    return estadosCuenta
}
export function mockDetalladoEstadoCuenta(referencia: string) {
    return null
}