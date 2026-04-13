package com.healthcare.appointmentbooking.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AppointmentRequest {

    @NotNull
    private Long doctorId;

    @NotNull
    private Long patientId;

    @NotNull
    private LocalDate appointmentDate;

    @NotNull
    private LocalTime appointmentTime;

    private String symptoms;

    private String notes;

    private String appointmentType;
}
