package com.healthcare.appointmentbooking.config;

import com.healthcare.appointmentbooking.model.Doctor;
import com.healthcare.appointmentbooking.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final DoctorRepository doctorRepository;

    @Bean
    @Profile("!test")
    public CommandLineRunner initData() {
        return args -> {
            if (doctorRepository.count() == 0) {
                List<Doctor> doctors = List.of(
                    Doctor.builder()
                        .firstName("Sarah").lastName("Johnson")
                        .specialization("Cardiology")
                        .qualification("MD, FACC").experience("15 years")
                        .email("sarah.johnson@healthcare.com").phone("+1-555-0101")
                        .bio("Board-certified cardiologist specializing in preventive cardiology and heart disease management.")
                        .available(true).build(),
                    Doctor.builder()
                        .firstName("Michael").lastName("Chen")
                        .specialization("Neurology")
                        .qualification("MD, PhD").experience("12 years")
                        .email("michael.chen@healthcare.com").phone("+1-555-0102")
                        .bio("Neurologist with expertise in movement disorders, epilepsy, and stroke management.")
                        .available(true).build(),
                    Doctor.builder()
                        .firstName("Emily").lastName("Rodriguez")
                        .specialization("Pediatrics")
                        .qualification("MD, FAAP").experience("10 years")
                        .email("emily.rodriguez@healthcare.com").phone("+1-555-0103")
                        .bio("Dedicated pediatrician focused on child health, development, and preventive care.")
                        .available(true).build(),
                    Doctor.builder()
                        .firstName("James").lastName("Patel")
                        .specialization("Orthopedics")
                        .qualification("MD, FAAOS").experience("18 years")
                        .email("james.patel@healthcare.com").phone("+1-555-0104")
                        .bio("Orthopedic surgeon specializing in joint replacement, sports injuries, and spine surgery.")
                        .available(true).build(),
                    Doctor.builder()
                        .firstName("Lisa").lastName("Thompson")
                        .specialization("Dermatology")
                        .qualification("MD, FAAD").experience("8 years")
                        .email("lisa.thompson@healthcare.com").phone("+1-555-0105")
                        .bio("Dermatologist specializing in medical, surgical, and cosmetic dermatology.")
                        .available(true).build(),
                    Doctor.builder()
                        .firstName("Robert").lastName("Williams")
                        .specialization("General Medicine")
                        .qualification("MD, FACP").experience("20 years")
                        .email("robert.williams@healthcare.com").phone("+1-555-0106")
                        .bio("Experienced general practitioner providing comprehensive primary care for all ages.")
                        .available(true).build()
                );
                doctorRepository.saveAll(doctors);
            }
        };
    }
}
