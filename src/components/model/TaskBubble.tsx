import { useRef, useState } from "react";
import { Sphere, Html } from "@react-three/drei";
import * as THREE from "three";

export interface TaskData {
  name: string;
  frequency: number; // 1=Harvoin, 2=Usein, 3=Jatkuvasti
  standardization: number; // 1=Matala, 2=Keski, 3=Korkea
  supervision: number; // 1=Audit, 2=Monitor, 3=Approve, 4=Collaborate, 5=Command
  description: string;
}

const supervisionLabels: Record<number, string> = {
  1: "Audit",
  2: "Monitor",
  3: "Approve",
  4: "Collaborate",
  5: "Command",
};

const frequencyLabels: Record<number, string> = {
  1: "Harvoin",
  2: "Usein",
  3: "Jatkuvasti",
};

const standardizationLabels: Record<number, string> = {
  1: "Matala",
  2: "Keskimääräinen",
  3: "Korkea",
};

function getColor(supervision: number): string {
  if (supervision <= 1) return "#22c55e"; // green
  if (supervision === 2) return "#84cc16"; // lime
  if (supervision === 3) return "#eab308"; // yellow
  if (supervision === 4) return "#f97316"; // orange
  return "#ef4444"; // red
}

function mapToPosition(task: TaskData, cubeSize: number): [number, number, number] {
  const half = cubeSize / 2;
  const x = ((task.frequency - 1) / 2) * cubeSize - half;
  const y = ((task.standardization - 1) / 2) * cubeSize - half;
  const z = ((task.supervision - 1) / 4) * cubeSize - half;
  return [x, y, z];
}

interface TaskBubbleProps {
  task: TaskData;
  cubeSize: number;
}

export function TaskBubble({ task, cubeSize }: TaskBubbleProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const position = mapToPosition(task, cubeSize);
  const color = getColor(task.supervision);
  const radius = 0.08 + task.frequency * 0.06;

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[radius, 16, 16]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={hovered ? 1 : 0.85}
          emissive={color}
          emissiveIntensity={hovered ? 0.4 : 0.15}
        />
      </Sphere>
      {hovered && (
        <Html distanceFactor={6} style={{ pointerEvents: "none" }}>
          <div className="bg-card border border-border rounded-lg p-3 shadow-lg min-w-[200px] max-w-[260px]">
            <p className="font-semibold text-primary text-sm mb-1">{task.name}</p>
            <div className="text-xs text-muted-foreground space-y-0.5">
              <p>Toistuvuus: <span className="text-foreground">{frequencyLabels[task.frequency]}</span></p>
              <p>Standardoitavuus: <span className="text-foreground">{standardizationLabels[task.standardization]}</span></p>
              <p>Valvonta: <span className="text-foreground" style={{ color }}>{supervisionLabels[task.supervision]}</span></p>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 border-t border-border pt-1.5">{task.description}</p>
          </div>
        </Html>
      )}
    </group>
  );
}
