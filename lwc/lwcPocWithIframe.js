/**
 * @description       : 
 * @author            : Amit Singh
 * @group             : 
 * @last modified on  : 03-28-2021
 * @last modified by  : Amit Singh
 * Modifications Log 
 * Ver   Date         Author       Modification
 * 1.0   03-28-2021   Amit Singh   Initial Version
**/
import { LightningElement,wire} from 'lwc';

import getVisualforceOrigin from '@salesforce/apex/VFC_DomainsController.getVisualforceOrigin';

export default class PocLwcWithIframe extends LightningElement {

    @wire(getVisualforceOrigin) visualForceOrigin;
    receivedMessage;
    messageToSend;

    connectedCallback() {
        // Binding EventListener here when Data received from VF
        // param1 - the event which will listen the message
        // param2 - the method which will be called when the message will be recieved
        // param3 - event capture
        window.addEventListener( "message", this.handleResponse.bind(this), false );
    }

    handleResponse(message){
        // check the origin match for both source and target
        if (message.origin === this.visualForceOrigin.data) {
            this.receivedMessage = JSON.stringify(message.data);
        }
    }

    handleChange(event) {
        this.messageToSend = event.detail.value;
    }

    sendMessgaeToVisualForce() {
        let message = {
            message : this.messageToSend,
            source  : 'LWC'
        };
        
        let visualForce = this.template.querySelector("iframe");
        if( visualForce ){
            visualForce.contentWindow.postMessage(message, this.visualForceOrigin.data);
        }
        
    }
}
