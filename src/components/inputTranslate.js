import './Components.css';
import axios from 'axios'
import { useEffect, useRef, useState } from 'react';
import {PiEqualsBold, PiArrowClockwiseBold, PiXBold, PiCopyBold, PiSpeakerHighBold, PiArrowsCounterClockwiseBold } from 'react-icons/pi'
import {LuAlertTriangle} from 'react-icons/lu'


 function Title(){

    const textAreaRef = useRef(null);
    const [val, setVal] = useState("");
    const handleChange = (e) => {
        setVal(e.target.value);
        traduzir()
    }
    var VoiceLing = 'en'
    var IndictorTranslateON = document.getElementById('TranslateLoadOn')
    var IndictorTranslateOFF = document.getElementById('TranslateLoadOff')
    var IndictorTranslateError = document.getElementById('TranslateLoadError')
    var ErrorDiv = document.getElementById('ErrorDivAlert')
    var TextEnter = document.getElementById('translateLingInput')
    var TextResult = document.getElementById('translateLingResult')
    var DetecLing = document.getElementById('TranslateLingDetect')
    var SelectLing = document.getElementById('lings')
    
    useEffect(() => {
        textAreaRef.current.style.height = "55px";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }, [val])


    function ResetTranslate(){
        document.getElementById('translateLingInput').value = ''
        document.getElementById('translateLingInput').style.height = '65px'
        document.getElementById('translateLingInput').innerHTML = ''
        document.getElementById('translateLingResult').value = ''
        document.getElementById('translateLingResult').style.height = '65px'
        document.getElementById('translateLingResult').innerHTML = ''
    }
    function CopyTranslate(){
        var Value = document.getElementById('translateLingResult').value
        navigator.clipboard.writeText(Value)
    }
    function SpeekText(){
        VoiceLing = document.getElementById('lings').value
        var text = document.getElementById('translateLingResult').value
        let paragraph = new SpeechSynthesisUtterance(text);
        paragraph.lang = VoiceLing
        speechSynthesis.speak(paragraph)
    }
    function TranslateChanged(){
        var newVoiceLing = document.getElementById('lings').value
        if(VoiceLing != newVoiceLing){     
            VoiceLing = newVoiceLing
            traduzir()
        }
    }
    async function traduzir(){
        style('start')
        const options = {
          method: 'POST',
          url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
          params: {
            'to[0]': `${SelectLing.value}`,
            'api-version': '3.0',
            profanityAction: 'NoAction',
            textType: 'plain'
          },
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '4d1fc03470msh98ed2d469a33f37p102184jsn7cab8e913b66',
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
          },
          data: [
            {
              Text: TextEnter.value
            }
          ]
        };
        function DetectLing(value){
          if(value == 'pt'){
            DetecLing.innerHTML = 'Português'
          }else if(value == 'en'){
            DetecLing.innerHTML = 'Ingles'
          }else if(value == 'es'){
            DetecLing.innerHTML = 'Espanhol'
          }else if(value == 'fr'){
            DetecLing.innerHTML = 'Frances'
          }else if(value == 'ja'){
            DetecLing.innerHTML = 'Japones'
          }else if(value == 'pt-PT'){
            DetecLing.innerHTML = 'Português (Portugal)'
          }else if(value == 'ru'){
            DetecLing.innerHTML = 'Russo'
          }else if(value == 'zh-Hans'){
            DetecLing.innerHTML = 'Chinês (Simplificado)'
          }else if(value == 'zh-Hant'){
            DetecLing.innerHTML = 'Chinês (Tradicional)'
          }else if(value == 'uk'){
            DetecLing.innerHTML = 'Ucraniano'
          }else if(value == 'pl'){
            DetecLing.innerHTML = 'Polonês'
          }else{
            DetecLing.innerHTML = value
          }
        }
  
        try {
          const response = await axios.request(options);
          DetectLing(response.data[0].detectedLanguage.language)
          
          TextResult.style.height = TextEnter.style.height
          TextResult.value = `${response.data[0].translations[0].text}`
          TextResult.innerHTML = `${response.data[0].translations[0].text}`
  
          style('end')
        } catch (error) {
          console.error(error);
          document.getElementById('ErrorSpanAlert').innerHTML =`Error: ${error}`
          style('error')
        }
    }
    function style(value){
        if(value == 'start'){
          IndictorTranslateON.style.display = 'flex'
          IndictorTranslateOFF.style.display = 'none'
          IndictorTranslateError.style.display = 'none'
          ErrorDiv.style.display = 'none'
        }else if(value == 'end'){
          IndictorTranslateON.style.display = 'none'
          IndictorTranslateOFF.style.display = 'flex'
          IndictorTranslateError.style.display = 'none'
          ErrorDiv.style.display = 'none'
        }else if(value == 'error'){
          IndictorTranslateON.style.display = 'none'
          IndictorTranslateOFF.style.display = 'none'
          IndictorTranslateError.style.display = 'flex'
          ErrorDiv.style.display = 'flex'
        }else{
          console.log(`Valor não indetificado, \n Value: ${value}`)
        }
    }
  
    return (
        <div className='InputsDiv'>
            <div className='inputTranslate'>
                <div className='InputLing'><spam id='TranslateLingDetect'>Auto detector</spam></div>
                <a className='ExtraButton'><button onClick={()=> ResetTranslate()} style={{top: '4px'}}> <PiXBold color='fff'/> </button></a>
                <a><textarea placeholder='Dgite seu Texto:' id='translateLingInput'  style={{height: '65px'}} autoCorrect='on' autoComplete='on' type='text' wrap="hard" className='p-1 bg-neutral-700 active:outline-none focus:outline-none rounded' value={val}  onChange={handleChange}  rows="2" ref={textAreaRef}/></a>
            </div>  
            <a id='TranslateLoadOff'><PiEqualsBold color='fff'/></a>
            <a id='TranslateLoadOn'><PiArrowClockwiseBold color='fff'/></a>
            <a id='TranslateLoadError'><LuAlertTriangle/></a>
            <div className='inputTranslate select'>
                <input type='hidden' id='TranslateLingOnly' value={'us'} />
                <form>
                    <select className='InputLingInput' onChange={()=> TranslateChanged()}  id='lings' name='lings'>
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
                <a className='ExtraButton' ><button onClick={()=> CopyTranslate()} style={{top: '4px'}}> <PiCopyBold color='fff'/> </button></a>
                <a className='ExtraButton' ><button onClick={()=> SpeekText()} style={{top: '25px'}}> <PiSpeakerHighBold color='fff'/> </button></a>
                <a className='ExtraButton rotate' ><button onClick={()=> traduzir()} style={{top: '45px'}}> <PiArrowsCounterClockwiseBold color='fff'/> </button></a>
                <a><textarea placeholder='Tradução' id='translateLingResult' style={{height: '65px'}}  readOnly type='text' wrap="hard"   rows="2" /></a>
            </div>   
        </div>
    );
}

export default Title;