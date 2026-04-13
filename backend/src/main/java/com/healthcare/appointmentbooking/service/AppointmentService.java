package com.healthcare.appointmentbooking.service;

import com.healthcare.appointmentbooking.dto.AppointmentRequest;
import com.healthcare.appointmentbooking.dto.AppointmentResponse;
import com.healthcare.appointmentbooking.model.Appointment;
import com.healthcare.appointmentbooking.model.Appointment.AppointmentStatus;
import com.healthcare.appointmentbooking.model.Doctor;
import com.healthcare.appointmentbooking.model.Patient;
import com.healthcare.appointmentbooking.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorService doctorService;
    private final PatientService patientService;

    public AppointmentResponse bookAppointment(AppointmentRequest request) {
        Doctor doctor = doctorService.getDoctorById(request.getDoctorId());
        Patient patient = patientService.getPatientById(request.getPatientId());

        List<Appointment> conflicts = appointmentRepository.findConflictingAppointments(
                request.getDoctorId(), request.getAppointmentDate(), request.getAppointmentTime());

        if (!conflicts.isEmpty()) {
            throw new RuntimeException("Doctor is not available at the selected time slot");
        }

        Appointment appointment = Appointment.builder()
                .doctor(doctor)
                .patient(patient)
                .appointmentDate(request.getAppointmentDate())
                .appointmentTime(request.getAppointmentTime())
                .symptoms(request.getSymptoms())
                .notes(request.getNotes())
                .appointmentType(request.getAppointmentType() != null
                        ? request.getAppointmentType() : "GENERAL")
                .status(AppointmentStatus.PENDING)
                .build();

        Appointment saved = appointmentRepository.save(appointment);
        return toResponse(saved);
    }

    public List<AppointmentResponse> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<AppointmentResponse> getAppointmentsByPatientEmail(String email) {
        return appointmentRepository.findByPatientEmailOrderByDateDesc(email).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<AppointmentResponse> getAppointmentsByPatientId(Long patientId) {
        return appointmentRepository.findByPatientId(patientId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<AppointmentResponse> getAppointmentsByDoctorId(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public AppointmentResponse getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
        return toResponse(appointment);
    }

    public AppointmentResponse updateStatus(Long id, AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
        appointment.setStatus(status);
        return toResponse(appointmentRepository.save(appointment));
    }

    public void cancelAppointment(Long id) {
        updateStatus(id, AppointmentStatus.CANCELLED);
    }

    private AppointmentResponse toResponse(Appointment appointment) {
        return AppointmentResponse.builder()
                .id(appointment.getId())
                .doctorId(appointment.getDoctor().getId())
                .doctorName(appointment.getDoctor().getFullName())
                .doctorSpecialization(appointment.getDoctor().getSpecialization())
                .patientId(appointment.getPatient().getId())
                .patientName(appointment.getPatient().getFullName())
                .patientEmail(appointment.getPatient().getEmail())
                .appointmentDate(appointment.getAppointmentDate())
                .appointmentTime(appointment.getAppointmentTime())
                .status(appointment.getStatus())
                .symptoms(appointment.getSymptoms())
                .notes(appointment.getNotes())
                .appointmentType(appointment.getAppointmentType())
                .build();
    }
}
