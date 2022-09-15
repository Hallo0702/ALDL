package ALDL.aldl.db;

import ALDL.aldl.model.Locker;
import ALDL.aldl.model.LockerOwner;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LockerOwnerRepository extends CrudRepository<LockerOwner,Long> {
    @Query(value="SELECT t from LockerOwner t where email=?1")
    List<LockerOwner> myLocker(String email);

    @Query(value="SELECT id from LockerOwner t where email=?1 and lockerHash=?2")
    String findLocker(String email,String lockerHash);
}
