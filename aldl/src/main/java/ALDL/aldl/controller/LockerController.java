package ALDL.aldl.controller;

import ALDL.aldl.service.LockerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class LockerController {
    @Autowired
    LockerService lockerService;


    @CrossOrigin(origins="*")
    @PostMapping(path="/setlocker")
    public ResponseEntity<?> savelocker(@RequestBody Map<String,String> info){
        lockerService.saveLocker(info.get("background"),info.get("design"),info.get("nickname"),info.get("location_x"),info.get("location_y"));
        return ResponseEntity.status(200).body("자물쇠등록완료");
   }
}
