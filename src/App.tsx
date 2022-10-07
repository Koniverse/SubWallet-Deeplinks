import React, {ChangeEventHandler, EventHandler, MouseEventHandler, useState} from 'react';
import QRCode from 'react-qr-code';
import './App.css';

function App() {
    const [inputUrl, setInputUrl] = useState('');
    const [deeplink, setDeeplink] = useState('');
    const onUrlInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setInputUrl(event.target.value);
    }
    const onGenerateDeeplink: MouseEventHandler<HTMLButtonElement> = (event) => {
        if (inputUrl.startsWith('http')) {
            setDeeplink(`subwallet://browser?url=${encodeURIComponent(inputUrl)}`);
        } else {
            setDeeplink('');
        }
    }
    return (
        <div className="app-wrapper">
            <div className="app-container">
                <h3 className="main-title">
                    SubWallet Deep Link Generator
                </h3>
                <div className="app-content">
                    <input type="text" className="input-link" value={inputUrl} onChange={onUrlInputChange}
                           placeholder="DApp link (https://...)"/>
                    <button className="btn btn-primary generate-btn" onClick={onGenerateDeeplink}>Generate URL</button>
                    {deeplink !== '' && <>
                        <a className="deeplink-result" href={deeplink}>{deeplink}</a>
                        <div className='qr-wrapper'>
                            <QRCode
                                size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={deeplink}
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                    </>}
                </div>
            </div>
        </div>
    );
}

export default App;
