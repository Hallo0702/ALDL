package ALDL.aldl.db;


import ALDL.aldl.model.Locker;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LockerRepository extends CrudRepository<Locker,Long> {

    @Query(value = "SELECT t FROM Locker t where t.background = ?1")
    List<Locker> backgroundLocker(String background);

    @Query(value = "SELECT t FROM Locker t where t.lockerHash = ?1")
    Optional<Locker> findLockerHash(String lockerHash);



}
