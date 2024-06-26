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
      cashId
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
      tournamentId
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

export const QUERY_GAME = gql`
  query Query($gameId: ID!, $gameType: GameType!) {
    game(gameId: $gameId, gameType: $gameType) {
      gameId
      cashId
      tournamentId
      gameType
      name
      status
      startDateTime
      playersPerTable
      startingChips
      blindsSmall
      blindsBig
      duration
      numberOfRebuys
      rebuyPeriod
      addOn
      gameSpeed
      lateRegistrationDuration
    }
  }
`;

export const QUERY_PLAYERS_IN_GAME = gql`
  query Query($gameId: ID!, $gameType: GameType!) {
    playersInGame(gameId: $gameId, gameType: $gameType) {
      playerId
      userId
      cashId
      tournamentId
      gameType
      tableId
      seatNumber
    }
  }
`;
