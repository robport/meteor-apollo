export default {
  Query: {
    currentUser(obj, args, { currentUser }) {
      if (!currentUser) {
        return {}
      } else {
        return {
          _id: currentUser._id,
          email: currentUser.emails[0].address
        };
      }
    }
  },
  // User: {
  //   email: (user) => {
  //     return user.emails[0].address;
  //   }
  // }
}

