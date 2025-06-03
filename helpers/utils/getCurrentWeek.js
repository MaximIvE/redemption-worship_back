const getCurrentWeek = () => {
    const date = new Date();
    const tempDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const day = tempDate.getUTCDay() || 7; // Робимо неділю = 7
    tempDate.setUTCDate(tempDate.getUTCDate() + 4 - day); // Переміщаємо до четверга поточного тижня
    const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
    return Math.ceil((((tempDate - yearStart) / 86400000) + 1) / 7);
};

module.exports = getCurrentWeek;