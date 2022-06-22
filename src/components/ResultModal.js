//css
import './ResultModal.scss'

//hooks
import { useState, useEffect } from 'react'

import { useContext } from 'react'
import { DealContext } from '../context/DealContext'

export default function ResultModal({ gameState, setGameState }) {

    const { currentDeal } = useContext(DealContext)

    const [resultText, setResultText] = useState('')
    const [resultTextColor, setResultTextColor] = useState('')
    const [showResultModal, setShowResultModal] = useState('hide-modal')

    useEffect(() => {

        if(gameState === 'win') {
            setResultText(`You won ${currentDeal * 2}!`)
            setResultTextColor('result__modal__container__text--win')
            setShowResultModal('')
        }
        else if(gameState === 'lose') {
            setResultText(`You lost ${currentDeal}!`)
            setResultTextColor('result__modal__container__text--lose')
            setShowResultModal('')
        }

    }, [gameState])

    const nextDeal = () => {
        setShowResultModal('hide-modal')
        setGameState('start')
    }

    return (
        <div className={`result__modal ${showResultModal}`}>
            <div className='result__modal__container'>
                <div className={`result__modal__container__text ${resultTextColor}`}>{resultText}</div>
                <button className='result__modal__container__btn' onClick={nextDeal}>NEXT DEAL</button>
            </div>
        </div>
    )
}