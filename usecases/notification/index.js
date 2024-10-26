const NotificationRepository = require("../../repositories/notification");

exports.getNotification = async (id) => {
    const data = await NotificationRepository.getNotification(id);
    return data;
  };

exports.getNotificationsByUserId = async (userId) => {
  const data = await NotificationRepository.getNotificationsByUserId(userId);
  return data;
};

exports.getNotificationsByBookingId = async (bookingId) => {
  const data = await NotificationRepository.getNotificationsByBookingId(
    bookingId
  );
  return data;
};

 exports.createNotification = async (payload) => {
    const data = await NotificationRepository.createNotification(payload);
    return data;
  };

exports.updateNotification = async (id, payload) => {
  const data = await NotificationRepository.updateNotification(id, payload);
  return data;
};

exports.deleteNotification = async (id) => {
  const data = await NotificationRepository.deleteNotification(id);
  return data;
};

exports.getNotifications = async () => {
  const data = await NotificationRepository.getNotifications();
  return data;
};

// Tambahan untuk mengupdate notifikasi berdasarkan userId
exports.updateNotificationsByUserId = async (userId, payload) => {
  const data = await NotificationRepository.updateNotificationsByUserId(
    userId,
    payload
  );
  return data;
};

exports.readNotification = async (id) => {
  const data = await NotificationRepository.readNotification(id);
  return data;
};


