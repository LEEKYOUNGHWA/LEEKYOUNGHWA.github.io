# 가난한자의 로컬 AI 구축

## 1. 돈이없다

- **한정된 자원 최적화**: GPU가 없는 i5-1245U 노트북 환경에서 32GB RAM을 최대한 활용하기 위해 CPU 연산에 최적화된 `llama.cpp`와 압축 모델인 `GGUF`를 선택.
- **데이터 보안**: 외부 클라우드 API(ChatGPT 등)를 쓰지 않고 로컬에서만 데이터를 처리하므로, 기업의 민감한 제안서 내용이 외부로 유출될 걱정이 없음.
- **성능과 비용**: 추가 하드웨어 구매 없이 기존 장비로 `pgvector`와 결합하여 고성능 RAG(검색 증강 생성) 시스템 구축.

## 2. 핵심 개념 정리

- **llama.cpp**: C++ 기반의 가벼운 LLM 구동 엔진. CPU에서도 AI가 빠르게 돌게 해줌.
- **GGUF 파일**: 대형 AI 모델을 일반 PC용으로 다이어트(양자화)시킨 단일 모델 파일.
- **pgvector**: PostgreSQL 내에 벡터 데이터를 저장하여 유사한 과거 제안서 내용을 광속으로 찾아주는 도구.

---

## 2. 설치 및 환경 구성 (1분 컷)

### STEP 1: 바이너리 다운로드

1. [llama.cpp 릴리즈 페이지](https://github.com/ggerganov/llama.cpp/releases) 접속.
2. `Windows x64 (CPU)` 다운로드 및 압축 해제. 귀찮으니까 경로는 C 바로 아래로 할게용.
3. [Hugging Face - Llama-3.1-8B-Instruct-GGUF](https://huggingface.co/lmstudio-community/Meta-Llama-3.1-8B-Instruct-GGUF/tree/main) 접속.
4. 'Llama-3.1-8B'의 GGUF 버전 다운 (지피티가 선정해주었음)
   > 목록에서 **Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf**라는 이름을 찾으세요. (비슷한 이름이 많으니 주의!)
   > 왜 이 파일인가요?: 32GB RAM에서 속도와 품질의 균형이 가장 완벽한 모델입니다.
   > 파일 이름 옆에 있는 화살표 모양 아이콘(⬇️) 또는 LFS 버튼 옆의 다운로드 아이콘을 클릭합니다.
   > 약 4.92GB의 파일이 다운로드됩니다.

### STEP 2: 폴더 구조 잡기

프로젝트 루트 폴더를 하나 만들고 아래와 같이 구성합니다.
(※ `models` 폴더는 직접 새로 만들어야 합니다.)

```
C:\llama-b7951-bin-win-cpu-x64\
├── llama-server.exe (서버 실행 파일)
├── ... (기타 dll 파일들)
└── models\ (새 폴더 생성)
    └── Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf (다운로드한 모델 파일)
```

## 4. AI 서버 실행 및 샘플 테스트

서버 실행 (Spring Boot 연동용)
터미널(PowerShell)에서 아래 명령어를 입력합니다.

PowerShell

```sh
./llama-server.exe -m models/Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf -t 4 --port 8082 --embedding
```

웹 브라우저에서 `localhost:8082`이 뜨면 성공!

샘플 테스트 (제안서 초안 작성 예시)
서버가 켜진 상태에서 http://localhost:8082 접속 후 채팅창에 입력

질문: "공공기관 클라우드 전환 사업을 위한 제안서의 '기대효과' 부분을 3가지 항목으로 나누어 전문적인 용어를 섞어서 작성해줘."
