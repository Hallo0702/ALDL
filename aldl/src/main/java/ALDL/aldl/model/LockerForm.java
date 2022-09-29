package ALDL.aldl.model;

import lombok.Data;

@Data
public class LockerForm {
    private long id;
    private String background;
    private Integer lockType;
    private String lockerHash;
    private Double locationX;
    private Double locationY;

    public Locker toEntity(){
        return Locker.builder()
                .background(background)
                .lockType(lockType)
                .lockerHash(lockerHash)
                .locationX(locationX)
                .locationY(locationY)
                .build();
    }
}
