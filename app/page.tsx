"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import unicalScreenshot from "../public/projects/unical.png";
import unicalCommunityScreenshot from "../public/projects/unical-community.png";
import unicalWeekScreenshot from "../public/projects/unical-week.png";
import unicalDayScreenshot from "../public/projects/unical-day.png";
import unicalLoginScreenshot from "../public/projects/unical-login.png";
import deutschFlowScreenshot from "../public/projects/deutsch-flow.png";
import deutschFlowWordScreenshot from "../public/projects/deutsch-flow-word.webp";
import deutschFlowLibraryScreenshot from "../public/projects/deutsch-flow-library.webp";
import deutschFlowPracticeScreenshot from "../public/projects/deutsch-flow-practice.webp";
import deutschFlowArticleScreenshot from "../public/projects/deutsch-flow-article.webp";
import deutschFlowSpeakingScreenshot from "../public/projects/deutsch-flow-speaking.webp";
import deutschFlowDictionaryScreenshot from "../public/projects/deutsch-flow-dictionary.webp";
import travelbDiscoverScreenshot from "../public/projects/travelb-discover.webp";
import travelbPlanScreenshot from "../public/projects/travelb-plan.webp";
import travelbMapScreenshot from "../public/projects/travelb-map.webp";

type ZoneKey = "home" | "about" | "work" | "contact";
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
    { key: "home", index: "00", nav: "시작", eyebrow: "WONCHEOL HAN · MOBILE / BACKEND / PRODUCT", title: "사용자의 문제를\n제품으로 해결합니다.", description: "모바일 앱부터 백엔드까지, 사용자에게 필요한 화면과 기능을 직접 설계하고 구현합니다.", x: 0, z: 0, accent: "#ff6b35" },
    { key: "about", index: "01", nav: "소개", eyebrow: "ABOUT · PRODUCT ENGINEERING", title: "사용자 경험부터\n안전한 구조까지.", description: "Flutter와 Kotlin으로 모바일 앱을 만들고, Spring Boot로 인증과 데이터 흐름을 설계합니다. 기술을 고르기 전에 누가 왜 쓰는지부터 생각합니다.", x: 12, z: -2, accent: "#ffd166" },
    { key: "work", index: "02", nav: "프로젝트", eyebrow: "SELECTED PRODUCTS · VERIFIED SOURCES", title: "기획부터 개발까지\n직접 만든 프로젝트.", description: "아이디어를 실제 화면과 코드로 구현한 프로젝트입니다. 프로젝트를 선택하면 주요 기능과 앱 화면, 개발 내용을 볼 수 있습니다.", x: 24, z: 1.5, accent: "#3dd6a5" },
    { key: "contact", index: "03", nav: "연락", eyebrow: "CONTACT · BERLIN / EUROPE", title: "함께 만들고 싶은\n제품이 있나요?", description: "모바일 앱이나 백엔드, 학습 도구에 관한 아이디어가 있다면 편하게 연락해 주세요.", x: 36, z: 0, accent: "#ff5c8a" },
  ],
  en: [
    { key: "home", index: "00", nav: "Start", eyebrow: "WONCHEOL HAN · MOBILE / BACKEND / PRODUCT", title: "Ideas into\nworking products.", description: "I start with real user problems and design and build mobile apps and secure backends end to end.", x: 0, z: 0, accent: "#ff6b35" },
    { key: "about", index: "01", nav: "About", eyebrow: "ABOUT · PRODUCT ENGINEERING", title: "I design the boundaries\nthat matter first.", description: "I build products with Flutter and Kotlin and define trust boundaries with Spring Boot. Users, safety, and reasons to return come before technology.", x: 12, z: -2, accent: "#ffd166" },
    { key: "work", index: "02", nav: "Work", eyebrow: "SELECTED PRODUCTS · VERIFIED SOURCES", title: "Products carried\nfrom concept to code.", description: "These projects are grounded in working implementations and product definitions. Select one to see its story and actual screen.", x: 24, z: 1.5, accent: "#3dd6a5" },
    { key: "contact", index: "03", nav: "Contact", eyebrow: "CONTACT · LET’S MAKE A SIGNAL", title: "Shall we build\nsomething that works?", description: "I am open to mobile products, safety-first backends, learning tools, and thoughtful new ideas.", x: 36, z: 0, accent: "#ff5c8a" },
  ],
  de: [
    { key: "home", index: "00", nav: "Start", eyebrow: "WONCHEOL HAN · MOBILE / BACKEND / PRODUCT", title: "Aus Ideen werden\nfunktionierende Produkte.", description: "Ich beginne bei echten Problemen von Nutzer:innen und entwickle mobile Apps und sichere Backends durchgängig selbst.", x: 0, z: 0, accent: "#ff6b35" },
    { key: "about", index: "01", nav: "Über mich", eyebrow: "ÜBER MICH · PRODUCT ENGINEERING", title: "Zuerst entwerfe ich\ndie wichtigen Grenzen.", description: "Ich baue Produkte mit Flutter und Kotlin und definiere Vertrauensgrenzen mit Spring Boot. Menschen, Sicherheit und Wiederkehr kommen vor der Technologie.", x: 12, z: -2, accent: "#ffd166" },
    { key: "work", index: "02", nav: "Projekte", eyebrow: "AUSGEWÄHLTE PRODUKTE · GEPRÜFTE QUELLEN", title: "Produkte – von der Idee\nbis zum Code.", description: "Diese Projekte sind durch funktionierende Implementierungen und Produktdefinitionen belegt. Wähle ein Projekt für Beschreibung und echten Screen.", x: 24, z: 1.5, accent: "#3dd6a5" },
    { key: "contact", index: "03", nav: "Kontakt", eyebrow: "KONTAKT · LET’S MAKE A SIGNAL", title: "Bauen wir etwas,\ndas wirklich funktioniert.", description: "Ich bin offen für mobile Produkte, sicherheitsorientierte Backends, Lernwerkzeuge und durchdachte neue Ideen.", x: 36, z: 0, accent: "#ff5c8a" },
  ],
};

