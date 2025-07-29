Este es un template base para proyectos en React que incluye todo lo necesario para comenzar.

📦 Librerías clave instaladas
✅ axios – para consumir APIs fácilmente

✅ react-router-dom – para navegación entre páginas

✅ sonner – sistema de notificaciones moderno

🔧 lib/axiosConfig.ts: Configura la instancia de Axios con baseURL, headers y token automático desde localStorage.

🧩 Dashboard base con diseño limpio y responsivo

🌙 Soporte para modo oscuro

##& 🛠️ Instrucciones para usar este template

1. Crear una nueva carpeta y clona solo "template-react" del repositorio
```bash
git init
git remote add origin https://github.com/Laime27/templates.git
git config core.sparseCheckout true
git sparse-checkout init
git sparse-checkout set template-react
git pull origin main
```
3. Mover el contenido de template-react a la raíz
```bash
xcopy template-react\* . /E /H /K
```
4. Eliminar la carpeta template-react
```bash
rmdir /s /q template-react
```
o con 
```bash
rm -r -fo template-react
```
5. Cambiar el "name" en package.json y package-lock.json por el nombre del nuevo proyecto

6. Instalar dependencias
```bash
npm install
```

