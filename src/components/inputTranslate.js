import './Components.css';
import axios from 'axios'
import { useEffect, useRef, useState } from 'react';
import {PiArrowsLeftRightBold, PiCaretDownBold} from 'react-icons/pi'
import {GrClose} from 'react-icons/gr'

 function Title(){
    

    const textAreaRef = useRef(null);
    const [val, setVal] = useState("");
    const handleChange = (e) => {
        setVal(e.target.value);
    }
    
    useEffect(() => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }, [val])

    function ResetTranslate(){
        document.getElementById('translateLingInput').value = ''
        document.getElementById('translateLingInput').style.height = 'auto'
        document.getElementById('translateLingInput').innerHTML = ''
        document.getElementById('translateLingResult').value = ''
        document.getElementById('translateLingResult').style.height = 'auto'
        document.getElementById('translateLingResult').innerHTML = ''
    }
    return (
        <div className='InputsDiv'>
            <div className='inputTranslate'>
                <div className='InputLing'><spam id='TranslateLingDetect'>Port</spam></div>
                <a className='ResetButton'><button onClick={()=> ResetTranslate()}> <GrClose color='fff'/> </button></a>
                <a><textarea id='translateLingInput' autoCorrect='on' autoComplete='on' type='text' wrap="hard" className='p-1 bg-neutral-700 active:outline-none focus:outline-none rounded' value={val} onChange={handleChange} rows="2" ref={textAreaRef}/></a>
            </div>  
            <a><PiArrowsLeftRightBold color='fff'/></a>
            <div className='inputTranslate select'>
                <input type='hidden' id='TranslateLingOnly' value={'us'} />
                <form>
                    <select className='InputLingInput'  id='lings' name='lings'>
                        <option value={`en`}>Ingles</option>
                        <option value={`es`}>Espanhol</option>
                        <option value={`fr`}>Frances</option>
                        <option value={`ja`}>Japones</option>
                        <option value={`pt`}>Português</option>
                        <option value={`pt-PT`}>Português (Portugal)</option>
                        <option value={`ru`}>Russo</option>
                        <option value={`zh-Hans`}>Chinês (Simplificado)</option>
                        <option value={`zh-Hant`}>Chinês (Tradicional)</option>
                        <option value={`uk`}>Ucraniano</option>
                        <option value={`pl`}>Polonês</option>
                    </select>
                </form>
                <a><textarea id='translateLingResult' readOnly type='text' wrap="hard" style={{width: '95%'}}  rows="2" /></a>
            </div>     
        </div>
    );
}

export default Title;