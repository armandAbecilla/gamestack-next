import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import Link from 'next/link';

export default function GameCard({ id, image, name }) {
  const cld = new Cloudinary({ cloud: { cloudName: 'dbetq8dac' } });

  const img = cld
    .image(image)
    .setDeliveryType('fetch')
    .format('auto')
    .quality('auto')
    .resize(fill().width(640).aspectRatio('16:9').gravity(autoGravity()));

  const imageUrl = img.toURL();

  return (
    <Link
      href={`/game/${id}`}
      className='group bg-black-100 border-black-50 shadow-black-50 relative cursor-pointer overflow-hidden rounded-lg border shadow transition-all duration-300 ease-in-out hover:opacity-70'
    >
      <img
        src={imageUrl}
        alt={name}
        className='transition-all duration-300 ease-in-out group-hover:scale-110 w-full h-auto object-cover'
      />

      <div className='absolute bottom-0 w-full bg-[rgba(15,15,17,0.8)] px-2 py-2'>
        <h3 className='truncate text-center text-sm'>{name}</h3>
      </div>
    </Link>
  );
}
