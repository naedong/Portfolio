"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import unicalScreenshot from "../public/projects/unical.png";
import deutschFlowScreenshot from "../public/projects/deutsch-flow.png";
import travelbScreenshot from "../public/projects/travelb.png";

type ZoneKey = "home" | "about" | "work" | "lab" | "contact";
type Locale = "ko" | "en" | "de";
type ProjectKey = "unical" | "deutsch-flow" | "travelb";

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

const ZONES: Record<Locale, Zone[]> = {
  ko: [
    { key: "home", index: "00", nav: "시작", eyebrow: "WONCHEOL HAN · MOBILE / BACKEND / AI", title: "아이디어를\n작동하는 제품으로.", description: "사용자의 실제 문제에서 출발해 모바일 앱, 안전한 백엔드, AI 기능까지 직접 설계하고 구현합니다.", x: 0, z: 0, accent: "#ff6b35" },
    { key: "about", index: "01", nav: "소개", eyebrow: "ABOUT · PRODUCT ENGINEERING", title: "가장 중요한 경계부터\n설계합니다.", description: "Flutter와 Kotlin으로 제품을 만들고 Spring Boot로 신뢰 경계를 세웁니다. 기술보다 먼저 사용자, 안전, 반복 사용의 이유를 봅니다.", x: 12, z: -2, accent: "#ffd166" },
    { key: "work", index: "02", nav: "작업", eyebrow: "SELECTED PRODUCTS · VERIFIED SOURCES", title: "기획에서 코드까지\n이어진 제품들.", description: "실제 구현, 제품 정의, 디자인 자료로 확인할 수 있는 프로젝트입니다. 프로젝트를 선택하면 설명과 실제 화면을 볼 수 있습니다.", x: 24, z: 1.5, accent: "#3dd6a5" },
    { key: "lab", index: "03", nav: "실험", eyebrow: "PRODUCT LAB · NOTION TO PROTOTYPE", title: "문제를 발견하면\n작게라도 만듭니다.", description: "기억 보존, 기회 창출, 여행 경험처럼 아직 답이 명확하지 않은 문제를 제품 가설과 프로토타입으로 발전시킵니다.", x: 36, z: -1, accent: "#70a1ff" },
    { key: "contact", index: "04", nav: "연락", eyebrow: "CONTACT · LET’S MAKE A SIGNAL", title: "함께 작동하는 것을\n만들어볼까요?", description: "모바일 제품, 안전 중심 백엔드, AI 기반 학습 도구와 새로운 아이디어에 열려 있습니다.", x: 48, z: 0, accent: "#ff5c8a" },
  ],
  en: [
    { key: "home", index: "00", nav: "Start", eyebrow: "WONCHEOL HAN · MOBILE / BACKEND / AI", title: "Ideas into\nworking products.", description: "I start with real user problems and design and build mobile apps, secure backends, and AI features end to end.", x: 0, z: 0, accent: "#ff6b35" },
    { key: "about", index: "01", nav: "About", eyebrow: "ABOUT · PRODUCT ENGINEERING", title: "I design the boundaries\nthat matter first.", description: "I build products with Flutter and Kotlin and define trust boundaries with Spring Boot. Users, safety, and reasons to return come before technology.", x: 12, z: -2, accent: "#ffd166" },
    { key: "work", index: "02", nav: "Work", eyebrow: "SELECTED PRODUCTS · VERIFIED SOURCES", title: "Products carried\nfrom concept to code.", description: "These projects are grounded in working implementations, product definitions, and design evidence. Select one to see its story and actual screen.", x: 24, z: 1.5, accent: "#3dd6a5" },
    { key: "lab", index: "03", nav: "Lab", eyebrow: "PRODUCT LAB · NOTION TO PROTOTYPE", title: "When I find a problem,\nI build a small answer.", description: "I turn open questions around memory, opportunity, and travel into product hypotheses and working prototypes.", x: 36, z: -1, accent: "#70a1ff" },
    { key: "contact", index: "04", nav: "Contact", eyebrow: "CONTACT · LET’S MAKE A SIGNAL", title: "Shall we build\nsomething that works?", description: "I am open to mobile products, safety-first backends, AI learning tools, and thoughtful new ideas.", x: 48, z: 0, accent: "#ff5c8a" },
  ],
  de: [
    { key: "home", index: "00", nav: "Start", eyebrow: "WONCHEOL HAN · MOBILE / BACKEND / AI", title: "Aus Ideen werden\nfunktionierende Produkte.", description: "Ich beginne bei echten Problemen von Nutzer:innen und entwickle mobile Apps, sichere Backends und KI-Funktionen durchgängig selbst.", x: 0, z: 0, accent: "#ff6b35" },
    { key: "about", index: "01", nav: "Über mich", eyebrow: "ÜBER MICH · PRODUCT ENGINEERING", title: "Zuerst entwerfe ich\ndie wichtigen Grenzen.", description: "Ich baue Produkte mit Flutter und Kotlin und definiere Vertrauensgrenzen mit Spring Boot. Menschen, Sicherheit und Wiederkehr kommen vor der Technologie.", x: 12, z: -2, accent: "#ffd166" },
    { key: "work", index: "02", nav: "Projekte", eyebrow: "AUSGEWÄHLTE PRODUKTE · GEPRÜFTE QUELLEN", title: "Produkte – von der Idee\nbis zum Code.", description: "Diese Projekte sind durch funktionierende Implementierungen, Produktdefinitionen und Designmaterial belegt. Wähle ein Projekt für Beschreibung und echten Screen.", x: 24, z: 1.5, accent: "#3dd6a5" },
    { key: "lab", index: "03", nav: "Labor", eyebrow: "PRODUCT LAB · VON NOTION ZUM PROTOTYP", title: "Wenn ich ein Problem sehe,\nbaue ich eine kleine Lösung.", description: "Offene Fragen zu Erinnerung, Chancen und Reisen entwickle ich zu Produkthypothesen und funktionierenden Prototypen weiter.", x: 36, z: -1, accent: "#70a1ff" },
    { key: "contact", index: "04", nav: "Kontakt", eyebrow: "KONTAKT · LET’S MAKE A SIGNAL", title: "Bauen wir etwas,\ndas wirklich funktioniert.", description: "Ich bin offen für mobile Produkte, sicherheitsorientierte Backends, KI-Lernwerkzeuge und durchdachte neue Ideen.", x: 48, z: 0, accent: "#ff5c8a" },
  ],
};

