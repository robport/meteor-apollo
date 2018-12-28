import React from "react";
import gql from 'graphql-tag';
import {graphql, withApollo} from 'react-apollo';
import ResolutionForm from './ResolutionForm'
import RegisterForm from "./RegisterForm";
import ResolutionList from "./ResolutionList";
import LoginForm from "./LoginForm";


const App = ({loading, resolutions, client, currentUser}) => {
  if (loading) return null;

  return (
    <div>
      <div>
        {currentUser._id ? (
          <div>
            <p>Current User: {currentUser.email}</p>
            <button onClick={() => {
              Meteor.logout();
              client.resetStore();
            }}>Logout
            </button>
            <ResolutionForm/>
            <ResolutionList resolutions={resolutions}/>
          </div>
        ) : (
          <div>
            <p>Logged Out</p>
            <LoginForm client={client}/>
            <RegisterForm client={client}/>
          </div>
        )}
      </div>

    </div>
  )
};

const q = gql`
    query Resolutions {
        resolutions {
            _id
            name
            userId
            goals {
                _id
                name
                completed
            }
        }
        currentUser {
            _id
            email
        }
    }`;

export default graphql(q, {
  props: ({data}) => ({
    ...data
  })
})(withApollo(App));

