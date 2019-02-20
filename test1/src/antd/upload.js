import React from 'react';
import ReactDOM from 'react-dom';
import { Upload, Icon, message } from 'antd';
import 'antd/dist/antd.css';
import "./upload.css";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  //const isJPG = file.type === 'image/jpeg';
  const isJPG = ['image/gif', 'image/png', 'image/jpeg'].indexOf(file.type) !== -1;
  if (!isJPG) {
    message.error('图片格式不符合要求！gif/png/jpg');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class Avatar extends React.Component {
  state = {
    loading: false,
    imgUrl1: null,
    imgUrl2: null,
    imgUrl3: null
  };

  handleChange = (info, i) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        if (i == 1) this.setState({ imageUrl1: imageUrl, loading: false });
        if (i == 2) this.setState({ imageUrl2: imageUrl, loading: false });
        if (i == 3) this.setState({ imageUrl3: imageUrl, loading: false });
      }
      );
    }
  }

  render() {
    const UploadButton = ({ name }) => (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">{name}</div>
      </div>
    );
    const { imageUrl1, imageUrl2, imageUrl3 } = this.state;
    return (
      <div>
        <Upload
          name="file"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="/backend/index.php?g=Api&m=Common&a=upload&side=f"
          beforeUpload={beforeUpload}
          onChange={(info) => this.handleChange(info, 1)}
        >
          {imageUrl1 ? <img src={imageUrl1} width="100px" alt="avatar" />
            : <UploadButton name="正面" />}
        </Upload>
        <Upload
          name="file"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="/backend/index.php?g=Api&m=Common&a=upload&side=b"
          beforeUpload={beforeUpload}
          onChange={(info) => this.handleChange(info, 2)}
        >
          {imageUrl2 ? <img src={imageUrl2} width="100px" alt="avatar" />
            : <UploadButton name="背面" />}
        </Upload>
        <Upload
          name="file"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="/backend/index.php?g=Api&m=Common&a=upload&side=h"
          beforeUpload={beforeUpload}
          onChange={(info) => this.handleChange(info, 3)}
        >
          {imageUrl3 ? <img src={imageUrl3} width="100px" alt="avatar" />
            : <UploadButton name="手持" />}
        </Upload>


      </div>
    );
  }
}
/**
 * 把 <Avatar /> 渲染的合适的位置即可。注意 css
 */

ReactDOM.render(<Avatar />, document.getElementById('root'));