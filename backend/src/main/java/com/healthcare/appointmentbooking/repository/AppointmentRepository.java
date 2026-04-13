package com.healthcare.appointmentbooking.repository;

import com.healthcare.appointmentbooking.model.Appointment;
import com.healthcare.appointmentbooking.model.Appointment.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByPatientId(Long patientId);

    List<Appointment> findByDoctorId(Long doctorId);

    List<Appointment> findByPatientEmail(String email);

    List<Appointment> findByStatus(AppointmentStatus status);

    List<Appointment> findByAppointmentDate(LocalDate date);

    @Query("SELECT a FROM Appointment a WHERE a.doctor.id = :doctorId " +
           "AND a.appointmentDate = :date AND a.appointmentTime = :time " +
           "AND a.status != 'CANCELLED'")
    List<Appointment> findConflictingAppointments(Long doctorId, LocalDate date, LocalTime time);

    @Query("SELECT a FROM Appointment a WHERE a.patient.email = :email ORDER BY a.appointmentDate DESC")
    List<Appointment> findByPatientEmailOrderByDateDesc(String email);
}
