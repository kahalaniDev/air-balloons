import { MOCK_BALLOONS } from "./common/mockBalloons";

export const getBalloon = (balloonId: string) => {
  const { position, ...balloon } = MOCK_BALLOONS.find(
    (balloon) => balloon.id === balloonId
  ) as typeof MOCK_BALLOONS[0];
  return balloon;
};
