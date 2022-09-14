# 22.08.30
## 명세서 학습
1. 스켈레톤 프로젝트 개발환경 구성
  * 스켈레톤 코드 내려받기
  * VirtualBox, Ubuntu 설치

## 스프링 학습
1. 프로젝트 학습 세팅
  * 자바 11 설치
  * 인텔리제이 설치 및 세팅 완료
  * start.spring.io를 통해 프로젝트 생성

# 22.08.31

## 스프링 학습
1. 스프링 인터넷 강의 수강
  * 자바 빌드하기
  * MVC와 템플릿 엔진
  * API사용하기
  * 백엔드 예제 따라하기

# 22.09.01

## 명세서 학습

### Vagrant 설치 및 vagrant를 활용하여 가상머신(eth0, eth1) 생성 및 구동
* vagrant 사용할 폴더 생성 후 vagrantfile 설정
```
vagrant init

VAGRANT_API_VERSION = "2"

vms = {
   'eth0' => '10',
   'eth1' => '11'
}

Vagrant.configure(VAGRANT_API_VERSION) do |config|
   config.vm.box = "ubuntu/bionic64"
   vms.each do |key, value|
      config.vm.define "#{key}" do |node|
         node.vm.network "private_network", ip: "192.168.50.#{value}"
         if "#{key}" == "eth0"
            node.vm.network "forwarded_port", guest: 8545, host: 8545
         end
         node.vm.hostname = "#{key}"
         node.vm.provider "virtualbox" do |nodev|
            nodev.memory = 2048
            nodev.cpus = 2
         end
      end
   end
end

```
* vagrant로 가상머신 생성
```
vagrant up
```

### eth0 생성 후 geth 설치
* eth0 접속
```
vagrant ssh eth0
```
* geth 설치
```
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get install ethereum

```
* 가상황경에 genesis파일 생성
```
mkdir -p dev/eth_localdata
cd dev/eth_localdata

vi genesis.json
```
* genesis.json
```
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

### 프라이빗 네트워크 생성 및 접속
* geth 초기화 및 네트워크 생성
```
geth --dataidr /home/vagrant/dev/eth_localdata init ~/genesis.json
```
* geth 구동
```
geth --networkid 921 --nodiscover --maxpeers 2 --datadir /home/vagrant/dev/eth_localdata --http --http.addr "0.0.0.0" --http.port 8545 --http.corsdomain "*" --http.api "db,eth,debug,miner,net,personal,web3" --allow-insecure-unlock console
```

### eth1 실행 후 설치
* 위와 같은 과정을 통해 실행 후 설치(단, eth1은 localhost동작이므로 http.addr만 수정)
```
geth --networkid 921 --nodiscover --maxpeers 2 --datadir /home/vagrant/dev/eth_localdata --http --http.addr "localhost" --http.port 8545 --http.corsdomain "*" --http.api "db,eth,debug,miner,net,personal,web3" --allow-insecure-unlock console
``` 

### 각 노드에 계정 생성
* 계정 생성하기
```
personal.newAccount("password")
```
* 계정 확인
```
eth.accounts

# 마이닝시 보상받는 계정확인
eth.coinbase
```
* 마이닝 시에 코인을 받은 계정을 설정하기
```
miner.setEtherbase(eth.accounts[0])
```

### 마이닝 하기
* 마이닝 시작(숫자의 크기는 채굴하는 성능인 것 같음)
* 마이닝 정지
* 계좌의 이더리움 양 출력
```
miner.start(숫자)
miner.stop()
we3.fromWei(eth.getBalance(eth.accounts[0]), "ether")

