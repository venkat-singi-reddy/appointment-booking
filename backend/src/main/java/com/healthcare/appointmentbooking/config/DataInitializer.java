package com.healthcare.appointmentbooking.config;

import com.healthcare.appointmentbooking.model.Appointment;
import com.healthcare.appointmentbooking.model.Appointment.AppointmentStatus;
import com.healthcare.appointmentbooking.model.Doctor;
import com.healthcare.appointmentbooking.model.Patient;
import com.healthcare.appointmentbooking.model.Patient.Gender;
import com.healthcare.appointmentbooking.repository.AppointmentRepository;
import com.healthcare.appointmentbooking.repository.DoctorRepository;
import com.healthcare.appointmentbooking.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;

    @Bean
    @Profile("!test")
    public CommandLineRunner initData() {
        return args -> {
            if (doctorRepository.count() > 0) {
                return;
            }

            // ── Doctors ────────────────────────────────────────────────────────────
            List<Doctor> savedDoctors = doctorRepository.saveAll(List.of(
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
            ));

            // ── Patients ───────────────────────────────────────────────────────────
            List<Patient> savedPatients = patientRepository.saveAll(List.of(
                Patient.builder()
                    .firstName("Jennifer").lastName("Adams")
                    .email("jennifer.adams@example.com").phone("+1-555-1001")
                    .dateOfBirth(LocalDate.of(1985, 3, 22))
                    .gender(Gender.FEMALE)
                    .address("123 Maple St, Springfield, IL 62701").build(),
                Patient.builder()
                    .firstName("Marcus").lastName("Rodriguez")
                    .email("marcus.rodriguez@example.com").phone("+1-555-1002")
                    .dateOfBirth(LocalDate.of(1990, 7, 15))
                    .gender(Gender.MALE)
                    .address("456 Oak Ave, Chicago, IL 60601").build(),
                Patient.builder()
                    .firstName("Sophie").lastName("Chen")
                    .email("sophie.chen@example.com").phone("+1-555-1003")
                    .dateOfBirth(LocalDate.of(1978, 11, 5))
                    .gender(Gender.FEMALE)
                    .address("789 Pine Rd, Evanston, IL 60201").build(),
                Patient.builder()
                    .firstName("David").lastName("Kim")
                    .email("david.kim@example.com").phone("+1-555-1004")
                    .dateOfBirth(LocalDate.of(1995, 1, 30))
                    .gender(Gender.MALE)
                    .address("321 Elm St, Naperville, IL 60540").build(),
                Patient.builder()
                    .firstName("Olivia").lastName("Martinez")
                    .email("olivia.martinez@example.com").phone("+1-555-1005")
                    .dateOfBirth(LocalDate.of(2000, 6, 18))
                    .gender(Gender.FEMALE)
                    .address("654 Cedar Blvd, Aurora, IL 60505").build()
            ));

            // ── Appointments ───────────────────────────────────────────────────────
            Doctor cardio   = savedDoctors.get(0); // Sarah Johnson – Cardiology
            Doctor neuro    = savedDoctors.get(1); // Michael Chen – Neurology
            Doctor peds     = savedDoctors.get(2); // Emily Rodriguez – Pediatrics
            Doctor ortho    = savedDoctors.get(3); // James Patel – Orthopedics
            Doctor derm     = savedDoctors.get(4); // Lisa Thompson – Dermatology
            Doctor general  = savedDoctors.get(5); // Robert Williams – General Medicine

            Patient jennifer = savedPatients.get(0);
            Patient marcus   = savedPatients.get(1);
            Patient sophie   = savedPatients.get(2);
            Patient david    = savedPatients.get(3);
            Patient olivia   = savedPatients.get(4);

            LocalDate today    = LocalDate.now();
            LocalDate tomorrow = today.plusDays(1);
            LocalDate nextWeek = today.plusDays(7);
            LocalDate past     = today.minusDays(10);

            appointmentRepository.saveAll(List.of(
                // Today's appointments
                Appointment.builder()
                    .doctor(general).patient(david)
                    .appointmentDate(today).appointmentTime(LocalTime.of(9, 0))
                    .status(AppointmentStatus.CONFIRMED).appointmentType("GENERAL")
                    .symptoms("Routine health checkup").build(),
                Appointment.builder()
                    .doctor(derm).patient(marcus)
                    .appointmentDate(today).appointmentTime(LocalTime.of(11, 0))
                    .status(AppointmentStatus.PENDING).appointmentType("CONSULTATION")
                    .symptoms("Acne and skin irritation").build(),
                Appointment.builder()
                    .doctor(ortho).patient(sophie)
                    .appointmentDate(today).appointmentTime(LocalTime.of(14, 30))
                    .status(AppointmentStatus.CONFIRMED).appointmentType("FOLLOW_UP")
                    .symptoms("Post-surgery follow-up for shoulder").build(),
                // Confirmed upcoming appointments
                Appointment.builder()
                    .doctor(cardio).patient(jennifer)
                    .appointmentDate(tomorrow).appointmentTime(LocalTime.of(9, 0))
                    .status(AppointmentStatus.CONFIRMED).appointmentType("CONSULTATION")
                    .symptoms("Chest pain and shortness of breath").build(),
                Appointment.builder()
                    .doctor(neuro).patient(marcus)
                    .appointmentDate(tomorrow).appointmentTime(LocalTime.of(10, 30))
                    .status(AppointmentStatus.CONFIRMED).appointmentType("FOLLOW_UP")
                    .symptoms("Recurring headaches and dizziness").build(),
                Appointment.builder()
                    .doctor(peds).patient(olivia)
                    .appointmentDate(nextWeek).appointmentTime(LocalTime.of(11, 0))
                    .status(AppointmentStatus.PENDING).appointmentType("GENERAL")
                    .symptoms("Annual wellness checkup").build(),
                Appointment.builder()
                    .doctor(ortho).patient(david)
                    .appointmentDate(nextWeek).appointmentTime(LocalTime.of(14, 0))
                    .status(AppointmentStatus.PENDING).appointmentType("CONSULTATION")
                    .symptoms("Knee pain after sports injury").build(),
                Appointment.builder()
                    .doctor(derm).patient(sophie)
                    .appointmentDate(nextWeek).appointmentTime(LocalTime.of(15, 30))
                    .status(AppointmentStatus.CONFIRMED).appointmentType("GENERAL")
                    .symptoms("Skin rash and itching").build(),
                // Completed past appointments
                Appointment.builder()
                    .doctor(general).patient(jennifer)
                    .appointmentDate(past).appointmentTime(LocalTime.of(9, 0))
                    .status(AppointmentStatus.COMPLETED).appointmentType("GENERAL")
                    .symptoms("Annual physical exam")
                    .notes("Patient is in good health. Follow-up in 12 months.").build(),
                Appointment.builder()
                    .doctor(cardio).patient(marcus)
                    .appointmentDate(past).appointmentTime(LocalTime.of(11, 0))
                    .status(AppointmentStatus.COMPLETED).appointmentType("FOLLOW_UP")
                    .symptoms("Post-cardiac evaluation")
                    .notes("ECG normal. Continue current medication.").build(),
                // Cancelled appointment
                Appointment.builder()
                    .doctor(neuro).patient(sophie)
                    .appointmentDate(past.plusDays(3)).appointmentTime(LocalTime.of(13, 0))
                    .status(AppointmentStatus.CANCELLED).appointmentType("CONSULTATION")
                    .symptoms("Memory issues").build()
            ));
        };
    }
}
