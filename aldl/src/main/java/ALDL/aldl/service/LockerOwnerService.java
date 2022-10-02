package ALDL.aldl.service;

import ALDL.aldl.db.LockerOwnerRepository;
import ALDL.aldl.model.LockerOwner;
import ALDL.aldl.model.LockerOwnerForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LockerOwnerService {
    @Autowired
    private LockerOwnerRepository lockerOwnerRepository;

//    public void saveLockerOwner(String email,String lockerHash,String lockerTitle,String background,Integer lockType){
//        LockerOwnerForm lockerOwnerForm = new LockerOwnerForm();
//        lockerOwnerForm.setEmail(email);
//        lockerOwnerForm.setLockerHash(lockerHash);
//        lockerOwnerForm.setLockerTitle(lockerTitle);
//        lockerOwnerForm.setBackground(background);
//        lockerOwnerForm.setLockType(lockType);
//
//        LockerOwner lockerOwner = lockerOwnerForm.toEntity();
//        lockerOwnerRepository.save(lockerOwner);
//
//    }
public void saveLockerOwner(String email, String lockerHash){
    LockerOwnerForm lockerOwnerForm = new LockerOwnerForm();
    lockerOwnerForm.setEmail(email);
    lockerOwnerForm.setLockerHash(lockerHash);
//    lockerOwnerForm.setLockerTitle(lockerTitle);
//    lockerOwnerForm.setBackground(background);
//    lockerOwnerForm.setLockType(lockType);

    LockerOwner lockerOwner = lockerOwnerForm.toEntity();
    lockerOwnerRepository.save(lockerOwner);

}

    public List<LockerOwner> mylockers(String email){
        return lockerOwnerRepository.myLocker(email);
    }
    public boolean findlocker(String email,String lockerHash){
        if (lockerOwnerRepository.findLocker(email,lockerHash)==null){
            return true;
        }
        return false;
    }
}
