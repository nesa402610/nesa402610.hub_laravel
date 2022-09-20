import {
    GiLevelFourAdvanced,
    GiLevelThreeAdvanced,
    GiLevelThree,
    GiLevelTwoAdvanced,
    GiLevelTwo,
} from "react-icons/gi";
import {SiNetlify} from "react-icons/si";
import React from "react";
// GiMoebiusStar
// GiPickOfDestiny
interface levelsProps {
    newbie: levelProps
    junior: levelProps
    intermediate: levelProps
    advanced: levelProps
    guru: levelProps
}

interface levelProps {
    name: string;
    ico: any;
    grade: number
}
interface siteProps {
    name: string
    source: string
    sourceUrl?: string
    img?: string
    url?: string
    state: string
    level: levelProps
    framework: string
    stack: string[]
    host: any
}

const levels: levelsProps = {
    newbie: {
        name: 'newbie',
        ico: <GiLevelTwo color={'45ade1'}/>,
        grade: 1
    }, junior: {
        name: 'junior',
        ico: <GiLevelTwoAdvanced color={'74e116'}/>,
        grade: 2
    },
    intermediate: {
        name: 'intermediate',
        ico: <GiLevelThree color={'F8961E'}/>,
        grade: 3
    },
    advanced: {
        name: 'advanced',
        ico: <GiLevelThreeAdvanced color={'F3722C'}/>,
        grade: 4
    },
    guru: {
        name: 'guru',
        ico: <GiLevelFourAdvanced color={'F94144'}/>,
        grade: 5
    }
};
const hosts = {
    netlify: <SiNetlify color={'22e1c6'}/>,
};
export const sites: siteProps[] = [
    {
        name: 'Crowdfunding',
        source: 'frontendmentor',
        sourceUrl: 'https://www.frontendmentor.io/challenges/crowdfunding-product-page-7uvcZe7ZR',
        img: 'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto:good,w_900/Challenges/luxbxwbgw9q8cj3i8d7l.jpg',
        url: 'https://croundfinding-challange.netlify.app/',
        state: 'in work',
        level: levels.junior,
        framework: '',
        stack: ['react'],
        host: hosts.netlify,
    },
    {
        name: 'Banner component',
        source: 'frontendmentor',
        sourceUrl: '',
        img: 'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto:good,w_900/Challenges/t26y9p3veejvbc9biv3f.jpg',
        url: 'https://banner-challange.netlify.app/',
        state: 'completed',
        level: levels.newbie,
        framework: '',
        stack: [],
        host: hosts.netlify,
    },
    {
        name: 'Interactive rating',
        source: 'frontendmentor',
        sourceUrl: 'https://www.frontendmentor.io/challenges/interactive-rating-component-koxpeBUmI',
        img: 'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto:good,w_900/Challenges/dm3s8oqtz0mwcaygqjhy.jpg',
        url: 'https://ratesystem-challange.netlify.app/',
        state: 'completed',
        level: levels.junior,
        framework: '',
        stack: [],
        host: hosts.netlify,
    },
    {
        name: 'Green Robotic',
        source: 'СберУниверситет',
        img: 'https://screenshot-proxy.netlify.app/f_webp,w_336/https://d33wubrfki0l68.cloudfront.net/62f24caaa7dc6b0008947e06/screenshot_2022-08-09-12-02-14-0000.png',
        url: 'https://greenrobotic-sber.netlify.app/',
        state: 'completed',
        level: levels.junior,
        framework: '',
        stack: ['react'],
        host: hosts.netlify,
    },
    {
        name: 'Tip calculator',
        source: 'frontendmentor',
        sourceUrl: 'https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX',
        img: 'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto:good,w_900/Challenges/so0b0hpmowz5ujjwbhkp.jpg',
        url: 'https://tipcalculator-challange.netlify.app/',
        state: 'dropped',
        level: levels.junior,
        framework: '',
        stack: ['react'],
        host: hosts.netlify,
    },
    {
        name: 'Flexbox',
        source: 'Тестовое',
        sourceUrl: '',
        url: 'https://venerable-bavarois-e829e5.netlify.app/',
        state: 'completed',
        level: levels.newbie,
        framework: '',
        stack: [],
        host: hosts.netlify,
    },
    {
        name: 'Beer search',
        source: 'Тестовое',
        sourceUrl: 'https://app.netlify.com/sites/beer-beer',
        url: 'https://beer-beer.netlify.app/',
        state: 'completed',
        level: levels.newbie,
        framework: '',
        stack: ['react', 'axios'],
        host: hosts.netlify,
    }, {
        name: 'Todo app',
        source: 'frontendmentor',
        sourceUrl: 'https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW',
        img: 'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto:good,w_900/Challenges/vjbu8raudheodagmjfz2.jpg',
        url: 'https://todoapp402610.netlify.app/',
        state: 'completed',
        level: levels.intermediate,
        framework: 'ReactJS',
        stack: ['react'],
        host: hosts.netlify,
    }, {
        name: 'Job listings with filtering',
        source: 'frontendmentor',
        sourceUrl: 'https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt',
        img: 'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto:good,w_900/Challenges/l3cxamx1e6vpngqjtdyt.jpg',
        url: '',
        state: 'planned',
        level: levels.intermediate,
        framework: 'ReactJS',
        stack: ['react'],
        host: hosts.netlify,
    }, {
        name: 'Password Generator',
        source: 'frontendmentor',
        sourceUrl: 'https://www.frontendmentor.io/challenges/password-generator-app-Mr8CLycqjh',
        img: 'https://res.cloudinary.com/dz209s6jk/image/upload/q_auto:good,w_900/Challenges/pq66aieybewwpo2zlryv.jpg',
        url: 'https://vk.com/away.php?utf=1&to=https%3A%2F%2Fpassword-generator402610.netlify.app%2F',
        state: 'Completed',
        level: levels.advanced,
        framework: 'ReactJS',
        stack: ['react'],
        host: hosts.netlify,
    },
];
