package ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ecommerce.entities.Admin;
import ecommerce.entities.Customer;
import ecommerce.entities.Order;
import ecommerce.entities.Product;
import ecommerce.models.LoginDTO;
import ecommerce.models.Response;
import ecommerce.services.AdminService;
import ecommerce.services.CustomerService;
import ecommerce.services.OrderService;
import ecommerce.services.ProductService;
import ecommerce.services.SellerService;
import io.swagger.annotations.ApiOperation;

@CrossOrigin
@RestController
@RequestMapping("/api/admin")
public class AdminController {

	@Autowired
	AdminService adminService;
	@Autowired
	CustomerService customerService;
	@Autowired
	SellerService sellerService;
	@Autowired
	OrderService orderService;
	@Autowired
	ProductService productService;

	@PostMapping("/validate")
	@ApiOperation(value = "Validate the admin user")
	public ResponseEntity<?> validateUser(@RequestBody LoginDTO dto) {
		System.out.println(dto);
		Admin admin = adminService.validate(dto.getUserid(), dto.getPwd());
		if (admin != null)
			return Response.success(admin);
		else
			return Response.status(HttpStatus.NOT_FOUND);
	}

	@PostMapping
	@ApiOperation(value = "Update the admin profile such as name and password")
	public ResponseEntity<?> updateProfile(@RequestBody Admin admin) {
		adminService.updateAdmin(admin);
		return Response.status(HttpStatus.OK);
	}

	@DeleteMapping("/deleteCustomer/{id}")
	public ResponseEntity<?> deleteCustomer(@PathVariable("id") int custID) {
		Customer customer = customerService.findById(custID);
		List<Order> orderList = orderService.getCustomerOrders(customer);
		if (orderList == null || orderList.isEmpty()) {
			customerService.deleteCustomer(custID);
			return Response.status(HttpStatus.OK);
		} else {
			return Response.success("ORDER FOUND");
		}

	}

	@DeleteMapping("/deleteSeller/{id}")
	public ResponseEntity<?> deleteSeller(@PathVariable("id") int sellID) {
		List<Product> prodList = productService.findProducts(sellID);
		if (prodList == null || prodList.isEmpty()) {
			sellerService.deleteSeller(sellID);
			return Response.status(HttpStatus.OK);
		} else {
			return Response.success("PRODUCT FOUND");
		}

	}

	@DeleteMapping("/deleteOrder/{id}")
	public ResponseEntity<?> deleteOrder(@PathVariable("id") int OrdID) {
		orderService.deleteOrder(OrdID);
		return Response.status(HttpStatus.OK);
	}

}
