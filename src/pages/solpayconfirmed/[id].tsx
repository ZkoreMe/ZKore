import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { PaySolConfirmed } from 'views';

// Si 'ExploreUser' es un componente, asegúrate de importarlo correctamente.
// Importa los componentes necesarios



const ExplorePaySolanaPay: NextPage = () => {
  const router = useRouter();
  const { id } = router.query; // Aquí capturas el ID de la URL como string o undefined
  const paysolId = typeof id === 'string' ? parseInt(id, 10) : undefined;
  return (
    <div>
      <Head>
        <title>Pay{id}</title>
        <meta name="description" content="User profile page" />
      </Head>
      <PaySolConfirmed paysolId={paysolId}/>
    </div>
  );
};

export default ExplorePaySolanaPay;