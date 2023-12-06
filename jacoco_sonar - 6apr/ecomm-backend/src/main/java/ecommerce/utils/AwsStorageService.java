package ecommerce.utils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;

@Service
public class AwsStorageService {

	//@Value("${s3.bucket.name}")
	private String bucketName="hexa-snowflake-workshop-lab/demo/appimages";

	@Autowired
	private AmazonS3 awsS3Client;

	public String uploadFile(MultipartFile files) {
		 System.out.println("aws bucketName - "+bucketName);
		File fileObj = convertMultipartFileToFile(files);
		//String fileName = System.currentTimeMillis() + "-" + files.getOriginalFilename();
		String ext=files.getOriginalFilename().substring(files.getOriginalFilename().lastIndexOf("."));
		System.out.println(ext);
		String fileName = UUID.randomUUID().toString().replaceAll("-", "")+ext;
		awsS3Client.putObject(new PutObjectRequest(bucketName, fileName, fileObj));
		fileObj.delete();
		return fileName;
	}

	public byte[] downloadFile(String fileName) {
		S3Object s3Object = awsS3Client.getObject(bucketName, fileName);
		S3ObjectInputStream inputStream = s3Object.getObjectContent();
		try {
			byte[] content = IOUtils.toByteArray(inputStream);
			return content;
		} catch (IOException io) {
			io.printStackTrace();
		}
		return null;
	}
	
	public String deleteFile(String fileName)
	{
		awsS3Client.deleteObject(bucketName, fileName);
		return fileName;
	}
	
	public String getImgObject(String key) {
	    S3Object s3Object = awsS3Client.getObject(bucketName, key);
        String imagePath = s3Object.getKey();
        return imagePath;
    }

	private File convertMultipartFileToFile(MultipartFile files) {

		File convertedFile = new File(files.getOriginalFilename());
		try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
			fos.write(files.getBytes());
		} catch (IOException io) {
			System.out.println("Error converting MultipartFile to file");
		}

		return convertedFile;
	}

}