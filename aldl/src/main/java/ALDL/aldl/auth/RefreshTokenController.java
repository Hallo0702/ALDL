package ALDL.aldl.auth;

import ALDL.aldl.model.Message;
import ALDL.aldl.model.StatusEnum;
import ALDL.aldl.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.Charset;
import java.nio.file.AccessDeniedException;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class RefreshTokenController {

    private final UserService userService;
    private UserLoginPostReq loginPostReq;

    @GetMapping("/token/expired")
    public String auth() {
        throw new RuntimeException();
    }

    //@ApiOperation(value = "access token 재발급 요청", notes = "refreshtoken으로 accesstoken 재발급")
    @PostMapping("/token/refresh")
    public ResponseEntity<?> tokenRefresh(@RequestBody Map<String, String> body) throws Exception {
        Message message = new Message();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        String refreshToken = body.get("refreshToken");
        System.out.println(refreshToken + "  : refresh");

        try {
            loginPostReq = userService.refreshToken(refreshToken);
            System.out.println("check");

            String email = loginPostReq.getEmail();
            String accesstoken = loginPostReq.getAccessToken();
            String new_refreshToken = loginPostReq.getRefreshToken();

            System.out.println(accesstoken + "    : access");
            System.out.println(email + "    :   userid ");

            message.setStatus(StatusEnum.OK);
            message.setAccessToken(accesstoken);
            message.setRefreshToken(new_refreshToken);
            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        } catch (AccessDeniedException e) {
            e.printStackTrace();
            message.setResponseType("AccessDeniedException");
            message.setStatus(StatusEnum.UNAUTHORIZED);
            return new ResponseEntity<>(message, headers, HttpStatus.UNAUTHORIZED);
        } catch (IllegalStateException e) {
            e.printStackTrace();
            return new ResponseEntity<String>("RE LOGIN", HttpStatus.PAYMENT_REQUIRED);
        } catch (Exception e) {
            e.printStackTrace();
            message.setStatus(StatusEnum.INTERNAL_SERVER_ERROR);
            return new ResponseEntity<>(message, headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
