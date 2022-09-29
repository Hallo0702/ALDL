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
    private BigDecimal balance;

    @Column
    private int receivingCount;

    @Column
    private String email;

    @Column
    private String privateKey;

    @Column
    private int cash;

    @Builder
    public Wallet(String address, String email, String privateKey, int receivingCount, BigDecimal balance, int cash){
        this.address = address;
        this. email = email;
        this.privateKey = privateKey;
        this.receivingCount = receivingCount;
        this.balance = balance;
        this.cash = cash;
    }

}
