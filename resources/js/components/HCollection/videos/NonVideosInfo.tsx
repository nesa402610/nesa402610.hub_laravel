import React from 'react';
import InfoBox from "../../UI/InfoBox";

const NonVideosInfo = () => {
    return (
        <InfoBox title={"Причины отсутствия видео"}>
            <ul className={"py-2 px-4 list-inside list-disc"}>
                <li>Я не нашел прямых ссылок на видео</li>
                <li>Мне могут дать пизды видео</li>
                <li>Мне дали пизды за видео</li>
                <li>Мне почти дали пизды за видео</li>
                <li>Мне лень было добавлять их ✨</li>
            </ul>
        </InfoBox>
    );
};

export default NonVideosInfo;
