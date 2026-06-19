package iuh.fit.backend.service;

import iuh.fit.backend.model.Order;
import iuh.fit.backend.model.Seller;
import iuh.fit.backend.model.Transaction;

import java.util.List;

/**
 * @author TrungNguyen
 * @created 4/30/2026
 * @description
 */
public interface TransactionService {

    Transaction createTransaction(Order order);
    List<Transaction> getTransactionsBySellerId(Seller seller);
    List<Transaction> getAllTransactions();
}
