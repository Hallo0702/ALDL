package ALDL.aldl.db;

import ALDL.aldl.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface WalletRepository extends JpaRepository<Wallet,Long> {
}
