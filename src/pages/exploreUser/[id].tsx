import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ExploreUser } from 'views/exploreUser';

// Si 'ExploreUser' es un componente, asegúrate de importarlo correctamente.
// Importa los componentes necesarios



const ExploreUserPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query; // Aquí capturas el ID de la URL como string o undefined

  return (
    <div>
      <Head>
        <title>User Profile {id}</title>
        <meta name="description" content="User profile page" />
      </Head>
      <ExploreUser userId={id}/>
    </div>
  );
};

export default ExploreUserPage;

