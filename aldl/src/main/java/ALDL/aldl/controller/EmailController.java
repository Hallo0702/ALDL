package ALDL.aldl.controller;


import ALDL.aldl.model.Message;
import ALDL.aldl.model.StatusEnum;
import ALDL.aldl.service.UserService;
import ALDL.aldl.service.UserSha256;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.Map;

@RestController
@Controller
@CrossOrigin(origins = {"http://localhost:3000", "https://aldl.kro.kr"},allowCredentials = "true")
public class EmailController {
    @Autowired
    UserService userService;
    @Autowired
    private JavaMailSender javaMailSender;

    @ApiOperation(value = "이메일로 인증번호 보내기")
    @PatchMapping(path="/sendAuthCode")
    public ResponseEntity<String> sendAuthCode(@RequestBody Swagger_email info){
        String email = info.getEmail();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        try{
            if (email !=null && !email.equals("")){
                Integer v = (int)Math.floor(Math.random() * 1000000);
                String authCode = v.toString();
                String to = email;
                String from = "jihun3104@aldl.com";
                String subject = "알록달록 인증센터";

                StringBuilder body = new StringBuilder();
                body.append("<html> <body><h1>알록달록 인증센터입니다 </h1>");
                body.append("<div>발급된 인증번호를 입력하시면 인증이 진행됩니다 </div>");
                body.append("<div>인증번호는 <h3>"+authCode +"</h3> 입니다</div> </body></html>");
                System.out.println(authCode);

                MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

                mimeMessageHelper.setFrom(from,"알록달록");
                mimeMessageHelper.setTo(to);
                mimeMessageHelper.setSubject(subject);
                mimeMessageHelper.setText(body.toString(), true);

                userService.updateAuthCode(email,authCode);

                javaMailSender.send(mimeMessage);


                return new ResponseEntity<>("이메일전송완료",headers,HttpStatus.OK);
            }
            else{

                return new ResponseEntity<>("이메일오류",headers, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){

            return new ResponseEntity<>("에러발생",headers,HttpStatus.BAD_REQUEST);
        }

    }
    @Getter
    public static class Swagger_email{
        @ApiModelProperty(example="사용자 이메일")
        String email;
    }
}
