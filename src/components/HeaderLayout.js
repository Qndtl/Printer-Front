import Header from "./Header";

function HeaderLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default HeaderLayout;