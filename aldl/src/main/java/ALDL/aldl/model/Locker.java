package ALDL.aldl.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Locker {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    @ApiModelProperty(example = "자물쇠 배경")
    private String background;

    @Column
    @ApiModelProperty(example = "자물쇠 디자인")
    private String design;

    @Column
    @ApiModelProperty(example = "자물쇠 해쉬")
    private String lockerHash;

    @Column
    @ApiModelProperty(example = "자물쇠 X축")
    private String location_x;

    @Column
    @ApiModelProperty(example = "자물쇠 Y축")
    private String location_y;

    @Builder
    public Locker(String background, String design, String lockerHash, String location_x, String location_y){
        this.background=background;
        this.design=design;
        this.lockerHash=lockerHash;
        this.location_x=location_x;
        this.location_y=location_y;
    }
}

