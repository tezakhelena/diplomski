package com.project.LostPaw.enumeration;

import lombok.Getter;

@Getter
public enum NotificationStatus {

    NOTIFICATION_READ(1, "Notifikacija pročitana"),
    NOTIFICATION_UNREAD(0, "Notifikacija nepročitana");

    private Integer code;
    private String sadrzaj;

    private NotificationStatus(Integer code, String sadrzaj){
        this.code = code;
        this.sadrzaj = sadrzaj;
    }
}
