import Header from './header';

export default function Layout(props) {
  return (
    <>
      <Header cart={props.cart} />
      {props.children}
    </>
  );
}
