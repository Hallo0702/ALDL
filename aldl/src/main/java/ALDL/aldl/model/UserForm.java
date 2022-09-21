package ALDL.aldl.model;

import lombok.Data;

@Data
public class UserForm {
    private long id;
    private String email;
    private String password;
    private String name;
    private String nickname;

    private String refreshToken;

    private String authCode;
    public void changeRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }
    public void deleteRefreshToken(){
        this.refreshToken = null;
    }

    public User toEntity(){
        return User.builder()
                .email(email)
                .password(password)
                .name(name)
                .nickname(nickname)
                .authCode(authCode)
                .build();
    }

}
