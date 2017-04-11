package ru.m2mcom.pond.repository;

import ru.m2mcom.pond.domain.Device;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Device entity.
 */
@SuppressWarnings("unused")
public interface DeviceRepository extends JpaRepository<Device,Long> {

    @Query("select device from Device device where device.user.login = ?#{principal.username}")
    List<Device> findByUserIsCurrentUser();

}
