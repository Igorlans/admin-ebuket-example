import React, {useState} from 'react';
import classes from "./cropper.module.scss";
import Image from "next/image";
import FileUploader from "@/components/UI/FileUploader/FileUploader";
import CropDialog from "./CropDialog/CropDialog";
import {IoMdClose} from "react-icons/io";

const Cropper = ({file, setFile, rounded, width = 290, height = 290, placeholder = '/assets/icons/image_uploader.svg'}) => {

	const [image, setImage] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleFileUpload = (file) => {
		// const imageUrl = URL.createObjectURL(file);
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setSelectedImage(reader.result);
		};
		setIsModalVisible(true);
	}

	return (
		<div>
			{isModalVisible &&
				<CropDialog
					selectedImage={selectedImage}
					setSelectedImage={setSelectedImage}
					file={file}
					setFile={setFile}
					isVisible={isModalVisible}
					setIsVisible={setIsModalVisible}
					setNewImage={setImage}
				/>
			}
			{image
				?
				<div
					className={classes.uploadImage}
					style={{
						border: rounded || 'none',
						flexShrink: 0
					}}
					onClick={() => {
						setIsModalVisible(true)
						// setSelectedImage(image)
					}}
				>
					<div className={classes.overlay}>
					</div>
					<Image src={image || selectedImage} alt={'uploader'} width={width} height={height}
					   style={{
							borderRadius: rounded && '50%',
						   	flexShrink: 0
					   }} />
					<div
						className={classes.close}
						onClick={(e) => {
							e.stopPropagation()
							setImage(null)
							setFile(null)
						}}
					>
						<IoMdClose size={width > 200 ? '30px' : '20px'} />
					</div>
				</div>
				:
				<FileUploader style={{width: width, height: height}} className={classes.uploadImage} handleFile={handleFileUpload}>
					<Image src={placeholder} alt={'uploader'} width={width} height={height}
						   style={{
							   borderRadius: rounded && '50%',
							   flexShrink: 0
						   }}
					/>
				</FileUploader>
			}
		</div>
	);
};

export default Cropper;