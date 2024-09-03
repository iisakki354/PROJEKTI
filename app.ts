document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('listaa-tyokalu-form') as HTMLFormElement;
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Käsittelyn luonti, esim. lähetä tiedot palvelimelle
            alert('Työkalu on listattu!');
        });
    }
});
