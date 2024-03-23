import React from 'react'
import '../style/Style.scss'

const Header = (props) => {
    return (
        <div className='header'>
            <div className='title'>One Piece</div>
            <div className='counter'>
                <div>Count : {props.count}</div>
                <div>Sum : {props.sum}</div>
            </div>
        </div>
    )
}

export default Header