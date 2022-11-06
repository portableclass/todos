import React, { useState } from 'react'
import './assets/styles/scss/app.scss'
import ValidateForm from './components/ValidateForm'

function App() {
    return (
        <div className='app-wrapper'>
            <div className='todos-wrapper'>
                <ValidateForm />
            </div>
        </div>
    )
}

export default App
