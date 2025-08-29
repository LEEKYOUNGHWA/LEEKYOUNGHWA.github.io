웹 서버 도메인 & HTTPS 설정 최종 정리
이 문서는 api.leekyounghwa.com 도메인을 오라클 클라우드 인스턴스에 연결하고, Nginx 리버스 프록시 및 HTTPS를 적용하는 과정을 요약한 것입니다.

1단계: 도메인 DNS 설정 (A 레코드)
도메인을 구매한 사이트(가비아, GoDaddy 등)의 DNS 관리 페이지에서 아래와 같이 A 레코드를 설정합니다.

호스트(또는 이름): api

유형: A

값(IP 주소): 158.180.66.250 (오라클 클라우드 인스턴스의 공용 IP)

2단계: 서버 방화벽 설정
오라클 클라우드와 인스턴스 자체 방화벽에서 외부 접속을 허용합니다.

2-1. 오라클 클라우드 방화벽 (Security List)
80번 포트 (HTTP):

소스 CIDR: 0.0.0.0/0

IP 프로토콜: TCP

대상 포트 범위: 80

443번 포트 (HTTPS):

소스 CIDR: 0.0.0.0/0

IP 프로토콜: TCP

대상 포트 범위: 443

2-2. 인스턴스 내부 방화벽 (FirewallD)
이전에 설정했던 포트 포워딩 규칙을 제거하고, 방화벽을 재설정합니다.

Bash

# FirewallD 서비스가 실행 중인지 확인하고, 실행 중이 아니라면 시작
sudo systemctl status firewalld
sudo systemctl start firewalld
sudo systemctl enable firewalld

# 기존 포트 포워딩 규칙 제거 (80 -> 8787)
sudo firewall-cmd --zone=public --remove-forward-port=port=80:proto=tcp:toport=8787 --permanent

# 방화벽 설정 다시 불러오기
sudo firewall-cmd --reload
3단계: Nginx 설치 및 리버스 프록시 설정
SSH로 인스턴스에 접속하여 Nginx를 설치하고, 80번 포트로 들어온 요청을 8080 포트로 전달하도록 설정합니다.

Bash

# Nginx 설치
sudo apt update
sudo apt install nginx

# Nginx 설정 파일 생성 및 편집
sudo nano /etc/nginx/sites-available/api.leekyounghwa.com
파일에 아래 내용 붙여넣기 (Ctrl + X, Y, Enter로 저장)

Nginx

server {
    listen 80;
    listen [::]:80;
    server_name api.leekyounghwa.com www.api.leekyounghwa.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
Bash

# 설정 파일 활성화 및 Nginx 재시작
sudo ln -s /etc/nginx/sites-available/api.leekyounghwa.com /etc/nginx/sites-enabled/
sudo unlink /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
4단계: HTTPS(SSL) 적용
Certbot을 사용해 무료 SSL 인증서를 발급받고 HTTPS를 적용합니다.

Bash

# Certbot 설치
sudo apt install certbot python3-certbot-nginx

# Certbot 실행 (자동으로 Nginx 설정 변경 및 재시작)
sudo certbot --nginx -d api.leekyounghwa.com
이메일 주소 입력

약관 동의

HTTPS 리디렉션 옵션 선택 (보통 2: Redirect 선택)

최종 확인
모든 과정이 완료되면, 이제 포트 번호 없이 https://api.leekyounghwa.com/swagger-ui/index.html로 접속할 수 있습니다. http로 접속해도 https로 자동 리디렉션됩니다.