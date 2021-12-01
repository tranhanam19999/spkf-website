import moment from "moment";

export function convertISOToDate(date, takeDMYOnly) {
    date = new Date(date);
    if (!date){
        return ""
    }
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    if (hour < 10) {
        hour = '0' + hour
    }
    if (min < 10) {
        min = '0' + min
    }

    if (takeDMYOnly) {
        return `${dt}/${month}/${year}`
    }

    return `${dt}/${month}/${year} ${hour}:${min}`;
}