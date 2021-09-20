import React, { useContext } from 'react';

import Scss from './index.module.scss'

import { countContext } from './index.js'

export default function Lyric() {

    const [ , , , , audioplay, ] = useContext(countContext)

    function stylelrc(timep, index) {

        function format(x, type) {
            if (type === 'tonumber') {
                let interval = x.split(/:/)
                return x = Number(interval[0] * 60) + Number(interval[1])
            }
            if (type === 'totime') {
                let interval = Math.floor(x)
                let minute = (Math.floor(interval / 60)).toString().padStart(2, '0')
                let second = (interval % 60).toString().padStart(2, '0')
                return x = `${minute}:${second}`
            }
        }
        if (index + 5 < audioplay.audiolrc.length) {
            if (audioplay.audiolrc[index + 5].timep < format(audioplay.audiocurrentTime, 'totime')) {
                return audioplay.audiostyle[0]
            }
        }
        if (index + 1 < audioplay.audiolrc.length) {
            if (timep < format(audioplay.audiocurrentTime, 'totime') && format(audioplay.audiocurrentTime, 'totime') < audioplay.audiolrc[index + 1].timep) {
                return audioplay.audiostyle[1]
            }
        }
    }

    return (
        <div className={Scss.lyric}>
            <div className={Scss.lyricimg}>
                <div>
                    <img src={audioplay.audiopic} alt="audiopic"></img>
                </div>
            </div>
            <div className={Scss.lyricscroll}>
                <div className={Scss.lyrictransition}>
                    {audioplay.audiolrc.map((item, index) => <p key={item.timep} style={stylelrc(item.timep, index)}>{item.lrcp}</p>)}
                </div>
            </div>
            <p><span></span></p>
        </div>
    )
}