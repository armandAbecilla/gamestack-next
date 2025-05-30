export default function Filter({ className = '' }) {
  return (
    <svg
      width='800px'
      height='800px'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path d='M0 3H16V1H0V3Z' fill='currentColor' />
      <path d='M2 7H14V5H2V7Z' fill='currentColor' />
      <path d='M4 11H12V9H4V11Z' fill='currentColor' />
      <path d='M10 15H6V13H10V15Z' fill='currentColor' />
    </svg>
  );
}
