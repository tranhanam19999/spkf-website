export const hashCode = (text) => {
    let hash = 0;
    let i;
    let chr;
    for (i = 0; i < text.length; i += 1) {
        chr = text.charCodeAt(i);
        // eslint-disable-next-line no-bitwise
        hash = (hash << 5) - hash + chr;
        // eslint-disable-next-line no-bitwise
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

export const MOBILE = /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i;
