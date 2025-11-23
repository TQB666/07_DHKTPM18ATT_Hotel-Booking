package com.hotelbooking.hotel_booking.controller.admin;

import com.hotelbooking.hotel_booking.domain.Voucher;
import com.hotelbooking.hotel_booking.service.VoucherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/voucher")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminVoucherController {

    private final VoucherService voucherService;

    @GetMapping
    public List<Voucher> getAll() {
        return voucherService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Voucher v = voucherService.getById(id);
        return v != null ? ResponseEntity.ok(v) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Voucher voucher) {
        return ResponseEntity.ok(voucherService.create(voucher));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Voucher voucher) {
        Voucher updated = voucherService.update(id, voucher);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        boolean ok = voucherService.delete(id);
        return ok ? ResponseEntity.ok("Deleted") : ResponseEntity.notFound().build();
    }
}