const END_SIGNAL_COPY: Record<Locale, { eyebrow: string; title: string; description: string; goalLabel: string; goal: string }> = {
  ko: {
    eyebrow: "NEXT SIGNAL",
    title: "함께, 다음 궤도로",
    description: "좋은 제품은 함께 만들 때 더 멀리 갑니다.",
    goalLabel: "MY GOAL",
    goal: "사용자에게 오래 쓰이는 제품을, 기획부터 배포까지 완성합니다.",
  },
  en: {
    eyebrow: "NEXT SIGNAL",
    title: "Together, into the next orbit",
    description: "Good products travel farther when people build them together.",
    goalLabel: "MY GOAL",
    goal: "Build useful products from the first idea through a thoughtful release.",
  },
  de: {
    eyebrow: "NÄCHSTES SIGNAL",
    title: "Gemeinsam in die nächste Umlaufbahn",
    description: "Gute Produkte kommen weiter, wenn Menschen sie gemeinsam bauen.",
    goalLabel: "MEIN ZIEL",
    goal: "Nützliche Produkte von der ersten Idee bis zum durchdachten Release bauen.",
  },
};

type ProjectLink = { kind: "github" | "notion"; href: string };
type ProjectScreen = {
  image: StaticImageData;
  video?: string;
  label: Record<Locale, string>;
};
type LocalizedCopy = Record<Locale, string>;
type ProjectBrief = {
  role: LocalizedCopy;
  focus: LocalizedCopy;
  evidence: LocalizedCopy;
};
type ProjectFactKey = Exclude<keyof ProjectBrief, "role">;
type Project = {
  key: ProjectKey;
  year: string;
  name: string;
  type: string;
  accent: string;
  screens: ProjectScreen[];
  description: Record<Locale, string>;
  brief: ProjectBrief;
  links: ProjectLink[];
};

