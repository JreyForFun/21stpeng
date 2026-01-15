import React, { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows, Stars, Sparkles, Instances, Instance, Text } from '@react-three/drei';
import * as THREE from 'three';

// --- DECORATIONS (MAXIMALIST V4 - HIGH FIDELITY) ---

// --- DECORATIONS (MAXIMALIST V4 - HIGH FIDELITY) ---

// 1. BIRTHDAY SIGN (Blue/Silver Theme)
const HappyPengSign = React.memo(({ position }) => {
  return (
    <group position={position}>
      <mesh position={[0, -0.3, 0]} frustumCulled={false}>
        <boxGeometry args={[0.04, 0.8, 0.02]} />
        <meshStandardMaterial color="#A0C4E8" metalness={0.7} roughness={0.2} />
      </mesh>
      <Text
        position={[0, 0.35, 0]}
        fontSize={0.18}
        color="#A0C4E8"
        anchorX="center"
        anchorY="middle"
        frustumCulled={false}
        letterSpacing={0.05}
      >
        HAPPY
        <meshStandardMaterial color="#A0C4E8" metalness={0.7} roughness={0.2} side={2} />
      </Text>
      <Text
        position={[0, 0.12, 0]}
        fontSize={0.22}
        color="#A0C4E8"
        anchorX="center"
        anchorY="middle"
        frustumCulled={false}
      >
        Peng!
        <meshStandardMaterial color="#A0C4E8" metalness={0.7} roughness={0.2} side={2} />
      </Text>
    </group>
  );
});

// 2. SHELL BORDER
const ShellBorder = React.memo(({ count = 30, radius = 1, y = 0, color = "#ffffff", size = 0.08 }) => {
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      pos.push({
        position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
        rotation: [Math.PI / 3, angle, 0],
        scale: size
      });
    }
    return pos;
  }, [count, radius, y, size]);

  return (
    <Instances range={count}>
      <sphereGeometry args={[0.6, 12, 10, 0, Math.PI * 2, 0, Math.PI * 0.8]} />
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      {positions.map((data, i) => (
        <Instance key={i} position={data.position} rotation={data.rotation} scale={[data.scale, data.scale * 1.2, data.scale]} />
      ))}
    </Instances>
  );
});

// 3. LAMBETH SWAGS
const Swags = React.memo(({ count = 8, radius = 1, y = 0, color = "#ffffff" }) => {
  const swagPoints = useMemo(() => {
    const points = [];
    const segments = 20;
    for (let i = 0; i < count; i++) {
      const startAngle = (i / count) * Math.PI * 2;
      const endAngle = ((i + 1) / count) * Math.PI * 2;
      for (let j = 0; j <= segments; j++) {
        const t = j / segments;
        const angle = startAngle + (endAngle - startAngle) * t;
        const droop = Math.sin(t * Math.PI) * 0.25;
        const r = radius + droop * 0.1;
        points.push({
          position: [Math.cos(angle) * r, y - droop, Math.sin(angle) * r],
          rotation: [0, angle, Math.sin(t * Math.PI) * 0.5],
          scale: 1
        });
      }
    }
    return points;
  }, [count, radius, y]);

  return (
    <Instances range={swagPoints.length}>
      <sphereGeometry args={[0.035, 8, 8]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      {swagPoints.map((data, i) => (
        <Instance key={i} position={data.position} rotation={data.rotation} scale={[data.scale, data.scale, data.scale]} />
      ))}
    </Instances>
  );
});

// 4. ROYAL ICING BOWS
const RoyalIcingBows = React.memo(({ count = 8, radius = 1, y = 0, color = "#ffb7b2" }) => {
  const bows = useMemo(() => {
    const b = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      b.push({
        position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
        rotation: [0, angle, 0],
      });
    }
    return b;
  }, [count, radius, y]);

  return (
    <group>
      <Instances range={count * 2}>
        <torusGeometry args={[0.08, 0.03, 8, 16, Math.PI * 1.5]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
        {bows.map((d, i) => (
          <React.Fragment key={i}>
            <Instance position={d.position} rotation={[0, d.rotation[1], 0.5]} />
            <Instance position={d.position} rotation={[0, d.rotation[1], -0.5]} />
          </React.Fragment>
        ))}
      </Instances>
      <Instances range={count}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
        {bows.map((d, i) => (
          <Instance key={i} position={d.position} />
        ))}
      </Instances>
    </group>
  )
});

// 5. LARGE PEARLS (Silver/Blue)
const PearlBeading = React.memo(({ count = 60, radius = 1, y = 0, color = "#ffffff", size = 0.03 }) => {
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      pos.push({
        position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
        scale: size
      });
    }
    return pos;
  }, [count, radius, y, size]);

  return (
    <Instances range={count}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.6} envMapIntensity={1.5} />
      {positions.map((data, i) => (
        <Instance key={i} position={data.position} scale={[data.scale, data.scale, data.scale]} />
      ))}
    </Instances>
  );
});

