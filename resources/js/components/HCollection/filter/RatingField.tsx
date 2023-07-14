import React, {Dispatch, FC, SetStateAction} from 'react';

interface RatingFieldProps {
    rating: string
    setRating: Dispatch<SetStateAction<any>>
}

const RatingField: FC<RatingFieldProps> = ({rating, setRating}) => {
    return (
        <div>
            <span className={'block'}>Рейтинг</span>
            <select className={"bg-neutral-600 p-2 rounded-lg"}
                    value={rating}
                    onChange={e => setRating(e.target.value)}>
                <option value={null}>Все</option>
                <option value="0+">0+</option>
                <option value="6+">6+</option>
                <option value="13+">13+</option>
                <option value="16+">16+</option>
                <option value="18+">18+</option>
                <option value="Rx">Rx</option>
            </select>
        </div>
    );
};

export default RatingField;
