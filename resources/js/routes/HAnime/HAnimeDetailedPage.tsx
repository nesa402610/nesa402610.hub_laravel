import React, {useState} from 'react';
import {useParams} from "react-router";
import {useGetAllAnimeQuery} from "../../services/HCollectionService";
import HCollectionCard from "../../components/HCollection/HCollectionCard";
import Loader from "../../components/Loader";

const HAnimeDetailedPage = () => {
  const passkey = localStorage.getItem('passkey')
  const [autoPlay, setAutoPlay] = useState(JSON.parse(localStorage.getItem('autoplay')) ?? true);
  const {id} = useParams()
  const {data} = useGetAllAnimeQuery({passkey}, {
    selectFromResult: ({data}) => ({
      data: data?.collections.data.find(d => d.id == id),
    })
  })
  const [episode, setEpisode] = useState(1);
  const autoplayHandler = () => {
    setAutoPlay(prev => {
      localStorage.setItem('autoplay', JSON.stringify(!prev))
      return !prev
    })
  }
  if (!data) return <Loader/>
  return (
    <div className={'m-4 flex flex-col gap-4'}>
      <HCollectionCard collection={data}/>
      {data.links.length !== 0 &&
        <div className={'block--light gap-4 flex flex-col'}>
          <div className={'flex gap-4 justify-between md:flex-row xs:flex-col'}>
            <div className={'md:flex md:gap-4 xs:gap-2 gap-2 md:flex-nowrap xs:flex-wrap xs:grid xs:grid-cols-3'}>
              {data.links.map((link, index) =>
                <div key={link.id} onClick={() => setEpisode(index + 1)}
                     className={'flex whitespace-nowrap xs:basis-1/4 xs:flex-1 md:p-4 xs:p-2 rounded-lg ' + (episode === index + 1 ? 'bg-neutral-900' : 'bg-neutral-800')}>
                  Серия {index + 1}
                </div>
              )}
            </div>

            <div className={'flex gap-4'}>
              <div className={'md:p-4 p-2 rounded-lg flex items-center ' + (autoPlay ? 'bg-lime-600' : 'bg-red-800')}
                   onClick={autoplayHandler}
              >
                Автоплей видео
              </div>
              <div className={'bg-neutral-900 p-4 rounded-lg'}>
                Не работает
              </div>
            </div>
          </div>
          <div className={'flex justify-center'}>
            <video className={'md:h-[640px] rounded-lg h-auto'}
                   controls
                   autoPlay={autoPlay}
                   onLoadStart={e => e.currentTarget.volume = 0.2}
                   src={data.links[episode - 1].link}/>
          </div>
          {/*{data.link*/}
          {/*<iframe src={data.links[episode - 1]}*/}
          {/*        width='100%'*/}
          {/*        height="480"*/}
          {/*        allow="autoplay; encrypted-media; fullscreen; picture-in-picture;"*/}
          {/*        frameBorder="0"*/}
          {/*        allowFullScreen/>*/}
          {/*}*/}
        </div>
      }
    </div>
  );
};

export default HAnimeDetailedPage;
