import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from "react-apollo";

class GoalList extends Component {

  toggleGoal = (id) => {
    this.props.toggleGoal({
      variables: {
        goalId: id
      }
    })
  };

  render() {
    const goals = this.props.goals;
    return (
      <ul>
        {goals.map(goal => {
          return (
            <li key={goal._id}>
              <div>
                <input type="checkbox" onChange={() => this.toggleGoal(goal._id)} checked={goal.completed}/>{goal.name}, {goal._id}
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
}

const toggleGoal = gql`
  mutation toggleGoal($goalId: String!) {
      toggleGoal(_id: $goalId) {
          _id
      }
  }
`;

export default graphql(toggleGoal, {
  name: "toggleGoal",
  options: {
    refetchQueries: ["Resolutions"]
  }
})(GoalList)