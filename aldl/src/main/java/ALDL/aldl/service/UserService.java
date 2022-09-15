package ALDL.aldl.service;

import ALDL.aldl.db.UserRepository;
import ALDL.aldl.model.User;
import ALDL.aldl.model.UserForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
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
}
