import {gql} from "graphql-tag";

export const GET_COUNTER = gql`
  query counter {
    counter {
      id
      value
    }
  }
`;

export const INCREMENT_COUNTER = gql`
  mutation incrementCounter {
    incrementCounter {
      id
      value
    }
  }
`;
