package ALDL.aldl.controller;

import ALDL.aldl.model.Locker;
import ALDL.aldl.model.LockerOwner;
import ALDL.aldl.model.Message;
import ALDL.aldl.model.StatusEnum;
import ALDL.aldl.service.LockerOwnerService;
import ALDL.aldl.service.LockerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.Setter;
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

    @ApiOperation(value = "자물쇠 정보 등록") //Swagger
    @CrossOrigin(origins="*")
    @PostMapping(path="/setlocker")
    public ResponseEntity<String> setlocker(@RequestBody Swagger_setlocker info){
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        String background = info.getBackground();
        String design = info.getDesign();
        String nickname = info.getNickname();
        String location_x = info.getLocation_x();
        String location_y = info.getLocation_y();
        try{
            if (background == ""||background ==null||
                    design == ""||design==null||
                    nickname==""||nickname==null||
                    location_x==""||location_x==null||
                    location_y==""||location_y==null
            ){

                return new ResponseEntity<>("정보가 비어있습니다.",headers, HttpStatus.BAD_REQUEST);
            }

            lockerService.saveLocker(background,design,nickname,location_x,location_y);
            return new ResponseEntity<>("자물쇠 등록 완료",headers, HttpStatus.OK);
        }catch(Exception e){

            return new ResponseEntity<>("올바르지 않은 정보",headers, HttpStatus.BAD_REQUEST);
        }
   }

    @ApiOperation(value = "자물쇠 소유자 등록")
    @CrossOrigin(origins="*")
    @PostMapping(path="/savelocker")
    public ResponseEntity<String> savelocker(@RequestBody Swagger_savelocker info){
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        String email = info.getEmail();
        String lockerHash = info.getLockerHash();
        try{
            if(email==""||email==null||
            lockerHash==""||lockerHash==null){
                return new ResponseEntity<>("올바르지 않은 정보",headers, HttpStatus.BAD_REQUEST);

            }
            if(lockerOwnerService.findlocker(email,lockerHash)==false){

                return new ResponseEntity<>("이미 등록된 자물쇠",headers, HttpStatus.FORBIDDEN);
            }
            lockerOwnerService.saveLockerOwner(email,lockerHash);

            return new ResponseEntity<>("자물쇠 등록 완료",headers, HttpStatus.OK);
        }catch(Exception e){

            return new ResponseEntity<>("올바르지않은 정보",headers, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "장소별 자물쇠 전체 반환",response = Locker.class)
    @CrossOrigin(origins = "*")
    @GetMapping("/backgroundlocker")
    public ResponseEntity<List<Locker>> allLocker(@RequestParam String background){
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        try{
            if (background==null||background==""){

                return new ResponseEntity<>(null,headers, HttpStatus.BAD_REQUEST);
            }
            List<Locker> lockers = lockerService.backgroundLocker(background);
            return new ResponseEntity<>(lockers,headers, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(null,headers, HttpStatus.BAD_REQUEST);
        }

    }
    @ApiOperation(value = "사용자가 보유중인 자물쇠 반환",response = LockerOwner.class)
    @CrossOrigin(origins = "*")
    @GetMapping("/mylockers")
    public ResponseEntity<List<LockerOwner>> mylockers(@RequestParam String email){
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        try{
            if (email==""||email==null){
                return new ResponseEntity<>(null,headers, HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(lockerOwnerService.mylockers(email),headers, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(null,headers ,HttpStatus.BAD_REQUEST);
        }

    }
    //swagger
    @Getter
    public static class Swagger_savelocker{
        @ApiModelProperty(example = "사용자 이메일")
        String email;
        @ApiModelProperty(example = "자물쇠 해쉬값")
        String lockerHash;

    }
    @Getter
    public static class Swagger_setlocker{
        @ApiModelProperty(example = "배경 종류")
        String background;
        @ApiModelProperty(example = "사용자 닉네임")
        String nickname;
        @ApiModelProperty(example = "자물쇠 X축")
        String location_x;
        @ApiModelProperty(example = "자물쇠 Y축")
        String location_y;
        @ApiModelProperty(example = "자물쇠 디자인")
        String design;

    }

}

