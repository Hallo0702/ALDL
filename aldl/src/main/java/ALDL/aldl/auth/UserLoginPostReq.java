package ALDL.aldl.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserLoginPostReq {

    String email;
    String name;
    String nickname;
    String accessToken;
    String refreshToken;

}