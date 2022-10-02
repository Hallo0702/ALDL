package ALDL.aldl.model;

import lombok.Data;

@Data
public class LockerOwnerForm {
    private long id;
    private String email;
    private String lockerHash;

//    private String lockerTitle;
//
//    private String background;
//
//    private Integer lockType;


    public LockerOwner toEntity(){

        return LockerOwner.builder()
                .email(email)
                .lockerHash(lockerHash)
                .lockerTitle("")
                .background("")
                .lockType(0)
                .build();
    }
}
