import { CSSProperties } from "react"
import { Detalle, EstadoCuenta, EstadoCuentaDetallado, WompiTransaction } from "./ApiResponses"

export type AuthProps = {
    guest: boolean
}

export type TableHeaders = {
    [index: string]: string | undefined,
    referencia?: string,
    fechacorte: string,
    contrato_cliente: string,
    accion?: string,
    direccion_cliente?: string,
    valor: string,
    nro_id_cliente?: string,
    valorTexto?: string,
    fechacorte_texto?: string
}

export type TableProps = {
    headers: TableHeaders,
    body: EstadoCuenta[],
    filter: string,
    orderBy: string,
    style?: CSSProperties
}

export type MobileECProps = {
    headers: TableHeaders,
    estadoCuenta: EstadoCuenta,
    style?: CSSProperties
}

export type DetailHeaders = {
    [index: string]: string | undefined,
    referencia: string,
    fechaCorte: string,
    fechaVencimiento?: string,
    fechaVencimiento_Recargo?: string,
    nro_id_Cliente?: string,
    nombre_Cliente?: string,
    contrato_Cliente?: string,
    direccion_Cliente?: string,
    municipio_Cliente?: string,
    // ? En el API está escrito así 
    urbanizacion_Clente?: string,
    periodo_Canon: string,
    valor_sin_Recargo?: string,
    valor_Con_Recargo?: string,
}

export type AuDetailECProps = {
    headers: DetailHeaders,
    estadoCuenta: EstadoCuentaDetallado,
    style?: CSSProperties
}

export type TableDetailHeaders = {
    [index: string]: string | undefined,
    codConcepto?: string,
    nombre_Concepto: string,
    valores_Vencidos?: string,
    valor_Mes?: string,
    fechaDcto: string,
    total: string,
}

export type WompiShippingAddress = {
    addressLine1: string,
    addressLine2?: string,
    country: string,
    city: string,
    phoneNumber: string,
    region: string,
    name?: string,
    postalCode?: string
}

export type WompiCustomerData = {
    email?: string,
    fullName?: string,
    phoneNumber?: string,
    phoneNumberPrefix?: string,
    legalId: string,
    legalIdType: 'CC' | 'CE' | 'NIT' | 'PP' | 'TI' | 'DNI' | 'RG' | 'OTHER',
}

export type WompiTax = {
    vat?: number,
    consumption?: number
}

export type WompiOptions = {
    publicKey: string,
    currency: string,
    amountInCents: number,
    reference: string,
    signatureIntegrity?: string,
    redirectUrl?: string,
    shippingAddress?: WompiShippingAddress,
    collectShipping?: boolean,
    customerData?: WompiCustomerData,
    collectCustomerLegalId?: boolean,
    taxInCents?: WompiTax
}

export type AuDetailTableECProps = {
    headers: TableDetailHeaders,
    data: Detalle[],
    referencia: string,
}

export type RedirectPageProps = {
    transaction: WompiTransaction
}