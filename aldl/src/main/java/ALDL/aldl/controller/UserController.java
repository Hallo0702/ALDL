package ALDL.aldl.controller;

import ALDL.aldl.service.UserService;
import ALDL.aldl.service.UserSha256;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Api(value = "유저 API", tags = {"User"})
@RestController
public class UserController {
    @Autowired
    UserService userService;

    //회원가입
    @ApiOperation(value = "사용자회원가입")
    @CrossOrigin(origins="*")
    @PostMapping(path="/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String,String> info){
        String email = info.get("email");
        String password = UserSha256.encrypt(info.get("password"));
        String name = info.get("name");
        String nickname = info.get("nickname");

        if(
                email==""||email==null||
                        password==""||password==null||
                        name==""||name==null||
                        nickname==""||nickname==null
        ){
            return ResponseEntity.status(400).body("유효하지 않은 정보");
        }
        if (userService.checkEmail(email) != null){
            return ResponseEntity.status(400).body("존재하는 이메일");
        }
        if (userService.checkNickname(nickname) != null){
            return ResponseEntity.status(400).body("존재하는 닉네임");
        }


        userService.signupUser(email,password,name,nickname);

        return ResponseEntity.status(200).body("회원가입 완료");


    }
    //이메일 중복확인
    @ApiOperation(value = "이메일 중복확인")
    @CrossOrigin(origins="*")
    @GetMapping("/emailduplicate")
    @ResponseBody
    public ResponseEntity<?> validemail(@RequestParam String email){
        if (email != null && !email.equals("")){
            if (userService.checkEmail(email) != null){
                return ResponseEntity.status(200).body("존재하는 이메일");
            }
            else{
                return ResponseEntity.status(400).body("존재하지 않는 이메일");
            }
        }
        else{
            return ResponseEntity.status(404).body("비어있는 이메일");
        }
    }
    //닉네임(별명) 중복확인

    @ApiOperation(value = "닉네임 중복확인")
    @CrossOrigin(origins="*")
    @GetMapping("/nicknameduplicate")
    @ResponseBody
    public ResponseEntity<?> validnickname(@RequestParam String nickname){
        if (nickname != null && !nickname.equals("")){
            if (userService.checkNickname(nickname) != null){
                return ResponseEntity.status(200).body("존재하는 닉네임");
            }
            else{
                return ResponseEntity.status(400).body("존재하지 않는 닉네임");
            }
        }
        else{
            return ResponseEntity.status(400).body("비어있는 닉네임");
        }
    }
    //로그인
    @ApiOperation(value = "사용자 로그인")
    @CrossOrigin(origins="*")
    @GetMapping("/login")
    @ResponseBody
    public ResponseEntity<?> login(@RequestParam String email,@RequestParam  String password){
        if (email != null && !email.equals("")){
            if (userService.checkEmail(email) != null){
                String password_encrypt = UserSha256.encrypt(password);
                if (userService.checkPassword(email,password_encrypt)!=null){
                    return ResponseEntity.status(200).body("로그인 성공");
                }
                else{
                    return ResponseEntity.status(400).body("아이디와 비밀번호를 확인해주세요");
                }

            }
            else{
                return ResponseEntity.status(400).body("아이디와 비밀번호를 확인해주세요");
            }
        }
        else{
            return ResponseEntity.status(400).body("아이디와 비밀번호를 확인해주세요");
        }
    }

    //로그아웃
    @ApiOperation(value = "사용자 로그아웃")
    @CrossOrigin(origins="*")
    @PostMapping("/logout")
    @ResponseBody
    public void logout(@RequestParam String nickname){

    }


}
