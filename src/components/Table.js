//css
import './Table.scss'
//
import useFetch from '../hooks/useFetch'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
//libs
import axios from 'axios'
import { DealContext } from '../context/DealContext'
//components
import DealerDeck from './DealerDeck'
import PlayerDeck from './PlayerDeck'
import DealModal from './DealModal'
import ResultModal from './ResultModal'
import EndModal from './EndModal'

export default function Table() {
    const deck = useFetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    const [player, setPlayer] = useState([])
    const [dealer, setDealer] = useState([])
    const [gameState, setGameState] = useState('start')
    const [flipped, setFlipped] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const { moneyAmount, setMoneyAmount, currentDeal } = useContext(DealContext)

    const hit = async () => {
        const cardsHand = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`)
        setDealer(old => [...old, cardsHand.data.cards[0]])
        setPlayer(old => [...old, cardsHand.data.cards[1]])
    }

    const sumDeck = (player) => {
        let sum = player.map(card => {
            if(card.value === 'KING' || card.value === 'QUEEN' || card.value === 'JACK') {
                return 10
            }
            else if (card.value === 'ACE') {
                return 11
            }
            else {
                return parseInt(card.value)
            }
        })

        sum = sum.reduce((acc, val) => {
            return acc + val
        }, 0)

        return sum
    }

    const stand = () => {
        const playerSum = sumDeck(player)
        const dealerSum = sumDeck(dealer)
        setFlipped(true)

        if(
            playerSum > dealerSum
            &&
            playerSum <= 21
            ) 
            {
            setGameState('win')
        }
        else if(
            (dealerSum > playerSum)
            && dealerSum <= 21
            ) 
            {
            setGameState('lose')
        }
        else if (dealerSum === playerSum) {
            setGameState('lose')
        }
        else if(moneyAmount <= 0) {
            setGameState('game-over')
        }
    }

    useEffect(() => {

        const playerSum = sumDeck(player)
        const dealerSum = sumDeck(dealer)

        if(playerSum > 21) {
            setFlipped(true)
            setGameState('lose')
        }
        else if(dealerSum > 21) {
            setFlipped(true)
            setGameState('win')
        }
        else if(playerSum === 21) {
            setFlipped(true)
            setGameState('win')
        }
        else if(dealerSum === 21) {
            setFlipped(true)
            setGameState('lose')
        }
        else if(moneyAmount <= 0) {
            setGameState('game-over')
        }

    }, [player, dealer, moneyAmount])

    useEffect(() => {

        switch(gameState) {
            case 'start':
                setDealer([])
                setPlayer([])
                setFlipped(false)
                setShowModal(true)
                break;
            case 'dealing':
                hit()
                hit()
                break;
            case 'standing':
                stand()
                break;
            case 'win':
                setMoneyAmount(moneyAmount + (currentDeal * 2))
                break
            case 'lose':
                setMoneyAmount(moneyAmount - currentDeal)
                break;
        }

    }, [gameState])



    return (
        <main>
        <div className="game__table">
            <div className='game__table__main'>
                <DealerDeck deck={dealer} flipped={flipped}/>
                <PlayerDeck deck={player}/>
            </div>
        </div>
        <footer className='game__table__footer'>
            <div className='game__table__footer__total'>{ moneyAmount }</div>
            <button className='game__table__footer__btn game__table__footer__btn--hit' onClick={hit}>Hit</button>
            <button 
            className='game__table__footer__btn game__table__footer__btn--stand' 
            onClick={() => setGameState('standing')}
            >
            Stand
            </button>
            </footer>
        <DealModal showModal={showModal} setShowModal={setShowModal} setGameState={setGameState} moneyAmount={moneyAmount}/>
        <ResultModal gameState={gameState} setGameState={setGameState}/>
        <EndModal gameState={gameState} setGameState={setGameState} setMoneyAmount={setMoneyAmount}/>
        </main>
    )
}