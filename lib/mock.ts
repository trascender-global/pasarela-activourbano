import { faker } from '@faker-js/faker'
import { EstadoCuenta, EstadoCuentaDetallado } from '@/types/ApiResponses'
import { formatCurrency } from '@lib/format'

export function mockEstadosCuenta(n = 5): EstadoCuenta[] {
    const estadosCuenta: EstadoCuenta[] = Array(n)
    for (let i = 0; i < n; i++) {

        const referencia = faker.random.alphaNumeric(15, { bannedChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('') })
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
export function mockDetalladoEstadoCuenta(referencia: string): EstadoCuentaDetallado {
    const estadoCuenta: EstadoCuentaDetallado = {
        ean13: faker.random.alphaNumeric(13, { bannedChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('') }),
        referencia: faker.random.alphaNumeric(15, { bannedChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('') }),
        valor: '',
        fecha: new Date().toJSON(),
        fechaCorte: faker.date.soon(10).toJSON(),
        fechaVencimiento: faker.date.soon(30).toJSON(),
        fechaVencimiento_Recargo: faker.date.soon(40).toJSON(),
        fechaVencimientoRecargoTexto: '',
        nit_Empresa: faker.random.alphaNumeric(10, { bannedChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('') }),
        nombre_Empresa: 'Activo Urbano',
        regimen_Empresa: '',
        direccion_Empresa: faker.address.streetAddress(true),
        tel_Empresa: faker.random.alphaNumeric(8, { bannedChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('') }),
        email_Empresa: faker.internet.email(),
        m_a_v_u_Empresa: '',
        pagina_Web_Empresa: 'https://www.activourbano.com.co/',
        nro_id_Cliente: faker.random.alphaNumeric(10, { bannedChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('') }),
        nombre_Cliente: faker.internet.userName(),
        contrato_Cliente: faker.datatype.number({ min: 1000, max: 9999 }).toString(),
        direccion_Cliente: faker.address.streetAddress(true),
        municipio_Cliente: faker.address.cityName(),
        urbanizacion_Clente: faker.address.county(),
        pagar_En: 'Bancolombia',
        periodo_Canon: faker.date.betweens(faker.date.soon(10).toJSON(), faker.date.soon(30).toJSON(), 2).join(' - '),
        texto_Fecha_Sin_Recargo: '',
        texto_Fecha_Con_Recargo: '',
        texto_Fecha_Con_Recargo_2: '',
        texto_Fecha_Con_Recargo_3: '',
        fecha_Sin_Recargo: '',
        fechaCorteTexto: '',
        fechaSinRecargoTexto: '',
        fecha_Con_Recargo: '',
        fechaconRecargoTexto: '',
        fecha_Con_Recargo_2: '',
        fecha_Con_Recargo_2Texto: '',
        fecha_Con_Recargo_3: '',
        fecha_Con_Recargo_3Texto: '',
        valor_sin_Recargo: faker.unique(faker.datatype.number, [{ max: 199999999 }]),
        valor_sin_RecargoTexto: '',
        valor_Con_Recargo: faker.unique(faker.datatype.number, [{ max: 199999999 }]),
        valor_Con_RecargoTexto: '',
        valor_Con_Recargo_2: 0,
        valor_Con_Recargo_2Texto: '',
        valor_Con_Recargo_3: 0,
        valor_Con_Recargo_3Texto: '',
        municipio_d: '',
        municipioyurb: '',
        listaDetalles: []
    }

    return estadoCuenta
}