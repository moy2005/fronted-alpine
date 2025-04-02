// 📌 ContactPage.jsx (Formulario de contacto)
function ContactPage() {
    return (
        <div>
            <h1>Contacto</h1>
            <p>Envíanos un mensaje y te responderemos pronto.</p>
            <form>
                <input type="text" placeholder="Tu Nombre" />
                <input type="email" placeholder="Tu Correo" />
                <textarea placeholder="Tu Mensaje"></textarea>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
export default ContactPage;

