package ALDL.aldl.db;


import ALDL.aldl.model.Locker;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LockerRepository extends CrudRepository<Locker,Long> {


}
