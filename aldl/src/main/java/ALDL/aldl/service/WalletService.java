package ALDL.aldl.service;

import ALDL.aldl.DTO.CreateWalletDTO;
import ALDL.aldl.db.WalletRepository;
import ALDL.aldl.model.Wallet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@Transactional
public class WalletService {

    @Autowired
    private WalletRepository walletRepository;

    public void create(CreateWalletDTO createWalletDTO){
        Wallet w = new Wallet(createWalletDTO.getAddress(), createWalletDTO.getEmail(), createWalletDTO.getPrivateKey(), 0, BigDecimal.valueOf(0), 0);
        try{
            walletRepository.save(w);
        }catch (Exception e){
            System.out.println(e);
        }
    }
}
