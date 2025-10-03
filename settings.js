const themeSwitcher = document.getElementById('theme-switcher');
const darkThemeStyle = document.getElementById('dark-theme-style');

const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    darkThemeStyle.disabled = savedTheme !== 'dark';
    if (themeSwitcher) {
        themeSwitcher.value = savedTheme;
    }
}

if (themeSwitcher) {
    themeSwitcher.addEventListener('change', () => {
        const theme = themeSwitcher.value;
        document.body.classList.toggle('dark-theme', theme === 'dark');
        darkThemeStyle.disabled = theme !== 'dark';
        localStorage.setItem('theme', theme);
    });
}
