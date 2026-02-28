import { useRef } from "react";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";
import { TaskBubble, type TaskData } from "./TaskBubble";

const tasks: TaskData[] = [
  { name: "Sähköpostin luokittelu", frequency: 3, standardization: 3, supervision: 1, description: "Agentti luokittelee ja priorisoi saapuvat viestit automaattisesti." },
  { name: "Lead-pisteytys", frequency: 3, standardization: 3, supervision: 2, description: "Agentti pisteyttää liidit automaattisesti, ihminen seuraa dashboardilta." },
  { name: "Raportointi", frequency: 2, standardization: 3, supervision: 1, description: "Agentti generoi raportit datasta, ihminen tarkistaa satunnaisesti." },
  { name: "Prospektianalyysi", frequency: 2, standardization: 2, supervision: 2, description: "Agentti analysoi prospekteja, ihminen seuraa ja ohjaa tarvittaessa." },
  { name: "Tarjouksen generointi", frequency: 2, standardization: 2, supervision: 3, description: "Agentti luo tarjousluonnoksen, ihminen hyväksyy ennen lähetystä." },
  { name: "Sopimusluonnos", frequency: 1, standardization: 2, supervision: 3, description: "Agentti laatii sopimusluonnoksen, ihminen tarkistaa ja hyväksyy." },
  { name: "Asiakastapaamisen prep", frequency: 2, standardization: 1, supervision: 4, description: "Agentti kerää taustatiedot, ihminen päättää lähestymistavan." },
  { name: "Hinnoittelupäätös", frequency: 1, standardization: 1, supervision: 4, description: "Agentti analysoi dataa, ihminen tekee hinnoittelupäätöksen." },
  { name: "Strateginen neuvottelu", frequency: 1, standardization: 1, supervision: 5, description: "Ihminen ohjaa neuvottelua, agentti tarjoaa taustatukea." },
  { name: "CRM-päivitys", frequency: 3, standardization: 3, supervision: 1, description: "Agentti päivittää CRM:ää automaattisesti tapahtumien perusteella." },
];

const CUBE_SIZE = 2;

function CubeFrame() {
  const half = CUBE_SIZE / 2;
  const corners = [
    [-half, -half, -half], [half, -half, -half], [half, half, -half], [-half, half, -half],
    [-half, -half, half], [half, -half, half], [half, half, half], [-half, half, half],
  ] as [number, number, number][];

  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ];

  return (
    <group>
      {edges.map(([a, b], i) => (
        <Line
          key={i}
          points={[corners[a], corners[b]]}
          color="hsl(220, 13%, 75%)"
          lineWidth={1}
          transparent
          opacity={0.5}
        />
      ))}
    </group>
  );
}

function AxisLabels() {
  const half = CUBE_SIZE / 2;
  const fontSize = 0.1;
  const labelColor = "hsl(220, 9%, 46%)";

  return (
    <group>
      {/* X-axis: Toistuvuus */}
      <Text position={[0, -half - 0.25, -half]} fontSize={fontSize * 1.2} color="hsl(223, 43%, 21%)" anchorX="center" anchorY="middle">
        Toistuvuus (Frequency)
      </Text>
      <Text position={[-half, -half - 0.15, -half]} fontSize={fontSize * 0.85} color={labelColor} anchorX="center">Harvoin</Text>
      <Text position={[0, -half - 0.15, -half]} fontSize={fontSize * 0.85} color={labelColor} anchorX="center">Usein</Text>
      <Text position={[half, -half - 0.15, -half]} fontSize={fontSize * 0.85} color={labelColor} anchorX="center">Jatkuvasti</Text>

      {/* Y-axis: Standardoitavuus */}
      <Text position={[-half - 0.35, 0, -half]} fontSize={fontSize * 1.2} color="hsl(223, 43%, 21%)" anchorX="center" rotation={[0, 0, Math.PI / 2]}>
        Standardoitavuus (Standardization)
      </Text>
      <Text position={[-half - 0.15, -half, -half]} fontSize={fontSize * 0.85} color={labelColor} anchorX="right">Matala</Text>
      <Text position={[-half - 0.15, 0, -half]} fontSize={fontSize * 0.85} color={labelColor} anchorX="right">Keski</Text>
      <Text position={[-half - 0.15, half, -half]} fontSize={fontSize * 0.85} color={labelColor} anchorX="right">Korkea</Text>

      {/* Z-axis: Valvonta */}
      <Text position={[half + 0.25, -half - 0.25, 0]} fontSize={fontSize * 1.2} color="hsl(223, 43%, 21%)" anchorX="center" rotation={[0, -Math.PI / 2, 0]}>
        Valvonta (Supervision)
      </Text>
      <Text position={[half + 0.15, -half - 0.12, -half]} fontSize={fontSize * 0.7} color={labelColor} anchorX="left">Audit</Text>
      <Text position={[half + 0.15, -half - 0.12, -half + CUBE_SIZE * 0.25]} fontSize={fontSize * 0.7} color={labelColor} anchorX="left">Monitor</Text>
      <Text position={[half + 0.15, -half - 0.12, 0]} fontSize={fontSize * 0.7} color={labelColor} anchorX="left">Approve</Text>
      <Text position={[half + 0.15, -half - 0.12, half - CUBE_SIZE * 0.25]} fontSize={fontSize * 0.7} color={labelColor} anchorX="left">Collaborate</Text>
      <Text position={[half + 0.15, -half - 0.12, half]} fontSize={fontSize * 0.7} color={labelColor} anchorX="left">Command</Text>
    </group>
  );
}

export function HARCube() {
  return (
    <group>
      <CubeFrame />
      <AxisLabels />
      {tasks.map((task) => (
        <TaskBubble key={task.name} task={task} cubeSize={CUBE_SIZE} />
      ))}
    </group>
  );
}
