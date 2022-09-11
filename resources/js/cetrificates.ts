import SBER_HTMLCSS from './img/sertificates/SBER_osnovy-html-css.png';
import SBER__DEVOPS_GIT from './img/sertificates/SBER-DevOps-git.png';
import BG_JS_BASIC from './img/sertificates/GB_JS-basic.png';
import SBER_JS_BASIC from './img/sertificates/SBER-JS-base.png';
interface certProps {
  name: string,
  author: string,
  date: string,
  sign: string,
  img: string,
}
export const certificates: certProps[] = [
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
  },{
    name: 'Основые программирования на JavaScript I',
    author: 'Корпоративный университет СберБанка',
    date: '28.08.2022',
    sign: 'Шаталов А. И.',
    img: SBER_JS_BASIC
  },
];