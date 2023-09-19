import './Components.css';
import {LuAlertTriangle} from 'react-icons/lu'

function ErrorAlert(){



    return(
        <div  id='ErrorDivAlert' className='ErrorAlert'>
            <LuAlertTriangle/> <span>Error: <a id='ErrorSpanAlert'></a>  </span>
        </div>
    )
}

export default ErrorAlert;
