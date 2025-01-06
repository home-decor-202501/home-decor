1. 각 테이블은 기본적으로 primary key인 id과 (log용) created_at를 가지도록 한다.

2. 다대다 테이블의 경우, 아래의 enrollment 테이블과 같이
   A 테이블의 primary key, B 테이블의 primary key를 column으로 가지는 중간테이블을 하나 더 생성
 
| 테이블        | 컬럼         | 설명            |
|--------------|--------------|-----------------|
| Student      | id           | 학생 ID         |
|              | name         | 학생 이름       |
|              | subjects     | 과목 목록       |
|--------------|--------------|-----------------|
| Subject      | id           | 과목 ID         |
|              | name         | 과목 이름       |
|              | students     | 학생 목록       |
|--------------|--------------|-----------------|
| Enrollment   | student_id   | 학생 ID (외래키) |
|              | subject_id   | 과목 ID (외래키) |
