import {React} from "react"
import './add-product.css';
import { useState , useEffect, useCallback} from 'react';
import { Container, Card, TextField, Button, InputLabel, MenuItem, Select, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserService from '../../_services/user.service';
import UserAuthComponent from '../../_auth/user.auth';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { GridList, GridListTile, ImageListItem, ImageList} from '@material-ui/core';
import ProductService from "../../_services/product.service";
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    padding: '10px',
    '& label.Mui-focused': {
      color: '#9e7361',
    },
    '& .MuiTextField-root': {
      margin: '10px 0',
    },
    '& .MuiSelect-root': {
      '&:focus': {
        backgroundColor: 'transparent',
      },
      '& .MuiSelect-icon': {
        color: '#9e7361',
      },
    },
    '& .MuiInputBase-root': {
      '&:hover': {
        borderColor: '#9e7361',
      },
      '&.Mui-focused': {
        borderColor: '#9e7361',
      },
      '&.Mui-error': {
        borderColor: '#f44336',
      },
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#9e7361',
  },
  },
  btnColor: {
    backgroundColor: '#9e7361',
    width: '200px',
    color: 'white',
    margin: '20px',
    '&:hover': {
      backgroundColor: '#9e7361',
    },
  },
});

export const AddProduct = ({product, setProduct}) => {
 console.log(product)
 const [id, setId] = useState(product?.id || '');
  const [productName, setProductName] = useState(product?.productName || '');
  const [productDescription, setProductDescription] = useState(product?.productDescription || '');
  const [productDiscountedPrice, setProductDiscountedPrice] = useState(product?.productDiscoutedPrice || '');
  const [productActualPrice, setProductActualPrice] = useState(product?.productActualPrice || '');
  const [deliveryDays, setDeliveryDays] = useState(product?.deliveryDays || '');
  const [productStock, setProductStock] = useState(product?.productStock || '');
  const [type, setType] = useState(product?.type || '');
  const [productImages, setProductImages] = useState(product?.productImages ||  []);
  const [imageNotFound, setImageNotFound] = useState(false);
  const classes = useStyles();

  setProduct(null);

    const productService = new ProductService();
    const userAuthService = new UserAuthComponent();
    const navigate = useNavigate();
    
    const convertFilesUrl = async () => {
      const images = [];
      for (let i = 0; i < productImages.length; i++) {
        images.push({
          url: await base64ToBlob(productImages[i].url),
          file: productImages[i].file
        });
      }
      console.log(images); // Add this line to check the value of images
      return images;
    };

    const removeImage = (index) => {
      const images = [...productImages];
      images.splice(index, 1);
      setProductImages(images);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      if (productImages.length === 0) {
        setImageNotFound(true);
      } else {
        setImageNotFound(false);
        let product;

        if(id !== '') {
          product = {id: id, productName: productName, productDescription: productDescription,
            productDiscountedPrice: productDiscountedPrice, productActualPrice: productActualPrice,
            deliveryDays: deliveryDays, type: type, productStock: productStock}
        } else {
          product = {productName: productName, productDescription: productDescription,
            productDiscountedPrice: productDiscountedPrice, productActualPrice: productActualPrice,
            deliveryDays: deliveryDays, type: type, productStock: productStock}
        }
    
        const convertedImages = await convertFilesUrl();
        console.log(convertedImages);
        productService.addNewProduct(product, convertedImages)
          .then((response) => {
            console.log(response);
            setId("");
            setProductName("");
            setProductDescription("");
            setProductDiscountedPrice("");
            setProductActualPrice("");
            setDeliveryDays("");
            setType("");
            setProductStock("");
            setProductImages([]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const images = [...productImages];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        images.push({
          url: reader.result,
          file,
        });

        setProductImages(images);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileSelect = (e) => {
    e.preventDefault();
    console.log("select file")
    const files = e.target.files;
    const images = [...productImages];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        images.push({
          url: reader.result,
          file,
        });

        setProductImages(images);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  function base64ToBlob(base64String) {
    const parts = base64String.split(';base64,');
    const mimeType = parts[0].split(':')[1];
    const binaryString = window.atob(parts[1]);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type: mimeType });
  }


    return (
        <><div className="welcome">
              {productName ==='' ? (
                <h1>Please add a product!</h1>
              ) :
              (<h1>Please update {productName}!</h1>
              )}
            </div>
            <Container maxWidth="sm" className="container-props">
                <Card style={{ padding: '20px' }}>                   
                <form onSubmit={handleSubmit}  className={classes.root} id='product-form'>
    
                        <TextField
                        fullWidth
                        label="Enter product name"
                        variant="outlined"
                        value={productName}
                        onChange={(event) => setProductName(event.target.value)}
                        required
                        />
                    
                        <TextField
                        fullWidth
                        label="Enter product description"
                        variant="outlined"
                        value={productDescription}
                        onChange={(event) => setProductDescription(event.target.value)}
                        required
                        />
                        <TextField
                        fullWidth
                        label="Enter product discounted price"
                        variant="outlined"
                        type="number"
                        value={productDiscountedPrice}
                        onChange={(event) => setProductDiscountedPrice(event.target.value)}
                        />
                        <TextField
                        fullWidth
                        label="Enter product actual price"
                        variant="outlined"
                        type="number"
                        value={productActualPrice}
                        onChange={(event) => setProductActualPrice(event.target.value)}
                        required
                        />
                        <TextField
                        fullWidth
                        label="Enter product delivery days"
                        variant="outlined"
                        type="number"
                        value={deliveryDays}
                        onChange={(event) => setDeliveryDays(event.target.value)}
                        />
                        <TextField
                        fullWidth
                        label="Enter product stock"
                        variant="outlined"
                        type="number"
                        value={productStock}
                        onChange={(event) => setProductStock(event.target.value)}
                        />

                          <InputLabel id="type-label" shrink={type !== ''}>Choose a type</InputLabel>
                              <Select
                              IconComponent={ExpandMoreIcon}
                                  fullWidth
                                  labelId="type-label"
                                  id="type"
                                  name="type"
                                  value={type}
                                  onChange={(event) => setType(event.target.value)}
                                  variant="outlined"
                                  label="Choose a type"
                                  required 
                                  inputProps={{
                                    'aria-label': 'Choose a type',
                                    'aria-describedby': 'type-label'
                                }}

                              >
                                <InputLabel id="type-label">Choose a type</InputLabel>
                                <MenuItem value="Foundation">Foundation</MenuItem>
                                <MenuItem value="Concelear">Concelear</MenuItem>
                                <MenuItem value="Face powder">Face powder</MenuItem>
                                <MenuItem value="Make-up palette">Make-up palette</MenuItem>
                                <MenuItem value="Mascara">Mascara</MenuItem>
                                <MenuItem value="Eyeliner">Eyeliner</MenuItem>
                                <MenuItem value="Eye pencil">Eye pencil</MenuItem>
                                <MenuItem value="False lashes">False lashes</MenuItem>
                                <MenuItem value="Eyebrows pencil">Eyebrows pencil</MenuItem>
                                <MenuItem value="Eyebrows gel">Eyebrows gel</MenuItem>
                                <MenuItem value="Lipstick">Lipstick</MenuItem>
                                <MenuItem value="Gloss">Gloss</MenuItem>
                                <MenuItem value="Lip pencil">Lip pencil</MenuItem>
                                <MenuItem value="Lip balm">Lip balm</MenuItem>
                                <MenuItem value="Nail polish">Nail polish</MenuItem>
                                <MenuItem value="Nail base">Nail base</MenuItem>
                                <MenuItem value="Top coat">Top coat</MenuItem>
                                <MenuItem value="Make-up brushes">Make-up brushes</MenuItem>
                                <MenuItem value="Woman eau de parfume">Woman eau de parfume</MenuItem>
                                <MenuItem value="Woman eau de toalette">Woman eau de toalette</MenuItem>
                                <MenuItem value="Man eau de parfume">Man eau de parfume</MenuItem>
                                <MenuItem value="Man eau de toalette">Man eau de toalette</MenuItem>
                                <MenuItem value="Day face cream">Day face cream</MenuItem>
                                <MenuItem value="Night face cream">Night face cream</MenuItem>
                                <MenuItem value="Face mask">Face mask</MenuItem>
                                <MenuItem value="Lipstick">Lipstick</MenuItem>
                                <MenuItem value="Body cream">Body cream</MenuItem>
                                <MenuItem value="Body oil">Body oil</MenuItem>
                                <MenuItem value="Hands care">Hands care</MenuItem>
                                <MenuItem value="Feet care">Feet care</MenuItem>
                                <MenuItem value="Shampoo">Shampoo</MenuItem>
                                <MenuItem value="Hair balm">Hair balm</MenuItem>
                                <MenuItem value="Hair mask">Hair mask</MenuItem>
                                <MenuItem value="Hair oil">Hair oil</MenuItem>
                                <MenuItem value="Hair tie">Hair tie</MenuItem>
                                <MenuItem value="Hair brush">Hair brush</MenuItem>
                                <MenuItem value="Hair pins">Hair pins</MenuItem>
                                <MenuItem value="Hair gel">Hair gel</MenuItem>
                                <MenuItem value="Hair spray">Hair spray</MenuItem>
                                <MenuItem value="Hair wax">Hair wax</MenuItem>
                                <MenuItem value="Shower gel">Shower gel</MenuItem>
                                <MenuItem value="Shower oil">Shower oil </MenuItem>
                                <MenuItem value="Soap">Soap </MenuItem>
                                <MenuItem value="Bath salt">Bath salt </MenuItem>
                              </Select>

                              <div className="dropzone" onDrop={handleFileDrop} onDragOver={(e) => e.preventDefault()}>
                                  <div className="text-wrapper centered">
                                    Drag and drop your file or{' '}
                                    <label htmlFor="file-upload" className="browse-button">
                                      browse
                                    </label>{' '}
                                    a file
                                    <input id="file-upload" type="file"  onClick={(e) => (e.target.value = null)} onChange={handleFileSelect} multiple={true} style={{ display: 'none' }} />
                                  </div>
                                </div>

                                <div>
                                {imageNotFound && <div className="error-style">Please upload at least one image!</div>}
                                </div>

                                {productImages.length > 0 && (
                                  <div>
                                    <ImageList cols={4} rowHeight={130}>
                                      {productImages.map((image, index) => (
                                        <ImageListItem key={index} classes={{ item: "product-item" }}>
                                          <div style={{ position: 'relative' }}>
                                            <img src={image.url} className="image-props" />
                                            <span className="btn-remove-image" onClick={() => removeImage(index)}>
                                              x
                                            </span>
                                          </div>
                                        </ImageListItem>
                                      ))}
                                    </ImageList>
                                  </div>
                              )}

                        {productName === '' ? (
                              <Button variant="contained" className={classes.btnColor} type="submit">
                                Add Product
                              </Button>
                            ) :
                            (
                              <Button variant="contained" className={classes.btnColor} type="submit">
                                Update Product
                              </Button>
                        )}
                </form>
            </Card>
        </Container>
        </>
    );
}