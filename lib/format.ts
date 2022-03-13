type CurrencyOptions = {
    locale?: string,
    currency?: string
}

type DateOptions = {
    locale?: string,
    weekday?: 'short' | 'long' | 'narrow',
    year?: 'numeric' | '2-digit',
    month?: 'short' | 'long' | 'narrow' | 'numeric' | '2-digit',
    day?: 'numeric' | '2-digit'
}

export function formatCurrency(n: number | string, { locale, currency }: CurrencyOptions = {}) {
    const options = { style: 'currency', currency: currency || 'COP' }
    if (typeof n === 'string') {
        return new Intl.NumberFormat(locale || 'es-419', options).format(Number.parseFloat(n));
    }
    return new Intl.NumberFormat(locale || 'es-419', options).format(n);
}

export function formatDate(date: string | Date, { locale, weekday, year, month, day }: DateOptions = {}) {
    const options = { weekday, year: year || 'numeric', month: month || '2-digit', day: day || '2-digit' }
    if (typeof date === 'string') {
        const dateObject = new Date(date)
        return new Intl.DateTimeFormat(locale || 'es-419', options).format(dateObject)
    } else {
        return new Intl.DateTimeFormat(locale || 'es-419', options).format(date)
    }
}