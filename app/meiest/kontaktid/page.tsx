export default function Kontaktid() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Kontaktid</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Aadress</h2>
          <div className="text-gray-600 space-y-2">
            <p>Peterburi tee 47</p>
            <p>Tallinn 11415</p>
            <p>Eesti</p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Kontaktandmed</h2>
          <div className="text-gray-600 space-y-2">
            <p>
              <strong>Telefon:</strong>{' '}
              <a href="tel:+3725290528" className="text-primary-600 hover:text-primary-800">
                +372 5 290 528
              </a>
            </p>
            <p>
              <strong>E-post:</strong>{' '}
              <a href="mailto:info@turvakoolitus.eu" className="text-primary-600 hover:text-primary-800">
                info@turvakoolitus.eu
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Tööaeg</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="text-gray-600 space-y-2">
            <p><strong>E-R:</strong> 9:00 - 17:00</p>
            <p><strong>L:</strong> Suletud</p>
            <p><strong>P:</strong> Suletud</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-gray-600">
          Võtke meiega ühendust, kui teil on küsimusi või soovite registreeruda koolitusele.
        </p>
      </div>
    </div>
  )
}
