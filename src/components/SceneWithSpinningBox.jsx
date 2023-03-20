import React, { useRef, useState } from "react";
import {
  Engine,
  Scene,
  useBeforeRender,
  useClick,
  useHover,
} from "react-babylonjs";
import { Vector3 } from "@babylonjs/core";

const SpinningBox = (props) => {
  // access Babylon scene objects with same React hook as regular DOM elements
  const boxRef = useRef(null);

  const [clicked, setClicked] = useState(false);
  useClick(() => setClicked((clicked) => !clicked), boxRef);

  const [hovered, setHovered] = useState(false);
  useHover(
    () => setHovered(true),
    () => setHovered(false),
    boxRef
  );

  // This will rotate the box on every Babylon frame.
  const rpm = 4;
  useBeforeRender((scene) => {
    if (boxRef.current) {
      // Delta time smoothes the animation.
      var deltaTimeInMillis = scene.getEngine().getDeltaTime();
      boxRef.current.rotation.y +=
        (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }
  });

  return (
    <box
      name={props.name}
      ref={boxRef}
      size={3}
      position={props.position}
      scaling={new Vector3(1, 1, 1)}
    >
      <standardMaterial name={`${props.name}-mat`}>
        <texture assignTo="diffuseTexture" url={props.texture} />
      </standardMaterial>
    </box>
  );
};

const SceneWithSpinningBox = ({ texture }) => {
  return (
    <div>
      <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
        <Scene>
          <arcRotateCamera
            name="camera1"
            target={Vector3.Zero()}
            alpha={Math.PI / 2}
            beta={Math.PI / 4}
            radius={8}
          />
          <hemisphericLight
            name="light1"
            intensity={1}
            direction={Vector3.Up()}
          />
          <hemisphericLight
            name="light2"
            intensity={1}
            direction={Vector3.Down()}
          />
          <SpinningBox
            name="left"
            position={new Vector3(0, 0, 0)}
            texture={texture}
          />
        </Scene>
      </Engine>
    </div>
  );
};

export default SceneWithSpinningBox;
