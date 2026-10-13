---
title: "카프카 실전 프로젝트"
section: trash
---

## 1. 로컬 하둡, 엘라스틱 서치, 키바나 설치

1. wsl 실행
2. Homebrew 설치

- [curl: (60) SSL certificate problem: self signed certificate in certificate chain](https://gimys.tistory.com/16)

```sh
echo insecure >> ~/.curlrc
# --insecure 추가
HOMEBREW_CURLRC=1
export HOMEBREW_CURLRC

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

// 환경변수 등록
test -d ~/.linuxbrew && eval $(~/.linuxbrew/bin/brew shellenv)
test -d /home/linuxbrew/.linuxbrew && eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)
test -r ~/.bash_profile && echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.bash_profile
echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.profile

brew # 설치확인
```

3. 로컬 하둡, 엘라스틱서치, 키바나 설치
```sh
# brew install hadoop elasticsearch kibana 안됨
brew tap elastic/tap
brew install elastic/tap/elasticsearch-full

brew info hadoop # 하둡 정보 확인
cd /home/linuxbrew/.linuxbrew/Cellar/hadoop/3.4.0 # 확인한 정보 접속
cd libexec/etc/hadoop
sudo vi core-site.xml
```
`core-site.xml`
```
<configuration>
        <property>
                <name>fs.defaultFS</name>
                <value>hdfs://localhost:9000</value>
        </property>
</configuration>
```
