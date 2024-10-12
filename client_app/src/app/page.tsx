import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Library</title>
        <meta name="description" content="A simple home library app" />
        <link rel="icon" href="../favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="text-center py-20 px-4">
          <h1 className="text-5xl font-bold text-gray-800">
            Welcome to Your Library
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Manage and discover your book collection easily
          </p>

          {/* buttons */}
          <div className="mt-10 space-x-4">
            <a
              href="/library"
              className="bg-blue-600 text-white py-3 px-8 rounded-md shadow-md hover:bg-blue-700 transition"
            >
              Explore Library
            </a>
            <a
              href="/add-book"
              className="bg-gray-200 text-gray-800 py-3 px-8 rounded-md shadow-md hover:bg-gray-300 transition"
            >
              Add New Book
            </a>
          </div>
        </section>

        {/* Feature section */}
        <section className="mt-20 text-center px-4">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">
            What You Can Do
          </h2>
          <ul className="space-y-4">
            <li className="text-lg text-gray-600">
              Add new books to your library
            </li>
            <li className="text-lg text-gray-600">
              Browse and search through your collection
            </li>
            <li className="text-lg text-gray-600">
              Keep track of books you've read and want to read
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
