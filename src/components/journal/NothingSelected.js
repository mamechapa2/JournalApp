import React from 'react'

export const NothingSelected = () => {
    return (
        <div className='nothing__main-content animate__animated animate__backInRight animate__faster'>
            <p>
                Select something
                <br />
                or create an entry
            </p>

            <i className='far fa-star fa-4x mt-5 animate__animated animate__heartBeat animate__delay-1s animate__infinite'></i>
        </div>
    )
}
