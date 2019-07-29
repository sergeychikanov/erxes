const notificationNewToUser = `
  subscription notificationNewToUser($userId: String!) {
    notificationNewToUser(userId: $userId) {
      userId
    }
  }
`;

export default {
  notificationNewToUser
};
