
const Footer = () => {
  const getYear = new Date().getFullYear();
  return (
    <footer className='text-sm text-gray-500 p-4 sticky bottom-0 w-full'>
      © {getYear} <span className='text-emerald-400'>Ryzer</span>
    </footer>
  );
};

export default Footer;
