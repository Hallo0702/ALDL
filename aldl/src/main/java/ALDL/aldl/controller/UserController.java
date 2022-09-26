package ALDL.aldl.controller;

import ALDL.aldl.auth.UserLoginPostReq;
import ALDL.aldl.model.Message;
import ALDL.aldl.model.StatusEnum;
import ALDL.aldl.model.User;
import ALDL.aldl.service.UserService;
import ALDL.aldl.service.UserSha256;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Entity;
import java.nio.charset.Charset;
import java.util.Map;

@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:3000", "https://aldl.kro.kr"},allowCredentials = "true")
public class UserController {
    @Autowired
    UserService userService;

    //회원가입
    @ApiOperation(value = "사용자회원가입")
    @PostMapping(path="/signup")
    public ResponseEntity<String> signup(@RequestBody Swagger_signup info){
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        String email = info.getEmail();
        String password = UserSha256.encrypt(info.getPassword());
        String name = info.getName();
        String nickname = info.getNickname();
        try{
            if(
                    email==""||email==null||
                            password==""||password==null||
                            name==""||name==null||
                            nickname==""||nickname==null
            ){
                return new ResponseEntity<>("유효하지 않은 정보",headers,HttpStatus.BAD_REQUEST);
            }
            if (userService.checkEmail(email) != null){

                return new ResponseEntity<>("존재하는 이메일",headers,HttpStatus.BAD_REQUEST);
            }
            if (userService.checkNickname(nickname) != null){
                return new ResponseEntity<>("존재하는 닉네임",headers,HttpStatus.BAD_REQUEST);
            }


            userService.signupUser(email,password,name,nickname);
            return new ResponseEntity<>("회원가입 완료",headers,HttpStatus.OK);

        }catch(Exception e){
            return new ResponseEntity<>("에러발생",headers,HttpStatus.NOT_FOUND);
        }


    }
    //이메일 중복확인
    @ApiOperation(value = "이메일 중복확인")
    @GetMapping("/emailduplicate")
    @ResponseBody
    public ResponseEntity<String> validemail(@RequestParam String email){
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        try{
            if (email != null && !email.equals("")){
                if (userService.checkEmail(email) != null){
                    return new ResponseEntity<>("존재하는 이메일",headers,HttpStatus.BAD_REQUEST);
                }
                else{
                    return new ResponseEntity<>("존재하지 않는 이메일!",headers,HttpStatus.OK);
                }
            }
            else{
                return new ResponseEntity<>("비어있는 이메일",headers,HttpStatus.BAD_REQUEST);
            }
        }catch(Exception e){
            return new ResponseEntity<>("에러 발생",headers,HttpStatus.NOT_FOUND);
        }
    }
    //닉네임(별명) 중복확인