type ProjectLink = { kind: "github" | "notion"; href: string };
type Project = {
  key: ProjectKey;
  year: string;
  name: string;
  type: string;
  image: StaticImageData;
  description: Record<Locale, string>;
  links: ProjectLink[];
};

const PROJECTS: Project[] = [
  {
    key: "unical",
    year: "LIVE",
    name: "UniCal",
    type: "CAMPUS · FLUTTER",
    image: unicalScreenshot,
    description: {
      ko: "대학별 인증을 기반으로 개인 시간표, 강의 탐색·후기, 학생 커뮤니티와 캠퍼스 행사를 연결하는 학생 플랫폼입니다.",
      en: "A student platform connecting personal timetables, course discovery and reviews, student communities, and campus events through university-based verification.",
      de: "Eine Studierendenplattform, die über eine hochschulbasierte Verifizierung persönliche Stundenpläne, Kurssuche und -bewertungen, Campus-Communitys und Veranstaltungen verbindet.",
    },
    links: [
      { kind: "github", href: "https://github.com/naedong/unical" },
      { kind: "notion", href: "https://app.notion.com/p/3b2b8ce076a181759c3efe9b3908067c" },
    ],
  },
  {
    key: "deutsch-flow",
    year: "BUILT",
    name: "Deutsch Flow",
    type: "EDTECH · FLUTTER · AI",
    image: deutschFlowScreenshot,
    description: {
      ko: "개인 단어장, 간격 반복, 발음 코칭과 실전 콘텐츠를 하나의 학습 흐름으로 연결한 독일어 학습 앱입니다.",
      en: "A German-learning app combining a personal vocabulary library, spaced repetition, pronunciation coaching, and real-world content in one continuous workflow.",
      de: "Eine Deutschlern-App, die persönliche Vokabelsammlung, Spaced Repetition, Aussprachetraining und authentische Inhalte in einem Lernfluss verbindet.",
    },
    links: [
      { kind: "github", href: "https://github.com/naedong/vocabapp" },
      { kind: "notion", href: "https://app.notion.com/p/3c0b8ce076a182f9aeec01945499e3e7" },
    ],
  },
  {
    key: "travelb",
    year: "BUILT",
    name: "TravelB",
    type: "TRAVEL · KOTLIN · COMPOSE",
    image: travelbScreenshot,
    description: {
      ko: "처음 Kotlin과 Jetpack Compose로 만든 모듈형 국내 여행 앱으로, 지역·축제 정보와 Kakao Map, 위치 탐색, 여행 계획 기능을 한 흐름으로 구성했습니다.",
      en: "My first Kotlin and Jetpack Compose travel app, combining regional and festival discovery, Kakao Map exploration, location search, and trip planning in a modular Android architecture.",
      de: "Meine erste Reise-App mit Kotlin und Jetpack Compose: regionale und Festival-Entdeckung, Kakao-Map-Erkundung, Standortsuche und Reiseplanung in einer modularen Android-Architektur.",
    },
    links: [
      { kind: "github", href: "https://github.com/naedong/travelB" },
      { kind: "notion", href: "https://app.notion.com/p/359b8ce076a18061ab5ce533688f7263" },
    ],
  },
];

