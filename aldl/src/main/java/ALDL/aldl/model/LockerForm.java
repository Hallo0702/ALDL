package ALDL.aldl.model;

import lombok.Data;

@Data
public class LockerForm {
    private long id;
    private String background;
    private String design;
    private String lockerHash;
    private String location_x;
    private String location_y;

    public Locker toEntity(){
        return Locker.builder()
                .background(background)
                .design(design)
                .lockerHash(lockerHash)
                .location_x(location_x)
                .location_y(location_y)
                .build();
    }
}
