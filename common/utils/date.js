export const getDateString = (dateObject) => {
    const d = dateObject ? new Date(dateObject) : new Date();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    
    return `${d.getFullYear()}-${month > 9 ? '' : ''}${month}-${date > 9 ? '' : ''}${date}`
};