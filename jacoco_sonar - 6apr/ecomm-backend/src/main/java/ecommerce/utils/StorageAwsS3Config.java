package ecommerce.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
public class StorageAwsS3Config {

	//@Value("${access.key.id}")
	private String accessKey="s3-access-key";

	//@Value("${access.key.secret}")
	private String accessSecret="s3-access-secret";

	//@Value("${s3.region.name}")
	private String accessRegion="ap-south-1";

	@Bean
	public AmazonS3 generateS3Client() {

		 System.out.println("aws details - "+accessKey+" - "+accessSecret+" - "+accessRegion );
		 
		AWSCredentials credentials = new BasicAWSCredentials(accessKey, accessSecret);
		return AmazonS3ClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(credentials))
				.withRegion(accessRegion).build();

	}

}