package ALDL.aldl.model;

import lombok.Data;

@Data
public class UserForm {
    private long id;
    private String email;
    private String password;
    private String name;
    private String nickname;

    public User toEntity(){
        return User.builder()
                .email(email)
                .password(password)
                .name(name)
                .nickname(nickname)
                .build();
    }

}
