import React from "react";

export const parseBbCode = (text) => {
    const BOLD = /\[b](.*?)\[\/b]/g
    const BOLD_TAG = '<strong>$1</strong>'

    const ITALIC = /\[em](.*?)\[\/em]/g
    const ITALIC_TAG = '<em>$1</em>'

    const UNDERLINE = /\[u](.*?)\[\/u]/g
    const UNDERLINE_TAG = '<u>$1</u>'

    const SHIKI_CHAR = /\[character=(.*?)](.*?)\[\/character]/g
    const SHIKI_CHAR_TAG = '<a href="https://shikimori.me/characters/$1" style="font-weight: bold; text-decoration: underline" target="_blank">$2</a>'

    const COLOR = /\[color=(.*?)](.*?)\[\/color]/g
    const COLOR_TAG = '<span style="color: $1">$2</span>'

    const SPOILER = /\[spoiler](.*?)\[\/spoiler]/g
    const SPOILER_TAG = '<span>$1</span>'


    const html = text
        .replace(BOLD, BOLD_TAG)
        .replace(ITALIC, ITALIC_TAG)
        .replace(UNDERLINE, UNDERLINE_TAG)
        .replace(SHIKI_CHAR, SHIKI_CHAR_TAG)
        .replace(COLOR, COLOR_TAG)
        .replace(SPOILER, SPOILER_TAG)

    return <div dangerouslySetInnerHTML={{__html: html}}/>;
};
