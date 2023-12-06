package ecommerce.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ecommerce.entities.Product;
import ecommerce.entities.Seller;
import ecommerce.models.ProductDTO;
import ecommerce.models.ProductPagedResponseDTO;
import ecommerce.models.ProductResponseDTO;
import ecommerce.models.Response;
import ecommerce.services.ProductService;
import ecommerce.services.SellerService;

@CrossOrigin
@RestController
@RequestMapping("/api/products")
public class ProductController {
	
	//@Value("${get.images.awsPath}")
	private String imgPath="https://s3.ap-south-1.amazonaws.com/hexa-snowflake-workshop-lab/demo/appimages/";
	
	@Autowired ProductService productService;
	@Autowired SellerService sellerService;
	
	@PostMapping(value = "/saveProduct", consumes = { MediaType.APPLICATION_JSON_VALUE,
	MediaType.MULTIPART_FORM_DATA_VALUE }, produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<?> saveProduct(
			@RequestPart("ProductDTO") ProductDTO productDTO,
			@RequestPart("files") List<MultipartFile> files) {
		System.out.println(productDTO);
		Product product=ProductDTO.toEntity(productDTO);
		Seller seller=sellerService.findById(productDTO.getSellerId());
		product.setSeller(seller);
		productService.addProduct(product,files);
		return Response.success(product);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<?> updateProduct(@RequestBody Product product,@PathVariable("id") int id) {
		System.out.println(product);		
		productService.updateProduct(product);
		return Response.success(product);		
	}
	
	@GetMapping("{id}")
	public ResponseEntity<?> findProduct(@PathVariable("id")int id) {
		Product product=productService.findProductById(id);
		ProductResponseDTO productResponse=ProductResponseDTO.fromEntity(product);
		productResponse.setPhoto(imgPath+product.getPhoto());
		return Response.success(productResponse);
	}
	
	@GetMapping
	public ResponseEntity<?> findAllProducts(Optional<Integer> sellerid) {
		List<ProductResponseDTO> result = new ArrayList<ProductResponseDTO>();
		if(sellerid.isPresent()) {
			System.out.println(sellerid);
			for(Product p : productService.findProducts(sellerid.get())) {
				ProductResponseDTO productResponse=ProductResponseDTO.fromEntity(p);
				System.out.println("imgPath - "+imgPath);
				productResponse.setPhoto(imgPath+p.getPhoto());
				result.add(productResponse);
			}
			
		}else {
			for(Product p : productService.allProducts()) {
				ProductResponseDTO productResponse=ProductResponseDTO.fromEntity(p);
				productResponse.setPhoto(imgPath+p.getPhoto());
				result.add(productResponse);
			}
		}
		
		return Response.success(result);
	}
	
	@GetMapping("/paginated")
	public ResponseEntity<?> paginatedProducts(int page,int pagesize) {
		List<ProductResponseDTO> result = new ArrayList<ProductResponseDTO>();
		Page<Product> data=productService.allProductsPaginated(page, pagesize);
		data.forEach(item-> {
			ProductResponseDTO productResponse=ProductResponseDTO.fromEntity(item);
			productResponse.setPhoto(imgPath+item.getPhoto());
			result.add(productResponse);
		});
		ProductPagedResponseDTO resp=new ProductPagedResponseDTO();
		resp.setPagesize(pagesize);
		resp.setCurrent(page);
		resp.setTotal(data.getTotalElements());
		resp.setPlist(result);
		return Response.success(resp);
	}
	
	@GetMapping("cats")
	public ResponseEntity<?> findCategoryProducts(String cat,String subcat) {
		List<ProductResponseDTO> result = new ArrayList<ProductResponseDTO>();
		
		for(Product p : productService.categoryProducts(cat, subcat)) {
			ProductResponseDTO productResponse=ProductResponseDTO.fromEntity(p);
			productResponse.setPhoto(imgPath+p.getPhoto());
			result.add(productResponse);
		}
		
		return Response.success(result);
	}
		
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable("id") int id) {
		productService.deleteProduct(id);
		return Response.status(HttpStatus.OK);
	}
}