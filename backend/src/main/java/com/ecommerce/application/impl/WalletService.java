package com.ecommerce.application.impl;

import com.ecommerce.application.ICashContractService;
import com.ecommerce.application.IEthereumService;
import com.ecommerce.application.IWalletService;
import com.ecommerce.domain.Address;
import com.ecommerce.domain.Wallet;
import com.ecommerce.domain.exception.ApplicationException;
import com.ecommerce.domain.exception.NotFoundException;
import com.ecommerce.domain.repository.IWalletRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

/**
 * TODO Sub PJT Ⅱ 과제 1, 과제 3
 * 과제 1: 지갑 관련 기능 구현
 * 1) 지갑 등록, 2) 지갑 조회, 3) 충전
 * 과제 3: 지갑 관련 기능 확장 구현
 * 1) 지갑 토큰 잔액 조회 추가
 *
 * IWalletService를 implements 하여 구현합니다.
 */
@Service
public class WalletService implements IWalletService
{
	private static final Logger log = LoggerFactory.getLogger(WalletService.class);

	private IWalletRepository walletRepository;
	private IEthereumService ethereumService;
	private ICashContractService cashContractService;

	@Autowired
	public WalletService(IWalletRepository walletRepository,
						 IEthereumService ethereumService,
						 ICashContractService cashContractService) {
		this.walletRepository = walletRepository;
		this.ethereumService = ethereumService;
		this.cashContractService = cashContractService;
	}
	@Override
	public Wallet getAndSyncBalance(final String walletAddress)
	{
		log.debug("getAndSyncBalance Start");
		Wallet wallet = walletRepository.get(walletAddress);
		log.debug(wallet.toString());
		if(wallet == null)
			throw new NotFoundException(walletAddress + " 해당 주소 지갑을 찾을 수 없습니다.");

		// ether balance only
		/*
		BigDecimal currentBalance = new BigDecimal(this.ethereumService.getBalance(walletAddress));
		if(!wallet.getBalance().equals(currentBalance)) {
			wallet = this.syncBalance(walletAddress, currentBalance);
			wallet.setBalance(currentBalance);
		}
		*/

		// ether + cash balance
		Address address = this.ethereumService.getAddress(walletAddress);
		int cashBalance = this.cashContractService.getBalance(walletAddress);
		log.debug("cashBalance : "+cashBalance);
		if(!wallet.getBalance().equals(new BigDecimal(address.getBalance())) || wallet.getCash()!= cashBalance) {
			wallet = syncBalance(walletAddress, new BigDecimal(address.getBalance()), cashBalance);
			wallet.setBalance(new BigDecimal(address.getBalance()));
			wallet.setCash(cashBalance);
		}

		return wallet;
	}

	/**
	 * 사용자 id로 지갑을 조회한다.
	 * @param userId
	 * @return
	 */
	@Override
	public Wallet get(final long userId)
	{
		Wallet w = walletRepository.get(userId);
		return w;
	}

	/**
	 * 지갑을 DB에 등록한다.
	 * @param wallet
	 * @return
	 */
	@Override
	@Transactional
	public Wallet register(final Wallet wallet)
	{
		walletRepository.create(wallet);
		return wallet;
	}

	/**
	 * DB에 저장된 지갑주소의 정보와 이더리움의 잔액 정보를 동기화한다.
	 * @param walletAddress
	 * @return Wallet
	 */
	@Override
	public Wallet syncBalance(final String walletAddress, final BigDecimal balance, final int cash)
	{
		int affected = this.walletRepository.updateBalance(walletAddress, balance, cash);
		if(affected == 0)
			throw new ApplicationException("잔액 갱신 처리가 반영되지 않았습니다.");

		return this.walletRepository.get(walletAddress);
	}

	@Override
	public Wallet updateRequestNo(final String walletAddress)
	{
		int affected = walletRepository.updateRequestNo(walletAddress);
		if(affected == 0)
			throw new ApplicationException("충전회수갱신 처리가 반영되지 않았습니다.");

		return walletRepository.get(walletAddress);
	}

	/**
	 * [지갑주소]로 이더를 송금하는 충전 기능을 구현한다.
	 * 무한정 충전을 요청할 수 없도록 조건을 두어도 좋다.
	 * @param walletAddress
	 * @return Wallet
	 */
	@Override
	public Wallet requestEth(String walletAddress) {
		try{
			System.out.println("1" + walletAddress);
			String txHash = ethereumService.requestEth(walletAddress);
			System.out.println("2" + txHash);
			if(txHash == null || txHash.equals(""))
				throw new ApplicationException("충전 회수 갱신 트랜잭션을 보낼 수 없습니다!");
			log.info("received txhash: " + txHash);

			this.updateRequestNo(walletAddress);
			return getAndSyncBalance(walletAddress);
		}catch (Exception e) {
			throw new ApplicationException("[2] 충전할 수 없습니다!");
		}
	}
}
