export const padNumber = (num: number) => {
    // return num < 10 ? `0${num}` : num;
    return num.toString().padStart(2, '0');
}

export function getToday() {
    const date = new Date();
    return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
}

/**
 * @param {string} datePost - A date string in the format "YYYY-MM-DDTHH:MM:SSZ"
 * @returns {string} - A string that describes how long ago the date was, in the following format:
 *   - "Today" if the date is today
 *   - "Yesterday" if the date is yesterday
 *   - "X days ago" if the date is within the past week
 *   - "DD/MM/YYYY" if the date is more than a week ago
 */
export const getTimeAgo = (datePost: string) => {
    const currentDate: Date = new Date();

    const postDate: Date = new Date(datePost);
    const diffTime = Math.abs(currentDate.getTime() - postDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const seconds = Math.floor((currentDate.getTime() - postDate.getTime()) / 1000);

    // if (seconds < 60) {
    //     return `${seconds} seconds ago`;
    // } else if (seconds < 3600) {
    //     return `${Math.floor(seconds / 60)} minutes ago`;
    // } else if (seconds < 86400) {
    //     return `${Math.floor(seconds / 3600)} hours ago`;
    // } else if (seconds < 172800) {
    //     return "Yesterday";
    // } else if (seconds < 2592000) {
    //     return `${Math.floor(seconds / 86400)} days ago`;
    // } else if (seconds < 5184000) {
    //     return "A month ago";
    // } else if (seconds < 31536000) {
    //     return `${Math.floor(seconds / 2592000)} months ago`;
    // } else if (seconds < 63072000) {
    //     return "A year ago";
    // } else if (seconds >= 63072000) {
    //     return `${Math.floor(seconds / 31536000)} years ago`;
    // }


    if (seconds < 60) {
        return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${months} month${months > 1 ? "s" : ""} ago`;
    }

    const years = Math.floor(months / 12);
    if (years < 1) {
        return `${years} year${years > 1 ? "s" : ""} ago`;
    }


    if (diffDays === 0) {
        return "Today";
    } else if (diffDays === 1) {
        return "Yesterday";
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else {
        return `${postDate.getDate()}/${postDate.getMonth() + 1}/${postDate.getFullYear()}`;
    }

}