import { CSSProperties } from "react"
import { EstadoCuenta } from "./ApiResponses"

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