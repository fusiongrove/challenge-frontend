import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import ReactCrop, {makeAspectCrop} from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
import 'regenerator-runtime/runtime';

export default class ImageCropper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: this.props.file,
      previewImage: this.props.previewImage,
    };

    this.onCropperChange = this.onCropperChange.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.handleCrop = this.handleCrop.bind(this);
  }

  onCropperChange(crop, pixelCrop) {
    this.setState({
      crop: crop,
      pixelCrop: pixelCrop
    });
  }

  onImageLoaded(image) {
    this.setState({
      crop: makeAspectCrop({
        x: 0,
        y: 0,
        aspect: 4 / 4,
        width: 10,
      }, image.width / image.height),
      image
    });
  }

  async handleCrop() {
    const {image, pixelCrop} = this.state;
    const fireWarning = () => {
     // handle Error
    };

    if (pixelCrop) {
      const croppedImg = await getCroppedImg(image, pixelCrop, 'test');
      if (croppedImg == 'data:,') {
        fireWarning();
      } else  {
        this.props.handleCrop(croppedImg, this.props.imgIndex);
      }
    } else {
      fireWarning();
    }
  }

  render() {
    let {crop} = this.state;

    return (
      <div>
        <ModalContainer>
          <ModalDialog id="image-cropper">
            <ReactCrop src={this.state.previewImage} crop={crop} onChange={this.onCropperChange}
                       onImageLoaded={this.onImageLoaded}/>
            <button className="btn btn-crop" onClick={this.handleCrop}>Crop</button>
          </ModalDialog>
        </ModalContainer>
      </div>
    );
  }
}

function getCroppedImg(image, pixelCrop, fileName) {

  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  // As Base64 string
  const base64Image = canvas.toDataURL('image/jpeg');
  return base64Image;
}