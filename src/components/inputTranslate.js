import './Components.css';
import { useEffect, useRef, useState } from 'react';
import {PiArrowsLeftRightBold, PiCaretDownBold} from 'react-icons/pi'

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


    const textAreaRef2 = useRef(null);
    const [val2, setVal2] = useState("");
    const handleChange2 = (e) => {
        setVal2(e.target.value);
    }

    useEffect(() => {
        textAreaRef2.current.style.height = "auto";
        textAreaRef2.current.style.height = textAreaRef2.current.scrollHeight + "px";
    }, [val2])
    
    return (
        <div className='InputsDiv'>
            <div className='inputTranslate'>
                <a className='InputLing'><span><PiCaretDownBold color='000'/></span> <span>Portugues</span></a>
                <textarea type='text' wrap="hard" className='p-1 bg-neutral-700 active:outline-none focus:outline-none rounded' value={val} onChange={handleChange} rows="2" ref={textAreaRef}/>
            </div>  
            <a><PiArrowsLeftRightBold color='fff'/></a>
            <div className='inputTranslate'>
                <a className='InputLing'><span><PiCaretDownBold color='000'/></span> <span>inglês</span></a>
                <textarea type='text' wrap="hard" className='p-1 bg-neutral-700 active:outline-none focus:outline-none rounded' value={val2} onChange={handleChange2} rows="2" ref={textAreaRef2}/>
            </div>          
        </div>
    );
}

export default Title;