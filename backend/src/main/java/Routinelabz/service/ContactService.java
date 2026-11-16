package Routinelabz.service;

import Routinelabz.dto.ContactMessageDTO;
import Routinelabz.entity.ContactMessage;
import Routinelabz.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository repository;
    private final EmailService emailService;

    public ContactMessageDTO submitMessage(ContactMessageDTO dto) {


        ContactMessage msg = ContactMessage.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .subject(dto.getSubject())
                .message(dto.getMessage())
                .build();


        ContactMessage saved = repository.save(msg);


        emailService.sendContactEmail(
                dto.getName(),
                dto.getEmail(),
                dto.getSubject(),
                dto.getMessage()
        );


        return toDTO(saved);
    }

    private ContactMessageDTO toDTO(ContactMessage entity) {
        return ContactMessageDTO.builder()
                .name(entity.getName())
                .email(entity.getEmail())
                .subject(entity.getSubject())
                .message(entity.getMessage())
                .build();
    }
}