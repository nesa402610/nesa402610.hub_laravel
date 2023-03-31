import React from "react";
import {FaGithub, FaSteam, FaTelegram, FaTwitch, FaTwitter, FaVk} from "react-icons/fa";
import {SiOsu, SiShikimori} from "react-icons/si";

interface linksProps {
  name: string;
  url: string;
  ico: any;
}

export const links: linksProps[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/nesa402610',
    ico: <FaGithub/>,
  }, {
    name: 'Telegram',
    url: 'https://t.me/nesa402610',
    ico: <FaTelegram/>,
  }, {
    name: 'VK',
    url: 'https://vk.com/nesa402610',
    ico: <FaVk/>,
  }, {
    name: 'Twitch',
    url: 'https://www.twitch.tv/nesa402610',
    ico: <FaTwitch/>,
  }, {
    name: 'Shikimori',
    url: 'https://shikimori.one/%E1%A0%8C+%E1%A0%8C+%E1%A0%8C%E1%A0%8C+%E1%A0%8C',
    ico: <SiShikimori/>,
  },
  {
    name: 'Steam',
    url: 'https://steamcommunity.com/id/nesa402610',
    ico: <FaSteam/>,
  }, {
    name: 'OSU! Gatari',
    url: 'https://osu.gatari.pw/u/11971',
    ico: <SiOsu/>,
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/nesa402610',
    ico: <FaTwitter/>
  }
];

export const csrf_token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
