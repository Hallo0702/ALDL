package ALDL.aldl.controller;

import ALDL.aldl.auth.ALDLUserDetails;
import ALDL.aldl.model.Locker;
import ALDL.aldl.model.LockerOwner;
import ALDL.aldl.service.LockerOwnerService;
import ALDL.aldl.service.LockerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.nio.charset.Charset;
import java.util.List;

@Api(value = "LOCKER API", tags = {"Locker"})
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://aldl.kro.kr"},allowCredentials = "true")
public class LockerController {
    @Autowired
    LockerService lockerService;
    @Autowired
    LockerOwnerService lockerOwnerService;

    @ApiOperation(value = "자물쇠 정보 등록") //Swagger
    @PostMapping(path="/setlocker")
    public ResponseEntity<String> setlocker(@RequestBody Swagger_setlocker info, @ApiIgnore Authentication authentication){
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        ALDLUserDetails aldlUserDetails = (ALDLUserDetails)authentication.getDetails();

        String background = info.getBackground();
        String design = info.getDesign();
        String lockerHash = info.getLockerHash();
        String location_x = info.getLocation_x();
        String location_y = info.getLocation_y();
        try{
            String email = aldlUserDetails.getEmail();

            if (background == ""||background ==null||
                    design == ""||design==null||
                    lockerHash==""||lockerHash==null||
                    location_x==""||location_x==null||
                    location_y==""||location_y==null
            ){

                return new ResponseEntity<>("정보가 비어있습니다.",headers, HttpStatus.BAD_REQUEST);
            }

            lockerService.saveLocker(background,design,lockerHash,location_x,location_y);
            return new ResponseEntity<>("자물쇠 등록 완료",headers, HttpStatus.OK);
        }catch(Exception e){

            return new ResponseEntity<>("올바르지 않은 정보",headers, HttpStatus.BAD_REQUEST);
        }
   }

    @ApiOperation(value = "자물쇠 소유자 등록")
    @PostMapping(path="/savelocker")
    public ResponseEntity<String> savelocker(@RequestBody Swagger_savelocker info, @ApiIgnore Authentication authentication){
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        ALDLUserDetails aldlUserDetails = (ALDLUserDetails) authentication.getDetails();

        //String email = info.getEmail();
        String lockerHash = info.getLockerHash();
        String lockerTitle = info.getLockerTitle();
        String background = info.getBackground();
        String design = info.getDesign();
        try{
            String email = aldlUserDetails.getEmail();

            if(email==""||email==null||
            lockerHash==""||lockerHash==null||
            lockerTitle==""||lockerTitle==null||
                    background == ""||background==null||
                    design==""||design==null
            ){
                return new ResponseEntity<>("올바르지 않은 정보",headers, HttpStatus.BAD_REQUEST);

            }
            if(lockerOwnerService.findlocker(email,lockerHash)==false){

                return new ResponseEntity<>("이미 등록된 자물쇠",headers, HttpStatus.FORBIDDEN);
            }
            lockerOwnerService.saveLockerOwner(email,lockerHash,lockerTitle,background,design);

            return new ResponseEntity<>("자물쇠 등록 완료",headers, HttpStatus.OK);
        }catch(Exception e){

            return new ResponseEntity<>("올바르지않은 정보",headers, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "장소별 자물쇠 전체 반환",response = Locker.class)
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
    @GetMapping("/mylockers")
    public ResponseEntity<List<LockerOwner>> mylockers(@ApiIgnore Authentication authentication){
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        ALDLUserDetails aldlUserDetails = (ALDLUserDetails) authentication.getDetails();
        try{
            String email = aldlUserDetails.getEmail();
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

        @ApiModelProperty(example = "자물쇠 제목")
        String lockerTitle;

        @ApiModelProperty(example = "자물쇠 배경")
        String background;

        @ApiModelProperty(example = "자물쇠 디자인")
        String design;

    }
    @Getter
    public static class Swagger_setlocker{
        @ApiModelProperty(example = "배경 종류")
        String background;
        @ApiModelProperty(example = "자물쇠 해시")
        String lockerHash;
        @ApiModelProperty(example = "자물쇠 X축")
        String location_x;
        @ApiModelProperty(example = "자물쇠 Y축")
        String location_y;
        @ApiModelProperty(example = "자물쇠 디자인")
        String design;

    }

}

