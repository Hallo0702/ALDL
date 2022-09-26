package ALDL.aldl.model;


import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String email;

    @Column
    private String password;

    @Column
    private String name;

    @Column
    private String nickname;

    @Column
    private String refreshToken;

    @Column
    private String authCode;


    public void changeRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }
    public void deleteRefreshToken(){
        this.refreshToken = null;
    }

    @Builder
    public User(String email, String password, String name, String nickname,String refreshToken,String authCode){
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
        this.refreshToken = refreshToken;
        this.authCode = authCode;
    }



}
