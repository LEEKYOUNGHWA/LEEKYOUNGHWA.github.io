---
lastUpdated: 2025/04/04 12:00:00
subTitle: 파이썬으로 이기종 데이터베이스 간 테이블 복사 (오라클 -> 마리아)
description: 파이썬으로 이기종 데이터베이스 간 테이블 복사 (오라클 -> 마리아)
image: https://d2jdgazzki9vjm.cloudfront.net/tutorial/openpyxl/images/python-openpyxl-tutorial.png
tags: ["database"]
---

# 파이썬으로 A DB에 있는 테이블을 B DB로 복사

인사 데이터가 db에 꽂히는걸 일자별로 비교 검증 하기 위해 했던 과정 기록

> [1. 로컬 마리아디비 설치](./localMariaDBSetting.md)  
> [2. 디비버 테이블 카피](./dbeaverTableCopy.md)  
> [3. 파이썬 DB 조회 후 엑셀로 다운로드](./pythonExcelDownByGPT.md)  
> [4. 파이썬 A DB에 있는 테이블을 B DB로 복사](./pythonDBtableCopyByGPT.md)  

## 파이썬으로 자동화 스크립트를 짜보자 (GPT야 짜줘)

테이블 카피 하기 위해서 마우스 클릭을 통상 20번을 해줘야 했다 대략 20개 테이블 카피를 할려면 400번 마우스 클릭...  
백업을 뜨면 뜰수록 손목이 아파온다..  
그런데 테스트 횟수가 늘어난다......  
처음 두번은 수동으로 했다가... 결국 .. 자동화 하기로 결심했다...  
파이썬으로 테이블 생성부터 데이터 insert 까지 자동화 스크립트 작성을 부탁해 보았다  

일단 파이썬에서 오라클을 붙으려면 오라클 클라이언트 설치를 해주어야 한다

[설치링크](https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html)

설치는 간단하다 zip 파일 다운로드 하고 원하는 위치에서 압축 해제

그리고 환경변수 설정 <- 해줘도 못 읽는거 같다 지피티랑 디버깅 하면서 소스에 박아 넣어서 사실 안해줘도 될거 같긴하다.

필요한 패키지 추가 설치 해 준다

```sh
pip install oracledb
```

