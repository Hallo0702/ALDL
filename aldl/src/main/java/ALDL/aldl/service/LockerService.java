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

    public void saveLocker(String background, String design, String lockerHash, String location_x,String location_y){
        LockerForm lockerForm = new LockerForm();
        lockerForm.setBackground(background);
        lockerForm.setDesign(design);
        lockerForm.setLockerHash(lockerHash);
        lockerForm.setLocation_x(location_x);
        lockerForm.setLocation_y(location_y);

        Locker locker = lockerForm.toEntity();
        lockerRepository.save(locker);
    }

    public List<Locker> backgroundLocker(String background){
        return lockerRepository.backgroundLocker(background);
    }



}
