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

    @Builder
    public LockerOwner(String email,String lockerHash){
        this.email=email;
        this.lockerHash = lockerHash;

    }
}
