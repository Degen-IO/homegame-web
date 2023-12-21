import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($userId: String!) {
    user(userId: $userId) {
      _id
      firstName
      lastName
      email
    }
  }
`;
