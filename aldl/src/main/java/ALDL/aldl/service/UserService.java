package ALDL.aldl.service;

import ALDL.aldl.auth.JwtTokenProvider;
import ALDL.aldl.auth.UserLoginPostReq;
import ALDL.aldl.db.UserRepository;
import ALDL.aldl.model.User;
import ALDL.aldl.model.UserForm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    public void signupUser(String email, String password, String name, String nickname){
        UserForm userForm = new UserForm();
        userForm.setEmail(email);
        userForm.setPassword(password);
        userForm.setName(name);
        userForm.setNickname(nickname);

        User user = userForm.toEntity();
        userRepository.save(user);

    }

    public String checkEmail(String email) {
        String emailvalue = userRepository.validEmail(email);
        return emailvalue;
    }
    public String checkNickname(String nickname) {
        String nickvalue = userRepository.validNickname(nickname);
        return nickvalue;
    }
    public String checkPassword(String email,String password){
        String check = userRepository.validPassword(email,password);
        return check;
    }

    public UserForm getUserByUserEmail(String userEmail) {
        // 디비에 유저 정보 조회 (userEmail 를 통한 조회).
        System.out.println("유저email 체크" + userEmail);
        UserForm userForm = userRepository.findByUserEmail(userEmail).orElseGet(null);
        return userForm;
    }
    @Transactional
    public UserLoginPostReq userLogin(String userEmail) throws Exception {
        UserForm user = getUserByUserEmail(userEmail);

        // 리프레쉬 토큰 발급
        user.changeRefreshToken(jwtTokenProvider.createRefreshToken(userEmail));
        UserLoginPostReq userLoginPostReq = UserLoginPostReq.builder()
                .email(userEmail)
                .accessToken(jwtTokenProvider.createToken(userEmail))
                .refreshToken(user.getRefreshToken())
                .build();

        return userLoginPostReq;
    }

    @Transactional
    public UserLoginPostReq refreshToken(String refreshToken) throws Exception {

        UserForm user = getUserByUserEmail(jwtTokenProvider.getUserPk(refreshToken));
        if(!refreshToken.equals(user.getRefreshToken())) throw new AccessDeniedException("해당 멤버가 존재하지 않습니다.");

        if(!jwtTokenProvider.validateToken(user.getRefreshToken()))
            throw new IllegalStateException("다시 로그인 해주세요.");

        user.changeRefreshToken(jwtTokenProvider.createRefreshToken(user.getEmail()));

        UserLoginPostReq userDto = UserLoginPostReq.builder()
                .email(user.getEmail())
                .accessToken(jwtTokenProvider.createToken(user.getEmail()))
                .refreshToken(user.getRefreshToken())
                .build();

        return userDto;
    }
}
