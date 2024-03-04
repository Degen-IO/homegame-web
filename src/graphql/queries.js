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

export const QUERY_USERS_POKERGROUPS = gql`
  query Query($userId: ID!) {
    pokerGroups(userId: $userId) {
      groupId
      joinPassword
      name
    }
  }
`;
export const MEMBERS_OF_GROUP = gql`
  query Query($groupId: ID!) {
    membersOfGroup(groupId: $groupId) {
      chip_stack
      email
      name
      userId
    }
  }
`;

export const CASH_GAMES_IN_GROUP = gql`
  query Query($groupId: ID!) {
    cashGamesInGroup(groupId: $groupId) {
      blindsBig
      blindsSmall
      duration
      gameId
      name
      playersPerTable
      startDateTime
      startingChips
      status
    }
  }
`;

export const TOURNAMENT_GAMES_IN_GROUP = gql`
  query Query($groupId: ID!) {
    tournamentGamesInGroup(groupId: $groupId) {
      addOn
      gameId
      gameSpeed
      lateRegistrationDuration
      name
      numberOfRebuys
      playersPerTable
      rebuyPeriod
      startDateTime
      startingChips
      status
    }
  }
`;

export const QUERY_PENDING_MEMBERS = gql`
  query Query($groupId: ID!) {
    pendingMembers(groupId: $groupId) {
      chip_stack
      email
      name
      userId
    }
  }
`;