const LABS = [
  { name: "Life Archive", type: "AI MEMORY" },
  { name: "Outbound Coach", type: "CAREER AI" },
];

const UI_COPY = {
  ko: {
    loading: "공간을 조립하는 중", building: "공개적으로 만드는 중 · 저장소 43개", sayHello: "인사하기", start: "탐험 시작", next: "다음 구역",
    brandHome: "처음으로 이동", projectList: "선택한 프로젝트", projectOpen: "프로젝트 상세 보기", social: "소셜 링크", journey: "포트폴리오 구역",
    move: "이동", moveHint: "빛을 움직여\n구역을 탐험하세요", movement: "이동 컨트롤", up: "위로 이동", left: "왼쪽으로 이동", down: "아래로 이동", right: "오른쪽으로 이동",
    close: "닫기", dialog: "프로젝트 설명과 스크린샷", sourceLead: "자세한 내용은", sourceEnd: "에서 확인할 수 있습니다.",
    linkLabels: { github: "GitHub 저장소", notion: "Notion 문서" },
    pageTitle: "한원철 — Product Builder",
  },
  en: {
    loading: "ASSEMBLING THE SPACE", building: "BUILDING IN PUBLIC · 43 REPOSITORIES", sayHello: "SAY HELLO", start: "START EXPLORING", next: "NEXT ZONE",
    brandHome: "Go to start", projectList: "Selected projects", projectOpen: "View project details", social: "Social links", journey: "Portfolio zones",
    move: "MOVE", moveHint: "Move the light\nand explore each zone", movement: "Movement controls", up: "Move up", left: "Move left", down: "Move down", right: "Move right",
    close: "Close", dialog: "Project description and screenshot", sourceLead: "Explore the", sourceEnd: "for more detail.",
    linkLabels: { github: "GitHub repository", notion: "Notion brief" },
    pageTitle: "Woncheol Han — Product Builder",
  },
  de: {
    loading: "RAUM WIRD AUFGEBAUT", building: "OFFEN ENTWICKELT · 43 REPOSITORIES", sayHello: "KONTAKT", start: "ERKUNDUNG STARTEN", next: "NÄCHSTER BEREICH",
    brandHome: "Zum Start", projectList: "Ausgewählte Projekte", projectOpen: "Projektdetails öffnen", social: "Social Links", journey: "Portfolio-Bereiche",
    move: "BEWEGEN", moveHint: "Bewege das Licht\nund erkunde die Bereiche", movement: "Bewegungssteuerung", up: "Nach oben", left: "Nach links", down: "Nach unten", right: "Nach rechts",
    close: "Schließen", dialog: "Projektbeschreibung und Screenshot", sourceLead: "Weitere Details:", sourceEnd: "",
    linkLabels: { github: "GitHub-Repository", notion: "Notion-Dokument" },
    pageTitle: "Woncheol Han — Product Builder",
  },
} satisfies Record<Locale, {
  loading: string; building: string; sayHello: string; start: string; next: string; brandHome: string; projectList: string; projectOpen: string;
  social: string; journey: string; move: string; moveHint: string; movement: string; up: string; left: string; down: string; right: string;
  close: string; dialog: string; sourceLead: string; sourceEnd: string; linkLabels: Record<ProjectLink["kind"], string>; pageTitle: string;
}>;

