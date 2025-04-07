import "react-native-gesture-handler";
import React, { useCallback, useEffect } from "react";
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
import { Platform, useWindowDimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSharedValue } from "react-native-worklets-core";

function Scene({ modelUrl }: { modelUrl?: string }) {
  const cameraManipulator = useCameraManipulator({
    orbitHomePosition: [0, 0, 3],
    targetPosition: [0, 0, 0],
    orbitSpeed: [0.003, 0.003],
  });
  const { height } = useWindowDimensions();
  const rotation = useSharedValue<Float3>([0, 0, 0]);
  const renderCallback: RenderCallback = useCallback(() => {
    "worklet";
    const newY =
      rotation.value[1] + (Platform.OS === "ios" ? 0.000008 : 0.000002);
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
        source={{
          uri: "https://sneakers-models.netlify.app/nike_air_force_1.glb",
        }}
        rotate={rotation}
        transformToUnitCube
      />
    </FilamentView>
  );
}

export default function WelcomeScene() {
  const { modelUrl } = useLocalSearchParams<{ modelUrl: string }>();

  return (
    <FilamentScene>
      <Scene modelUrl={modelUrl} />
    </FilamentScene>
  );
}
