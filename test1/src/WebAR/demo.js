import React from 'react';
import ReactDOM from 'react-dom';

let videoDeviceElement = [];


function demo() {
    navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
            devices.find((device) => {
                if (device.kind === 'videoinput') {
                    const option = document.createElement('option');
                    option.text = device.label || 'camera ' + (videoDeviceElement.length + 1).toString();
                    option.value = device.deviceId;

                    // 将摄像头id存储在select元素中，方便切换前、后置摄像头
                    videoDeviceElement.appendChild(option);
                }
            });

            if (videoDeviceElement.length === 0) {
                //reject('没有摄像头');
                console.log('没有摄像头')
            } else {
                console.log('有摄像头')
                //resolve(true);
            }
        })
        .catch((err) => {
            //reject(err);
        });
}

function demo1(){
    const constraints = {
        audio: false,
        video: {deviceId: {exact: deviceId}}
    };
    
    navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                // videoElement为video元素，将摄像头视频流绑定到video上实时预览
                videoElement.srcObject = stream;
                videoElement.style.display = 'block';
                videoElement.play();
                resolve(true);
            })
            .catch((err) => {
                reject(err);
            });    
}

const App = () => <div>
    {demo()}
    {demo1()}

</div>

ReactDOM.render(<App />, document.getElementById('root'));
