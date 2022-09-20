package ALDL.aldl.auth;

import ALDL.aldl.db.UserRepository;
import ALDL.aldl.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ALDLUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    // DB에서 유저의 정보를 조회(loadUserByUsername)
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByUserEmail(email).orElse(null);

        if (user != null) {
            ALDLUserDetails userDetails = new ALDLUserDetails(user);
            return userDetails;
        }
        return null;
    }
}
