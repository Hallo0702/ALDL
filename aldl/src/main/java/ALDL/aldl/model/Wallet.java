package ALDL.aldl.model;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String address;

    @Column
    private String balance;

    @Column
    private int receiving_count;

    @Column
    private String email;

    @Column
    private String privateKey;

    @Builder
    public Wallet(String email,String address,String privateKey){
        this.email = email;
        this.address = address;
        this.privateKey = privateKey;
        this.receiving_count = 0;
        this.balance = "0";
    }

}
