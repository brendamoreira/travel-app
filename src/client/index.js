import './styles/style.scss'
import performAction, {formattedDate} from './js/app'

// listener to button click
document.getElementById('generate').addEventListener('click', performAction);
document.getElementById('tripDate').setAttribute('min', formattedDate());
