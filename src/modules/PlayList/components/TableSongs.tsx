import { FavoriteSongListCard } from '@/shared/components'
import { Heart } from '@/shared/icons'

const songs_test = [
  {
    id: 'K3g3hkPB',
    name: 'Hunter x Hunter - Departure! (Opening) Lofi Hip Hop Remix Remix Remix Remix',
    cover: 'https://od.lk/s/NjZfNTE4NDEzMThf/hxh%20%281%29.webp',
    url: 'https://od.lk/s/NjZfNTE4NDEwNzNf/Hunter%20x%20Hunter%20-%20Departure%21%20%28Opening%29%20Lofi%20Hip%20Hop%20Remix.mp3',
  },
  {
    id: 'iqGhZryo',
    name: 'Zoldyck Family Theme',
    cover: 'https://od.lk/s/NjZfNTE4NDEyNzlf/killua.webp',
    url: 'https://od.lk/s/NjZfNTE4NDEwOTBf/Hunter%20X%20Hunter%202011%20-%20Zoldyck%20Family%20Theme.mp3',
  },
  {
    id: 'm5Da9wj4',
    name: 'Legend Of The Martial Artist',
    cover: 'https://od.lk/s/NjZfNTE4NDEzMDRf/gon.webp',
    url: 'https://od.lk/s/NjZfNTE4NDExMDVf/Hunter%20x%20Hunter%20OST%203_%2010%20-%20In%20The%20Palace~Lamentoso.mp3',
  },
  {
    id: 'm5Da9wj4d',
    name: 'Legend Of The Martial Artist',
    cover: 'https://od.lk/s/NjZfNTE4NDEzMDRf/gon.webp',
    url: 'https://od.lk/s/NjZfNTE4NDExMDVf/Hunter%20x%20Hunter%20OST%203_%2010%20-%20In%20The%20Palace~Lamentoso.mp3',
  },
  {
    id: 'm5Da9wj4f',
    name: 'Legend Of The Martial Artist',
    cover: 'https://od.lk/s/NjZfNTE4NDEzMDRf/gon.webp',
    url: 'https://od.lk/s/NjZfNTE4NDExMDVf/Hunter%20x%20Hunter%20OST%203_%2010%20-%20In%20The%20Palace~Lamentoso.mp3',
  },
  {
    id: 'm5Da9wj4g',
    name: 'Legend Of The Martial Artist',
    cover: 'https://od.lk/s/NjZfNTE4NDEzMDRf/gon.webp',
    url: 'https://od.lk/s/NjZfNTE4NDExMDVf/Hunter%20x%20Hunter%20OST%203_%2010%20-%20In%20The%20Palace~Lamentoso.mp3',
  },
]

const TableSongs = () => {
  return (
    <div className='content-pages relative animate-fade-in overflow-x-auto text-cod-gray-400 animate-delay-300'>
      <table className='w-full text-left text-sm rtl:text-right'>
        <thead className='text-xs uppercase '>
          <tr>
            <th scope='col' className='px-6 py-3 text-sm font-bold md:w-3'>
              #
            </th>
            <th scope='col' className='px-6 py-3'>
              Título
            </th>
            <th scope='col' className='px-6 py-3'>
              Duración
            </th>
            <th scope='col' className='px-6 py-3'></th>
          </tr>
        </thead>

        <tbody>
          {songs_test?.map((song, index) => (
            <tr key={song.id}>
              <td scope='row' className='px-6 py-6'>
                {index + 1}
              </td>
              <td className='max-w-44 pl-4'>
                <FavoriteSongListCard cover={song.cover} name={song.name} />
              </td>
              <td className='px-6 py-6'>14:56</td>
              <td className='px-6 py-6'>
                <Heart className='text-carissma-600' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableSongs
