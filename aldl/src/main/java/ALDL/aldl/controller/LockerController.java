package ALDL.aldl.controller;

import ALDL.aldl.model.Locker;
import ALDL.aldl.model.LockerOwner;
import ALDL.aldl.model.Message;
import ALDL.aldl.model.StatusEnum;
import ALDL.aldl.service.LockerOwnerService;
import ALDL.aldl.service.LockerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.HashMap;
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
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

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
                message.setResponseType("setlocker:정보가 비어있습니다");
                message.setStatus(StatusEnum.BAD_REQUEST);
                return new ResponseEntity<>(message,headers, HttpStatus.OK);
            }

            lockerService.saveLocker(background,design,nickname,location_x,location_y);
            message.setResponseType("setlocker:자물쇠 등록 완료");
            message.setStatus(StatusEnum.OK);
            return new ResponseEntity<>(message,headers, HttpStatus.OK);
        }catch(Exception e){
            message.setResponseType("setlocker:올바르지 않은 정보");
            message.setStatus(StatusEnum.BAD_REQUEST);
            return new ResponseEntity<>(message,headers, HttpStatus.OK);
        }
   }

    @ApiOperation(value = "자물쇠 소유자 등록")
    @CrossOrigin(origins="*")
    @PostMapping(path="/savelocker")
    public ResponseEntity<?> savelocker(@RequestBody Map<String,String> info){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));


        String email = info.get("email");
        String lockerHash = info.get("lockerHash");
        try{
            if(email==""||email==null||
            lockerHash==""||lockerHash==null){
                message.setResponseType("savelocker:올바르지 않은 정보");
                message.setStatus(StatusEnum.BAD_REQUEST);
                return new ResponseEntity<>(message,headers, HttpStatus.OK);

            }
            if(lockerOwnerService.findlocker(email,lockerHash)==false){
                message.setResponseType("savelocker:이미 등록된 자물쇠");
                message.setStatus(StatusEnum.BAD_REQUEST);
                return new ResponseEntity<>(message,headers, HttpStatus.OK);
            }
            lockerOwnerService.saveLockerOwner(email,lockerHash);
            return ResponseEntity.status(200).body("자물쇠 저장 완료");
        }catch(Exception e){
            message.setResponseType("savelocker:올바르지않은 정보");
            message.setStatus(StatusEnum.BAD_REQUEST);
            return new ResponseEntity<>(message,headers, HttpStatus.OK);
        }
    }

    @ApiOperation(value = "장소별 자물쇠 전체 반환",response = Locker.class)
    @CrossOrigin(origins = "*")
    @GetMapping("/backgroundlocker")
    public ResponseEntity<?> allLocker(@RequestParam String background){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        try{
            if (background==null||background==""){
                message.setResponseType("backgroundlocker:올바르지않은 정보");
                message.setStatus(StatusEnum.BAD_REQUEST);
                return new ResponseEntity<>(message,headers, HttpStatus.OK);
            }
            List<Locker> lockers = lockerService.backgroundLocker(background);
            return ResponseEntity.status(200).body(lockers);
        }catch(Exception e){
            message.setResponseType("backgroundlocker:정보를 확인하세요");
            message.setStatus(StatusEnum.BAD_REQUEST);
            return new ResponseEntity<>(message,headers, HttpStatus.OK);
        }

    }
    @ApiOperation(value = "사용자가 보유중인 자물쇠 반환",response = LockerOwner.class)
    @CrossOrigin(origins = "*")
    @GetMapping("/mylockers")
    public ResponseEntity<?> mylockers(@RequestParam String email){
        Message message = new Message();
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        try{
            if (email==""||email==null){
                message.setResponseType("Mylockers:이메일을 확인하세요");
                message.setStatus(StatusEnum.BAD_REQUEST);
                return new ResponseEntity<>(message,headers, HttpStatus.OK);
            }
            return ResponseEntity.status(200).body(lockerOwnerService.mylockers(email));
        }catch(Exception e){
            message.setResponseType("Mylockers:이메일을 확인하세요");
            message.setStatus(StatusEnum.BAD_REQUEST);
            return new ResponseEntity<>(message,headers, HttpStatus.OK);
        }

    }
}

