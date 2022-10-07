package ALDL.aldl.controller;


import ALDL.aldl.auth.ALDLUserDetails;
import ALDL.aldl.auth.JwtTokenProvider;
import ALDL.aldl.model.User;
import ALDL.aldl.model.Wallet;
import ALDL.aldl.service.UserService;
import ALDL.aldl.service.WalletService;
import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;


@RestController
@RequestMapping("/wallet")
@CrossOrigin(origins = {"http://localhost:3000","https://aldl.kro.kr"},allowCredentials = "true")
public class WalletController {

    @Autowired
    WalletService walletService;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    UserService userService;


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

    @GetMapping(path="/myEth")
    public ResponseEntity<HashMap> syncEth(@RequestParam String address, HttpServletRequest httpServletRequest) {
        String refreshToken = httpServletRequest.getHeader("Authorization");
        Authentication authentication = jwtTokenProvider.getAuthentication(refreshToken);
        ALDLUserDetails aldlUserDetails = (ALDLUserDetails) authentication.getDetails();
        String Username = aldlUserDetails.getUsername();
        String UserEmail = aldlUserDetails.getEmail();
        String NickName = userService.getNickname(UserEmail).getNickname();


        Wallet wallet = walletService.syncBalance(address, walletService.getBalance(address));
        if (wallet == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } else {
            String balance = wallet.getBalance();
            HashMap hashMap = new HashMap();
            hashMap.put("name", Username);
            hashMap.put("email", UserEmail);
            hashMap.put("balance", balance);
            hashMap.put("nickname", NickName);
            return new ResponseEntity<>(hashMap, HttpStatus.OK);
        }
    }


}
