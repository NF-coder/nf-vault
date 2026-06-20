package org.nfVault.services;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.jwt.JwtProvider;
import org.nfVault.exceptions.ExpiredException;
import org.nfVault.exceptions.NotFoundException;
import org.nfVault.exceptions.UnauthorizedException;
import org.nfVault.models.InviteCode;
import org.nfVault.models.User;
import org.nfVault.repository.InviteCodeRepository;
import org.nfVault.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final InviteCodeRepository inviteCodeRepository;
    private final JwtProvider jwtProvider;

    public UserService(
            UserRepository userRepository,
            InviteCodeRepository inviteCodeRepository,
            JwtProvider jwtProvider
    ) {
        this.jwtProvider = jwtProvider;
        this.userRepository = userRepository;
        this.inviteCodeRepository = inviteCodeRepository;
    }

    @Transactional
    public String register(String login, String password, String inviteCode) {
        final InviteCode inviteCodeEntity = this.inviteCodeRepository.getByCode(inviteCode)
                .orElseThrow(() -> {
                    log.warn("Invite code not found {}", inviteCode);
                    return new NotFoundException("Invite code not found");
                });
        if (inviteCodeEntity.getUsagesLeft() <= 0) {
            log.warn("Invite code is expired {}", inviteCode);
            throw new ExpiredException("Invite code is expired");
        }

        final String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        userRepository.create(
                User.builder()
                        .password(hashedPassword)
                        .username(login).build()
        );

        inviteCodeEntity.setUsagesLeft(
                inviteCodeEntity.getUsagesLeft() - 1
        );
        log.info("New user added {}", login);

        return jwtProvider.generateToken(login);
    }

    public String login(String login, String password) {
        final User user = userRepository.getByUsername(login)
                .orElseThrow(() -> new UnauthorizedException("User not found"));

        if (!BCrypt.checkpw(password, user.getPassword())) {
            throw new UnauthorizedException("Invalid credentials");
        }

        return jwtProvider.generateToken(login);
    }
}
