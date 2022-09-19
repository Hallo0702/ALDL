package ALDL.aldl.db;

import ALDL.aldl.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User,Long> {
    @Query(value = "SELECT id FROM User t where t.email = ?1 ")
    String validEmail(String email);
    @Query(value = "SELECT id FROM User t where (t.email= ?1 and t.password = ?2)")
    String validPassword(String email,String password);
    @Query(value = "SELECT id FROM User t where t.nickname = ?1 ")
    String validNickname(String nickname);

    @Modifying
    @Transactional
    @Query(value = "UPDATE User t set password = ?2 where email = ?1")
    public void ModifyingPassword(String email,String password);

    @Modifying
    @Transactional
    @Query(value = "UPDATE User t set nickname = ?2 where email = ?1")
    public void ModifyingNickname(String email,String nickname);





}
