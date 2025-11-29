package com.hotelbooking.hotel_booking.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hotelbooking.hotel_booking.domain.Tag;
import com.hotelbooking.hotel_booking.repository.TagRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TagService {
    private final TagRepository tagRepository;


    public List<Tag> getAll(){
        return tagRepository.findAll();
    } 

    public Tag findById(Long id){
        return tagRepository.findById(id).get();
    }

    public Tag save(Tag tag){
        return tagRepository.save(tag);
    }

    public void delete(Tag tag){
        tagRepository.delete(tag);
    }

    public boolean existsByName(String name){
        return tagRepository.existsByName(name);
    }
}
