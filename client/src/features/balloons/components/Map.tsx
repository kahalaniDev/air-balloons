import React, { useRef } from "react";
import useAppSelector from "../../../hooks/useAppSelector";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { resetBalloon } from "../slices/balloonsSlice";
import {
  Ion,
  createWorldTerrain,
  JulianDate,
  Viewer as CesiumViewer,
} from "cesium";
import { Viewer, CesiumComponentRef } from "resium";
import { TOTAL_SECONDS } from "../utils/constants";
import CesiumClock from "./CesiumClock";
import BalloonEntity from "./BalloonEntity";

type Props = {};
const Map: React.FC<Props> = () => {
  const list = useAppSelector((state) => state.balloons.list);
  const mapRef = useRef<CesiumComponentRef<CesiumViewer>>(null);
  const dispatch = useAppDispatch();

  Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_TOKEN as string;
  const worldTerrain = createWorldTerrain();

  const start = JulianDate.fromDate(new Date());
  const stop = JulianDate.addSeconds(start, TOTAL_SECONDS, new JulianDate());

  const handleSelectedChange = () => {
    if (!mapRef.current?.cesiumElement?.selectedEntity)
      dispatch(resetBalloon());
  };

  return (
    <Viewer
      ref={mapRef}
      style={{ width: "70%", height: "90vh" }}
      terrainProvider={worldTerrain}
      onSelectedEntityChange={handleSelectedChange}
    >
      <CesiumClock mapRef={mapRef} start={start} stop={stop} />
      {list.map((balloon, index) => (
        <BalloonEntity
          key={balloon.id}
          start={start}
          stop={stop}
          type={balloon.type}
          color={balloon.color}
          id={balloon.id}
          position={balloon.position}
        />
      ))}
    </Viewer>
  );
};

export default Map;
