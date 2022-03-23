import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const note = useSelector(state => state.notes.active);

    const handleSave = () => {
        dispatch(startSaveNote(note))
    }

    return (
        <div className='notes__appbar'>
            <span>03/03/2022</span>
            <div>
                <button className='btn'>
                    Picture
                </button>
                <button className='btn' onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    )
}
