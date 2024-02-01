const CommitCard = ({ commit }: any) => (
  <div className='w-full max-w-4xl shadow-card p-2 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out'>
    <div className='flex justify-between'>
      <p>{commit.commit.author.name}</p>
      <p className='text-gray-600'>
        {new Date(commit.commit.author.date).toLocaleDateString()}
      </p>
    </div>
    <h3 className='text-xl text-left font-medium'>{commit.commit.message}</h3>
  </div>
);

export default CommitCard;
