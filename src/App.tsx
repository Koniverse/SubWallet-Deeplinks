import React, {ChangeEventHandler, KeyboardEventHandler, useState} from 'react';
import QRCode from 'react-qr-code';
import './App.css';
import {checkIfDenied} from "@polkadot/phishing/bundle";


function App() {
    const [inputUrl, setInputUrl] = useState('');
    const [deeplink, setDeeplink] = useState('');
    const [warning, setWarning] = useState('');
    const onUrlInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setInputUrl(event.target.value);
        setWarning('')
        setDeeplink('');
    }
    const onGenerateDeeplink = () => {
        const url = inputUrl.trim();
        const checkUrl = new URL(url);
            if (!checkUrl.protocol.startsWith('http')) {
                setWarning('Invalid URL, please input valid URL starts with http or https!');
            } else {
                checkIfDenied(checkUrl.host)
                    .then((isDenied) => {
                        if (!isDenied) {
                            setDeeplink(`https://mobile.subwallet.app/browser?url=${encodeURIComponent(url)}`);
                            setWarning('')
                        } else {
                            setWarning('Phishing URL detected !!!')
                            setDeeplink('');
                        }
                    })
            }
    }

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      onGenerateDeeplink();
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
                           placeholder="DApp link (https://...)" onKeyUp={handleKeyDown}/>
                    {warning !== '' && <div className="warning">
                        {warning}
                    </div>}
                    <button className="btn btn-primary generate-btn" onClick={onGenerateDeeplink}>Generate URL</button>
                    {deeplink !== '' && <>
                        <a className="deeplink-result" href={deeplink}>{deeplink}</a>
                        <div className='qr-wrapper'>
                            <QRCode
                                size={256}
                                style={{height: "auto", maxWidth: "100%", width: "100%"}}
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
