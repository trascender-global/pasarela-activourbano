export type AuthResponse = {
    exito: boolean,
    mensaje: string,
    data: string
}

export type EstadosCuentaResponse = {
    exito: boolean,
    mensaje: string,
    data: EstadoCuenta[]
}

export type EstadosCuentaDetalladoResponse = {
    exito: boolean,
    mensaje: string,
    data: EstadoCuentaDetallado
}

export type EstadoCuenta = {
    [index: string]: string | number,
    referencia: string,
    fechacorte: string,
    contrato_cliente: string,
    direccion_cliente: string,
    valor: number,
    nro_id_cliente: string,
    valorTexto: string,
    fechacorte_texto: string
}

export type EstadoCuentaDetallado = {
    ean13: string,
    referencia: string,
    valor: string,
    fecha: string,
    fechaCorte: string,
    fechaVencimiento: string,
    fechaVencimiento_Recargo: string,
    fechaVencimientoRecargoTexto: string,
    nit_Empresa: string,
    nombre_Empresa: string,
    regimen_Empresa: string,
    direccion_Empresa: string,
    tel_Empresa: string,
    email_Empresa: string,
    m_a_v_u_Empresa: string,
    pagina_Web_Empresa: string,
    nro_id_Cliente: string,
    nombre_Cliente: string,
    contrato_Cliente: string,
    direccion_Cliente: string,
    municipio_Cliente: string,
    urbanizacion_Clente: string,
    pagar_En: string,
    periodo_Canon: string,
    texto_Fecha_Sin_Recargo: string,
    texto_Fecha_Con_Recargo: string,
    texto_Fecha_Con_Recargo_2: string,
    texto_Fecha_Con_Recargo_3: string,
    fecha_Sin_Recargo: string,
    fechaCorteTexto: string,
    fechaSinRecargoTexto: string,
    fecha_Con_Recargo: string,
    fechaconRecargoTexto: string,
    fecha_Con_Recargo_2: string,
    fecha_Con_Recargo_2Texto: string,
    fecha_Con_Recargo_3: string,
    fecha_Con_Recargo_3Texto: string,
    valor_sin_Recargo: number,
    valor_sin_RecargoTexto: string,
    valor_Con_Recargo: number,
    valor_Con_RecargoTexto: string,
    valor_Con_Recargo_2: number,
    valor_Con_Recargo_2Texto: string,
    valor_Con_Recargo_3: number,
    valor_Con_Recargo_3Texto: string,
    municipio_d: string,
    municipioyurb: string,
    listaDetalles: Detalle[]
}

export type Detalle = {
    referencia: string,
    codConcepto: string,
    nombre_Concepto: string,
    valores_Vencidos: number,
    valor_Mes: number,
    nrodocumento: number,
    codTipoCartera: string,
    fechaDcto: string,
    total: number,
    valores_VencidosTexto: string,
    valor_MesTexto: string,
    totalTexto: string
}