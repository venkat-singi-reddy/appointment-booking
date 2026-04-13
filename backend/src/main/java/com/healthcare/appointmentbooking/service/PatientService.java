package com.healthcare.appointmentbooking.service;

import com.healthcare.appointmentbooking.dto.PatientRequest;
import com.healthcare.appointmentbooking.model.Patient;
import com.healthcare.appointmentbooking.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
    }

    public Patient getPatientByEmail(String email) {
        return patientRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Patient not found with email: " + email));
    }

    public Patient createOrFindPatient(PatientRequest request) {
        if (patientRepository.existsByEmail(request.getEmail())) {
            return patientRepository.findByEmail(request.getEmail()).orElseThrow();
        }
        Patient patient = Patient.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender() != null
                        ? Patient.Gender.valueOf(request.getGender().toUpperCase())
                        : null)
                .address(request.getAddress())
                .build();
        return patientRepository.save(patient);
    }

    public Patient updatePatient(Long id, PatientRequest request) {
        Patient patient = getPatientById(id);
        patient.setFirstName(request.getFirstName());
        patient.setLastName(request.getLastName());
        patient.setPhone(request.getPhone());
        patient.setDateOfBirth(request.getDateOfBirth());
        patient.setAddress(request.getAddress());
        return patientRepository.save(patient);
    }
}