type UiCopy = (typeof UI_COPY)[Locale];

function ZoneContent({ zone, copy, onExplore, onSelectProject }: { zone: Zone; copy: UiCopy; onExplore: () => void; onSelectProject: (project: Project) => void }) {
  if (zone.key === "work") {
    return (
      <div className="zone-extra project-list" aria-label={copy.projectList}>
        {PROJECTS.map((project) => (
          <button
            type="button"
            className="project-row"
            key={project.name}
            onClick={() => onSelectProject(project)}
            aria-haspopup="dialog"
            aria-label={`${project.name} — ${copy.projectOpen}`}
          >
            <span className="project-year">{project.year}</span>
            <span className="project-name">{project.name}</span>
            <span className="project-type">{project.type}</span>
            <span className="project-arrow" aria-hidden="true">→</span>
          </button>
        ))}
      </div>
    );
  }

  if (zone.key === "lab") {
    return (
      <div className="zone-extra lab-list">
        {LABS.map((item, index) => (
          <div className="lab-pill" key={item.name}>
            <span>0{index + 1}</span>
            {item.name}
            <em>{item.type}</em>
          </div>
        ))}
      </div>
    );
  }

  if (zone.key === "contact") {
    return (
      <div className="zone-extra contact-actions">
        <a className="primary-link" href="mailto:gim21041@gmail.com">
          gim21041@gmail.com <span aria-hidden="true">↗</span>
        </a>
        <div className="social-row" aria-label={copy.social}>
          <a href="https://github.com/naedong" target="_blank" rel="noreferrer">GITHUB ↗</a>
        </div>
      </div>
    );
  }

  return (
    <div className="zone-extra">
      <button className="primary-link" type="button" onClick={onExplore}>
        {zone.key === "home" ? copy.start : copy.next}
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

export default function Home() {
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const pressedRef = useRef(new Set<string>());
  const destinationRef = useRef<{ x: number; z: number } | null>(null);
  const [locale, setLocale] = useState<Locale>("ko");
  const [activeKey, setActiveKey] = useState<ZoneKey>("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  const zones = ZONES[locale];
  const copy = UI_COPY[locale];
  const activeZone = zones.find((zone) => zone.key === activeKey) ?? zones[0];

  const changeLocale = useCallback((nextLocale: Locale) => {
    setLocale(nextLocale);
  }, []);

  const goToZone = useCallback((key: ZoneKey) => {
    const zone = zones.find((item) => item.key === key);
    if (!zone) return;
    destinationRef.current = { x: zone.x, z: zone.z };
    setActiveKey(key);
  }, [zones]);

  const goNext = useCallback(() => {
    const current = zones.findIndex((zone) => zone.key === activeKey);
    goToZone(zones[Math.min(current + 1, zones.length - 1)].key);
  }, [activeKey, goToZone, zones]);

  const setControl = useCallback((control: string, isPressed: boolean) => {
    if (isPressed) {
      pressedRef.current.add(control);
      destinationRef.current = null;
    } else {
      pressedRef.current.delete(control);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = copy.pageTitle;
  }, [copy.pageTitle, locale]);

  useEffect(() => {
    if (!selectedProject) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedProject]);

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
      renderer.shadowMap.type = THREE.PCFShadowMap;
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
      grid.material.transparent = true;
      grid.material.opacity = 0.48;
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

      const zoneGroups: Array<InstanceType<typeof THREE.Group>> = [];
      zones.forEach((zone, zoneIndex) => {
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

      const startedAt = performance.now();
      let previousFrame = startedAt;
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
        const now = performance.now();
        const elapsed = (now - startedAt) / 1000;
        const delta = Math.min((now - previousFrame) / 1000, 0.035);
        previousFrame = now;
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

        const nearest = zones.reduce((best, zone) => {
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
  }, [setControl, zones]);

  return (
    <main className="portfolio-shell" style={{ "--zone-accent": activeZone.accent } as React.CSSProperties}>
      <div className="scene" ref={canvasHostRef} />
      <div className="atmosphere" aria-hidden="true" />
      <div className={`loading-screen ${ready ? "is-ready" : ""}`} aria-hidden={ready}>
        <div className="loading-mark">HW</div>
        <div className="loading-track"><span /></div>
        <p>{copy.loading}</p>
      </div>

      <header className="topbar">
        <button className="brand" type="button" onClick={() => goToZone("home")} aria-label={copy.brandHome}>
          <span className="brand-mark">HW</span>
          <span className="brand-copy">WONCHEOL<br />HAN</span>
        </button>

        <div className="availability"><span /> {copy.building}</div>

        <div className="top-actions">
          <div className="language-switch" aria-label="Language">
            {(["ko", "en", "de"] as Locale[]).map((language) => (
              <button
                type="button"
                key={language}
                className={locale === language ? "is-active" : ""}
                aria-pressed={locale === language}
                onClick={() => changeLocale(language)}
              >
                {language === "ko" ? "KO" : language.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="https://github.com/naedong" target="_blank" rel="noreferrer" className="github-link">GITHUB / NAEDONG ↗</a>
          <a href="mailto:gim21041@gmail.com" className="say-hi">{copy.sayHello} <span>↗</span></a>
        </div>
      </header>

      <section className="content-panel" key={`${activeZone.key}-${locale}`} aria-live="polite">
        <div className="zone-index"><span>{activeZone.index}</span><i /></div>
        <p className="eyebrow">{activeZone.eyebrow}</p>
        <h1>{activeZone.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
        <p className="zone-description">{activeZone.description}</p>
        <ZoneContent zone={activeZone} copy={copy} onExplore={goNext} onSelectProject={setSelectedProject} />
      </section>

      <aside className="journey-rail" aria-label={copy.journey}>
        <span className="rail-label">JOURNEY</span>
        <div className="rail-line"><i style={{ height: `${progress * 100}%` }} /></div>
        <nav>
          {zones.map((zone) => (
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
        <p><strong>{copy.move}</strong>{copy.moveHint.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</p>
      </div>

      <div className="touch-controls" aria-label={copy.movement}>
        <button
          type="button"
          className="touch-up"
          aria-label={copy.up}
          onPointerDown={() => setControl("w", true)}
          onPointerUp={() => setControl("w", false)}
          onPointerCancel={() => setControl("w", false)}
        >↑</button>
        <button
          type="button"
          className="touch-left"
          aria-label={copy.left}
          onPointerDown={() => setControl("a", true)}
          onPointerUp={() => setControl("a", false)}
          onPointerCancel={() => setControl("a", false)}
        >←</button>
        <button
          type="button"
          className="touch-down"
          aria-label={copy.down}
          onPointerDown={() => setControl("s", true)}
          onPointerUp={() => setControl("s", false)}
          onPointerCancel={() => setControl("s", false)}
        >↓</button>
        <button
          type="button"
          className="touch-right"
          aria-label={copy.right}
          onPointerDown={() => setControl("d", true)}
          onPointerUp={() => setControl("d", false)}
          onPointerCancel={() => setControl("d", false)}
        >→</button>
      </div>

      {selectedProject && (
        <div
          className="project-dialog-backdrop"
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProject(null);
          }}
        >
          <article
            className="project-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.name} — ${copy.dialog}`}
          >
            <button className="project-dialog-close" type="button" onClick={() => setSelectedProject(null)} aria-label={copy.close}>
              <span aria-hidden="true">×</span>
            </button>
            <div className="project-dialog-media">
              <Image
                src={selectedProject.image}
                alt={`${selectedProject.name} — ${copy.dialog}`}
                fill
                sizes="(max-width: 720px) 92vw, 780px"
                priority
              />
            </div>
            <div className="project-dialog-copy">
              <h2>{selectedProject.name}</h2>
              <p>
                {selectedProject.description[locale]}{" "}
                <span className="project-inline-sources">
                  {copy.sourceLead}{" "}
                  {selectedProject.links.map((link, index) => (
                    <span key={link.kind}>
                      {index > 0 && " · "}
                      <a href={link.href} target="_blank" rel="noreferrer">{copy.linkLabels[link.kind]} ↗</a>
                    </span>
                  ))}{" "}
                  {copy.sourceEnd}
                </span>
              </p>
            </div>
          </article>
        </div>
      )}

      <footer className="footer-note">
        <span>© 2026 WONCHEOL HAN</span>
        <span>PRODUCT · ENGINEERING · AI</span>
      </footer>
    </main>
  );
}
