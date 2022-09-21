package ALDL.aldl.controller;

import ALDL.aldl.auth.UserLoginPostReq;
import ALDL.aldl.model.Message;
import ALDL.aldl.model.StatusEnum;
import ALDL.aldl.service.UserService;
import ALDL.aldl.service.UserSha256;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.Map;

@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/auth")
public class UserController {
    @Autowired
    UserService userService;

    //회원가입
    @ApiOperation(value = "사용자회원가입")
    @CrossOrigin(origins="*")
    @PostMapping(path="/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String,String> info){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

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
                message.setResponseType("유효하지 않은 정보");
                message.setStatus(StatusEnum.BAD_REQUEST);

                return new ResponseEntity<>(message,headers,HttpStatus.OK);
            }
            if (userService.checkEmail(email) != null){
                message.setResponseType("존재하는 이메일");
                message.setStatus(StatusEnum.BAD_REQUEST);
                return new ResponseEntity<>(message,headers,HttpStatus.OK);
            }
            if (userService.checkNickname(nickname) != null){
                message.setResponseType("존재하는 닉네임");
                message.setStatus(StatusEnum.BAD_REQUEST);
                return new ResponseEntity<>(message,headers,HttpStatus.OK);
            }


            userService.signupUser(email,password,name,nickname);

