import React, {Component} from 'react';
import {graphql} from "react-apollo";
import gql from 'graphql-tag';
import GoalForm from "./GoalForm";
import GoalList from "./GoalList";

const deleteResolution = gql`
    mutation deleteResolution($id: String!) {
        deleteResolution(id: $id) {
            success2
        }
    }
`;

class ResolutionList extends Component {

  del(id) {
    this.props.deleteResolution({
      variables: {
        id: id
      }
    }).catch(error => {
      console.log(error);
    });
  };

  render() {
    const resolutions = this.props.resolutions;
    return (
      <ul>
        {resolutions.map(resolution => {
          const userId = resolution.userId ? resolution.userId : 'None';
          return (
            <li key={resolution._id}>{resolution.name}, {userId}, {resolution.goals.length},
              <button onClick={() => this.del(resolution._id)}>del</button>
              <GoalList goals={resolution.goals}/>
              <GoalForm resolutionId={resolution._id}/>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default graphql(deleteResolution, {
  name: 'deleteResolution',
  options: {
    refetchQueries: ["Resolutions"]
  }
})(ResolutionList)