import React, {useState} from 'react';
import {FaStar} from 'react-icons/fa';

const CollectionScore = () => {
    const [rating, setRating] = useState(null);

    const ratings = [1, 2, 3, 4, 5]
    return (
        <div className={'flex'}>
            {ratings.map(num =>
                <FaStar key={num} size={'1.5rem'}
                        className={`${num <= rating ? 'fill-amber-400' : 'fill-neutral-300'}`}
                        onMouseEnter={() => setRating(num)}
                        onMouseLeave={() => setRating(null)}/>
            )}
        </div>
    );
};

export default CollectionScore;
