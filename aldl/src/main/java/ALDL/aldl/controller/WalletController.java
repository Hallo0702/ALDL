package ALDL.aldl.controller;

import ALDL.aldl.DTO.CreateWalletDTO;
import ALDL.aldl.model.Wallet;
import ALDL.aldl.service.WalletService;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/wallet")
public class WalletController {

    @Autowired
    WalletService walletService;

    @PostMapping(path="/create")
    public ResponseEntity<String> create(@RequestBody CreateWalletDTO createWalletDTO){
        try {
            walletService.create(createWalletDTO);
            return new ResponseEntity<>("지갑 생성 성공", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("지갑 생성 실패", HttpStatus.BAD_REQUEST);
        }
    }



}
