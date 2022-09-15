package ALDL.aldl.db;


import ALDL.aldl.model.Locker;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LockerRepository extends CrudRepository<Locker,Long> {

    @Query(value = "SELECT t FROM Locker t where t.background = ?1")
    List<Locker> backgroundLocker(String background);



}
