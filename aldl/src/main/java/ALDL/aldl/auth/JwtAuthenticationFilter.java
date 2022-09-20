package ALDL.aldl.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {


        String token = ((HttpServletRequest) request).getHeader("authorization");

        try {
            // If header is present, try grab user principal from database and perform authorization
//            System.out.println("0");

            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            // jwt 토큰으로 부터 획득한 인증 정보(authentication) 설정.
            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("autneticated 성공");
        } catch (Exception ex) {
            System.out.println("실패");

        }
        chain.doFilter(request, response);
    }

}
