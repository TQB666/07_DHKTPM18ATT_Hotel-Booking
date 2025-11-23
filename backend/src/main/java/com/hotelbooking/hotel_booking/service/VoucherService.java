package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.domain.Voucher;
import com.hotelbooking.hotel_booking.repository.VoucherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VoucherService {

    private final VoucherRepository voucherRepository;

    public List<Voucher> getAll() {
        return voucherRepository.findAll();
    }

    public Voucher getById(Long id) {
        return voucherRepository.findById(id).orElse(null);
    }

    public Voucher create(Voucher voucher) {
        return voucherRepository.save(voucher);
    }

    public Voucher update(Long id, Voucher updated) {
        return voucherRepository.findById(id).map(v -> {
            v.setName(updated.getName());
            v.setDiscount(updated.getDiscount());
            v.setStartDate(updated.getStartDate());
            v.setEndDate(updated.getEndDate());
            return voucherRepository.save(v);
        }).orElse(null);
    }

    public boolean delete(Long id) {
        if (!voucherRepository.existsById(id)) return false;
        voucherRepository.deleteById(id);
        return true;
    }
}
