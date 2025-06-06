package ro.irian.labs.pizza.web.lib;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import ro.irian.labs.pizza.domain.Store;
import ro.irian.labs.pizza.service.StoreService;

import java.util.List;

@RestController
@RequestMapping("stores")
public class StoreController {

    private final StoreService storeService;

    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    @GetMapping
    public List<Store> getAllStores() {
        return storeService.getAllStores();
    }

    @GetMapping("/{storeId}")
    public Store getStoreById(@PathVariable Long storeId) {
        return storeService.getStoreById(storeId);
    }

    @PostMapping
    @Secured("ROLE_ADMIN")
    public Store saveOrUpdateStore(@RequestBody Store store) {
        return storeService.saveOrUpdateStore(store);
    }

    @PutMapping("/{storeId}")
    @Secured("ROLE_ADMIN")
    public Store updateStore(@PathVariable Long storeId, @RequestBody Store store) {
        store.setId(storeId);
        return storeService.saveOrUpdateStore(store);
    }

    @DeleteMapping("/{storeId}")
    @Secured("ROLE_ADMIN")
    public void deleteStore(@PathVariable Long storeId) {
        storeService.deleteStore(storeId);
    }
} 