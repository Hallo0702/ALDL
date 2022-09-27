package ALDL.aldl.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateWalletDTO {
    private String address;
    private String email;
    private String privateKey;
}
