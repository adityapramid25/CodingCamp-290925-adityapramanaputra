document.addEventListener('DOMContentLoaded', () => {
    // Dapatkan elemen DOM
    const [form, list, filter] = ['todo-form', 'todo-list', 'filter-select'].map(id => document.getElementById(id));

    // --- FUNGSI MANAJEMEN TUGAS ---

    const renderTask = (text, date) => {
        const li = document.createElement('li');
        li.setAttribute('data-status', 'uncompleted');
        
        const fDate = new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });

        li.innerHTML = `
            <div>
                <span class="todo-text">${text}</span>
                <span class="date-info"> (${fDate})</span>
            </div>
            <button class="delete-button">Hapus</button>
        `;
        list.appendChild(li);
        filterTasks();
    };

    const filterTasks = () => {
        const val = filter.value;
        list.querySelectorAll('li').forEach(task => {
            const status = task.getAttribute('data-status');
            const display = val === 'all' || val === status ? 'flex' : 'none';
            task.style.display = display;
        });
    };

    // --- EVENT HANDLERS ---

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const [textInput, dateInput] = ['todo-input', 'date-input'].map(id => document.getElementById(id));
        const text = textInput.value.trim();
        const date = dateInput.value;

        if (text && date) {
            renderTask(text, date);
            textInput.value = '';
            dateInput.value = '';
        } else {
            alert('Tugas dan Tanggal harus diisi!');
        }
    });

    list.addEventListener('click', (e) => {
        const btn = e.target;
        const li = btn.closest('li');

        if (!li) return;

        if (btn.classList.contains('delete-button')) {
            li.remove();
        } else if (btn.closest('div')) { // Klik pada area teks/tanggal
            const isCompleted = li.classList.toggle('completed');
            li.setAttribute('data-status', isCompleted ? 'completed' : 'uncompleted');
        }

        filterTasks();
    });

    filter.addEventListener('change', filterTasks);

    // filterTasks(); // Opsional: untuk memuat filter awal, berguna jika ada Local Storage
});
