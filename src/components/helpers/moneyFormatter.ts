export default function moneyFormatter(number: number) {
  const money = new Intl.NumberFormat('en-AU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return money.format(number);
}
