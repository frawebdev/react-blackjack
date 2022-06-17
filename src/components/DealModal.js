//css
import './DealModal.scss'

export default function DealModal() {

    return (
        <div className='deal__modal'>
            <div className='deal__modal__container'>
                <div className='deal__modal__container__make__deal'>
                    <button className='deal__modal__container__make__deal__add__btn'>Add +5</button>
                    <div className='deal__modal__container__make__deal__dealing'>0</div>
                    <button className='deal__modal__container__make__deal__sub__btn'>Sub -5</button>
                    <button
                    className='deal__modal__container__make__deal__confirm__btn'
                    >
                    DEAL
                    </button>
                </div>
            </div>
        </div>
    )
}