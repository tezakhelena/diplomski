package com.project.LostPaw.controller;
import com.project.LostPaw.dto.response.ApiResponse;
import com.project.LostPaw.dto.response.NotificationResponse;
import com.project.LostPaw.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notification")
@CrossOrigin
public class NotificationController {

    @Autowired
    NotificationService notificationService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<NotificationResponse>> getNotificationsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationService.getNotificationsByUserId(userId));
    }

    @PutMapping("/read/{userId}")
    public ResponseEntity<ApiResponse> markAllAsRead(@PathVariable Long userId) {
        try {
            notificationService.markAllAsRead(userId);
            return ResponseEntity.ok(new ApiResponse(true, "Sve notifikacije su označene kao pročitane."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Greška prilikom ažuriranja statusa notifikacije."));
        }
    }

    @PutMapping("/clear/{userId}")
    public ResponseEntity<ApiResponse> deleteAllNotifications(@PathVariable Long userId) {
        try {
            notificationService.deleteAllNotifications(userId);
            return ResponseEntity.ok(new ApiResponse(true, "Sve notifikacije su uspješno očišćene."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Greška kod čišćenja notifikacija."));
        }
    }
}
