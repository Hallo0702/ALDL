package ALDL.aldl.auth;

import ALDL.aldl.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Long> {

    Optional<User> findByUserEmail(String userEmail);

}