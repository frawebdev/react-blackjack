//css
import './Table.scss'
//
import useFetch from '../hooks/useFetch'
import { useState, useEffect } from 'react'
//libs
import axios from 'axios'
//components
import DealerDeck from './DealerDeck'
import PlayerDeck from './PlayerDeck'

export default function Table() {
    const deck = useFetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    const [player, setPlayer] = useState([])
    const [dealer, setDealer] = useState([])
    const [money, setMoney] = useState(100)
    const [moneyDealt, setmoneyDealt] = useState(0)
    const [gameState, setGameState] = useState({ state: 'start', player: 0, dealer: 0, winner: '' })
    const [flipped, setFlipped] = useState(false)

    const deal = () => {
        hit()
        hit()

        setGameState(prev => ({
            ...prev,
            state: 'dealing'
        }))
    }

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
            setGameState({
                state: 'win',
                player: playerSum,
                dealer: dealerSum,
                winner: 'player'
            })
        }
        else if(
            (dealerSum > playerSum)
            && dealerSum <= 21
            ) 
            {
            setGameState({
                state: 'win',
                player: playerSum,
                dealer: dealerSum,
                winner: 'dealer'
            })
        }
    }

    useEffect(() => {

        const playerSum = sumDeck(player)
        const dealerSum = sumDeck(dealer)

        if(playerSum > 21) {
            setFlipped(true)
            setGameState({
                state: 'bust',
                player: playerSum,
                dealer: dealerSum,
                winner: 'dealer'
            })
        }
        else if(dealerSum > 21) {
            setFlipped(true)
            setGameState({
                state: 'bust',
                player: playerSum,
                dealer: dealerSum,
                winner: 'player',
            })
        }
        else if(playerSum === 21) {
            setFlipped(true)
            setGameState({
                state: 'natural',
                player: playerSum,
                dealer: dealerSum,
                winner: 'player',
            })
        }
        else if(dealerSum === 21) {
            setFlipped(true)
            setGameState({
                state: 'natural',
                player: playerSum,
                dealer: dealerSum,
                winner: 'dealer',
            })
        }

    }, [player, dealer])

    useEffect(() => {

        console.log(gameState)

    }, [gameState])

    useEffect(() => {
        console.log(flipped)
    }, [flipped])

    return (
        <main>
        <div className="game__table">
            <div className='game__table__main'>
                <DealerDeck deck={dealer}/>
                <PlayerDeck deck={player}/>
            </div>
            <div className='game__table__sidebar'>
                <div className='game__table__sidebar__result'>
                    Result
                </div>
                <div className='game__table__sidebar__deal'>
                    <div className='game__table__sidebar__deal__change'>
                    <button className='game__table__sidebar__deal__change__btn'>+ 5$</button>
                    <div>$100</div>
                    <button className='game__table__sidebar__deal__change__btn'>- 5$</button>
                    </div>
                    <button className='game__table__sidebar__deal__btn'>Deal</button>
                </div>
            </div>
        </div>
        <footer className='game__table__footer'>
            <button className='game__table__footer__btn game__table__footer__btn--hit' onClick={hit}>Hit</button>
            <button className='game__table__footer__btn game__table__footer__btn--stand' onClick={stand}>Stand</button>
            </footer>
        </main>
    )
}