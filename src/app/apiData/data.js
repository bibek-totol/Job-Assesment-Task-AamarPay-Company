export async function getData() {
    const res = await fetch("https://bibek-totol.github.io/aamarPay-API/api.json");
    return res.json();
}