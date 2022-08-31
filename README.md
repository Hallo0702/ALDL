# C207

## 8/29

virtual box , vagrant 설치 및 설정

## 8/30

geth 설치

sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get install ethereum
geth version

geth account new --datadir ~/dev/eth_localdata

genesis.json
geth --datadir ~/dev/eth_localdata init genesis.json

eth0
geth --networkid 921 --nodiscover --maxpeers 2 --datadir ~/dev/eth_localdata --http --http.addr "0.0.0.0" --http.port 8545 --http.corsdomain "\*" --http.api "db,eth,debug,miner,net,personal,web3" --allow-insecure-unlock console

eth1
geth --networkid 921 --nodiscover --maxpeers 2 --datadir ~/dev/eth_localdata --allow-insecure-unlock console

피어연결에서 막힘
로컬환경이 아닌게 걸림

## 8/31

###계정생성
personal.newAccount()

### 마이닝

miner.setEtherbase(eth.accounts[0])
miner.start(1)
miner.stop()

personal.unlockAccount(eth.accounts[0])

eth.sendTransaction({from:eth.accounts[0],to:eth.accounts[1],value:web3.toWei(10,"Ether")})

### 피어연결

admin.nodeInfo.enode

admin.addPeer()
