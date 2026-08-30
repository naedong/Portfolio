# Woncheol Han — Product Builder

한원철의 인터랙티브 3D 포트폴리오입니다. 빛나는 탐사체를 움직이며 소개, 실제 프로젝트와 연락처를 탐험할 수 있습니다.

데스크톱에서는 3D 여정을 제공하고, 휴대폰과 태블릿에서는 같은 콘텐츠를 가벼운 정적 배경과 하단 내비게이션으로 즉시 탐색할 수 있습니다. 프로젝트 화면은 화살표와 스와이프를 모두 지원합니다.

첫 화면의 `Building now` 카드에서 현재 개발 중인 UniCal을 바로 열 수 있습니다. 소개 화면에는 현재·다음 목표와 작업 방식을, 각 프로젝트 상세 화면에는 문제·접근·결과를 담아 화면 모음이 아니라 제품 사례로 읽히도록 구성했습니다.

## Live

[naedong.github.io/Portfolio](https://naedong.github.io/Portfolio/)

## Featured projects

- [UniCal](https://github.com/naedong/unical) — 대학 인증 기반 시간표·강의·커뮤니티 플랫폼
- [Deutsch Flow](https://github.com/naedong/vocabapp) — 간격 반복, 발음 코칭과 실전 콘텐츠를 연결한 독일어 학습 앱
- [TravelB](https://github.com/naedong/travelB) — Kotlin과 Jetpack Compose로 만든 모듈형 국내 여행 앱

## Local development

Node.js 22.13 이상이 필요합니다.

```bash
npm ci
npm run dev
```

프로덕션 정적 빌드는 다음 명령으로 확인할 수 있습니다.

```bash
npm run build
```

## Deployment

`main` 브랜치에 변경사항이 병합되면 GitHub Actions가 Next.js 프로젝트를 정적 사이트로 빌드하고 GitHub Pages에 자동 배포합니다. 소스 저장소에는 수동으로 작성한 `index.html`이 없으며, 배포 산출물에만 빌드 과정에서 생성됩니다.

## Security

의존성 취약점, 빌드, 린트는 pull request마다 자동 검사됩니다. GitHub Actions는 검증된 커밋 SHA로 고정되어 있으며 Dependabot이 npm 패키지와 Actions 업데이트를 확인합니다. 취약점 제보 방법은 [SECURITY.md](SECURITY.md)를 참고해 주세요.
