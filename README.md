# 명세서 학습

## 22.08.29

1. 스켈레톤 프로젝트 개발환경 구성
   
   - 스켈레톤 코드 내려받기
   
   - virtualBox 및 Vagrant 설치
   
   - vagrant를 활용한 가상머신 생성 및 구동

## 22.08.30

1. 문제 해결 : vagrant up 중 Timeout 발생

![에러.png](./Timeout%20err.png)

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
geth -networkid 921 --nodiscover --maxpeers 2 --datadir ~/dev/eth_localdata --http --http.addr "0.0.0.0" --http.port 8545 --http.corsdomain "\*" --http.api "db,eth,debug,miner,net,personal,web3" console
```
