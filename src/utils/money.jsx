export function formatMoney(amountsCents) {
    return `$${(amountsCents / 100).toFixed(2)}`;
    
}
