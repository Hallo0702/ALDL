package ALDL.aldl.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class Message {

    @ApiModelProperty(example = "400")
    private StatusEnum status;
    @ApiModelProperty(example = "200")
    private String responseType;
//    private String userEmail;
    private Object accessToken,refreshToken;

    private String address, privateKey;

    public Message(){
        this.status = StatusEnum.BAD_REQUEST;
//        this.userEmail = null;
        this.responseType = null;
        this.accessToken=null;
        this.refreshToken=null;
        this.address=null;
        this.privateKey=null;
    }
}
