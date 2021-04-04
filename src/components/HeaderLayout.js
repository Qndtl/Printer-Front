import Footer from "./Footer";
import Header from "./Header";

function HeaderLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default HeaderLayout;