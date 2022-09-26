package ALDL.aldl.controller;

import ALDL.aldl.service.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
public class S3Controller {

    private final S3Uploader s3Uploader;

    @GetMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("image") MultipartFile multipartFile) throws IOException {
        String url = s3Uploader.uploadFile(multipartFile);

        return new ResponseEntity<String>(url, HttpStatus.OK);
    }
}
