class ImageProcessingService {
  constructor() {
  }

  async createImages(product) {
    const productImages = product.productImages;

    const productImagesToFileHandle = [];

    for(let i = 0; i < productImages.length; i++) {
      const imageFileData = productImages[i];

      const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);

      const imageFile = new File([imageBlob], imageFileData.name, {type: imageFileData.type});

      const finalFileHandle = {
        file: imageFile,
        // url: window.URL.createObjectURL(imageFile)
        url: await this.readFileAsDataURL(imageFile),
      };

      productImagesToFileHandle.push(finalFileHandle);
    }

    product.productImages = productImagesToFileHandle;
    return product;
  }

  async readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  dataURItoBlob(picBytes, imageType) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([int8Array], {type: imageType});
  }
}

export default ImageProcessingService;