package com.gyaanbyte.backend.security;

import com.gyaanbyte.backend.features.auth.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {

    private final JwtEncoder jwtEncoder;

    @Value("${app.jwt.expiration}")
    private long jwtExpiration;

    @Override
    public String generateAccessToken(User user) {
        Instant now = Instant.now();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("gyaanbyte-backend")
                .issuedAt(now)
                .expiresAt(now.plusMillis(jwtExpiration))
                .subject(user.getEmail())
                .claim("role", user.getRole().name())
                .claim("name", user.getName())
                .build();

        JwsHeader jwsHeader = JwsHeader.with(MacAlgorithm.HS256).build();

        return jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();
    }

    @Override
    public String extractUsername(Jwt jwt) {
        return jwt.getSubject();
    }

    @Override
    public boolean isTokenValid(Jwt jwt, User user) {
        final String username = extractUsername(jwt);
        return (username.equals(user.getEmail())) && !isTokenExpired(jwt);
    }

    private boolean isTokenExpired(Jwt jwt) {
        Instant expiration = jwt.getExpiresAt();
        return expiration != null && expiration.isBefore(Instant.now());
    }
}
