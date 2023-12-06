package ecommerce.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecommerce.daos.OrderDao;
import ecommerce.daos.OrderDetailsDao;
import ecommerce.daos.PaymentDao;
import ecommerce.entities.Customer;
import ecommerce.entities.Order;
import ecommerce.entities.OrderDetails;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired OrderDao dao;
	@Autowired OrderDetailsDao detailDao; 
	@Autowired PaymentDao paymentDao;
	
	@Override
	public Order saveOrder(Order order) {
		// TODO Auto-generated method stub
		return dao.save(order);
	}

	@Override
	public List<Order> getAllOrders() {
		// TODO Auto-generated method stub
		return dao.findAll();
	}

	@Override
	public List<Order> getCustomerOrders(Customer customer) {
		// TODO Auto-generated method stub
		return dao.findByCustomer(customer);
	}

	@Override
	public Order findById(int id) {
		// TODO Auto-generated method stub
		return dao.getById(id);
	}

	@Override
	public void deleteOrder(int id) {
		// TODO Auto-generated method stub
		Order order=dao.getById(id);
		List<OrderDetails> ordDetails= detailDao.findByOrder(order);
		detailDao.deleteAll(ordDetails);		
		dao.delete(order);	
		paymentDao.delete(order.getPayment());
		
	}

	
}