            message.setResponseType("회원가입 완료");
            message.setStatus(StatusEnum.OK);
            return new ResponseEntity<>(message,headers,HttpStatus.OK);

        }catch(Exception e){
            message.setResponseType("에러 발생");
            message.setStatus(StatusEnum.FORBIDDEN);
            return new ResponseEntity<>(message,headers,HttpStatus.OK);
        }


    }
    //이메일 중복확인
    @ApiOperation(value = "이메일 중복확인")
    @CrossOrigin(origins="*")
    @GetMapping("/emailduplicate")
    @ResponseBody
    public ResponseEntity<?> validemail(@RequestParam String email){

        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        try{
            if (email != null && !email.equals("")){
                if (userService.checkEmail(email) != null){
                    message.setStatus(StatusEnum.BAD_REQUEST);
                    message.setResponseType("존재하는 이메일");
                    return new ResponseEntity<>(message,headers,HttpStatus.OK);
                }
                else{
                    message.setResponseType("존재하지 않는 이메일!");
                    message.setStatus(StatusEnum.OK);
                    return new ResponseEntity<>(message,headers,HttpStatus.OK);
                }
            }
            else{
                message.setResponseType("비어있는 이메일");
                message.setStatus(StatusEnum.BAD_REQUEST);
                return new ResponseEntity<>(message,headers,HttpStatus.OK);
            }
        }catch(Exception e){
            message.setStatus(StatusEnum.NOT_FOUND);
            message.setResponseType("에러 발생");
            return new ResponseEntity<>(message,headers,HttpStatus.OK);
        }
    }
    //닉네임(별명) 중복확인

    @ApiOperation(value = "닉네임 중복확인")
    @CrossOrigin(origins="*")
    @GetMapping("/nicknameduplicate")
    @ResponseBody
    public ResponseEntity<?> validnickname(@RequestParam String nickname){

        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        try{
            if (nickname != null && !nickname.equals("")){
                if (userService.checkNickname(nickname) != null){
                    message.setStatus(StatusEnum.BAD_REQUEST);
                    message.setResponseType("존재하는 닉네임");
                    return new ResponseEntity<>(message,headers,HttpStatus.OK);
                }
                else{
                    message.setResponseType("존재하지 않는 닉네임!");
                    message.setStatus(StatusEnum.OK);
                    return new ResponseEntity<>(message,headers,HttpStatus.OK);
                }
            }
            else{
                message.setResponseType("비어있는 닉네임");
                message.setStatus(StatusEnum.BAD_REQUEST);
                return new ResponseEntity<>(message,headers,HttpStatus.OK);
            }
        }catch(Exception e){
            message.setStatus(StatusEnum.NOT_FOUND);
            message.setResponseType("에러 발생");
            return new ResponseEntity<>(message,headers,HttpStatus.OK);
        }
    }
    //로그인
    @ApiOperation(value = "사용자 로그인")
    @CrossOrigin(origins="*")
    @GetMapping("/login")
    @ResponseBody
    public ResponseEntity<?> login(@RequestParam String email,@RequestParam  String password){

        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));


        try{
            System.out.println("현재위치확인 // 로그인");
            if (email != null && !email.equals("")){

                if (userService.checkEmail(email) != null){
                    String password_encrypt = UserSha256.encrypt(password);
                    if (userService.checkPassword(email,password_encrypt)!=null){
                        UserLoginPostReq loginPostReq  = userService.userLogin(email);
                        message.setAccessToken(loginPostReq.getAccessToken());
                        message.setRefreshToken(loginPostReq.getRefreshToken());
                        message.setStatus(StatusEnum.OK);
                        message.setResponseType("Login:로그인성공");
                        return new ResponseEntity<>(message,headers, HttpStatus.OK);
                    }
                    else{
                        message.setResponseType("Login:아이디와 비밀번호를 확인해주세요");
                        message.setStatus(StatusEnum.BAD_REQUEST);

                        return new ResponseEntity<>(message,headers,HttpStatus.OK);
                    }

                }
                else{
                    message.setResponseType("Login:아이디와 비밀번호를 확인해주세요");
                    message.setStatus(StatusEnum.BAD_REQUEST);

                    return new ResponseEntity<>(message,headers,HttpStatus.OK);
                }
            }
            else{
                message.setResponseType("Login:아이디와 비밀번호를 확인해주세요");
                message.setStatus(StatusEnum.BAD_REQUEST);

                return new ResponseEntity<>(message,headers,HttpStatus.OK);
            }
        }catch(Exception e){
            message.setResponseType("Login:에러발생");
            message.setStatus(StatusEnum.NOT_FOUND);

            return new ResponseEntity<>(message,headers,HttpStatus.OK);
        }
    }

    //로그아웃
    //토큰 작성 요망
    @ApiOperation(value = "사용자 로그아웃")
    @CrossOrigin(origins="*")
    @PostMapping("/logout")
    @ResponseBody
    public ResponseEntity<?> logout(@RequestBody Map<String, String> body){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            userService.logoutMember(body.get("refreshToken"));
            message.setStatus(StatusEnum.OK);
            message.setResponseType("로그아웃 성공");
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (Exception e){
            message.setStatus(StatusEnum.BAD_REQUEST);
            message.setResponseType("ACCESS TOKEN이 일치하지 않습니다.");
            return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);
        }

    }
    //비밀번호 수정
    @ApiOperation(value = "사용자 비밀번호 수정")
    @CrossOrigin(origins="*")
    @PostMapping(path="/ModifyPassword")
    public ResponseEntity<?> ModifyPassword(@RequestBody Map<String,String> info){
        String email = info.get("email");
        String password = UserSha256.encrypt(info.get("password"));
        String new_password = UserSha256.encrypt(info.get("new_password"));

        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        try {
            if (userService.checkEmail(email) != null){
                if (userService.checkPassword(email,password)!=null){

                    userService.ModifingPassword(email,new_password);

                    message.setResponseType("ModifyPassword:비밀번호 수정완료");
                    message.setStatus(StatusEnum.OK);
                    System.out.println("ModifyPassword:비밀번호 수정완료");

                    return new ResponseEntity<>(message,headers,HttpStatus.OK);
                }
                else{
                    message.setResponseType("ModifyPassword:비밀번호 확인하세요");
                    message.setStatus(StatusEnum.BAD_REQUEST);
                    System.out.println("ModifyPassword:비밀번호 확인하세요");

                    return new ResponseEntity<>(message,headers,HttpStatus.OK);
                }
            }
            else{
                message.setResponseType("ModifyPassword:이메일을 확인하세요");
                message.setStatus(StatusEnum.BAD_REQUEST);
                System.out.println("ModifyPassword:이메일을 확인하세요");

                return new ResponseEntity<>(message,headers,HttpStatus.OK);
            }
        }
        catch (Exception e){
            message.setResponseType("ModifyPassword: 에러발생");
            message.setStatus(StatusEnum.NOT_FOUND);
            System.out.println("ModifyPassword:에러발생");

            return new ResponseEntity<>(message,headers,HttpStatus.OK);
        }
    }
    //닉네임 수정
    @ApiOperation(value = "사용자 닉네임 수정")
    @CrossOrigin(origins="*")
    @PostMapping(path="/ModifyNickname")
    public ResponseEntity<?> ModifyNickname(@RequestBody Map<String,String> info){
        String email = info.get("email");
        String nickname = info.get("new_nickname");

        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        try {
            if (nickname != null && !nickname.equals("")){
                if (userService.checkNickname(nickname) != null){
                    message.setStatus(StatusEnum.BAD_REQUEST);
                    message.setResponseType("존재하는 닉네임");
                    return new ResponseEntity<>(message,headers,HttpStatus.OK);

                }
                else{
                    userService.ModifingNickname(email,nickname);
                    message.setResponseType("닉네임 변경 완료");
                    message.setStatus(StatusEnum.OK);
                    return new ResponseEntity<>(message,headers,HttpStatus.OK);

                }
            }
            else{
                message.setStatus(StatusEnum.BAD_REQUEST);
                message.setResponseType("닉네임을 확인해주세요");
                return new ResponseEntity<>(message,headers,HttpStatus.OK);

            }
        }
        catch (Exception e){
            message.setResponseType("에러 발생!");
            message.setStatus(StatusEnum.NOT_FOUND);
            return new ResponseEntity<>(message,headers,HttpStatus.OK);

        }
    }
    //비밀번호 찾기
    @ApiOperation(value = "비밀번호 찾기/초기화")
    @CrossOrigin(origins="*")
    @PostMapping(path="/ResetPassword")
    public ResponseEntity<?> ResetPassword(@RequestBody Map<String,String> info){
        String email = info.get("email");
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            if (email !=null && !email.equals("")){
                Integer v = (int)Math.floor(Math.random() * 1000000);
                String new_password = UserSha256.encrypt(v.toString());
                userService.ModifingPassword(email,new_password);

                message.setResponseType(String.valueOf(v));
                message.setStatus(StatusEnum.OK);
                return new ResponseEntity<>(message,headers,HttpStatus.OK);
            }
            else{
                message.setResponseType("이메일오류");
                message.setStatus(StatusEnum.BAD_REQUEST);
                return new ResponseEntity<>(message,headers,HttpStatus.OK);
            }

        }
        catch (Exception e){
            message.setResponseType("에러발생");
            message.setStatus(StatusEnum.NOT_FOUND);
            return new ResponseEntity<>(message,headers,HttpStatus.OK);
        }
    }
    @ApiOperation(value = "사용자 로그인")
    @CrossOrigin(origins="*")
    @GetMapping("/checkAuthCode")
    @ResponseBody
    private ResponseEntity<?> checkAuthCode(@RequestParam String email,@RequestParam  String authCode) {
        Message message = new Message();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        try {
            if (email != null && !email.equals("")) {
                if (userService.vaildAuthCode(email,authCode)) {
                    message.setResponseType("인증번호가 일치합니다");
                    message.setStatus(StatusEnum.OK);
                    return new ResponseEntity<>(message, headers, HttpStatus.OK);

                } else {
                    message.setResponseType("인증번호가 일치하지 않습니다");
                    message.setStatus(StatusEnum.BAD_REQUEST);
                    return new ResponseEntity<>(message, headers, HttpStatus.OK);

                }


            } else {
                message.setResponseType("이메일정보가 정확하지 않습니다");
                message.setStatus(StatusEnum.BAD_REQUEST);
                return new ResponseEntity<>(message, headers, HttpStatus.OK);
            }

        } catch (Exception e) {
            message.setResponseType("에러발생");
            message.setStatus(StatusEnum.NOT_FOUND);
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        }

    }



}
