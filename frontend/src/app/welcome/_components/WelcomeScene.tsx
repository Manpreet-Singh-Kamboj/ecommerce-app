import "react-native-gesture-handler";
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
import { useLocalSearchParams } from "expo-router";

function Scene({ modelUrl }: { modelUrl?: string }) {
  const cameraManipulator = useCameraManipulator({
    orbitHomePosition: [0, 0, 3],
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
      x += 2;
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
      <Model
        source={{
          uri: "https://sneakers-models.netlify.app/nike_air_force_1.glb",
        }}
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
