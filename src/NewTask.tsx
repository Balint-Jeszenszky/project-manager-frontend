import React, {useState} from 'react';

interface NewTaskProps {
    confirmAdd(): void;
    cancelAdd(): void;
}

const NewTask: React.FC<NewTaskProps> = (props) => {
    const [name, setName] = useState<string>('');
    const [desc, setDesc] = useState<string>('');

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const onDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDesc(e.target.value);
    }

    const confirmAdd = () =>{
        //post
        props.confirmAdd();
    }

    return (
        <div className="add-task">
            <input
                type="text"
                className="form-control-sm taskdetail mb-1"
                placeholder="Title"
                value={name}
                onChange={onNameChange}
            />
            <textarea placeholder="Enter a note" value={desc} onChange={onDescChange}></textarea>
            <input type="date" className="form-control-sm taskdetail mb-1" />
            <button className={'btn btn-success btn-sm button-add-or-cancel' + (name.length > 0 ? '' : ' disabled')} onClick={confirmAdd}>Add</button>
            <button className="btn btn-light btn-sm button-cancel button-add-or-cancel" onClick={props.cancelAdd}>Cancel</button>
        </div>
    );
};

export default NewTask;