    @ApiOperation(value = "닉네임 중복확인")
    @GetMapping("/nicknameduplicate")
    @ResponseBody
    public ResponseEntity<String> validnickname(@RequestParam String nickname){

        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        try{
            if (nickname != null && !nickname.equals("")){
                if (userService.checkNickname(nickname) != null){
                    return new ResponseEntity<>("존재하는 닉네임",headers,HttpStatus.BAD_REQUEST);
                }
                else{
                    return new ResponseEntity<>("존재하지 않는 닉네임!",headers,HttpStatus.OK);
                }
            }
            else{
                return new ResponseEntity<>("비어있는 닉네임",headers,HttpStatus.BAD_REQUEST);
            }
        }catch(Exception e){
            return new ResponseEntity<>("에러 발생",headers,HttpStatus.NOT_FOUND);
        }
    }
    //로그인
    @ApiOperation(value = "사용자 로그인")
    @GetMapping("/login")
    @ResponseBody
    public ResponseEntity<Message> login(@RequestParam String email,@RequestParam  String password){

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
    @DeleteMapping("/logout")
    @ResponseBody
    public ResponseEntity<String> logout(@RequestBody Swagger_Logout info){
        String refreshToken = info.getRefreshToken();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            userService.logoutMember(refreshToken);
            return new ResponseEntity<>("로그아웃 성공", headers, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>("ACCESS TOKEN이 일치하지 않습니다.", headers, HttpStatus.BAD_REQUEST);
        }

    }
    //비밀번호 수정
    @ApiOperation(value = "사용자 비밀번호 수정")
    @PatchMapping(path="/ModifyPassword")
    public ResponseEntity<String> ModifyPassword(@RequestBody Swagger_Modifypassword info){
        String email = info.getEmail();
        String new_password = UserSha256.encrypt(info.getNew_password());
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        try {
            if (userService.checkEmail(email) != null){
                if (userService.checkPassword(email,new_password)!=null){
                    userService.ModifingPassword(email,new_password);
                    return new ResponseEntity<>("비밀번호 수정완료",headers,HttpStatus.OK);
                }
                else{
                    return new ResponseEntity<>("비밀번호 확인하세요",headers,HttpStatus.BAD_REQUEST);
                }
            }
            else{

                return new ResponseEntity<>("이메일을 확인하세요",headers,HttpStatus.BAD_REQUEST);
            }
        }
        catch (Exception e){
            return new ResponseEntity<>("에러발생",headers,HttpStatus.NOT_FOUND);
        }
    }
    //닉네임 수정
    @ApiOperation(value = "사용자 닉네임 수정")
    @PatchMapping(path="/ModifyNickname")
    public ResponseEntity<String> ModifyNickname(@RequestBody Swagger_ModifyNickname info){
        String email = info.getEmail();
        String nickname = info.getNew_nickname();

        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        try {
            if (nickname != null && !nickname.equals("")){
                if (userService.checkNickname(nickname) != null){
                    return new ResponseEntity<>("존재하는 닉네임",headers,HttpStatus.BAD_REQUEST);
                }
                else{
                    userService.ModifingNickname(email,nickname);
                    return new ResponseEntity<>("닉네임 변경 완료",headers,HttpStatus.OK);

                }
            }
            else{
                return new ResponseEntity<>("닉네임을 확인해주세요",headers,HttpStatus.BAD_REQUEST);

            }
        }
        catch (Exception e){

            return new ResponseEntity<>("에러 발생!",headers,HttpStatus.NOT_FOUND);

        }
    }
    //비밀번호 찾기
//    @ApiOperation(value = "비밀번호 찾기/초기화")
//    @CrossOrigin(origins="*")
//    @PostMapping(path="/ResetPassword")
//    public ResponseEntity<String> ResetPassword(@RequestBody Map<String,String> info){
//        String email = info.get("email");
//        Message message = new Message();
//        HttpHeaders headers= new HttpHeaders();
//        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
//        try {
//            if (email !=null && !email.equals("")){
//                Integer v = (int)Math.floor(Math.random() * 1000000);
//                String new_password = UserSha256.encrypt(v.toString());
//                userService.ModifingPassword(email,new_password);
//
//                message.setResponseType(String.valueOf(v));
//                message.setStatus(StatusEnum.OK);
//                return new ResponseEntity<>(message,headers,HttpStatus.OK);
//            }
//            else{
//                message.setResponseType("이메일오류");
//                message.setStatus(StatusEnum.BAD_REQUEST);
//                return new ResponseEntity<>(message,headers,HttpStatus.OK);
//            }
//
//        }
//        catch (Exception e){
//            message.setResponseType("에러발생");
//            message.setStatus(StatusEnum.NOT_FOUND);
//            return new ResponseEntity<>(message,headers,HttpStatus.OK);
//        }
//    }
    @ApiOperation(value = "인증번호 체크")
    @GetMapping("/checkAuthCode")
    @ResponseBody
    private ResponseEntity<String> checkAuthCode(@RequestParam String email,@RequestParam  String authCode) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        try {
            if (email != null && !email.equals("")) {
                if (userService.vaildAuthCode(email,authCode)) {
                    return new ResponseEntity<>("인증번호가 일치합니다", headers, HttpStatus.OK);

                } else {

                    return new ResponseEntity<>("인증번호가 일치하지 않습니다", headers, HttpStatus.BAD_REQUEST);

                }


            } else {
                return new ResponseEntity<>("이메일정보가 정확하지 않습니다", headers, HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            return new ResponseEntity<>("에러발생", headers, HttpStatus.NOT_FOUND);
        }

    }

    //Swagger 전용 Class
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Swagger_signup{
        @ApiModelProperty(example = "사용자 이메일")
        String email ;
        @ApiModelProperty(example = "사용자 비밀번호")
        String password;
        @ApiModelProperty(example = "사용자 이름")
        String name;
        @ApiModelProperty(example = "사용자 닉네임")
        String nickname;
    }
    @Getter
    public static class Swagger_Modifypassword{
        @ApiModelProperty(example="사용자 이메일")
        String email;
        @ApiModelProperty(example = "사용자 새로운 비밀번호")
        String new_password;


    }
    @Getter
    public static class Swagger_ModifyNickname{
        @ApiModelProperty(example = "사용자 새로운 닉네임")
        String new_nickname;
        @ApiModelProperty(example="사용자 이메일")
        String email;

    }
    @Getter
    public static class Swagger_Logout{
        @ApiModelProperty(example="리프레시 토큰")
        String refreshToken;

    }

}
