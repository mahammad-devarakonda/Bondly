const cron = require('node-cron');
const { subDays, startOfDay, endOfDay } = require('date-fns');

cron.schedule('0 8 * * *', async () => {

    const yesterday = subDays(new Date(), 1);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await Connection.find({
        status: "interested",
        createdAt: {
            $gte: yesterdayStart,
            $lt: yesterdayEnd,
        }
    }).populate("fromUser toUser");

    const emailsToSend = {};

    for (const request of pendingRequests) {
        const toEmail = request?.toUser?.email;
        const toUserName = request?.toUser?.userName;
        const fromUserName = request?.fromUser?.userName;

        if (toEmail) {
            if (!emailsToSend[toEmail]) {
                emailsToSend[toEmail] = {
                    toUserName,
                    fromUserNames: []
                };
            }
            emailsToSend[toEmail].fromUserNames.push(fromUserName);
        }
    }

    const emailPromises = Object.keys(emailsToSend).map(email => {
        const { toUserName, fromUserNames } = emailsToSend[email];
        const uniqueFromUserNames = [...new Set(fromUserNames)];
        return sendNotificationEmail(
            email,
            uniqueFromUserNames.join(', '),
            toUserName
        );
    });

    await Promise.all(emailPromises);

}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});