// 6. VERTICAL PILLARS
const VerticalPillars = React.memo(({ count = 8, radius = 1, y = 0, height = 0.4, color = "#ffffff" }) => {
  const pillars = useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) {
      const angle = ((i + 0.5) / count) * Math.PI * 2;
      p.push({
        position: [Math.cos(angle) * (radius), y, Math.sin(angle) * (radius)],
        rotation: [0, angle, 0]
      })
    }
    return p;
  }, [count, radius, y]);

  return (
    <Instances range={count}>
      <cylinderGeometry args={[0.02, 0.02, height, 6]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      {pillars.map((d, i) => (
        <Instance key={i} position={d.position} rotation={d.rotation} />
      ))}
    </Instances>
  )
});

// 7. SPRINKLES
const Sprinkles = React.memo(({ count = 100, radius = 1, y = 0 }) => {
  const data = useMemo(() => {
    const d = [];
    const colors = ["#87CEEB", "#B0E0E6", "#ADD8E6", "#E0FFFF", "#FFFFFF"]; // Blue Palette
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * radius * 0.9;
      d.push({
        position: [Math.cos(angle) * r, y + 0.015, Math.sin(angle) * r],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: 0.5 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    return d;
  }, [count, radius, y]);

  return (
    <group>
      {data.map((item, i) => (
        <mesh key={i} position={item.position} rotation={item.rotation} scale={item.scale}>
          <cylinderGeometry args={[0.005, 0.005, 0.04, 3]} />
          <meshStandardMaterial color={item.color} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
});

// 9. REALISTIC LEAVES (Extruded Shape + Veins)
const IcingLeaves = React.memo(({ count = 10, radius = 1, y = 0 }) => {
  const { leaves, geometry, stemGeo } = useMemo(() => {
    // Organic Leaf Shape
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.2, 0.1, 0.4, 0.4, 0.1, 1); // Right serrated-ish
    shape.bezierCurveTo(-0.1, 0.4, -0.3, 0.1, 0, 0); // Left serrated-ish

    const extrudeSettings = { depth: 0.03, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 };
    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();

    const stem = new THREE.CylinderGeometry(0.01, 0.005, 0.8, 4);
    stem.rotateX(Math.PI / 2);
    stem.translate(0, 0.3, 0);

    const d = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + 0.12;
      d.push({
        position: [Math.cos(angle) * (radius), y, Math.sin(angle) * (radius)],
        rotation: [Math.PI / 3, angle - Math.PI / 2, Math.PI / 2],
      });
    }
    return { leaves: d, geometry: geom, stemGeo: stem };
  }, [count, radius, y]);

  return (
    <group>
      <Instances range={count} geometry={geometry}>
        <meshStandardMaterial color="#2E8B57" roughness={0.4} metalness={0.1} />
        {leaves.map((l, i) => (
          <Instance key={i} position={l.position} rotation={l.rotation} scale={[0.18, 0.18, 0.18]} />
        ))}
      </Instances>
      <Instances range={count} geometry={stemGeo}>
        <meshStandardMaterial color="#006400" roughness={0.5} />
        {leaves.map((l, i) => (
          <Instance key={i} position={l.position} rotation={l.rotation} scale={[0.18, 0.18, 0.18]} />
        ))}
      </Instances>
    </group>
  )
});

// 10. REALISTIC CHERRIES (Lathe Geometry for Cardioid Shape)
const RealisticCherries = React.memo(({ count = 20, radius = 1, y = 0, scale = 1, rotationOffset = 0 }) => {
  const { cherryGeo, stemGeo, positions } = useMemo(() => {
    // Create Cherry Profile (Cardioid-like) using Path
    const points = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20; // 0 to 1
      const angle = t * Math.PI; // 0 to PI
      // Shape profile: x = sin(a), y = -cos(a) ... tweaked for cardioid dimple
      const x = Math.sin(angle) * (0.8 + 0.2 * Math.sin(angle * 2)); // bulge
      const yVal = -Math.cos(angle);
      points.push(new THREE.Vector2(x * 0.05, yVal * 0.05));
    }
    const geo = new THREE.LatheGeometry(points, 32);

    // Stem
    const sCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.04, 0),
      new THREE.Vector3(0.01, 0.08, 0),
      new THREE.Vector3(0.03, 0.12, 0)
    ]);
    const sGeo = new THREE.TubeGeometry(sCurve, 8, 0.002, 6, false);

    const pos = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + rotationOffset;
      pos.push({
        position: [Math.cos(angle) * radius, y + 0.08, Math.sin(angle) * radius],
        rotation: [Math.random() * 0.5, Math.random() * Math.PI, Math.random() * 0.5],
        scale: scale
      });
    }
    return { cherryGeo: geo, stemGeo: sGeo, positions: pos };
  }, [count, radius, y, scale, rotationOffset]);

  return (
    <group>
      {/* Cherry Bodies */}
      <Instances range={count} geometry={cherryGeo}>
        <meshStandardMaterial color="#8b0000" roughness={0} metalness={0.2} envMapIntensity={3} />
        {positions.map((data, i) => (
          <Instance key={i} position={data.position} rotation={data.rotation} scale={[data.scale, data.scale, data.scale]} />
        ))}
      </Instances>
      {/* Stems */}
      <Instances range={count} geometry={stemGeo}>
        <meshStandardMaterial color="#4B3621" roughness={0.8} />
        {positions.map((data, i) => (
          <Instance key={i} position={data.position} rotation={data.rotation} scale={[data.scale, data.scale, data.scale]} />
        ))}
      </Instances>
    </group>
  )
});

