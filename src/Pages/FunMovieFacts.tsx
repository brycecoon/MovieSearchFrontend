import {facts} from "../Data/movieFactsData"

const FunMovieFacts = () => {
  return (
    <div className=" bg-gray-100 text-gray-800 max-w-4xl">
      {/* Header Section */}
      <header className="bg-black text-white py-6 text-center">
        <h1 className="text-5xl font-bold">Fun Movie Facts</h1>
        <p className="text-xl mt-2">Explore the fascinating history of filmmaking!</p>
      </header>

      {/* Content Section */}
      <main className="px-6 lg:px-24 py-10">
        {/* Fact List */}
        {facts.map((fact, index) => (
          <div>
            <h2 className="flex justify-center text-4xl font-semibold mb-4">{index + 1}. {fact.title}</h2>
          <section key={index} className="mb-12 grid grid-cols-2">
            <img
              src={fact.image}
              alt={fact.title}
              className="w-full max-h-96 object-cover rounded-lg shadow-md mb-4 mr-5"
            />
            <p className="text-lg ml-10 ">{fact.description}</p>
          </section>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-6 text-center">
        <p>
          These Facts come from{" "}
          <a
            href="https://legacybox.com/blogs/analog/fun-facts-film-history?srsltid=AfmBOopBD6Mvxaq50HOsgwJQPWi2U0IZmfF4bQFROe4Leiy8IxuOGv9X"
            className="underline text-blue-400 hover:text-blue-600"
          >
            legacybox.com
          </a>
        </p>
      </footer>
    </div>
  );
};



export default FunMovieFacts;
