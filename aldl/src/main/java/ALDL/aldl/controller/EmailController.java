package ALDL.aldl.controller;


import ALDL.aldl.model.Message;
import ALDL.aldl.model.StatusEnum;
import ALDL.aldl.service.UserService;
import ALDL.aldl.service.UserSha256;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.Map;

@RestController
@Controller
public class EmailController {
    @Autowired
    UserService userService;
    @Autowired
    private JavaMailSender javaMailSender;

    @PostMapping(path="/sendAuthCode")
    public ResponseEntity<?> sendAuthCode(@RequestBody Map<String,String> info) throws MessagingException, UnsupportedEncodingException{
        String email = info.get("email");
        Message message = new Message();
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

                message.setResponseType("이메일전송완료");
                message.setStatus(StatusEnum.OK);
                return new ResponseEntity<>(message,headers,HttpStatus.OK);
            }
            else{
                message.setResponseType("이메일오류");
                message.setStatus(StatusEnum.BAD_REQUEST);
                return new ResponseEntity<>(message,headers, HttpStatus.OK);
            }
        }catch (Exception e){
            message.setResponseType("에러발생");
            message.setStatus(StatusEnum.NOT_FOUND);
            return new ResponseEntity<>(message,headers,HttpStatus.OK);
        }

    }
}