// 11. BLUE/SILVER FLAKES
const BlueFlakes = React.memo(({ count = 50, radius = 1, height = 0.8 }) => {
  const data = useMemo(() => {
    const d = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = radius + 0.02;
      const y = (Math.random() - 0.5) * height * 0.9;
      d.push({
        position: [Math.cos(angle) * r, y, Math.sin(angle) * r],
        rotation: [0, angle, Math.random() * Math.PI],
        scale: 0.5 + Math.random() * 0.5
      });
    }
    return d;
  }, [count, radius, height]);
  return (
    <Instances range={count}>
      <planeGeometry args={[0.04, 0.04]} />
      <meshStandardMaterial color="#87CEFA" metalness={1} roughness={0.1} side={THREE.DoubleSide} />
      {data.map((item, i) => (
        <Instance key={i} position={item.position} rotation={item.rotation} scale={[item.scale, item.scale, item.scale]} />
      ))}
    </Instances>
  );
});

// 12. CREAM MOUNT
const CreamMount = React.memo(() => (
  <mesh position={[0, -0.02, 0]}>
    <sphereGeometry args={[0.08, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
    <meshStandardMaterial color="#FFF" roughness={0.3} />
  </mesh>
));

// 13. RIBBON BAND
const RibbonBand = React.memo(({ radius = 1, y = 0, color = "#ffb7b2" }) => (
  <mesh position={[0, y, 0]}>
    <cylinderGeometry args={[radius, radius, 0.15, 64, 1, true]} />
    <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} side={2} />
  </mesh>
));

// 14. MICRO DRAGEES
const MicroDragees = React.memo(({ count = 200, radius = 1, y = 0 }) => {
  const data = useMemo(() => {
    const d = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * radius;
      d.push({
        position: [Math.cos(angle) * r, y + 0.01, Math.sin(angle) * r],
        scale: 0.008 + Math.random() * 0.005
      });
    }
    return d;
  }, [count, radius, y]);

  return (
    <Instances range={count}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={1} />
      {data.map((item, i) => (
        <Instance key={i} position={item.position} scale={[item.scale, item.scale, item.scale]} />
      ))}
    </Instances>
  );
});

