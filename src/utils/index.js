export function getRedirectTo(type, header) {
    let path = '';
    if (type === 'laoban') {
        path = header ? 'laoban' : 'laobaninfo';
    } else {
        path = header ? 'dashen' : 'dasheninfo';
    }
    return path;
}