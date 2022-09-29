package ALDL.aldl.controller;


import ALDL.aldl.model.Wallet;
import ALDL.aldl.service.WalletService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/wallet")
@CrossOrigin(origins = {"http://localhost:3000","https://aldl.kro.kr"},allowCredentials = "true")

public class WalletController {

    @Autowired
    WalletService walletService;


    @ApiOperation(value = "지갑 생성")
    @PostMapping(path="/create")
    public ResponseEntity<String> create(@RequestBody Wallet wallet){
        try {
            walletService.create(wallet);
            return new ResponseEntity<>("지갑 생성 성공", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("지갑 생성 실패", HttpStatus.BAD_REQUEST);
        }
    }


    @PutMapping(path="/requestEth/{address}")
    public ResponseEntity<Wallet> requestEth(@PathVariable String address){
        Wallet wallet = walletService.requestEth(address);
        if (wallet == null) {
            return new ResponseEntity<>(wallet, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(wallet,HttpStatus.OK);
        }
    }

}
