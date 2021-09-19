import React from 'react'

import Scss from './index.module.scss'

export default function Clickshare(props) {
    const {song, src, handleOnclickshare} = props
    return (
        <div className={Scss.clickshare}>
            <div className={Scss.clicksharex}>
                <h1>歌曲外链分享
                    <p onClick={handleOnclickshare}>×</p>
                </h1>
                <p>{song} 的外链地址为：</p>
                <input defaultValue={src}></input>
                <p>* 获取到的音乐外链有效期较短，请按需使用。</p>
                <p onClick={handleOnclickshare}>确定</p>
            </div>
        </div>
    )
}