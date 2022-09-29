package ALDL.aldl.service;


import ALDL.aldl.db.WalletRepository;
import ALDL.aldl.model.Wallet;
import com.amazonaws.services.kms.model.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContextException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.Transfer;
import org.web3j.utils.Convert;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.net.URL;

@Service
@RequiredArgsConstructor
public class WalletService {

    @Value("0000")
    private String PASSWORD;


    @Autowired
    private WalletRepository walletRepository;




    public Wallet create(Wallet wallet){
        Wallet w = Wallet.builder().email(wallet.getEmail()).address(wallet.getAddress()).privateKey(wallet.getPrivateKey()).build();
        return walletRepository.save(w);
    }

    @Transactional
    public Wallet syncBalance(String address, String balance){
        Wallet w = walletRepository.findWalletByAddress(address).orElse(null);

        if (w == null) {
            return null;
        } else {
            w.setBalance(balance);
            return w;
        }
    }

    public String getBalance(String address){
        EthGetBalance ethBalanceResponse = null;

        Web3j web3j = Web3j.build(new HttpService("http://43.200.253.174:3000"));
        try {
            ethBalanceResponse = web3j.ethGetBalance(address, DefaultBlockParameterName.LATEST).sendAsync().get();
            BigInteger ethbalance = ethBalanceResponse.getBalance();
            String ethb = String.valueOf(ethbalance);
            return ethb;
        } catch (Exception e) {
            System.out.println(ethBalanceResponse);
            return null;
        }
    }

    @Transactional
    public Wallet requestEth(String address){
        try {
            Wallet wallet = walletRepository.findWalletByAddress(address).orElse(null);
            if (wallet == null){
                throw new NotFoundException("지갑이 존재하지 않습니다.");
            }

            Web3j web3 = Web3j.build(new HttpService("http://43.200.253.174:3000"));
            URL url = getClass().getClassLoader().getResource("admin.wallet");
            String filepath = url.getFile();
            System.out.println(filepath);
            Credentials credentials = WalletUtils.loadCredentials(PASSWORD, filepath);
            Transfer transfer = new Transfer(web3, new RawTransactionManager(web3, credentials, 921));
            TransactionReceipt transactionReceipt = transfer.sendFunds(address, new BigDecimal(1), Convert.Unit.ETHER).send();
            if (transactionReceipt == null || transactionReceipt.equals("")){
                throw new ApplicationContextException("트랜잭션을 보낼 수 없습니다.");
            }

            return syncBalance(address, getBalance(address));

        } catch (Exception e) {
            return null;
        }

    }
}