const PROJECTS: Project[] = [
  {
    key: "unical",
    year: "LIVE",
    name: "UniCal",
    type: "CAMPUS · FLUTTER",
    accent: "#6664ff",
    screens: [
      { image: unicalScreenshot, label: { ko: "홈 · 오늘의 일정", en: "Home · Today’s schedule", de: "Home · Heutiger Stundenplan" } },
      { image: unicalCommunityScreenshot, label: { ko: "캠퍼스 커뮤니티", en: "Campus community", de: "Campus-Community" } },
      { image: unicalWeekScreenshot, label: { ko: "주간 시간표", en: "Weekly timetable", de: "Wochenstundenplan" } },
      { image: unicalDayScreenshot, label: { ko: "일간 시간표", en: "Daily timetable", de: "Tagesstundenplan" } },
      { image: unicalLoginScreenshot, label: { ko: "대학 인증 로그인", en: "University sign-in", de: "Hochschul-Anmeldung" } },
    ],
    description: {
      ko: "대학 인증을 바탕으로 개인 시간표, 강의 정보와 후기, 학생 커뮤니티, 교내 행사를 한곳에서 이용할 수 있도록 설계한 학생 플랫폼입니다.",
      en: "A student platform connecting personal timetables, course discovery and reviews, student communities, and campus events through university-based verification.",
      de: "Eine Studierendenplattform, die über eine hochschulbasierte Verifizierung persönliche Stundenpläne, Kurssuche und -bewertungen, Campus-Communitys und Veranstaltungen verbindet.",
    },
    brief: {
      role: { ko: "기획 · 화면 설계 · Flutter 개발", en: "Product design · Flutter build", de: "Produktkonzept · Flutter" },
      focus: { ko: "대학 인증 · 시간표 · 학생 커뮤니티", en: "Verified identity connects schedule and community", de: "Verifizierte Identität verbindet Plan und Community" },
      evidence: { ko: "Flutter · 주요 화면 5개 · Notion 문서", en: "5 connected screens · product brief", de: "5 verbundene Screens · Produktdokument" },
    },
    links: [
      { kind: "notion", href: "https://app.notion.com/p/3b2b8ce076a181759c3efe9b3908067c" },
    ],
  },
  {
    key: "deutsch-flow",
    year: "BUILT",
    name: "Deutsch Flow",
    type: "EDTECH · FLUTTER",
    accent: "#ff5c8a",
    screens: [
      { image: deutschFlowScreenshot, label: { ko: "학습 홈", en: "Learning home", de: "Lernübersicht" } },
      { image: deutschFlowWordScreenshot, label: { ko: "단어 상세·발음", en: "Word details & pronunciation", de: "Wortdetails & Aussprache" } },
      { image: deutschFlowLibraryScreenshot, label: { ko: "단어 검색·덱 필터", en: "Word search & deck filters", de: "Wortsuche & Deck-Filter" } },
      { image: deutschFlowPracticeScreenshot, label: { ko: "B1 읽기 연습", en: "B1 reading practice", de: "B1-Leseübung" } },
      { image: deutschFlowArticleScreenshot, label: { ko: "기사 읽기", en: "Article reading", de: "Artikellektüre" } },
      { image: deutschFlowSpeakingScreenshot, label: { ko: "말하기 발음 점검", en: "Speaking check", de: "Sprechübung" } },
      { image: deutschFlowDictionaryScreenshot, label: { ko: "실시간 문맥 사전", en: "Context dictionary", de: "Kontextwörterbuch" } },
    ],
    description: {
      ko: "개인 단어장, 간격 반복 복습, 발음 연습과 실제 독일어 콘텐츠를 한 흐름으로 묶은 학습 앱입니다.",
      en: "A German-learning app combining a personal vocabulary library, spaced repetition, pronunciation coaching, and real-world content in one continuous workflow.",
      de: "Eine Deutschlern-App, die persönliche Vokabelsammlung, Spaced Repetition, Aussprachetraining und authentische Inhalte in einem Lernfluss verbindet.",
    },
    brief: {
      role: { ko: "기획 · 화면 설계 · Flutter 개발", en: "Product design · Flutter build", de: "Produktkonzept · Flutter" },
      focus: { ko: "단어 수집 · 복습 · 발음 · 읽기", en: "From capture to review, speaking, and immersion", de: "Vom Sammeln über Wiederholen bis zur Immersion" },
      evidence: { ko: "Flutter · Drift/SQLite · TTS", en: "Drift/SQLite · TTS · speech recognition", de: "Drift/SQLite · TTS · Spracherkennung" },
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
    accent: "#9c72ff",
    screens: [
      { image: travelbDiscoverScreenshot, video: "projects/travelb-main.mp4", label: { ko: "축제·여행 탐색", en: "Festival discovery", de: "Festival-Entdeckung" } },
      { image: travelbPlanScreenshot, video: "projects/travelb-plan.mp4", label: { ko: "여행 일정 계획", en: "Trip planner", de: "Reiseplanung" } },
      { image: travelbMapScreenshot, video: "projects/travelb-map.mp4", label: { ko: "지도·주변 탐색", en: "Map exploration", de: "Karten-Erkundung" } },
    ],
    description: {
      ko: "Kotlin과 Jetpack Compose로 처음 만든 국내 여행 앱입니다. 여행지와 축제를 찾고, Kakao Map에서 위치를 확인한 뒤 여행 일정을 만들 수 있도록 구현했습니다.",
      en: "My first Kotlin and Jetpack Compose travel app, combining regional and festival discovery, Kakao Map exploration, location search, and trip planning in a modular Android architecture.",
      de: "Meine erste Reise-App mit Kotlin und Jetpack Compose: regionale und Festival-Entdeckung, Kakao-Map-Erkundung, Standortsuche und Reiseplanung in einer modularen Android-Architektur.",
    },
    brief: {
      role: { ko: "앱 구조 설계 · Android 개발", en: "Android architecture · UI build", de: "Android-Architektur · UI-Umsetzung" },
      focus: { ko: "여행지 탐색 · 지도 · 일정 관리", en: "One flow from discovery to map and planning", de: "Ein Flow von Entdeckung über Karte bis Planung" },
      evidence: { ko: "Kotlin · Compose · Kakao Map", en: "Multi-module · Compose · Kakao Map", de: "Multi-Modul · Compose · Kakao Map" },
    },
    links: [
      { kind: "github", href: "https://github.com/naedong/travelB" },
      { kind: "notion", href: "https://app.notion.com/p/359b8ce076a18061ab5ce533688f7263" },
    ],
  },
];

const UI_COPY = {
  ko: {
    loading: "포트폴리오를 불러오는 중", building: "직접 설계하고 개발합니다", sayHello: "연락하기", start: "프로젝트 둘러보기", next: "다음으로",
    brandHome: "처음으로 이동", projectList: "주요 프로젝트", projectOpen: "프로젝트 자세히 보기", social: "소셜 링크", journey: "포트폴리오 구역",
    move: "이동", moveHint: "빛을 움직여\n화면을 둘러보세요", movement: "이동 컨트롤", up: "위로 이동", left: "왼쪽으로 이동", down: "아래로 이동", right: "오른쪽으로 이동",
    close: "닫기", sourceLead: "관련 링크", previousScreen: "이전 화면", nextScreen: "다음 화면", screen: "화면", videoUnsupported: "이 브라우저에서는 영상을 재생할 수 없습니다.",
    contactTitle: "아이디어가 있다면\n편하게 연락해 주세요.", contactIntro: "모바일 앱과 백엔드, 학습 도구에 관한 이야기라면 언제든 환영합니다.",
    copyEmail: "이메일 복사", copied: "복사 완료", openMail: "메일 보내기", viewGithub: "GitHub 보기",
    linkLabels: { github: "GitHub 저장소", notion: "Notion 문서" },
    homeSignals: [
      { label: "PRODUCT", value: "사용자 문제와 제품 설계" },
      { label: "MOBILE", value: "Flutter · Kotlin 앱 개발" },
      { label: "BACKEND", value: "Spring Boot · 인증과 보안" },
    ],
    capabilities: [
      { index: "01", title: "제품 설계", detail: "문제를 정리하고 필요한 기능과 사용 흐름을 설계합니다." },
      { index: "02", title: "모바일 개발", detail: "Flutter와 Kotlin으로 화면과 기능을 직접 구현합니다." },
      { index: "03", title: "백엔드 설계", detail: "Spring Boot로 인증과 데이터 흐름을 안전하게 구성합니다." },
    ],
    briefLabels: { focus: "핵심 기능", evidence: "기술 구성" },
    pageTitle: "한원철 — Product Builder",
  },
  en: {
    loading: "ASSEMBLING THE SPACE", building: "DESIGNED AND BUILT END TO END", sayHello: "CONTACT", start: "START EXPLORING", next: "NEXT ZONE",
    brandHome: "Go to start", projectList: "Selected projects", projectOpen: "View project details", social: "Social links", journey: "Portfolio zones",
    move: "MOVE", moveHint: "Move the light\nand explore each zone", movement: "Movement controls", up: "Move up", left: "Move left", down: "Move down", right: "Move right",
    close: "Close", sourceLead: "Project links", previousScreen: "Previous screen", nextScreen: "Next screen", screen: "App screen", videoUnsupported: "This browser cannot play the video.",
    contactTitle: "Let’s build the next\ngood thing together.", contactIntro: "Reach out about thoughtful ideas, mobile products, or safety-first backends.",
    copyEmail: "Copy email", copied: "Copied", openMail: "Open email", viewGithub: "View GitHub",
    linkLabels: { github: "GitHub repository", notion: "Notion brief" },
    homeSignals: [
      { label: "PRODUCT", value: "Problem to product flow" },
      { label: "MOBILE", value: "Flutter · Kotlin" },
      { label: "BACKEND", value: "Spring Boot · trust boundaries" },
    ],
    capabilities: [
      { index: "01", title: "Product flow", detail: "I connect the problem, the user journey, and the reason to return." },
      { index: "02", title: "Mobile craft", detail: "I build real screens and interactions with Flutter and Kotlin." },
      { index: "03", title: "Safe boundaries", detail: "I define authentication and data boundaries with Spring Boot." },
    ],
    briefLabels: { focus: "Design focus", evidence: "Build evidence" },
    pageTitle: "Woncheol Han — Product Builder",
  },
  de: {
    loading: "RAUM WIRD AUFGEBAUT", building: "END-TO-END ENTWICKELT", sayHello: "KONTAKT", start: "ERKUNDUNG STARTEN", next: "NÄCHSTER BEREICH",
    brandHome: "Zum Start", projectList: "Ausgewählte Projekte", projectOpen: "Projektdetails öffnen", social: "Social Links", journey: "Portfolio-Bereiche",
    move: "BEWEGEN", moveHint: "Bewege das Licht\nund erkunde die Bereiche", movement: "Bewegungssteuerung", up: "Nach oben", left: "Nach links", down: "Nach unten", right: "Nach rechts",
    close: "Schließen", sourceLead: "Projekt-Links", previousScreen: "Vorheriger Screen", nextScreen: "Nächster Screen", screen: "App-Screen", videoUnsupported: "Dieser Browser kann das Video nicht abspielen.",
    contactTitle: "Lass uns gemeinsam\ndas Nächste bauen.", contactIntro: "Schreib mir über durchdachte Ideen, mobile Produkte oder sicherheitsorientierte Backends.",
    copyEmail: "E-Mail kopieren", copied: "Kopiert", openMail: "E-Mail öffnen", viewGithub: "GitHub ansehen",
    linkLabels: { github: "GitHub-Repository", notion: "Notion-Dokument" },
    homeSignals: [
      { label: "PRODUCT", value: "Vom Problem zum Produktfluss" },
      { label: "MOBILE", value: "Flutter · Kotlin" },
      { label: "BACKEND", value: "Spring Boot · Vertrauensgrenzen" },
    ],
    capabilities: [
      { index: "01", title: "Produktfluss", detail: "Ich verbinde Problem, Nutzungspfad und den Grund zurückzukehren." },
      { index: "02", title: "Mobile Umsetzung", detail: "Mit Flutter und Kotlin baue ich echte Screens und Interaktionen." },
      { index: "03", title: "Sichere Grenzen", detail: "Mit Spring Boot definiere ich Authentifizierung und Datengrenzen." },
    ],
    briefLabels: { focus: "Designfokus", evidence: "Umsetzungsbeleg" },
    pageTitle: "Woncheol Han — Product Builder",
  },
} satisfies Record<Locale, {
  loading: string; building: string; sayHello: string; start: string; next: string; brandHome: string; projectList: string; projectOpen: string;
  social: string; journey: string; move: string; moveHint: string; movement: string; up: string; left: string; down: string; right: string;
  close: string; sourceLead: string; previousScreen: string; nextScreen: string; screen: string; videoUnsupported: string;
  contactTitle: string; contactIntro: string; copyEmail: string; copied: string; openMail: string; viewGithub: string;
  linkLabels: Record<ProjectLink["kind"], string>;
  homeSignals: Array<{ label: string; value: string }>;
  capabilities: Array<{ index: string; title: string; detail: string }>;
  briefLabels: Record<ProjectFactKey, string>;
  pageTitle: string;
}>;

type UiCopy = (typeof UI_COPY)[Locale];

function ZoneContent({ zone, copy, onExplore, onSelectProject, onContact }: { zone: Zone; copy: UiCopy; onExplore: () => void; onSelectProject: (project: Project) => void; onContact: () => void }) {
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

  if (zone.key === "contact") {
    return (
      <div className="zone-extra contact-actions">
        <button className="primary-link" type="button" onClick={onContact} aria-haspopup="dialog">
          gim21041@gmail.com <span aria-hidden="true">↗</span>
        </button>
        <div className="social-row" aria-label={copy.social}>
          <a href="https://github.com/naedong" target="_blank" rel="noreferrer">GITHUB ↗</a>
        </div>
      </div>
    );
  }

  if (zone.key === "home") {
    return (
      <div className="zone-extra home-evidence">
        <div className="home-signal-grid" aria-label="Product builder summary">
          {copy.homeSignals.map((signal) => (
            <div className="home-signal" key={signal.label}>
              <span>{signal.label}</span>
              <strong>{signal.value}</strong>
            </div>
          ))}
        </div>
        <button className="primary-link" type="button" onClick={onExplore}>
          {copy.start}<span aria-hidden="true">→</span>
        </button>
      </div>
    );
  }

  if (zone.key === "about") {
    return (
      <div className="zone-extra about-evidence">
        <div className="capability-grid">
          {copy.capabilities.map((capability) => (
            <div className="capability-card" key={capability.index}>
              <span>{capability.index}</span>
              <strong>{capability.title}</strong>
              <p>{capability.detail}</p>
            </div>
          ))}
        </div>
        <button className="secondary-link" type="button" onClick={onExplore}>
          {copy.next}<span aria-hidden="true">→</span>
        </button>
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
  const movementImpulseRef = useRef({ x: 0, z: 0 });
  const destinationRef = useRef<{ x: number; z: number } | null>(null);
  const playerPositionRef = useRef({ x: 0, z: 2.5 });
  const dialogOpenRef = useRef(false);
  const projectDialogRef = useRef<HTMLElement>(null);
  const contactDialogRef = useRef<HTMLElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const [locale, setLocale] = useState<Locale>("ko");
  const [activeKey, setActiveKey] = useState<ZoneKey>("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  const zones = ZONES[locale];
  const copy = UI_COPY[locale];
  const endSignal = END_SIGNAL_COPY[locale];
  const activeZone = zones.find((zone) => zone.key === activeKey) ?? zones[0];
  const activeProjectScreen = selectedProject?.screens[selectedScreenIndex] ?? selectedProject?.screens[0];

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
      if (control === "d" || control === "arrowright") movementImpulseRef.current.x += 0.075;
      if (control === "a" || control === "arrowleft") movementImpulseRef.current.x -= 0.075;
      if (control === "s" || control === "arrowdown") movementImpulseRef.current.z += 0.065;
      if (control === "w" || control === "arrowup") movementImpulseRef.current.z -= 0.065;
    } else {
      pressedRef.current.delete(control);
    }
  }, []);

  const openProject = useCallback((project: Project) => {
    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setContactOpen(false);
    setSelectedScreenIndex(0);
    setSelectedProject(project);
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
    setSelectedScreenIndex(0);
  }, []);

  const openContact = useCallback(() => {
    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelectedProject(null);
    setEmailCopied(false);
    setContactOpen(true);
  }, []);

  const closeContact = useCallback(() => {
    setContactOpen(false);
    setEmailCopied(false);
  }, []);

  const copyEmailAddress = useCallback(async () => {
    const email = "gim21041@gmail.com";
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = email;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2200);
    } catch {
      setEmailCopied(false);
    }
  }, []);

  const moveProjectScreen = useCallback((direction: -1 | 1) => {
    setSelectedScreenIndex((current) => {
      const screenCount = selectedProject?.screens.length ?? 0;
      if (screenCount < 2) return 0;
      return (current + direction + screenCount) % screenCount;
    });
  }, [selectedProject]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = copy.pageTitle;
  }, [copy.pageTitle, locale]);

  useEffect(() => {
    if (!selectedProject) return;
    const dialog = projectDialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.querySelector<HTMLButtonElement>(".project-dialog-close")?.focus();

    const handleDialogKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProject();
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveProjectScreen(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveProjectScreen(1);
      }
      if (event.key === "Tab" && dialog) {
        const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleDialogKey);
    return () => {
      window.removeEventListener("keydown", handleDialogKey);
      document.body.style.overflow = previousOverflow;
      requestAnimationFrame(() => previouslyFocusedRef.current?.focus());
    };
  }, [closeProject, moveProjectScreen, selectedProject]);

  useEffect(() => {
    if (!contactOpen) return;
    const dialog = contactDialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.querySelector<HTMLButtonElement>(".contact-dialog-close")?.focus();

    const handleContactKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeContact();
      if (event.key === "Tab" && dialog) {
        const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleContactKey);
    return () => {
      window.removeEventListener("keydown", handleContactKey);
      document.body.style.overflow = previousOverflow;
      requestAnimationFrame(() => previouslyFocusedRef.current?.focus());
    };
  }, [closeContact, contactOpen]);

  useEffect(() => {
    dialogOpenRef.current = Boolean(selectedProject || contactOpen);
    if (selectedProject || contactOpen) pressedRef.current.clear();
  }, [contactOpen, selectedProject]);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    const readinessFallback = window.setTimeout(() => {
      if (!disposed) setReady(true);
    }, 2600);

    async function startScene() {
      const THREE = await import("three");
      await document.fonts.ready;
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
      for (let index = -2; index < 40; index += 1.5) {
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
        context.font = '700 34px "Pretendard Variable", Arial, sans-serif';
        context.fillStyle = zone.accent;
        context.fillText(zone.index, 30, 65);
        context.font = '750 72px "Pretendard Variable", Arial, sans-serif';
        context.fillStyle = "#f0f6ef";
        context.fillText(zone.nav.toUpperCase(), 30, 145);
        const texture = new THREE.CanvasTexture(labelCanvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
        sprite.scale.set(6.4, 1.6, 1);
        return sprite;
      };

      const makeEndLabel = () => {
        const labelCanvas = document.createElement("canvas");
        labelCanvas.width = 1200;
        labelCanvas.height = 420;
        const context = labelCanvas.getContext("2d");
        if (!context) return null;

        context.clearRect(0, 0, labelCanvas.width, labelCanvas.height);
        context.textAlign = "center";
        context.fillStyle = "#ff84a6";
        context.font = '700 30px "Pretendard Variable", Arial, sans-serif';
        context.fillText(endSignal.eyebrow, 600, 66);

        const titleSize = endSignal.title.length > 28 ? 52 : 68;
        context.fillStyle = "#f0f6ef";
        context.font = `750 ${titleSize}px "Pretendard Variable", Arial, sans-serif`;
        context.fillText(endSignal.title, 600, 172);

        context.fillStyle = "#a9b8af";
        context.font = '500 27px "Pretendard Variable", Arial, sans-serif';
        context.fillText(endSignal.description, 600, 245);

        context.fillStyle = "#ff84a6";
        context.font = '700 20px "Pretendard Variable", Arial, sans-serif';
        context.fillText(endSignal.goalLabel, 600, 305);

        context.fillStyle = "#d9e3dc";
        context.font = '620 27px "Pretendard Variable", Arial, sans-serif';
        context.fillText(endSignal.goal, 600, 350, 1080);

        const texture = new THREE.CanvasTexture(labelCanvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0, depthWrite: false }));
        sprite.scale.set(9.2, 3.22, 1);
        return sprite;
      };

      const zoneGroups: Array<InstanceType<typeof THREE.Group>> = [];
      const zoneLabelSprites: Array<InstanceType<typeof THREE.Sprite>> = [];
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
          zoneLabelSprites.push(label);
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
        }
      });

      const signalCurves = [
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(38.8, -0.43, -0.15),
          new THREE.Vector3(43.1, -0.32, 1.35),
          new THREE.Vector3(47.2, -0.2, 1.55),
          new THREE.Vector3(49.7, 0.15, 2.2),
        ]),
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(38.8, -0.43, 0.45),
          new THREE.Vector3(43.2, -0.32, -1.25),
          new THREE.Vector3(47.2, -0.2, 0.75),
          new THREE.Vector3(49.7, 0.15, 2.2),
        ]),
      ];
      const signalColors = [0xff5c8a, 0x3dd6a5];
      const signalPathDots: Array<InstanceType<typeof THREE.Mesh>> = [];
      signalCurves.forEach((curve, curveIndex) => {
        const path = new THREE.Mesh(
          new THREE.TubeGeometry(curve, 72, 0.025, 6, false),
          new THREE.MeshBasicMaterial({ color: signalColors[curveIndex], transparent: true, opacity: 0.62 })
        );
        world.add(path);

        for (let pointIndex = 1; pointIndex < 12; pointIndex += 1) {
          const point = curve.getPoint(pointIndex / 12);
          const signalDot = new THREE.Mesh(
            new THREE.SphereGeometry(pointIndex > 9 ? 0.09 : 0.065, 10, 8),
            new THREE.MeshBasicMaterial({ color: signalColors[curveIndex], transparent: true, opacity: 0.9 })
          );
          signalDot.position.copy(point);
          signalDot.userData.pulseOffset = pointIndex * 0.45 + curveIndex;
          signalPathDots.push(signalDot);
          world.add(signalDot);
        }
      });

      const terminus = new THREE.Group();
      terminus.position.set(49.7, 0, 2.2);
      world.add(terminus);

      const terminusBase = new THREE.Mesh(
        new THREE.CylinderGeometry(3.2, 3.85, 0.48, 12),
        new THREE.MeshStandardMaterial({ color: 0x0d2019, roughness: 0.68, metalness: 0.3 })
      );
      terminusBase.position.y = -0.4;
      terminusBase.castShadow = true;
      terminusBase.receiveShadow = true;
      terminus.add(terminusBase);

      const terminusEdge = new THREE.Mesh(
        new THREE.TorusGeometry(3.24, 0.04, 8, 120),
        new THREE.MeshBasicMaterial({ color: 0xff5c8a, transparent: true, opacity: 0.68 })
      );
      terminusEdge.position.y = -0.14;
      terminusEdge.rotation.x = Math.PI / 2;
      terminus.add(terminusEdge);

      const gateway = new THREE.Group();
      gateway.position.y = 2.15;
      gateway.rotation.y = -0.28;
      terminus.add(gateway);

      const outerGate = new THREE.Mesh(
        new THREE.TorusGeometry(2.18, 0.075, 12, 128),
        new THREE.MeshStandardMaterial({ color: 0xff7ba1, emissive: 0xff315f, emissiveIntensity: 1.2, roughness: 0.22, metalness: 0.38 })
      );
      outerGate.castShadow = true;
      gateway.add(outerGate);

      const innerGate = new THREE.Mesh(
        new THREE.TorusGeometry(1.58, 0.045, 10, 112),
        new THREE.MeshBasicMaterial({ color: 0x7fffd4, transparent: true, opacity: 0.82 })
      );
      innerGate.rotation.x = 0.2;
      innerGate.rotation.y = -0.12;
      gateway.add(innerGate);

      const signalCore = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.22, 1),
        new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xff7ba1, emissiveIntensity: 2.8, roughness: 0.16 })
      );
      gateway.add(signalCore);

      const terminalLight = new THREE.PointLight(0xff5c8a, 6.5, 12, 2);
      gateway.add(terminalLight);
      const companionLight = new THREE.PointLight(0x3dd6a5, 3.2, 9, 2);
      companionLight.position.set(0, -0.4, 0.8);
      gateway.add(companionLight);

      const signalMotes: Array<InstanceType<typeof THREE.Mesh>> = [];
      for (let moteIndex = 0; moteIndex < 18; moteIndex += 1) {
        const mote = new THREE.Mesh(
          new THREE.OctahedronGeometry(moteIndex % 4 === 0 ? 0.085 : 0.05, 0),
          new THREE.MeshBasicMaterial({ color: moteIndex % 2 ? 0xff8fab : 0x7fffd4, transparent: true, opacity: 0.82 })
        );
        mote.userData.phase = (moteIndex / 18) * Math.PI * 2;
        signalMotes.push(mote);
        gateway.add(mote);
      }

      const endLabel = makeEndLabel();
      if (endLabel) {
        endLabel.position.set(0, 4.75, -0.35);
        terminus.add(endLabel);
      }

      const rover = new THREE.Group();
      rover.position.set(playerPositionRef.current.x, 0.65, playerPositionRef.current.z);
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
      const player = { x: playerPositionRef.current.x, z: playerPositionRef.current.z, vx: 0, vz: 0 };
      const pointer = { x: 0, y: 0 };
      let lastZone: ZoneKey = "home";
      let animationFrame = 0;

      const onPointerMove = (event: PointerEvent) => {
        pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
        pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
      };

      const onKey = (event: KeyboardEvent, down: boolean) => {
        if (dialogOpenRef.current) return;
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

      const usesCompactScene = () => host.clientWidth <= 1600 || host.clientHeight <= 800;
      let compactScene = usesCompactScene();
      const onResize = () => {
        if (!host) return;
        compactScene = usesCompactScene();
        camera.aspect = host.clientWidth / host.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, compactScene ? 1.35 : 1.8));
        renderer.setSize(host.clientWidth, host.clientHeight);
        zoneLabelSprites.forEach((label) => {
          label.visible = !compactScene;
        });
      };
      window.addEventListener("resize", onResize);
      onResize();

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

        player.vx += movementImpulseRef.current.x;
        player.vz += movementImpulseRef.current.z;
        movementImpulseRef.current = { x: 0, z: 0 };

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
        player.x = THREE.MathUtils.clamp(player.x + player.vx * delta * 60, -2.5, 48.9);
        player.z = THREE.MathUtils.clamp(player.z + player.vz * delta * 60, -5.2, 5.2);
        playerPositionRef.current = { x: player.x, z: player.z };

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

        outerGate.rotation.z = reducedMotion ? 0 : elapsed * 0.12;
        innerGate.rotation.z = reducedMotion ? 0.18 : -elapsed * 0.2;
        const corePulse = reducedMotion ? 1 : 1 + Math.sin(elapsed * 2.8) * 0.2;
        signalCore.scale.setScalar(corePulse);
        gateway.position.y = 2.15 + (reducedMotion ? 0 : Math.sin(elapsed * 0.7) * 0.06);
        signalMotes.forEach((mote, moteIndex) => {
          const angle = mote.userData.phase + (reducedMotion ? 0 : elapsed * (0.2 + (moteIndex % 3) * 0.035));
          const radius = 2.48 + (moteIndex % 4) * 0.16;
          mote.position.set(
            Math.sin(angle * 0.7) * 0.32,
            Math.sin(angle) * radius,
            Math.cos(angle) * radius
          );
        });
        signalPathDots.forEach((dot) => {
          const pulse = reducedMotion ? 1 : 0.82 + Math.sin(elapsed * 2.4 - dot.userData.pulseOffset) * 0.28;
          dot.scale.setScalar(Math.max(0.42, pulse));
        });
        if (endLabel) {
          const reveal = THREE.MathUtils.smoothstep(player.x, 38.5, 44);
          endLabel.visible = !compactScene && reveal > 0.01;
          endLabel.material.opacity = reveal * 0.94;
        }

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
      window.clearTimeout(readinessFallback);
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

    startScene().catch((error) => {
      console.error("The 3D scene could not be initialized.", error);
      if (!disposed) setReady(true);
    });
    return () => {
      disposed = true;
      window.clearTimeout(readinessFallback);
      cleanup();
    };
  }, [endSignal, setControl, zones]);

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
          <div className="language-switch" aria-label="언어 / Language / Sprache">
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
          <button className="say-hi" type="button" onClick={openContact} aria-haspopup="dialog" aria-expanded={contactOpen}>
            {copy.sayHello} <span aria-hidden="true">↗</span>
          </button>
        </div>
      </header>

      <section className="content-panel" data-zone={activeZone.key} key={`${activeZone.key}-${locale}`} aria-live="polite">
        <div className="zone-index"><span>{activeZone.index}</span><i /></div>
        <p className="eyebrow">{activeZone.eyebrow}</p>
        <h1>{activeZone.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
        <p className="zone-description">{activeZone.description}</p>
        <ZoneContent zone={activeZone} copy={copy} onExplore={goNext} onSelectProject={openProject} onContact={openContact} />
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

      {contactOpen && (
        <div
          className="contact-dialog-backdrop"
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) closeContact();
          }}
        >
          <article
            ref={contactDialogRef}
            className="contact-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-dialog-title"
            aria-describedby="contact-dialog-description"
          >
            <div className="contact-dialog-visual" aria-hidden="true">
              <span className="contact-orbit contact-orbit-one" />
              <span className="contact-orbit contact-orbit-two" />
              <span className="contact-orbit-core" />
            </div>
            <button className="contact-dialog-close" type="button" onClick={closeContact} aria-label={copy.close}>
              <span aria-hidden="true">×</span>
            </button>
            <div className="contact-dialog-copy">
              <span className="contact-dialog-kicker"><i /> CONTACT CHANNEL · EUROPE / BERLIN</span>
              <h2 id="contact-dialog-title">
                {copy.contactTitle.split("\n").map((line) => <span key={line}>{line}</span>)}
              </h2>
              <p id="contact-dialog-description">{copy.contactIntro}</p>
            </div>
            <div className="contact-email-card">
              <div>
                <span>EMAIL</span>
                <strong>gim21041@gmail.com</strong>
              </div>
              <button type="button" onClick={copyEmailAddress} aria-live="polite" className={emailCopied ? "is-copied" : ""}>
                {emailCopied ? copy.copied : copy.copyEmail}
              </button>
            </div>
            <nav className="contact-dialog-actions" aria-label={copy.social}>
              <a className="contact-action-primary" href="mailto:gim21041@gmail.com">
                {copy.openMail} <span aria-hidden="true">↗</span>
              </a>
              <a href="https://github.com/naedong" target="_blank" rel="noreferrer">
                {copy.viewGithub} <span aria-hidden="true">↗</span>
              </a>
            </nav>
          </article>
        </div>
      )}

      {selectedProject && (
        <div
          className="project-dialog-backdrop"
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) closeProject();
          }}
        >
          <article
            ref={projectDialogRef}
            className="project-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-title-${selectedProject.key}`}
            aria-describedby={`project-description-${selectedProject.key}`}
            style={{ "--project-accent": selectedProject.accent } as CSSProperties}
          >
            <button className="project-dialog-close" type="button" onClick={closeProject} aria-label={copy.close}>
              <span aria-hidden="true">×</span>
            </button>
            <header className="project-dialog-header">
              <div>
                <span className="project-dialog-kicker">{selectedProject.year} · {selectedProject.type}</span>
                <h2 id={`project-title-${selectedProject.key}`}>{selectedProject.name}</h2>
              </div>
              <span className="project-dialog-count" aria-live="polite">
                {String(selectedScreenIndex + 1).padStart(2, "0")} / {String(selectedProject.screens.length).padStart(2, "0")}
              </span>
            </header>

            <div className="project-dialog-stage">
              <div className="project-stage-architecture" aria-hidden="true">
                <span className="project-stage-beam project-stage-beam-left" />
                <span className="project-stage-beam project-stage-beam-right" />
                <span className="project-stage-marquee">SELECTED PRODUCT · WONCHEOL HAN</span>
                <span className="project-stage-floor" />
              </div>

              {selectedProject.screens.length > 1 && (
                <button className="project-screen-nav project-screen-nav-prev" type="button" onClick={() => moveProjectScreen(-1)} aria-label={copy.previousScreen}>
                  <span aria-hidden="true">←</span><small>PREV</small>
                </button>
              )}

              {activeProjectScreen && (
                <div className="project-screen-display">
                  <div className="project-screen-pedestal">
                    <div className="project-screen-frame" key={`${selectedProject.key}-${selectedScreenIndex}`}>
                      {activeProjectScreen.video ? (
                        <video
                          src={activeProjectScreen.video}
                          poster={activeProjectScreen.image.src}
                          controls
                          playsInline
                          preload="metadata"
                          aria-label={`${selectedProject.name} — ${activeProjectScreen.label[locale]}`}
                        >
                          <track kind="captions" src="projects/travelb-captions.vtt" srcLang="en" label="Interface demo" />
                          {copy.videoUnsupported}
                        </video>
                      ) : (
                        <Image
                          src={activeProjectScreen.image}
                          alt={`${selectedProject.name} — ${activeProjectScreen.label[locale]}`}
                          fill
                          sizes="(max-width: 720px) 68vw, 390px"
                          priority
                        />
                      )}
                    </div>
                  </div>
                  <div className="project-screen-caption">
                    <span>{activeProjectScreen.label[locale]}</span>
                    <span>{copy.screen} {selectedScreenIndex + 1}</span>
                  </div>
                </div>
              )}

              {selectedProject.screens.length > 1 && (
                <button className="project-screen-nav project-screen-nav-next" type="button" onClick={() => moveProjectScreen(1)} aria-label={copy.nextScreen}>
                  <small>NEXT</small><span aria-hidden="true">→</span>
                </button>
              )}

              {selectedProject.screens.length > 1 && (
                <div className="project-screen-selector" role="group" aria-label={copy.screen}>
                  {selectedProject.screens.map((screen, index) => (
                    <button
                      className={index === selectedScreenIndex ? "is-active" : ""}
                      type="button"
                      key={screen.label.en}
                      onClick={() => setSelectedScreenIndex(index)}
                      aria-label={screen.label[locale]}
                      aria-pressed={index === selectedScreenIndex}
                    />
                  ))}
                </div>
              )}
            </div>

            <footer className="project-dialog-copy">
              <div className="project-copy-main">
                <div className="project-contribution">
                  {selectedProject.brief.role[locale]}
                </div>
                <p id={`project-description-${selectedProject.key}`}>
                  {selectedProject.description[locale]}
                </p>
                <dl className="project-case-facts">
                  {(Object.keys(copy.briefLabels) as ProjectFactKey[]).map((key) => (
                    <div key={key}>
                      <dt>{copy.briefLabels[key]}</dt>
                      <dd>{selectedProject.brief[key][locale]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <nav className="project-source-links" aria-label={copy.sourceLead}>
                {selectedProject.links.map((link) => (
                  <a href={link.href} target="_blank" rel="noreferrer" key={link.kind}>
                    {copy.linkLabels[link.kind]} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </nav>
            </footer>
          </article>
        </div>
      )}

      <footer className="footer-note">
        <span>© 2026 WONCHEOL HAN</span>
        <span>PRODUCT · ENGINEERING · MOBILE</span>
      </footer>
    </main>
  );
}
