"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ZoneKey = "home" | "about" | "work" | "lab" | "contact";

type Zone = {
  key: ZoneKey;
  index: string;
  nav: string;
  eyebrow: string;
  title: string;
  description: string;
  x: number;
  z: number;
  accent: string;
};

const ZONES: Zone[] = [
  {
    key: "home",
    index: "00",
    nav: "시작",
    eyebrow: "CREATIVE DEVELOPER · SEOUL / BERLIN",
    title: "디지털에\n온도를 더합니다.",
    description:
      "코드, 움직임, 이야기를 엮어 화면 너머까지 기억되는 경험을 만듭니다.",
    x: 0,
    z: 0,
    accent: "#ff6b35",
  },
  {
    key: "about",
    index: "01",
    nav: "소개",
    eyebrow: "ABOUT · HOW I THINK",
    title: "좋은 경험은\n설명보다 먼저 느껴집니다.",
    description:
      "복잡한 문제를 명료한 인터페이스로 바꾸고, 기술과 감각 사이의 균형을 설계합니다.",
    x: 12,
    z: -2,
    accent: "#ffd166",
  },
  {
    key: "work",
    index: "02",
    nav: "작업",
    eyebrow: "SELECTED WORK · 2024—2026",
    title: "쓸모와 매력이\n함께 남는 작업.",
    description:
      "브랜드의 첫 인상부터 제품의 반복 사용까지, 서로 다른 접점을 하나의 경험으로 연결합니다.",
    x: 24,
    z: 1.5,
    accent: "#3dd6a5",
  },
  {
    key: "lab",
    index: "03",
    nav: "실험",
    eyebrow: "PLAYGROUND · MOTION / 3D / AI",
    title: "호기심은 가장\n좋은 프로토타입입니다.",
    description:
      "새로운 도구를 작게 실험하고, 가능성이 보이면 실제 제품의 언어로 발전시킵니다.",
    x: 36,
    z: -1,
    accent: "#70a1ff",
  },
  {
    key: "contact",
    index: "04",
    nav: "연락",
    eyebrow: "CONTACT · LET’S MAKE A SIGNAL",
    title: "다음 장면을\n함께 만들까요?",
    description:
      "새로운 제품, 인터랙티브 웹, 혹은 아직 이름 붙지 않은 아이디어에 열려 있습니다.",
    x: 48,
    z: 0,
    accent: "#ff5c8a",
  },
];

const PROJECTS = [
  { year: "2026", name: "Morrow OS", type: "PRODUCT · AI" },
  { year: "2025", name: "Field Notes", type: "BRAND · WEB" },
  { year: "2024", name: "Afterglow", type: "EXPERIENCE · 3D" },
];

const LABS = ["생성형 인터페이스", "공간형 웹 내비게이션", "모션 기반 데이터 스토리"];

