package ALDL.aldl.service;

import ALDL.aldl.auth.JwtTokenProvider;
import ALDL.aldl.auth.UserLoginPostReq;
import ALDL.aldl.db.UserLoginRepo;
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

    private final JwtTokenProvider jwtTokenProvider;

    private final UserRepository userRepository;
    private final UserLoginRepo userLoginRepo;

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

    public User getUserByUserEmail(String userEmail) {
        // 디비에 유저 정보 조회 (userId 를 통한 조회).
        User user = userLoginRepo.findByEmail(userEmail);
        return user;
    }
    public void ModifingPassword(String email,String password){
        userRepository.ModifyingPassword(email,password);
    }

    public void ModifingNickname(String email,String nickname){
        userRepository.ModifyingNickname(email,nickname);
    }

    public void updateAuthCode(String email,String authCode){userRepository.updateAuthCode(email,authCode);}

    public boolean vaildAuthCode(String email,String authCode){
        if(userRepository.validAuthCode(email,authCode) != null){
            return true;
        }
        else{
            return false;
        }
    }
    @Transactional
    public UserLoginPostReq userLogin(String email) throws Exception {
        User user = getUserByUserEmail(email);

        // 리프레쉬 토큰 발급
        user.changeRefreshToken(jwtTokenProvider.createRefreshToken(email));
        UserLoginPostReq userLoginPostReq = UserLoginPostReq.builder()
                .email(email)
                .accessToken(jwtTokenProvider.createToken(email))
                .refreshToken(user.getRefreshToken())
                .build();

        return userLoginPostReq;
    }

    @Transactional
    public UserLoginPostReq refreshToken(String refreshToken) throws Exception {

        User user = userLoginRepo.findByEmail(jwtTokenProvider.getUserPk(refreshToken));
        if(!refreshToken.equals(user.getRefreshToken())) throw new AccessDeniedException("해당 멤버가 존재하지 않습니다.");

        if(!jwtTokenProvider.validateToken(user.getRefreshToken()))
            throw new IllegalStateException("다시 로그인 해주세요.");

        user.changeRefreshToken(jwtTokenProvider.createRefreshToken(user.getEmail()));

        UserLoginPostReq userDto = UserLoginPostReq.builder()
                .email(user.getEmail())
                .accessToken(jwtTokenProvider.createToken(user.getEmail()))
                .refreshToken(user.getRefreshToken())
                .nickname(user.getNickname())
                .build();

        return userDto;
    }

    @Transactional
    public void logoutMember(String refreshToken) {
        boolean result = jwtTokenProvider.validateToken(refreshToken);
        if(!result) throw new IllegalStateException("토큰 만료 되었습니다.");
        User user = userLoginRepo.findByEmail(jwtTokenProvider.getUserPk(refreshToken));
        user.deleteRefreshToken();
    }

    public User getNickname(String email){
        return userRepository.findNicknameByUserEmail(email).orElse(null);
    }

}
