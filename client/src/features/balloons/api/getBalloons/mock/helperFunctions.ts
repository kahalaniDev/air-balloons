import { MOCK_BALLOONS } from "../../common/mockBalloons";

export const getBalloons = () => {
  const balloons = MOCK_BALLOONS.map((balloon) => {
    const { position, id, name, color, type } = balloon;
    return { id, name, position, color, type };
  });

  return balloons;
};
