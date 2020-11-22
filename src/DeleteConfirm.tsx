import React from 'react';

interface DeleteConfirmProps {
    id: string;
    name: string;
    onConfirm(): void;
}

const DeleteConfirm: React.FC<DeleteConfirmProps> = props => {

return (
        <div className="modal fade" id={props.id} aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">Are you sure?</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body text-left">
                    Are you sure you want to delete {props.name}? This can not be undone.
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={props.onConfirm} data-dismiss="modal">Delete</button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirm;