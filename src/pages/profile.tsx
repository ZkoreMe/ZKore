import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { UserProfile } from 'views/userProfile';

// Si 'ExploreUser' es un componente, asegúrate de importarlo correctamente.
// Importa los componentes necesarios

const Profile: NextPage = () => {
  const router = useRouter();
  const id = "53jk...v3m1"; // temp id, while user context wrapper is undefined

  return (
    <div>
      <Head>
        <title>User Profile {id}</title>
        <meta name="description" content="Current user profile page" />
      </Head>
      <UserProfile userId={id}/>
    </div>
  );
};

export default Profile;

