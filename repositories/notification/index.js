const { Notifications } = require("../../models");

exports.getNotification = async (id) => {
  const data = await Notifications.findByPk(id);

  if (data) {
    return data;
  }
  return "Notification not found";
};

exports.getNotificationsByUserId = async (userId) => {
  const data = await Notifications.findAll({
    where: { userId },
  });
  return data;
};

exports.getNotificationsByBookingId = async (bookingId) => {
  const data = await Notifications.findAll({
    where: { bookingId },
  });
  return data;
};

exports.createNotification = async (payload) => {
  const data = await Notifications.create(payload);
  return data;
};

exports.updateNotification = async (id, payload) => {
  await Notifications.update(payload, {
    where: { id },
  });

  const data = await Notifications.findByPk(id);
  return data;
};

exports.deleteNotification = async (id) => {
  await Notifications.destroy({ where: { id }, force: true });
  return null;
};

exports.getNotifications = async () => {
  const data = await Notifications.findAll();
  return data;
};

exports.updateNotificationsByUserId = async (userId, payload) => {
  await Notifications.update(payload, {
    where: { userId },
  });

  const data = await Notifications.findAll({
    where: { userId },
  });
  return data;
};

exports.updateNotificationByUserIdAndBookingId = async (
    userId,
    bookingId,
    payload
) => {
    const updateCount = await Notifications.update(payload, {
        where: { userId, bookingId },
    });
    if (updateCount > 0) {
        return Notifications.findOne({
            where: {
                userId,
                bookingId,
            },
        });
    }
    return null;
};

exports.readNotification = async (id) => {
  await Notifications.update(
    { statusRead: true },
    {
      where: { id },
    }
  );

  const data = await Notifications.findByPk(id);
  return data;
};
