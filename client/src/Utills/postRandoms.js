import { differenceInDays,differenceInHours,differenceInMinutes } from 'date-fns';

const dateago = (createdAtTime) => {
    const createdAt = new Date(Number(createdAtTime));
    const now = new Date();

    const daysAgo = differenceInDays(now, createdAt);
    if (daysAgo > 0) {
        return `${daysAgo} days ago`;
    }

    const hoursAgo = differenceInHours(now, createdAt);
    if (hoursAgo > 0) {
        return `${hoursAgo} hours ago`;
    }

    const minutesAgo = differenceInMinutes(now, createdAt);
    if (minutesAgo > 0) {
        return `${minutesAgo} minutes ago`;
    }

    return "Just now"; 
};


export default dateago


