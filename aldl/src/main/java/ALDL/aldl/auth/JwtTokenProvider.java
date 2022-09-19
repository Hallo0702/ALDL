package ALDL.aldl.auth;

import ALDL.aldl.db.UserRepository;
import ALDL.aldl.model.UserForm;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import io.jsonwebtoken.*;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.io.UnsupportedEncodingException;
import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Date;
import java.util.List;



@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    private static String secretKey = "aldl";
    //엑세스 토큰 유효시간 == 1일
    private static final long expireTime = 24 * 60 * 60 * 1000L;
    //리프레시 토큰 유효시간 == 7일
    private final long refreshExpireTime = 7 * 24 * 60 * 60 * 1000L;
    public static final String ISSUER = "aldl.com";

    private final UserRepository userRepository;

    public String createToken(String userEmail) throws UnsupportedEncodingException {
        Claims claims = Jwts.claims().setSubject(userEmail); // JWT payLood에 저장되는 정보 단위
        claims.put("roles", "User"); // 정보는 key-value 쌍으로 저장
        Date now = new Date();
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS512;
        byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(secretKey);
        Key signatureKey =
                new SecretKeySpec(
                        secretKeyBytes
                        , signatureAlgorithm.getJcaName()
                );

        return JWT.create()
                .withSubject(userEmail)
                .withExpiresAt(new Date(now.getTime() + expireTime))
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

    public static Date getTokenExpiration(long expirationTime) {
        Date now = new Date();
        return new Date(now.getTime() + expirationTime);
    }

    public static JWTVerifier getVerifier() {
        return JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();
    }
    public static void handleError(String token) {
        JWTVerifier verifier = JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();
        System.out.println(ISSUER);
        System.out.println(secretKey.getBytes().toString());
        try {
            verifier.verify(token.replace("Bearer ", ""));
        }         catch (Exception ex) {
            System.out.println(ex);
            throw ex;
        }
    }

    public Authentication getAuthentication(String token){
        if (token != null) {
            // parse the token and validate it (decode)
            JWTVerifier verifier = getVerifier();
            handleError(token);
            DecodedJWT decodedJWT = verifier.verify(token.replace("Bearer ", ""));
            String userEmail = decodedJWT.getSubject();
            if (userEmail != null) {
                // jwt 토큰에 포함된 계정 정보(userId) 통해 실제 디비에 해당 정보의 계정이 있는지 조회.
                UserForm user = userRepository.findByUserEmail(userEmail).orElse(null);
                if (user != null) {
                    // 식별된 정상 유저인 경우, 요청 context 내에서 참조 가능한 인증 정보(jwtAuthentication) 생성.
                    ALDLUserDetails userDetails = new ALDLUserDetails(user);
                    UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(userEmail,
                            null, userDetails.getAuthorities());
                    jwtAuthentication.setDetails(userDetails);
                    return jwtAuthentication;
                }
            }
        }
        return null;
    }

    public String getUserPk(String token){
        return Jwts.parserBuilder().setSigningKey(Base64.getEncoder().encodeToString(secretKey.getBytes())).build().parseClaimsJws(token).getBody().getSubject();
    }

    public String createRefreshToken(String userEmail) throws UnsupportedEncodingException {
        Claims claims = Jwts.claims().setSubject(userEmail); // JWT payLood에 저장되는 정보 단위
        claims.put("roles", "User"); // 정보는 key-value 쌍으로 저장
        claims.put("userId",userEmail);
        Date now = new Date();

        System.out.println("createRefreshToken 완료");
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshExpireTime))
                .signWith(SignatureAlgorithm.HS256, secretKey.getBytes("UTF-8"))
                .compact();
    }

    // 토큰의 유효성 + 만료일자 확인
    public boolean validateToken(String jwtToken){
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(Base64.getEncoder().encodeToString(secretKey.getBytes())).build().parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (ExpiredJwtException e){
            e.printStackTrace();
            return false;
        } catch (Exception e){
            return false;
        }
    }

}