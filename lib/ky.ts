import ky from 'ky-universal'

const prefixUrl = process.env.NEXT_PUBLIC_API_URL

const api = ky.create({
    prefixUrl, headers: {
        'Content-Type': 'application/json'
    }
});

export default api