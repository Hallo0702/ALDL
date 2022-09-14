package ALDL.aldl.model;

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
    private String background;

    @Column
    private String design;

    @Column
    private String nickname;

    @Column
    private String location_x;

    @Column
    private String location_y;

    @Builder
    public Locker(String background, String design, String nickname, String location_x, String location_y){
        this.background=background;
        this.design=design;
        this.nickname=nickname;
        this.location_x=location_x;
        this.location_y=location_y;
    }
}

