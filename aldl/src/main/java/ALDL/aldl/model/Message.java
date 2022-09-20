package ALDL.aldl.model;

import lombok.Data;

@Data
public class Message {

    private StatusEnum status;
    private String responseType;
    private String userEmail;
    private Object accessToken,refreshToken;

    public Message(){
        this.status = StatusEnum.BAD_REQUEST;
        this.userEmail = null;
        this.responseType = null;
        this.accessToken=null;
        this.refreshToken=null;
    }
}
