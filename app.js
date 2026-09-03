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
    
    auth.signInWithEmailAndPassword(email, senha)
        .then(() => {
            document.getElementById('erro').textContent = '';
        })
        .catch(err => {
            document.getElementById('erro').textContent = 'Email ou senha errados.';
        });
}
function carregarAluno(uid, email) {
    // Buscar nome
    db.collection('users').doc(uid).get().then(doc => {
        if (doc.exists) {
            document.getElementById('nome-aluno').textContent = doc.data().nome;
        } else {
            document.getElementById('nome-aluno').textContent = email;
        }
    });

    // Buscar notas
    db.collection('notas').doc(uid).get().then(doc => {
        const div = document.getElementById('notas');
        if (doc.exists) {
            const dados = doc.data();
            let html = '';
            for (let materia in dados) {
                html += `<div class="nota-item"><span>${materia}</span><span class="nota-valor">${dados[materia]}</span></div>`;
            }
            div.innerHTML = html;
        } else {
            div.innerHTML = '<p style="color:#888;">Nenhuma nota registada.</p>';
        }
    });

    // Buscar pauta
    db.collection('users').doc(uid).get().then(doc => {
        if (doc.exists && doc.data().turma) {
            const turma = doc.data().turma;
            db.collection('pautas').doc(turma).get().then(pautaDoc => {
                const div = document.getElementById('pauta');
                if (pautaDoc.exists) {
                    const lista = pautaDoc.data().alunos || [];
                    let html = '';
                    lista.forEach(a => {
                        html += `<div class="pauta-item"><span>${a.nome}</span><span class="pauta-media">${a.media}</span></div>`;
                    });
                    div.innerHTML = html;
                } else {
                    div.innerHTML = '<p style="color:#888;">Pauta não disponível.</p>';
                }
            });
        }
    });
}
function sair() {
    auth.signOut();
}

auth.onAuthStateChanged(user => {
    if (user) {
        if (user.email === 'admin@escola.com') {
            mostrar('tela-admin');
        } else {
            mostrar('tela-aluno');
            carregarAluno(user.uid, user.email);
        }
    } else {
        mostrar('tela-login');
    }
});function entrar() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (email.includes('admin')) {
        mostrar('tela-admin');
    } else {
        mostrar('tela-aluno');
        document.getElementById('nome-aluno').textContent = email;
        
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
    const uid = document.getElementById('admin-uid').value;
    const materia = document.getElementById('admin-materia').value;
    const nota = parseFloat(document.getElementById('admin-nota').value);
    
    if (!uid || !materia || isNaN(nota)) {
        document.getElementById('admin-msg').style.color = '#ff4444';
        document.getElementById('admin-msg').textContent = 'Preenche todos os campos.';
        return;
    }

    db.collection('notas').doc(uid).set({
        [materia]: nota
    }, { merge: true }).then(() => {
        document.getElementById('admin-msg').style.color = '#4caf50';
        document.getElementById('admin-msg').textContent = 'Nota guardada com sucesso!';
        document.getElementById('admin-materia').value = '';
        document.getElementById('admin-nota').value = '';
    }).catch(err => {
        document.getElementById('admin-msg').style.color = '#ff4444';
        document.getElementById('admin-msg').textContent = 'Erro: ' + err.message;
    });
}
