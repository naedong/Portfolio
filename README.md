# Woncheol Han — Product Builder

한원철의 인터랙티브 3D 포트폴리오입니다. 빛나는 탐사체를 움직이며 소개, 실제 프로젝트와 연락처를 탐험할 수 있습니다.

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
