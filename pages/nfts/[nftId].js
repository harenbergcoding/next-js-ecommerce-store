export default function () {
  return <div>hi</div>;
}

export function getServerSideProps(context) {
  console.log(context);
  return;
}
