import React, { useEffect } from "react";
import {
  Camera,
  DefaultLight,
  FilamentScene,
  FilamentView,
  Model,
  useCameraManipulator,
} from "react-native-filament";
import { useWindowDimensions } from "react-native";

function Scene() {
  const cameraManipulator = useCameraManipulator({
    orbitHomePosition: [0, 2, 3],
    targetPosition: [0, 0, 0],
    orbitSpeed: [0.003, 0.003],
  });
  const { height } = useWindowDimensions();

  useEffect(() => {
    let frameId: number;
    let x = 0;
    const y = height / 2;
    cameraManipulator?.grabBegin(x, y, false);
    const animate = () => {
      x++;
      cameraManipulator?.grabUpdate(x, y);
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(frameId);
      cameraManipulator?.grabEnd();
    };
  }, [cameraManipulator]);
  return (
    <FilamentView style={{ height: (50 / 100) * height }}>
      <Camera cameraManipulator={cameraManipulator} />
      <DefaultLight />
      <Model source={require("@assets/glb/nike_air.glb")} transformToUnitCube />
    </FilamentView>
  );
}

export default function WelcomeScene() {
  return (
    <FilamentScene>
      <Scene />
    </FilamentScene>
  );
}
