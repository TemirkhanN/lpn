/**
 *
 * @param message text that will be shown in popup. Popup won't be shown if empty or null value passed
 * @param messageType color of popup will be generated based on type. Default: 'notice'
 * Success is green popup. Notice is blue. Warning is yellow. Error is red.
 *
 * @param position html based position of popup. Default: 'bottom left'
 * @param duration time in seconds before popup disappear. default is 5 seconds
 */

function popupMessage(message, messageType, position, duration) {

    var messageTypes = {
        success: 'success',
        notice: 'notice',
        warning: 'warning',
        error: 'error'
    };

    duration = typeof duration == 'undefined' ? 5 : parseInt(duration);

    var popup = document.createElement('div');
    var closePopup = document.createElement('span');
    var popupClass = 'lpn-window';

    messageType = typeof messageType == 'undefined' || ! messageType.toLowerCase() in messageTypes ? messageTypes.notice : messageType.toLowerCase();
    message = typeof message == 'undefined' || message.length == 0 ? null : message;
    position = typeof position == 'undefined' || position.length == 0 ? 'bottom left' : position;

    this.popupId = typeof this.popupId == 'undefined' ? 1 : this.popupId + 1;
    var _this = this;


    /**
     * Generates popup and output it to browser
     */
    var generatePopup = function () {
        if (!validPopupDeclaration()) {
            return;
        }

        setPosition();
        popup.id = getUniqueId();popup.className = popupClass;popup.style.fontSize = '14px';popup.style.position = 'fixed';popup.style.zIndex = '100000';popup.style.padding = '20px';popup.style.marginBottom = '20px;';popup.style.border = '1px solid transparent';popup.style.borderRadius = '4px';
        popup.innerHTML = message;

        switch (messageType) {
            case messageTypes.success:
                popup.style.color = '#3C763D';popup.style.backgroundColor = '#DFF0D8';popup.style.borderColor = '#D6E9C6';
                break;
            case messageTypes.warning:
                popup.style.color = '#8A6D3B';popup.style.backgroundColor = '#FCF8E3';popup.style.borderColor = '#FAEBCC';
                break;
            case messageTypes.error:
                popup.style.color = '#A94442';popup.style.backgroundColor = '#F2DEDE';popup.style.borderColor = '#EBCCD1';
                break;
            default:
                popup.style.color = '#31708F';popup.style.backgroundColor = '#D9EDF7';popup.style.borderColor = '#BCE8F1';
                break;

        }

        generateCloseButton();

        popup.appendChild(closePopup);

        document.body.appendChild(popup);

        //Destroy popup after setuped number of seconds
        setTimeout(function () {
            document.getElementById(popup.id) ? document.body.removeChild(popup) : null;
        }, duration * 1000);

    };

    /**
     * Generates popup close button
     */
    var generateCloseButton = function () {
        closePopup.style.position = 'absolute';closePopup.style.top = '0';closePopup.style.right = '5px';closePopup.style.fontSize = '18px';closePopup.style.fontWeight = 'bold';closePopup.style.cursor = 'pointer';closePopup.className = 'close-popup';closePopup.innerHTML = '×';closePopup.title = 'Сообщение';
        closePopup.addEventListener('click', function(){
            document.getElementById(popup.id) ? document.body.removeChild(popup) : null;
        })
    };

    /**
     * Checks if passed params are valid to generate popup
     * @returns {boolean}
     */
    var validPopupDeclaration = function () {
        return !(messageType == null || message == null);
    };

    /**
     * Gets unique identifier for popup.
     * @returns {string}
     */
    var getUniqueId = function () {
        return 'lpn-message' + _this.popupId;
    };


    /**
     * Sets popup at position based on passed params. By default it will be placed in bottom left corner
     */
    var setPosition = function(){
        var positionInfo = position.split(' ');
        if(positionInfo.length == 2){
            positionInfo[0] == 'top' ? popup.style.top = '20px' : popup.style.bottom = '20px';
            positionInfo[1] == 'right' ? popup.style.right = '20px' : popup.style.left = '20px';
        }
    };


    //Constructor
    generatePopup();
}