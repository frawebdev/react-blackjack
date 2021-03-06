//css
import './DealModal.scss'

import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { DealContext } from '../context/DealContext'

export default function DealModal({showModal, setShowModal, gameState, setGameState, moneyAmount}) {

    const [handDeal, setHandDeal] = useState(0)

    const { currentDeal, setCurrentDeal } = useContext(DealContext)

    const setDeal = (oper) => {
        if(oper === 'add' && handDeal < moneyAmount) {
            setHandDeal(handDeal + 5)
        }
        else if(oper === 'sub' && handDeal >= 5) {
            setHandDeal(handDeal - 5)
        }
    }

    const showHideModal = (item) => {
        if(item && moneyAmount > 0) {
            return ''
        }
        else {
            return 'hide-modal'
        }
    }

    const endDeal = () => {
        if(handDeal > 0) {
            setCurrentDeal(handDeal)
            setShowModal(false)
            setGameState('dealing')
        }
    }

    useEffect(() => {

        setHandDeal(0)

    }, [ showModal ])

    return (
        <div className={`deal__modal ${showHideModal(showModal)}`}>
            <div className='deal__modal__container'>
                <div className='deal__modal__container__make__deal'>
                    <button className='deal__modal__container__make__deal__add__btn' onClick={() => setDeal('sub')}>Add -5</button>
                    <div className='deal__modal__container__make__deal__dealing'>{ handDeal }</div>
                    <button className='deal__modal__container__make__deal__sub__btn' onClick={() => setDeal('add')}>Sub +5</button>
                    <button
                    className='deal__modal__container__make__deal__confirm__btn'
                    onClick={endDeal}
                    >
                    DEAL
                    </button>
                </div>
            </div>
        </div>
    )
}