```py
import oracledb
import pymysql

# Oracle Client 초기화
oracledb.init_oracle_client(lib_dir=r"C:\oracle\instantclient-basic-windows.x64-23.7.0.25.01\instantclient_23_7")

# 1중 딕셔너리로 된 DB 접속 정보
oracle_configs = {
    "DEVSMTC": {
        "user": "i_k------------------emp",
        "password": "gs------------------6",
        "dsn": "smt------------------s.co.kr:1630/DEV------------------TC"
    },
    "DEVNBS": {
        "user": "i_ky------------------p",
        "password": "g------------------6",
        "dsn": "n------------------hs.co.kr:1730/DEV------------------S"
    }
}

mysql_configs = {
    "local": {
        "host": "localhost",
        "port": 3306,
        "user": "root",
        "password": "0000",
        "database": "hrlegacy",
        "charset": "utf8mb4",
        "cursorclass": pymysql.cursors.DictCursor
    },
    "bms": {
        "host": "bms------------------hs.co.kr",
        "port": 3306,
        "user": "i_------------------mp",
        "password": "gs------------------56",
        "database": "b------------------s",
        "charset": "utf8mb4",
        "cursorclass": pymysql.cursors.DictCursor
    }
}

# 복사 대상 테이블 하드코딩 (DB 그룹에 따라 분리)
oracle_tables_dev = [
    "CM------------------M", "CM------------------L_D", "CM------------------_M", "CMM------------------H_M",
    "CM------------------CREN_D", "CM------------------M", "CMM_US------------------_D",
    "G------------------LE", "G------------------ENU", "SCM------------------NU", "G------------------MP"
]

oracle_tables_nbs = [
    "TB_------------------", "T------------------2", "T------------------0", "T------------------", "T------------------",
    "TB------------------5", "T------------------2", "T------------------1", "T------------------"
]

mysql_tables_bms = [
    "MN------------------SER"
]

def map_oracle_type(oracle_type_str):
    if "CHAR" in oracle_type_str or "STRING" in oracle_type_str:
        return "VARCHAR(255)"
    elif "NUMBER" in oracle_type_str or "FLOAT" in oracle_type_str:
        return "DOUBLE"
    elif "DATE" in oracle_type_str or "TIMESTAMP" in oracle_type_str:
        return "DATETIME"
    else:
        return "TEXT"

def copy_table_from_oracle(table_name, oracle_config):
    print(f"\n🚀 복사 시작: {table_name}")

    # 연결
    oracle_conn = oracledb.connect(**oracle_config)
    oracle_cursor = oracle_conn.cursor()

    mysql_conn = pymysql.connect(**mysql_configs["local"])
    mysql_cursor = mysql_conn.cursor()

    # 데이터 조회
    oracle_cursor.execute(f"SELECT * FROM {table_name}")
    rows = oracle_cursor.fetchall()
    desc_info = oracle_cursor.description

    # CREATE TABLE 생성
    column_defs = []
    for desc in desc_info:
        col_name = desc[0]
        oracle_type = str(desc[1])
        column_defs.append(f"`{col_name}` {map_oracle_type(oracle_type)}")

    create_query = f"CREATE TABLE IF NOT EXISTS `{table_name}_test` (\n  {',\n  '.join(column_defs)}\n);"
    mysql_cursor.execute(f"DROP TABLE IF EXISTS `{table_name}_test`")
    mysql_cursor.execute(create_query)
    print(f"✅ 테이블 생성 완료: {table_name}_test")

    # INSERT
    column_names = [desc[0] for desc in desc_info]
    insert_query = f"INSERT INTO `{table_name}_test` ({', '.join(column_names)}) VALUES ({', '.join(['%s'] * len(column_names))})"
    mysql_cursor.executemany(insert_query, rows)
    mysql_conn.commit()
    print(f"✅ 데이터 복사 완료: {len(rows)}건")

    # 종료
    oracle_cursor.close()
    oracle_conn.close()
    mysql_cursor.close()
    mysql_conn.close()

def copy_table_from_mysql_to_mysql(table_name):
    print(f"\n🚀 복사 시작: {table_name}")

    source_conn = pymysql.connect(**mysql_configs["bms"])
    source_cursor = source_conn.cursor()

    target_conn = pymysql.connect(**mysql_configs["local"])
    target_cursor = target_conn.cursor()

    source_cursor.execute(f"SELECT * FROM {table_name}")
    rows = source_cursor.fetchall()

    if not rows:
        print("⚠️ 데이터 없음")
        return

    column_names = list(rows[0].keys())
    column_defs = [f"`{col}` TEXT" for col in column_names]  # 간단하게 TEXT 처리

    create_query = f"CREATE TABLE IF NOT EXISTS `{table_name}_test` (\n  {',\n  '.join(column_defs)}\n);"
    target_cursor.execute(f"DROP TABLE IF EXISTS `{table_name}_test`")
    target_cursor.execute(create_query)
    print(f"✅ 테이블 생성 완료: {table_name}_test")

    insert_query = f"INSERT INTO `{table_name}_test` ({', '.join(column_names)}) VALUES ({', '.join(['%s'] * len(column_names))})"
    insert_values = [tuple(row[col] for col in column_names) for row in rows]
    target_cursor.executemany(insert_query, insert_values)
    target_conn.commit()
    print(f"✅ 데이터 복사 완료: {len(rows)}건")

    source_cursor.close()
    source_conn.close()
    target_cursor.close()
    target_conn.close()

def main():
    for table in oracle_tables_dev:
        copy_table_from_oracle(table, oracle_configs["DEVSMTC"])
    for table in oracle_tables_nbs:
        copy_table_from_oracle(table, oracle_configs["DEVNBS"])
    for table in mysql_tables_bms:
        copy_table_from_mysql_to_mysql(table)

if __name__ == "__main__":
    main()

```