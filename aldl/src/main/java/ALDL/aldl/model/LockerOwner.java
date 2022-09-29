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
public class LockerOwner {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String email;

    @Column
    private String lockerHash;

    @Column
    private String lockerTitle;

    @Column
    private String background;

    @Column
    private Integer lockType;

    @Builder
    public LockerOwner(String email,String lockerHash,String lockerTitle,String background, Integer lockType){
        this.email=email;
        this.lockerHash = lockerHash;
        this.lockerTitle = lockerTitle;
        this.background = background;
        this.lockType = lockType;

    }
}
