package ro.irian.labs.pizza.service;

import org.springframework.stereotype.Service;
import ro.irian.labs.pizza.domain.Store;
import ro.irian.labs.pizza.domain.StoreJPARepository;

import java.util.List;

@Service
public class StoreService {

    private final StoreJPARepository storeRepository;

    public StoreService(StoreJPARepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }

    public Store getStoreById(Long id) {
        return storeRepository.findById(id).orElseThrow();
    }

    public Store saveOrUpdateStore(Store store) {
        return storeRepository.save(store);
    }

    public void deleteStore(Long id) {
        storeRepository.deleteById(id);
    }
} 