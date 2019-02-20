import React from 'react';
import ReactDOM from 'react-dom';
import { Upload, Icon, Modal } from 'antd';
import 'antd/dist/antd.css';
import "./upload.css";
class PicturesWall extends React.Component {
    // {
    //     uid: '-1',
    //     name: 'xxx.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // }    
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    // file.name 不能修改
    // beforeFun = (file,filelist) => {
        
    //     if(file.uid.slice(-1) == '2') file.name = "sfz_f.jpg";
    //     if(file.uid.slice(-1) == '4') file.name = "sfz_b.jpg";
    //     if(file.uid.slice(-1) == '6') file.name = "sfz_h.jpg";
    //     console.log('file:',file);
    //     console.log('filelist:',filelist);
    // }

    handleChange = ({ fileList }) => this.setState({ fileList })
    // handleChange = (fl) => {
    //     if(fl.file.name){

    //     }
    //     console.log("ff:",fl);
    //     const fileList = fl.fileList;
    //     this.setState({ fileList });
    // }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    //action="//jsonplaceholder.typicode.com/posts/"
                    action="/backend/index.php?g=Api&m=Common&a=upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

ReactDOM.render(<PicturesWall />, document.getElementById('root'));