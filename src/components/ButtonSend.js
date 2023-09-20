import './Components.css';
import {PiTranslate} from 'react-icons/pi'
import axios from 'axios'

function ButtonSend(){

    async function traduzir(){
      var IndictorTranslateON = document.getElementById('TranslateLoadOn')
      var IndictorTranslateOFF = document.getElementById('TranslateLoadOff')
      var IndictorTranslateError = document.getElementById('TranslateLoadError')
      var ErrorDiv = document.getElementById('ErrorDivAlert')
      var TextEnter = document.getElementById('translateLingInput')
      var TextResult = document.getElementById('translateLingResult')
      var TranslateOnly = document.getElementById('TranslateLingOnly')
      var DetecLing = document.getElementById('TranslateLingDetect')
      var SelectLing = document.getElementById('lings')
      // ------------------------------------------------ // 
      IndictorTranslateON.style.display = 'flex'
      IndictorTranslateOFF.style.display = 'none'
      IndictorTranslateError.style.display = 'none'
      ErrorDiv.style.display = 'none'
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

      try {
        const response = await axios.request(options);
        if(response.data[0].detectedLanguage.language == 'pt'){
          DetecLing.innerHTML = 'Português'
        }else if(response.data[0].detectedLanguage.language == 'en'){
          DetecLing.innerHTML = 'Ingles'
        }else if(response.data[0].detectedLanguage.language == 'es'){
          DetecLing.innerHTML = 'Espanhol'
        }else if(response.data[0].detectedLanguage.language == 'fr'){
          DetecLing.innerHTML = 'Frances'
        }else if(response.data[0].detectedLanguage.language == 'ja'){
          DetecLing.innerHTML = 'Japones'
        }else if(response.data[0].detectedLanguage.language == 'pt-PT'){
          DetecLing.innerHTML = 'Português (Portugal)'
        }else if(response.data[0].detectedLanguage.language == 'ru'){
          DetecLing.innerHTML = 'Russo'
        }else if(response.data[0].detectedLanguage.language == 'zh-Hans'){
          DetecLing.innerHTML = 'Chinês (Simplificado)'
        }else if(response.data[0].detectedLanguage.language == 'zh-Hant'){
          DetecLing.innerHTML = 'Chinês (Tradicional)'
        }else if(response.data[0].detectedLanguage.language == 'uk'){
          DetecLing.innerHTML = 'Ucraniano'
        }else if(response.data[0].detectedLanguage.language == 'pl'){
          DetecLing.innerHTML = 'Polonês'
        }else{
          DetecLing.innerHTML = response.data[0].detectedLanguage.language
        }
        
        TextResult.style.height = TextEnter.style.height
        TextResult.value = `${response.data[0].translations[0].text}`
        TextResult.innerHTML = `${response.data[0].translations[0].text}`

        IndictorTranslateON.style.display = 'none'
        IndictorTranslateOFF.style.display = 'flex'
        IndictorTranslateError.style.display = 'none'
        ErrorDiv.style.display = 'none'
      } catch (error) {
        console.error(error);
        document.getElementById('ErrorSpanAlert').innerHTML =`Error: ${error}`
        IndictorTranslateON.style.display = 'none'
        IndictorTranslateOFF.style.display = 'none'
        IndictorTranslateError.style.display = 'flex'
        ErrorDiv.style.display = 'flex'
      }
    }


    return (
        <button className='TranslateBtn' onClick={()=> traduzir()}>
          <PiTranslate/>  Traduzir
        </button>
    );
}

export default ButtonSend;