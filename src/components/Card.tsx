export default function Card() {
  const data = {
    name: "Lorem",
    msg: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem ex reprehenderit ducimus quaerat ad modi delectus labore rem non accusantium.",
  };
  return (
    <div>
      <div className="card w-96 shadow-xl from-gray-600	">
        <div className="card-body">
          <h2 className="card-title">{data?.name}</h2>
          <p>{data?.msg}</p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
}
