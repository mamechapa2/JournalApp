import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote } from '../../actions/notes'
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
    
    
    return (
        <div className='notes__main-content'>
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
                            src='https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' 
                            alt=''
                        />
                    </div>
                }   
            </div>
        </div>
    )
}
