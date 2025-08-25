document.getElementById('login').addEventListener('submit', async (e) => {
                    e.preventDefault();
        
                    const email = document.getElementById('email').value;
                    const password = document.getElementById('clave').value;
        
                    // Validaciones
                    if(password === "" || email === ""){
                        alert ('Correo o contraseña vacia, debe diligenciar todos los campos');
                        return;
                    }
        
                    let correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!correoRegex.test(email)) {
                        alert('El correo electrónico no es válido, debe contener "@" y un dominio válido como "gmail.com"');
                        return;
                    }
        
                    // Envío de datos
                    try {
                        const response = await fetch('http://localhost:3000/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ email, password }),
                        });
        
                        if (response.ok) {
                            const data = await response.json();
                            alert('Inicio de sesión exitoso');
                            console.log('Usuario:', data.user);
                            window.location.href = '/Index.html'; // Redirigir a la página
                        } else {
                            alert('Email o contraseña incorrectos');
                        }
                    } catch (error) {
                        alert('Error en el Inicio');
                        console.error('Error:', error);
                    }
                });
        
                // Visibilidad de contraseña
                document.getElementById('toggle-password').addEventListener('click', () => {
                    const passwordInput = document.getElementById('clave');
                    const isPasswordVisible = passwordInput.type === 'text';
        
                    passwordInput.type = isPasswordVisible ? 'password' : 'text';
                    passwordToggle.innerHTML = isPasswordVisible ? "<i class='bx bx-show'></i>" : "<i class='bx bx-hide'></i>";
                });