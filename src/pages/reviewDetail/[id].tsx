import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ReviewDetail } from 'views/reviewDetail';

// Si 'ExploreUser' es un componente, asegúrate de importarlo correctamente.
// Importa los componentes necesarios



const ExploreReviewDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query; // Aquí capturas el ID de la URL como string o undefined
  const reviewId = typeof id === 'string' ? parseInt(id, 10) : undefined;
  return (
    <div>
      <Head>
        <title>Review {id}</title>
        <meta name="description" content="User profile page" />
      </Head>
      <ReviewDetail reviewId={reviewId}/>
    </div>
  );
};

export default ExploreReviewDetail;