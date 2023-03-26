import { Header } from '@/components/Header';
import { Footer } from '../components/Footer';
import { Main } from '../components/Main';

const Home = () => {
    return (
        <>
            <Header />
            <Main>
                <div className='p-8 max-w-md mx-auto dark:bg-gray-200'>
                </div>
            </Main>
            <Footer />
        </>
    );
}

export default Home;