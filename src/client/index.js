import './styles/style.scss'
import performAction, {getToday} from './js/app'

// listener to button click
document.getElementById('generate').addEventListener('click', performAction);
document.getElementById('tripDate').setAttribute('min', getToday());
