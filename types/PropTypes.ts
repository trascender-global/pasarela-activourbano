import { CSSProperties } from "react"
import { EstadoCuenta, EstadoCuentaDetallado } from "./ApiResponses"

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
    fechaVencimiento: string,
    fechaVencimiento_Recargo: string,
    nro_id_Cliente?: string,
    nombre_Cliente?: string,
    contrato_Cliente?: string,
    direccion_Cliente?: string,
    municipio_Cliente?: string,
    // ? En el API está escrito así 
    urbanizacion_Clente?: string,
    periodo_Canon: string,
    valor_sin_Recargo: string,
    valor_Con_Recargo: string,
}

export type AuDetailECProps = {
    headers: DetailHeaders,
    estadoCuenta: EstadoCuentaDetallado,
    style?: CSSProperties
}