// 15. PASTEL MACARONS
const Macarons = React.memo(({ count = 10, radius = 1, y = 0 }) => {
  // Geometry: 2 flattened spheres + 1 cylinder (filling) + 2 rings (feet)
  const { shellGeo, fillingGeo, feetGeo, data } = useMemo(() => {
    // Shell (Bigger: 0.06 -> 0.085)
    const sGeo = new THREE.SphereGeometry(0.085, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2.5); // Top half
    sGeo.translate(0, 0.022, 0); // Move up

    // Feet (Ruffled ring)
    const fGeo = new THREE.TorusGeometry(0.08, 0.012, 6, 16);
    fGeo.rotateX(Math.PI / 2);

    // Filling
    const fillGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.035, 16);

    const d = [];
    const colors = ["#FFB7B2", "#A2E4B8", "#B5EAD7", "#E0BBE4", "#FFDAC1"]; // Pastel Palette

    for (let i = 0; i < count; i++) {
      // Offset angle by 0.5 radians relative to cherries to avoid crash
      const angle = (i / count) * Math.PI * 2 + 0.5;
      d.push({
        position: [Math.cos(angle) * (radius - 0.05), y + 0.05, Math.sin(angle) * (radius - 0.05)],
        rotation: [Math.random() * 0.2, angle, Math.random() * 0.2],
        color: colors[i % colors.length]
      });
    }
    return { shellGeo: sGeo, fillingGeo: fillGeo, feetGeo: fGeo, data: d };
  }, [count, radius, y]);

  return (
    <group>
      {data.map((m, i) => (
        <group key={i} position={m.position} rotation={m.rotation}>
          {/* Top Shell */}
          <mesh geometry={shellGeo} material-color={m.color} material-roughness={0.4} />
          {/* Feet Top */}
          <mesh geometry={feetGeo} position={[0, 0.015, 0]} material-color={m.color} material-roughness={0.6} />

          {/* Bottom Shell (Mirrored) */}
          <group scale={[1, -1, 1]}>
            <mesh geometry={shellGeo} material-color={m.color} material-roughness={0.4} />
            <mesh geometry={feetGeo} position={[0, 0.015, 0]} material-color={m.color} material-roughness={0.6} />
          </group>

          {/* Filling */}
          <mesh geometry={fillingGeo} material-color="#FFFDD0" material-roughness={0.5} />
        </group>
      ))}
    </group>
  )
});

// --- CAKE TIER ---
const CreamTier = React.memo(({ position, radiusBottom, radiusTop, height, color, creamColor, pearlColor, goldFlakeCount = 20, flowerColor }) => {
  return (
    <group position={position}>
      {/* Sponge base */}
      <mesh>
        <cylinderGeometry args={[radiusTop - 0.05, radiusBottom - 0.05, height, 48]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0, height / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radiusTop - 0.05, 0.05, 16, 48]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>

      {/* Sprinkles & Dragees on Top */}
      <Sprinkles count={100} radius={radiusTop - 0.2} y={height / 2} />
      <MicroDragees count={150} radius={radiusTop - 0.15} y={height / 2} />

      {/* Heavy Shell Borders */}
      <ShellBorder count={Math.floor(radiusTop * 35)} radius={radiusTop - 0.02} y={height / 2 + 0.03} color={creamColor} size={0.07} />
      <ShellBorder count={Math.floor(radiusBottom * 35)} radius={radiusBottom - 0.02} y={-height / 2 - 0.02} color={creamColor} size={0.07} />

      {/* Lambeth Swags on Sides */}
      <Swags count={8} radius={radiusBottom - 0.05} y={0.1} color={creamColor} />

      {/* Ribbon Band */}
      <RibbonBand radius={radiusBottom - 0.055} y={0} color={flowerColor} />

      {/* Bows at Swag Junctions */}
      <RoyalIcingBows count={8} radius={radiusBottom - 0.04} y={0.1} color={flowerColor} />

      {/* Vertical Pillars between Swags */}
      <VerticalPillars count={8} radius={radiusBottom - 0.06} y={0} height={height * 0.6} color={creamColor} />

      {/* Large Statement Pearls at Bottom */}
      <PearlBeading count={Math.floor(radiusBottom * 40)} radius={radiusBottom} y={-height / 2 + 0.06} color={pearlColor} size={0.035} />

      {/* Toppings - Clusters (Cherries + Macarons) */}
      <RealisticCherries count={Math.floor(radiusTop * 6)} radius={radiusTop - 0.15} y={height / 2} scale={1.2} />
      <Macarons count={Math.floor(radiusTop * 4)} radius={radiusTop - 0.18} y={height / 2} />
      <IcingLeaves count={8} radius={radiusTop - 0.15} y={height / 2 + 0.02} />

      <BlueFlakes count={goldFlakeCount} radius={radiusBottom} height={height} />
    </group>
  );
});

