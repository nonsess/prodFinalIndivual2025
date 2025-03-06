export function getLocaleDate(timestamp) {  
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('ru-RU', options);
    return formattedDate;
}