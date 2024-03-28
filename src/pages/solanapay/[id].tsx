import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { PayProductStep } from 'views/payProduct';
import Checkout from 'views/solanaPay';

// Si 'ExploreUser' es un componente, asegúrate de importarlo correctamente.
// Importa los componentes necesarios



const ExploreSolanaPay: NextPage = () => {
  const router = useRouter();
  const { id } = router.query; // Aquí capturas el ID de la URL como string o undefined
  const payId = typeof id === 'string' ? parseInt(id, 10) : undefined;
  return (
    <div>
      <Head>
        <title>Pay{id}</title>
        <meta name="description" content="User profile page" />
      </Head>
      <Checkout payS={payId}/>
    </div>
  );
};

export default ExploreSolanaPay;