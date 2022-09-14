package ALDL.aldl.service;


import ALDL.aldl.db.LockerRepository;
import ALDL.aldl.model.Locker;
import ALDL.aldl.model.LockerForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LockerService {

    @Autowired
    private LockerRepository lockerRepository;

    public void saveLocker(String background, String design, String nickname, String location_x,String location_y){
        LockerForm lockerForm = new LockerForm();
        lockerForm.setBackground(background);
        lockerForm.setDesign(design);
        lockerForm.setNickname(nickname);
        lockerForm.setLocation_x(location_x);
        lockerForm.setLocation_y(location_y);

        Locker locker = lockerForm.toEntity();
        lockerRepository.save(locker);
    }

}
