export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const formatDate = (date, month, year, language) => {
    
    if (language === 'english') {
        let formattedDate;
        if (date[date.length-1] === 1) {
            formattedDate = date + 'st';
        } else if (date[date.length-1] === 2) {
            formattedDate = date + 'nd';
        } else if (date[date.length-1] === 3) {
            formattedDate = date + 'rd';
        } else {
            formattedDate = date + 'th';
        }
        const formattedMonth = months[month-1];
        return formattedDate + ' ' + formattedMonth + ' ' + year;

    } else if (language === 'japanese') {
        return year + '年' + month + '月' + date + '日'
    }
}