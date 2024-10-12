const CmdIcon = (props) => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    stroke='#000000'
    strokeWidth={1}
    strokeLinecap='round'
    strokeLinejoin='miter'
    {...props}
  >
    <rect x={8} y={8} width={8} height={8} />
    <path d='M5,2H5A3,3,0,0,0,2,5H2A3,3,0,0,0,5,8H8V5A3,3,0,0,0,5,2Z' />
    <path d='M22,5h0a3,3,0,0,0-3-3h0a3,3,0,0,0-3,3V8h3A3,3,0,0,0,22,5Z' />
    <path d='M2,19H2a3,3,0,0,0,3,3H5a3,3,0,0,0,3-3V16H5A3,3,0,0,0,2,19Z' />
    <path d='M19,22h0a3,3,0,0,0,3-3h0a3,3,0,0,0-3-3H16v3A3,3,0,0,0,19,22Z' />
  </svg>
);
export default CmdIcon;
