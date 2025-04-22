import { STORE_NAME } from "../global/store.js";

function Footer() {
  return (
    <>
      <footer className="p-4 mt-12 sm:p-6 sm:mt-12 flex flex-col gap- sm:gap-6">
        <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 py-4 sm:pt-6 sm:py-0 border-y-1 border-gray-200">
          {/* Primera Fila: Información y Contacto */}

          <div>
            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
              Información útil
            </h3>
            <ul>
              <li className="mb-4">
                <a
                  href="#"
                  target="_blank"
                  className="text-gray-600 hover:underline"
                >
                  Centro de ayuda en línea
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="#"
                  target="_blank"
                  rel="nofollow"
                  className="text-gray-600 hover:underline"
                >
                  Políticas de devolución de productos
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="#"
                  target="_blank"
                  rel="nofollow"
                  className="text-gray-600 hover:underline"
                >
                  Términos y Condiciones
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="#"
                  target="_blank"
                  rel="nofollow"
                  className="text-gray-600 hover:underline"
                >
                  Información de Aduanas
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
              Todo en un solo lugar
            </h3>
            <ul>
              <li className="mb-4">
                <div className="flex flex-row items-center gap-2">
                  <i className="fa-solid fa-check text-gray-900"></i>
                  <p className="text-gray-600">
                    Millones de productos originales.
                  </p>
                </div>
              </li>
              <li className="mb-4">
                <div className="flex flex-row items-center gap-2">
                  <i className="fa-solid fa-check text-gray-900"></i>
                  <p className="text-gray-600">
                    Optimizamos tus compras consolidando tu envío.
                  </p>
                </div>
              </li>
              <li className="mb-4">
                <div className="flex flex-row items-center gap-2">
                  <i className="fa-solid fa-check text-gray-900"></i>
                  <p className="text-gray-600">
                    Elegí en qué moneda pagar (pesos o dólares).
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
              Comprá con tranquilidad
            </h3>
            <ul>
              <li>
                <p className="text-gray-600">
                  {STORE_NAME} cuenta con los certificados verificados para
                  garantizar la seguridad de la compra.
                </p>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
              Contacto
            </h3>
            <ul>
              <li className="mb-4 flex flex-row gap-2">
                <div>
                  <i className="fa-solid fa-headphones-simple text-gray-900"></i>
                </div>
                <div>
                  <p className="text-gray-900 font-bold">
                    Atención telefónica: (+54) 11 9999 9999
                  </p>
                  <p className="text-gray-900">
                    De Lunes a Sábados en el horario de 09:00hs a 18:00hs y
                    Domingos de 10:00hs a 16:00hs.
                  </p>
                </div>
              </li>
              <li className="mb-4 flex flex-row gap-2">
                <div>
                  <i className="fa-regular fa-clock text-gray-900"></i>
                </div>
                <div>
                  <p className="text-gray-500">
                    Recordá ingresar a tu cuenta para tener una experiencia
                    personalizada y acceder a más información
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Segunda Fila: Métodos de Pago */}

        <div className="py-4 sm:pb-6 sm:py-0 border-b-1 border-gray-200">
          <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
            Métodos de Pago
          </h3>
          <ul className="flex flex-row gap-5 items-center">
            <li>
              <img
                src="https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_1280.png"
                alt=""
                className="w-20"
              />
            </li>
            <li>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                alt=""
                className="w-10"
              />
            </li>
            <li>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt=""
                className="w-10"
              />
            </li>
            <li>
              <img
                src="https://www.cajademedicos.com.ar/wp-content/uploads/logo-mercado-pago.png"
                alt=""
                className="w-20"
              />
            </li>
          </ul>
        </div>

        {/* Tercera Fila: Derechos y Redes Sociales */}

        <div className="py-4 sm:py-0  flex flex-col gap-4 sm:justify-between sm:flex-row sm:gap-0 sm:items-center">
          <span className="text-sm text-gray-500 text-center">
            © 2025 {STORE_NAME}™. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 justify-center sm:mt-0">
            <a
              href="#"
              className="w-[52px] h-[52px] bg-brand-black flex items-center justify-center overflow-hidden transition duration-300 hover:bg-[#1bba32] active:scale-90"
            >
              <i className="fa-brands fa-whatsapp text-white text-[17px] transition duration-300 hover:animate-slide-in-top"></i>
            </a>
            <a
              href="#"
              className="w-[52px] h-[52px] bg-brand-black flex items-center justify-center overflow-hidden transition duration-300 hover:bg-[#d62976] active:scale-90"
            >
              <i className="fa-brands fa-instagram text-white text-[17px] transition duration-300 hover:animate-slide-in-top"></i>
            </a>
            <a
              href="#"
              className="w-[52px] h-[52px] bg-brand-black  flex items-center justify-center overflow-hidden transition duration-300 hover:bg-[#2050c4] active:scale-90"
            >
              <i className="fa-brands fa-facebook-f text-white text-[17px] transition duration-300 hover:animate-slide-in-top"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