function ZoneContent({ zone, onExplore }: { zone: Zone; onExplore: () => void }) {
  if (zone.key === "work") {
    return (
      <div className="zone-extra project-list" aria-label="선택한 프로젝트">
        {PROJECTS.map((project) => (
          <button className="project-row" key={project.name} type="button">
            <span className="project-year">{project.year}</span>
            <span className="project-name">{project.name}</span>
            <span className="project-type">{project.type}</span>
            <span className="project-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
    );
  }

  if (zone.key === "lab") {
    return (
      <div className="zone-extra lab-list">
        {LABS.map((item, index) => (
          <div className="lab-pill" key={item}>
            <span>0{index + 1}</span>
            {item}
          </div>
        ))}
      </div>
    );
  }

  if (zone.key === "contact") {
    return (
      <div className="zone-extra contact-actions">
        <a className="primary-link" href="mailto:hello@yourname.dev">
          hello@yourname.dev <span aria-hidden="true">↗</span>
        </a>
        <div className="social-row" aria-label="소셜 링크">
          <a href="#" onClick={(event) => event.preventDefault()}>LINKEDIN</a>
          <a href="#" onClick={(event) => event.preventDefault()}>GITHUB</a>
          <a href="#" onClick={(event) => event.preventDefault()}>INSTAGRAM</a>
        </div>
      </div>
    );
  }

  return (
    <div className="zone-extra">
      <button className="primary-link" type="button" onClick={onExplore}>
        {zone.key === "home" ? "탐험 시작" : "다음 구역"}
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

export default function Home() {
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const pressedRef = useRef(new Set<string>());
  const destinationRef = useRef<{ x: number; z: number } | null>(null);
  const [activeKey, setActiveKey] = useState<ZoneKey>("home");
  const [ready, setReady] = useState(false);
  const [sound, setSound] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeZone = ZONES.find((zone) => zone.key === activeKey) ?? ZONES[0];

  const goToZone = useCallback((key: ZoneKey) => {
    const zone = ZONES.find((item) => item.key === key);
    if (!zone) return;
    destinationRef.current = { x: zone.x, z: zone.z };
    setActiveKey(key);
  }, []);

  const goNext = useCallback(() => {
    const current = ZONES.findIndex((zone) => zone.key === activeKey);
    goToZone(ZONES[Math.min(current + 1, ZONES.length - 1)].key);
  }, [activeKey, goToZone]);

  const setControl = useCallback((control: string, isPressed: boolean) => {
    if (isPressed) {
      pressedRef.current.add(control);
      destinationRef.current = null;
    } else {
      pressedRef.current.delete(control);
    }
  }, []);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    async function startScene() {
      const THREE = await import("three");
      const host = canvasHostRef.current;
      if (!host || disposed) return;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x07100d);
      scene.fog = new THREE.FogExp2(0x07100d, 0.022);

      const camera = new THREE.PerspectiveCamera(42, host.clientWidth / host.clientHeight, 0.1, 180);
      camera.position.set(-6, 10, 15);

      const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.domElement.setAttribute("aria-hidden", "true");
      host.appendChild(renderer.domElement);

      scene.add(new THREE.HemisphereLight(0xb8ffe4, 0x07100d, 2.25));
      const sun = new THREE.DirectionalLight(0xffefd2, 5.2);
      sun.position.set(-8, 16, 10);
      sun.castShadow = true;
      sun.shadow.mapSize.set(1024, 1024);
      sun.shadow.camera.left = -20;
      sun.shadow.camera.right = 20;
      sun.shadow.camera.top = 20;
      sun.shadow.camera.bottom = -20;
      scene.add(sun);

      const world = new THREE.Group();
      scene.add(world);

      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 46),
        new THREE.MeshStandardMaterial({ color: 0x08130f, roughness: 1, metalness: 0 })
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.set(24, -0.72, 0);
      floor.receiveShadow = true;
      world.add(floor);

      const grid = new THREE.GridHelper(100, 50, 0x18372d, 0x10251f);
      grid.position.set(24, -0.68, 0);
      (grid.material as THREE.Material).transparent = true;
      (grid.material as THREE.Material).opacity = 0.48;
      world.add(grid);

      const glowMaterial = new THREE.MeshBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0.7 });
      for (let index = -2; index < 54; index += 1.5) {
        const dot = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 8), glowMaterial);
        dot.position.set(index, -0.42, Math.sin(index * 0.55) * 0.5);
        world.add(dot);
      }

      const makeLabel = (zone: Zone) => {
        const labelCanvas = document.createElement("canvas");
        labelCanvas.width = 768;
        labelCanvas.height = 192;
        const context = labelCanvas.getContext("2d");
        if (!context) return null;
        context.clearRect(0, 0, 768, 192);
        context.font = "700 34px Arial";
        context.fillStyle = zone.accent;
        context.fillText(zone.index, 30, 65);
        context.font = "800 72px Arial";
        context.fillStyle = "#f0f6ef";
        context.fillText(zone.nav.toUpperCase(), 30, 145);
        const texture = new THREE.CanvasTexture(labelCanvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
        sprite.scale.set(6.4, 1.6, 1);
        return sprite;
      };

      const zoneGroups: THREE.Group[] = [];
      ZONES.forEach((zone, zoneIndex) => {
        const group = new THREE.Group();
        group.position.set(zone.x, 0, zone.z);
        group.userData.baseY = 0;
        world.add(group);
        zoneGroups.push(group);

        const accent = new THREE.Color(zone.accent);
        const base = new THREE.Mesh(
          new THREE.CylinderGeometry(3.65, 4.15, 0.7, 8),
          new THREE.MeshStandardMaterial({ color: 0x10241c, roughness: 0.82, metalness: 0.12 })
        );
        base.position.y = -0.34;
        base.receiveShadow = true;
        base.castShadow = true;
        group.add(base);

        const edge = new THREE.Mesh(
          new THREE.TorusGeometry(3.68, 0.045, 8, 96),
          new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.75 })
        );
        edge.rotation.x = Math.PI / 2;
        edge.position.y = 0.03;
        group.add(edge);

        const label = makeLabel(zone);
        if (label) {
          label.position.set(0, 3.7, -0.8);
          group.add(label);
        }

        if (zoneIndex === 0) {
          const core = new THREE.Mesh(
            new THREE.IcosahedronGeometry(1.15, 1),
            new THREE.MeshStandardMaterial({ color: accent, emissive: accent, emissiveIntensity: 0.55, roughness: 0.35 })
          );
          core.position.y = 1.4;
          core.castShadow = true;
          core.userData.spin = 0.32;
          group.add(core);
          [1.8, 2.35].forEach((radius, ringIndex) => {
            const ring = new THREE.Mesh(
              new THREE.TorusGeometry(radius, 0.035, 8, 80),
              new THREE.MeshBasicMaterial({ color: ringIndex ? 0xffd166 : accent, transparent: true, opacity: 0.8 })
            );
            ring.position.y = 1.4;
            ring.rotation.set(Math.PI / 2.5, ringIndex * 0.8, 0);
            ring.userData.spin = ringIndex ? -0.2 : 0.22;
            group.add(ring);
          });
        } else if (zoneIndex === 1) {
          for (let i = 0; i < 7; i++) {
            const height = 0.8 + (i % 3) * 0.55;
            const crystal = new THREE.Mesh(
              new THREE.ConeGeometry(0.32 + (i % 2) * 0.12, height, 5),
              new THREE.MeshStandardMaterial({ color: i % 2 ? accent : 0xf4f1de, roughness: 0.35, metalness: 0.15 })
            );
            const angle = (i / 7) * Math.PI * 2;
            crystal.position.set(Math.cos(angle) * 1.8, height / 2, Math.sin(angle) * 1.8);
            crystal.castShadow = true;
            group.add(crystal);
          }
        } else if (zoneIndex === 2) {
          for (let i = 0; i < 3; i++) {
            const portal = new THREE.Group();
            const portalMaterial = new THREE.MeshStandardMaterial({ color: i === 1 ? accent : 0xdce8df, roughness: 0.3, metalness: 0.35 });
            const top = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.16, 0.18), portalMaterial);
            top.position.y = 1.8;
            const sideA = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.8, 0.18), portalMaterial);
            const sideB = sideA.clone();
            sideA.position.set(-0.7, 0.9, 0);
            sideB.position.set(0.7, 0.9, 0);
            portal.add(top, sideA, sideB);
            portal.position.set((i - 1) * 1.9, 0, (i % 2) * 0.45);
            portal.rotation.y = (i - 1) * -0.14;
            portal.userData.float = i * 0.6;
            group.add(portal);
          }
        } else if (zoneIndex === 3) {
          const planet = new THREE.Mesh(
            new THREE.SphereGeometry(0.9, 24, 16),
            new THREE.MeshStandardMaterial({ color: 0x2f5f9f, roughness: 0.55, metalness: 0.1 })
          );
          planet.position.y = 1.5;
          planet.userData.spin = 0.18;
          group.add(planet);
          const orbit = new THREE.Mesh(
            new THREE.TorusGeometry(1.7, 0.035, 8, 80),
            new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.9 })
          );
          orbit.rotation.x = 1.15;
          orbit.position.y = 1.5;
          orbit.userData.spin = 0.28;
          group.add(orbit);
          for (let i = 0; i < 14; i++) {
            const spark = new THREE.Mesh(new THREE.OctahedronGeometry(0.07, 0), new THREE.MeshBasicMaterial({ color: i % 2 ? accent : 0xffffff }));
            const angle = (i / 14) * Math.PI * 2;
            spark.position.set(Math.cos(angle) * (1.5 + (i % 3) * 0.35), 1.3 + (i % 4) * 0.25, Math.sin(angle) * 1.6);
            group.add(spark);
          }
        } else {
          const towerMaterial = new THREE.MeshStandardMaterial({ color: 0xe7eee8, roughness: 0.28, metalness: 0.65 });
          const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.52, 3.1, 6), towerMaterial);
          tower.position.y = 1.55;
          tower.castShadow = true;
          group.add(tower);
          const beacon = new THREE.Mesh(
            new THREE.SphereGeometry(0.34, 18, 12),
            new THREE.MeshBasicMaterial({ color: accent })
          );
          beacon.position.y = 3.15;
          beacon.userData.pulse = true;
          group.add(beacon);
          const light = new THREE.PointLight(accent, 4.5, 10, 2);
          light.position.y = 3.15;
          group.add(light);
        }
      });

      const rover = new THREE.Group();
      rover.position.set(0, 0.65, 2.5);
      world.add(rover);

      const roverCore = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.38, 1),
        new THREE.MeshStandardMaterial({ color: 0xf7fff8, emissive: 0xff6b35, emissiveIntensity: 0.8, roughness: 0.2, metalness: 0.55 })
      );
      roverCore.castShadow = true;
      rover.add(roverCore);
      const roverRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.58, 0.055, 8, 48),
        new THREE.MeshBasicMaterial({ color: 0xff6b35 })
      );
      roverRing.rotation.x = Math.PI / 2;
      rover.add(roverRing);
      const trailLight = new THREE.PointLight(0xff6b35, 4, 7, 2);
      rover.add(trailLight);

      const dustGeometry = new THREE.BufferGeometry();
      const dustPoints = new Float32Array(240 * 3);
      for (let i = 0; i < 240; i++) {
        dustPoints[i * 3] = Math.random() * 70 - 8;
        dustPoints[i * 3 + 1] = Math.random() * 10 + 0.5;
        dustPoints[i * 3 + 2] = Math.random() * 28 - 14;
      }
      dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPoints, 3));
      const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: 0xb8ffe4, size: 0.028, transparent: true, opacity: 0.48 }));
      scene.add(dust);

      const clock = new THREE.Clock();
      const player = { x: 0, z: 2.5, vx: 0, vz: 0 };
      const pointer = { x: 0, y: 0 };
      let lastZone: ZoneKey = "home";
      let animationFrame = 0;

      const onPointerMove = (event: PointerEvent) => {
        pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
        pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
      };

      const onKey = (event: KeyboardEvent, down: boolean) => {
        const key = event.key.toLowerCase();
        if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) {
          event.preventDefault();
          setControl(key, down);
        }
      };

      const onKeyDown = (event: KeyboardEvent) => onKey(event, true);
      const onKeyUp = (event: KeyboardEvent) => onKey(event, false);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);

      const onResize = () => {
        if (!host) return;
        camera.aspect = host.clientWidth / host.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(host.clientWidth, host.clientHeight);
      };
      window.addEventListener("resize", onResize);

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const animate = () => {
        const elapsed = clock.getElapsedTime();
        const delta = Math.min(clock.getDelta(), 0.035);
        const controls = pressedRef.current;
        const horizontal = Number(controls.has("d") || controls.has("arrowright")) - Number(controls.has("a") || controls.has("arrowleft"));
        const vertical = Number(controls.has("s") || controls.has("arrowdown")) - Number(controls.has("w") || controls.has("arrowup"));
        const hasManualInput = horizontal !== 0 || vertical !== 0;

        if (hasManualInput) {
          destinationRef.current = null;
          player.vx += horizontal * 0.12;
          player.vz += vertical * 0.1;
        } else if (destinationRef.current) {
          const target = destinationRef.current;
          const dx = target.x - player.x;
          const dz = target.z + 2.2 - player.z;
          const distance = Math.hypot(dx, dz);
          if (distance < 0.16) {
            destinationRef.current = null;
          } else {
            player.vx += (dx / distance) * 0.08;
            player.vz += (dz / distance) * 0.08;
          }
        }

        player.vx *= Math.pow(0.82, delta * 60);
        player.vz *= Math.pow(0.82, delta * 60);
        const speed = Math.hypot(player.vx, player.vz);
        if (speed > 0.26) {
          player.vx = (player.vx / speed) * 0.26;
          player.vz = (player.vz / speed) * 0.26;
        }
        player.x = THREE.MathUtils.clamp(player.x + player.vx * delta * 60, -2.5, 50.5);
        player.z = THREE.MathUtils.clamp(player.z + player.vz * delta * 60, -5.2, 5.2);

        rover.position.x = THREE.MathUtils.lerp(rover.position.x, player.x, 0.18);
        rover.position.z = THREE.MathUtils.lerp(rover.position.z, player.z, 0.18);
        rover.position.y = 0.7 + Math.sin(elapsed * 3.4) * 0.08;
        rover.rotation.y = THREE.MathUtils.lerp(rover.rotation.y, Math.atan2(player.vx, player.vz || 0.001), 0.12);
        roverRing.rotation.z = elapsed * 1.4;
        roverCore.rotation.y = elapsed * 0.9;

        const nearest = ZONES.reduce((best, zone) => {
          const distance = Math.hypot(zone.x - player.x, zone.z + 2.2 - player.z);
          return distance < best.distance ? { key: zone.key, distance } : best;
        }, { key: "home" as ZoneKey, distance: Number.POSITIVE_INFINITY });

        if (nearest.key !== lastZone && nearest.distance < 7.4) {
          lastZone = nearest.key;
          setActiveKey(nearest.key);
        }

        setProgress(Math.max(0, Math.min(1, player.x / 48)));

        zoneGroups.forEach((group, groupIndex) => {
          group.children.forEach((child) => {
            if (child.userData.spin) child.rotation.y += child.userData.spin * delta;
            if (child.userData.float !== undefined) child.position.y = Math.sin(elapsed * 1.5 + child.userData.float) * 0.08;
            if (child.userData.pulse) {
              const pulse = 1 + Math.sin(elapsed * 3.2) * 0.18;
              child.scale.setScalar(pulse);
            }
          });
          group.position.y = reducedMotion ? 0 : Math.sin(elapsed * 0.55 + groupIndex) * 0.035;
        });

        dust.rotation.y = elapsed * 0.004;
        const cameraX = player.x - 6 + pointer.x * 0.75;
        const cameraY = 10 - pointer.y * 0.35;
        const cameraZ = player.z + 15;
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, cameraX, 0.045);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, cameraY, 0.045);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, cameraZ, 0.045);
        camera.lookAt(player.x + 2.5, 0.45, player.z - 0.8);

        renderer.render(scene, camera);
        animationFrame = window.requestAnimationFrame(animate);
      };

      setReady(true);
      animate();

      cleanup = () => {
        window.cancelAnimationFrame(animationFrame);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
            object.geometry.dispose();
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material) => material.dispose());
          } else if (object instanceof THREE.Sprite) {
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material) => {
              material.map?.dispose();
              material.dispose();
            });
          }
        });
        renderer.domElement.remove();
      };
    }

    startScene();
    return () => {
      disposed = true;
      cleanup();
    };
  }, [setControl]);

  return (
    <main className="portfolio-shell" style={{ "--zone-accent": activeZone.accent } as React.CSSProperties}>
      <div className="scene" ref={canvasHostRef} />
      <div className="atmosphere" aria-hidden="true" />
      <div className={`loading-screen ${ready ? "is-ready" : ""}`} aria-hidden={ready}>
        <div className="loading-mark">SG</div>
        <div className="loading-track"><span /></div>
        <p>공간을 조립하는 중</p>
      </div>

      <header className="topbar">
        <button className="brand" type="button" onClick={() => goToZone("home")} aria-label="처음으로 이동">
          <span className="brand-mark">SG</span>
          <span className="brand-copy">SIGNAL<br />GARDEN</span>
        </button>

        <div className="availability"><span /> AVAILABLE FOR SELECT PROJECTS</div>

        <div className="top-actions">
          <button className={`sound-toggle ${sound ? "is-on" : ""}`} type="button" onClick={() => setSound((value) => !value)} aria-label={sound ? "사운드 끄기" : "사운드 켜기"}>
            <span className="sound-bars" aria-hidden="true"><i /><i /><i /></span>
            {sound ? "SOUND ON" : "SOUND OFF"}
          </button>
          <a href="mailto:hello@yourname.dev" className="say-hi">SAY HELLO <span>↗</span></a>
        </div>
      </header>

      <section className="content-panel" key={activeZone.key} aria-live="polite">
        <div className="zone-index"><span>{activeZone.index}</span><i /></div>
        <p className="eyebrow">{activeZone.eyebrow}</p>
        <h1>{activeZone.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
        <p className="zone-description">{activeZone.description}</p>
        <ZoneContent zone={activeZone} onExplore={goNext} />
      </section>

      <aside className="journey-rail" aria-label="포트폴리오 구역">
        <span className="rail-label">JOURNEY</span>
        <div className="rail-line"><i style={{ height: `${progress * 100}%` }} /></div>
        <nav>
          {ZONES.map((zone) => (
            <button
              key={zone.key}
              className={zone.key === activeKey ? "is-active" : ""}
              type="button"
              onClick={() => goToZone(zone.key)}
              aria-current={zone.key === activeKey ? "page" : undefined}
            >
              <span>{zone.index}</span>{zone.nav}
            </button>
          ))}
        </nav>
      </aside>

      <div className="control-hint" aria-hidden="true">
        <div className="key-cluster"><span>W</span><span>A</span><span>S</span><span>D</span></div>
        <p><strong>MOVE</strong>빛을 움직여<br />구역을 탐험하세요</p>
      </div>

      <div className="touch-controls" aria-label="이동 컨트롤">
        <button
          type="button"
          className="touch-up"
          aria-label="위로 이동"
          onPointerDown={() => setControl("w", true)}
          onPointerUp={() => setControl("w", false)}
          onPointerCancel={() => setControl("w", false)}
        >↑</button>
        <button
          type="button"
          className="touch-left"
          aria-label="왼쪽으로 이동"
          onPointerDown={() => setControl("a", true)}
          onPointerUp={() => setControl("a", false)}
          onPointerCancel={() => setControl("a", false)}
        >←</button>
        <button
          type="button"
          className="touch-down"
          aria-label="아래로 이동"
          onPointerDown={() => setControl("s", true)}
          onPointerUp={() => setControl("s", false)}
          onPointerCancel={() => setControl("s", false)}
        >↓</button>
        <button
          type="button"
          className="touch-right"
          aria-label="오른쪽으로 이동"
          onPointerDown={() => setControl("d", true)}
          onPointerUp={() => setControl("d", false)}
          onPointerCancel={() => setControl("d", false)}
        >→</button>
      </div>

      <footer className="footer-note">
        <span>© 2026</span>
        <span>DESIGNED IN KOREA · BUILT FOR THE WEB</span>
      </footer>
    </main>
  );
}
