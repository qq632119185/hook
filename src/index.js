import React, { useState, useEffect, createContext } from 'react';
import ReactDOM from 'react-dom'

import Header from './index_header.js'
import Nav from './index_nav.js'
import Palybutton from './index_palybutton.js'
import Lyric from './index_lyric.js'

import Scss from './index.module.scss';

import player_cover from './img/playlist/player_cover.png';

export const countContext = createContext()

export default function App() {

    const [palylist, setPalylist] = useState([]);

    const [data, setData] = useState([])

    const [audioplay, setAudioplay] = useState({
        audioid: 1,
        audiosrc: 'https://qq632119185.github.io/hook/static/audio/98759.mp3',
        audiopic: player_cover,
        audiolrc: [],
        audiostyle: [{ display: 'none', transition: 'all 2s ease', }, { color: 'white', transition: 'all 0.25s ease', }],
        audiomuted: false,
        audiovolume: 40,
        audiotimeupdate: 0,
        audiocurrentTime: 0,
    })

    useEffect(() => {
        let palylistx = palylist.filter(item => item.completed)
        let fetchsrc = ''
        palylistx[0] ? fetchsrc = palylistx[0].listsrc : fetchsrc = 'http://geapi.5nd.com/a/ar5bc.ashx?_c=mtest&_p=bXRlc3Q&nd=get2me&t=104&ids=2'
        fetch(fetchsrc,
            {
                headers: {
                    'content-type': 'application/json',
                },
                method: 'GET',
            })
            .then(res => res.text())
            .then(
                (result) => {
                    // console.log(result)
                    // text修改再变json
                    const resultx = JSON.parse(
                        result.replace('get2me(', '').replace('getLabel(', '').replace(');', '').replace(/song_id/g, 'id').replace(/location/g, 'src').replace(/singer_name/g, 'singer').replace(/album_name/g, 'album').replace(/album_cover/g, 'pic').replace(/song_name/g, 'song')
                    )
                    //数组item对象
                    const resultxx = resultx.data.map((item, index) => {
                        //对象属性操作
                        delete item.song_status
                        delete item.label_id
                        delete item.singer_id
                        delete item.album_id
                        delete item.mIndex
                        delete item.lrc_type
                        delete item.fav
                        item.completed = false
                        item.paly = false
                        item.share = false
                        item.src = 'http://mpge.5nd.com/' + item.src
                        item.pic = 'http://img.5nd.com/' + item.pic
                        item.id = index + 1
                        item.lrc = ""
                        //歌词
                        fetch(`http://geapi.5nd.com/a/ar5bc.ashx?_c=mtest&_p=bXRlc3Q&nd=getSong&t=100&_lrc=1&ids=${item.lrc_id}`,
                            {
                                headers: {
                                    'content-type': 'application/json',
                                },
                                method: 'GET',
                            })
                            .then(res => res.text())
                            .then(
                                (result) => {
                                    // text修改再变json
                                    var resultlrc = JSON.parse(
                                        result.replace('getSong(', '').replace(');', '')
                                    )
                                    if (resultlrc.data[0] !== undefined && resultlrc.data[0].lrc.indexOf('[') === 0) {
                                        // console.log(resultlrc.data[0].lrc)
                                        var riclist = []
                                        resultlrc.data[0].lrc.split(/\n/).forEach(item => {
                                            // console.log(item)
                                            if (item.length > 10 && item.indexOf('[') === 0) {
                                                // console.log(item, item.length)
                                                let x = item.split(/[[\]]/)
                                                riclist.push({
                                                    timep: x[1],
                                                    lrcp: x[2]
                                                })
                                            }
                                        })
                                        riclist = riclist.filter(val => val.lrcp !== undefined)
                                        item.lrc = riclist
                                    }
                                },
                                (error) => {
                                    console.log(error)
                                    // error
                                }
                            )
                        delete item.lrc_id
                        //整理好数据
                        return item
                    })
                    setData(resultxx)
                    // console.log(palylistx[0].listsrc)
                },
                (error) => {
                    console.log(error)
                    // error
                    // if(error === 'TypeError: Failed to fetch') {
                    // console.log('palylistx')
                    // }
                    let palylistx = palylist.filter(item => item.completed)
                    let fetchid = ''
                    palylistx[0] ? fetchid = palylistx[0].id : fetchid = 2

                    fetch(`./playing${fetchid}.json`)
                        .then(res => res.json())
                        .then(
                            result => {
                                setData(result.data)
                            },
                            (error) => {
                                console.log(error)
                            }
                        )





                }
            )
    }, [palylist])

    return (
        <div className={Scss.app} id='appbackground'>
            <div className={Scss.appheader}>
                <Header />
            </div>
            <countContext.Provider value={[palylist, setPalylist, data, setData, audioplay, setAudioplay]}>
                <div className={Scss.appnavlyric}>
                    <Nav />
                    <Lyric />
                </div>
                <div className={Scss.apppalybutton}>
                    <Palybutton />
                </div>
            </countContext.Provider>
        </div >
    );
}

ReactDOM.render(<App />, document.getElementById('root'))