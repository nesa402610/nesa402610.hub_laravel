// @ts-ignore
import SBER_HTMLCSS from './img/sertificates/SBER_osnovy-html-css.png';
// @ts-ignore
import SBER__DEVOPS_GIT from './img/sertificates/SBER-DevOps-git.png';
// @ts-ignore
import BG_JS_BASIC from './img/sertificates/GB_JS-basic.png';
// @ts-ignore
import SBER_JS_BASIC from './img/sertificates/SBER-JS-base.png';
// @ts-ignore
import SBER_JS_BASIC2 from './img/sertificates/SBER-JS-base-2.png';
// @ts-ignore
import SBER_JS_DOM from './img/sertificates/SBER_JS_DOM.png';
import {ICertProps} from "./types/types";

export const certificates: ICertProps[] = [
    {
        name: 'Основы HTML и CSS',
        author: 'Корпоративный университет СберБанка',
        date: '08.08.2022',
        sign: 'Шаталов А. И.',
        img: SBER_HTMLCSS,
    }, {
        name: 'Инструменты DevOps: Git',
        author: 'Корпоративный университет СберБанка',
        date: '09.08.2022',
        sign: 'Шаталов А. И.',
        img: SBER__DEVOPS_GIT
    }, {
        name: 'JavaScript. Начальный уровень',
        author: 'GeekBrains',
        date: '25.05.2022',
        sign: 'Волчек А. И.',
        img: BG_JS_BASIC
    }, {
        name: 'Основы программирования на JavaScript I',
        author: 'Корпоративный университет СберБанка',
        date: '28.08.2022',
        sign: 'Шаталов А. И.',
        img: SBER_JS_BASIC
    },{
        name: 'Основы программирования на JavaScript II',
        author: 'Корпоративный университет СберБанка',
        date: '09.10.2022',
        sign: 'Шаталов А. И.',
        img: SBER_JS_BASIC2
    },{
        name: 'Управление веб-страницей с помощью JavaScript\n',
        author: 'Корпоративный университет СберБанка',
        date: '10.10.2022',
        sign: 'Шаталов А. И.',
        img: SBER_JS_DOM
    },
];
