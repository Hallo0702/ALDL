package ALDL.aldl.model;

import lombok.Data;

@Data
public class LockerOwnerForm {
    private long id;
    private String email;
    private String lockerHash;

    public LockerOwner toEntity(){

        return LockerOwner.builder()
                .email(email)
                .lockerHash(lockerHash)
                .build();
    }
}
