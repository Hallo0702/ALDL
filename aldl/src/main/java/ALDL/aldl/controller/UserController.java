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
        try{
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
        }catch(Exception e){
            return ResponseEntity.status(500).body("에러발생");
        }


    }
    //이메일 중복확인
    @ApiOperation(value = "이메일 중복확인")
    @CrossOrigin(origins="*")
    @GetMapping("/emailduplicate")
    @ResponseBody
    public ResponseEntity<?> validemail(@RequestParam String email){
        try{
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
        }catch(Exception e){
            return ResponseEntity.status(500).body("에러발생");
        }
    }
    //닉네임(별명) 중복확인

    @ApiOperation(value = "닉네임 중복확인")
    @CrossOrigin(origins="*")
    @GetMapping("/nicknameduplicate")
    @ResponseBody
    public ResponseEntity<?> validnickname(@RequestParam String nickname){
        try{


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
        }catch(Exception e){
            return ResponseEntity.status(500).body("에러발생");
        }
    }
    //로그인
    @ApiOperation(value = "사용자 로그인")
    @CrossOrigin(origins="*")
    @GetMapping("/login")
    @ResponseBody
    public ResponseEntity<?> login(@RequestParam String email,@RequestParam  String password){
        try{
            if (email != null && !email.equals("")){

                if (userService.checkEmail(email) != null){
                    String password_encrypt = UserSha256.encrypt(password);
                    if (userService.checkPassword(email,password_encrypt)!=null){
                        System.out.println("Login:로그인성공");
                        return ResponseEntity.status(200).body("로그인 성공");
                    }
                    else{
                        System.out.println("Login:아이디와 비밀번호를 확인해주세요");
                        return ResponseEntity.status(400).body("아이디와 비밀번호를 확인해주세요");
                    }

                }
                else{
                    System.out.println("Login:아이디와 비밀번호를 확인해주세요");
                    return ResponseEntity.status(400).body("아이디와 비밀번호를 확인해주세요");
                }
            }
            else{
                System.out.println("Login:아이디와 비밀번호를 확인해주세요");
                return ResponseEntity.status(400).body("아이디와 비밀번호를 확인해주세요");
            }
        }catch(Exception e){
            System.out.println("Login:에러발생");
            return ResponseEntity.status(500).body("에러발생");
        }
    }

    //로그아웃
    //토큰 작성 요망
    @ApiOperation(value = "사용자 로그아웃")
    @CrossOrigin(origins="*")
    @PostMapping("/logout")
    @ResponseBody
    public void logout(@RequestParam String nickname){

    }
    //비밀번호 수정
    @ApiOperation(value = "사용자 비밀번호 수정")
    @CrossOrigin(origins="*")
    @PostMapping(path="/ModifyPassword")
    public ResponseEntity<?> ModifyPassword(@RequestBody Map<String,String> info){
        String email = info.get("email");
        String password = UserSha256.encrypt(info.get("password"));
        String new_password = UserSha256.encrypt(info.get("new_password"));
        try {
            if (userService.checkEmail(email) != null){
                if (userService.checkPassword(email,password)!=null){

                    userService.ModifingPassword(email,new_password);
                    System.out.println("ModifyPassword:비밀번호 수정완료");
                    return ResponseEntity.status(200).body("비밀번호 수정 완료");
                }
                else{
                    System.out.println("ModifyPassword:비밀번호 확인하세요");
                    return ResponseEntity.status(400).body("비밀번호를 확인하세요");
                }
            }
            else{
                System.out.println("ModifyPassword:이메일을 확인하세요");
                return ResponseEntity.status(400).body("이메일을 확인하세요");

            }
        }
        catch (Exception e){
            System.out.println("ModifyPassword:에러발생");
            return ResponseEntity.status(500).body("에러발생");
        }
    }
    //닉네임 수정
    @ApiOperation(value = "사용자 닉네임 수정")
    @CrossOrigin(origins="*")
    @PostMapping(path="/ModifyNickname")
    public ResponseEntity<?> ModifyNickname(@RequestBody Map<String,String> info){
        String email = info.get("email");
        String nickname = info.get("new_nickname");
        try {
            if (nickname != null && !nickname.equals("")){
                if (userService.checkNickname(nickname) != null){
                    return ResponseEntity.status(400).body("존재하는 닉네임");
                }
                else{
                    userService.ModifingNickname(email,nickname);
                    return ResponseEntity.status(200).body("닉네임 변경 완료");
                }
            }
            else{
                return ResponseEntity.status(400).body("닉네임을 확인해주세요");
            }
        }
        catch (Exception e){
            return ResponseEntity.status(500).body("에러발생");
        }
    }
    //비밀번호 찾기
    @ApiOperation(value = "비밀번호 찾기/초기화")
    @CrossOrigin(origins="*")
    @PostMapping(path="/ResetPassword")
    public ResponseEntity<?> ResetPassword(@RequestBody Map<String,String> info){
        String email = info.get("email");
        try {
            if (email !=null && !email.equals("")){
                Integer v = (int)Math.floor(Math.random() * 1000000);
                String new_password = UserSha256.encrypt(v.toString());
                userService.ModifingPassword(email,new_password);
                return ResponseEntity.status(500).body(v);
            }

        }
        catch (Exception e){
            return ResponseEntity.status(500).body("에러발생");
        }
    }



}
