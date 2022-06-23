//css
import './EndModal.scss'

import { useState, useEffect } from 'react'

export default function EndModal({ gameState, setGameState, setMoneyAmount}) {

    const [showModal, setShowModal] = useState('hide-modal')

    const restartGame = () => {
        setMoneyAmount(100)
        setGameState('start')
    }

    useEffect(() => {

        if(gameState === 'game-over') {
            setShowModal('')
        }
        else {
            setShowModal('hide-modal')
        }

    }, [gameState])

    return (
        <div className={`end__modal ${showModal}`}>
            <div className='end__modal__container'>
                <div className='end__modal__container__text'>Game over!</div>
                <button className='end__modal__container__btn' onClick={restartGame}>TRY AGAIN</button>
            </div>
        </div>
    )
}