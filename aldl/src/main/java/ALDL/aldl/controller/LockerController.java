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
}
