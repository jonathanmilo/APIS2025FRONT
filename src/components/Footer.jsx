import { Tooltip, Divider } from "@mui/material";
import { STORE_NAME } from "@src/global/store.js";
import { FiFacebook } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import {
  FaInstagram,
  FaRegClock,
  FaWhatsapp,
  FaHeadphonesAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="p-4 sm:p-6 bg-white dark:bg-black flex flex-col sm:gap-6">
      <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 py-7 sm:py-0">
        {/* Primera Fila: Información útil */}
        <div>
          <h3 className="mb-6 text-sm font-semibold text-black dark:text-white uppercase">
            Información útil
          </h3>
          <ul>
            <li className="mb-4">
              <a
                href="#"
                target="_blank"
                className="text-black dark:text-white hover:underline"
              >
                Centro de ayuda en línea
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                target="_blank"
                className="text-black dark:text-white hover:underline"
              >
                Políticas de devolución de productos
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                target="_blank"
                className="text-black dark:text-white hover:underline"
              >
                Términos y Condiciones
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                className="text-black dark:text-white hover:underline"
              >
                Información de Aduanas
              </a>
            </li>
          </ul>
        </div>
        {/* Segunda Fila: Todo en un solo lugar */}
        <div>
          <h3 className="mb-6 text-sm font-semibold text-black dark:text-white uppercase">
            Todo en un solo lugar
          </h3>
          <ul>
            <li className="mb-4 flex flex-row gap-2">
              <FaCheck className="text-black dark:text-white mt-1" />
              <p className="text-black dark:text-white">
                Millones de productos originales de todo el mundo.
              </p>
            </li>
            <li className="mb-4 flex flex-row gap-2">
              <FaCheck className="text-black dark:text-white mt-1" />
              <p className="text-black dark:text-white">
                Optimizamos tus compras consolidando tu envío.
              </p>
            </li>
            <li className="flex flex-row gap-2">
              <FaCheck className="text-black dark:text-white mt-1" />
              <p className="text-black dark:text-white">
                Elegí en qué moneda pagar (pesos o dólares).
              </p>
            </li>
          </ul>
        </div>

        {/* Tercera Fila: Comprá con tranquilidad */}
        <div>
          <h3 className="mb-6 text-sm font-semibold text-black dark:text-white uppercase">
            Comprá con tranquilidad
          </h3>
          <ul>
            <li>
              <p className="text-black dark:text-white">
                {STORE_NAME} cuenta con los certificados verificados para
                garantizar la seguridad de la compra.
              </p>
            </li>
          </ul>
        </div>

        {/* Cuarta Fila: Contacto */}
        <div>
          <h3 className="mb-6 text-sm font-semibold text-black dark:text-white uppercase">
            Contacto
          </h3>
          <ul>
            <li className="mb-4 flex flex-row gap-2">
              <div>
                <FaHeadphonesAlt className="text-black dark:text-white mt-1" />
              </div>
              <div>
                <p className="text-black dark:text-white font-bold">
                  Atención telefónica: (+54) 11 9999 9999
                </p>
                <p className="text-black dark:text-white">
                  De Lunes a Sábados en el horario de 09:00hs a 18:00hs y
                  Domingos de 10:00hs a 16:00hs.
                </p>
              </div>
            </li>
            <li className="flex flex-row gap-2">
              <div>
                <FaRegClock className="text-black dark:text-white mt-1" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-white">
                  Recordá ingresar a tu cuenta para tener una experiencia
                  personalizada y acceder a más información
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <Divider />

      {/* Quinta Fila: Métodos de Pago */}
      <div className="py-7 sm:py-0">
        <h3 className="mb-6 text-sm font-semibold text-black dark:text-white uppercase">
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

      <Divider />

      {/* Sexta Fila: Derechos y Redes Sociales */}
      <div className="py-7 sm:py-0 flex flex-col gap-4 sm:justify-between sm:flex-row sm:gap-0 sm:items-center">
        <span className="text-sm text-gray-500 dark:text-white text-center">
          © 2025 {STORE_NAME}™. All Rights Reserved.
        </span>
        <div className="flex mt-4 space-x-5 justify-center sm:mt-0">
          <Tooltip title="Whatsapp" arrow>
            <a
              href="#"
              target="_blank"
              className="bg-white dark:bg-[color:var(--color-gray)]  text-green-600 rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-green-600 hover:text-white transition-colors duration-500 cursor-pointer"
            >
              <FaWhatsapp size="1.5em" />
            </a>
          </Tooltip>
          <Tooltip title="Instagram" arrow>
            <a
              href="#"
              target="_blank"
              className="relative bg-white dark:bg-[color:var(--color-gray)] text-purple-600 rounded-full w-12 h-12 flex items-center justify-center shadow-md overflow-hidden transition-colors duration-500 cursor-pointer hover:text-white hover:bg-gradient-to-tr hover:from-[#405de6] hover:via-[#b33ab4] hover:to-[#fd1f1f]"
            >
              <FaInstagram size="1.5em" />
            </a>
          </Tooltip>
          <Tooltip title="Facebook" arrow>
            <a
              href="#"
              target="_blank"
              className="bg-white dark:bg-[color:var(--color-gray)] text-blue-600 rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-blue-600 hover:text-white transition-colors duration-500 cursor-pointer"
            >
              <FiFacebook size="1.5em" />
            </a>
          </Tooltip>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
