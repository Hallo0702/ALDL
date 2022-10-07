package ALDL.aldl.db;

import ALDL.aldl.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserLoginRepo {
    @PersistenceContext
    private final EntityManager em;

    public User findByEmail(String email) throws IllegalStateException {
        List<User> memberList = em.createQuery("select m from User m where m.email = :email", User.class)
                .setParameter("email", email)
                .getResultList();
        if(memberList.size() == 0) throw new IllegalStateException("해당 유저 email를 가진 사용자가 없습니다.");
        return memberList.get(0);
    }

}