// SMOKE PARTICLES - OPTIMIZED (No useState/Timer overhead)
const SmokeParticles = ({ position }) => {
  const smokeRef = useRef();
  const startTime = useRef(Date.now());

  // Create randomized smoke particles (Memoized)
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 8; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 0.1,
        y: Math.random() * 0.2, // Start slightly up
        z: (Math.random() - 0.5) * 0.1,
        scale: 0.5 + Math.random() * 0.5,
        speed: 0.2 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2
      })
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!smokeRef.current) return;
    const t = state.clock.elapsedTime;
    const elapsedSinceStart = (Date.now() - startTime.current) / 1000;

    // Stop rendering/updating if too old (Performance optimization)
    if (elapsedSinceStart > 2.5) {
      if (smokeRef.current.visible) smokeRef.current.visible = false;
      return;
    } else {
      if (!smokeRef.current.visible) smokeRef.current.visible = true;
    }

    smokeRef.current.children.forEach((child, i) => {
      const p = particles[i];
      // Simple rising smoke animation
      const loopTime = (t * p.speed + p.offset) % 2.5; // Longer loop

      // Stop smoke rising after ~1.5s visual time (hacky but works for effect)
      if (loopTime > 1.2 && child.material) {
        child.material.opacity = Math.max(0, child.material.opacity - 0.05);
      } else {
        // Normal rise
        child.position.y = loopTime * 0.4;
        child.position.x = p.x + Math.sin(t * 2 + p.offset) * 0.02 * loopTime;
        child.scale.setScalar(p.scale * (1 + loopTime));

        if (child.material) {
          // Fade out as it rises usually
          child.material.opacity = Math.max(0, 0.4 * (1 - loopTime / 1.5));
        }
      }
    })
  });

  return (
    <group ref={smokeRef} position={position}>
      {particles.map((p, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshBasicMaterial color="#aaaaaa" transparent opacity={0.3} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

// CANDLE
const Candle = React.memo(({ position, isBlown, onBlow, index }) => {
  const flameRef = useRef();
  const innerFlameRef = useRef();
  useFrame((state) => {
    if (!isBlown) {
      const t = state.clock.elapsedTime;
      if (flameRef.current) {
        flameRef.current.scale.y = 1 + Math.sin(t * 12 + index) * 0.2;
        flameRef.current.scale.x = 1 + Math.cos(t * 15 + index) * 0.08;
        flameRef.current.rotation.z = Math.sin(t * 8) * 0.15;
      }
      if (innerFlameRef.current) {
        innerFlameRef.current.scale.y = 1 + Math.sin(t * 18 + index) * 0.12;
      }
    }
  });

  const candleHeight = 0.5;
  const wickY = candleHeight;
  const flameY = candleHeight + 0.05;

  return (
    <group
      position={position}
      onClick={(e) => {
        if (!isBlown) {
          e.stopPropagation();
          onBlow(index);
        }
      }}
      onPointerOver={() => { if (!isBlown) document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      {/* Cream Mount to fix floating */}
      <CreamMount />

      <mesh position={[0, candleHeight / 2, 0]}>
        <cylinderGeometry args={[0.025, 0.025, candleHeight, 12]} />
        <meshStandardMaterial color="#FFEEEE" roughness={0.3} />
      </mesh>
      <mesh position={[0, wickY + 0.02, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 0.05, 4]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {!isBlown && (
        <group position={[0, flameY, 0]}>
          {/* Flame Geometry */}
          <mesh ref={flameRef} position={[0, 0.02, 0]} scale={[1, 0.8, 1]}>
            <coneGeometry args={[0.04, 0.08, 8]} />
            <meshStandardMaterial color="#ff6600" emissive="#ff4400" emissiveIntensity={3} toneMapped={false} transparent opacity={0.85} />
          </mesh>
          <mesh position={[0, 0.05, 0]} scale={[0.7, 1, 0.7]}>
            <coneGeometry args={[0.03, 0.1, 8]} />
            <meshStandardMaterial color="#ffaa00" emissive="#ff8800" emissiveIntensity={3.5} toneMapped={false} transparent opacity={0.9} />
          </mesh>
          <mesh position={[0, 0.1, 0]} scale={[0.4, 1, 0.4]}>
            <coneGeometry args={[0.015, 0.06, 6]} />
            <meshStandardMaterial color="#ffee00" emissive="#ffdd00" emissiveIntensity={4.5} toneMapped={false} />
          </mesh>
          <mesh ref={innerFlameRef} position={[0, 0.04, 0]} scale={[0.5, 0.8, 0.5]}>
            <coneGeometry args={[0.015, 0.04, 4]} />
            <meshStandardMaterial color="#ffffee" emissive="#ffffaa" emissiveIntensity={5} toneMapped={false} />
          </mesh>
          <pointLight position={[0, 0.05, 0]} distance={1} intensity={0.6} color="#ffa500" decay={2} />
        </group>
      )}

      {/* SMOKE EFFECT WHEN BLOWN */}
      {isBlown && (
        <SmokeParticles position={[0, wickY + 0.05, 0]} />
      )}
    </group>
  );
});

// Static position constants to ensure prop stability for React.memo
const SIGN_POS = [0, 2.5, 0];
const TIER_1_POS = [0, 0.4, 0];
const TIER_2_POS = [0, 1.2, 0];
const TIER_3_POS = [0, 2.0, 0];

const CakeScene = ({ blownCandles, onCandleBlow }) => {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  const candlePositions = useMemo(() => {
    const pos = [];
    // Top Tier (Surface at 2.4 - Candle Base relative to tier surface)

    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      pos.push([Math.cos(a) * 0.45, 2.4, Math.sin(a) * 0.45]);
    }
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2 + 0.5;
      pos.push([Math.cos(a) * 0.9, 1.6, Math.sin(a) * 0.9]);
    }
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      pos.push([Math.cos(a) * 1.35, 0.8, Math.sin(a) * 1.35]);
    }
    return pos;
  }, []);

  return (
    <group ref={groupRef} position={[0, -1.8, 0]}>
      <HappyPengSign position={SIGN_POS} />

      <CreamTier
        position={TIER_1_POS}
        radiusBottom={1.6} radiusTop={1.6} height={0.8}
        color="#cbeaf8"
        creamColor="#ffffff"
        pearlColor="#E0E0E0"
        flowerColor="#ffb7b2"
        goldFlakeCount={40}
      />
      <CreamTier
        position={TIER_2_POS}
        radiusBottom={1.1} radiusTop={1.1} height={0.8}
        color="#fcdde2"
        creamColor="#ffffff"
        pearlColor="#FFD700"
        flowerColor="#cbeaf8"
        goldFlakeCount={30}
      />
      <CreamTier
        position={TIER_3_POS}
        radiusBottom={0.7} radiusTop={0.7} height={0.8}
        color="#fffffa"
        creamColor="#fcdde2"
        pearlColor="#fcdde2"
        flowerColor="#fcdde2"
        goldFlakeCount={20}
      />

      {candlePositions.map((pos, i) => (
        <Candle
          key={i}
          position={pos}
          index={i}
          isBlown={blownCandles.includes(i)}
          onBlow={onCandleBlow}
        />
      ))}
    </group>
  );
};

const ThreeDCake = React.memo(({ blownCandles, onCandleBlow }) => {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative z-10 pointer-events-auto bg-transparent">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 3, 7], fov: 40 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: 'auto' }}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.9} />
          <spotLight position={[5, 10, 5]} angle={0.5} penumbra={0.5} intensity={0.6} color="#fff" />
          <Float speed={1} rotationIntensity={0.05} floatIntensity={0.05}>
            <CakeScene blownCandles={blownCandles} onCandleBlow={onCandleBlow} />
          </Float>
          <Sparkles count={50} scale={6} size={5} speed={0.4} opacity={0.5} color="#FFD700" />
          <ContactShadows position={[0, -2.5, 0]} opacity={0.3} scale={15} blur={3} far={5} color="#cbeaf8" />
          <Stars radius={100} depth={50} count={400} factor={4} saturation={0} fade speed={0.5} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.8}
            autoRotate
            autoRotateSpeed={0.3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
});

export default ThreeDCake;
