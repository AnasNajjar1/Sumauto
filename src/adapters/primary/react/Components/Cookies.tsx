import React from 'react';
import { Container } from 'reactstrap';
import { Helmet } from 'react-helmet';

export const Cookies: React.FC = () => (
    <>
        <Helmet>
            <title>Política de cookies</title>
            <meta name="robots" content="noindex" />
        </Helmet>

        <div className="page page-cookies">
            <Container>
                <div className="text-center my-5">
                    <h1>POLÍTICA DE COOKIES</h1>
                    <p>
                        <i>25 de octubre 2021</i>
                    </p>
                </div>

                <p>
                    Al rellenar nuestro formulario, implementado en los sitios web de nuestros
                    socios Autocasión, AutoScout24 y UnoAuto, la información (cookies) puede ser
                    registrada y / o leída en tu equipo.
                </p>

                <h2>¿QUÉ ES UNA COOKIE?</h2>

                <p>
                    Es un archivo de texto que se deposita en un espacio adaptado a tal fin, en el
                    disco duro de tu terminal (ordenador, tablet, teléfono móvil o cualquier otro
                    dispositivo optimizado para Internet), al visualizar contenidos o publicidad
                    online. Solo el emisor de la cookie puede leer y/o modificar información en el
                    archivo. Permite identificar tu terminal, en el que está registrado, por un
                    período de validez limitado (definido por el editor).
                </p>

                <h2>¿PARA QUÉ UTILIZA LAS COOKIES autobiz?</h2>

                <p>
                    autobiz utiliza dos tipos de cookies en este formulario, que cumplen con los
                    fines descritos a continuación y que se pueden almacenar en tu terminal durante
                    una visita a nuestro formulario:
                </p>

                <p>
                    <strong>1. Las cookies técnicas</strong> son necesarias para la navegación en
                    nuestro formulario, así como para el acceso a los diversos productos y
                    servicios. Las cookies técnicas permiten, en particular, reconocer
                    (identificación de sesión), señalar tu paso por esta o aquella página y mejorar
                    tu comodidad de navegación, además de adaptar la presentación del formulario a
                    las preferencias de visualización de tu terminal (idioma utilizado, resolución
                    de pantalla). Las cookies técnicas también permiten implementar medidas de
                    seguridad.
                </p>

                <p>
                    <strong>2. Las cookies de medición de audiencia</strong> son emitidas por
                    nuestros proveedores de servicios técnicos con el fin de medir la audiencia de
                    los diversos contenidos y secciones de nuestro formulario, con el fin de
                    evaluarlos y organizarlos mejor. Estas cookies también permiten, si es
                    necesario, detectar problemas de navegación y, en consecuencia, mejorar la
                    usabilidad de nuestros servicios.
                </p>

                <h2>SOCIOS DE AUTOBIZ</h2>

                <p>
                    Las cookies instaladas en nuestro formulario pueden ser cookies de terceros, es
                    decir, cookies que provienen de un dominio diferente al nuestro:
                </p>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Socio</th>
                            <th>Uso</th>
                            <th>Base de uso</th>
                            <th>Retención</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Google Analytics</td>
                            <td>
                                1.Almacenar y/o acceder a información en un dispositivo <br />
                                <br />
                                2.Medir el rendimiento de los contenidos
                            </td>
                            <td>Consentimiento</td>
                            <td>Máximo 13 meses</td>
                        </tr>
                    </tbody>
                </table>

                <p>
                    También puedes encontrar la lista completa de nuestros socios haga clic en el
                    enlace en la parte inferior de la página.
                </p>

                <h2>TUS OPCIONES CON RESPECTO A LAS COOKIES</h2>
                <p>
                    Puedes cambiar tus opciones con respecto al depósito de cookies en cualquier
                    momento accediendo a la preferencia de cookies clic en el enlace en la parte
                    inferior de la página.
                </p>

                <p>
                    También puedes configurar tu navegador para evitar que las cookies se almacenen
                    en tu dispositivo. No obstante, ten cuidado, esto puede tener un impacto en la
                    funcionalidad de nuestro formulario.
                </p>

                <h2>CAMBIOS EN NUESTRA POLÍTICA</h2>

                <p>
                    Cualquier cambio en nuestra política de cookies se publicará aquí. Te invitamos
                    a consultar esta política regularmente para estar al día de los últimos cambios.
                </p>
            </Container>
        </div>
    </>
);
