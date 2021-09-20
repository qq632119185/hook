import React, { useContext } from 'react';

import { countContext } from './index.js'

import Scss from './index.module.scss'

export default function Palybutton() {

    const [, , data, , audioplay, setAudioplay] = useContext(countContext)
    
    function handelonCanPlay(e) {
        e.target.volume = audioplay.audiovolume / 100
        setAudioplay({
            ...audioplay,
            audiotarget: document.getElementById('audio'),
        })
    }

    function handelOnclicklastsong() {
        data.forEach(item => {
            if (item.id + 1 === audioplay.audioid) {
                setAudioplay({
                    ...audioplay,
                    audioid: item.id,
                    audiosrc: item.src,
                    audiopic: item.pic,
                    audiolrc: item.lrc ? item.lrc : [],
                })
            }
        })
    }

    function handelOnclickplaypaused() {
        audioplay.audiotarget.paused ? audioplay.audiotarget.play() : audioplay.audiotarget.pause()
    }

    function handelOnclicknextsong() {
        data.forEach(item => {
            if (item.id - 1 === audioplay.audioid) {
                setAudioplay({
                    ...audioplay,
                    audioid: item.id,
                    audiosrc: item.src,
                    audiopic: item.pic,
                    audiolrc: item.lrc ? item.lrc : [],
                })
            }
        })
    }

    function handelonClickreplay() {
        audioplay.audiotarget.currentTime = 0
        setAudioplay({
            ...audioplay,
            audiotimeupdate: 0
        })
    }

    function handelonChangetimeupdate(e) {
        if(audioplay.audiotarget.currentTime) {
            audioplay.audiotarget.currentTime = e.target.value/100*audioplay.audiotarget.duration
        }
        setAudioplay({
            ...audioplay,
            audiotimeupdate: e.target.value
        })
    }

    function handelonTimeUpdate(e) {
        if(e.target.currentTime) {
            setAudioplay({
                ...audioplay,
                audiocurrentTime: e.target.currentTime,
                audiotimeupdate: e.target.currentTime/e.target.duration*100
            })
        }
        if(e.target.ended) {
            handelOnclicknextsong()
        }

        var randomr = Math.floor(Math.random()*100)
        var randomg = Math.floor(Math.random()*100)
        var randomb = Math.floor(Math.random()*1000)
        var randoma = Math.floor(Math.random()*1000)
        if(randomr < 55 && randomg < 55 && randomb < 155 && randoma < 155) {
            let appbackground = document.getElementById('appbackground')
            appbackground.style.transition = `all 5s ease`
            appbackground.style.background = `linear-gradient(200deg, rgba(${randomr},${randomg},${randomr},1), rgba(${randomb},${randoma},${randomb},1))`
        }
    }

    function handelonChangevolume(e) {
        audioplay.audiotarget.volume = e.target.value / 100
        setAudioplay({
            ...audioplay,
            audiovolume: e.target.value
        })
    }

    return (
        <div className={Scss.palybutton}>
            <div className={Scss.palybuttonx}>
                <span onClick={() => handelOnclicklastsong()} title="上一首"></span>
                <span onClick={() => handelOnclickplaypaused()} title="暂停"></span>
                <span onClick={() => handelOnclicknextsong()} title="下一首"></span>
                <span onClick={() => handelonClickreplay()} title="重播"></span>
                <input type="range" onChange={(e) => handelonChangetimeupdate(e)} value={audioplay.audiotimeupdate} />
                <span onClick={() => setAudioplay({ ...audioplay, audiomuted: !audioplay.audiomuted, })} title="音量"></span>
                <input type="range" onChange={(e) => handelonChangevolume(e)} value={audioplay.audiovolume} />
            </div>
            <audio id='audio' type='audio/mpeg' onTimeUpdate={(e) => handelonTimeUpdate(e)} onCanPlay={(e) => handelonCanPlay(e)} src={audioplay.audiosrc} muted={audioplay.audiomuted} autoPlay></audio>
        </div>
    )
}