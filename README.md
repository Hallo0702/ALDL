# C207

## 명세서 학습

### 22.08.30

1. 스켈레톤 프로젝트 개발환경 구성
   
   - 스켈레톤 코드 내려받기
   
   - virtualBox 및 Vagrant 설치
   
   - vagrant를 활용한 가상머신 생성 및 구동

2. eth0 실행 후 geth 설치
   
   ```c
   sudo apt-get update
   sudo apt-get install software-properties-common
   sudo add-apt-repository -y ppa:ethereum/ethereum
   sudo apt-get install ethereum
   ```

3. 폴더 생성 후 계정 생성 및 genesis 작성

```t
{
	"config": {
		"chainId": 921,
		"homesteadBlock": 0,
		"eip150Block": 0,
		"eip155Block": 0,
		"eip158Block": 0
	},
	"difficulty": "0x10",
	"nonce": "0xdeadbeefdeadbeef",
	"timestamp": "0x0",
	"gasLimit": "9999999",
	"alloc": {}
}

```

4. private network 생성

```c
geth --datadir ~/testnet init genesis
```

5. private network 구동

```c
geth --networkid 921 --nodiscover --maxpeers 2 --datadir ~/testnet --http --http.addr "0.0.0.0" --http.port 8545 --http.corsdomain "*" --http.api "db,eth,debug,miner,net,personal,web3" --allow-insecure-unlock console
```

### 22.08.31

1. eth1 실행 후 설치 (위와 같은 방법으로 진행)

* 다만 eth1은 localhost로 실행한다 하였으므로 http.addr 만 수정하여 올림.
```c
geth --networkid 921 --nodiscover --maxpeers 2 --datadir ~/testnet --allow-insecure-unlock console
```
2. eth0에 새로운 계정 생성

* 구동 후
```c
personal.newAccount("비밀번호")
eth.accounts
```

### 22.09.01

1. 마이닝

```c
miner.setEtherbase(eth.accounts[0])
miner.start(1)
miner.stop()
web3.fromWei(eth.getBalance(eth.accounts[1]), "ether")

```

* 마이닝을 할 계좌를 설정
* 마이닝 시작 / 멈춤
* 선택한 계좌의 내용을 이더리움 형식으로 반환


2. 송금하기

```c
personal.unlockAccount(eth.accounts[0], "비밀번호")
eth.sendTransaction({from:eth.accounts[0],to:eth.accounts[1],value:web3.toWei(10, "ether")})
eth.getTransaction("트랜잭션 ID")
eth.pendingTransactions
````

* 송금할 계정 잠금 해제
* 트랜잭션을 생성하여 송금하기 / 트랜잭션 확인하기
* 미처리 트랜잭션 목록 확인하기

3. 트랜잭션 처리를 위해서 채굴하기

```c
miner.start(1)
eth.pendingTransactions
miner.stop()
eth.getTransaction("트랜잭션 ID")
```

4. 송금 결과 확인하기
