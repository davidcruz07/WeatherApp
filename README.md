# ⛅ WeatherApp - Angular

**WeatherApp** es una aplicación web moderna y reactiva diseñada para proporcionar información meteorológica en tiempo real.

## 📸 Capturas de Pantalla

| Vista Principal | Historial y Errores |
| :---: | :---: |
| ![Vista Principal]<img width="1881" height="866" alt="image" src="https://github.com/user-attachments/assets/6636579c-0922-48a7-81a2-15ffdf3aba2e" /> | ![Historial] <img width="495" height="344" alt="image" src="https://github.com/user-attachments/assets/5460804d-aceb-48ab-b853-cc9575d799d7" /> <img width="1878" height="866" alt="image" src="https://github.com/user-attachments/assets/197ff205-c817-4aaf-b47b-dec721cf75f8" /> <img width="1881" height="865" alt="image" src="https://github.com/user-attachments/assets/0bcbae6a-3c05-44ff-b53d-75c3a3f71c2c" /> <img width="1881" height="866" alt="image" src="https://github.com/user-attachments/assets/8de99117-5c01-4a62-ba6b-dfeaf449a86f" />



 |
| *Dashboard con clima actual y pronóstico* | *Manejo de caché y mensajes de validación* |

## 🚀 Características Principales

*   **Estado Reactivo con Signals:** Gestión eficiente del estado de la aplicación utilizando Angular Signals para una reactividad óptima.
*   **Consumo de API REST:** Integración con la API de OpenWeather para obtener datos climáticos actuales y pronósticos extendidos.
*   **Arquitectura Robusta:** Uso de **Interceptors** para el logging de peticiones HTTP y **Models** (Interfaces) para el tipado estricto de datos.
*   **Búsqueda Inteligente:** Input con autocompletado y manejo de historial de las últimas 5 búsquedas mediante caché simple.
*   **Manejo de Errores:** Sistema de notificaciones para errores de conexión o ciudades no encontradas.
*   **Transformación de Datos:** Pipe personalizado para la conversión de unidades (Kelvin a Celsius).

## 🛠️ Stack Tecnológico

*   **Framework:** Angular 18 (Standalone Components)
*   **Estilos:** CSS3 (Custom Properties & Flexbox/Grid)
*   **Iconografía:** Font Awesome 7
*   **Herramientas:** HttpClientModule, RxJS (Observables), Signals

## 📦 Instalación y Configuración

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/davidcruz07/WeatherApp.git](https://github.com/davidcruz07/WeatherApp.git)
    cd WeatherApp
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Debido a políticas de seguridad, el archivo `environments` está ignorado en Git. Debes crearlo manualmente en la ruta `src/environments/environment.ts`:
    ```typescript
    export const environment = {
      production: false,
      apiKey: 'TU_API_KEY_DE_OPENWEATHERMAP_AQUI'
    };
    ```

4.  **Ejecutar el servidor de desarrollo:**
    ```bash
    ng serve
    ```
    Navega a `http://localhost:4200/`.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
