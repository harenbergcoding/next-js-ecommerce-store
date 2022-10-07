import Footer from './footer';
import Header from './header';

export default function Layout(props) {
  return (
    <>
      <Header />
      {props.children}
      {/* <Footer /> */}
    </>
  );
}
