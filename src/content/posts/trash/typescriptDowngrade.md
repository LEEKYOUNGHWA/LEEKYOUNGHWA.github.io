---
title: "typeScript downgrade"
section: trash
---

```cmd

=============

WARNING: You are currently running a version of TypeScript which is not officially supported by @typescript-eslint/typescript-estree.

You may find that it works just fine, or you may not.

SUPPORTED TYPESCRIPT VERSIONS: >=3.3.1 <4.8.0

YOUR TYPESCRIPT VERSION: 4.9.5

Please only submit bug reports when using the officially supported version.

=============

```

```cmd
npm remove typescript
npm install typescript@~4.4.3 --save-dev
```

[타입스크립트 다운그레이드](https://zetawiki.com/wiki/TypeScript_%EB%8B%A4%EC%9A%B4%EA%B7%B8%EB%A0%88%EC%9D%B4%EB%93%9C)


## Powershell 오류 발생시

[Powershell 파워쉘 실행정책 - Execution Policy](https://m.blog.naver.com/vanstraat/221732533202)

powershell 관리자 권한으로 실행

```cmd
Set-ExecutionPolicy -Scope CurrentUser

cmdlet Set-ExecutionPolicy(명령 파이프라인 위치 1)
다음 매개 변수에 대한 값을 제공하십시오.
ExecutionPolicy: RemoteSigned

실행 규칙 변경
실행 정책은 신뢰하지 않는 스크립트로부터 사용자를 보호합니다. 실행 정책을 변경하면 about_Execution_Policies 도움말
항목(https://go.microsoft.com/fwlink/?LinkID=135170)에 설명된 보안 위험에 노출될 수 있습니다. 실행 정책을
변경하시겠습니까?
[Y] 예(Y)  [A] 모두 예(A)  [N] 아니요(N)  [L] 모두 아니요(L)  [S] 일시 중단(S)  [?] 도움말 (기본값은 "N"): y
```

## 타입스크립트 버전 확인

```cmd
PS C:\HR\registration-ui> tsc -v
Version 5.3.3
```


# error TS1005

#### Error: node_modules/@types/lodash/common/object.d.ts:1026:46 - error TS1005: '?' expected.

[Got failed on version 4.17.6](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/69932)

```cmd
npm uninstall @types/lodash
npm install @types/lodash@4.17.5
```
