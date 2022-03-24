import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const {active: note} = useSelector(state => state.notes)
    const [formValues, handleInputChange, reset] = useForm(note);
    const {body, title} = formValues;
    
    const activeId = useRef(note.id)
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(activeId.current !== note.id) {
            reset(note)
            activeId.current = note.id
        }
        
    }, [note, reset])

    useEffect(() => {
        dispatch(activeNote(activeId, {...formValues}))
        
    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch(startDeleting(note.id))
    }
    
    
    return (
        <div className='notes__main-content animate__animated animate__backInRight animate__faster'>
            <NotesAppBar />
            <div className='notes__content'>
                <input
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    value={title}
                    name='title'
                    onChange={handleInputChange}
                />
                <textarea
                    placeholder='What happened today?'
                    className='notes__textarea'
                    name='body'
                    value={body}
                    onChange={handleInputChange}
                />

                {
                    note.url 
                    &&
                    <div className='notes__image'>
                        <img 
                            src={note.url}
                            alt=''
                        />
                    </div>
                }   
            </div>

            <button
                className='btn btn-danger'
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    )
}
