/**
 * 根据时间戳计算距离现在多长时间之前
 *
 * @param {number} timestamp - 时间戳
 * @author paian
 * @email
 * @since  
 */
export default function (timestamp) {
    const timeNow = parseInt(new Date().getTime() / 1000);
    const diff = timeNow - timestamp;

    if (diff <= 0) {
        return '1 second ago';
    } else {
        const minute = parseInt(diff/60, 10);
        const hour = parseInt(diff/3600, 10);
        const day = parseInt(diff/86400, 10);
        const month = parseInt(diff/2592000, 10);
        const year = parseInt(diff/31536000, 10);

        if (diff < 60) {
            return diff + ' second' + (diff > 1 ? 's' : '') + 'ago';
        } else if (minute < 60) {
            return minute + ' minute' + (minute > 1 ? 's' : '') + ' ago';
        } else if (hour < 24) {
            return hour + ' hour' + (hour > 1 ? 's' : '') + ' ago';
        } else if (day < 30) {
            return day + ' day' + (day > 1 ? 's' : '') + ' ago';
        } else if (month < 12) {
            return month + ' month' + (month > 1 ? 's' : '') + ' ago';
        } else {
            return year + ' year' + (year > 1 ? 's' : '') + ' ago';
        }
    }
}