import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        chip_stack
        email
        name
        userId
      }
    }
  }
`;

export const CREATE_POKER_GROUP = gql`
  mutation Mutation($name: String!, $joinPassword: String!) {
    createPokerGroup(name: $name, joinPassword: $joinPassword) {
      groupId
      joinPassword
      name
    }
  }
`;

export const REQUEST_TO_JOIN_GROUP = gql`
  mutation RequestToJoinGroup($groupId: ID!, $joinPassword: String!) {
    requestToJoinGroup(groupId: $groupId, joinPassword: $joinPassword) {
      groupId
      joinPassword
      name
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        chip_stack
        email
        name
        userId
      }
    }
  }
`;
