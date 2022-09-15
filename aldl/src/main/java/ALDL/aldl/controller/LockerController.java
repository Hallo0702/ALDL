package ALDL.aldl.controller;

import ALDL.aldl.model.Locker;
import ALDL.aldl.model.LockerOwner;
import ALDL.aldl.service.LockerOwnerService;
import ALDL.aldl.service.LockerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class LockerController {
    @Autowired
    LockerService lockerService;
    @Autowired
    LockerOwnerService lockerOwnerService;


    @CrossOrigin(origins="*")
    @PostMapping(path="/setlocker")
    public ResponseEntity<?> setlocker(@RequestBody Map<String,String> info){
        String background = info.get("background");
        String design = info.get("design");
        String nickname = info.get("nickname");
        String location_x = info.get("location_x");
        String location_y = info.get("location_y");
        if (background == ""||background ==null||
                design == ""||design==null||
                nickname==""||nickname==null||
                location_x==""||location_x==null||
                location_y==""||location_y==null
        ){
            return ResponseEntity.status(400).body("유효하지 않은 값");
        }
        lockerService.saveLocker(background,design,nickname,location_x,location_y);
        return ResponseEntity.status(200).body("자물쇠등록완료");
   }

    @CrossOrigin(origins="*")
    @PostMapping(path="/savelocker")
    public ResponseEntity<?> savelocker(@RequestBody Map<String,String> info){

        String email = info.get("email");
        String lockerHash = info.get("lockerHash");
        if(email==""||email==null||
        lockerHash==""||lockerHash==null){
            return ResponseEntity.status(400).body("유효하지 않은 값");

        }
        if(lockerOwnerService.findlocker(email,lockerHash)==false){
            return ResponseEntity.status(400).body("이미 등록된 자물쇠");
        }
        lockerOwnerService.saveLockerOwner(email,lockerHash);
        return ResponseEntity.status(200).body("자물쇠 저장 완료");
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/backgroundlocker")
    public ResponseEntity<?> allLocker(@RequestParam String background){
        if (background==null||background==""){
            return ResponseEntity.status(400).body("유효하지 않는 정보");
        }
        List<Locker> lockers = lockerService.backgroundLocker(background);
        return ResponseEntity.status(200).body(lockers);

    }
    @CrossOrigin(origins = "*")
    @GetMapping("/mylockers")
    public ResponseEntity<?> mylockers(@RequestParam String email){
        if (email==""||email==null){
            return ResponseEntity.status(400).body("유효하지 않는 정보");
        }
        return ResponseEntity.status(200).body(lockerOwnerService.mylockers(email));

    }
}

