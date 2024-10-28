import { useState, useMemo } from "react"
import { Canvas } from "@react-three/fiber"
import { useKey } from 'react-use'
import { DroneScene } from "../components/DroneScene"
import { useBoulePositions } from "../hooks/useBoulePositions"
import { CameraControls } from '../components/CameraControls'
import { ReadyStatus } from '../components/ReadyStatus'
import { useGameControls } from '../hooks/useGameControls'
import { 
  ControlsContainer, 
  ControlGroup, 
  Divider, 
  StatusDisplay 
} from '../components/styles/GameControls.styled'

export function Drone() {  
  const { boules, cochonette } = useMemo(() => useBoulePositions({ amount: 5 }), [])
  const { activeCamera, setActiveCamera, ready, setReady, cameras, switchCamera } = useGameControls(boules)
  return (
    <>
      <ControlsContainer>
        <ControlGroup>
          <CameraControls 
            activeCamera={activeCamera} 
            onCameraSwitch={switchCamera}
          />
        </ControlGroup>
        
        <Divider />
        
        <ControlGroup>
          <ReadyStatus 
            ready={ready}
            onToggleReady={() => setReady(!ready)}
          />
        </ControlGroup>
      </ControlsContainer>
      
      <Canvas camera={false}>
        <DroneScene
          activeCamera={activeCamera}
          ready={ready}
          setReady={setReady}
          boules={boules}
          cochonette={cochonette}
        />
      </Canvas>
    </>
  )
}
