import Header from './Header'; 

const Layout = ({ children, onFilter }) => {
  return (
    <div className="app-container">
      <Header onFilter={onFilter} />
      <main>{children}</main>
      <footer style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>
        <p>© 2026 WikiPaíses - Explore o Atlas</p>
      </footer>
    </div>
  );
};

export default Layout;