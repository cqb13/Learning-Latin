import Image from "next/image";

const FeatureCard = ({ title, description, icon, link, action }: any) => (
  <div
    className='rounded-lg shadow-lg p-6 bg-white hover:scale-105 transition-transform duration-300 ease-in-out'
    onClick={action}
  >
    <div className='flex items-center justify-center'>
      <Image src={icon} alt={title} width={100} height={100} />
    </div>
    <h3 className='text-2xl font-bold mt-5'>{title}</h3>
    <p className='mt-2 text-gray-600'>{description}</p>
    {link && (
      <a
        className='text-blue-500 hover:underline mt-2 inline-block'
        href={link}
      >
        Learn More
      </a>
    )}
  </div>
);

export default FeatureCard;
