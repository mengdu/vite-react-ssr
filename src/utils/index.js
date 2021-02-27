export function sleep (t) {
    return new Promise(r => setTimeout(r, t))
}

export function queryStringToObject (query) {
    return Object.fromEntries(new URLSearchParams(query))
}
