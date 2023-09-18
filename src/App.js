import Title from './components/Title'
import ButtonSend from './components/ButtonSend'
import InputTrans from './components/inputTranslate'
import {PiArrowsLeftRightBold} from 'react-icons/pi'
import './style.css'

function App(){



    return (
        <div className='center'>
            <Title/>
            <InputTrans/> 
            <ButtonSend/>
        </div>
    );
}

export default App;