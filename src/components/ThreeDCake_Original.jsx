import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import confetti from 'canvas-confetti';

// Simple Candle component
const Candle = ({ position, isBlown, onBlow, index }) => {
  const flameRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (flameRef.current && !isBlown) {
      const time = state.clock.getElapsedTime();
      flameRef.current.scale.y = 1 + Math.sin(time * 10 + index) * 0.1;
    }
  });

  const handleClick = () => {
    if (!isBlown) {
      onBlow(index);
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.4 },
        colors: ['#FFD700', '#FFC0CB', '#87CEEB', '#DDA0DD']
      });
    }
  };

  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
        <meshStandardMaterial color="#FFF8DC" />
      </mesh>

      {!isBlown && (
        <mesh
          ref={flameRef}
          position={[0, 0.35, 0]}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onClick={handleClick}
        >
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FF6B00"
            emissiveIntensity={2}
          />
        </mesh>
      )}

      {!isBlown && (
        <pointLight
          position={[0, 0.35, 0]}
          intensity={0.5}
          distance={1}
          color="#FFD700"
        />
      )}
    </group>
  );
};

// Cake Layer with frosting decorations
const CakeLayer = ({ radius, height, position, color, decorationColor }) => {
  // Generate frosting decorations around the layer
  const decorations = [];
  const decorationCount = Math.floor(radius * 20);

  for (let i = 0; i < decorationCount; i++) {
    const angle = (i / decorationCount) * Math.PI * 2;
    const x = Math.cos(angle) * (radius + 0.05);
    const z = Math.sin(angle) * (radius + 0.05);
    decorations.push({ x, z, angle });
  }

  return (
    <group position={position}>
      {/* Main cake layer */}
      <mesh>
        <cylinderGeometry args={[radius, radius, height, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Frosting cream decorations around the top edge */}
      {decorations.map((dec, i) => (
        <mesh key={i} position={[dec.x, height / 2, dec.z]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color={decorationColor}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>
      ))}

      {/* Bottom frosting decorations */}
      {decorations.map((dec, i) => (
        <mesh key={`bottom-${i}`} position={[dec.x, -height / 2, dec.z]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.2}
            metalness={0.2}
          />
        </mesh>
      ))}

      {/* Golden decorative ring on top */}
      <mesh position={[0, height / 2 + 0.01, 0]}>
        <torusGeometry args={[radius - 0.05, 0.02, 8, 32]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

// Main Cake Scene
const CakeScene = ({ blownCandles, onCandleBlow }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  // Princess colors
  const colors = {
    layer1: '#FFB6C1', // Pink
    layer2: '#E6E6FA', // Lavender
    layer3: '#FFE4E1', // Misty rose
  };

  // Candle positions
  const candlePositions = [];

  // Bottom layer: 8 candles
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    candlePositions.push([Math.cos(angle) * 0.9, 0.4, Math.sin(angle) * 0.9]);
  }

  // Middle layer: 7 candles
  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * Math.PI * 2;
    candlePositions.push([Math.cos(angle) * 0.65, 0.8, Math.sin(angle) * 0.65]);
  }

  // Top layer: 6 candles
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    candlePositions.push([Math.cos(angle) * 0.45, 1.2, Math.sin(angle) * 0.45]);
  }

  return (
    <group ref={groupRef}>
      {/* Bottom layer - positioned at base */}
      <CakeLayer
        radius={1.2}
        height={0.4}
        position={[0, 0.2, 0]}
        color={colors.layer1}
        decorationColor="#DDA0DD"
      />

      {/* Middle layer - stacked flush on bottom layer */}
      <CakeLayer
        radius={0.85}
        height={0.4}
        position={[0, 0.6, 0]}
        color={colors.layer2}
        decorationColor="#87CEEB"
      />

      {/* Top layer - stacked flush on middle layer */}
      <CakeLayer
        radius={0.6}
        height={0.4}
        position={[0, 1.0, 0]}
        color={colors.layer3}
        decorationColor="#FFFFFF"
      />

      {/* Candles */}
      {candlePositions.map((pos, i) => (
        <Candle
          key={i}
          position={pos}
          isBlown={blownCandles.includes(i)}
          onBlow={onCandleBlow}
          index={i}
        />
      ))}
    </group>
  );
};

// Main component with HTML overlay for text
const ThreeDCake = ({ blownCandles, onCandleBlow }) => {
  return (
    <div className="w-full h-[600px] relative">
      {/* HTML Text Overlay - positioned above the 3D scene */}
      <div className="absolute top-8 left-0 right-0 z-10 pointer-events-none">
        <div className="text-center">
          <h3 className="text-2xl font-serif text-gold-400 drop-shadow-lg">
            Happy Birthday
          </h3>
          <h2 className="text-4xl font-bold text-pink-400 drop-shadow-lg mt-1">
            21st Peng
          </h2>
        </div>
      </div>

      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-purple-900/20 to-pink-900/20">
          <div className="text-white text-xl">Loading magical cake...</div>
        </div>
      }>
        <Canvas
          camera={{ position: [0, 2, 5], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={['#0a0015']} />

          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, 3, -5]} intensity={0.5} color="#FFB6C1" />
          <spotLight
            position={[0, 8, 0]}
            angle={0.6}
            penumbra={1}
            intensity={1}
            color="#DDA0DD"
          />

          <CakeScene blownCandles={blownCandles} onCandleBlow={onCandleBlow} />

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default ThreeDCake;
