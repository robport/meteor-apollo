import Goals from './goals';

export default {
  Mutation: {
    createGoal(obj, {name, resolutionId }, { currentUser }) {
      if ( !currentUser) {
        throw new Error('Unauthorised');
      }

      const id = Goals.insert({
        name: name,
        resolutionId,
        completed: false
      });
      return Goals.findOne(id);
    },
    toggleGoal(obj, {_id}) {
      const goal = Goals.findOne(_id);
      Goals.update(_id, {
        $set: {
          completed: !goal.completed
        }
      });
      return Goals.findOne(_id);
    }
  }
};