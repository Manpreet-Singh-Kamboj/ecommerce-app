import React, { useCallback } from "react";
import {
  Camera,
  DefaultLight,
  FilamentScene,
  FilamentView,
  Float3,
  Model,
  RenderCallback,
  useCameraManipulator,
} from "react-native-filament";
import { useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-worklets-core";

function Scene() {
  const cameraManipulator = useCameraManipulator({
    orbitHomePosition: [0, 2, 3],
    targetPosition: [0, 0, 0],
    orbitSpeed: [0.003, 0.003],
  });
  const { height } = useWindowDimensions();
  const rotation = useSharedValue<Float3>([0, 0, 0]);
  const renderCallback: RenderCallback = useCallback(() => {
    "worklet";
    const newY = rotation.value[1] + 0.000002;
    rotation.value = [0, newY, 0];
  }, [rotation]);
  return (
    <FilamentView
      style={{ height: (50 / 100) * height }}
      renderCallback={renderCallback}
    >
      <Camera cameraManipulator={cameraManipulator} />
      <DefaultLight />
      <Model
        source={require("../../../../assets/glb/nike_air.glb")}
        rotate={rotation}
        transformToUnitCube
      />
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
