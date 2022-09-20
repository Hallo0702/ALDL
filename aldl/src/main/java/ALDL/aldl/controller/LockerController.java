package ALDL.aldl.controller;

import ALDL.aldl.model.Locker;
import ALDL.aldl.model.LockerOwner;
import ALDL.aldl.service.LockerOwnerService;
import ALDL.aldl.service.LockerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Api(value = "LOCKER API", tags = {"Locker"})
@RestController
public class LockerController {
    @Autowired
    LockerService lockerService;
    @Autowired
    LockerOwnerService lockerOwnerService;


    @ApiOperation(value = "자물쇠 정보 등록")
    @CrossOrigin(origins="*")
    @PostMapping(path="/setlocker")
    public ResponseEntity<?> setlocker(@RequestBody Map<String,String> info){
        String background = info.get("background");
        String design = info.get("design");
        String nickname = info.get("nickname");
        String location_x = info.get("location_x");
        String location_y = info.get("location_y");
        try{
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
        }catch(Exception e){
            return ResponseEntity.status(500).body("에러발생");
        }
   }

    @ApiOperation(value = "자물쇠 소유자 등록")
    @CrossOrigin(origins="*")
    @PostMapping(path="/savelocker")
    public ResponseEntity<?> savelocker(@RequestBody Map<String,String> info){

        String email = info.get("email");
        String lockerHash = info.get("lockerHash");
        try{
            if(email==""||email==null||
            lockerHash==""||lockerHash==null){
                return ResponseEntity.status(400).body("유효하지 않은 값");

            }
            if(lockerOwnerService.findlocker(email,lockerHash)==false){
                return ResponseEntity.status(400).body("이미 등록된 자물쇠");
            }
            lockerOwnerService.saveLockerOwner(email,lockerHash);
            return ResponseEntity.status(200).body("자물쇠 저장 완료");
        }catch(Exception e){
            return ResponseEntity.status(500).body("에러발생");
        }
    }

    @ApiOperation(value = "장소별 자물쇠 전체 반환",response = Locker.class)
    @CrossOrigin(origins = "*")
    @GetMapping("/backgroundlocker")
    public ResponseEntity<?> allLocker(@RequestParam String background){
        try{
            if (background==null||background==""){
                return ResponseEntity.status(400).body("유효하지 않는 정보");
            }
            List<Locker> lockers = lockerService.backgroundLocker(background);
            return ResponseEntity.status(200).body(lockers);
        }catch(Exception e){
            return ResponseEntity.status(500).body("에러발생");
        }

    }
    @ApiOperation(value = "사용자가 보유중인 자물쇠 반환",response = LockerOwner.class)
    @CrossOrigin(origins = "*")
    @GetMapping("/mylockers")
    public ResponseEntity<?> mylockers(@RequestParam String email){
        try{
            if (email==""||email==null){
                return ResponseEntity.status(400).body("유효하지 않는 정보");
            }
            return ResponseEntity.status(200).body(lockerOwnerService.mylockers(email));
        }catch(Exception e){
            return ResponseEntity.status(400).body("에러발생");
        }

    }
}

