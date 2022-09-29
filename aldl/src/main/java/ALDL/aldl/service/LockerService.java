package ALDL.aldl.service;


import ALDL.aldl.db.LockerRepository;
import ALDL.aldl.model.Locker;
import ALDL.aldl.model.LockerForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LockerService {

    @Autowired
    private LockerRepository lockerRepository;

    public void saveLocker(String background, Integer lockType, String lockerHash, Double locationX,Double locationY){
        LockerForm lockerForm = new LockerForm();
        lockerForm.setBackground(background);
        lockerForm.setLockType(lockType);
        lockerForm.setLockerHash(lockerHash);
        lockerForm.setLocationX(locationX);
        lockerForm.setLocationY(locationY);

        Locker locker = lockerForm.toEntity();
        lockerRepository.save(locker);
    }

    public List<Locker> backgroundLocker(String background){
        return lockerRepository.backgroundLocker(background);
    }



}
