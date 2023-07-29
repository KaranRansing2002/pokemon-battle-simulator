import React from 'react'
import './Loader.css'

function Loader() {
    return (
        <div className="cube">
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face right"></div>
            <div className="face left"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
        </div>
    )
}

export default Loader