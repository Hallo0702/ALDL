package ALDL.aldl.controller;

import ALDL.aldl.auth.ALDLUserDetails;
import ALDL.aldl.auth.JwtTokenProvider;
import ALDL.aldl.service.S3Uploader;
import io.jsonwebtoken.Jwt;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://aldl.kro.kr"},allowCredentials = "true")
public class S3Controller {

    private final S3Uploader s3Uploader;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("image") MultipartFile multipartFile, HttpServletRequest httpServletRequest) throws IOException {
        String url = s3Uploader.uploadFile(multipartFile);

        String refreshToken = httpServletRequest.getHeader("Authorization");

        Authentication authentication = jwtTokenProvider.getAuthentication(refreshToken);
        ALDLUserDetails aldlUserDetails = (ALDLUserDetails) authentication.getDetails();
        String email = aldlUserDetails.getEmail();

        return new ResponseEntity<String>(url, HttpStatus.OK);
    }
}