```

### 송금하기
* 송금을 위해서 송금할 계정 잠금해제
```
personal.unlockAccount(eth.accounts[0],"password")
```
* 트랜잭션을 생성하여 송금하기
```
tx = {from:eth.accounts[0], to:eth.accounts[1], value:web3.toWei(10, "ether:)}
eth.sendTransaction(tx)
```
* 트랜잭션 확인
```
eth.getTransaction("transaction ID")
```
* 미처리 트랜잭션 확인
```
eth.pendingTransactions
```

* 트랜잭션의 처리를 위해 마이닝 하기
```
miner.start(1)
miner.stop()
```

* 송금 결과 확인하기
```
web3.fromWei(eth.getBalance(eth.accounts[1]),"ether")
```

## 22.09.04

### 현재 오류 발생
* http로 실행하던 것 rpc로 실행하는것과 차이 찾는중
* rpc설정이 가능하면 rpc로 해보고싶음
* 피어 연결은 되었다고 하는것 같은데 블록이 연동이 되지않음 방법 찾는중

## 22.09.06

### 오류 해결
* 블록 연동되지않는 현상 해결
  * 두 피어 모두 초기화 후 연동하니 해결되었음
  * 상세 이유는 좀 더 찾아볼 예정


## 22.09.14

### 크립토 좀비를 이용한 솔리디티 문법 공부 1

* 솔리디티의 가장 위에는 솔리디티 버전이 들어가야한다.
```
pragma solidity ^0.4.19;
```

* 솔리디티 코드는 컨트랙트 안에서 작성된다.
```
contract ZombieFactory {

}
```

* 상태 변수 & 정수는 컨트랙트 저장소에 영구적으로 저장된다. 즉, 블록체인에 기록된다.
* uint : 부호없는 정수
* int : 부호 있는 정수
```
contract ZombieFactory {
    uint dnaDigits = 16;
}
```

* 솔리디티에서 연산은 대부분의 프로그래밍 언어의 연산과 동일하다.
* +, -, *, /, %, ** 등
```
contract ZombieFactory {
    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
}
```

* 좀 더 복잡한 자료형을 위해 구조체를 제공한다.
```
contract ZombieFactory {

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Zombie {
        string name;
        uint dna;
    }

}
```

* 모음이 필요할 때 배열을 사용할 수 있다.
* 솔리디티에는 정적 배열과 동적 배열이 존재.
* 정적배열은 담을 수 있는 원소의 수가 고정, 동적 배열은 고정된 크기가 없이 계속 커질 수 있다.
* 구조체의 배열도 생성할 수 있음.
* 배열은 public과 private로도 선언할 수 있다.
* public으로 선언 시 다른 컨트랙트에서 이 배열을 읽을 수 있게된다.
```
contract ZombieFactory {

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Zombie {
        string name;
        uint dna;
    }

    Zombie[] public zombies;

}
```

* 솔리디티 에서의 함수선언은 function 함수명(받는 인자)
* 함수 인자명은 _로 시작해서 전역 변수와 구별하는 것이 관례이다.
```
contract ZombieFactory {

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Zombie {
        string name;
        uint dna;
    }

    Zombie[] public zombies;

    function createZombie(string _name, uint _dna) {
        zombies.push(Zombie(_name, _dna));
    }

}

```

* 함수는 기본적으로 public으로 선언되지만, private로 선언하고 공개할 함수만 public으로 만드는 것이 좋다.
* private 함수를 선언할 때 함수명을 _ 로 시작하는 것이 관례이다.
```
contract ZombieFactory {

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Zombie {
        string name;
        uint dna;
    }

    Zombie[] public zombies;

    function _createZombie(string _name, uint _dna) private {
        zombies.push(Zombie(_name, _dna));
    }
}
```

* 만약 함수가 반환값이 있다면 함수명(인자) 뒤에 returns (반환값 종류) 를 붙여야한다.
* 만약 함수가 값을 변경시키지 않는다면 view함수로 선언한다.
* 만약 함수가 앱의 어떤 데이터도 접근하지 않는다면 pure함수로 선언한다.
```
contract ZombieFactory {

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Zombie {
        string name;
        uint dna;
    }

    Zombie[] public zombies;

    function _createZombie(string _name, uint _dna) private {
        zombies.push(Zombie(_name, _dna));
    } 

    function _generateRandomDna(string _str) private view returns (uint) {
        uint rand = uint(keccak256(_str));
        return rand % dnaModulus;
    }

    function createRandomZombie(string _name) public {
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
    }

}

```

* 컨트랙트가 블록체인상에서 앱의 사용자 단에 액션이 발생했을 때 이벤트를 통해 의사소통을 한다.
* 컨트랙트는 특정 이벤트가 일어나는지 "귀를 기울이고" 그 이벤트가 발생하면 행동을 취한다.
* 이벤트는 컨트랙트의 맨 위단에서 선언해준다.
```
pragma solidity ^0.4.19;

contract ZombieFactory {

    event NewZombie(uint zombieId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Zombie {
        string name;
        uint dna;
    }

    Zombie[] public zombies;

    function _createZombie(string _name, uint _dna) private {
        uint id = zombies.push(Zombie(_name, _dna)) - 1;
        NewZombie(id, _name, _dna);
    }

    function _generateRandomDna(string _str) private view returns (uint) {
        uint rand = uint(keccak256(_str));
        return rand % dnaModulus;
    }

    function createRandomZombie(string _name) public {
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
    }

}

```