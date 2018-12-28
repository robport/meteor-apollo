import Resolutions from './resolutions';
import Goals from '../goals/goals';

export default {
  Query: {
    resolutions(obj, args, {currentUser}) {
      if (currentUser) {
        return Resolutions.find({
          userId: currentUser._id
        }).fetch();
      } else {
        return Resolutions.find({
          userId: {$exists: false}
        }).fetch();
      }
    }
  },

  Resolution: {
    goals: (resolution) => {
      return Goals.find({resolutionId: resolution._id}).fetch();
    }
  },

  Mutation: {
    createResolution(obj, {name}, {currentUser}) {
      if (!currentUser) {
        throw new Error('Unauthorized');
      }

      const id = Resolutions.insert({
        name: name,
        userId: currentUser._id
      });
      return Resolutions.findOne(id);
    },
    // updateResolution(obj, {id, name }, context) {
    //   Resolutions.update({
    //     _id: id
    //   }, {
    //     name: name
    //   });
    //   return Resolutions.findOne(id);
    // },
    deleteResolution(obj, {id}, {currentUser}) {
      if (!currentUser) {
        throw new Error('Unauthorized');
      }
      Goals.remove({resolutionId: id});
      Resolutions.remove({_id: id});
      return {
        success2: true,
      };
    }
  }
};