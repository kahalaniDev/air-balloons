import { MOCK_BALLOONS } from "./mockBalloons";

export const getBalloon = (balloonId: string) => {
  const { position, ...balloon } = MOCK_BALLOONS.find(
    (balloon) => balloon.id === balloonId
  ) as typeof MOCK_BALLOONS[0];
  return balloon;
};

export const getBalloons = () => {
  const balloons = MOCK_BALLOONS.map((balloon) => {
    const { position, id, name, color, type } = balloon;
    return { id, name, position, color, type };
  });

  return balloons;
};
