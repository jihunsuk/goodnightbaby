import PushNotification from "react-native-push-notification";

const configure = () => {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
      console.log("TOKEN:", token);
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
      console.log("NOTIFICATION:", notification);

      // process the notification
    },

    // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "YOUR GCM (OR FCM) SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true
  });
};

const localNotification = notification => {
  PushNotification.localNotification({
    autoCancel: true,
    largeIcon: "ic_launcher",
    smallIcon: "ic_notification",
    bigText: "My big text that will be shown when notification is expanded",
    subText: "This is a subText",
    color: "green",
    vibrate: true,
    vibration: 300,
    title: notification.title,
    message: notification.content,
    playSound: true,
    soundName: "default",
    actions: '["Accept", "Reject"]'
  });
};

export { configure, localNotification };
