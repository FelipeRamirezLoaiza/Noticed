document.getElementById('register').addEventListener('submit', async (e) => {
                    e.preventDefault();

                    const email = document.getElementById('email').value;
                    const password = document.getElementById('clave').value;
                    const confirmPassword = document.getElementById('confirmClave').value;

                    // Validaciones
                    if(password === "" || email === "" || confirmPassword === ""){
                        alert ('Correo o contraseña vacia, debe diligenciar todos los campos');
                        return;
                    }

                    let correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!correoRegex.test(email)) {
                        alert('El correo electrónico no es válido, debe contener "@" y un dominio válido como "gmail.com"');
                        return;
                    }
                    
                    if (password !== confirmPassword) {
                        alert('Las contraseñas no coinciden');
                        return;
                    }

                    if(password.length < 12){
                        alert('La contraseña debe tener como mínimo 12 caracteres');
                        return;
                    }

                    let contieneMayuscula = password.split('').some(caracter => caracter >= 'A' && caracter <= 'Z');
                    let contieneNumero = /\d/.test(password);

                    if (contieneMayuscula && contieneNumero) {
                        // La contraseña es válida
                    } else {
                        if (!contieneMayuscula) {
                            alert('La contraseña debe contener por lo menos una mayúscula');
                        }
                        if (!contieneNumero) {
                            alert('La contraseña debe contener por lo menos un número');
                        }
                    }

                    // Envío de datos
                    if(password !== "" && email !== "" && confirmPassword !== "" && correoRegex.test(email) && password === confirmPassword && password.length >= 12 && contieneMayuscula && contieneNumero){
                        try {
                            const response = await fetch('http://localhost:3000/register', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ email, password }),
                            });

                            if (response.ok) {
                                alert('Usuario registrado con éxito');
                                window.location.href = '/Inicio.html'; // Redirigir al inicio de sesión
                            } else {
                                const errorData = await response.json();
                                alert(`Error en el registro: ${errorData.error}`);
                            }
                        } catch (error) {
                            alert('Error en el registro');
                            console.error('Error:', error);
                        }
                    }
                });

                // Visibilidad de contraseña
                document.getElementById('toggle-password').addEventListener('click', () => {
                    const passwordInput = document.getElementById('clave');
                    const confirmPasswordInput = document.getElementById('confirmClave');
                    const isPasswordVisible = passwordInput.type === 'text';
        
                    passwordInput.type = isPasswordVisible ? 'password' : 'text';
                    confirmPasswordInput.type = isPasswordVisible ? 'password' : 'text';
                    passwordToggle.innerHTML = isPasswordVisible ? "<i class='bx bx-show'></i>" : "<i class='bx bx-hide'></i>";
                });