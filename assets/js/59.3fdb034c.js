(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{412:function(s,t,a){s.exports=a.p+"assets/img/flask.41c5252e.png"},617:function(s,t,a){"use strict";a.r(t);var n=a(2),r=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"flask-wsl-vscode-debugging"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#flask-wsl-vscode-debugging"}},[s._v("#")]),s._v(" Flask + wsl + VSCode Debugging")]),s._v(" "),t("p",[s._v("일단 난 플라스크 환경을 wsl에 세팅 했다.")]),s._v(" "),t("h2",{attrs:{id:"vscode-flask-디버깅-설정"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vscode-flask-디버깅-설정"}},[s._v("#")]),s._v(" vscode flask 디버깅 설정")]),s._v(" "),t("ol",[t("li",[t("p",[s._v("wsl 에서 python 가상환경 flask 로컬 서버 띄우는거까지 했다고 가정하고 스타트")])]),s._v(" "),t("li",[t("p",[s._v("vsCode 제일 왼쪽 하단에 원격창 열기 -> wsl 연결 (이걸 안해줘서 삽질 꽤나함)")])]),s._v(" "),t("li",[t("p",[s._v("파이썬 확장 프로그램 다시 설치해주자")]),s._v(" "),t("div",{staticClass:"custom-block danger"},[t("p",{staticClass:"custom-block-title"},[s._v("couldn't find a debug adapter descriptor for debug type 'debugpy'")]),s._v(" "),t("p",[s._v("검색해보니 확장 프로그램 버전 문제가 있다고 함. 파이썬 확장프로그램 설치 창에서 제거버튼의 오른쪽 아래 화살표 누르고 특정 버전 설치 클릭 한 다음 한달쯤 전걸로 설치해주니 해결되었음.")])])]),s._v(" "),t("li",[t("p",[s._v("파이썬 인터프리터 설정 확인해 주자 "),t("code",[s._v(">Python: 인터프리터 선택")]),s._v(" 가상환경의 파이썬 선택.. "),t("em",[t("strong",[s._v("파이썬 버전 확인!!!!!")])])]),s._v(" "),t("blockquote",[t("p",[s._v("가상환경 인터프리터 안뜨면 가상환경 폴더 열고 선택..")])]),s._v(" "),t("p",[t("img",{staticClass:"lazy",attrs:{alt:"python interpretor","data-src":a(412),loading:"lazy"}})])]),s._v(" "),t("li",[t("p",[s._v("좌측 네번째 아이콘 실행 및 디버그 클릭")])]),s._v(" "),t("li",[t("p",[s._v("launch.json 없으면 만들어 주자")])]),s._v(" "),t("li",[t("p",[t("code",[s._v('"FLASK_APP": "wsgi.py",')]),s._v(" 프로젝트에서 진입점이 될 파이썬 파일 적어주자")]),s._v(" "),t("div",{staticClass:"language-json line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-json"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"version"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"0.2.0"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"configurations"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"name"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Python 디버거: Flask"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"type"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"debugpy"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"request"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"launch"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"module"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"flask"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"env"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n                "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"FLASK_APP"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"wsgi.py"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n                "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"FLASK_DEBUG"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"1"')]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"args"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n                "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"run"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n                "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"--no-debugger"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n                "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"--no-reload"')]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"jinja"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"autoStartBrowser"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br")])])]),s._v(" "),t("li",[t("p",[s._v("실행및 디버그 -> 디버깅 시작 (F5) 눌러주면 디버깅 환경에서 실행 완료. 중단점 찍어주고 평소와 같이 디버깅~,,~")])])]),s._v(" "),t("blockquote",[t("p",[t("strong",[s._v("참고 링크")])]),s._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://stackoverflow.com/questions/62514756/selecting-python-interpreter-from-wsl",target:"_blank",rel:"noopener noreferrer"}},[s._v("selecting-python-interpreter-from-wsl"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://code.visualstudio.com/docs/python/debugging",target:"_blank",rel:"noopener noreferrer"}},[s._v("visualstudio python/debugging"),t("OutboundLink")],1)])])])])}),[],!1,null,null,null);t.default=r.exports}}]);