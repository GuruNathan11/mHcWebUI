import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export const IdleTimeOutModal = ({showModal, handleClose, handleLogout, remainingTime}) => {


 function renderFooter(name) {
    return (
        <div>
            <Button label="Stay" icon="pi pi-check" onClick={handleClose} />
            <Button label="Logout" icon="pi pi-times" onClick={handleLogout} className="p-button-secondary"/>
        </div>
    );
}
    return (

      <Dialog
              header="You Have Been Idle!"
              visible={showModal}
              modal={true}
              onHide={handleClose}
              footer={renderFooter('')}
            >
               <div className="p-grid">   
               You Will Get Timed Out. You want to stay?
                </div>              
            </Dialog>
        
    )
}