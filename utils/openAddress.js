export const openAddress = (address) => {
    const googleMapsSearchUrl = `https://www.google.com/maps/search/?q=${encodeURIComponent(address)}`;
    window.open(googleMapsSearchUrl, '_blank');
}