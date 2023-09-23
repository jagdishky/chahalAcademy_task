import { showMessage } from 'react-native-flash-message';

const flashMessage = (message, type, description) => showMessage({
    message: message,
    description: description,
    type: type,
    icon: type,
    position: "top",
});
export default flashMessage;