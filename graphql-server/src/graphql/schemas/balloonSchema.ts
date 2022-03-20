import { gql } from "apollo-server-core";

const typeDefs = gql`
  enum BalloonType {
    small
    medium
    big
    double
  }

  enum BalloonColor {
    red
    blue
    black
    white
  }

  type Position {
    longitude: Float!
    latitude: Float!
    altitude: Float!
  }

  input InputPosition {
    longitude: Float!
    latitude: Float!
    altitude: Float!
  }

  type Balloon {
    id: String!
    name: String!
    description: String!
    type: BalloonType!
    color: BalloonColor!
    position: Position!
  }

  input InputBalloon {
    id: String
    name: String!
    description: String!
    type: BalloonType!
    color: BalloonColor!
    position: InputPosition!
  }

  type Query {
    getBalloons: [Balloon]!
    getBalloon(balloonId: String!): Balloon
  }

  type Mutation {
    addBalloon(balloon: InputBalloon!): Balloon!
  }
`;

export default typeDefs;
