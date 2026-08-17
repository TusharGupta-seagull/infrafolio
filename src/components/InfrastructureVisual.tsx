import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Sphere, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Data packet moving along a line
const Packet = ({ start, end, speed, delay, color }: { start: THREE.Vector3, end: THREE.Vector3, speed: number, delay: number, color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = ((clock.getElapsedTime() + delay) * speed) % 1;
    if (t < 0) {
      meshRef.current.visible = false;
      return;
    }
    meshRef.current.visible = true;
    meshRef.current.position.lerpVectors(start, end, t);
  });

  return (
    <Sphere ref={meshRef} args={[0.04, 8, 8]}>
      <meshBasicMaterial color={color} />
    </Sphere>
  );
};

// Interactive Node with distance-based label fading
const NetworkNode = ({ position, label }: { position: THREE.Vector3, label: string }) => {
  const textRef = useRef<any>(null);
  const colorNode = "#1A1A1A";
  
  useFrame((state) => {
    if (textRef.current) {
      // Get absolute position of the node in world space
      const worldPos = new THREE.Vector3();
      textRef.current.getWorldPosition(worldPos);
      
      // Calculate distance to camera
      const dist = state.camera.position.distanceTo(worldPos);
      
      // Fade in when closer than 10 units, fully visible at 6 units
      const opacity = THREE.MathUtils.clamp(1 - (dist - 6) / 4, 0, 1);
      
      // Update text material opacity (Drei Text uses a custom material)
      textRef.current.fillOpacity = opacity;
      
      // Make text always face the camera (billboarding) to prevent inverted text when viewed from the back
      textRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  return (
    <group position={position}>
      {/* Outer ring */}
      <mesh>
        <ringGeometry args={[0.15, 0.18, 16]} />
        <meshBasicMaterial color={colorNode} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      {/* Inner core */}
      <Sphere args={[0.08, 16, 16]}>
        <meshBasicMaterial color={colorNode} />
      </Sphere>
      {/* Label (fades in on zoom) */}
      <Text 
        ref={textRef}
        position={[0.3, 0, 0]} 
        fontSize={0.25} 
        color="#1A1A1A" 
        anchorX="left"
        anchorY="middle"
        fillOpacity={0}
      >
        {label}
      </Text>
    </group>
  );
};

// Abstract network topology
const NetworkTopology = () => {
  const group = useRef<THREE.Group>(null);
  
  // Minimalist styling constants
  const colorLine = "rgba(26, 26, 26, 0.15)";
  const colorTraffic = "#3b82f6"; // Accent blue
  
  // Define a geometric, layered distributed system topology
  const nodeDefs = useMemo(() => [
    // L1: Ingress (Top)
    { pos: new THREE.Vector3(0, 4, 0), label: "API Gateway (Kong)" },          // 0
    { pos: new THREE.Vector3(3, 5, -2), label: "CDN (CloudFront)" },           // 1
    
    // L2: Core Services (Middle Ring)
    { pos: new THREE.Vector3(-3, 1, 1), label: "Auth Service" },               // 2
    { pos: new THREE.Vector3(-1.5, 1, 2.5), label: "User Service" },           // 3
    { pos: new THREE.Vector3(1.5, 1, 2.5), label: "Order Service" },           // 4
    { pos: new THREE.Vector3(3, 1, 1), label: "Payment Service" },             // 5
    { pos: new THREE.Vector3(1.5, 1, -1), label: "Notification Service" },     // 6
    { pos: new THREE.Vector3(-1.5, 1, -1), label: "Search (Elasticsearch)" },  // 7
    
    // L3: Data & Infrastructure (Lower)
    { pos: new THREE.Vector3(-2, -3, 0), label: "User DB (PostgreSQL)" },      // 8
    { pos: new THREE.Vector3(2, -3, 0), label: "Order DB (MongoDB)" },         // 9
    { pos: new THREE.Vector3(0, -3, 2), label: "Cache (Redis Cluster)" },      // 10
    { pos: new THREE.Vector3(0, -1, -2), label: "Message Broker (Kafka)" },    // 11
    
    // L4: Async Workers (Bottom)
    { pos: new THREE.Vector3(-2, -5, -1), label: "Worker Node A" },            // 12
    { pos: new THREE.Vector3(0, -5, -2), label: "Worker Node B" },             // 13
    { pos: new THREE.Vector3(2, -5, -1), label: "Worker Node C" },             // 14
    
    // Sidecar: Observability Stack
    { pos: new THREE.Vector3(-5, 1, -3), label: "Metrics (Prometheus)" },      // 15
    { pos: new THREE.Vector3(-5, -2, -3), label: "Log Aggregator (Fluentd)" }, // 16
  ], []);

  // Clean, structured edges forming a purposeful diagram
  const edges = useMemo(() => [
    [1, 0], // CDN -> Gateway
    // Gateway -> Services
    [0, 2], [0, 3], [0, 4], [0, 5],
    // Service Ring Mesh (deliberate geometric connections)
    [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 2],
    // Services -> Data Stores
    [2, 8], [3, 8], // Auth/User -> Postgres
    [4, 9], [5, 9], // Order/Payment -> Mongo
    [3, 10], [4, 10], // User/Order -> Redis
    // Services -> Kafka
    [4, 11], [5, 11], [6, 11], [7, 11], 
    // Kafka -> Workers
    [11, 12], [11, 13], [11, 14],
    // Observability (abstract telemetry lines)
    [15, 0], [15, 2], [15, 9],
    [16, 0], [16, 12], [16, 8]
  ], []);

  // Generate dense traffic packets
  const packets = useMemo(() => {
    const p = [];
    for (let i = 0; i < 45; i++) {
      const edge = edges[Math.floor(Math.random() * edges.length)];
      p.push({
        start: nodeDefs[edge[0]].pos,
        end: nodeDefs[edge[1]].pos,
        speed: 0.1 + Math.random() * 0.4,
        delay: Math.random() * 10,
      });
      // Add reverse traffic for bidirectional feel
      if (Math.random() > 0.5) {
         p.push({
          start: nodeDefs[edge[1]].pos,
          end: nodeDefs[edge[0]].pos,
          speed: 0.1 + Math.random() * 0.4,
          delay: Math.random() * 10,
        });
      }
    }
    return p;
  }, [nodeDefs, edges]);
  
  useFrame(({ clock }) => {
    if (group.current) {
      // Extremely slow, subtle ambient movement
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.05) * 0.05;
      group.current.position.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.05;
    }
  });

  return (
    <group ref={group} position={[0, -1, 0]}>
      {/* Draw Edges */}
      {edges.map((edge, i) => (
        <Line 
          key={`edge-${i}`} 
          points={[nodeDefs[edge[0]].pos, nodeDefs[edge[1]].pos]} 
          color={colorLine} 
          lineWidth={1} 
          transparent 
        />
      ))}
      
      {/* Draw Nodes with Labels */}
      {nodeDefs.map((node, i) => (
        <NetworkNode key={`node-${i}`} position={node.pos} label={node.label} />
      ))}

      {/* Draw Traffic */}
      {packets.map((pkt, i) => (
        <Packet 
          key={`pkt-${i}`}
          start={pkt.start}
          end={pkt.end}
          speed={pkt.speed}
          delay={pkt.delay}
          color={colorTraffic}
        />
      ))}
    </group>
  );
};

export const InfrastructureVisual: React.FC = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Intercept wheel events (zooming) in the capture phase.
    // If the mouse is on the left 60% of the screen, we stop the event from
    // reaching OrbitControls, which prevents it from calling preventDefault(),
    // allowing the browser to naturally scroll the page down instead of zooming the canvas.
    // However, drag events (mousedown/mousemove) are untouched, so rotation works everywhere.
    const handleWheel = (e: WheelEvent) => {
      if (e.clientX < window.innerWidth * 0.6) {
        e.stopPropagation();
      }
    };

    el.addEventListener('wheel', handleWheel, { capture: true, passive: false });
    return () => el.removeEventListener('wheel', handleWheel, { capture: true });
  }, []);

  return (
    <div ref={containerRef} className="three-container" aria-hidden="true" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
      {!prefersReducedMotion && (
        <Canvas camera={{ position: [0, 2, 9], fov: 50 }}>
          <fog attach="fog" args={['#FAF9F6', 8, 30]} />
          
          <NetworkTopology />
          
          <OrbitControls 
            makeDefault
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={25}
            // Keep the user from flipping the camera upside down
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 4}
            // Optional auto-rotate for when they aren't interacting
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      )}
    </div>
  );
};
