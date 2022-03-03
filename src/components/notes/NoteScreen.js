import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
        <div className='notes__main-content'>
            <NotesAppBar />
            <div className='notes__content'>
                <input
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input'
                />
                <textarea
                    placeholder='What happened today?'
                    className='notes__textarea'
                />

                <div className='notes__image'>
                    <img 
                        src='https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' 
                        alt='some image'
                    />
                </div>
            </div>
        </div>
    )
}
