import React, { useContext } from 'react';

import Clickshare from './index_nav_palying_clickshare.js'

import Scss from './index.module.scss';

import { countContext } from './index.js'

export default function Palying() {

    const [, , data, setData, audioplay, setAudioplay] = useContext(countContext)

    function handleOnclickpaly(itemx) {
        setAudioplay({
            ...audioplay,
            audioid: itemx.id,
            audiosrc: itemx.src,
            audiopic: itemx.pic,
            audiolrc: itemx.lrc ? itemx.lrc : [],
        })
    }

    function handleOnclickshare(itemx) {
        let palyingx = data.map(item => {
            item.id === itemx.id ? item.share = !item.share : item.share = false
            return item
        })
        setData(palyingx)
    }



    return (
        <div className={Scss.palying}>
            <div className={Scss.palyingxscroll}>
                <div className={Scss.palyingx}>
                    <span></span>
                    <span>歌曲</span>
                    <span></span>
                    <span>歌手</span>
                    <span>专辑</span>
                </div>
            </div>
            <div className={Scss.palyingitemscroll}>
                {data.map(item => <div key={item.id}>
                    <div className={Scss.palyingitem}>
                        <span>{item.id}</span>
                        <span>{item.song}</span>
                        <span>
                            <p onClick={() => handleOnclickpaly(item)} title="点击播放"></p>
                            <p onClick={() => window.open('about:blank').location.href = item.src} title="点击下载"></p>
                            <p onClick={() => handleOnclickshare(item)} title="点击分享"></p>  
                        </span>
                        <span>{item.singer}</span>
                        <span>{item.album}</span>
                    </div>
                    {item.share ? <Clickshare song={item.song} src={item.src} handleOnclickshare={handleOnclickshare} /> : null}
                </div>)}
            </div>
        </div>
    )
}