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
    private Integer lockType;

    @Column
    @ApiModelProperty(example = "자물쇠 해쉬")
    private String lockerHash;

    @Column
    @ApiModelProperty(example = "자물쇠 X축")
    private Double locationX;

    @Column
    @ApiModelProperty(example = "자물쇠 Y축")
    private Double locationY;

    @Builder
    public Locker(String background, Integer lockType, String lockerHash, Double locationX, Double locationY){
        this.background=background;
        this.lockType=lockType;
        this.lockerHash=lockerHash;
        this.locationX=locationX;
        this.locationY=locationY;
    }
}

