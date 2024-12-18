# Catalogo-WEB

Repositorio del Proyecto Catalogo-WEB (Frontend) desarrollado con React.

<a href="https://github.com/GreenCodeRepos/catalogo-web/">
    Visita el repositorio
</a>

<a href="https://greencode.deno.dev/">
    Visita mi blog personal
</a>

## Justificación del Stack tecnológico

- React: Biblioteca de JavaScript que se utiliza para construir interfaces de usuario. Su enfoque basado en componentes permite un desarrollo modular y reutilizable. La gestión eficiente del estado, la facilidad de integración con otras bibliotecas y su enfoque declarativo hacen de React una elección popular para construir interfaces de usuario dinámicas y escalables..
  
- React-Modal: React-Modal es una biblioteca que facilita la creación de modales en aplicaciones React. Los modales son útiles para mostrar información adicional, confirmaciones o formularios sin necesidad de navegar a otra página. Al ser fácil de integrar con React, React-Modal simplifica la creación y gestión de ventanas modales de manera eficiente.
  
- React-Router-Dom: Biblioteca para la navegación en aplicaciones React. Permite la gestión de rutas y navegación entre diferentes componentes sin tener que recargar la página completa. Facilita la creación de aplicaciones de página única (SPA) al proporcionar una forma declarativa de definir las rutas y manejar la navegación del usuario.
  
- SweetAlert2: Biblioteca de JavaScript que proporciona ventanas modales personalizadas y atractivas. En comparación con los modales estándar del navegador, SweetAlert2 ofrece una experiencia de usuario mejorada y más estilizada. Es útil para mostrar mensajes de confirmación, alertas o mensajes informativos de manera visualmente atractiva.

- Docker: Proporciona una solución integral para mejorar el desarrollo y la implementación de aplicaciones. Facilita la portabilidad del entorno, permitiendo que la aplicación se ejecute de manera consistente en diferentes máquinas. Con la gestión aislada de dependencias y la capacidad de orquestar múltiples contenedores, Docker simplifica la escalabilidad y el despliegue de aplicaciones como la nuestra.

## Iniciación del proyecto en desarrollo
- Asegúrese de tener instalado Docker en el PC.
- Ejecute el proyecto con el siguiente comando:

  ```
  docker-compose up --build
  ```
- **NO** necesita emitir `npm install`.🚫
- Espere a que el contenedor `frontend` termine de compilar y cargar. 
- La aplicación WEB estará corriendo por el puerto 3000. 🚀
  
## Instalación en ASW
Recomendaciones para el despliegue en ASW:

1. Crear una cuenta de AWS:
Si aún no tienes una cuenta en AWS, regístrate en AWS Console.

2. Preparar tu aplicación:
Asegúrate de que tu aplicación esté lista para ser desplegada y que puedas ejecutarla localmente con éxito.

3. Configurar la base de datos MongoDB en AWS:
Puedes usar Amazon DocumentDB como servicio de base de datos compatible con MongoDB en AWS.

4. **Configurar el frontend:**
Se podría crear un bucket S3 para React:
En la AWS Console, selecciona S3 en la sección de servicios.
Crea un nuevo bucket y sube tu aplicación React compilada.
6. Configurar seguridad:
Configura grupos de seguridad en EC2 para controlar el tráfico de red.
Utiliza AWS Identity and Access Management (IAM) para gestionar permisos y accesos.
7. Monitoreo y escalado:
Configura Amazon CloudWatch para monitorear tus instancias y utiliza Auto Scaling para escalar automáticamente tus recursos según la demanda.