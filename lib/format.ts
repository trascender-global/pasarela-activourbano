type CurrencyOptions = {
    locale?: string,
    currency?: string
}

export function localeCurrency(n: number, { locale, currency }: CurrencyOptions = { locale: 'es-419', currency: 'COP' }) {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(n);
}