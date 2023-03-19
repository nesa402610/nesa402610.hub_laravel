import React, {useState} from 'react';
import {useParams} from "react-router";
import {useGetCollectionQuery} from "../../services/HCollectionService";
import Collection from "../../components/collection/Collection";
import Loader from "../../components/Loader";

const HCollectionDetailedPage = () => {
  const passkey = localStorage.getItem('passkey')
  const {id} = useParams()
  const {data} = useGetCollectionQuery(passkey, {
    selectFromResult: ({data}) => ({
      data: data?.find(d => d.id == id),
    })
  })
  const [episode, setEpisode] = useState(1);

  if (!data) return <Loader/>
  return (
    <div className={'m-4 flex flex-col gap-4'}>
      <Collection collection={data}/>
      {data.links.length !== 0 &&
        <div className={'block--light gap-4 flex flex-col'}>
          <div className={'flex justify-between'}>
            <div className={'flex gap-4'}>
              {data.links.map((link, index) =>
                <div onClick={() => setEpisode(index + 1)}
                     className={'flex p-4 rounded-lg ' + (episode === index + 1 ? 'bg-neutral-900' : 'bg-neutral-800')}>
                  Серия {index + 1}
                </div>
              )}
            </div>
            <div className={'bg-neutral-900 p-4 rounded-lg'}>
              Не работает
            </div>
          </div>
          <div className={' flex justify-center'}>
            <video className={'h-[640px] rounded-lg'} controls autoPlay onLoadStart={e=> e.currentTarget.volume = 0.2} src={data.links[episode - 1].link}/>
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

export default HCollectionDetailedPage;
