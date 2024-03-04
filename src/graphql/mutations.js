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

export const CREATE_TOURNAMENT_GAME = gql`
  mutation Mutation(
    $groupId: ID!
    $name: String!
    $startDateTime: String!
    $playersPerTable: Int!
    $numberOfRebuys: Int!
    $rebuyPeriod: RebuyPeriod!
    $addOn: Boolean!
    $startingChips: Float!
    $gameSpeed: GameSpeed!
    $lateRegistrationDuration: LateRegistrationDuration!
  ) {
    createTournamentGame(
      groupId: $groupId
      name: $name
      startDateTime: $startDateTime
      playersPerTable: $playersPerTable
      numberOfRebuys: $numberOfRebuys
      rebuyPeriod: $rebuyPeriod
      addOn: $addOn
      startingChips: $startingChips
      gameSpeed: $gameSpeed
      lateRegistrationDuration: $lateRegistrationDuration
    ) {
      gameId
      name
      status
      startDateTime
      playersPerTable
      numberOfRebuys
      rebuyPeriod
      addOn
      startingChips
      gameSpeed
      lateRegistrationDuration
    }
  }
`;
export const CREATE_CASH_GAME = gql`
  mutation CreateCashGame(
    $groupId: ID!
    $name: String!
    $startDateTime: String!
    $playersPerTable: Int!
    $startingChips: Float!
    $blindsSmall: Float!
    $blindsBig: Float!
    $duration: Duration!
  ) {
    createCashGame(
      groupId: $groupId
      name: $name
      startDateTime: $startDateTime
      playersPerTable: $playersPerTable
      startingChips: $startingChips
      blindsSmall: $blindsSmall
      blindsBig: $blindsBig
      duration: $duration
    ) {
      gameId
      name
      status
      startDateTime
      playersPerTable
      startingChips
      blindsSmall
      blindsBig
      duration
    }
  }
`;
