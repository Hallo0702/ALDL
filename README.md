# 명세서 학습

## 22.08.29

1. 스켈레톤 프로젝트 개발환경 구성
   
   - 스켈레톤 코드 내려받기
   
   - virtualBox 및 Vagrant 설치
   
   - vagrant를 활용한 가상머신 생성 및 구동

## 22.08.30

1. 문제 해결 : vagrant up 중 Timeout 발생

![에러.png](./img/Timeout%20err.png)

- 해결 : PowerShell에서 VirtualMachinePlatform 비활성화

- dism.exe /online /Enable-Feature /FeatureName:VirtualMachinePlatform /all /NoRestart
2. eth0 실행 후 geth 설치
   
   ```c
   sudo apt-get update
   sudo apt-get install software-properties-common
   sudo add-apt-repository -y ppa:ethereum/ethereum
   sudo apt-get install ethereum
   
   {
      "config": {
         "chainId": 921,
         "homesteadBlock": 0,
         "eip150Block": 0
      },
      "difficulty": "0x10",
      "gasLimit": "9999999",
      "alloc": {
         "0xF9e354D005eA55619B4059153a6f06a5ba088a2d": {
             "balance": "100000000000000000000000"
         }
      }
   }
   ```

3. 폴더 생성 후 계정 생성 및 genesis 작성

```t
{
   "config": {
      "chainId": 921,
      "homesteadBlock": 0,
      "eip150Block": 0
   },
   "difficulty": "0x10",
   "gasLimit": "9999999",
   "alloc": {
      "0xF9e354D005eA55619B4059153a6f06a5ba088a2d": {
          "balance": "100000000000000000000000"
      }
   }
}
```

4. private network 생성

```c
geth --datadir . init genesis
```

5. private network 구동

```c
geth --networkid 921 --nodiscover --maxpeers 2 --datadir ~/dev/eth_localdata --http --http.addr "0.0.0.0" --http.port 8545 --http.corsdomain "\*" --http.api "eth,debug,miner,net,personal,web3" console
```

## 22.08.31

1. 계정 생성 및 확인

```c
personal.newAccount("비밀번호")
eth.accounts
```

2. 코인베이스 설정
   
   - 초기 코인베이스는 eth.accounts[0]
   
   - 변경하기
   
   ```C
   miner.setEtherbase(eth.accounts[1])
   ```
   
   - 블록체인 블록 개수 확인하기
   
   ```c
   eth.blockNumber    
   ```

3. 채굴하기
   
   - miner.start()로 시작됐는지 확인할 수 없으므로 eth.mining을 통해 채굴중인지 확인
   
   ```C
   miner.start()
   eth.mining
   ```
   
   - 해시 속도와 블록 길이 확인
   
   ```c
   eth.hashrate
   eth.blockNumber
   ```
   
   - 채굴 종료하기
   
   ```C
   miner.stop
   ```
   
   - 채굴 결과 확인하기
   
   ```c
   eth.getBalance(eth.coinbase)
   eth.getBalance(eth.accounts[0])
   web3.fromWei(eth.getBalance(eth.accounts[0]), "ether")
   ```

4. 송금하기
   
   - 문제 발생 : 송금할 계정에 unlock하는 명령어가 먹히지 않음
   
   - 해결방법 : 네트워크 구동 시 명령어 추가
   
   ```C
   geth --networkid 921 --nodiscover --maxpeers 2 --datadir ~/dev/eth_localdata --http --http.addr "0.0.0.0" --http.port 8545 --http.corsdomain "*" --http.api "db,eth,debug,miner,net,personal,web3" --allow-insecure-unlock console
   ```
   
   - 송금할 계정 unlock하기
   
   ```C
   personal.unlockAccount(eth.accounts[0], "비밀번호")
   ```
   
   - 트랜잭션 생성 및 전송
   
   ```C
   eth.sendTransaction({from:eth.accounts[0], to:eth.accounts[1], value:web3.toWei(10, "ether")})
   eth.getTransaction("트랜잭션 ID")
   ```
   
   - 트랜잭션 처리를 위한 채굴 진행
   
   ```c
   miner.start(1)
   eth.pendingTransactions
   miner.stop()
   eth.getTransaction("트랜잭션 ID")
   eth.getBloc(블록번호)
   ```



## 22.09.01

- eth0과 eth1 연결

- 사전준비 : eth1을 eth0과 같은 세팅 진행
1. eth1의 enode확인

```C
admin.nodeInfo.enode
```

2. ifconfig를 확인 후 node의 뒷 부분에 IP주소를 기입

3. eth0에 eth0의 enode등록

```c
admin.addPeer("eth1의 enode")
```

4. eth1에서 eth0 관련 정보를 address값을 활용해 조회할 수 있다.
