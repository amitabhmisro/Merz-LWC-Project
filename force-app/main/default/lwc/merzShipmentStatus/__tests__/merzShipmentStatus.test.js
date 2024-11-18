import { api, createElement, LightningElement, wire } from 'lwc';
import MerzShipmentStatus from 'c/merzShipmentStatus';
import { getRecord } from 'lightning/uiRecordApi';

describe('c-merz-shipment-status', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        // Arrange
        const element = createElement('c-merz-shipment-status', {
            is: MerzShipmentStatus
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });
});
export default class MerzShipmentStatus extends LightningElement {

    @api recordId;

    @wire(getRecord, { recordId: "$recordId", fields: [Shipment_Number_Field] })
    record;

    get shipmentNumber() {
        return this.record.data.fields.Shipment_Number__c.value;

    }
}