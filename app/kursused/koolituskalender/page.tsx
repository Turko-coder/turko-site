import Link from 'next/link'

export default function Koolituskalender() {
  const courses = [
    {
      name: 'Valvetöötaja, tase 3',
      date: '2024-03-15',
      location: 'Tallinn',
      price: '450€',
      link: '/kursused/valvetootaja-tase-3',
    },
    {
      name: 'Turvatöötaja, tase 4',
      date: '2024-03-20',
      location: 'Narva',
      price: '550€',
      link: '/kursused/turvatootaja-tase-4',
    },
    {
      name: 'Turvajuht, tase 5',
      date: '2024-04-01',
      location: 'Tartu',
      price: '650€',
      link: '/kursused/turvajuht-tase-5',
    },
    {
      name: 'Valvetöötaja, tase 3',
      date: '2024-04-10',
      location: 'Tallinn',
      price: '450€',
      link: '/kursused/valvetootaja-tase-3',
    },
    {
      name: 'Täiendõpe',
      date: '2024-04-15',
      location: 'Tallinn',
      price: '300€',
      link: '/kursused/taiendope',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Koolituskalender</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vaata kõiki tulevasi koolitusi ja registreeru kohe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {course.name}
                  </h3>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">{course.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{course.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-primary-600">{course.price}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={course.link}
                    className="flex-1 text-center px-4 py-2.5 text-sm font-medium text-primary-600 hover:text-primary-700 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    Loe lähemalt
                  </Link>
                  <Link
                    href={`/meiest/paring?type=course&name=${encodeURIComponent(course.name)}&price=${encodeURIComponent(course.price)}&location=${encodeURIComponent(course.location)}&date=${encodeURIComponent(course.date)}`}
                    className="flex-1 text-center px-4 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors cursor-pointer"
                  >
                    Registreeru
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
