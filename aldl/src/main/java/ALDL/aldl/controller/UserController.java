package ALDL.aldl.controller;

import ALDL.aldl.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    //회원가입
    @CrossOrigin(origins="*")
    @PostMapping(path="/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String,String> info){

        userService.signupUser(info.get("email"),info.get("password"),info.get("name"),info.get("nickname"));
        return ResponseEntity.status(200).body("회원가입 완료");


    }
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
            return ResponseEntity.status(404).body("비어있는 닉네임");
        }
    }
    @CrossOrigin(origins="*")
    @GetMapping("/login")
    @ResponseBody
    public ResponseEntity<?> login(@RequestParam String email,@RequestParam  String password){
        if (email != null && !email.equals("")){
            if (userService.checkEmail(email) != null){
                if (userService.checkPassword(email,password)!=null){
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
            return ResponseEntity.status(404).body("아이디와 비밀번호를 확인해주세요");
        }
    }
    @CrossOrigin(origins="*")
    @PostMapping("/logout")
    @ResponseBody
    public void logout(@RequestParam String nickname){

    }


}
