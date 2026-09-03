const firebaseConfig = {
  apiKey: "AIzaSyBy0TYD6b3pFRNO8ZX7J6B952QLRf8tGWk",
  authDomain: "escolahub-8ea7a.firebaseapp.com",
  projectId: "escolahub-8ea7a",
  storageBucket: "escolahub-8ea7a.firebasestorage.app",
  messagingSenderId: "743986431276",
  appId: "1:743986431276:web:085e3f08ccd39065179889"
};
  const app = initializeApp(firebaseConfig);
function mostrar(id) {
    document.querySelectorAll('.tela').forEach(t => t.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

function entrar() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    // TESTE: se escrever "admin", vai para admin
    if (email.includes('admin')) {
        mostrar('tela-admin');
    } else {
        mostrar('tela-aluno');
        document.getElementById('nome-aluno').textContent = email;
        
        // Dados fake para veres como fica
        document.getElementById('notas').innerHTML = `
            <div class="nota-item"><span>Matemática</span><span class="nota-valor">14</span></div>
            <div class="nota-item"><span>Física</span><span class="nota-valor">12</span></div>
        `;
        document.getElementById('pauta').innerHTML = `
            <div class="pauta-item"><span>Ana Silva</span><span class="pauta-media">15</span></div>
            <div class="pauta-item"><span>João Pedro</span><span class="pauta-media">13</span></div>
        `;
    }
}

function sair() {
    mostrar('tela-login');
    document.getElementById('email').value = '';
    document.getElementById('senha').value = '';
}

function adicionarNota() {
    document.getElementById('admin-msg').style.color = '#4caf50';
    document.getElementById('admin-msg').textContent = 'Funcionalidade ativa na Sessão 8!';
}
