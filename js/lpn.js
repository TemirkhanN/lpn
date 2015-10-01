function PopupMessage(message, messageType, position) {

    var messageTypes = {
        success: 'success',
        notice: 'notice',
        warning: 'warning',
        error: 'error'
    };

    var popup = document.createElement('div');
    var closePopup = document.createElement('span');
    var popupClass = 'lpn-window';

    messageType = typeof messageType == 'undefined' || !messageType in messageTypes ? messageTypes.notice : messageType;
    message = typeof message == 'undefined' || message.length == 0 ? null : message;
    position = typeof position == 'undefined' || position.length == 0 ? 'bottom left' : position;

    this.popupId = typeof this.popupId == 'undefined' ? 1 : this.popupId + 1;
    var _this = this;


    var generatePopup = function () {
        if (!validPopupDeclaration()) {
            return;
        }

        getPositionStyle();
        popup.className = popupClass;
        popup.id = getUniqueId();
        popup.style = 'font-size:14px; position:fixed; z-index:100000; ' + getPositionStyle() +' -webkit-transition: top 1s ease-out 0.5s; -moz-transition: top 1s ease-out 0.5s;-o-transition: top 1s ease-out 0.5s;transition: top 1s ease-out 0.5s;padding: 20px;margin-bottom: 20px;border: 1px solid transparent;border-radius: 4px;';
        popup.innerHTML = message;

        switch (messageType) {
            case messageTypes.success:
                popup.style.color = '#31708F';
                popup.style.backgroundColor = '#D9EDF7';
                popup.style.borderColor = '#BCE8F1';
                break;
            case messageTypes.warning:
                popup.style.color = '#8A6D3B';
                popup.style.backgroundColor = '#FCF8E3';
                popup.style.borderColor = '#FAEBCC';
                break;
            case messageTypes.error:
                popup.style.color = '#A94442';
                popup.style.backgroundColor = '#F2DEDE';
                popup.style.borderColor = '#EBCCD1';
                break;
            default:
                popup.style.color = '#3C763D';
                popup.style.backgroundColor = '#DFF0D8';
                popup.style.borderColor = '#D6E9C6';
                break;

        }

        generateCloseButton();

        popup.appendChild(closePopup);

        document.body.appendChild(popup);

        setTimeout(function () {
            document.getElementById(popup.id) ? document.body.removeChild(popup) : null;
        }, 5000);

    };


    var generateCloseButton = function () {
        closePopup.style = 'position: absolute; top:0; right:5px; font-size:18px; font-weight:bold; cursor:pointer;';
        closePopup.className = 'close-popup';
        closePopup.innerHTML = '×';
        closePopup.title = 'Сообщение';

        closePopup.addEventListener('click', function(){
            document.getElementById(popup.id) ? document.body.removeChild(popup) : null;
        })
    };


    var validPopupDeclaration = function () {
        return !(messageType == null || message == null);
    };


    var getUniqueId = function () {
        return 'lpn-message' + _this.popupId;
    };


    var getPositionStyle = function(){
        var positionInfo = position.split(' ');
        var style = '';

        if(positionInfo.length == 2){
            style += positionInfo[0] == 'top' ? 'top:20px;' : 'bottom:20px;';
            style += positionInfo[1] == 'right' ? 'right:20px;' : 'left:20px;';
        }

        return style;

    };


    generatePopup();
}