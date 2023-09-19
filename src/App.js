import Title from './components/Title';
import ButtonSend from './components/ButtonSend';
import InputTrans from './components/inputTranslate';
import ErrorAlert from './components/AlertError';
import {PiArrowsLeftRightBold} from 'react-icons/pi';
import './style.css';

function App(){

    
    return (
        <div className='center'>
            <Title/>
            <InputTrans/> 
            <ButtonSend/>
            <ErrorAlert/>
        </div>
    );
}

export default App;