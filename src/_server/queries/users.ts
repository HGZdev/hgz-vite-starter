import {gql} from "graphql-tag";

export const GET_USER = gql`
  query user($id: Int, $email: String) {
    user(id: $id, email: $email) {
      id
      email
      firstName
      lastName
      createdTs
      updatedTs
      hashedPassword
    }
  }
`;

export const GET_USERS = gql`
  query users {
    users {
      id
      email
      firstName
      lastName
      createdTs
      updatedTs
      hashedPassword
    }
  }
`;

export const SAVE_USER = gql`
  mutation saveUser(
    $email: String!
    $firstName: String
    $lastName: String
    $hashedPassword: String!
  ) {
    saveUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      hashedPassword: $hashedPassword
    ) {
      id
      email
      firstName
      lastName
      createdTs
      updatedTs
      hashedPassword
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
