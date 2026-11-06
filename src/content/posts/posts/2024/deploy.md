---
title: "Flask zappa 배포"
section: study
lastUpdated: "2024/11/04 17:29:00"
subTitle: "onBoarding"
image: "https://img.icons8.com/?size=512&id=TtXEs5SeYLG8&format=png"
tags: ["flask"]
---

### virtualenv 설치 (온보딩 배포)
```sh
python3 -V # 버전 확인..
sudo apt-get update
sudo apt install python3-pip
python3 -m pip config set global.break-system-packages true
python3 -m pip install virtualenv
# 소스 clone
cd /mnt/c/study/flask/[폴더명] # wsl에서 C드라이브 접근
# virtualenv venv # 가상환경 생성 파이썬 버전 오류 나서 3.12로 다시 설치하고 다시 생성함 라인 17 참고
#. venv/bin/activate # virtualenv 활성화
pip install -r requirements.txt
# 사내 방화벽으로 막히면 핫스팟으로 일부 설치 하자 =3= 
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh # rust 설치
sudo apt install python3.12
sudo vi ~/.bashrc  # 지금 보니까 굳이 안해줘도 됬었음
export PYTHONPATH=/usr/bin/python3.12 # 지금 보니까 굳이 안해줘도 됬었음
source ~/.bashrc # 지금 보니까 굳이 안해줘도 됬었음
virtualenv --python="/usr/bin/python3.12" "/mnt/c/study/flask/backend-flask_restx/venv" # 파이썬 3.12 가상환경 생성
. venv/bin/activate # virtualenv 활성화
pip install -r requirements.txt
python wsgi.py

# 아마존 세팅(걍.. 홈으로 가서 해줬음) - 참고링크보셈

cd /mnt/c/study/flask/backend-flask_restx
. venv/bin/activate # virtualenv 활성화

pip3 install zappa
pip install setuptools
zappa -v
zappa init
zappa deploy dev

# zappa_settings.json 
# "app_function": "wsgi.app", # 진입점 .app으로 써줘야함
# global n # 걍 끄셈
```

배포완료... 
- [https://il3yh0ax0h.execute-api.ap-northeast-2.amazonaws.com/dev/swagger](https://il3yh0ax0h.execute-api.ap-northeast-2.amazonaws.com/dev/swagger)  ** 회사계정 **


### venv 배포 (개인실습)

wsl 실행.

```sh
sudo apt install python3.12-venv
mkdir zappa-tutorial
cd zappa-tutorial
sudo apt update && upgrade
sudo apt install python3-pip
sudo apt install python3-venv
python3 -m venv .venv
source .venv/bin/activate
pip3 install Flask
pip3 install zappa
pip install setuptools
zappa -v
python app.py

deactivate # 가상환경 비활성화

# aws 설정
cd ~
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install unzip
unzip awscliv2.zip
sudo ./aws/install
aws configure

zappa init
zappa deploy dev
zappa update dev
```

> ### 참고 링크
> - [https://yoonminlee.com/zappa-flask-serverless-deployment](https://yoonminlee.com/zappa-flask-serverless-deployment)
> - [https://hidden-loca.tistory.com/41](https://hidden-loca.tistory.com/41)
> - [https://widesec.tistory.com/17](https://widesec.tistory.com/17)
> - [error: externally-managed-environment](https://velog.io/@mystic/%EB%A7%A5%EB%B6%81-Homebrew-python%EC%84%A4%EC%B9%98%EC%8B%9C-pip-%EB%AC%B8%EC%A0%9C)
> - [Defaulting to user installation because normal site-packages is not writeable](https://beausty23.tistory.com/213)


## 생활코딩 강의

- [생활코딩 Flask web framework Youtube](https://www.youtube.com/watch?v=X_n6IZmieV8&list=PLuHgQVnccGMClNOIuT3b3M4YZjxmult2y)

<details class="custom-block details">
<summary>생활코딩 강의 내용</summary>

`server.py`
```python
from flask import Flask, request, redirect

app = Flask(__name__)


nextId = 4
topics = [
    {'id': 1, 'title': 'html', 'body': 'html is ...'},
    {'id': 2, 'title': 'css', 'body': 'css is ...'},
    {'id': 3, 'title': 'javascript', 'body': 'javascript is ...'}
]


def template(contents, content, id=None):
    contextUI = ''
    if id != None:
        contextUI = f'''
            <li><a href="/update/{id}/">update</a></li>
            <li><form action="/delete/{id}/" method="POST"><input type="submit" value="delete"></form></li>
        '''
    return f'''<!doctype html>
    <html>
        <body>
            <h1><a href="/">WEB</a></h1>
            <ol>
                {contents}
            </ol>
            {content}
            <ul>
                <li><a href="/create/">create</a></li>
                {contextUI}
            </ul>
        </body>
    </html>
    '''


def getContents():
    liTags = ''
    for topic in topics:
        liTags = liTags + f'<li><a href="/read/{topic["id"]}/">{topic["title"]}</a></li>'
    return liTags


@app.route('/')
def index():
    return template(getContents(), '<h2>Welcome</h2>Hello, WEB')


@app.route('/read/<int:id>/')
def read(id):
    title = ''
    body = ''
    for topic in topics:
        if id == topic['id']:
            title = topic['title']
            body = topic['body']
            break
    return template(getContents(), f'<h2>{title}</h2>{body}', id)


@app.route('/create/', methods=['GET', 'POST'])
def create():
    if request.method == 'GET': 
        content = '''
            <form action="/create/" method="POST">
                <p><input type="text" name="title" placeholder="title"></p>
                <p><textarea name="body" placeholder="body"></textarea></p>
                <p><input type="submit" value="create"></p>
            </form>
        '''
        return template(getContents(), content)
    elif request.method == 'POST':
        global nextId
        title = request.form['title']
        body = request.form['body']
        newTopic = {'id': nextId, 'title': title, 'body': body}
        topics.append(newTopic)
        url = '/read/'+str(nextId)+'/'
        nextId = nextId + 1
        return redirect(url)


@app.route('/update/<int:id>/', methods=['GET', 'POST'])
def update(id):
    if request.method == 'GET': 
        title = ''
        body = ''
        for topic in topics:
            if id == topic['id']:
                title = topic['title']
                body = topic['body']
                break
        content = f'''
            <form action="/update/{id}/" method="POST">
                <p><input type="text" name="title" placeholder="title" value="{title}"></p>
                <p><textarea name="body" placeholder="body">{body}</textarea></p>
                <p><input type="submit" value="update"></p>
            </form>
        '''
        return template(getContents(), content)
    elif request.method == 'POST':
        global nextId
        title = request.form['title']
        body = request.form['body']
        for topic in topics:
            if id == topic['id']:
                topic['title'] = title
                topic['body'] = body
                break
        url = '/read/'+str(id)+'/'
        return redirect(url)


@app.route('/delete/<int:id>/', methods=['POST'])
def delete(id):
    for topic in topics:
        if id == topic['id']:
            topics.remove(topic)
            break
    return redirect('/')


app.run(debug=True) # 디버그모드
```

</details>
