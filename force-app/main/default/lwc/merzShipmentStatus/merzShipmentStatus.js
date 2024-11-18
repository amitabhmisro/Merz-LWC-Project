import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import SHIP_NUM from '@salesforce/schema/Shipment__c.Shipment_Number__c';
const FIELDS = [SHIP_NUM];
const endpoint = 'https://merzcommunities--tina.sandbox.my.salesforce-sites.com/services/apexrest/mockShipmentStatus?trackingNumber=anythingwilldo';

export default class merzShipmentStatus extends LightningElement {

   @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS}) 
    shipment__c;

    get shipmentNumber(){
        return getFieldValue(this.shipment__c.data, [SHIP_NUM]);
    } 
    
    
    statusCheck() {   
      
          console.log('Called URL: ', endpoint);         
          fetch(endpoint)        
              .then((response) => {
                if(!response.ok) {
                    throw new Error('Request failed!');
                }
                console.log('Response: ', response); 
                return response.json();      
          })
          .then(data => {    
            console.log('@@@ data'+JSON.stringify(data));
            this.shipStatus = data; 
            this.error = undefined;       
          }) 
          .catch(error => {
            this.error = error;
            this.data = undefined;
            this.shipStatus = undefined;
          });  
      }         
}

