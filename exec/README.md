# 포팅 메뉴얼

### 목차

1. [Frontend 기술 스택 및 라이브러리](#frontend-기술-스택-및-라이브러리)
2. [Backend 기술 스택 및 라이브러리](#backend-기술-스택-및-라이브러리)
3. [배포 및 CI/CD 기술스택 및 라이브러리](#배포-및-cicd-기술스택-및-라이브러리)
4. [DB 접속 정보](#db-접속-정보)
5. [빌드 실행 방법](#빌드-실행-방법)
6. [DB 덤프 파일](#db-덤프-파일)
7. [시연 시나리오](#시연-시나리오)

## Frontend 기술 스택 및 라이브러리

| Stack      | Version | Description      |
| ---------- | ------- | ---------------- |
| nodeJs     | 16.17.0 |                  |
| React      | 18.2.0  | Client Framework |
| nextjs     | 12.3.0  |                  |
| web3js     | 1.8.0   |                  |
| typescript | 4.8.3   |                  |

## Backend 기술 스택 및 라이브러리

| Stack                                                      | Version | Description |
| ---------------------------------------------------------- | ------- | ----------- |
| Java                                                       | 11      |             |
| Gradle                                                     | 6.7+    | Build Tool  |
| MySQL                                                      | 8.0.30  |             |
| java-jwt                                                   | 3.19.2  |             |
| spring-security                                            | 1.19.1  |             |
| web3j                                                      | 4.9.4   |             |
| jsonwebtoken jjwt api                                      | 0.11.1  |             |
| JSONParser, JSONObject version                             | 1.1     |             |
| spring boot devtools                                       |         |             |
| spring mysql connector                                     |         |             |
| java.mail                                                  |         |             |
| lombok                                                     | 1.18.24 |             |
| spring boot starter web                                    | 2.4.5   |             |
| session:spring-session-jdbc                                |         |             |
| spring-boot-starter-data-jpa                               |         |             |
| org.springframework.session:spring-session-jdbc            | 2.4.3   |             |
| org.springframework.boot:spring-boot-starter-oauth2-client | 2.4.5   |             |
| org.springframework.boot:spring-boot-starter-security      | 2.4.5   |             |
| io.springfox:springfox-boot-starter                        | 3.0.0   |             |
| io.springfox:springfox-swagger-ui                          | 3.0.0   |             |

## 배포 및 CI/CD 기술스택 및 라이브러리

| Stack   | Version   | Description                      |
| ------- | --------- | -------------------------------- |
| Jenkins | 2.346.2   | CI/CD Tool                       |
| Docker  | 20.10.17  |                                  |
| Nginx   | 1.18.0    | Web Server, Reverse Proxy Server |
| Ubuntu  | 20.04 LTS |                                  |

## DB 접속 정보

### DB 주요 계정

**계정 ID**
`posi`

**계정 비밀번호**
`ctrlaltc207`

### 프로퍼티가 정의된 파일 목록

aldl.src.main.resource.application-properties

## 빌드 실행 방법

#### Frontend

client 폴더 안에서 아래의 명령어를 실행한다.

```
환경변수 설정 (.env)

NEXT_PUBLIC_API_URI=http://j7c207.p.ssafy.io:8088
NEXT_PUBLIC_BLOCKCHAIN_URI=http://43.200.253.174:3000
```

```
패키지 설치
$ npm install
```

```
프로젝트 빌드
$ npm run build
```

#### Backend

##### Spring

backend-java 폴더 안에서 아래의 명령어를 실행한다.

```
jar 파일 빌드
$ ./gradlew build
```

```
빌드 파일 실행
$ java -jar aldl.jar
```

## DB 덤프 파일

C207.zip

## 시연 시나리오

### 홈페이지

**알록달록의 첫 페이지입니다.**

<img src="/uploads/4663f701cd7eccb4704847224e340730/image.png" alt="그림1" width="300px" />

1. About 페이지로 이동할 수 있습니다.
2. 로그인 페이지로 이동할 수 있습니다.
3. 자물쇠 걸기 페이지로 이동할 수 있습니다.
4. 자물쇠 모아보기 페이지로 이동할 수 있습니다.
5. 지역별 자물쇠 보기 페이지로 이동할 수 있습니다.

### About 페이지

**알록달록의 서비스 설명을 볼 수 있습니다.**

<img src="/uploads/8634baddda20f1d4409efa2782869f52/image.png" alt="그림2" width="800px" />

### 로그인 페이지

**회원가입을 통해 로그인을 진행할 수 있습니다.**

<img src="/uploads/bba2efbfa0647b37cd52be5d131b0b72/image.png" alt="그림3" width="300px" />


### MyPage

**생성된 본인의 정보를 확인할 수 있습니다.**

<img src="/uploads/f0bb585b719c702ed4010bb3781153a0/image.png" alt="그림9" width="300px" />

1. 가입 시 기재한 본인의 닉네임, 이름, 이메일 정보를 확인할 수 있습니다.
2. 지갑 주소 및 ETH 잔액을 확인할 수 있습니다.
3. 비밀번호를 수정할 수 있습니다.

### 자물쇠 걸기 페이지

**블록체인 서버에 등록할 내용을 작성합니다.**

<img src="/uploads/c1acd654b1dec03f50e4de7627cc4dc0/image.png" alt="그림8" width="300px" />

1. 제목, 내용, 사진을 작성할 수 있습니다.
2. 자물쇠의 스타일을 지정할 수 있습니다.

<img src="/uploads/4d9a1f77be589d84adfc18ee38ea61fb/image.png" alt="그림8" width="300px" />

1. 자물쇠를 채울 지역, 위치를 선택할 수 있습니다.
2. 채워진 자물쇠는 블록체인 서버에 등록됩니다.

<img src="/uploads/f1c183ba96336cfc5d9abf6bdc5ed7a8/image.png" alt="그림8" width="300px" />

1. 블록체인 서버에 등록한 후 해쉬값을 받을 수 있습니다.
2. 해쉬를 다른 사람에게 공유하여 본인이 등록한 자물쇠의 내용을 다른 사람에게 보여줄 수 있습니다.

### 자물쇠 모아보기 페이지

**본인이 작성하거나 추가한 해쉬값에 관련한 정보를 열람할 수 있습니다.**

<img src="/uploads/401a38df65c9056ef04d73fd37e5be25/image.png" alt="그림7" width="300px" />

1. 공유받은 해쉬값을 추가할 수 있습니다.
2. 위치를 선택하여 선택한 지역에 걸린 자물쇠만 열람할 수 있습니다.
3. 본인이 추가한 자물쇠 목록을 확인할 수 있습니다.